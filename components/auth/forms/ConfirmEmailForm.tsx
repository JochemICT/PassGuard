"use client";

import {BeatLoader} from "react-spinners";

import {Card, CardContent, CardFooter} from "@/components/ui/card";

import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";

import {confirmEmail} from "@/actions/confirm-email";
import { FormError } from "@/components/errors/form-error";
import { FormSuccess } from "@/components/errors/form-success";
import {BackButton} from "@/components/ui/back-button";

export const ConfirmEmailForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if(success || error) return;

        if(!token){
            setError("Missing token!");
            return;
        }

        confirmEmail(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            }).catch(() => {
                setError("Something went wrong!");
        });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {/* Logo */}
                <img src="logo_long.png" className="w-[350px] mb-5"></img>

                {/* Card */}
                <Card className="w-[400px] shadow-md">
                    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                        <h1 className="text-xl font-bold mb-5 mt-3">
                            Confirming your email
                        </h1>
                    </div>
                    <CardContent className="flex flex-col items-center justify-center text-sm text-gray-500">
                        {!success && !error && (
                            <BeatLoader/>
                        )}
                        <FormSuccess message={success} />
                        {!success && (
                            <FormError message={error}/>
                        )}
                    </CardContent>
                    <CardFooter className="-mt-2">
                        <BackButton href="/login" label="Back to login"/>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}