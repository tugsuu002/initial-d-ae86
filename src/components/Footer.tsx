import React from 'react';

interface FooterProps {
  lang: 'mn' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 py-8 text-neutral-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-racing font-bold text-neutral-300 text-sm tracking-wider uppercase">
            Initial D · AE86 Panda Trueno
          </span>
          <span className="mx-2 text-neutral-700">·</span>
          <span>藤原とうふ店 (自家用)</span>
        </div>

        <div className="text-center sm:text-right text-neutral-400">
          {lang === 'mn'
            ? 'Акина уулын дрифт болон Toyota Sprinter Trueno-гийн интерактив үзүүлэн.'
            : 'Interactive showcase dedicated to Mount Akina Touge & the Toyota Sprinter Trueno.'}
        </div>
      </div>
    </footer>
  );
};
