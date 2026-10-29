import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Award, AlertCircle, RotateCcw, CheckCircle2, ChevronRight, Waves } from 'lucide-react';

interface WaterCupProps {
  lang: 'mn' | 'en';
}

export const WaterCupSimulator: React.FC<WaterCupProps> = ({ lang }) => {
  const [curveIndex, setCurveIndex] = useState(0); // 0 to 4 (5 consecutive hairpins)
  const [steerAngle, setSteerAngle] = useState(0); // -100 to 100
  const [waterTilt, setWaterTilt] = useState(0); // water level displacement
  const [tofuHealth, setTofuHealth] = useState(100);
  const [spilledWater, setSpilledWater] = useState(0); // total drops spilled
  const [statusMessage, setStatusMessage] = useState<string>('');

  const hairpins = [
    { id: 1, nameMn: '1-р Эргэлт: Замын орох хэсгийн огцом баруун', nameEn: 'Hairpin 1: Entry Right Sweeper', dir: 'right', sharp: 45 },
    { id: 2, nameMn: '2-р Эргэлт: Тэвштэй зүүн огцом нугалаас', nameEn: 'Hairpin 2: Inside Gutter Left Hook', dir: 'left', sharp: 65 },
    { id: 3, nameMn: '3-р Эргэлт: Акинагийн хамгийн нарийн S-эргэлт', nameEn: 'Hairpin 3: Narrow Touge S-Chicane', dir: 'right', sharp: 75 },
    { id: 4, nameMn: '4-р Эргэлт: Борооны тэвшний эцсийн зүүн', nameEn: 'Hairpin 4: Critical Downhill Left Hairpin', dir: 'left', sharp: 80 },
    { id: 5, nameMn: '5-р Эргэлт: Барианд орох өндөр хурдны нум', nameEn: 'Hairpin 5: Final High-Speed Exit Curve', dir: 'right', sharp: 50 },
  ];

  const currentHairpin = hairpins[curveIndex];

  // Water physics simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Natural spring back to center
      setWaterTilt((prev) => {
        const target = steerAngle * 0.45;
        const diff = target - prev;
        return prev + diff * 0.15;
      });

      // Check if water exceeds cup rim (abs(waterTilt) > 32)
      if (Math.abs(waterTilt) > 30) {
        setSpilledWater((s) => s + 1);
        setTofuHealth((h) => Math.max(0, h - 3));
        if (tofuHealth < 30) {
          setStatusMessage(
            lang === 'mn'
              ? 'Бунта: "Хэт огцом шарвалаа! Дүпү няцарч худалдах аргагүй боллоо!"'
              : 'Bunta: "Too violent! The tofu is completely squashed, customers won\'t buy this!"'
          );
        } else {
          setStatusMessage(
            lang === 'mn'
              ? 'Бунта: "Болгоомжтой! Ус асгараад эхэллээ, хүндийн төвөө жигд шилжүүл!"'
              : 'Bunta: "Careful! Water is splashing out—smooth out your weight transfer!"'
          );
        }
      } else {
        if (tofuHealth > 85) {
          setStatusMessage(
            lang === 'mn'
              ? 'Бунта: "Төгс жигд байна. Нэг ч дусал алдалгүй гулгаж байна."'
              : 'Bunta: "Flawless inertia control. Not a single drop lost."'
          );
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [steerAngle, waterTilt, tofuHealth, lang]);

  const handleSteer = (val: number) => {
    setSteerAngle(val);
    if (Math.abs(val) > 40) {
      audioEngine.playTireSqueal(200);
    }
  };

  const handleNextHairpin = () => {
    if (curveIndex < hairpins.length - 1) {
      setCurveIndex((c) => c + 1);
      setSteerAngle(0);
      setWaterTilt(0);
    }
  };

  const resetGame = () => {
    setCurveIndex(0);
    setSteerAngle(0);
    setWaterTilt(0);
    setTofuHealth(100);
    setSpilledWater(0);
    setStatusMessage('');
  };

  return (
    <section id="water-cup" className="py-12 border-t border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs uppercase font-racing tracking-widest text-amber-500 mb-1">
            {lang === 'mn' ? 'Бунта Фүживарагийн сургуулилалт' : 'Bunta\'s Legendary Tofu Delivery Test'}
          </div>
          <h2 className="text-3xl font-extrabold font-racing text-white tracking-tight">
            {lang === 'mn' ? 'УСНЫ АЯГАНЫ ТЭНЦВЭРИЙН ТУРШИЛТ' : 'WATER CUP BALANCE SIMULATOR'}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            {lang === 'mn'
              ? 'Акина уулын 5 дараалсан үсний хавчаар эргэлтээр жолоогоо жигд залж, аягатай усыг асгалгүйгээр дүпүг бүрэн бүтэн хүргэх сорилт.'
              : 'Master weight transfer through Akina\'s 5 hairpins. Steer smoothly so water doesn\'t spill and crush the delicate tofu in the trunk!'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6 sm:p-8">
          {/* Left: The Water Cup Graphic with Dynamic Surface */}
          <div className="flex flex-col items-center justify-center p-6 bg-neutral-950 rounded-xl border border-neutral-850">
            <div className="text-xs font-mono text-neutral-400 mb-3 flex items-center gap-1.5">
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'mn' ? 'Хяналтын самбарын аяга' : 'Dashboard Cup Holder'}</span>
            </div>

            {/* Cup Graphic */}
            <div className="relative w-48 h-60 flex items-center justify-center">
              {/* Cup holder frame */}
              <div className="absolute inset-x-8 bottom-4 h-12 bg-neutral-900 rounded-b-xl border border-neutral-700 shadow-md" />

              {/* Paper Cup Shape (trapezoid cup) */}
              <div className="relative w-36 h-48 bg-gradient-to-b from-neutral-200 via-neutral-100 to-neutral-300 rounded-b-2xl border-2 border-neutral-400 overflow-hidden shadow-2xl flex flex-col justify-end">
                {/* Initial D Logo on Cup */}
                <div className="absolute top-8 inset-x-0 text-center font-racing font-extrabold text-red-600 text-sm tracking-widest select-none pointer-events-none">
                  INITIAL D<br />
                  <span className="text-[10px] text-neutral-700 font-mono">藤原とうふ店</span>
                </div>

                {/* Animated Water Surface */}
                <div
                  className="w-full bg-cyan-400/80 backdrop-blur-sm border-t-2 border-cyan-200 transition-all duration-100 ease-out flex items-center justify-center"
                  style={{
                    height: '65%',
                    transform: `skewY(${-waterTilt * 0.45}deg) translateY(${Math.abs(waterTilt) * 0.1}px)`,
                    transformOrigin: 'center'
                  }}
                >
                  <div className="text-[10px] text-cyan-950 font-mono font-semibold tracking-wider opacity-60">
                    WATER LEVEL
                  </div>
                </div>

                {/* Cup Rim Highlight */}
                <div className="absolute top-0 inset-x-0 h-2 bg-neutral-300 border-b border-neutral-400 rounded-t-lg" />
              </div>
            </div>

            {/* Tilt status */}
            <div className="mt-4 text-xs font-mono text-neutral-400">
              G-Force Tilt: <span className={`font-bold ${Math.abs(waterTilt) > 28 ? 'text-rose-400' : 'text-emerald-400'}`}>{waterTilt.toFixed(1)}°</span>
            </div>
          </div>

          {/* Right: Controls, Hairpin Tracker & Bunta Commentary */}
          <div className="space-y-6">
            {/* Hairpin Stage Progress */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                <span>{lang === 'mn' ? 'Акинагийн даваа' : 'Akina Stage'}</span>
                <span className="font-mono text-amber-400">{curveIndex + 1} / 5</span>
              </div>
              <div className="text-sm font-bold text-white font-racing">
                {lang === 'mn' ? currentHairpin.nameMn : currentHairpin.nameEn}
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((curveIndex + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Tofu Condition & Spills */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800">
              <div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  {lang === 'mn' ? 'Дүпүний чанар' : 'Tofu Condition'}
                </div>
                <div className={`text-xl font-bold font-mono tabular-nums ${tofuHealth > 70 ? 'text-emerald-400' : tofuHealth > 30 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {tofuHealth}%
                </div>
              </div>
              <div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  {lang === 'mn' ? 'Асгарсан дусал' : 'Water Spilled'}
                </div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">
                  {spilledWater} <span className="text-xs text-neutral-500">{lang === 'mn' ? 'дусал' : 'drops'}</span>
                </div>
              </div>
            </div>

            {/* Interactive Steering Slider */}
            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-2 font-racing uppercase tracking-wider">
                <span>← {lang === 'mn' ? 'Зүүн шарвах' : 'Counter Left'}</span>
                <span className="text-amber-500">{lang === 'mn' ? 'Жолоо залах' : 'Steer Wheel'}</span>
                <span>{lang === 'mn' ? 'Баруун шарвах' : 'Counter Right'} →</span>
              </div>
              <input
                type="range"
                min="-100"
                max="100"
                value={steerAngle}
                onChange={(e) => handleSteer(Number(e.target.value))}
                className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-center gap-3 mt-3">
                <button
                  onClick={() => handleSteer(-60)}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-md font-mono"
                >
                  ◀ -60°
                </button>
                <button
                  onClick={() => handleSteer(0)}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-md font-mono"
                >
                  0° (Center)
                </button>
                <button
                  onClick={() => handleSteer(60)}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-md font-mono"
                >
                  +60° ▶
                </button>
              </div>
            </div>

            {/* Bunta Commentary Box */}
            <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-300 leading-relaxed min-h-[50px] flex items-center">
              {statusMessage || (lang === 'mn' ? 'Бунта: "Жолоогоо зөөлөн заж, хүндийн төвөө мэдэр."' : 'Bunta: "Steer with precision. Feel the car\'s weight shift through your fingertips."')}
            </div>

            {/* Next hairpin or reset */}
            <div className="flex items-center gap-3">
              {curveIndex < hairpins.length - 1 ? (
                <button
                  onClick={handleNextHairpin}
                  className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg font-racing text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{lang === 'mn' ? 'Дараагийн эргэлт рүү' : 'Next Hairpin'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex-1 py-2 px-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs rounded-lg font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'mn' ? 'Акинагийн уруудах замыг амжилттай тууллаа!' : 'Akina Touge Delivery Complete!'}</span>
                </div>
              )}

              <button
                onClick={resetGame}
                className="py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Дахин эхлүүлэх / Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'mn' ? 'Дахин' : 'Reset'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
