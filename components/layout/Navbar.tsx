// components/layout/Navbar.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  ShoppingBag,
} from "lucide-react";

import { FaInstagram } from "react-icons/fa";

import { useEffect, useState } from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const navLinks = [
  {
    label: "Premium Rolls",
    href: "#premium-rolls",
  },
  {
    label: "Promociones",
    href: "#promociones",
  },
  {
    label: "Rolls de Carta",
    href: "#rolls-de-carta",
  },
  {
    label: "Tortas Sushi",
    href: "#tortas-sushi",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-orange-500/10 bg-black/70 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          
          {/* LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="relative overflow-hidden rounded-full border border-orange-500/20 bg-black shadow-lg shadow-orange-500/5">
              <Image
                src="/logo/saiko-logo.webp"
                alt="Saiko Sushi Coquimbo"
                width={54}
                height={54}
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-black uppercase tracking-wide text-white">
                Saiko Sushi
              </h1>

              <p className="text-xs font-medium text-orange-400">
                Coquimbo
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="https://www.instagram.com/saiko.sushi_coquimbo/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-orange-500/15 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
            >
              <FaInstagram className="size-4" />
              Instagram
            </a>

            <a
              href="https://wa.me/56961980287"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-[1.03]"
            >
              <ShoppingBag className="size-4" />
              Pedir Ahora
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex size-11 items-center justify-center rounded-full border border-orange-500/15 bg-black/70 text-white backdrop-blur-xl transition-all duration-300 hover:border-orange-500 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md"
            />

            {/* MENU PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 24,
                stiffness: 240,
              }}
              className="fixed right-0 top-0 z-50 flex h-screen w-[86%] max-w-sm flex-col overflow-hidden border-l border-orange-500/10 bg-[#090909]"
            >
              {/* TOP */}
              <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo/saiko-logo.webp"
                    alt="Saiko Sushi"
                    width={52}
                    height={52}
                    priority
                    className="rounded-full border border-orange-500/10"
                  />

                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wide text-white">
                      Saiko Sushi
                    </h2>

                    <p className="text-xs text-orange-400">
                      Coquimbo
                    </p>
                  </div>
                </div>

              </div>

              {/* LINKS */}
              <div className="flex flex-1 flex-col px-6 py-8">
                <div className="space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{
                        opacity: 0,
                        x: 40,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
                    >
                      {link.label}

                      <span className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto space-y-4 pt-8">
                  <a
                    href="https://www.instagram.com/saiko.sushi_coquimbo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-orange-500/15 bg-white/[0.03] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/10"
                  >
                    <FaInstagram className="size-4" />
                    Instagram
                  </a>

                  <a
                    href="https://wa.me/56961980287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-4 text-sm font-bold text-white shadow-xl shadow-orange-500/20"
                  >
                    <ShoppingBag className="size-4" />
                    Pedir Ahora
                  </a>
                </div>
              </div>

              {/* DECORATION */}
              <div className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.06]">
                <Image
                  src="/logo/saiko-logo.webp"
                  alt="Decoración"
                  width={240}
                  height={240}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}