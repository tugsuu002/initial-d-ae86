import React from 'react';
import { AE86_SPECS } from '../data/driftData';
import { Shield, Cpu, Gauge, Wrench } from 'lucide-react';

interface CarSpecsProps {
  lang: 'mn' | 'en';
}

export const CarSpecs: React.FC<CarSpecsProps> = ({ lang }) => {
  return (
    <section id="specs" className="py-12 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase font-racing tracking-widest text-amber-500 mb-1">
            {lang === 'mn' ? 'Техникийн бүтэн үзүүлэлт' : 'Authentic Engineering Specifications'}
          </div>
          <h2 className="text-3xl font-extrabold font-racing text-white tracking-tight">
            {lang === 'mn' ? 'TOYOTA SPRINTER TRUENO GT-APEX (AE86)' : 'TOYOTA SPRINTER TRUENO GT-APEX (AE86)'}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            {lang === 'mn'
              ? 'Гүнма 55 お 13-954 улсын дугаартай, Фүживара дүпүний дэлгүүрийн домогт хар цагаан хосолсон панда Trueno-гийн албан ёсны техникийн үзүүлэлтүүд.'
              : 'Gunma 55 13-954: Complete official specifications of Takumi\'s panda coupe with TRD Group A race powertrain.'}
          </p>
        </div>

        {/* Spec Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AE86_SPECS.map((specGroup, idx) => (
            <div key={idx} className="bg-neutral-900/40 rounded-2xl border border-neutral-800 p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
                {idx === 0 ? <Cpu className="w-4 h-4 text-amber-500" /> : <Wrench className="w-4 h-4 text-amber-500" />}
                <h3 className="text-base font-bold font-racing text-white uppercase tracking-wider">
                  {lang === 'mn' ? specGroup.categoryMn : specGroup.categoryEn}
                </h3>
              </div>

              <div className="divide-y divide-neutral-850">
                {specGroup.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                    <span className="text-neutral-400 font-medium">
                      {lang === 'mn' ? item.labelMn : item.labelEn}
                    </span>
                    <span className="text-white font-mono font-semibold sm:text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Initial D Lore Card */}
        <div className="mt-8 bg-neutral-900/30 rounded-2xl border border-neutral-800 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-xs font-racing uppercase tracking-wider text-amber-500 mb-1">
              {lang === 'mn' ? 'Түүх & Дрифт соёл' : 'Touge Racing Legacy'}
            </div>
            <h4 className="text-xl font-bold font-racing text-white">
              {lang === 'mn' ? '藤原とうふ店 (自家用) — Өглөөний 04:00 цагийн сургуулилалт' : 'Fujiwara Tofu Shop — 4:00 AM Daily Akina Touge Runs'}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {lang === 'mn'
                ? 'Такуми дунд сургуулийн сурагч байхаасаа эхлэн өглөө бүр 04:00 цагт Акина уулын нуурын зочид буудалд дүпү хүргэхийн тулд бороо, цастай ямар ч цаг агаарт AE86-г унадаг байсан. Энэ 5 жилийн тасралтгүй хүргэлт түүнд ямар ч мэргэжлийн уралдаанчаас дутахааргүй хүндийн төвийн мэдрэмж, инерцээр гулгах дрифт техникийг олгосон юм.'
                : 'Since middle school, Takumi was forced to deliver tofu up Mount Akina at 4:00 AM every single morning in snow, rain, and dry conditions. 5 years of routine touge driving forged instinctive muscle memory for tire grip, weight distribution, and inertia counter-steer.'}
            </p>
          </div>

          <div className="shrink-0 bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-center font-mono">
            <div className="text-[10px] text-neutral-400 uppercase tracking-widest">Gunma Touge Plate</div>
            <div className="text-lg font-bold text-amber-400 tracking-wider mt-1">群馬 55 お 13-954</div>
            <div className="text-xs text-neutral-400 mt-1">Toyota Sprinter Trueno</div>
          </div>
        </div>
      </div>
    </section>
  );
};
