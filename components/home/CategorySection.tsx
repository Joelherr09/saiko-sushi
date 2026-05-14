"use client";

import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import ProductCard from "./ProductCard";

interface Product {
  id?: string;
  name: string;
  price?: number;
  image?: string;
  description?: string;
  currency?: string;
}

interface Subcategory {
  id: string;
  title: string;
  wrap?: string;
  products: Product[];
}

interface CategorySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;

  // categorías normales
  products?: Product[];

  // categorías especiales
  subcategories?: Subcategory[];

  onProductClick: (product: any) => void;
  className?: string;
}

export default function CategorySection({
  id,
  title,
  subtitle,
  badge,
  description,
  products = [],
  subcategories = [],
  onProductClick,
  className = "",
}: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const [showRightArrow, setShowRightArrow] = useState(true);

  const [isDragging, setIsDragging] = useState(false);

  const [startX, setStartX] = useState(0);

  const [scrollLeft, setScrollLeft] = useState(0);

  const isSubcategoryMode = subcategories.length > 0;

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = container;

    setShowLeftArrow(scrollLeft > 20);

    setShowRightArrow(
      scrollLeft < scrollWidth - clientWidth - 20
    );
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollAmount =
      direction === "left" ? -300 : 300;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (
    e: React.MouseEvent
  ) => {
    setIsDragging(true);

    setStartX(
      e.pageX -
        (scrollContainerRef.current?.offsetLeft || 0)
    );

    setScrollLeft(
      scrollContainerRef.current?.scrollLeft || 0
    );
  };

  const handleMouseMove = (
    e: React.MouseEvent
  ) => {
    if (!isDragging) return;

    e.preventDefault();

    const x =
      e.pageX -
      (scrollContainerRef.current?.offsetLeft || 0);

    const walk = (x - startX) * 1.5;

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      container.addEventListener(
        "scroll",
        checkScrollPosition
      );

      checkScrollPosition();

      return () =>
        container.removeEventListener(
          "scroll",
          checkScrollPosition
        );
    }
  }, [products, subcategories]);

  if (
    !products?.length &&
    !subcategories?.length
  ) {
    return null;
  }

  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-gradient-to-b from-black via-[#090909] to-black ${className}`}
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.05),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* HEADER */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs text-orange-300 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="size-3 sm:size-4" />

              <span className="font-medium">
                {badge || "Especialidades"}
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-3 text-sm font-medium text-orange-400/80 sm:mt-4 sm:text-base">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="mt-4 max-w-2xl text-xs leading-relaxed text-zinc-400 sm:mt-6 sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* ========================= */}
        {/* MODO SUBCATEGORÍAS */}
        {/* ========================= */}

        {isSubcategoryMode ? (
          <div className="space-y-14">
            {subcategories.map((subcategory) => (
              <div key={subcategory.id}>
                {/* SUB HEADER */}
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="text-2xl font-black uppercase text-white md:text-3xl">
                      {subcategory.title}
                    </h3>

                    {subcategory.wrap && (
                      <p className="mt-2 text-sm text-zinc-400">
                        Envueltos en{" "}
                        <span className="font-semibold text-orange-400">
                          {subcategory.wrap}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="h-px flex-1 bg-gradient-to-r from-orange-500/30 to-transparent md:ml-8" />
                </div>

                {/* GRID */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {subcategory.products.map(
                    (product, index) => (
                      <button
                        key={
                          product.id || index
                        }
                        onClick={() =>
                          onProductClick(product)
                        }
                        className="group rounded-[28px] border border-orange-500/10 bg-zinc-950 p-6 text-left transition-all duration-300 hover:border-orange-500/40 hover:bg-zinc-900"
                      >
                        <div className="mb-5 flex items-start justify-between gap-4">
                          <h4 className="text-lg font-black uppercase leading-tight text-white">
                            {product.name}
                          </h4>

                          {product.price && (
                            <span className="shrink-0 text-lg font-black text-orange-400">
                              $
                              {product.price.toLocaleString(
                                "es-CL"
                              )}
                            </span>
                          )}
                        </div>

                        {product.description && (
                          <p className="text-sm leading-relaxed text-zinc-400">
                            {product.description}
                          </p>
                        )}

                        <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-orange-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                          Ver detalles
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* ========================= */}
            {/* MODO NORMAL */}
            {/* ========================= */}

            <div className="relative group">
              {showLeftArrow && (
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-orange-500/30 bg-black/80 p-2 text-orange-400 backdrop-blur-md transition-all hover:scale-110 hover:bg-orange-500 hover:text-black lg:flex"
                  style={{
                    transform: "translateY(-50%)",
                  }}
                >
                  <ChevronLeft className="size-5" />
                </button>
              )}

              {showRightArrow && (
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-orange-500/30 bg-black/80 p-2 text-orange-400 backdrop-blur-md transition-all hover:scale-110 hover:bg-orange-500 hover:text-black lg:flex"
                  style={{
                    transform: "translateY(-50%)",
                  }}
                >
                  <ChevronRight className="size-5" />
                </button>
              )}

              <div
                ref={scrollContainerRef}
                className={`flex gap-3 overflow-x-auto scroll-smooth pb-4 sm:gap-4 sm:pb-6 lg:gap-5 ${
                  isDragging
                    ? "cursor-grabbing select-none"
                    : "cursor-grab"
                }`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor:
                    "#f97316 #1f1f1f",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {products.map(
                  (product, index) => (
                    <div
                      key={
                        product.id || index
                      }
                      className="w-[260px] flex-shrink-0 xs:w-[280px] sm:w-[300px] lg:w-[320px]"
                    >
                      <ProductCard
                        product={product}
                        onClick={() =>
                          onProductClick(product)
                        }
                      />
                    </div>
                  )
                )}
              </div>

              <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
                {products
                  .slice(0, 5)
                  .map((_, index) => (
                    <button
                      key={index}
                      className="h-1 w-1 rounded-full bg-orange-500/40 transition-all hover:bg-orange-500"
                      aria-label={`Ir al producto ${
                        index + 1
                      }`}
                    />
                  ))}

                {products.length > 5 && (
                  <span className="text-[10px] text-zinc-600">
                    ···
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 hidden items-center justify-center gap-2 text-xs text-zinc-600 sm:flex">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/30" />

              <span>
                {products.length} productos
              </span>

              <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/30" />
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          height: 4px;
        }

        div::-webkit-scrollbar-track {
          background: #1f1f1f;
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #fb923c;
        }
      `}</style>
    </section>
  );
}