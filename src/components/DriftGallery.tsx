import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DRIFT_IMAGES, DriftImage } from '../data/driftData';
import { Download, Maximize2, Sparkles, Volume2, Check, Flame } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface DriftGalleryProps {
  lang: 'mn' | 'en';
}

type FilterMode = 'raw' | 'anime98' | 'manga' | 'night';

export const DriftGallery: React.FC<DriftGalleryProps> = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState<DriftImage>(DRIFT_IMAGES[0]);
  const [filterMode, setFilterMode] = useState<FilterMode>('raw');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSqueal = () => {
    audioEngine.playTireSqueal(700);
    audioEngine.startEngine(selectedImage.rpm);
    setTimeout(() => {
      audioEngine.stopEngine();
    }, 900);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = selectedImage.src;
    link.download = `InitialD_AE86_${selectedImage.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const getFilterClass = () => {
    switch (filterMode) {
      case 'anime98':
        return 'contrast-125 saturate-125 brightness-105 hue-rotate-[-5deg]';
      case 'manga':
        return 'grayscale contrast-200 brightness-90';
      case 'night':
        return 'contrast-130 brightness-110 saturate-140';
      default:
        return '';
    }
  };

  return (
    <section id="gallery" className="py-12 lg:py-16 relative overflow-hidden bg-neutral-950">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Motion Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-racing tracking-widest text-red-500 mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>{lang === 'mn' ? 'Домогт Акинагийн дрифт цуврал' : 'Legendary Akina Touge Drift Series'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-racing text-white">
              {lang === 'mn' ? 'INITIAL D: AE86 PANDA TRUENO ДРИФТ' : 'INITIAL D: AE86 PANDA TRUENO DRIFT MASTER'}
            </h1>
            <p className="mt-2 text-sm text-neutral-400 max-w-2xl">
              {lang === 'mn'
                ? 'Такуми Фүживарагийн 1986 оны Toyota Sprinter Trueno AE86 машины Акина уулын огцом эргэлт дээр утаа манан татуулан гулгаж буй өндөр нарийвчлалтай зургууд.'
                : 'Ultra-high-fidelity cinematic renders of Takumi Fujiwara\'s Toyota Sprinter Trueno AE86 power-sliding down the misty touge hairpins of Mount Akina.'}
            </p>
          </div>

          {/* Filter Style Switcher (Interactive Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl text-xs self-start md:self-auto shadow-lg">
            <button
              onClick={() => setFilterMode('raw')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                filterMode === 'raw' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'mn' ? '8K Бодит' : '8K Master'}
            </button>
            <button
              onClick={() => setFilterMode('anime98')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                filterMode === 'anime98' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'mn' ? '1998 Аниме CRT' : '1998 Anime CRT'}
            </button>
            <button
              onClick={() => setFilterMode('manga')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                filterMode === 'manga' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'mn' ? 'Манга Хар/Цагаан' : 'Manga B&W'}
            </button>
            <button
              onClick={() => setFilterMode('night')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                filterMode === 'night' ? 'bg-red-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {lang === 'mn' ? 'Шөнийн туяа' : 'Night Touge'}
            </button>
          </div>
        </motion.div>

        {/* Primary Showcase Viewport with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-2xl group"
        >
          {/* Subtle Top Red Laser Highlight */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

          <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
            {/* The Image with smooth fade transition */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage.id + filterMode}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                src={selectedImage.src}
                alt={lang === 'mn' ? selectedImage.titleMn : selectedImage.titleEn}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] ${getFilterClass()}`}
              />
            </AnimatePresence>

            {/* Manga Scanlines Overlay */}
            {filterMode === 'manga' && <div className="absolute inset-0 manga-scanlines" />}
            {filterMode === 'anime98' && (
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
            )}

            {/* Ambient vignette scrim for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent pointer-events-none" />

            {/* Quick Action Overlays on Top Right */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleSqueal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-xs font-semibold text-white hover:text-amber-400 hover:border-amber-500/50 transition-colors shadow-lg active:scale-95"
                title={lang === 'mn' ? 'Дугуй болон моторын дуу сонсох' : 'Play Tire Squeal & Rev Sound'}
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{lang === 'mn' ? 'Дуу сонсох' : 'Rev & Squeal'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-xs font-semibold text-white hover:text-amber-400 hover:border-amber-500/50 transition-colors shadow-lg active:scale-95"
                title={lang === 'mn' ? 'Эх зураг татах (8K Wallpaper)' : 'Download Full HD Wallpaper'}
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline text-emerald-400">{lang === 'mn' ? 'Татагдлаа' : 'Saved'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-red-500" />
                    <span className="hidden sm:inline">{lang === 'mn' ? 'Татах' : 'Download'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setLightboxOpen(true)}
                className="p-1.5 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-white hover:text-amber-400 hover:border-amber-500/50 transition-colors shadow-lg active:scale-95"
                title={lang === 'mn' ? 'Дэлгэц дүүрэн үзэх' : 'Open Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Scrim Content & Telemetry Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10 pointer-events-auto">
              <div className="max-w-2xl">
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs font-medium text-amber-400/90 mb-1">
                  <span>{lang === 'mn' ? selectedImage.locationMn : selectedImage.locationEn}</span>
                  <span aria-hidden="true">·</span>
                  <span>{lang === 'mn' ? selectedImage.techniqueMn : selectedImage.techniqueEn}</span>
                </div>

                <h2 className="text-xl sm:text-3xl font-bold font-racing text-white tracking-wide">
                  {lang === 'mn' ? selectedImage.titleMn : selectedImage.titleEn}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-neutral-300 line-clamp-2">
                  {lang === 'mn' ? selectedImage.descriptionMn : selectedImage.descriptionEn}
                </p>
              </div>

              {/* Real-time Drift Telemetry HUD */}
              <div className="flex items-center gap-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-xl p-3 shrink-0 shadow-xl">
                <div className="text-center px-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-racing">RPM</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-amber-400 tabular-nums">
                    {selectedImage.rpm.toLocaleString()}
                  </div>
                </div>
                <div className="h-6 w-px bg-neutral-800" />
                <div className="text-center px-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-racing">Speed</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white tabular-nums">
                    {selectedImage.speedKmh} <span className="text-[10px] text-neutral-400">km/h</span>
                  </div>
                </div>
                <div className="h-6 w-px bg-neutral-800" />
                <div className="text-center px-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-racing">Angle</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-red-400 tabular-nums">
                    {selectedImage.driftAngleDeg}°
                  </div>
                </div>
                <div className="h-6 w-px bg-neutral-800" />
                <div className="text-center px-2">
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-racing">G-Force</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-emerald-400 tabular-nums">
                    {selectedImage.gForce}G
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Selector Strip (Animated on Scroll) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {DRIFT_IMAGES.map((img, i) => {
            const isSelected = selectedImage.id === img.id;
            return (
              <motion.button
                key={img.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                onClick={() => {
                  setSelectedImage(img);
                  audioEngine.playTireSqueal(300);
                }}
                className={`group relative text-left rounded-xl overflow-hidden border transition-all ${
                  isSelected
                    ? 'border-red-500 ring-2 ring-red-500/30 bg-neutral-900 shadow-lg shadow-red-500/10'
                    : 'border-neutral-800/80 bg-neutral-900/60 hover:border-neutral-700'
                }`}
              >
                <div className="aspect-video w-full overflow-hidden bg-neutral-950">
                  <img
                    src={img.src}
                    alt={lang === 'mn' ? img.titleMn : img.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[11px] font-racing uppercase tracking-wider text-red-500 truncate">
                    {lang === 'mn' ? img.techniqueMn : img.techniqueEn}
                  </div>
                  <div className="text-xs font-semibold text-white truncate mt-0.5">
                    {lang === 'mn' ? img.titleMn : img.titleEn}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-10 right-0 text-neutral-400 hover:text-white text-sm font-semibold tracking-wider uppercase font-racing"
            >
              {lang === 'mn' ? 'Хаах [✕]' : 'Close [✕]'}
            </button>
            <img
              src={selectedImage.src}
              alt={lang === 'mn' ? selectedImage.titleMn : selectedImage.titleEn}
              referrerPolicy="no-referrer"
              className={`max-h-[80vh] w-auto rounded-lg shadow-2xl object-contain ${getFilterClass()}`}
            />
            <div className="mt-4 flex items-center justify-between w-full text-xs text-neutral-300">
              <span className="font-racing text-sm text-white">{lang === 'mn' ? selectedImage.titleMn : selectedImage.titleEn}</span>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-600/30"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'mn' ? 'Татаж авах' : 'Save Full HD'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
