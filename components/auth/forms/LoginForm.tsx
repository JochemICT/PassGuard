"use client";

//imports
import * as z from "zod";
import { CardWrapper } from '@/components/wrappers/card-wrapper'
import { Button } from '@/components/ui/button';
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

//Forms
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input";

import { FormError } from '@/components/errors/form-error';
import { FormSuccess } from '@/components/errors/form-success';

//Schema
import { LoginSchema } from '@/schemas';

//Actions
import { Login } from "@/actions/login";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";



export const LoginForm = () => {
    //States
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";

    //Form
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: "",
        }
    });


    //Submit handling
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
        setError("");
        setSuccess("");

        startTransition(() => {
            Login(values)
                .then((data) => {
                    if(data?.error){
                        form.reset();
                        setError(data.error);
                    }

                    if(data?.success){
                        form.reset();
                        setSuccess(data.success);
                    }

                    if(data?.twoFactor){
                        setShowTwoFactor(true)
                    }
                }).catch(() => setError("Something went wrong!"));
        });
    }

  return (
        <div className="flex flex-col items-center justify-center">
            {/* Logo */}
            <img src="logo_long.png" className="w-[350px] mb-5"></img> 

            {/* Card */}
            <CardWrapper title="Login" backButtonLabel="Don't have an account?" backButtonHref="/register" showSocial>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            {showTwoFactor && (
                                    <FormField  control={form.control} name="code" render={({field}) => (
                                        <FormItem>
                                            <p className='text-sm font-semibold'>Two Factor Code</p>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                            )}
                            {!showTwoFactor && (
                                <>
                                    <FormField control={form.control} name="email" render={({field}) => (
                                        <FormItem>
                                            <p className='text-sm font-semibold'>Email</p>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="john.doe@passguard.com"
                                                    type='email'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>

                                    <FormField control={form.control} name="password" render={({field}) => (
                                        <FormItem>
                                            <p className='text-sm font-semibold'>Password</p>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type='password'
                                                />
                                            </FormControl>
                                            <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                                <Link href="/reset-password">
                                                    Forgot password?
                                                </Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                </>
                            ) }
                        </div>

                        <FormError message={error || urlError}/>
                        <FormSuccess message={success}/>

                        <Button type='submit' className='w-full' disabled={isPending}>
                            {showTwoFactor ? "Confirm" : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
  )
}

export default LoginForm