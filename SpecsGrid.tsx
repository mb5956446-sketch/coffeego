/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, BatteryCharging, Radio, Hammer, Wind } from 'lucide-react';
import { ProductFeature } from '../types';

const FEATURES: ProductFeature[] = [
  {
    id: 'motor',
    title: 'High-Torque Magnetic Core',
    icon: 'zap',
    description: 'Propelled by a miniature brushless magnetic core that delivers 13,500 RPM with whisper-silent sound dBs.',
    specValue: '13.5K RPM',
  },
  {
    id: 'materials',
    title: 'Aerospace Grade Shell',
    icon: 'hammer',
    description: 'Constructed using premium CNC-machined recycled aluminum billet that balances beautifully in the palm.',
    specValue: '6061 Billet',
  },
  {
    id: 'stem',
    title: 'Titanium-Alloy Stem',
    icon: 'wind',
    description: 'Reinforced micro-welded titanium stem prevents flex or wobble at extreme revolutions for stable pouring.',
    specValue: 'Ti-03 Grade',
  },
  {
    id: 'charger',
    title: 'Type-C Smart Charging',
    icon: 'battery',
    description: 'Recharges from flat to Full in 28 minutes. Features temperature safety cutoff and smart circuit regulation.',
    specValue: 'USB-C 18W',
  },
  {
    id: 'duration',
    title: 'Expanded Cell Lifespan',
    icon: 'shield',
    description: 'High-capacity lithium polymer holds enough charge for up to 120 consecutive velvety cappuccino froth sessions.',
    specValue: '120 Sessions',
  },
  {
    id: 'radio',
    title: 'Calibrated Balancer',
    icon: 'radio',
    description: 'Internal solid-state counterweights offset rotational force, reducing wrist fatigue compared to cheap mixers.',
    specValue: '98% True Center',
  },
];

const renderIcon = (iconName: string) => {
  const css = "w-5 h-5 text-amber-900";
  switch (iconName) {
    case 'zap': return <Zap className={css} />;
    case 'hammer': return <Hammer className={css} />;
    case 'wind': return <Wind className={css} />;
    case 'battery': return <BatteryCharging className={css} />;
    case 'shield': return <ShieldCheck className={css} />;
    case 'radio': return <Radio className={css} />;
    default: return <Zap className={css} />;
  }
};

export const SpecsGrid: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-1 items-start">
        <span className="font-mono text-xs font-bold text-amber-900/60 uppercase tracking-widest">
          HARDWARE BLUEPRINT
        </span>
        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#1f1b19]">
          Engineered to Barista Standards
        </h2>
        <p className="font-sans text-xs text-[#504440] leading-relaxed max-w-xl">
          We spent 18 months perfecting the rotational center-of-gravity of the hand wand to ensure smooth vibrationless milk folding. Here is the engineering makeup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <motion.div
            id={`spec-card-${feature.id}`}
            key={feature.id}
            whileHover={{ y: -6, scale: 1.015 }}
            className="p-6 rounded-2xl bg-white/60 border border-white/80 backdrop-blur-md shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            style={{
              boxShadow: '0 8px 32px 0 rgba(75, 44, 32, 0.02)',
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100/30 group-hover:bg-amber-100 transition-colors">
                {renderIcon(feature.icon)}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans text-sm font-bold text-[#1f1b19]">
                  {feature.title}
                </h3>
                <p className="font-sans text-xs text-[#504440] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
            
            <div className="mt-5 border-t border-neutral-100 pt-3 flex justify-between items-center">
              <span className="font-mono text-[9px] tracking-wider text-neutral-400 font-bold uppercase">
                SPEC VALUE
              </span>
              <span className="font-mono text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-900/10">
                {feature.specValue}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
