"use client";

import ProductCard from "./ProductCard";

interface ProductSliderProps {
  products: any[];
  onSelect: (product: any) => void;
}

export default function ProductSlider({
  products,
  onSelect,
}: ProductSliderProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id || index}
          product={product}
          onClick={() => onSelect(product)}
        />
      ))}
    </div>
  );
}