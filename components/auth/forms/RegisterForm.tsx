"use client";

//imports
import * as z from "zod";
import { CardWrapper } from '@/components/wrappers/card-wrapper'
import { Button } from '@/components/ui/button';
import { useState, useTransition } from "react";
import { IoIosInformationCircle } from "react-icons/io";

//Forms
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input";

import { FormError } from '@/components/errors/form-error';
import { FormSuccess } from '@/components/errors/form-success';

//Schema
import { RegisterSchema } from '@/schemas';

//Actions
import { Register } from "@/actions/register";
import { Checkbox } from "@/components/ui/checkbox";



export const RegisterForm = () => {
    //States
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");


    //Form
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });


    //Submit handling
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            Register(values)
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
            <CardWrapper title="Register" backButtonLabel="Already have an account?" backButtonHref="/login" showSocial>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            {/* Name */}
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <p className='text-sm font-semibold'>Name</p>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="John Doe"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>


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
                                    <p className='text-sm font-semibold'>Password <span className="text-xs font-normal text-gray-500">(Min 8 chars,  including lower/upercase,  atleast one digit and special character)</span></p>
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
                            Register
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    </>
  )
}

export default RegisterForm