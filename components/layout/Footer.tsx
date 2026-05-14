// components/layout/Footer.tsx

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock3,
  Phone,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-orange-500/20 bg-black text-white">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.18),transparent_55%)]" />

      {/* Decorative Logo */}
      <div className="pointer-events-none absolute -right-20 -bottom-20 opacity-10">
        <Image
          src="/logo/peces-sin-fondo.png"
          alt="Saiko Sushi"
          width={420}
          height={420}
          className="object-contain"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo/saiko-logo.png"
                alt="Saiko Sushi Coquimbo"
                width={70}
                height={70}
                className="rounded-full object-cover"
              />

              <div>
                <h2 className="text-2xl font-black uppercase tracking-wide">
                  Saiko Sushi
                </h2>

                <p className="text-sm text-orange-300">
                  Coquimbo • Sushi & Delivery
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Rolls intensos, promociones contundentes y sabores únicos.
              Disfruta la experiencia Saiko Sushi en Coquimbo.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-orange-400">
              Información
            </h3>

            <div className="space-y-4 text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-orange-500" />

                <p>Av El Sauce 1106, Coquimbo, Chile</p>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 size-4 text-orange-500" />

                <p>
                  Atención vía delivery y pedidos por redes sociales.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 text-orange-500" />

                <p>Consulta disponibilidad y pedidos directamente.</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-orange-400">
              Síguenos
            </h3>

            <p className="text-sm text-zinc-400">
              Mira nuestros rolls premium, promociones y novedades.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/saiko.sushi_coquimbo/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex size-12 items-center justify-center rounded-full border border-orange-500/30 bg-zinc-950 transition-all duration-300 hover:scale-110 hover:border-orange-500 hover:bg-orange-500"
              >
                <FaInstagram className="size-5 text-orange-400 transition-colors duration-300 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Saiko Sushi Coquimbo. Todos los
            derechos reservados.
          </p>

          <a
            href="https://joelherr.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-orange-400"
          >
            Creado por Joel Herrera
          </a>
        </div>
      </div>
    </footer>
  );
}