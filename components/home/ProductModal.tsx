"use client";

import Image from "next/image";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { X } from "lucide-react";

import { useEffect, useState } from "react";

import { formatPrice } from "@/lib/formatPrice";

interface ProductModalProps {
  product: any | null;
  onClose: () => void;
}

export default function ProductModal({
  product,
  onClose,
}: ProductModalProps) {
  const [imageError, setImageError] =
    useState(false);

  useEffect(() => {
    setImageError(false);

    if (product) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [product]);

  if (!product) return null;

  const imageSrc =
    !imageError && product.image
      ? product.image
      : "/logo/saiko-logo.webp";

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-2xl"
        >
          {/* OVERLAY GLOW */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.10),transparent_45%)]" />

          {/* CONTAINER */}
          <div className="flex min-h-full items-center justify-center p-3 sm:p-5 lg:p-8">
            <motion.div
              initial={{
                scale: 0.94,
                opacity: 0,
                y: 30,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.94,
                opacity: 0,
                y: 30,
              }}
              transition={{
                duration: 0.26,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-[28px] border border-orange-500/15 bg-[#0b0b0b]/95 shadow-[0_25px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:max-w-xl lg:max-w-2xl"
            >
              {/* IMAGE */}
              <div className="relative h-[180px] w-full shrink-0 overflow-hidden sm:h-[240px] lg:h-[280px]">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  onError={() =>
                    setImageError(true)
                  }
                  sizes="(max-width: 640px) 100vw, 800px"
                  className={`transition-transform duration-700 ${
                    imageError ||
                    !product.image
                      ? "object-contain p-8 opacity-80 sm:p-10"
                      : "object-cover"
                  }`}
                />

                {/* IMAGE OVERLAY */}
                {!imageError &&
                  product.image && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  )}

                {/* ORANGE FX */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_55%)]" />

                {/* CLOSE */}
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-red-500/40 hover:bg-red-600 sm:right-4 sm:top-4"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* SCROLLABLE CONTENT */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-7">
                  
                  {/* TITLE */}
                  <div className="space-y-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="text-2xl font-black uppercase leading-tight text-white sm:max-w-[70%] sm:text-3xl">
                        {product.name}
                      </h3>

                      {(product.price ||
                        product.price ===
                          0) && (
                        <span className="shrink-0 text-2xl font-black text-orange-400 sm:text-3xl">
                          {formatPrice(
                            product.price
                          )}
                        </span>
                      )}
                    </div>

                    {product.shortDescription && (
                      <p className="text-sm leading-relaxed text-orange-300/80 sm:text-[15px]">
                        {
                          product.shortDescription
                        }
                      </p>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  {product.description && (
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 sm:p-5">
                      <p className="text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* INGREDIENTS */}
                  {product.ingredients
                    ?.length > 0 && (
                    <div>
                      <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-orange-400">
                        Ingredientes
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map(
                          (
                            ingredient: string,
                            index: number
                          ) => (
                            <div
                              key={index}
                              className="rounded-full border border-orange-500/10 bg-orange-500/5 px-3 py-1.5 text-xs text-zinc-300"
                            >
                              {ingredient}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* OPTIONS */}
                  {product.options && (
                    <div className="space-y-4">
                      {Object.entries(
                        product.options
                      ).map(
                        ([key, values]: any) => (
                          <div key={key}>
                            <h4 className="mb-3 text-[11px] font-black uppercase tracking-[0.2em] text-orange-400">
                              {formatOptionTitle(
                                key
                              )}
                            </h4>

                            <div className="flex flex-wrap gap-2">
                              {values.map(
                                (
                                  value: string,
                                  index: number
                                ) => (
                                  <div
                                    key={index}
                                    className="rounded-full border border-white/5 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300"
                                  >
                                    {value}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-3 pt-2">
                    <a
                      href="https://www.instagram.com/saiko.sushi_coquimbo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02]"
                    >
                      Pedir por Instagram
                    </a>

                    <button
                      onClick={onClose}
                      className="flex items-center justify-center rounded-full border border-orange-500/10 bg-white/[0.03] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-zinc-300 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function formatOptionTitle(key: string) {
  const map: Record<string, string> = {
    base: "Base",
    extras: "Extras",
    protein: "Proteína",
    proteinChoices:
      "Proteínas a elección",
    vegetableChoices:
      "Vegetales a elección",
    baseChoices:
      "Base a elección",
  };

  return map[key] || key;
}