import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DRIFT_TECHNIQUES, DriftTechnique, TechniqueStep } from '../data/driftTechniquesData';
import { audioEngine } from '../utils/audioEngine';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Sparkles, 
  Flame, 
  Gauge, 
  RotateCcw, 
  Compass, 
  ShieldAlert, 
  Check, 
  Eye, 
  EyeOff, 
  Zap,
  Activity,
  Layers
} from 'lucide-react';

interface DriftTutorialProps {
  lang: 'mn' | 'en';
}

export const DriftTechniqueTutorial: React.FC<DriftTutorialProps> = ({ lang }) => {
  const [selectedTechId, setSelectedTechId] = useState<string>('braking-drift');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioRevving, setIsAudioRevving] = useState<boolean>(false);

  const activeTechnique = DRIFT_TECHNIQUES.find((t) => t.id === selectedTechId) || DRIFT_TECHNIQUES[0];
  const currentStep = activeTechnique.steps[currentStepIndex] || activeTechnique.steps[0];

  // Auto-play through steps when isPlaying is true
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % activeTechnique.steps.length);
      }, 2600);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeTechnique.steps.length]);

  // When switching technique, reset step to 0
  const handleSelectTechnique = (id: string) => {
    setSelectedTechId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Sound trigger matching the active step
  const handlePlaySoundForStep = () => {
    setIsAudioRevving(true);
    if (currentStep.soundAction === 'brake') {
      audioEngine.startEngine(currentStep.rpm);
      audioEngine.triggerGearShift(true);
      setTimeout(() => {
        audioEngine.stopEngine();
        setIsAudioRevving(false);
      }, 1000);
    } else if (currentStep.soundAction === 'drift' || currentStep.soundAction === 'gutter') {
      audioEngine.startEngine(currentStep.rpm);
      audioEngine.triggerSparkCutPop();
      setTimeout(() => {
        audioEngine.playBlowOffValve(0.5);
        audioEngine.stopEngine();
        setIsAudioRevving(false);
      }, 1200);
    } else {
      audioEngine.startEngine(currentStep.rpm);
      setTimeout(() => {
        audioEngine.stopEngine();
        setIsAudioRevving(false);
      }, 900);
    }
  };

  return (
    <section id="techniques" className="py-16 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      {/* Background Red & Amber Atmosphere Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-amber-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-650/10 border border-red-500/20 text-red-500 text-xs font-racing font-bold tracking-widest uppercase mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>FUJIWARA TOUGE DRIFT BIBLE · MASTERCLASS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-racing text-white tracking-wider uppercase">
            {lang === 'mn' ? 'ТАКУМИГИЙН ДРИФТ ТЕХНИКИЙН ГАРЫН АВЛАГА' : 'TAKUMI FUJIWARA DRIFT TECHNIQUE TUTORIAL'}
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            {lang === 'mn'
              ? 'AE86 Panda Trueno-г жолоодон Акина уулыг эзэгнэсэн Такуми ба Бунтагийн бодит физик, жин шилжилт, педаль ажиллагаа болон домогт "Гуу жалга", "Blind Attack" аргуудын интерактив симуляци.'
              : 'Interactive step-by-step telemetry, pedal work, and SVG trajectory diagrams dissecting the legendary Touge techniques: Braking Drift, Inertia Flick, Mizootoshi Gutter Run, and Blind Attack.'}
          </p>
        </motion.div>

        {/* Technique Selection Tabs (5 Techniques) */}
        <div className="mb-8 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {DRIFT_TECHNIQUES.map((tech) => {
            const isSelected = selectedTechId === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => handleSelectTechnique(tech.id)}
                className={`p-3 rounded-xl border text-left font-racing whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/25 scale-102 ring-1 ring-red-400/50'
                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-850'
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-black/40 text-amber-300' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {tech.difficulty}
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">{tech.japanese}</span>
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wide">
                  {lang === 'mn' ? tech.nameMn.split('(')[0] : tech.nameEn.split('&')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage: 2 Columns (SVG Hairpin Track + Cockpit Telemetry) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive SVG Hairpin Touge Track Diagram */}
          <div className="lg:col-span-7 bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="text-base font-bold font-racing text-white uppercase tracking-wider">
                    {lang === 'mn' ? 'АКИНА УУЛЫН ҮСНИЙ ХАВЧААР ЭРГЭЛТИЙН ДИАГРАММ' : 'MOUNT AKINA HAIRPIN TRAJECTORY SVG'}
                  </h3>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">
                  Active Move: <b className="text-red-400">{activeTechnique.badge}</b>
                </span>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5">
                {activeTechnique.steps.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                      currentStepIndex === idx
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-1 ring-red-400'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {s.stepNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Interactive Canvas Stage */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-850 p-2 flex items-center justify-center">
              {/* Scanlines overlay */}
              <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-10" />

              {/* Night Touge Ambient Glow */}
              {selectedTechId === 'blind-attack' && currentStepIndex >= 1 && (
                <div className="absolute inset-0 bg-black/85 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-700">
                  <div className="text-center p-3 rounded-xl bg-black/90 border border-neutral-800 text-xs font-racing text-neutral-300">
                    <EyeOff className="w-5 h-5 text-red-500 mx-auto mb-1 animate-pulse" />
                    <span>BLIND ATTACK: HEADLIGHTS EXTINGUISHED IN TOTAL BLACKOUT</span>
                  </div>
                </div>
              )}

              <svg 
                viewBox="0 0 500 350" 
                className="w-full h-full select-none"
              >
                {/* Mountain Rock Cliff Background Texture */}
                <rect width="500" height="350" fill="#0d0e12" />

                {/* Topographic Touge Contour Lines */}
                <path d="M 0,50 Q 250,90 500,40" stroke="#1f232d" strokeWidth="1" fill="none" />
                <path d="M 0,110 Q 250,160 500,100" stroke="#1f232d" strokeWidth="1" fill="none" />
                <path d="M 0,220 Q 250,290 500,230" stroke="#1f232d" strokeWidth="1" fill="none" />

                {/* Outer Cliff Rock Face */}
                <path 
                  d="M 40,350 L 40,160 Q 40,40 180,40 L 320,40 Q 460,40 460,160 L 460,350" 
                  stroke="#2c303c" 
                  strokeWidth="8" 
                  fill="none" 
                  strokeDasharray="4 2"
                />

                {/* Asphalt Road Surface (Hairpin Curve) */}
                <path 
                  d="M 90,350 L 90,170 Q 90,90 200,90 L 300,90 Q 410,90 410,170 L 410,350" 
                  stroke="#171920" 
                  strokeWidth="80" 
                  fill="none" 
                  strokeLinecap="butt"
                />

                {/* Inner Guardrail / Ditch Curb (Mizootoshi Gutter) */}
                <path 
                  d="M 130,350 L 130,180 Q 130,130 220,130 L 280,130 Q 370,130 370,180 L 370,350" 
                  stroke={selectedTechId === 'gutter-run' ? '#f59e0b' : '#333742'} 
                  strokeWidth={selectedTechId === 'gutter-run' ? '10' : '6'} 
                  fill="none"
                  className={selectedTechId === 'gutter-run' ? 'filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}
                />

                {/* Road Center Dotted Line */}
                <path 
                  d="M 90,350 L 90,170 Q 90,90 200,90 L 300,90 Q 410,90 410,170 L 410,350" 
                  stroke="#3b4252" 
                  strokeWidth="2" 
                  strokeDasharray="14 10" 
                  fill="none" 
                />

                {/* Gutter Run Callout Label */}
                {selectedTechId === 'gutter-run' && (
                  <g transform="translate(185, 148)">
                    <rect x="0" y="0" width="130" height="22" rx="4" fill="#000000" stroke="#f59e0b" strokeWidth="1" />
                    <text x="65" y="15" fill="#f59e0b" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                      ★ MIZOOTOSHI GUTTER
                    </text>
                  </g>
                )}

                {/* Apex Corner Indicator Flag */}
                <circle cx="250" cy="90" r="4" fill="#ef4444" />
                <text x="250" y="78" fill="#ef4444" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  APEX (Орой цэг)
                </text>

                {/* Dynamic Skid Marks behind AE86 */}
                {activeTechnique.steps.slice(0, currentStepIndex + 1).map((s, idx) => {
                  if (idx === 0) return null;
                  const prev = activeTechnique.steps[idx - 1];
                  const x1 = prev.carPos.x * 4.6 + 20;
                  const y1 = prev.carPos.y * 3.1 + 20;
                  const x2 = s.carPos.x * 4.6 + 20;
                  const y2 = s.carPos.y * 3.1 + 20;
                  return (
                    <line 
                      key={idx} 
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke="#ef4444" 
                      strokeWidth="3.5" 
                      strokeDasharray="6 3"
                      strokeOpacity="0.75"
                    />
                  );
                })}

                {/* Waypoint Markers (Steps 1 to 4) */}
                {activeTechnique.steps.map((st, idx) => {
                  const px = st.carPos.x * 4.6 + 20;
                  const py = st.carPos.y * 3.1 + 20;
                  const isCurrent = currentStepIndex === idx;
                  return (
                    <g 
                      key={st.stepNumber} 
                      onClick={() => setCurrentStepIndex(idx)} 
                      className="cursor-pointer group"
                      transform={`translate(${px}, ${py})`}
                    >
                      <circle 
                        r={isCurrent ? "14" : "10"} 
                        fill={isCurrent ? "#ef4444" : "#171920"} 
                        stroke={isCurrent ? "#ffffff" : "#4b5563"} 
                        strokeWidth="2" 
                      />
                      <text 
                        y="4" 
                        textAnchor="middle" 
                        fill="#ffffff" 
                        fontSize="11" 
                        fontWeight="bold" 
                        fontFamily="monospace"
                      >
                        {st.stepNumber}
                      </text>
                    </g>
                  );
                })}

                {/* THE AE86 SPRINTER TRUENO CAR ICON */}
                {(() => {
                  const cx = currentStep.carPos.x * 4.6 + 20;
                  const cy = currentStep.carPos.y * 3.1 + 20;
                  const angle = currentStep.carPos.angleDeg;
                  const steerDeg = currentStep.steeringDeg;

                  return (
                    <g 
                      transform={`translate(${cx}, ${cy}) rotate(${angle})`}
                      className="transition-all duration-300 ease-out"
                    >
                      {/* Drift Tire Smoke Trail */}
                      {(currentStep.soundAction === 'drift' || currentStep.soundAction === 'gutter') && (
                        <g opacity="0.6">
                          <circle cx="-14" cy="22" r="8" fill="#e5e7eb" className="animate-ping" />
                          <circle cx="14" cy="22" r="8" fill="#e5e7eb" className="animate-ping" />
                        </g>
                      )}

                      {/* Car Body Shadow */}
                      <rect x="-13" y="-23" width="26" height="46" rx="4" fill="#000000" opacity="0.6" />

                      {/* Main AE86 Chassis (Panda White Body) */}
                      <rect 
                        x="-12" 
                        y="-22" 
                        width="24" 
                        height="44" 
                        rx="3" 
                        fill="#f8fafc" 
                        stroke="#0f172a" 
                        strokeWidth="1.5" 
                      />

                      {/* Carbon Hood (Project D Spec) */}
                      <polygon points="-9,-20 9,-20 7,-6 -7,-6" fill="#18181b" />

                      {/* Front Windshield */}
                      <polygon points="-8,-5 8,-5 9,5 -9,5" fill="#0f172a" />

                      {/* Rear Window */}
                      <polygon points="-8,10 8,10 7,18 -7,18" fill="#0f172a" />

                      {/* Panda Black Rocker Panels & Bumpers */}
                      <rect x="-12" y="19" width="24" height="3" fill="#18181b" />
                      <rect x="-12" y="-22" width="24" height="2" fill="#18181b" />

                      {/* Front Wheels (Turn with Countersteer angle) */}
                      <rect 
                        x="-15" 
                        y="-17" 
                        width="4" 
                        height="10" 
                        rx="1" 
                        fill="#38bdf8" 
                        transform={`rotate(${steerDeg}, -13, -12)`} 
                      />
                      <rect 
                        x="11" 
                        y="-17" 
                        width="4" 
                        height="10" 
                        rx="1" 
                        fill="#38bdf8" 
                        transform={`rotate(${steerDeg}, 13, -12)`} 
                      />

                      {/* Rear Wheels */}
                      <rect x="-15" y="8" width="4" height="10" rx="1" fill="#1e293b" />
                      <rect x="11" y="8" width="4" height="10" rx="1" fill="#1e293b" />

                      {/* Headlights (Pop-up yellow beams) */}
                      {selectedTechId !== 'blind-attack' || currentStepIndex === 0 || currentStepIndex === 3 ? (
                        <>
                          <polygon points="-8,-23 -12,-38 -2,-38" fill="rgba(253, 224, 71, 0.45)" />
                          <polygon points="8,-23 2,-38 12,-38" fill="rgba(253, 224, 71, 0.45)" />
                          <circle cx="-6" cy="-22" r="1.8" fill="#facc15" />
                          <circle cx="6" cy="-22" r="1.8" fill="#facc15" />
                        </>
                      ) : null}

                      {/* Fujiwara Tofu Shop Side Decal Dot */}
                      <rect x="10" y="-1" width="1.5" height="8" fill="#18181b" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Step Controls Bar (Play/Pause, Next/Prev, Sound Test) */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : activeTechnique.steps.length - 1))}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                  title="Өмнөх алхам"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-2 py-2 px-4 rounded-xl font-racing font-bold text-xs uppercase tracking-wider transition-all ${
                    isPlaying
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/30'
                      : 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? (lang === 'mn' ? 'Зогсоох' : 'Pause Auto') : (lang === 'mn' ? 'Авто Дараалал' : 'Auto Play')}</span>
                </button>

                <button
                  onClick={() => setCurrentStepIndex((prev) => (prev + 1) % activeTechnique.steps.length)}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
                  title="Дараагийн алхам"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Engine Rev / Sound Test for current step */}
              <button
                onClick={handlePlaySoundForStep}
                className="py-2 px-4 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-amber-400 font-racing font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors border border-neutral-750"
              >
                <Volume2 className={`w-4 h-4 ${isAudioRevving ? 'animate-bounce text-red-500' : ''}`} />
                <span>{isAudioRevving ? 'Revving...' : (lang === 'mn' ? 'Авиа сорих' : 'Hear Action')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Cockpit Telemetry HUD & Step Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Step Narrative Card */}
            <div className="p-6 bg-neutral-900/60 rounded-2xl border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
                <span className="text-xs font-racing font-bold uppercase tracking-widest text-red-500">
                  STEP {currentStep.stepNumber} OF {activeTechnique.steps.length}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-amber-400">
                  {currentStep.speedKmh} KM/H · {currentStep.gear}-R GEAR
                </span>
              </div>

              <h3 className="text-xl font-bold font-racing text-white mb-2">
                {lang === 'mn' ? currentStep.titleMn : currentStep.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {lang === 'mn' ? currentStep.descMn : currentStep.descEn}
              </p>
            </div>

            {/* Cockpit 3-Pedal Footwork HUD (Clutch, Brake, Throttle) */}
            <div className="p-6 bg-neutral-900/60 rounded-2xl border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <h4 className="text-xs font-racing font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'mn' ? 'ХӨЛИЙН АЖИЛЛАГАА (3-PEDAL FOOTWORK HUD)' : '3-PEDAL COCKPIT FOOTWORK'}</span>
                </h4>
                <span className="text-[10px] text-neutral-500 font-mono">Real-time Press %</span>
              </div>

              <div className="space-y-3">
                {/* 1. Clutch Pedal */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400">CLUTCH (Авцуулах):</span>
                    <span className="text-cyan-400 font-bold">{currentStep.clutch}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                    <div 
                      className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                      style={{ width: `${currentStep.clutch}%` }}
                    />
                  </div>
                </div>

                {/* 2. Brake Pedal */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400">BRAKE (Тормос):</span>
                    <span className="text-red-500 font-bold">{currentStep.brake}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-300"
                      style={{ width: `${currentStep.brake}%` }}
                    />
                  </div>
                </div>

                {/* 3. Throttle Pedal */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400">THROTTLE (Хааз):</span>
                    <span className="text-amber-400 font-bold">{currentStep.throttle}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-300"
                      style={{ width: `${currentStep.throttle}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Steering Wheel & Lateral G-Force Sub-Strip */}
              <div className="mt-5 pt-4 border-t border-neutral-800 grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                  <div className="text-[10px] text-neutral-500 font-racing uppercase mb-1">
                    {lang === 'mn' ? 'Жолооны өнцөг' : 'Steering Angle'}
                  </div>
                  <div className="text-lg font-bold font-mono text-cyan-400">
                    {currentStep.steeringDeg > 0 ? `+${currentStep.steeringDeg}°` : `${currentStep.steeringDeg}°`}
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono">
                    {currentStep.steeringDeg > 15 ? 'Countersteer' : (currentStep.steeringDeg < -15 ? 'Turn-in' : 'Straight')}
                  </span>
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                  <div className="text-[10px] text-neutral-500 font-racing uppercase mb-1">
                    {lang === 'mn' ? 'Хажуугийн ачаалал' : 'Lateral G-Force'}
                  </div>
                  <div className="text-lg font-bold font-mono text-red-400">
                    {currentStep.gForceLat} G
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono">Corner Load</span>
                </div>
              </div>
            </div>

            {/* Physics Principle & Takumi's Secret Lore */}
            <div className="p-5 bg-neutral-900/60 rounded-2xl border border-neutral-800 space-y-3">
              <div>
                <span className="text-[11px] font-racing font-bold text-amber-500 uppercase flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'mn' ? 'Физикийн Үндсэн Зарчим:' : 'Physics Foundation:'}</span>
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {lang === 'mn' ? activeTechnique.physicsPrincipleMn : activeTechnique.physicsPrincipleEn}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800/80">
                <span className="text-[11px] font-racing font-bold text-red-400 uppercase flex items-center gap-1.5 mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{lang === 'mn' ? 'Такуми ба Бунтагийн Домогт Нууц:' : 'Fujiwara Touge Wisdom:'}</span>
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed italic">
                  "{lang === 'mn' ? activeTechnique.fujiwaraSecretMn : activeTechnique.fujiwaraSecretEn}"
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
