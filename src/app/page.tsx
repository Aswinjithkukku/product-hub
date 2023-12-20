"use client";

import ProductCatelog from "@/components/ProductCatelog";
import { Product } from "@/data/Product";
import Heading from "@/shared/Heading";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("")
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = () => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setIsLoading(false);
      });
  };

  // Fetch products for listing.
  useEffect(() => {
    fetchProducts()
  }, []);

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
              <ProductCatelog key={product?.id} data={product} isLoading={isLoading} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
