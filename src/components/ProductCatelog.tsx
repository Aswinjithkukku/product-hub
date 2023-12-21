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
    if (isLoading) {
        return (
            <div role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 ">
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded ">
                    <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full "></div>
                <div className="flex items-center mt-4">
                    <svg className="w-10 h-10 me-3 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <div>
                        <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-200 rounded-full "></div>
                    </div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>

        )
    }
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
            <Link href={`/products/${data?.id}`}>
                {renderImage()}
                {renderContent()}
            </Link>
        </div>
    );
};

export default ProductCatelog;
