import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CARX_PRESET_TUNES, 
  CarXTuneSetup, 
  DRIFT_STYLE_PRESETS, 
  DriftStyleType, 
  DriftStylePreset 
} from '../data/carxTuneData';
import { INITIAL_D_CARS, InitialDCar } from '../data/carsData';
import { audioEngine } from '../utils/audioEngine';
import { 
  Wrench, 
  Sliders, 
  RotateCcw, 
  Copy, 
  Check, 
  Volume2, 
  Zap, 
  Flame, 
  Gauge, 
  Sparkles,
  ChevronRight,
  ClipboardList,
  Layers,
  CircleDot,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Compass
} from 'lucide-react';

interface CarXTuningProps {
  lang: 'mn' | 'en';
  activeCarId?: string;
  onSelectCarId?: (carId: string) => void;
}

export const CarXTuningGarage: React.FC<CarXTuningProps> = ({ lang, activeCarId, onSelectCarId }) => {
  const [selectedCarId, setSelectedCarId] = useState<string>(activeCarId || 'ae86-trueno');
  const [selectedStyle, setSelectedStyle] = useState<DriftStyleType>('tandem');
  const [viewMode, setViewMode] = useState<'cheat-sheet' | 'sliders'>('cheat-sheet');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const preset = CARX_PRESET_TUNES[selectedCarId] || CARX_PRESET_TUNES['ae86-trueno'];
  const currentCar = INITIAL_D_CARS.find((c) => c.id === selectedCarId) || INITIAL_D_CARS[0];
  const activeStylePreset = DRIFT_STYLE_PRESETS.find((s) => s.id === selectedStyle) || DRIFT_STYLE_PRESETS[0];

  // Interactive Live Adjustable Sliders State
  const [frontCamber, setFrontCamber] = useState<number>(preset.frontCamberDeg);
  const [rearCamber, setRearCamber] = useState<number>(preset.rearCamberDeg);
  const [steeringAngle, setSteeringAngle] = useState<number>(preset.maxSteeringAngleDeg);
  const [ackerman, setAckerman] = useState<number>(preset.ackermanPercent);
  const [turboBoost, setTurboBoost] = useState<number>(preset.turboBoostBar);
  const [frontHeight, setFrontHeight] = useState<number>(preset.frontSpringLengthCm);
  const [rearHeight, setRearHeight] = useState<number>(preset.rearSpringLengthCm);
  const [diffLock, setDiffLock] = useState<number>(Math.round(preset.differentialLockRatio * 100));
  const [rearPressure, setRearPressure] = useState<number>(preset.rearTirePressureKpa);

  const [copied, setCopied] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isDynoTesting, setIsDynoTesting] = useState<boolean>(false);

  // Sync with prop when passed from Showroom
  useEffect(() => {
    if (activeCarId && activeCarId !== selectedCarId) {
      handleSelectCar(activeCarId);
    }
  }, [activeCarId]);

  // When switching car, reset sliders to that car's CarX preset + current style
  const handleSelectCar = (carId: string) => {
    setSelectedCarId(carId);
    if (onSelectCarId) onSelectCarId(carId);
    const p = CARX_PRESET_TUNES[carId];
    if (p) {
      applyPresetAndStyle(p, selectedStyle);
    }
  };

  const applyPresetAndStyle = (base: CarXTuneSetup, styleId: DriftStyleType) => {
    const s = DRIFT_STYLE_PRESETS.find((item) => item.id === styleId) || DRIFT_STYLE_PRESETS[0];
    const newFrontCamber = Number((base.frontCamberDeg + s.modifiers.frontCamberOffset).toFixed(1));
    const newRearCamber = Number((base.rearCamberDeg + s.modifiers.rearCamberOffset).toFixed(1));
    const newSteering = s.modifiers.steeringAngle;
    const newAckerman = s.modifiers.ackerman;
    const newBoost = Number(Math.max(0.6, base.turboBoostBar + s.modifiers.boostOffset).toFixed(2));
    const newFrontHeight = s.modifiers.frontHeightCm;
    const newRearHeight = s.modifiers.rearHeightCm;
    const newDiff = s.modifiers.diffLockPercent;
    const newRearPressure = s.modifiers.rearPressureKpa;

    setFrontCamber(newFrontCamber);
    setRearCamber(newRearCamber);
    setSteeringAngle(newSteering);
    setAckerman(newAckerman);
    setTurboBoost(newBoost);
    setFrontHeight(newFrontHeight);
    setRearHeight(newRearHeight);
    setDiffLock(newDiff);
    setRearPressure(newRearPressure);
  };

  const handleSelectStyle = (styleId: DriftStyleType) => {
    setSelectedStyle(styleId);
    applyPresetAndStyle(preset, styleId);
  };

  const handleResetToPreset = () => {
    applyPresetAndStyle(preset, 'tandem');
    setSelectedStyle('tandem');
    setCheckedItems({});
  };

  const toggleChecked = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Copy parameters to clipboard formatted for CarX Drift Racing players
  const handleCopyTune = (sectionOnly?: 'suspension' | 'alignment' | 'wheels' | 'all') => {
    let tuneText = '';
    const header = `=== CarX Drift Racing Online: ${preset.carXModelName} [${activeStylePreset.nameEn}] ===\nClass: ${preset.tuneClass} | Tire Adhesion: ${activeStylePreset.modifiers.adhesion}\n`;

    if (!sectionOnly || sectionOnly === 'all' || sectionOnly === 'suspension') {
      tuneText += `\n[1. SUSPENSION / ПҮРШ]\n- Front Spring Length: ${frontHeight} cm\n- Rear Spring Length: ${rearHeight} cm\n- Front Spring Stiffness: ${preset.frontSpringStiffnessNm} N/m\n- Rear Spring Stiffness: ${preset.rearSpringStiffnessNm} N/m\n- Front Sway Bar: ${preset.frontStabilizer}\n- Rear Sway Bar: ${preset.rearStabilizer}`;
    }

    if (!sectionOnly || sectionOnly === 'all' || sectionOnly === 'alignment') {
      tuneText += `\n\n[2. WHEEL ALIGNMENT / ТЭНХЛЭГ]\n- Front Camber: ${frontCamber}°\n- Rear Camber: ${rearCamber}°\n- Max Steering Angle: ${steeringAngle}°\n- Ackerman Angle: ${ackerman}%\n- Caster: ${preset.casterDeg}°\n- Front Toe: ${preset.frontToeDeg}° / Rear Toe: ${preset.rearToeDeg}°`;
    }

    if (!sectionOnly || sectionOnly === 'all' || sectionOnly === 'wheels') {
      tuneText += `\n\n[3. WHEELS & TIRES / ДУГУЙ]\n- Front Rim: ${preset.frontRimSizeInch}" / Tire: ${preset.frontTireWidthMm} mm\n- Rear Rim: ${preset.rearRimSizeInch}" / Tire: ${preset.rearTireWidthMm} mm\n- Front Pressure: ${preset.frontTirePressureKpa} kPa\n- Rear Pressure: ${rearPressure} kPa\n- Adhesion: ${activeStylePreset.modifiers.adhesion}`;
    }

    if (!sectionOnly || sectionOnly === 'all') {
      tuneText += `\n\n[4. ENGINE & TRANSMISSION]\n- Turbo Boost: ${turboBoost.toFixed(2)} Bar\n- Rev Limiter: ${preset.engineRevLimitRpm.toLocaleString()} RPM\n- Diff Lock: ${diffLock}%\n- Final Drive: ${preset.finalDriveRatio}\n- Brake Torque: ${preset.brakeTorqueNm} Nm\n- Front Brake Bias: ${preset.frontBrakeBiasPercent}%`;
    }

    navigator.clipboard.writeText(header + tuneText);
    if (sectionOnly && sectionOnly !== 'all') {
      setCopiedSection(sectionOnly);
      setTimeout(() => setCopiedSection(null), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Test Dyno Rev with Sound Engine
  const handleTestDyno = () => {
    setIsDynoTesting(true);
    audioEngine.startEngine(4500);
    setTimeout(() => {
      audioEngine.updateRPM(preset.engineRevLimitRpm);
      audioEngine.playBlowOffValve(0.5);
      setTimeout(() => {
        audioEngine.triggerSparkCutPop();
        setTimeout(() => {
          audioEngine.stopEngine();
          setIsDynoTesting(false);
        }, 500);
      }, 700);
    }, 600);
  };

  // Calculated Real-Time Metrics based on slider positions
  const calculatedHp = Math.round(currentCar.horsepower * (0.85 + (turboBoost / 1.5) * 0.25));
  const totalChecklistItems = 15;
  const completedChecklistCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <section id="carx-tuning" className="py-16 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Red Accent Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-650/10 border border-red-500/20 text-red-500 text-xs font-racing font-bold tracking-widest uppercase mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>CARX DRIFT RACING ONLINE · PRO SETUP & IN-GAME CHEAT SHEET</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-racing text-white tracking-wider uppercase">
            {lang === 'mn' ? 'CARX ДРИФТ ТОХИРГООНЫ БЭЛЭН ГАРЫН АВЛАГА' : 'CARX DRIFT PRO SETUPS & IN-GAME GUIDE'}
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            {lang === 'mn'
              ? 'Тоглоом тоглож байхдаа хажуудаа хараад утгуудыг нэг бүрчлэн CarX рүү хялбархан оруулахад зориулсан 1:1 бүтэн гарын авлага. Санал болгох 4 дрифт загварын аль нэгийг сонгоход бүх тохиргоо шууд шинэчлэгдэнэ.'
              : 'Designed to sit beside your monitor or phone while playing CarX Drift Racing. Pick a drift style preset or tweak live sliders to instantly input pro setups.'}
          </p>
        </motion.div>

        {/* Car Selector Tabs matching Initial D Fleet */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {INITIAL_D_CARS.map((car) => {
            const isSelected = selectedCarId === car.id;
            const carXPreset = CARX_PRESET_TUNES[car.id];
            return (
              <button
                key={car.id}
                onClick={() => handleSelectCar(car.id)}
                className={`px-4 py-2.5 rounded-xl border font-racing text-xs uppercase tracking-wider font-bold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20 scale-102'
                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{car.name.split(' ')[0]} {car.name.split(' ')[1]}</span>
                <span className="ml-1.5 opacity-70 text-[10px] text-amber-400">
                  [{carXPreset?.carXModelName.split(' ')[0] || 'CarX'}]
                </span>
              </button>
            );
          })}
        </div>

        {/* PRO DRIFT STYLE PRESETS (Санал болгох 4 төрлийн дрифт тохиргоо) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-racing font-bold uppercase tracking-wider text-white">
                {lang === 'mn' ? 'САНАЛ БОЛГОХ 4 ДРИФТ ЗАГВАР (1-Click Presets):' : 'RECOMMENDED DRIFT STYLE PRESETS:'}
              </span>
            </div>
            <span className="text-[11px] text-neutral-400">
              {lang === 'mn' ? 'Загвар сонгоход доорх утгууд автоматаар өөрчлөгдөнө' : 'Click any preset to apply recommended numbers'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DRIFT_STYLE_PRESETS.map((style) => {
              const isCurrent = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => handleSelectStyle(style.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-br from-red-600/20 to-neutral-900 border-red-500 shadow-lg shadow-red-600/15 ring-1 ring-red-500/50'
                      : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-racing font-bold tracking-widest px-2 py-0.5 rounded ${
                        isCurrent ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {style.badge}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {style.modifiers.adhesion} Grip
                      </span>
                    </div>

                    <h4 className="text-sm font-bold font-racing text-white tracking-wide mb-1">
                      {lang === 'mn' ? style.nameMn : style.nameEn}
                    </h4>

                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                      {lang === 'mn' ? style.descriptionMn : style.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">Lock: <b className="text-white">{style.modifiers.steeringAngle}°</b></span>
                    <span className="text-neutral-400">Ackerman: <b className="text-white">{style.modifiers.ackerman}%</b></span>
                    <span className={`text-[10px] font-racing font-bold ${isCurrent ? 'text-red-400' : 'text-neutral-500'}`}>
                      {isCurrent ? 'ИДЭВХЖСЭН' : 'СОНГОХ →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Mode Switcher + Action Bar (Cheat Sheet vs Sliders) */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-neutral-900/70 rounded-2xl border border-neutral-800">
          <div className="flex items-center gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('cheat-sheet')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-racing text-xs uppercase tracking-wider font-bold transition-all ${
                viewMode === 'cheat-sheet'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>{lang === 'mn' ? 'Тоглоомын Дарааллаар (Cheat Sheet)' : 'In-Game 1:1 Cheat Sheet'}</span>
            </button>

            <button
              onClick={() => setViewMode('sliders')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-racing text-xs uppercase tracking-wider font-bold transition-all ${
                viewMode === 'sliders'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{lang === 'mn' ? 'Интерактив Слайдер Гараж' : 'Interactive Sliders & Dyno'}</span>
            </button>
          </div>

          {/* Quick Buttons: Copy All, Dyno Sound, Reset */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={() => handleCopyTune('all')}
              className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-racing font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-red-600/20 active:scale-98"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (lang === 'mn' ? 'Хуулагдлаа!' : 'Copied!') : (lang === 'mn' ? 'Бүгдийг Хуулах' : 'Copy All')}</span>
            </button>

            <button
              onClick={handleTestDyno}
              className="py-2 px-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-amber-400 font-racing font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-neutral-700"
              title="Test Dyno Rev"
            >
              <Volume2 className={`w-4 h-4 ${isDynoTesting ? 'animate-bounce text-red-500' : ''}`} />
              <span>{isDynoTesting ? 'Dyno...' : 'Dyno Test'}</span>
            </button>

            <button
              onClick={handleResetToPreset}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-400 hover:text-white transition-colors"
              title={lang === 'mn' ? 'Анхны утга руу буцаах' : 'Reset to Preset'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ACTIVE HERO VEHICLE BANNER */}
        <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 rounded-2xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-14 sm:w-28 sm:h-16 rounded-xl overflow-hidden bg-black border border-neutral-800 shrink-0 relative">
              <img
                src={currentCar.imageSrc}
                alt={currentCar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-racing font-bold text-red-500 uppercase tracking-widest">
                  CarX In-Game Model: {preset.carXModelName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold">
                  {preset.tuneClass} Class
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-racing text-white tracking-wide">
                {currentCar.name}
              </h3>
              <p className="text-xs text-neutral-400">
                {lang === 'mn' ? 'Сонгосон загвар:' : 'Active Style:'} <span className="text-red-400 font-bold font-racing uppercase">{lang === 'mn' ? activeStylePreset.nameMn : activeStylePreset.nameEn}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-4 sm:gap-6 text-center shrink-0">
            <div>
              <div className="text-[10px] text-neutral-500 font-racing uppercase">{lang === 'mn' ? 'Чадал' : 'Dyno Power'}</div>
              <div className="text-lg font-bold font-mono text-amber-400 tabular-nums">
                {calculatedHp} <span className="text-[10px] text-neutral-500">HP</span>
              </div>
            </div>
            <div className="w-px h-6 bg-neutral-800" />
            <div>
              <div className="text-[10px] text-neutral-500 font-racing uppercase">{lang === 'mn' ? 'Жолооны Өнцөг' : 'Max Lock'}</div>
              <div className="text-lg font-bold font-mono text-white tabular-nums">
                {steeringAngle}°
              </div>
            </div>
            <div className="w-px h-6 bg-neutral-800" />
            <div>
              <div className="text-[10px] text-neutral-500 font-racing uppercase">{lang === 'mn' ? 'Урд Кембер' : 'Front Camber'}</div>
              <div className="text-lg font-bold font-mono text-red-400 tabular-nums">
                {frontCamber}°
              </div>
            </div>
            <div className="w-px h-6 bg-neutral-800" />
            <div>
              <div className="text-[10px] text-neutral-500 font-racing uppercase">{lang === 'mn' ? 'Дугуй' : 'Adhesion'}</div>
              <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                {activeStylePreset.modifiers.adhesion}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            VIEW MODE 1: CARX IN-GAME 1:1 CHEAT SHEET
            ======================================================== */}
        {viewMode === 'cheat-sheet' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* User instructions bar */}
            <div className="p-3.5 bg-neutral-900/80 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'mn'
                    ? 'Та CarX Drift дээрээ тохиргоогоо хийх явцдаа [Оруулсан] чагтыг дараад тэмдэглээд яваарай.'
                    : 'Tap the checkmark next to each setting as you input it into your CarX Dynostand menu.'}
                </span>
              </div>
              <div className="text-neutral-400 font-mono text-xs">
                {completedChecklistCount} / {totalChecklistItems} {lang === 'mn' ? 'хийгдсэн' : 'done'}
              </div>
            </div>

            {/* 5 In-Game Menu Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1: SUSPENSION (Пүрш & Түдгэлзүүлэлт) */}
              <div className="p-5 bg-neutral-900/80 rounded-2xl border border-neutral-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <h4 className="font-racing font-bold text-white uppercase text-sm tracking-wide">
                        1. SUSPENSION (ТҮДГЭЛЗҮҮЛЭЛТ)
                      </h4>
                    </div>
                    <button
                      onClick={() => handleCopyTune('suspension')}
                      className="text-[11px] text-neutral-400 hover:text-amber-400 font-mono flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedSection === 'suspension' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {/* Front Spring Length */}
                    <div 
                      onClick={() => toggleChecked('frontHeight')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['frontHeight'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Front Spring Length (Урд пүрш)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">CarX цэс: Suspension → Spring Size</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-amber-400">{frontHeight} <span className="text-xs text-neutral-500">cm</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['frontHeight'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Rear Spring Length */}
                    <div 
                      onClick={() => toggleChecked('rearHeight')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['rearHeight'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Rear Spring Length (Хойд пүрш)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">CarX цэс: Suspension → Spring Size</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-amber-400">{rearHeight} <span className="text-xs text-neutral-500">cm</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['rearHeight'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Front Stiffness */}
                    <div 
                      onClick={() => toggleChecked('frontStiff')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['frontStiff'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Front Stiffness (Хатуулаг)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Spring Rate N/m</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-white">{preset.frontSpringStiffnessNm} <span className="text-xs text-neutral-500">N/m</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['frontStiff'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Rear Stiffness */}
                    <div 
                      onClick={() => toggleChecked('rearStiff')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['rearStiff'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Rear Stiffness (Хатуулаг)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Spring Rate N/m</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-white">{preset.rearSpringStiffnessNm} <span className="text-xs text-neutral-500">N/m</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['rearStiff'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Sway Bars F/R */}
                    <div 
                      onClick={() => toggleChecked('swayBars')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['swayBars'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Sway Bars (Тогтворжуулагч)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Урд / Хойд Стабилизатор</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold font-mono text-cyan-400">{preset.frontStabilizer} <span className="text-neutral-500">/</span> {preset.rearStabilizer}</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['swayBars'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: WHEEL ALIGNMENT (Тэнхлэг, Кембер, Өнцөг) */}
              <div className="p-5 bg-neutral-900/80 rounded-2xl border border-neutral-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <h4 className="font-racing font-bold text-white uppercase text-sm tracking-wide">
                        2. ALIGNMENT (ТЭНХЛЭГ & КЕМБЕР)
                      </h4>
                    </div>
                    <button
                      onClick={() => handleCopyTune('alignment')}
                      className="text-[11px] text-neutral-400 hover:text-amber-400 font-mono flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedSection === 'alignment' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {/* Front Camber */}
                    <div 
                      onClick={() => toggleChecked('frontCamber')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['frontCamber'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Front Camber (Урд Кембер)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Гулсах үеийн барьцалдалт</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-red-400">{frontCamber}°</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['frontCamber'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Rear Camber */}
                    <div 
                      onClick={() => toggleChecked('rearCamber')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['rearCamber'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Rear Camber (Хойд Кембер)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Бага байх тусам шулуун таталт сайн</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-red-300">{rearCamber}°</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['rearCamber'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Max Steering Angle */}
                    <div 
                      onClick={() => toggleChecked('steeringAngle')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['steeringAngle'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Max Steering Angle (Өнцөг)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">CarX: Max Lock Angle</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-white">{steeringAngle}°</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['steeringAngle'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Ackerman Angle */}
                    <div 
                      onClick={() => toggleChecked('ackerman')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['ackerman'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Ackerman Angle (Акерман)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Дугуйн параллель зөрүү</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-amber-400">{ackerman}%</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['ackerman'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Caster & Toe */}
                    <div 
                      onClick={() => toggleChecked('casterToe')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['casterToe'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Caster / Toe (Кастер & Тое)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Toe F: {preset.frontToeDeg}° | R: {preset.rearToeDeg}°</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-mono text-cyan-400">{preset.casterDeg}° <span className="text-xs text-neutral-500">Caster</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['casterToe'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: WHEELS & TIRES (Дугуй & Обуд) */}
              <div className="p-5 bg-neutral-900/80 rounded-2xl border border-neutral-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <h4 className="font-racing font-bold text-white uppercase text-sm tracking-wide">
                        3. WHEELS & TIRES (ДУГУЙ & ОБҮД)
                      </h4>
                    </div>
                    <button
                      onClick={() => handleCopyTune('wheels')}
                      className="text-[11px] text-neutral-400 hover:text-amber-400 font-mono flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedSection === 'wheels' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {/* Tire Adhesion */}
                    <div 
                      onClick={() => toggleChecked('adhesion')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['adhesion'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Tire Adhesion (Наалдац)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">CarX дугуйн барьцалдалт</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-emerald-400">{activeStylePreset.modifiers.adhesion}</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['adhesion'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Rear Tire Pressure */}
                    <div 
                      onClick={() => toggleChecked('rearPressure')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['rearPressure'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Rear Pressure (Хойд Даралт)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Бага байх тусам хальтиргаа багасна</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-cyan-400">{rearPressure} <span className="text-xs text-neutral-500">kPa</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['rearPressure'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Front Tire Pressure */}
                    <div 
                      onClick={() => toggleChecked('frontPressure')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['frontPressure'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Front Pressure (Урд Даралт)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Хөнгөн залуурдлага</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-white">{preset.frontTirePressureKpa} <span className="text-xs text-neutral-500">kPa</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['frontPressure'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Tire Width & Rims */}
                    <div 
                      onClick={() => toggleChecked('tireDims')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['tireDims'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Rim & Tire Width (Обуд / Өргөн)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">F: {preset.frontRimSizeInch}" / R: {preset.rearRimSizeInch}"</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-mono text-amber-400">{preset.frontTireWidthMm} / {preset.rearTireWidthMm} <span className="text-[10px] text-neutral-500">mm</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['tireDims'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: ENGINE & TURBO (Мотор ба Турбо) */}
              <div className="p-5 bg-neutral-900/80 rounded-2xl border border-neutral-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <h4 className="font-racing font-bold text-white uppercase text-sm tracking-wide">
                        4. ENGINE (МОТОР & ТУРБО)
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {/* Turbo Boost */}
                    <div 
                      onClick={() => toggleChecked('turboBoost')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['turboBoost'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Turbo Boost Pressure (Турбо)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">CarX: Boost (Bar)</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-emerald-400">{turboBoost.toFixed(2)} <span className="text-xs text-neutral-500">Bar</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['turboBoost'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Rev Limiter */}
                    <div 
                      onClick={() => toggleChecked('revLimit')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['revLimit'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Rev Limiter (Эргэлтийн Лимит)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Дээд эргэлт</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-red-500">{preset.engineRevLimitRpm.toLocaleString()} <span className="text-xs text-neutral-500">RPM</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['revLimit'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Calculated Dyno HP */}
                    <div className="p-2.5 rounded-xl border bg-neutral-950 border-neutral-850 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Dyno Power (Нийт Чадал)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Бодит тооцоолсон хүч</div>
                      </div>
                      <span className="text-lg font-bold font-mono text-amber-400">{calculatedHp} <span className="text-xs text-neutral-500">HP</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: TRANSMISSION & DIFF & BRAKES (Араа, Дифференциал, Тормос) */}
              <div className="p-5 bg-neutral-900/80 rounded-2xl border border-neutral-800 shadow-xl flex flex-col justify-between md:col-span-2 lg:col-span-2">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <h4 className="font-racing font-bold text-white uppercase text-sm tracking-wide">
                        5. TRANSMISSION & BRAKES (ХУРДНЫ ХАЙРЦАГ & ТОРМОС)
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Diff Lock */}
                    <div 
                      onClick={() => toggleChecked('diffLock')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['diffLock'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Diff Lock (Дифференциал)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">LSD Түгжээний хувь</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-red-400">{diffLock}%</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['diffLock'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Final Drive */}
                    <div 
                      onClick={() => toggleChecked('finalDrive')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['finalDrive'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Final Drive (Гол Араа)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Хурдатгал / Эргэлт</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-white">{preset.finalDriveRatio}</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['finalDrive'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Brake Torque */}
                    <div 
                      onClick={() => toggleChecked('brakeTorque')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['brakeTorque'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Brake Torque (Тормосны хүч)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Нийт тормосны моментын хүч</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold font-mono text-cyan-400">{preset.brakeTorqueNm} <span className="text-xs text-neutral-500">Nm</span></span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['brakeTorque'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Brake Bias */}
                    <div 
                      onClick={() => toggleChecked('brakeBias')}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        checkedItems['brakeBias'] ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-neutral-950 border-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] text-neutral-400 font-racing uppercase">Front Brake Bias (Урд хуваарилалт)</div>
                        <div className="text-[9px] text-neutral-500 font-mono">Шарвах үед жин урагш шилжүүлэх</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-amber-400">{preset.frontBrakeBiasPercent}%</span>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                          checkedItems['brakeBias'] ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Advice Card underneath */}
            <div className="p-4 bg-neutral-900/70 rounded-2xl border border-neutral-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-racing font-bold text-white uppercase tracking-wider block mb-1">
                  {lang === 'mn' ? 'CarX Дрифт Инженерийн Зөвлөмж:' : 'CarX Drift Pro Engineer Advice:'}
                </span>
                <p className="text-neutral-300 leading-relaxed">
                  {lang === 'mn' ? preset.styleTipMn : preset.styleTipEn}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            VIEW MODE 2: INTERACTIVE SLIDERS & DYNO VISUALIZATION
            ======================================================== */}
        {viewMode === 'sliders' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Visual Chassis Preview & Alignment Simulation */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-neutral-900/60 rounded-2xl border border-neutral-800 shadow-2xl relative overflow-hidden">
                {/* Visual Front Wheel Camber/Angle Preview Graphic */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 mb-4">
                  <div className="flex justify-between text-[11px] font-racing text-neutral-400 uppercase mb-2">
                    <span>{lang === 'mn' ? 'Урд тэнхлэгийн бодит харагдац' : 'Front Axle Camber / Steering Angle'}</span>
                    <span className="text-amber-400 font-mono font-bold">{frontCamber}° / {steeringAngle}° Lock</span>
                  </div>

                  {/* SVG Visual Chassis with Slanted Wheels */}
                  <div className="h-28 w-full flex items-center justify-between px-6 bg-neutral-900/80 rounded-lg relative overflow-hidden border border-neutral-800">
                    {/* Left Front Wheel */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-7 h-16 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 rounded-sm border border-neutral-600 transition-transform duration-100 shadow-md shadow-red-500/10"
                        style={{
                          transform: `rotate(${frontCamber * 1.5}deg) skewY(${steeringAngle * 0.15}deg)`,
                          transformOrigin: 'bottom center'
                        }}
                      />
                      <span className="text-[9px] font-mono text-neutral-400 mt-1.5 font-bold">L Wheel</span>
                    </div>

                    {/* Steering Rack Axis Line */}
                    <div className="flex-1 mx-4 flex flex-col items-center">
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full relative overflow-hidden mb-1">
                        <div className="absolute inset-y-0 bg-red-500 rounded-full" style={{ width: `${(steeringAngle / 68) * 100}%` }} />
                      </div>
                      <span className="text-[9px] font-mono text-neutral-500">Rack Angle: {steeringAngle}°</span>
                    </div>

                    {/* Right Front Wheel */}
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-7 h-16 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-400 rounded-sm border border-neutral-600 transition-transform duration-100 shadow-md shadow-red-500/10"
                        style={{
                          transform: `rotate(${-frontCamber * 1.5}deg) skewY(${-steeringAngle * 0.15}deg)`,
                          transformOrigin: 'bottom center'
                        }}
                      />
                      <span className="text-[9px] font-mono text-neutral-400 mt-1.5 font-bold">R Wheel</span>
                    </div>
                  </div>
                </div>

                {/* CarX Drift Pro Advice */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 text-xs">
                  <div className="flex items-center gap-1.5 font-racing font-bold text-amber-500 uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'mn' ? 'Сонгосон загварын тайлбар:' : 'Active Style Physics:'}</span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-[11px]">
                    {lang === 'mn' ? activeStylePreset.descriptionMn : activeStylePreset.descriptionEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Live Adjustable Sliders */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 bg-neutral-900/60 rounded-2xl border border-neutral-800 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-6">
                  <div>
                    <h3 className="text-base font-bold font-racing text-white uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-red-500" />
                      <span>{lang === 'mn' ? 'ИНТЕРАКТИВ СЛАЙДЕРУУД' : 'LIVE TUNING SLIDERS'}</span>
                    </h3>
                    <div className="text-[11px] text-neutral-400">
                      {lang === 'mn' ? 'Слайдерыг хөдөлгөж өөрийн хүссэнээр өөрчлөөрэй' : 'Freely adjust parameters and test on Dyno'}
                    </div>
                  </div>

                  <button
                    onClick={handleResetToPreset}
                    className="text-xs text-amber-500 hover:underline font-racing uppercase tracking-wider"
                  >
                    {lang === 'mn' ? 'Эх тохиргоо руу' : 'Reset All'}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Slider 1: Front Camber */}
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                      <span className="text-neutral-300 uppercase tracking-wider font-bold">
                        {lang === 'mn' ? '1. Урд Кембер (Front Camber)' : '1. Front Camber Angle'}
                      </span>
                      <span className="text-red-400 font-mono font-bold text-sm">{frontCamber}°</span>
                    </div>
                    <input
                      type="range"
                      min="-10.0"
                      max="-1.0"
                      step="0.1"
                      value={frontCamber}
                      onChange={(e) => setFrontCamber(parseFloat(e.target.value))}
                      className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                      <span>-10.0° (Max Angle Grip)</span>
                      <span>-1.0° (Street)</span>
                    </div>
                  </div>

                  {/* Slider 2: Max Steering Lock Angle */}
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                      <span className="text-neutral-300 uppercase tracking-wider font-bold">
                        {lang === 'mn' ? '2. Жолооны Дээд Өнцөг (Max Steering Lock)' : '2. Max Steering Lock'}
                      </span>
                      <span className="text-amber-400 font-mono font-bold text-sm">{steeringAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="68"
                      step="1"
                      value={steeringAngle}
                      onChange={(e) => setSteeringAngle(parseInt(e.target.value, 10))}
                      className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                      <span>50° (Stock Lock)</span>
                      <span>68° (Deep Reverse Entry)</span>
                    </div>
                  </div>

                  {/* Slider 3: Ackerman Angle */}
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                      <span className="text-neutral-300 uppercase tracking-wider font-bold">
                        {lang === 'mn' ? '3. Акерман Өнцөг (Ackerman Angle)' : '3. Ackerman Percentage'}
                      </span>
                      <span className="text-white font-mono font-bold text-sm">{ackerman}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="60"
                      step="1"
                      value={ackerman}
                      onChange={(e) => setAckerman(parseInt(e.target.value, 10))}
                      className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                      <span>0% (Parallel Wheels)</span>
                      <span>60% (High Self-Center)</span>
                    </div>
                  </div>

                  {/* Slider 4: Turbo Boost Pressure */}
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                      <span className="text-neutral-300 uppercase tracking-wider font-bold">
                        {lang === 'mn' ? '4. Турбо Үлээлтийн Даралт (Turbo Boost)' : '4. Turbo Boost Pressure'}
                      </span>
                      <span className="text-emerald-400 font-mono font-bold text-sm">{turboBoost.toFixed(2)} Bar</span>
                    </div>
                    <input
                      type="range"
                      min="0.60"
                      max="2.40"
                      step="0.05"
                      value={turboBoost}
                      onChange={(e) => setTurboBoost(parseFloat(e.target.value))}
                      className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
                      <span>0.6 Bar (Low Boost)</span>
                      <span>2.4 Bar (Extreme Dyno Pull)</span>
                    </div>
                  </div>

                  {/* 2-Column: Ride Height Front & Rear */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                        <span className="text-neutral-300 uppercase tracking-wider font-bold">
                          {lang === 'mn' ? 'Урд Өндөр (Front Height)' : 'Front Spring Length'}
                        </span>
                        <span className="text-amber-400 font-mono font-bold">{frontHeight} cm</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="12"
                        value={frontHeight}
                        onChange={(e) => setFrontHeight(parseInt(e.target.value, 10))}
                        className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>

                    <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                        <span className="text-neutral-300 uppercase tracking-wider font-bold">
                          {lang === 'mn' ? 'Хойд Өндөр (Rear Height)' : 'Rear Spring Length'}
                        </span>
                        <span className="text-amber-400 font-mono font-bold">{rearHeight} cm</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="12"
                        value={rearHeight}
                        onChange={(e) => setRearHeight(parseInt(e.target.value, 10))}
                        className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* 2-Column: Diff Lock & Tire Pressure */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                        <span className="text-neutral-300 uppercase tracking-wider font-bold">
                          {lang === 'mn' ? 'Дифференциал Түгжээ' : 'Diff Lock Ratio'}
                        </span>
                        <span className="text-red-400 font-mono font-bold">{diffLock}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={diffLock}
                        onChange={(e) => setDiffLock(parseInt(e.target.value, 10))}
                        className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                    </div>

                    <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-racing">
                        <span className="text-neutral-300 uppercase tracking-wider font-bold">
                          {lang === 'mn' ? 'Хойд Дугуйн Даралт' : 'Rear Tire Pressure'}
                        </span>
                        <span className="text-cyan-400 font-mono font-bold">{rearPressure} kPa</span>
                      </div>
                      <input
                        type="range"
                        min="110"
                        max="230"
                        step="5"
                        value={rearPressure}
                        onChange={(e) => setRearPressure(parseInt(e.target.value, 10))}
                        className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
