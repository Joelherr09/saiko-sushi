"use client";

import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  currency?: string;
  description?: string;
  image?: string;
};

type Subcategory = {
  id: string;
  title: string;
  wrap?: string;
  products: Product[];
};

interface Props {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  subcategories: Subcategory[];
  onProductClick?: (product: any) => void;
}

export default function RollsCartaSection({
  id,
  title,
  subtitle,
  badge,
  subcategories,
  onProductClick,
}: Props) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-orange-500/10 bg-[#090909] py-16 sm:py-20 lg:py-24"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs sm:text-sm text-orange-300">
            <Sparkles className="size-4" />
            {badge || "Rolls Clásicos"}
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* SUBCATEGORIES */}
        <div className="space-y-14 sm:space-y-16">
          {subcategories.map((subcategory, subIndex) => (
            <SubcategorySlider
              key={subcategory.id}
              subcategory={subcategory}
              subIndex={subIndex}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  SLIDER                                    */
/* -------------------------------------------------------------------------- */

function SubcategorySlider({
  subcategory,
  subIndex,
  onProductClick,
}: {
  subcategory: Subcategory;
  subIndex: number;
  onProductClick?: (product: any) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const [showRightArrow, setShowRightArrow] = useState(true);

  const [isDragging, setIsDragging] = useState(false);

  const [startX, setStartX] = useState(0);

  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScrollPosition = () => {
    const container = scrollRef.current;

    if (!container) return;

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = container;

    setShowLeftArrow(scrollLeft > 10);

    setShowRightArrow(
      scrollLeft < scrollWidth - clientWidth - 10
    );
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (
    e: React.MouseEvent
  ) => {
    setIsDragging(true);

    setStartX(
      e.pageX - (scrollRef.current?.offsetLeft || 0)
    );

    setScrollLeft(
      scrollRef.current?.scrollLeft || 0
    );
  };

  const handleMouseMove = (
    e: React.MouseEvent
  ) => {
    if (!isDragging) return;

    e.preventDefault();

    const x =
      e.pageX - (scrollRef.current?.offsetLeft || 0);

    const walk = (x - startX) * 1.4;

    if (scrollRef.current) {
      scrollRef.current.scrollLeft =
        scrollLeft - walk;
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    checkScrollPosition();

    container.addEventListener(
      "scroll",
      checkScrollPosition
    );

    return () => {
      container.removeEventListener(
        "scroll",
        checkScrollPosition
      );
    };
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: subIndex * 0.06,
      }}
      viewport={{ once: true }}
    >
      {/* HEADER */}
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black uppercase text-white sm:text-3xl">
            {subcategory.title}
          </h3>

          {subcategory.wrap && (
            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Envueltos en{" "}
              <span className="font-semibold text-orange-400">
                {subcategory.wrap}
              </span>
            </p>
          )}
        </div>

        <div className="hidden h-px flex-1 bg-gradient-to-r from-orange-500/30 to-transparent md:block" />
      </div>

      {/* SLIDER */}
      <div className="relative">
        {/* LEFT */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 lg:flex items-center justify-center rounded-full border border-orange-500/30 bg-black/80 p-2 text-orange-400 backdrop-blur-md transition-all hover:scale-110 hover:bg-orange-500 hover:text-black"
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        {/* RIGHT */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 lg:flex items-center justify-center rounded-full border border-orange-500/30 bg-black/80 p-2 text-orange-400 backdrop-blur-md transition-all hover:scale-110 hover:bg-orange-500 hover:text-black"
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        {/* SCROLL */}
        <div
          ref={scrollRef}
          className={`flex gap-4 overflow-x-auto pb-4 scroll-smooth ${
            isDragging
              ? "cursor-grabbing select-none"
              : "cursor-grab"
          }`}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor:
              "#f97316 rgba(255,255,255,0.05)",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          {subcategory.products.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductClick?.(product)}
              className="group min-w-[260px] max-w-[260px] overflow-hidden rounded-[28px] border border-orange-500/10 bg-zinc-950 text-left transition-all duration-300 hover:border-orange-500/40 hover:bg-zinc-900 sm:min-w-[300px] sm:max-w-[300px]"
            >
              {/* IMAGE */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={
                    product.image &&
                    product.image.trim() !== ""
                      ? product.image
                      : "/logo/saiko-logo.webp"
                  }
                  alt={product.name}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 260px, 300px"
                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    product.image
                      ? "object-cover"
                      : "object-contain p-6 bg-black"
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* TOP */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h4 className="text-lg font-black uppercase leading-tight text-white sm:text-xl">
                    {product.name}
                  </h4>

                  <span className="shrink-0 text-base font-black text-orange-400 sm:text-lg">
                    $
                    {product.price.toLocaleString(
                      "es-CL"
                    )}
                  </span>
                </div>

                {/* DESC */}
                {product.description && (
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {product.description}
                  </p>
                )}

                {/* CTA */}
                <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-orange-300 opacity-60 transition-all group-hover:opacity-100">
                  Ver detalles
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* MOBILE INDICATOR */}
        <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
          {subcategory.products
            .slice(0, 6)
            .map((_, index) => (
              <div
                key={index}
                className="h-1 w-1 rounded-full bg-orange-500/40"
              />
            ))}

          {subcategory.products.length > 6 && (
            <span className="text-[10px] text-zinc-600">
              ···
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}