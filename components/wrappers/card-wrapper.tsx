"use client";

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Header } from "@/components/ui/card-header";
import Socials from "@/components/auth/Socials";
import { BackButton } from "../back-button";

interface CardWrapperProps {
    title: string;
    children: React.ReactNode;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({
    title,
    children,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header title={title}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>

            {showSocial && (
                <>
                <div className="mb-5 px-7 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>
        
                <CardFooter>
                    <Socials />
                </CardFooter>
                </>

            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}