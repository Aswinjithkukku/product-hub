"use client";

import { Cart, Product, Size, SizesEnum } from "@/data/Product";
import { fetchProduct, handleAddToCart } from "@/redux/features/productSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import BtnLoader from "@/shared/BtnLoader";
import Button from "@/shared/Button";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Heading from "@/shared/Heading";
import NcInputNumber from "@/shared/NcInputNumber";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export interface ProductHomePageProps { }

const SIZES: Size[] = [
    {
        id: 1,
        size: SizesEnum.XS,
    },
    {
        id: 2,
        size: SizesEnum.S,
    },
    {
        id: 3,
        size: SizesEnum.M,
    },
    {
        id: 4,
        size: SizesEnum.L,
    },
    {
        id: 5,
        size: SizesEnum.XL,
    },
    {
        id: 6,
        size: SizesEnum.DXL,
    },
];

const ProductHomePage = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [qty, setQty] = useState<number>(1)
    const [size, setSize] = useState<Size>({
        id: 1,
        size: SizesEnum.M
    })
    //
    const [addedtocart, setAddedtocart] = useState<boolean>(false)


    const { product, loadingProduct } = useAppSelector((state) => state.products);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProduct(params?.product));
    }, [dispatch, params?.product]);

    // converter of adding 10%
    const addTenPercent = (num: number = 0) => {
        return (num + num * 0.1)?.toFixed(2);
    };

    // handle Add to Cart
    const addToCart = (product: Product) => {
        setAddedtocart(true)
        const cartProduct: Cart = {
            ...product, totalPrice: qty * product?.price, quantity: qty, size: size
        }
        dispatch(handleAddToCart([cartProduct]))
    }

    // time out for copy functionality.
    useEffect(() => {
        setTimeout(() => {
            setAddedtocart(false);
        }, 2000);
    }, [addedtocart]);


    // render image section.
    const renderImage = () => {
        return (
            <div className=" md:sticky top-28 left-0 right-0 w-full overflow-hidden rounded-xl ">
                <div className="relative flex items-center justify-center aspect-w-3 aspect-h-3 h-[200px] md:h-[300px] 2xl:h-[400px]">
                    <Image
                        src={product?.image || ""}
                        fill
                        alt="Image"
                        className={`object-contain `}
                        sizes="(max-width: 1025px) 100vw, 100px"
                    />
                </div>
            </div>
        );
    };

    const renderSizeButton = (val: Size) => {
        return (
            <button
                onClick={() => setSize(val)}
                className={`border cursor-pointer rounded-full py-2 w-16 font-mono text-lg ${size.size === val.size ? "border-blue-500" : "border-gray-300"} `}>
                {val?.size || "."}
            </button>
        );
    };

    const renderDetailSection = () => {
        return (
            <div className="space-y-5">
                <div className="text-gray-400 uppercase  flex gap-2">
                    <span className="text-blue-600">BEST SELLER</span>|
                    <span className="text-blue-600">EXPRESS SHIPPING</span>
                </div>

                <Heading
                    desc="Exclusive on Product-Hub"
                    textSize="text-2xl"
                    className=""
                >
                    {product?.title}
                </Heading>

                {/* star category */}
                <div className="flex gap-3 items-center">
                    <div className="flex  gap-2 border border-gray-400 rounded p-2">
                        <span className="">{product?.rating?.rate}</span>
                        <StarIcon className="w-[21px] h-[21px] " />
                    </div>
                    <p className="text-gray-400 ">{`Based on ${product?.rating?.count} ratings`}</p>
                </div>

                {/* price */}
                <div className=" space-y-2">
                    <p className="flex gap-4">
                        <span className="text-3xl tracking-tighter font-bold font-mono">
                            {product?.price} INR
                        </span>
                        <span className="text-green-600 font-semibold font-mono">
                            10% Off
                        </span>
                    </p>
                    <p className="text-gray-400">
                        MRP {addTenPercent(product?.price)} INR inclusive of all taxes.
                    </p>
                </div>
                <hr />
                {/* size buttons */}
                <Heading textSize="text-xl " desc="Select suitable size for purchase">Select Size</Heading>
                <div className="flex flex-wrap gap-3">
                    {SIZES?.map((size) => (
                        <div key={size?.id} className="">{renderSizeButton(size)}</div>
                    ))}
                </div>
                {/* Qty's */}
                <div className="flex">
                    <NcInputNumber defaultValue={qty} onChange={(value) => setQty(value)} min={1} max={3} label="Quantity" className="flex gap-20" desc="Select the number of Quantity" />
                </div>
                {/* cart buttons */}
                <div className="flex gap-5">
                    <Button className="flex gap-2 border border-gray-400 shadow">Add to <HeartIcon className="h-5 w-5" /></Button>
                    <ButtonPrimary onClick={() => addToCart(product)} className="shadow">{addedtocart ? <BtnLoader /> : " Add to cart"}</ButtonPrimary>
                </div>
                <hr />
                {/* Description */}
                <p className="text-lg text-gray-800">{product?.description}</p>
            </div>
        );
    };
    if (loadingProduct) {
        return (
            <div className="container py-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                    <div className="md:col-span-4 relative ">
                        <div role="status" className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse ">
                            <svg className="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>

                    </div>
                    <div className="md:col-span-8 space-y-3">
                        {[1, 2].map((item) => (
                            <div key={item} role="status" className="max-w-sm animate-pulse">
                                <div className="h-3.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                                <div className="h-3 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
                                <div className="h-3 bg-gray-200 rounded-full  mb-2.5"></div>
                                <div className="h-3 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                                <div className="h-3 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
                                <div className="h-3 bg-gray-200 rounded-full  max-w-[360px]"></div>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container py-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
                    <div className="md:col-span-4 relative">{renderImage()}</div>
                    <div className="md:col-span-8">{renderDetailSection()}</div>
                </div>
            </div>
        );
    }
};

export default ProductHomePage;
