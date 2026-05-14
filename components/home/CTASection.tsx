"use client";

import Link from "next/link";

import { Flame } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-orange-500/10 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,0,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
          <Flame className="size-4" />
          Delivery • Premium Rolls • Promociones
        </div>

        <h2 className="text-5xl font-black uppercase leading-none md:text-7xl">
          Haz tu pedido
          <span className="block bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
            ahora.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          Vive la experiencia Saiko Sushi Coquimbo y descubre rolls
          que no encuentras en cualquier sushi.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#menu"
            className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-10 py-5 text-sm font-black uppercase tracking-wide text-white shadow-2xl shadow-orange-500/30 transition-all duration-300 hover:scale-105"
          >
            Ver Carta
          </Link>

          <a
            href="https://www.instagram.com/saiko.sushi_coquimbo/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-orange-500/20 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-wide text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}