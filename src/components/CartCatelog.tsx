import { Cart } from "@/data/Product";
import { handleRemoveFromCart } from "@/redux/features/productSlice";
import { AppDispatch } from "@/redux/store";
import Badge from "@/shared/Badge";
import Heading from "@/shared/Heading";
import StartRating from "@/shared/StartRating";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

export interface CartCatelogProps {
    data?: Cart;
    isLoading?: boolean;
}

const CartCatelog: React.FC<CartCatelogProps> = ({
    data,
    isLoading = false,
}) => {
    const dispatch = useDispatch<AppDispatch>()
    const renderImage = () => {
        return (
            <div className="relative w-full overflow-hidden rounded-xl ">
                <div className="relative flex items-center justify-center aspect-w-3 aspect-h-3 h-[130px]">
                    <Image
                        src={data?.image || ""}
                        fill
                        alt="Image"
                        className={`object-contain `}
                        sizes="(max-width: 1025px) 100vw, 100px"
                    />
                </div>
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className="space-y-3">
                <Heading textSize="text-base text-gray-700" className="mb-2">
                    {data?.title}
                </Heading>
                <div className="flex gap-3">
                    <Badge name={data?.category} />
                    <StartRating
                        reviewCount={data?.rating?.count}
                        point={Number(data?.rating?.rate?.toFixed(2))}
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <p className="text-base font-semibold">
                        {data?.price?.toFixed(2)} INR
                        {` `}
                        <span className="text-sm text-neutral-500  font-normal">/pcs</span>
                    </p>
                    <button
                        className={`border cursor-pointer rounded-full py-0.5 w-16 font-mono text-base border-gray-300 `}
                    >
                        {data?.size?.size}
                    </button>
                    <button
                        className={`border cursor-pointer rounded-full py-0.5 w-20 font-mono text-sm border-gray-300 `}
                    >
                        {data?.quantity} Qty
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-gray-700 font-bold">Price</p>
                    <p className="text-gray-400 text-sm font-mono tracking-tighter">{`(${data?.price?.toFixed(
                        2
                    )}/pcs X ${data?.quantity} Qty)`}</p>
                    <hr className="flex-1 border border-dashed" />
                    <p className="font-black font-mono">
                        {data?.totalPrice?.toFixed(2)} INR
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="relative border p-5 rounded-2xl border-gray-300">
            <Link href={`/products/${data?.id}`}>
                <div className="grid grid-cols-12 gap-4">
                    <div className="img_section col-span-12 md:col-span-4">
                        {renderImage()}
                    </div>
                    <div className="content_section col-span-12 md:col-span-8 ">
                        {renderContent()}
                    </div>
                </div>
            </Link>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(handleRemoveFromCart(data?.id))
                }}
                className="absolute top-0 right-0 cursor-pointer"
            >
                <XCircleIcon className="w-7 h-7 text-orange-800" />
            </div>
        </div>
    );
};

export default CartCatelog;
