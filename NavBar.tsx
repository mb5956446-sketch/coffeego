/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Battery, Cpu, Share2 } from 'lucide-react';
import { DeviceColor } from '../types';

interface NavBarProps {
  activeColor: DeviceColor;
  isSpinning: boolean;
  onColorChange: (color: DeviceColor) => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  activeColor,
  isSpinning,
  onColorChange,
}) => {
  return (
    <header
      id="main-nav-header"
      className="sticky top-4 z-50 w-full max-w-[1200px] mx-auto px-4 sm:px-6"
    >
      <div
        className="relative w-full h-16 rounded-full px-6 flex items-center justify-between border border-white/40 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300"
        style={{
          boxShadow: '0 8px 32px 0 rgba(75, 44, 32, 0.04)',
        }}
      >
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#32170d] to-[#613e31] flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold font-sans tracking-widest pl-[1px]">C</span>
            {isSpinning && (
              <span className="absolute inset-x-0 inset-y-0 border-2 border-dashed border-amber-400 rounded-full animate-spin" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-sm font-bold tracking-[0.14em] text-[#1f1b19] uppercase leading-tight">
              COFFEE<span className="text-[#bf9282] ml-[2px]">GO</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#504440]/60 -mt-1 font-semibold uppercase">
              companion
            </span>
          </div>
        </div>

        {/* Floating Quick Swatch selection */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-[#f5ece9]/50 rounded-full border border-white/50">
            <span className="text-xs font-sans tracking-wider font-semibold text-[#504440] mr-1">
              Select Finish:
            </span>
            <div className="flex gap-2">
              <button
                id="nav-swatch-obsidian"
                onClick={() => onColorChange(DeviceColor.OBSIDIAN)}
                className={`w-[14px] h-[14px] rounded-full bg-[#1b1b1c] relative cursor-pointer outline-offset-2 transition-all ${
                  activeColor === DeviceColor.OBSIDIAN ? 'ring-2 ring-[#32170d]' : 'opacity-70 hover:opacity-100'
                }`}
                title="Obsidian Matte Black"
              />
              <button
                id="nav-swatch-latte"
                onClick={() => onColorChange(DeviceColor.LATTE)}
                className={`w-[14px] h-[14px] rounded-full bg-[#eae3d9] relative cursor-pointer outline-offset-2 transition-all ${
                  activeColor === DeviceColor.LATTE ? 'ring-2 ring-[#32170d]' : 'opacity-70 hover:opacity-100'
                }`}
                title="Latte Eggshell Cream"
              />
              <button
                id="nav-swatch-aurum"
                onClick={() => onColorChange(DeviceColor.AURUM)}
                className={`w-[14px] h-[14px] rounded-full bg-[#be9b7b] relative cursor-pointer outline-offset-2 transition-all ${
                  activeColor === DeviceColor.AURUM ? 'ring-2 ring-[#32170d]' : 'opacity-70 hover:opacity-100'
                }`}
                title="Aurum Satin Gold"
              />
            </div>
          </div>
        </nav>

        {/* Hardware telemetry indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100/50 rounded-full border border-white text-[#504440] font-mono text-xs">
            <Battery className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="font-semibold tracking-tight">92%</span>
          </div>

          <button
            id="nav-cta-buy"
            className="h-10 px-5 rounded-full bg-[#32170d] text-white hover:bg-[#4b2c20] shadow-sm flex items-center gap-2 hover:gap-3 transition-all duration-300 font-sans text-xs font-semibold tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ORDER NOW</span>
          </button>
        </div>
      </div>
    </header>
  );
};
