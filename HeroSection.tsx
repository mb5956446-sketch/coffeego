/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Volume2, VolumeX, Sparkles, RefreshCw } from 'lucide-react';
import { DeviceColor, SpeedLevel } from '../types';
import { CoffeeGoWand } from './CoffeeGoWand';

interface HeroSectionProps {
  activeColor: DeviceColor;
  onColorChange: (color: DeviceColor) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  speed: SpeedLevel;
  setSpeed: (speed: SpeedLevel) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeColor,
  onColorChange,
  isSpinning,
  setIsSpinning,
  speed,
  setSpeed,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Map speed configuration
  const speedsInfo = {
    [SpeedLevel.GENTLE]: { rpm: 6500, label: 'Gentle Whisk', hz: 120, detail: 'Perfect for matcha blending & cacao folding' },
    [SpeedLevel.VELVET]: { rpm: 9800, label: 'Velvet Microfoam', hz: 180, detail: 'The sweet spot for seamless, glossy barista microfoam' },
    [SpeedLevel.WHIRLWIND]: { rpm: 13500, label: 'Whirlwind Cold Foam', hz: 260, detail: 'Industrial power for thick, cloud-like cold foam caps' },
  };

  const activeSpeedMultiplier = speed === SpeedLevel.GENTLE ? 1 : speed === SpeedLevel.VELVET ? 1.6 : 2.2;

  // Web Audio synthesizer for motor humming
  useEffect(() => {
    if (!audioEnabled || !isSpinning) {
      stopMotorSound();
      return;
    }
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous osc if exists
      stopMotorSound();

      // Create new oscillator for high-fidelity motor buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Low hum frequency modulated by speed and subtle distortion to mimic battery motor
      const currentSpeedInfo = speedsInfo[speed];
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(currentSpeedInfo.hz, ctx.currentTime);

      // Lowpass filter to muffle high harsh buzz and make it more "whisper silent" as a premium motor should be!
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(currentSpeedInfo.hz * 1.5, ctx.currentTime);

      // Gain controls
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.1); // subtle, not piercing

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.error('Audio initialization failed', e);
    }

    return () => {
      stopMotorSound();
    };
  }, [isSpinning, speed, audioEnabled]);

  const stopMotorSound = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
  };

  const handleToggleActive = () => {
    setIsSpinning(!isSpinning);
    
    // Play subtle mechanical switch click sound
    if (audioEnabled) {
      try {
        const ctx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
        if (!audioContextRef.current) audioContextRef.current = ctx;
        
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'sine';
        clickOsc.frequency.setValueAtTime(800, ctx.currentTime);
        clickOsc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
        
        clickGain.gain.setValueAtTime(0.04, ctx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start();
        clickOsc.stop(ctx.currentTime + 0.06);
      } catch (err) {}
    }
  };

  // Color Swatch Data Map
  const colorSwatches = [
    {
      id: DeviceColor.OBSIDIAN,
      name: 'Obsidian Matte Black',
      desc: 'Finished with a proprietary carbon-composite shell. Scratch-resistant, fingerprintless, and inspired by cooling volcanic glass.',
      hex: '#1d1d1f',
      metal: '#8e8e93',
      badge: 'PRO STANDARD',
    },
    {
      id: DeviceColor.LATTE,
      name: 'Latte Eggshell Cream',
      desc: 'Satin anodized powder coat that evokes warm porcelain microfoam structures. Soft to the touch, and designed to look organic in light kitchens.',
      hex: '#eedfce',
      metal: '#ffd3b6',
      badge: 'LIMITED COFFEEHOUSE',
    },
    {
      id: DeviceColor.AURUM,
      name: 'Aurum Satin Gold',
      desc: 'Layered with a micro-thin finish of titanium-copper alloy. Reflects light gracefully; engineered for those who treat coffee making as a sacred ritual.',
      hex: '#c5a880',
      metal: '#ffd700',
      badge: 'ARTISANAL EDITION',
    },
  ];

  const activeSwatch = colorSwatches.find((s) => s.id === activeColor) || colorSwatches[0];

  return (
    <section id="hero-sec-main" className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Typographic and action column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          
          {/* Limited edition capsule badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eae1de] rounded-full border border-white/80 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bf9282] animate-ping" />
            <span className="font-mono text-[10px] tracking-[0.15em] font-bold uppercase text-[#504440]">
              {activeSwatch.badge}
            </span>
          </div>

          <h1 className="font-sans text-5xl sm:text-6xl font-bold tracking-tight text-[#1f1b19] leading-[1.08] max-w-xl">
            The Art of <br />
            <span style={{ color: activeSwatch.hex === '#1d1d1f' ? '#32170d' : activeSwatch.hex }} className="transition-colors duration-500">
              Microfoam
            </span>, Engineered.
          </h1>

          <p className="font-sans text-base text-[#504440] leading-relaxed max-w-md">
            The next-generation handheld milk texturizer with high-torque magnetic propulsion and smart solid-state balance. Experience true latte art viscosity in seconds.
          </p>

          {/* Interactive controls box */}
          <div className="w-full max-w-[500px] border border-white bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm flex flex-col gap-5 mt-2">
            
            {/* Color Swatch selector */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] tracking-wider font-bold text-[#504440] uppercase">
                Anodized Finishes:
              </span>
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  {colorSwatches.map((swatch) => (
                    <button
                      id={`hero-swatch-${swatch.id}`}
                      key={swatch.id}
                      onClick={() => onColorChange(swatch.id)}
                      className={`w-9 h-9 rounded-full relative cursor-pointer flex items-center justify-center transition-all duration-300 ${
                        activeColor === swatch.id
                          ? 'ring-2 ring-offset-2 ring-[#32170d] scale-105'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: swatch.id === DeviceColor.LATTE ? '#ede7df' : swatch.hex }}
                    >
                      {activeColor === swatch.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-sans font-bold text-[#1f1b19]">
                    {activeSwatch.name}
                  </span>
                  <span className="text-xs font-sans text-neutral-500 line-clamp-1">
                    {activeSwatch.id === DeviceColor.OBSIDIAN ? 'Matte Carbon composite' : activeSwatch.id === DeviceColor.LATTE ? 'Eggshell ceramic powder coat' : 'Titanium-copper alloy finish'}
                  </span>
                </div>
              </div>
              <p className="text-xs font-sans text-[#504440]/80 italic mt-1 leading-normal">
                {activeSwatch.desc}
              </p>
            </div>

            <hr className="border-neutral-100" />

            {/* Gear Selector - Elegant responsive pills */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[11px] tracking-wider font-bold text-[#504440] uppercase">
                  Telemetry speed controller:
                </span>
                <span className="text-xs font-mono font-bold tracking-tight text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-900/10">
                  {speedsInfo[speed].rpm.toLocaleString()} RPM
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(speedsInfo) as SpeedLevel[]).map((lvl) => {
                  const isActive = speed === lvl;
                  return (
                    <button
                      id={`speed-btn-${lvl}`}
                      key={lvl}
                      onClick={() => setSpeed(lvl)}
                      className={`py-3 px-1 rounded-xl text-xs font-sans font-semibold tracking-wider uppercase transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                        isActive
                          ? 'bg-[#32170d] text-white border-[#32170d] shadow-sm'
                          : 'bg-neutral-50 text-[#504440] border-neutral-200/50 hover:bg-neutral-100/50'
                      }`}
                    >
                      <span className="text-[10px] tracking-widest">{lvl}</span>
                      <span className={`text-[8px] font-mono opacity-80 ${isActive ? 'text-amber-300' : 'text-neutral-400'}`}>
                        {speedsInfo[lvl].hz * 60} hz
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-sans text-neutral-500 italic mt-0.5 leading-snug">
                {speedsInfo[speed].detail}
              </p>
            </div>

            <hr className="border-neutral-100" />

            {/* Switch Controller */}
            <div className="flex gap-3 items-center">
              <button
                id="motor-switch-trigger"
                onClick={handleToggleActive}
                className={`flex-1 py-4 px-6 rounded-2xl font-sans text-xs font-bold tracking-widest uppercase cursor-pointer shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSpinning
                    ? 'bg-amber-600 text-white hover:bg-amber-700 animate-pulse'
                    : 'bg-[#32170d] text-white hover:bg-[#4b2c20]'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                {isSpinning ? 'ACTIVE (WHIPPING)' : 'START WHISK MOTOR'}
              </button>

              {/* Sound activator */}
              <button
                id="audio-feed-switch"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  audioEnabled
                    ? 'bg-amber-50 border-amber-900/30 text-amber-900 shadow-inner'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-400 hover:bg-neutral-100'
                }`}
                title={audioEnabled ? 'Disable Engine Buzz Sound' : 'Enable Live Engine Buzz Sound'}
              >
                {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>
            
            {audioEnabled && isSpinning && (
              <span className="text-[9px] font-mono text-center text-amber-800 tracking-wider font-semibold animate-pulse">
                🔊 Audio Engine Simulated: {speedsInfo[speed].hz}Hz Synth Oscillating
              </span>
            )}
          </div>
        </div>

        {/* 3D Interactive Display Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative bg-gradient-to-b from-[#fdfbf7] to-[#f4ebe9] rounded-3xl border border-white/60 shadow-inner p-4 overflow-hidden group">
          
          {/* Subtle instructions */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 bg-white/40 backdrop-blur-xs rounded-full border border-white text-[9px] font-mono text-[#504440] font-semibold">
            <Sparkles className="w-2.5 h-2.5 text-amber-700" />
            <span>MOVE MOUSE TO TILT 3D WAND</span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-white/40 backdrop-blur-xs border border-white rounded-xl py-1 px-2.5 font-mono text-[9px] text-[#504440]/80">
            <Cpu className="w-3 h-3 text-amber-900" />
            <span>Gyro active</span>
          </div>

          {/* Central Wand widget */}
          <CoffeeGoWand
            color={activeColor}
            isSpinning={isSpinning}
            speedMultiplier={activeSpeedMultiplier}
          />
        </div>
      </div>
    </section>
  );
};
