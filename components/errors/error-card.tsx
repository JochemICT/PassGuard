import { BackButton } from "@/components/ui/back-button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/ui/card-header";


export const ErrorCard = () => {
    return (

        <div className="flex flex-col items-center justify-center">
            {/* Logo */}
            <img src="logo_long.png" className="w-[350px] mb-5"></img>

            {/* Card */}
            <Card className="w-[400px] shadow-md">
                <CardHeader>
                    <Header title="401 - Unauthorized" />
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-sm text-gray-500">
                    <p>Oops! Something went wrong!</p>
                </CardContent>
                <CardFooter>
                    <BackButton href="/login" label="Back to login"/>
                </CardFooter>
            </Card>
        </div>
    )
}
