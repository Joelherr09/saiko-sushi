// app/page.tsx

"use client";

import { useState } from "react";

import menuData from "@/data/menu.json";

import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import ProductModal from "@/components/home/ProductModal";
import CTASection from "@/components/home/CTASection";
import RollsCartaSection from "@/components/home/RollsCartaSection";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const categories = Object.entries(menuData) as unknown as [
    string,
    {
      title: string;
      subtitle?: string;
      badge?: string;
      slug?: string;
      products: any[];
    }
  ][];

  return (
    <>
      <main className="overflow-hidden bg-black text-white">
        {/* HERO */}
        <HeroSection />

        {/* CATEGORÍAS */}
        <div className="border-t border-orange-500/10 bg-[#090909]">
        {
          categories.map(([categoryKey, category]: any, index) => {
            // CATEGORY NORMAL
            if (category.products?.length) {
              return (
                <CategorySection
                  key={categoryKey}
                  id={category.slug || categoryKey}
                  title={category.title}
                  subtitle={category.subtitle}
                  badge={category.badge}
                  products={category.products}
                  onProductClick={setSelectedProduct}
                  className={
                    index !== categories.length - 1
                      ? "border-b border-orange-500/10"
                      : ""
                  }
                />
              );
            }

            // ROLLS DE CARTA
            if (category.subcategories?.length) {
              return (
                <RollsCartaSection
                  key={categoryKey}
                  id={category.slug || categoryKey}
                  title={category.title}
                  subtitle={category.subtitle}
                  badge={category.badge}
                  subcategories={category.subcategories}
                  onProductClick={setSelectedProduct}
                />
              );
            }

            return null;
          })
        }
        </div>

        {/* CTA */}
        <CTASection />
      </main>

      {/* MODAL */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}