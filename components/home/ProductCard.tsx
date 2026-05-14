"use client";

import Image from "next/image";
import { useState } from "react";

import { formatPrice } from "@/lib/formatPrice";

interface ProductCardProps {
  product: any;
  onClick: () => void;
}

export default function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  // Manejar productos con priceRange
  const hasPriceRange =
    product.priceRange && !product.price;

  const displayPrice = hasPriceRange
    ? `${formatPrice(
        product.priceRange.min
      )} - ${formatPrice(product.priceRange.max)}`
    : formatPrice(product.price);

  // Imagen fallback
  const imageSrc =
    !imageError && product.image
      ? product.image
      : "/logo/saiko-logo.webp";

  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl border border-orange-500/10 bg-zinc-950 text-left transition-all duration-300 active:scale-[0.98] hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 sm:rounded-[28px] sm:active:scale-100"
    >
      <div className="flex flex-col sm:block">
        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden bg-black xs:h-56 sm:h-64">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className={`transition-transform duration-500 group-hover:scale-105 ${
              imageError || !product.image
                ? "object-contain p-6 opacity-80"
                : "object-cover"
            }`}
          />

          {/* Overlay solo si es imagen real */}
          {!imageError && product.image && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          )}

          {/* Featured */}
          {product.featured && (
            <div className="absolute left-2 top-2 z-10 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black shadow-lg xs:left-3 xs:top-3 xs:px-3 xs:py-1 xs:text-xs">
              ⭐ Destacado
            </div>
          )}

          {/* Oferta */}
          {product.originalPrice && (
            <div className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg xs:right-3 xs:top-3 xs:px-3 xs:py-1 xs:text-xs">
              🔥 Oferta
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-3 xs:p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 xs:gap-3 sm:gap-4">
            <h3 className="line-clamp-2 flex-1 text-sm font-black uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-orange-400 xs:text-base sm:text-lg">
              {product.name}
            </h3>

            <div className="flex shrink-0 flex-col items-end">
              <span className="whitespace-nowrap text-sm font-bold text-orange-400 xs:text-base sm:text-lg">
                {displayPrice}
              </span>

              {hasPriceRange && (
                <span className="mt-0.5 text-[9px] text-zinc-500 xs:mt-1 xs:text-[11px]">
                  precio porción
                </span>
              )}
            </div>
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="mt-2 hidden line-clamp-2 text-sm text-zinc-400 sm:block">
              {product.shortDescription}
            </p>
          )}

          {/* Mobile CTA */}
          <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-orange-500/60 sm:hidden">
            <span>Más detalles</span>

            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}