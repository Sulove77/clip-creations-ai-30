import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { PortfolioConfig } from "@/content/portfolio.schema";

type NavbarProps = {
  nav: PortfolioConfig["nav"];
};

export default function Navbar({ nav }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.a
          href={nav.brand.href}
          whileHover={{ scale: 1.05 }}
          className="font-display text-xl font-bold text-foreground tracking-tight"
        >
          {nav.brand.text}
          {nav.brand.accentText ? (
            <span className="text-coral">{nav.brand.accentText}</span>
          ) : null}
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {nav.links.map((link, i) => (
            <motion.a
              key={`${link.href}-${i}`}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -2 }}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          {nav.cta ? (
            <motion.a
              href={nav.cta.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors glow-coral-sm"
            >
              {nav.cta.label}
            </motion.a>
          ) : null}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-strong"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {nav.links.map((link, i) => (
                <motion.a
                  key={`${link.href}-mobile-${i}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              {nav.cta ? (
                <a
                  href={nav.cta.href}
                  onClick={() => setOpen(false)}
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold text-center hover:bg-primary/90 transition-colors"
                >
                  {nav.cta.label}
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
