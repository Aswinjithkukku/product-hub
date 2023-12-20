"use client";

import ProductCatelog from "@/components/ProductCatelog";
import { Product } from "@/data/Product";
import { fetchProducts } from "@/redux/features/productSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Heading from "@/shared/Heading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  const { products, loadingProducts } = useAppSelector((state) => state.products)

  // Fetch products for listing.
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);


  return (
    <main className="">
      <div className="container my-10">
        <Heading
          desc="View the products which recommended to you!"
          className="text-gray-800 font-mono"
        >
          Products
        </Heading>
        <div className="py-10">
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {products?.map((product) => (
              <ProductCatelog key={product?.id} data={product} isLoading={loadingProducts} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
