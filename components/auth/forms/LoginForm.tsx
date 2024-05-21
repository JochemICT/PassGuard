"use client";

//imports
import * as z from "zod";
import { CardWrapper } from '@/components/wrappers/card-wrapper'
import { Button } from '@/components/ui/button';
import { useState, useTransition } from "react";

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



export const LoginForm = () => {
    //States
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");


    //Form
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });


    //Submit handling
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            Login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    }

  return (
    <>
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
                            {/* Email */}
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

                            {/* Password */}
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
                                    <FormMessage />
                                </FormItem>
                            )}/>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="cbRememberMe" />
                                <label
                                    htmlFor="cbRememberMe"
                                    className="text-sm font-medium"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>
                        
                        <FormError message={error}/>
                        <FormSuccess message={success} />

                        <Button type='submit' className='w-full' disabled={isPending}>
                            Login
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    </>
  )
}

export default LoginForm