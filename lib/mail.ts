import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
)=> {
    const confirmLink = process.env.EMAIL_VERIFY_ENDPOINT + `?token=${token}`;

    await resend.emails.send({
        from: "PassGuard <onboarding@resend.dev>",
        to: email,
        subject: "PassGuard - Confirm Email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`
    });
}