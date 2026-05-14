"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  Flame,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/80" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.35),transparent_45%)]" />
      </div>

      {/* GLOWS */}
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-28 sm:py-32 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        
        {/* MOBILE LOGO */}
        <div className="relative mb-10 flex items-center justify-center lg:hidden">
          <div className="absolute h-[180px] w-[180px] rounded-full bg-orange-500/20 blur-3xl" />

          <motion.div
            initial={{
              rotate: -360,
              scale: 0.6,
              opacity: 0,
            }}
            animate={{
              rotate: 0,
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative h-[180px] w-[180px] overflow-hidden rounded-full border border-orange-500/20 bg-black shadow-[0_0_45px_rgba(255,106,0,0.35)]">
              <Image
                src="/logo/saiko-logo.webp"
                alt="Saiko Sushi"
                fill
                priority
                quality={70}
                sizes="180px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs sm:text-sm text-orange-300 backdrop-blur-sm"
          >
            <Flame className="size-4" />
            Premium Rolls • Delivery en Coquimbo
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Sushi intenso.
            <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Sabor que impacta.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg"
          >
            Descubre los Premium Rolls de Saiko Sushi Coquimbo.
            Rolls únicos, promociones brutales y sabores diseñados
            para verdaderos amantes del sushi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="#menu"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-[1.03]"
            >
              <ShoppingBag className="size-4" />
              Ver Carta
            </Link>

            <Link
              href="#promociones"
              className="flex items-center justify-center gap-2 rounded-full border border-orange-500/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
            >
              Promociones
              <ChevronRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT DESKTOP */}
        <div className="relative hidden items-center justify-center pb-4 sm:pb-8 lg:flex lg:pb-0">
          <div className="absolute h-[240px] w-[240px] rounded-full bg-orange-500/20 blur-3xl sm:h-[320px] sm:w-[320px] md:h-[380px] md:w-[380px]" />

          <motion.div
            initial={{
              rotate: -720,
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              rotate: 0,
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border border-orange-500/20 bg-black shadow-[0_0_60px_rgba(255,106,0,0.35)] md:h-[320px] md:w-[320px]">
              <Image
                src="/logo/saiko-logo.webp"
                alt="Saiko Sushi"
                fill
                priority
                quality={75}
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}