/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DeviceColor, SpeedLevel } from './types';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { FrothSimulator } from './components/FrothSimulator';
import { SpecsGrid } from './components/SpecsGrid';
import { FaqSection } from './components/FaqSection';
import { Sparkles, ArrowRight, Star, Instagram, ChevronRight, Check } from 'lucide-react';

export default function App() {
  const [activeColor, setActiveColor] = useState<DeviceColor>(DeviceColor.OBSIDIAN);
  const [isSpinning, setIsSpinning] = useState(false);
  const [speed, setSpeed] = useState<SpeedLevel>(SpeedLevel.VELVET);

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#1f1b19] font-sans overflow-x-hidden selection:bg-[#32170d]/10 selection:text-[#32170d] pb-20">
      
      {/* Decorative Organic Backdrop Gradients (Rich roast warmth) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-orange-100/30 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#eae1de]/30 to-transparent rounded-full filter blur-3xl pointer-events-none -z-10" />

      {/* Modern Top Luxury Bar */}
      <NavBar
        activeColor={activeColor}
        isSpinning={isSpinning}
        onColorChange={setActiveColor}
      />

      <main className="relative z-10">
        
        {/* HERO STAGE */}
        <HeroSection
          activeColor={activeColor}
          onColorChange={setActiveColor}
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
          speed={speed}
          setSpeed={setSpeed}
        />

        {/* SECTION GAP (120px) */}
        <div className="h-[120px]" />

        {/* MICRO-PERSPECTIVE BRAND VALUES (BENTO GRID LIGHTWEIGHT ACCENT) */}
        <section id="bento-branding" className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/40 border border-white/60 p-8 rounded-2xl flex flex-col gap-3">
              <span className="font-mono text-[9px] text-[#504440]/60 font-bold tracking-widest uppercase">01 / ERGONOMICS</span>
              <h3 className="font-sans text-lg font-bold text-[#1f1b19]">Unrivaled Balance</h3>
              <p className="font-sans text-xs text-[#504440] leading-relaxed">
                Feels like a natural extension of your arm. The solid titanium spindle shifts weight directly to the thumb pad for wobble-free frothing.
              </p>
            </div>
            <div className="bg-white/40 border border-white/60 p-8 rounded-2xl flex flex-col gap-3">
              <span className="font-mono text-[9px] text-[#504440]/60 font-bold tracking-widest uppercase">02 / COMPACT WIRELESS</span>
              <h3 className="font-sans text-lg font-bold text-[#1f1b19]">Pure Portability</h3>
              <p className="font-sans text-xs text-[#504440] leading-relaxed">
                Zero cords. Zero constraints. Store it in its elegant travel sleeve and pull glossy cafe-grade foam anywhere on Earth.
              </p>
            </div>
            <div className="bg-white/40 border border-white/60 p-8 rounded-2xl flex flex-col gap-3">
              <span className="font-mono text-[9px] text-[#504440]/60 font-bold tracking-widest uppercase">03 / SUSTAINABLE METALS</span>
              <h3 className="font-sans text-lg font-bold text-[#1f1b19]">Built For Generations</h3>
              <p className="font-sans text-xs text-[#504440] leading-relaxed">
                Made of 85% certified circular billet aluminum. No cheap plastics, no breaking gears. Designed to become a lifelong kitchen heirloom.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION GAP (120px) */}
        <div className="h-[120px]" />

        {/* INTERACTIVE TEXTURIZATION SIMULATOR CARD */}
        <section id="viscosity-laboratory" className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FrothSimulator
            isWandSpinning={isSpinning}
            onSpinChange={setIsSpinning}
            speed={speed}
          />
        </section>

        {/* SECTION GAP (120px) */}
        <div className="h-[120px]" />

        {/* SPECIFICATIONS GRID SHEET */}
        <section id="engineering-specifications" className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <SpecsGrid />
        </section>

        {/* SECTION GAP (120px) */}
        <div className="h-[120px]" />

        {/* FAQS SLEEK ACCORDIONS FAQ */}
        <section id="help-and-faq" className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <FaqSection />
        </section>

        {/* SECTION GAP (120px) */}
        <div className="h-[120px]" />

        {/* MINI CONVERSION STAGE (FOOTER ENGAGEMENT CARD) */}
        <section id="ultimate-checkout" className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
          <div className="relative w-full rounded-3xl bg-[#32170d] text-white p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent pointer-events-none" />
            <div className="flex flex-col gap-3 max-w-xl z-10 relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-950/60 rounded-full border border-amber-900/50 w-fit">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="font-mono text-[9px] tracking-widest font-bold uppercase text-amber-200">BARISTA TRUSTED</span>
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight">Ready to Elevate Your Routine?</h2>
              <p className="font-sans text-xs text-amber-200/80 leading-relaxed">
                Order the CoffeeGo today and receive a complimentary double-walled borosilicate frothing carafe, premium travel sleeve, and our 3-year mechanical warranty card. Free global shipping.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[240px] z-10 relative">
              <button
                id="footer-checkout-btn"
                className="w-full py-4 px-6 rounded-xl bg-white text-[#32170d] font-sans text-xs font-bold tracking-wider uppercase hover:bg-amber-100 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CLAIM PRO EDITION ($85)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex justify-between text-[10px] font-mono opacity-60 text-amber-200 uppercase tracking-widest">
                <span>✓ 3-YEAR WARRANTY</span>
                <span>✓ FREE SHIPS</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Humble Footer */}
      <footer className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 border-t border-[#efe6e4] text-[#504440]/60 text-xs">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-sm tracking-widest text-[#1f1b19] uppercase">
              COFFEE<span className="text-[#bf9282]">GO</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest">• DESIGN LABS © 2026</span>
          </div>

          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-wider font-semibold">
            <a href="#hero-sec-main" className="hover:text-amber-900 transition-colors">Hero Stage</a>
            <a href="#viscosity-laboratory" className="hover:text-amber-900 transition-colors">Viscosity Lab</a>
            <a href="#engineering-specifications" className="hover:text-amber-900 transition-colors">Specifications</a>
            <a href="#help-and-faq" className="hover:text-amber-900 transition-colors">FAQ Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
