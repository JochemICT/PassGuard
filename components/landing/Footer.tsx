import Link from "next/link";
import Image from "next/image";
import {FOOTER_LINKS, NAV_LINKS} from "@/constants";

//Icons
import {FaFacebook} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {FaTwitter} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {FaYoutube} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";


const Footer = () => {
    const current_year = new Date().getFullYear();
    return (
        <footer className="bg-white py-8 w-full">
            <div className="container mx-auto text-center">
                <div className="flex flex-col items-center">

                    <ul className="flex flex-wrap justify-center gap-8 mb-10">
                        {FOOTER_LINKS.map((link) => (
                            <Link href={link.href} key={link.key}
                                  className="text-gray-16 pb-1.5 hover:font-semibold">
                                {link.label}
                            </Link>
                        ))}
                    </ul>

                    <ul className="flex justify-center gap-4 mb-10">
                        <li>
                            <Link href="" className="text-gray-500">
                                <FaFacebook className="h-5 w-5"/>
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="text-gray-500">
                                <FaInstagram className="h-5 w-5"/>
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="text-gray-500">
                                <FaXTwitter className="h-5 w-5"/>
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="text-gray-500">
                                <FaGithub className="h-5 w-5"/>
                            </Link>
                        </li>
                        <li>
                            <Link href="" className="text-gray-500">
                                <FaYoutube className="h-5 w-5"/>
                            </Link>
                        </li>
                    </ul>

                    <p className="text-gray-500">&copy; {current_year} PassGuard, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;