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
import { NewPasswordSchema } from '@/schemas';

//Actions
import { NewPassword } from "@/actions/new-password";
import {useSearchParams} from "next/navigation";



export const NewPasswordForm = () => {
    //Search params
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    
    //States
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    //Form
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
            password_confirm: "",
        }
    });


    //Submit handling
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");


        startTransition(() => {
            NewPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                });
        });
    }

  return (
    <>
        <div className="flex flex-col items-center justify-center">
            {/* Logo */}
            <img src="logo_long.png" className="w-[350px] mb-5"></img> 

            {/* Card */}
            <CardWrapper title="New password" backButtonLabel="Back to login" backButtonHref="/login">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            {/* Email */}
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
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>
                        <div className='space-y-4'>
                            {/* Email */}
                            <FormField control={form.control} name="password_confirm" render={({field}) => (
                                <FormItem>
                                    <p className='text-sm font-semibold'>Confirm password</p>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type='password'
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        </div>

                        <FormError message={error}/>
                        <FormSuccess message={success}/>

                        <Button type='submit' className='w-full' disabled={isPending}>
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    </>
  )
}

export default NewPasswordForm