import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_D_CARS, InitialDCar } from '../data/carsData';
import { audioEngine } from '../utils/audioEngine';
import { 
  Trophy, 
  Flame, 
  Gauge, 
  Cpu, 
  Shield, 
  Zap, 
  SlidersHorizontal, 
  Volume2, 
  Check, 
  X, 
  ChevronRight, 
  ArrowUpDown,
  Car,
  Wrench
} from 'lucide-react';

interface JdmFleetProps {
  lang: 'mn' | 'en';
  onOpenCarXTune?: (carId: string) => void;
}

type FilterCategory = 'all' | 'project-d' | 'redsuns' | 'nightkids' | 'emperor' | 'akina';
type SortField = 'power' | 'handling' | 'weight' | 'speed';

export const JdmFleetShowroom: React.FC<JdmFleetProps> = ({ lang, onOpenCarXTune }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [sortField, setSortField] = useState<SortField>('power');
  const [selectedCar, setSelectedCar] = useState<InitialDCar | null>(null);
  const [audioTesting, setAudioTesting] = useState(false);

  // Filter cars
  const filteredCars = INITIAL_D_CARS.filter((car) => {
    if (activeCategory === 'all') return true;
    return car.teamCategory === activeCategory;
  }).sort((a, b) => {
    if (sortField === 'power') return b.horsepower - a.horsepower;
    if (sortField === 'handling') return b.ratings.handling - a.ratings.handling;
    if (sortField === 'weight') return a.weightKg - b.weightKg;
    if (sortField === 'speed') return b.ratings.speed - a.ratings.speed;
    return 0;
  });

  const handleTestCarSound = (car: InitialDCar) => {
    setAudioTesting(true);
    if (car.soundType === 'antilag') {
      audioEngine.startEngine(5500);
      audioEngine.triggerSparkCutPop();
      setTimeout(() => audioEngine.triggerSparkCutPop(), 250);
      setTimeout(() => audioEngine.triggerSparkCutPop(), 500);
      setTimeout(() => {
        audioEngine.stopEngine();
        setAudioTesting(false);
      }, 1100);
    } else if (car.soundType === 'rotary') {
      audioEngine.startEngine(7500);
      audioEngine.playBlowOffValve(0.5);
      setTimeout(() => {
        audioEngine.playBlowOffValve(0.4);
        audioEngine.stopEngine();
        setAudioTesting(false);
      }, 1000);
    } else {
      audioEngine.startEngine(car.redlineRpm);
      audioEngine.triggerGearShift(true);
      setTimeout(() => {
        audioEngine.stopEngine();
        setAudioTesting(false);
      }, 1200);
    }
  };

  const categories: { id: FilterCategory; labelMn: string; labelEn: string }[] = [
    { id: 'all', labelMn: 'Бүх Багууд', labelEn: 'All Teams' },
    { id: 'project-d', labelMn: 'Project D', labelEn: 'Project D' },
    { id: 'redsuns', labelMn: 'Akagi RedSuns', labelEn: 'Akagi RedSuns' },
    { id: 'nightkids', labelMn: 'Myogi NightKids', labelEn: 'Myogi NightKids' },
    { id: 'emperor', labelMn: 'Emperor (Evo)', labelEn: 'Emperor (Evo)' },
    { id: 'akina', labelMn: 'Akina / Бунта', labelEn: 'Akina Masters' }
  ];

  return (
    <section id="fleet" className="py-16 bg-neutral-950 relative overflow-hidden">
      {/* Background Red Laser Glow Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with JDM Showroom Aesthetics */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-650/10 border border-red-500/20 text-red-500 text-xs font-racing font-bold tracking-widest uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>{lang === 'mn' ? 'INITIAL D ДОМОГТ ХӨЛГҮҮДИЙН ҮЗЭСГЭЛЭН' : 'GUNMA TOUGE JDM SHOWROOM'}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold font-racing text-white tracking-wider uppercase">
            {lang === 'mn' ? 'INITIAL D АНИМЕНЫ БҮХ ДОМОГТ ТЭРГҮҮД' : 'ICONIC JDM INITIAL D FLEET'}
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            {lang === 'mn'
              ? 'Такумигийн AE86-аас эхлээд Кэйсүкэгийн шар FD3S, Рёосүкэгийн цагаан FC3S, Наказатогийн R32, Бунтагийн Impreza WRX зэрэг цувралын бүх тэрэгний нарийвчилсан үзүүлэлт, түүх, моторын дууг сонирхоорой.'
              : 'Explore the full arsenal of Gunma touge machines. Click any vehicle to inspect telemetry, driver lore, race modifications, and hear their engine signatures.'}
          </p>

          {/* KPI Strip matching screenshot 1 */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-3 px-6 bg-neutral-900/40 rounded-xl border border-neutral-800/80 text-xs">
            <div>
              <span className="text-lg font-bold font-mono text-white">8</span>
              <span className="text-neutral-400 ml-1.5 font-racing uppercase">{lang === 'mn' ? 'Домогт Тэрэг' : 'JDM Legends'}</span>
            </div>
            <div className="w-px h-4 bg-neutral-800 hidden sm:block" />
            <div>
              <span className="text-lg font-bold font-mono text-red-500">11,000</span>
              <span className="text-neutral-400 ml-1.5 font-racing uppercase">{lang === 'mn' ? 'Дээд Эргэлт' : 'Max RPM'}</span>
            </div>
            <div className="w-px h-4 bg-neutral-800 hidden sm:block" />
            <div>
              <span className="text-lg font-bold font-mono text-amber-400">100%</span>
              <span className="text-neutral-400 ml-1.5 font-racing uppercase">{lang === 'mn' ? 'Жинхэнэ Үзүүлэлт' : 'Canon Specs'}</span>
            </div>
          </div>
        </motion.div>

        {/* Filter and Sorting Controls Toolbar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Team Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-racing uppercase tracking-wider font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {lang === 'mn' ? cat.labelMn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs self-end md:self-auto">
            <span className="text-neutral-500 font-racing uppercase flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{lang === 'mn' ? 'Эрэмбэлэх:' : 'Sort By:'}</span>
            </span>
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setSortField('power')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  sortField === 'power' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                HP
              </button>
              <button
                onClick={() => setSortField('handling')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  sortField === 'handling' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Handling
              </button>
              <button
                onClick={() => setSortField('weight')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  sortField === 'weight' ? 'bg-neutral-800 text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Weight
              </button>
            </div>
          </div>
        </div>

        {/* Fleet Grid (Screenshot 1 & 2 Card Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-red-500/60 transition-all shadow-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Red Top Accent Laser Line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/60 to-transparent group-hover:via-red-500 transition-all" />

              <div className="p-5 sm:p-6">
                {/* Header Lockup: Make, Model, Team */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-racing font-bold tracking-widest uppercase text-red-500">
                      {car.make}
                    </span>
                    <h3 className="text-xl font-bold font-racing text-white tracking-wide group-hover:text-amber-400 transition-colors">
                      {car.name}
                    </h3>
                  </div>

                  {/* Driver Kanji Name Badge */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      {car.driverJapanese}
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-300 block truncate max-w-[130px]">
                      {car.driver.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Car Showcase Stage with Red Halo Ring (Screenshots 1 & 2 design) */}
                <div className="relative aspect-video my-4 rounded-xl overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-black flex items-center justify-center border border-neutral-850 group-hover:border-red-500/30 transition-colors">
                  {/* Glowing Red Circular Halo Backdrop (Key visual motif from user screenshots) */}
                  <div className="absolute w-40 h-40 rounded-full border-2 border-red-500/30 bg-red-600/10 blur-sm pointer-events-none group-hover:scale-110 group-hover:border-red-500/60 transition-all duration-500" />
                  <div className="absolute w-52 h-20 bg-red-600/15 blur-2xl pointer-events-none" />

                  {/* Car Image with reflection */}
                  <img
                    src={car.imageSrc}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Team badge overlay */}
                  <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-[10px] font-racing font-bold uppercase text-neutral-300">
                    {car.team}
                  </div>

                  {/* Drivetrain Badge */}
                  <div className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-[10px] font-mono font-bold text-amber-400">
                    {car.drivetrain}
                  </div>
                </div>

                {/* Spec Table Grid (Screenshot 1 & 2 clean rows) */}
                <div className="space-y-1.5 py-2 border-t border-neutral-800/80 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Engine:</span>
                    <span className="text-white font-semibold truncate max-w-[170px]">{car.engineCode}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Power / HP:</span>
                    <span className="text-amber-400 font-bold">{car.horsepower} HP @ {car.redlineRpm.toLocaleString()} RPM</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Torque:</span>
                    <span className="text-neutral-200">{car.torqueNm} N·m</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Weight:</span>
                    <span className="text-neutral-200">{car.weightKg} kg</span>
                  </div>
                </div>

                {/* Speed & Handling Meters */}
                <div className="mt-3 pt-2 border-t border-neutral-850 space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[10px] uppercase font-racing text-neutral-400 mb-0.5">
                      <span>Speed</span>
                      <span className="text-white font-mono">{car.ratings.speed} / 10</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${car.ratings.speed * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] uppercase font-racing text-neutral-400 mb-0.5">
                      <span>Handling</span>
                      <span className="text-white font-mono">{car.ratings.handling} / 10</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${car.ratings.handling * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Buttons */}
              <div className="p-4 bg-neutral-950/70 border-t border-neutral-850 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCar(car)}
                  className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white font-racing font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-all border border-neutral-700/80 active:scale-98"
                >
                  <span>{lang === 'mn' ? 'Дэлгэрэнгүй' : 'DETAILS'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {onOpenCarXTune && (
                  <button
                    onClick={() => onOpenCarXTune(car.id)}
                    className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-racing font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 transition-all shadow-md shadow-red-600/20 active:scale-98"
                    title={lang === 'mn' ? 'CarX Дрифт тохиргоог нээх' : 'Open CarX Drift Setup'}
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>CarX</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comprehensive Vehicle Inspection Modal */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Top Stage Showcase */}
              <div className="relative aspect-video sm:aspect-[21/9] w-full bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={selectedCar.imageSrc}
                  alt={selectedCar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 text-xs font-racing font-bold text-red-500 uppercase">
                    <span>{selectedCar.make}</span>
                    <span>·</span>
                    <span>{selectedCar.team}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-racing text-white">
                    {selectedCar.name}
                  </h3>
                  <div className="text-xs text-neutral-300 font-medium mt-0.5">
                    {selectedCar.driver} ({selectedCar.driverJapanese})
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Driver Quote */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 italic text-xs sm:text-sm text-neutral-300">
                  {lang === 'mn' ? selectedCar.quoteMn : selectedCar.quoteEn}
                </div>

                {/* Technical Specifications Grid */}
                <div>
                  <h4 className="text-xs font-racing uppercase tracking-wider text-amber-500 mb-3 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>{lang === 'mn' ? 'Хөдөлгүүр & Хүчин чадал' : 'Powertrain & Architecture'}</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="text-neutral-500 text-[10px] uppercase">Engine Code</div>
                      <div className="font-bold text-white mt-1">{selectedCar.engineCode}</div>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="text-neutral-500 text-[10px] uppercase">Power Output</div>
                      <div className="font-bold text-amber-400 mt-1">{selectedCar.horsepower} HP</div>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="text-neutral-500 text-[10px] uppercase">Redline RPM</div>
                      <div className="font-bold text-red-400 mt-1">{selectedCar.redlineRpm.toLocaleString()} RPM</div>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                      <div className="text-neutral-500 text-[10px] uppercase">Drivetrain & Weight</div>
                      <div className="font-bold text-emerald-400 mt-1">{selectedCar.drivetrain} · {selectedCar.weightKg} kg</div>
                    </div>
                  </div>
                </div>

                {/* Tuning Modifications */}
                <div>
                  <h4 className="text-xs font-racing uppercase tracking-wider text-amber-500 mb-3 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>{lang === 'mn' ? 'Сайжруулалт & Уралдааны Түүнэ' : 'Race Modifications & Aero Parts'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(lang === 'mn' ? selectedCar.modificationsMn : selectedCar.modificationsEn).map((mod, i) => (
                      <div key={i} className="p-2.5 bg-neutral-950/80 rounded-lg border border-neutral-850 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-neutral-300">{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Touge Battle Record Lore */}
                <div>
                  <h4 className="text-xs font-racing uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" />
                    <span>{lang === 'mn' ? 'Уулын Тулааны Түүх' : 'Touge Battle Record'}</span>
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed p-4 bg-neutral-950 rounded-xl border border-neutral-850">
                    {lang === 'mn' ? selectedCar.battleHistoryMn : selectedCar.battleHistoryEn}
                  </p>
                </div>

                {/* Action Bar inside modal */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-850">
                  <button
                    onClick={() => handleTestCarSound(selectedCar)}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-racing font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-neutral-700"
                  >
                    <Volume2 className={`w-4 h-4 ${audioTesting ? 'animate-bounce text-red-500' : ''}`} />
                    <span>{audioTesting ? (lang === 'mn' ? 'Дуугарч байна...' : 'Revving...') : (lang === 'mn' ? 'Моторын дуу' : 'Sound Signature')}</span>
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {onOpenCarXTune && (
                      <button
                        onClick={() => {
                          const cid = selectedCar.id;
                          setSelectedCar(null);
                          onOpenCarXTune(cid);
                        }}
                        className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-white font-racing font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-neutral-700 hover:border-red-500"
                      >
                        <Wrench className="w-3.5 h-3.5 text-red-500" />
                        <span>{lang === 'mn' ? 'CarX Түүнэ Гараж' : 'Open CarX Tune'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedCar(null)}
                      className="py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-racing font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      {lang === 'mn' ? 'Хаах' : 'Close'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
