/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { FaqItem } from '../types';

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    question: 'How does the magnetic blade align without vibration?',
    answer: 'The CoffeeGo utilizes a high-performance brushless core containing dynamic, self-balancing magnets. It automatically centers its center of gravity when active on any speed levels, ensuring that all vibration is dissolved inside the titanium shaft before reaching your hand.',
  },
  {
    id: 'f2',
    question: 'Can I use CoffeeGo for heavy protein or thick cocoa blends?',
    answer: 'Absolutely. Choose the "Whirlwind" speed setting. It raises torque output to 13,500 RPM, which emulsifies heavy protein suspensions, sugar syrups, hot chocolates, and matcha blends with ease.',
  },
  {
    id: 'f3',
    question: 'How do I clean the whisk head safely?',
    answer: 'The titanium-core whisk head can be cleaned effortlessly by placing it under running warm water and turning the motor on to "Gentle" for 3-5 seconds. You do not need to dismantle any parts.',
  },
  {
    id: 'f4',
    question: 'How long does the battery hold charge, and can I quick-charge?',
    answer: 'The premium lithium polymer holds life for up to 120 velvet latte frothing runs. It includes Type-C QuickCharge 3.0, taking it from flat empty to fully loaded in only 28 minutes flat.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-1 items-start">
        <span className="font-mono text-xs font-bold text-amber-900/60 uppercase tracking-widest">
          PRODUCT INQUIRIES
        </span>
        <h2 className="font-sans text-2xl font-bold tracking-tight text-[#1f1b19]">
          Sleek Accordions FAQ
        </h2>
        <p className="font-sans text-xs text-[#504440] leading-relaxed max-w-xl">
          Everything you need to know about the operation, charging rates, and materials of the CoffeeGo professional handheld texturizer.
        </p>
      </div>

      <div className="flex flex-col border-t border-neutral-100 divide-y divide-neutral-100">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div id={`faq-accordion-${item.id}`} key={item.id} className="py-5 select-none">
              <button
                id={`faq-btn-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
              >
                <span className="font-sans text-sm font-semibold text-[#1f1b19] group-hover:text-amber-900 transition-colors">
                  {item.question}
                </span>
                
                {/* Rotating Indicator smoothly */}
                <motion.div
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-6 h-6 rounded-full bg-neutral-100 group-hover:bg-amber-50 flex items-center justify-center shrink-0 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-900" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-xs text-[#504440] leading-relaxed pr-8">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
