import { Product } from "@/data/Product";
import Badge from "@/shared/Badge";
import StartRating from "@/shared/StartRating";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ProductCatelogProps {
    data?: Product;
    isLoading?: boolean;
}

const ProductCatelog: React.FC<ProductCatelogProps> = ({
    data,
    isLoading = false,
}) => {
    const renderContent = () => {
        return (
            <div className={"py-4 space-y-3 text-gray-700"}>
                <div className="space-y-2">
                    <div className="flex items-center text-neutral-500  text-sm ">
                        <Badge
                            name={data?.category}
                            className=" relative capitalize "
                            color="blue"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <h2
                            className={` font-medium capitalize overflow-hidden text-base `}
                        >
                            <span className={` line-clamp-1 `}>{data?.title}</span>
                        </h2>
                    </div>
                </div>
                <div className="border-b border-neutral-100 "></div>
                <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">
                        {data?.price?.toFixed(2)} INR
                        {` `}
                        <span className="text-sm text-neutral-500  font-normal">/pcs</span>
                    </span>
                    <StartRating
                        reviewCount={data?.rating?.count}
                        point={Number(data?.rating?.rate?.toFixed(2))}
                    />
                </div>
            </div>
        );
    };

    const renderImage = () => {
        return (
            <div className="relative w-full overflow-hidden rounded-xl ">
                <div className="relative flex items-center justify-center aspect-w-3 aspect-h-3 h-[200px]">
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

    return (
        <div className="p-4 border rounded-2xl">
            <Link href={`/${data?.id}`}>
                {renderImage()}
                {renderContent()}
            </Link>
        </div>
    );
};

export default ProductCatelog;
