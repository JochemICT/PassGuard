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
import { ResetPasswordSchema } from '@/schemas';

//Actions
import { ResetPassword } from "@/actions/reset-password";



export const ResetPasswordForm = () => {
    //States
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    //Form
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: "",
        }
    });


    //Submit handling
    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError("");
        setSuccess("");


        startTransition(() => {
            ResetPassword(values)
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
            <CardWrapper title="Forgot your password?" backButtonLabel="Back to login" backButtonHref="/login">
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
                        </div>
                        
                        <FormError message={error}/>
                        <FormSuccess message={success}/>

                        <Button type='submit' className='w-full' disabled={isPending}>
                            Send reset link
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    </>
  )
}

export default ResetPasswordForm