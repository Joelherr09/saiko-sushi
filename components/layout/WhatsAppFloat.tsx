// components/layout/WhatsAppFloat.tsx

"use client";

import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { motion } from "framer-motion";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/56961980287"
      target="_blank"
      rel="noopener noreferrer"
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 40,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        delay: 1,
        duration: 0.5,
      }}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-green-400/20 bg-[#25D366] px-2 py-2 text-white shadow-[0_10px_40px_rgba(37,211,102,0.45)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_15px_50px_rgba(37,211,102,0.6)]"
    >
      <div className="absolute inset-0 rounded-full bg-white/10" />

      <div className="relative flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-white/15">
          <FaWhatsapp className="size-6 fill-white text-white" />
        </div>

        <div className="hidden sm:block">
          <p className="text-xs font-medium leading-none text-white/80">
            Haz tu pedido
          </p>

          <p className="mt-1 text-sm font-black uppercase tracking-wide">
            WhatsApp
          </p>
        </div>
      </div>
    </motion.a>
  );
}