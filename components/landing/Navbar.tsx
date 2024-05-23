import Link from "next/link";
import Image from "next/image";
import {NAV_LINKS} from "@/constants";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between max-w-screen-xl mx-auto z-30 py-5">
            <Link href="/">
                <Image src="/logo_long.png" alt="logo" width={200} height={29}/>
            </Link>

            <ul className="hidden h-full gap-12 lg:flex items-center mt-2">
                {NAV_LINKS.map((link) => (
                    <Link href={link.href} key={link.key}
                          className="regular-16 text-gray-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-semibold">
                        {link.label}
                    </Link>
                ))}
            </ul>

            <div>
                <Button size="default" variant="link">
                    <Link href="/login" className="font-semibold text-base">
                        Login
                    </Link>
                </Button>

                <span className="divider"> | </span>

                <Button size="default" variant="link">
                    <Link href="/register" className="font-semibold text-base">
                        Register
                    </Link>
                </Button>
            </div>

        </nav>

    );
};

export default Navbar;