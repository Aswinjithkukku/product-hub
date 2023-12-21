"use client";

import CartCatelog from "@/components/CartCatelog";
import { useAppSelector } from "@/redux/store";
import ButtonPrimary from "@/shared/ButtonPrimary";
import React, { useMemo } from "react";

const CartHomePage = () => {
    const { cart } = useAppSelector((state) => state.products);

    const grandTotal = useMemo(() => {
        return cart?.reduce((acc, item) => {
            return acc + item?.totalPrice;
        }, 0);
    }, [cart]);

    const renderCartList = () => {
        return (
            <div className="space-y-4">
                {cart?.length ? (
                    cart?.map((prod) => <CartCatelog key={prod.id} data={prod} />)
                ) : (
                    <div className="border border-gray-300 p-5 rounded-2xl flex flex-col items-center justify-center gap-4">
                        <p className="font-mono">You didn't add any products Yet</p>
                        <ButtonPrimary href="/">Grab Some</ButtonPrimary>
                    </div>
                )}
            </div>
        );
    };

    const renderSidebar = () => {
        return (
            <div className="w-full flex flex-col rounded-2xl border-b border-t border-l border-r border-neutral-200  space-y-6 xl:space-y-7 pb-10 p-2 sm:p-4 xl:px-8 xl:py-6 shadow-xl max-w-sm">
                {/* SUM */}
                <div className="flex flex-col space-y-4">
                    {cart?.length ? (
                        cart?.map((prod) => (
                            <div>
                                <p className="font-medium text-sm pb-2">{prod?.title}</p>
                                <div className="flex justify-between text-neutral-600 ">
                                    <span>Price</span>
                                    <span>{prod?.totalPrice + " INR"}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="py-4 text-xs font-mono text-gray-400">
                            Your cart is empty!.
                        </p>
                    )}
                    <hr />
                    <div className="">
                        <div className="flex justify-between text-neutral-800">
                            <span className="font-mono">Grand Total</span>
                            <span className="font-extrabold">{grandTotal + " INR"}</span>
                        </div>
                    </div>
                </div>

                {/* SUBMIT */}
                <ButtonPrimary>Checkout</ButtonPrimary>
            </div>
        );
    };
    return (
        <div className="container py-10">
            <div className="flex flex-col  gap-10 lg:flex-row">
                <div className="w-full lg:w-3/5 xl:w-2/3 ">{renderCartList()}</div>
                {/* SIDEBAR */}
                <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
                    <div className="sticky top-28">{renderSidebar()}</div>
                </div>
            </div>
        </div>
    );
};

export default CartHomePage;
