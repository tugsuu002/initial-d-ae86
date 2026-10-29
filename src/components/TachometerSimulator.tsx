import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Bell, Flame, Sparkles, Volume2, Youtube, ExternalLink, Zap, ChevronUp, ChevronDown, Play, Square } from 'lucide-react';

interface TachometerProps {
  lang: 'mn' | 'en';
}

export const TachometerSimulator: React.FC<TachometerProps> = ({ lang }) => {
  const [rpm, setRpm] = useState(900); // Idle 900 RPM
  const [gear, setGear] = useState(2);
  const [speed, setSpeed] = useState(0);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [shiftLight, setShiftLight] = useState(false);
  const [chimeActive, setChimeActive] = useState(false);
  const [idleSoundActive, setIdleSoundActive] = useState(false);
  const [lastRevLimitPop, setLastRevLimitPop] = useState(false);
  const [isAutoPulling, setIsAutoPulling] = useState(false);
  const [showYoutubeEngineSound, setShowYoutubeEngineSound] = useState(true);

  const animationRef = useRef<number | null>(null);
  const rpmRef = useRef(rpm);
  const acceleratingRef = useRef(isAccelerating);
  const gearRef = useRef(gear);

  rpmRef.current = rpm;
  acceleratingRef.current = isAccelerating;
  gearRef.current = gear;

  const initialDSoundFileUrl = 'https://www.youtube.com/watch?v=yFLu3jRdWLo&list=PLtXDFPBrzSW0kQk3vRVHgUcoC3sTJGaU8';

  // Key press listeners (Space or Arrow Up to rev)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsAccelerating(true);
      }
      if (e.code === 'KeyE') {
        // Shift Up
        handleShiftUp();
      }
      if (e.code === 'KeyQ') {
        // Shift Down
        handleShiftDown();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsAccelerating(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Engine Physics & RPM loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      let currentRpm = rpmRef.current;
      if (acceleratingRef.current) {
        // Rev up fast like a lightweight flywheel TRD race engine
        const revRate = 8800; // RPM per second
        currentRpm += revRate * dt;
        if (currentRpm >= 11000) {
          // Violent spark-cut rev limiter bounce
          currentRpm = 10600 + Math.random() * 400;
          setLastRevLimitPop(true);
        } else {
          setLastRevLimitPop(false);
        }
      } else {
        setLastRevLimitPop(false);
        // Natural engine brake drop down to idle
        const dropRate = 5800;
        currentRpm -= dropRate * dt;
        if (currentRpm < 900) {
          currentRpm = 900;
        }
      }

      setRpm(currentRpm);

      // Speed calculation based on Gear and RPM
      const gearRatios = [0, 0.007, 0.012, 0.016, 0.02, 0.024];
      const calculatedSpeed = Math.round((currentRpm - 900) * (gearRatios[gearRef.current] || 0.015));
      setSpeed(Math.max(0, calculatedSpeed));

      // Shift light over 9,500 RPM
      setShiftLight(currentRpm > 9500);

      // Auto 105 km/h speed chime
      if (calculatedSpeed >= 105 && !chimeActive) {
        audioEngine.triggerSpeedChime();
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [chimeActive]);

  // Realistic engine sound trigger
  useEffect(() => {
    if (isAccelerating) {
      audioEngine.startEngine(rpm);
    } else if (idleSoundActive) {
      audioEngine.startEngine(rpm);
    } else if (rpm > 1100) {
      audioEngine.updateRPM(rpm);
    } else {
      audioEngine.stopEngine();
    }
  }, [rpm, isAccelerating, idleSoundActive]);

  // Needle angle calculation (0 to 12,000 RPM)
  const needleAngle = -120 + (rpm / 12000) * 240;

  // Manual Gear Shift with BOV, clutch cut, and gate clack
  const handleSelectGear = (newGear: number) => {
    const isUpShift = newGear >= gear;
    setGear(newGear);
    gearRef.current = newGear;
    audioEngine.triggerGearShift(isUpShift);

    // Realistic RPM drop on upshift
    if (isUpShift && rpm > 4000) {
      setRpm((prev) => Math.max(2800, prev * 0.72));
    }
  };

  const handleShiftUp = () => {
    if (gear < 5) {
      handleSelectGear(gear + 1);
    }
  };

  const handleShiftDown = () => {
    if (gear > 1) {
      handleSelectGear(gear - 1);
    }
  };

  // Blow-off Valve manually
  const handleBovFlutter = () => {
    audioEngine.playBlowOffValve(0.45);
  };

  // Throttle Blip (Heel & Toe)
  const handleThrottleBlip = () => {
    audioEngine.playGearShiftClack();
    setIsAccelerating(true);
    setTimeout(() => {
      setIsAccelerating(false);
      audioEngine.triggerSparkCutPop();
    }, 280);
  };

  // Full Downhill Pull Sequence (1st through 5th gear with shifts and BOV)
  const handleFullPull = () => {
    if (isAutoPulling) return;
    setIsAutoPulling(true);
    setGear(1);
    gearRef.current = 1;
    setIsAccelerating(true);

    // Sequence through gears
    // Gear 1 -> Gear 2 at 1.1s
    setTimeout(() => {
      setIsAccelerating(false);
      audioEngine.triggerGearShift(true);
      setGear(2);
      gearRef.current = 2;
      setRpm(5500);

      setTimeout(() => {
        setIsAccelerating(true);
        // Gear 2 -> Gear 3 at 2.4s
        setTimeout(() => {
          setIsAccelerating(false);
          audioEngine.triggerGearShift(true);
          setGear(3);
          gearRef.current = 3;
          setRpm(6000);

          setTimeout(() => {
            setIsAccelerating(true);
            // Gear 3 -> Gear 4 at 3.8s
            setTimeout(() => {
              setIsAccelerating(false);
              audioEngine.triggerGearShift(true);
              setGear(4);
              gearRef.current = 4;
              setRpm(6800);

              setTimeout(() => {
                setIsAccelerating(true);
                // Gear 4 -> Gear 5 at 5.2s
                setTimeout(() => {
                  setIsAccelerating(false);
                  audioEngine.triggerGearShift(true);
                  setGear(5);
                  gearRef.current = 5;
                  setRpm(7200);

                  setTimeout(() => {
                    setIsAccelerating(true);
                    setTimeout(() => {
                      setIsAccelerating(false);
                      setIsAutoPulling(false);
                      audioEngine.playBlowOffValve(0.4);
                    }, 1500);
                  }, 100);
                }, 1400);
              }, 100);
            }, 1400);
          }, 100);
        }, 1300);
      }, 100);
    }, 1100);
  };

  const toggleIdleSound = () => {
    const next = !idleSoundActive;
    setIdleSoundActive(next);
    if (next) {
      audioEngine.startEngine(900);
    } else if (!isAccelerating) {
      audioEngine.stopEngine();
    }
  };

  const toggleChime = () => {
    const next = !chimeActive;
    setChimeActive(next);
    if (next) {
      audioEngine.startChimeLoop();
    } else {
      audioEngine.stopChime();
    }
  };

  return (
    <section id="tachometer" className="py-12 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs uppercase font-racing tracking-widest text-amber-500 mb-1 flex items-center justify-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{lang === 'mn' ? 'Initial D Sound Files & Араа шилжүүлэлт' : 'Initial D Sound Files & Gear Shift Audio'}</span>
          </div>
          <h2 className="text-3xl font-extrabold font-racing text-white tracking-tight">
            {lang === 'mn' ? 'АРАА СОЛЬЖ ХААЗ ӨГӨХ МОТОРЫН БОДИТ ДУУ' : 'AUTHENTIC INITIAL D GEAR SHIFTS & EXHAUST PULL'}
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            {lang === 'mn'
              ? 'Таны илгээсэн Initial D Sound Files (FD3S / AE86) бичлэг, араа солих үеийн Turbo Blow-off valve (PSSHH-tsu-tsu), төмөр залгаас болон 11,000 эргэлтийн хайчлалт.'
              : 'Authentic Initial D Sound Files featuring Mazda RX-7 FD3S / AE86 gear changes, turbo blow-off valve flutter, and exhaust backfire.'}
          </p>
        </div>

        {/* Official Sound Files YouTube Video Card */}
        <div className="max-w-4xl mx-auto mb-8 bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <div>
                <h3 className="text-sm font-bold font-racing text-white uppercase tracking-wider">
                  Initial D: Sound Files — Engine & Exhaust Sound (yFLu3jRdWLo)
                </h3>
                <div className="text-[11px] text-neutral-400">
                  {lang === 'mn' ? 'Араа солигдох, турбо үлээх, хаазалж буй албан ёсны бичлэг' : 'Official car audio recording with sequential gear pulls and blow-off valve'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowYoutubeEngineSound(!showYoutubeEngineSound)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium transition-colors"
              >
                {showYoutubeEngineSound ? (lang === 'mn' ? 'Тоглуулагч нуух' : 'Hide Video') : (lang === 'mn' ? 'Тоглуулагч нээх' : 'Show Video')}
              </button>

              <a
                href={initialDSoundFileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-semibold transition-colors"
              >
                <span>YouTube Playlist</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {showYoutubeEngineSound && (
            <div className="relative aspect-video max-w-2xl mx-auto rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/yFLu3jRdWLo?rel=0&enablejsapi=1"
                title="Initial D: Sound Files - Engine & Exhaust Sound"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Interactive Tachometer & Shifting Station */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Tachometer Dial */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 shadow-2xl">
            <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
              {/* Outer Bezel */}
              <div className="absolute inset-0 rounded-full border-4 border-neutral-800 bg-neutral-950 shadow-inner" />
              <div className="absolute inset-2 rounded-full border border-neutral-800/80" />

              {/* Shift Warning Light (Red LED flashing over 9,500 RPM) */}
              <div
                className={`absolute top-6 right-10 w-4 h-4 rounded-full border border-neutral-700 transition-all ${
                  shiftLight
                    ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-ping'
                    : 'bg-neutral-800'
                }`}
                title="Shift Warning Light (>9,500 RPM)"
              />

              {/* Redline Spark-Cut Indicator */}
              {lastRevLimitPop && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-red-600 text-white text-[10px] font-racing font-extrabold rounded-full uppercase tracking-wider animate-bounce shadow-lg shadow-red-600/50">
                  ⚡ 11,000 RPM REV-LIMIT CUT (BAP-BAP!)
                </div>
              )}

              {/* Dial Marks */}
              <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 200 200">
                {Array.from({ length: 13 }).map((_, i) => {
                  const angle = (-120 + (i / 12) * 240) * (Math.PI / 180);
                  const x = 100 + 70 * Math.sin(angle);
                  const y = 100 - 70 * Math.cos(angle);
                  const isRedline = i >= 10;
                  const isYellow = i === 9;
                  return (
                    <text
                      key={i}
                      x={x}
                      y={y}
                      fill={isRedline ? '#ef4444' : isYellow ? '#f59e0b' : '#a3a3a3'}
                      fontSize="9"
                      fontFamily="Barlow Condensed"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {i}
                    </text>
                  );
                })}

                {/* Redline arc */}
                <path
                  d="M 145 35 A 80 80 0 0 1 170 140"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                  opacity="0.8"
                />

                <circle cx="100" cy="100" r="12" fill="#171717" stroke="#404040" strokeWidth="2" />
                <circle cx="100" cy="100" r="4" fill="#f59e0b" />

                {/* Gauge Needle */}
                <g style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: '100px 100px', transition: 'transform 0.04s linear' }}>
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="28"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0px 0px 4px rgba(245,158,11,0.9))' }}
                  />
                  <line x1="100" y1="100" x2="100" y2="114" stroke="#737373" strokeWidth="3" />
                </g>
              </svg>

              {/* Digital Readout */}
              <div className="absolute bottom-12 flex flex-col items-center">
                <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-widest">
                  GEAR: <span className="text-amber-400 font-bold font-racing text-sm">{gear}</span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  {Math.round(rpm).toLocaleString()}
                </div>
                <div className="text-[10px] text-neutral-400">RPM × 1000</div>
              </div>
            </div>

            {/* Pedals & Rev Controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              {/* Hold to Rev Gas Pedal */}
              <button
                onMouseDown={() => setIsAccelerating(true)}
                onMouseUp={() => setIsAccelerating(false)}
                onTouchStart={() => setIsAccelerating(true)}
                onTouchEnd={() => setIsAccelerating(false)}
                className={`flex-1 py-3.5 px-6 rounded-xl font-racing text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 select-none ${
                  isAccelerating
                    ? 'bg-amber-500 text-neutral-950 shadow-amber-500/30'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                }`}
              >
                <Flame className={`w-5 h-5 ${isAccelerating ? 'text-neutral-950 animate-bounce' : 'text-amber-500'}`} />
                <span>{lang === 'mn' ? 'ХИЙ ДАРАХ (HOLD GAS)' : 'HOLD GAS (SPACE)'}</span>
              </button>

              {/* Throttle Blip */}
              <button
                onClick={handleThrottleBlip}
                className="py-3.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-amber-400 border border-neutral-700 text-xs font-racing font-bold uppercase tracking-wider transition-colors shrink-0"
                title="Heel-and-toe downshift blip"
              >
                {lang === 'mn' ? 'ХААЗ ЦОХИХ (BLIP)' : 'THROTTLE BLIP'}
              </button>
            </div>
          </div>

          {/* Right: Shifter & Sound FX Deck */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 shadow-2xl">
              <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider font-racing mb-4 flex items-center justify-between">
                <span>{lang === 'mn' ? 'Хурдны хайрцаг & Араа шилжүүлэгч' : 'Transmission & Gear Shifter'}</span>
                <span className="text-xs text-amber-400 font-mono">5-Speed Dog-Box</span>
              </h3>

              {/* Quick Shift Up / Shift Down Buttons with BOV */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={handleShiftUp}
                  disabled={gear >= 5}
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-emerald-400 border border-neutral-700 flex items-center justify-center gap-2 font-racing font-bold text-sm uppercase tracking-wider transition-all"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>{lang === 'mn' ? 'АРАА АХИУЛАХ (E)' : 'SHIFT UP (E)'}</span>
                </button>

                <button
                  onClick={handleShiftDown}
                  disabled={gear <= 1}
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-amber-400 border border-neutral-700 flex items-center justify-center gap-2 font-racing font-bold text-sm uppercase tracking-wider transition-all"
                >
                  <ChevronDown className="w-4 h-4" />
                  <span>{lang === 'mn' ? 'АРАА БУУРУУЛАХ (Q)' : 'SHIFT DOWN (Q)'}</span>
                </button>
              </div>

              {/* Gear Buttons (1 to 5) */}
              <div className="mb-6">
                <div className="text-xs text-neutral-400 mb-2">
                  {lang === 'mn' ? 'Шууд араа залгах (Blow-Off Valve & Clack чимээтэй):' : 'Direct Gear Selection (With BOV Flutter):'}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleSelectGear(g)}
                      className={`py-2.5 rounded-lg font-mono font-bold text-sm transition-all ${
                        gear === g
                          ? 'bg-amber-500 text-neutral-950 shadow-md ring-2 ring-amber-400/50 scale-105'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound Effects Quick Triggers */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={handleBovFlutter}
                  className="p-3 rounded-xl border bg-neutral-950 border-neutral-850 hover:border-amber-500/50 text-neutral-200 hover:text-amber-400 transition-colors text-left text-xs"
                >
                  <div className="flex items-center gap-1.5 font-racing font-bold uppercase mb-0.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Blow-Off Valve</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">PSSSHHH-tsu-tsu</div>
                </button>

                <button
                  onClick={toggleIdleSound}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                    idleSoundActive
                      ? 'bg-amber-500/15 border-amber-500 text-amber-400 font-bold'
                      : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-racing font-bold uppercase mb-0.5">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{lang === 'mn' ? 'Хэвийн дуу (Idle)' : 'Engine Idle'}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">900 RPM Rumble</div>
                </button>
              </div>

              {/* 1-5 Auto Pull Demonstration */}
              <div className="mb-4">
                <button
                  onClick={handleFullPull}
                  disabled={isAutoPulling}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-neutral-950 font-racing font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-98"
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>
                    {isAutoPulling
                      ? (lang === 'mn' ? 'АРАА СОЛЬЖ ХААЗАЛЖ БАЙНА...' : 'FULL THROTTLE PULL IN PROGRESS...')
                      : (lang === 'mn' ? '🚀 1-ЭЭС 5-Р АРАА ХҮРТЭЛ БҮХ ХААЗААР ХУРДЛАХ' : '🚀 FULL 1-TO-5 GEAR THROTTLE PULL')}
                  </span>
                </button>
              </div>

              {/* Speed & Chime */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-850">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                    {lang === 'mn' ? 'Хурд (Speed)' : 'Current Speed'}
                  </div>
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    {speed} <span className="text-xs text-neutral-500">km/h</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider">
                    {lang === 'mn' ? '105 km/h Чимээ' : '80s Chime'}
                  </div>
                  <button
                    onClick={toggleChime}
                    className={`mt-1 flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      chimeActive
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{chimeActive ? (lang === 'mn' ? 'Асаалттай' : 'Active') : (lang === 'mn' ? 'Турших' : 'Test')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
