"use server";

import * as z from "zod";

import {ResetPasswordSchema} from "@/schemas";
import {getUserByEmail} from "@/data/user";

//reset
import {sendPasswordResetEmail} from "@/lib/mail";
import {generatePasswordResetToken} from "@/lib/tokens";

export const ResetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid email!" }
    }

    const { email } = validatedFields.data;

    const existedUser = await getUserByEmail(email);

    if(!existedUser){
        return { error: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );

    return { success : "Reset email send!"}
}
