/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, GlassWater, Flame, Compass, FlameKindling, Info } from 'lucide-react';
import { SpeedLevel } from '../types';

interface Recipe {
  id: string;
  name: string;
  targetDensity: number; // percentage
  targetTime: number; // seconds
  colorLiquid: string; // espresso/cappuccino tone
  colorFoam: string; // foam/cream tone
  aerationCategory: string;
}

const RECIPES: Recipe[] = [
  {
    id: 'cappuccino',
    name: 'Barista Classic Cappuccino',
    targetDensity: 88,
    targetTime: 14,
    colorLiquid: '#4a2c20',
    colorFoam: '#fff9f2',
    aerationCategory: 'Stiff Peak Velvet',
  },
  {
    id: 'latte',
    name: 'Steamed Microfoam Latte',
    targetDensity: 48,
    targetTime: 9,
    colorLiquid: '#6a4a3a',
    colorFoam: '#fffcf7',
    aerationCategory: 'Wet Glossy Silk',
  },
  {
    id: 'matcha',
    name: 'Cérémonial Matcha Latte',
    targetDensity: 32,
    targetTime: 12,
    colorLiquid: '#3d5137',
    colorFoam: '#eef4ea',
    aerationCategory: 'Creamy Whispered Foam',
  },
];

interface FrothSimulatorProps {
  isWandSpinning: boolean;
  onSpinChange: (spinning: boolean) => void;
  speed: SpeedLevel;
}

export const FrothSimulator: React.FC<FrothSimulatorProps> = ({
  isWandSpinning,
  onSpinChange,
  speed,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(RECIPES[0]);
  const [milkType, setMilkType] = useState<'whole' | 'oat' | 'almond'>('whole');
  const [frothProgress, setFrothProgress] = useState(0); // 0 to 100
  const [isPrepActive, setIsPrepActive] = useState(false);
  const [telemetryMessage, setTelemetryMessage] = useState('Standby. Insert whisk to begin prep stimulation.');

  // Milk multipliers (Oat milk aerates slower but micro-textures uniquely, almond is dry, whole is standard velvety)
  const getMilkMultiplier = () => {
    switch (milkType) {
      case 'whole': return 1.0;
      case 'oat': return 0.85;
      case 'almond': return 0.7;
    }
  };

  const currentSpeedFactor = speed === SpeedLevel.GENTLE ? 0.7 : speed === SpeedLevel.VELVET ? 1.0 : 1.4;

  useEffect(() => {
    if (!isPrepActive) return;

    let startTime = Date.now();
    const duration = (selectedRecipe.targetTime * 1000) / (currentSpeedFactor * getMilkMultiplier());

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setFrothProgress(pct);

      if (pct < 30) {
        setTelemetryMessage('Phase 1: High-torque magnetic blade engaging. Destabilizing fat globules...');
      } else if (pct < 65) {
        setTelemetryMessage('Phase 2: Aeration trigger, driving micro-air bubbles into emulsion...');
      } else if (pct < 95) {
        setTelemetryMessage('Phase 3: Stabilization phase. Harmonizing foam cell grid size...');
      } else {
        setTelemetryMessage('Vessel completed! Highly stable, glossy microfoam structure achieved.');
        setIsPrepActive(false);
        onSpinChange(false);
        clearInterval(timer);
      }
    }, 100);

    // Turn wand on automatically
    onSpinChange(true);

    return () => {
      clearInterval(timer);
    };
  }, [isPrepActive, selectedRecipe, milkType, speed]);

  const handleStartPrep = () => {
    setFrothProgress(0);
    setIsPrepActive(true);
  };

  const handleReset = () => {
    setIsPrepActive(false);
    onSpinChange(false);
    setFrothProgress(0);
    setTelemetryMessage('System cleared. Ready for next formula run.');
  };

  // Foam volume calculations
  const totalVolumeHeight = 50 + (frothProgress / 100) * (selectedRecipe.targetDensity / 100) * 100; // dynamic froth height in absolute px

  return (
    <div className="w-full bg-[#fdfaf8] border border-[#efe6e4] rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left side: Controls and formulas config */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-bold text-amber-900/60 uppercase tracking-widest">
              AERATION LABS
            </span>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[#1f1b19]">
              Microfoam Viscosity Simulation
            </h2>
            <p className="font-sans text-xs text-[#504440] leading-relaxed max-w-lg">
              Test how different molecular structures emulsify when matched with the CoffeeGo brushless motor. Choose a recipe preset and configure your base fluid.
            </p>
          </div>

          {/* Presets List */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
              Formula Target Presets:
            </span>
            <div className="flex flex-col gap-2">
              {RECIPES.map((recipe) => {
                const isSelected = selectedRecipe.id === recipe.id;
                return (
                  <button
                    id={`recipe-pill-${recipe.id}`}
                    key={recipe.id}
                    onClick={() => {
                      if (!isPrepActive) {
                        setSelectedRecipe(recipe);
                        setFrothProgress(0);
                      }
                    }}
                    disabled={isPrepActive}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all select-none cursor-pointer ${
                      isSelected
                        ? 'border-amber-900/40 bg-amber-900/[0.03] shadow-inner'
                        : 'border-neutral-200/50 bg-white hover:bg-neutral-50'
                    } ${isPrepActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div>
                      <h4 className="font-sans text-xs font-bold text-[#1f1b19]">
                        {recipe.name}
                      </h4>
                      <p className="text-[10px] font-sans text-neutral-500 mt-0.5">
                        Target Consistency: <span className="font-semibold text-amber-900">{recipe.aerationCategory}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold block text-[#1f1b19]">
                        {recipe.targetDensity}% density
                      </span>
                      <span className="text-[9px] font-mono text-[#504440]/60 block -mt-0.5 font-medium">
                        ⏱️ {recipe.targetTime}s runtime
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Milk choice */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                Milk Emulsifier Base:
              </span>
              <div className="flex gap-1.5 p-1 bg-[#eae1de]/40 rounded-xl border border-[#efe6e4]">
                {(['whole', 'oat', 'almond'] as const).map((m) => (
                  <button
                    id={`milk-opt-${m}`}
                    key={m}
                    onClick={() => !isPrepActive && setMilkType(m)}
                    disabled={isPrepActive}
                    className={`flex-1 py-2 text-[10px] font-sans font-bold uppercase rounded-lg transition-all text-center cursor-pointer ${
                      milkType === m
                        ? 'bg-[#32170d] text-white'
                        : 'text-neutral-600 hover:bg-white/50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature preset */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">
                Thermal State:
              </span>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs">
                <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span className="font-sans font-medium text-neutral-700">Warm Texturization (65°C)</span>
              </div>
            </div>
          </div>

          {/* Active telemetry readout */}
          <div className="flex items-start gap-2.5 p-3.5 bg-neutral-100 rounded-xl">
            <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <span className="font-mono text-[10px] uppercase text-[#504440] font-semibold leading-relaxed">
              {telemetryMessage}
            </span>
          </div>

          {/* Action triggers */}
          <div className="flex gap-3">
            <button
              id="start-prep-btn"
              onClick={handleStartPrep}
              disabled={isPrepActive}
              className={`flex-1 py-3.5 px-6 rounded-xl font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer ${
                isPrepActive
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                  : 'bg-amber-800 text-white hover:bg-amber-900'
              }`}
            >
              {isPrepActive ? 'SIMULATION ENGAGED...' : 'START RUN FORMULA'}
            </button>
            <button
              id="reset-prep-btn"
              onClick={handleReset}
              className="py-3.5 px-4 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-600 font-sans text-xs font-semibold cursor-pointer"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Right side: Glassmorphic Coffee Cup rendering visually filling */}
        <div className="w-full md:w-[320px] flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-[#fbf5f2] to-[#f3eae8] rounded-2xl border border-white/80 shrink-0 select-none">
          
          <div className="relative w-full aspect-square flex items-center justify-center pt-8">
            {/* The Cup silhouette container */}
            <div className="relative w-44 h-52 bg-white/10 backdrop-blur-md rounded-b-[42px] rounded-t-[12px] border-b-[6px] border-x-4 border-white/50 flex flex-col justify-end overflow-hidden shadow-xl" style={{ borderBottomLeftRadius: '56px', borderBottomRightRadius: '56px' }}>
              
              {/* Coffee Liquid fill layer */}
              <motion.div
                animate={isPrepActive ? { y: [0, -1, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-full absolute bottom-0 transition-all duration-300"
                style={{
                  height: '140px',
                  backgroundColor: selectedRecipe.colorLiquid,
                }}
              >
                {/* Micro swirls to depict motion */}
                {isPrepActive && (
                  <motion.div
                    animate={{ x: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="w-[125%] h-5 bg-white/10 filter blur-xs -mt-1 origin-center"
                  />
                )}
              </motion.div>

              {/* Milk/Foam Emulsion layer that grows on top */}
              <motion.div
                className="w-full absolute transition-all duration-500 origin-bottom"
                style={{
                  height: `${totalVolumeHeight}px`,
                  bottom: 0,
                  backgroundColor: selectedRecipe.colorFoam,
                  opacity: 0.95,
                  // Slide in clipping mask to mimic actual fluffy foam density
                  borderTopLeftRadius: '14px',
                  borderTopRightRadius: '14px',
                }}
              >
                {/* Surface gloss shine */}
                <div className="w-full h-1.5 bg-white/60 absolute top-0" />
                
                {/* Dynamic foam wavy divider detailing Espresso Coffee lines blending */}
                <div className="absolute top-1 inset-x-0 h-4 bg-gradient-to-b from-amber-700/10 to-transparent flex items-center justify-center">
                  {isPrepActive && (
                    <span className="w-2.5 h-1 rounded-full bg-amber-600/20 mx-1 animate-ping" />
                  )}
                </div>

                {/* Foam micro aerated bubbles SVG representation */}
                <svg className="absolute inset-0 w-full h-full text-amber-900/5 fill-current">
                  <circle cx="20" cy="30" r="2" />
                  <circle cx="50" cy="45" r="3" />
                  <circle cx="120" cy="35" r="2.5" />
                  <circle cx="150" cy="50" r="1.5" />
                  <circle cx="80" cy="20" r="4" />
                </svg>
              </motion.div>

              {/* Dynamic steam rising from the hot mug */}
              <AnimatePresence>
                {isPrepActive && (
                  <div className="absolute top-4 inset-x-0 flex justify-center gap-4 pointer-events-none z-10">
                    <motion.div
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: -30, opacity: [0, 0.4, 0], scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="w-1.5 h-10 bg-white/40 filter blur-xs rounded-full"
                    />
                    <motion.div
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: -40, opacity: [0, 0.5, 0], scale: 1.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut', delay: 0.4 }}
                      className="w-2 h-12 bg-white/40 filter blur-xs rounded-full"
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Handle of the premium cup */}
            <div className="w-12 h-26 border-[6px] border-white/50 rounded-r-[32px] absolute right-[42px] top-[140px] transform rotateZ(-5deg) shadow-sm pointer-events-none" />
          </div>

          <div className="mt-8 text-center flex flex-col items-center">
            <span className="font-mono text-[10px] tracking-wider text-neutral-400 font-semibold uppercase">
              FOAM EXPANSION RATIO
            </span>
            <span className="text-3xl font-sans font-bold text-[#1f1b19] mt-1">
              +{Math.floor((frothProgress / 100) * selectedRecipe.targetDensity)}%
            </span>
            <div className="w-48 bg-neutral-200 h-1 rounded-full mt-3 overflow-hidden">
              <div
                className="bg--primary bg-[#32170d] h-full transition-all duration-300"
                style={{ width: `${frothProgress}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
