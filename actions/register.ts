"use server";

//imports
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "invalid credentials!" };
    }

    return { success: "Email sent!" };
}