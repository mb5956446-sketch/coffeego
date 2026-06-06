/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { DeviceColor } from '../types';

interface CoffeeGoWandProps {
  color: DeviceColor;
  isSpinning: boolean;
  speedMultiplier: number; // 1 for gentle, 2 for velvet, 3 for whirlwind
}

export const CoffeeGoWand: React.FC<CoffeeGoWandProps> = ({
  color,
  isSpinning,
  speedMultiplier,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: -10, y: 15 }); // elegant default tilt
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for high-end feel
  const springX = useSpring(0, { stiffness: 100, damping: 15 });
  const springY = useSpring(0, { stiffness: 100, damping: 15 });
  const springScale = useSpring(1, { stiffness: 120, damping: 12 });
  const glossPositionX = useSpring(50, { stiffness: 80, damping: 15 });

  useEffect(() => {
    if (!isHovered) {
      // Return to elegant floating default
      springX.set(10);
      springY.set(-15);
      springScale.set(1);
      glossPositionX.set(45);
    } else {
      springScale.set(1.06);
    }
  }, [isHovered, springX, springY, springScale, glossPositionX]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Get mouse coordinates relative to center (from -0.5 to 0.5)
    const relativeX = (e.clientX - rect.left - width / 2) / (width / 2);
    const relativeY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Dynamic rotation mapping (caps at 25 deg for ergonomics)
    springX.set(-relativeY * 22);
    springY.set(relativeX * 22);
    
    // Specular highlight shift (gradient position 0% - 100%)
    const glossPercent = 50 + relativeX * 35;
    glossPositionX.set(glossPercent);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Dynamic colors for the model surfaces
  const getBodyColor = () => {
    switch (color) {
      case DeviceColor.OBSIDIAN:
        return 'linear-gradient(135deg, #222224 0%, #151516 45%, #0e0e0f 100%)';
      case DeviceColor.LATTE:
        return 'linear-gradient(135deg, #f7f3ed 0%, #ece4da 45%, #dccfbe 100%)';
      case DeviceColor.AURUM:
        return 'linear-gradient(135deg, #cca285 0%, #b38562 45%, #926340 100%)';
    }
  };

  const getBodyShadow = () => {
    switch (color) {
      case DeviceColor.OBSIDIAN:
        return 'rgba(14, 14, 15, 0.45)';
      case DeviceColor.LATTE:
        return 'rgba(190, 170, 150, 0.35)';
      case DeviceColor.AURUM:
        return 'rgba(146, 99, 64, 0.40)';
    }
  };

  const getTextColor = () => {
    return color === DeviceColor.LATTE ? 'text-neutral-500' : 'text-neutral-400';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: '1200px' }}
      id="3d-wand-container"
    >
      {/* 3D Moving Stage */}
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          scale: springScale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[340px] h-[440px] flex items-center justify-center transition-all duration-300"
      >
        {/* Soft Dynamic Drop Shadow Layer */}
        <motion.div
          className="absolute rounded-full filter blur-3xl opacity-60 transition-colors duration-500"
          style={{
            width: '180px',
            height: '60px',
            background: getBodyShadow(),
            bottom: '10px',
            transform: 'translateZ(-80px) rotateX(75deg)',
          }}
        />

        {/* --- BACK splash (liquid simulation behind device) --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateZ(-40px)' }}>
          {/* Main brown coffee splash shape background representation */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Fluid dynamic back splash vector */}
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full text-amber-900/10 fill-current filter blur-[1px]">
              <path d="M42.1,-55.8C54,-47C62.7,-34.5,68.2,-19.9,69.5,-4.7C70.9,10.6,69.4,26.5,61.9,39.3C54.4,52.1,40.9,61.9,25.9,66.6C10.9,71.3,-5.6,70.9,-21.7,66.4C-37.8,61.9,-53.4,53.3,-62.4,40.1C-71.3,26.9,-73.6,9.1,-71,-7.6C-68.4,-24.3,-60.9,-39.8,-49.2,-48.7C-37.4,-57.6,-21.3,-59.8,-5.5,-53.1C10.3,-46.3,20.6,-57,42.1,-55.8Z" transform="translate(100 100)" />
            </svg>

            {/* Coffee Drops flying (with floating animation) */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                x: [0, 8, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-8 left-4 w-4 h-4 rounded-full bg-[#5c4033]/25"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute bottom-12 right-2 w-5 h-5 rounded-full bg-amber-800/20"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/4 right-6 w-3 h-3 rounded-full bg-amber-950/30"
            />
          </div>
        </div>

        {/* --- FRONT: The volumetric body of CoffeeGo wand --- */}
        <div
          className="relative w-[76px] h-[340px] rounded-[38px] overflow-hidden shadow-2xl transition-all duration-500 border border-white/5"
          style={{
            background: getBodyColor(),
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px) rotateZ(-25deg)', // Floating tilt angle as in prompt
          }}
        >
          {/* Specular Highlight Sheen (Moves with cursor coordinate) */}
          <motion.div
            className="absolute inset-y-0 w-[40px] pointer-events-none mix-blend-overlay opacity-60 filter blur-[2px]"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%)',
              left: useTransform(glossPositionX, (v) => `${v - 20}%`),
            }}
          />

          {/* Vertical cylindrical lighting to enhance shape volume */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-black/45" />

          {/* Top Metallic Cap */}
          <div
            className="absolute top-0 inset-x-0 h-[10px] bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 border-b border-black/10 flex items-center justify-center overflow-hidden"
          >
            {/* Fine brushed metal details */}
            <div className="w-full h-[1px] bg-neutral-600 opacity-20" />
          </div>

          {/* Upper Body (Handle Section) */}
          <div className="absolute top-[10px] inset-x-0 h-[115px] flex flex-col items-center justify-start pt-6 px-2 text-center">
            {/* Minimal logo wordmark engraved/printed */}
            <div className="font-sans text-[9px] tracking-[0.25em] font-bold uppercase transition-colors duration-500 select-none flex flex-col items-center gap-[2px]">
              <span className={color === DeviceColor.LATTE ? 'text-amber-900/80' : 'text-neutral-200'}>
                COFFEE
              </span>
              <span className={color === DeviceColor.LATTE ? 'text-amber-700 font-medium' : 'text-amber-400 font-medium'}>
                GO
              </span>
            </div>

            {/* Tiny battery status LED glow pin */}
            <div className="mt-8 flex gap-1 justify-center items-center">
              <span className={`w-1 h-1 rounded-full ${isSpinning ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`} />
              <span className={`w-1 h-1 rounded-full ${isSpinning ? 'bg-emerald-400/70 animate-pulse' : 'bg-neutral-500'}`} />
              <span className={`w-1 h-1 rounded-full ${isSpinning ? 'bg-emerald-400/50 animate-pulse' : 'bg-neutral-500'}`} />
            </div>
          </div>

          {/* Brushed Stainless Steel Center Segment Band (Industrial design divider) */}
          <div
            className="absolute top-[125px] inset-x-0 h-[26px] bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 border-t border-b border-black/20 flex flex-col justify-around py-[2px] opacity-95 shadow-inner"
          >
            {/* Brushed lines to accentuate metal texture */}
            <div className="w-full h-[1px] bg-white/20" />
            <div className="w-full h-[1px] bg-black/10" />
            <div className="w-full h-[1px] bg-white/25" />
          </div>

          {/* Lower Body (Charger + Motor Housing Section) */}
          <div className="absolute top-[151px] inset-x-0 bottom-[14px] flex flex-col items-center justify-start pt-10">
            {/* USB-C Port engraving details (SVG) */}
            <div className="relative group/usbc flex flex-col items-center">
              <div className="w-[18px] h-[7px] rounded-full bg-black/50 border border-white/10 flex items-center justify-center p-[1px] shadow-inner">
                {/* Internal receptacle bar */}
                <div className="w-[12px] h-[2.5px] rounded-sm bg-amber-500/80 opacity-90" />
              </div>
              <span className="text-[6px] font-mono mt-1 text-center text-neutral-400/70 tracking-widest uppercase">
                CHARGE
              </span>
            </div>
          </div>

          {/* Bottom Brushed Metal Fitting Ring */}
          <div
            className="absolute bottom-0 inset-x-0 h-[14px] bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 border-t border-black/15 overflow-hidden"
          >
            <div className="w-full h-[1px] bg-black/10" />
            <div className="w-full h-[2px] bg-white/15" />
          </div>
        </div>

        {/* --- FRONT: Extension metal stem and whisk whisking! --- */}
        <motion.div
          animate={
            isSpinning
              ? {
                  rotateY: [0, 360],
                  y: [-0.5, 0.5, -0.5],
                }
              : { rotateY: 0, y: 0 }
          }
          transition={
            isSpinning
              ? {
                  rotateY: {
                    repeat: Infinity,
                    duration: 0.15 / speedMultiplier,
                    ease: 'linear',
                  },
                  y: {
                    repeat: Infinity,
                    duration: 0.3,
                    ease: 'easeInOut',
                  },
                }
              : {}
          }
          style={{
            transformOrigin: 'top center',
            transform: 'translateZ(18px) rotateZ(-25deg)',
          }}
          className="absolute origin-top flex flex-col items-center"
          // We align this specifically to connect with the base of the wand
          id="whisk-shaft"
        >
          {/* Placing shaft position relative to the tilted base cap */}
          <div className="absolute top-[162px] left-[7px] flex flex-col items-center">
            {/* The stainless steel Whisk Stem */}
            <div className="w-[3px] h-[110px] bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 shadow-md" />

            {/* Double-loop custom whisk head */}
            <div className="relative w-[18px] h-[16px] -mt-[1px] flex items-center justify-center">
              {/* Mesh detailing using SVGs */}
              <svg viewBox="0 0 40 40" className="w-full h-full text-neutral-300 stroke-neutral-400 fill-neutral-500">
                <ellipse cx="20" cy="20" rx="16" ry="8" strokeWidth="2" />
                <ellipse cx="20" cy="20" rx="12" ry="12" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="4" strokeWidth="1" />
              </svg>
            </div>
            
            {/* Liquid Whirlwind effect when active under the whisk */}
            {isSpinning && (
              <motion.div
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  ease: 'linear',
                }}
                className="w-14 h-6 -mt-1 rounded-full border border-dashed border-amber-900/30 bg-amber-800/10 filter blur-[0.5px]"
              />
            )}
          </div>
        </motion.div>

        {/* --- FRONT OVERLAY: Front coffee drops floating over the wand --- */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(45px)' }}>
          {/* Coffee foam bubbles flying horizontally across foreground */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 15, 0],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute bottom-1/4 left-10 w-3 h-3 rounded-full bg-[#f4ebe1] border border-[#dccfbe]/50 shadow-sm"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
              x: [0, -12, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
            className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#cfa17e] shadow-sm"
          />
        </div>
      </motion.div>
    </div>
  );
};
