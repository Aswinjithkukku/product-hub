"use client";

import ButtonPrimary from "@/shared/ButtonPrimary";
import Logo from "@/shared/Logo";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    return (
        <nav className="sticky top-0 left-0 right-0 w-full z-40 border-b border-gray-100 shadow bg-white">
            <div className="relative container h-20 flex justify-between gap-2 ">
                <div className="main-logo flex">
                    <Logo className="self-center " />
                </div>
                <div className="rt-section flex gap-3">
                    <Link href="/products/cart" className="flex self-center">
                        <ShoppingCartIcon
                            color="black"
                            className="h-8 w-8  px-1 "
                        />
                    </Link>
                    <ButtonPrimary href="/" className="self-center shadow">
                        Login
                    </ButtonPrimary>
                </div>
            </div>
        </nav>
    );
};

export default Header;
