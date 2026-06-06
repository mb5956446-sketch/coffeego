/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum DeviceColor {
  OBSIDIAN = 'obsidian',
  LATTE = 'latte',
  AURUM = 'aurum',
}

export interface ColorVariant {
  id: DeviceColor;
  name: string;
  hex: string;
  accentHex: string;
  metalHex: string;
  description: string;
}

export enum SpeedLevel {
  GENTLE = 'gentle',
  VELVET = 'velvet',
  WHIRLWIND = 'whirlwind',
}

export interface SpeedSetting {
  level: SpeedLevel;
  rpm: number;
  label: string;
  description: string;
  density: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  icon: string;
  description: string;
  specValue: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
