import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
    img?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
    img = "",
    className = "w-52",
}) => {
    return (
        <Link
            href="/"
            className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
        >
            {img ? (
                <Image
                    className={`block max-h-20 object-contain `}
                    src={img}
                    alt="Logo"
                />
            ) : (
               <h1 className="font-black font-mono text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-800">Product-Hub</h1>
            )}

        </Link>
    );
};

export default Logo;
