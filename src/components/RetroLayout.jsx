import React from 'react';
import { motion } from 'framer-motion';

// Retro paper container with texture-like styling
export default function RetroLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f0d9] text-[#3b2f2f]">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-lg border border-[#a36c3a]/50 shadow-[0_10px_25px_rgba(163,108,58,0.25)] bg-[#fff9e9]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.02), rgba(0,0,0,0.02) 1px, transparent 1px, transparent 24px)' }}
        >
          <div className="border-b border-[#a36c3a]/30 bg-[#f3e7c2] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🕵️‍♂️</span>
              <h1 className="text-xl font-bold tracking-wide" style={{ fontFamily: '"Special Elite", "Courier New", Courier, monospace' }}>
                SHIVA HUNT 2025
              </h1>
            </div>
            <div className="text-sm opacity-70" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
              Vintage Treasure Hunt Console
            </div>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
        <div className="mx-auto mt-4 h-1 w-40 bg-[#a36c3a]/40" />
      </div>
    </div>
  );
}
