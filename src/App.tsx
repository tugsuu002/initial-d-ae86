import React, { useState } from 'react';
import { Header } from './components/Header';
import { DriftGallery } from './components/DriftGallery';
import { DriftTechniqueTutorial } from './components/DriftTechniqueTutorial';
import { JdmFleetShowroom } from './components/JdmFleetShowroom';
import { CarXTuningGarage } from './components/CarXTuningGarage';
import { EurobeatJukebox } from './components/EurobeatJukebox';
import { TachometerSimulator } from './components/TachometerSimulator';
import { WaterCupSimulator } from './components/WaterCupSimulator';
import { CarSpecs } from './components/CarSpecs';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<'mn' | 'en'>('mn');
  const [activeSection, setActiveSection] = useState<string>('gallery');
  const [isEurobeat, setIsEurobeat] = useState<boolean>(false);
  const [carXTuneId, setCarXTuneId] = useState<string>('ae86-trueno');

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCarXTune = (carId: string) => {
    setCarXTuneId(carId);
    handleNavClick('carx-tuning');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Bar with integrated Initial D Eurobeat Player Widget */}
      <Header
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        setActiveSection={handleNavClick}
        isEurobeat={isEurobeat}
        setIsEurobeat={setIsEurobeat}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Drift Gallery with 4 high-res authentic Touge images & scroll animations */}
        <DriftGallery lang={lang} />

        {/* Fujiwara-Style Drift Technique Tutorial with interactive SVG hairpin simulator */}
        <DriftTechniqueTutorial lang={lang} />

        {/* JDM Fleet Showroom (All Initial D Legends matching screenshot designs) */}
        <JdmFleetShowroom lang={lang} onOpenCarXTune={handleOpenCarXTune} />

        {/* CarX Drift Racing Online Pro Tuning Garage with live sliders & Dyno */}
        <CarXTuningGarage lang={lang} activeCarId={carXTuneId} onSelectCarId={setCarXTuneId} />

        {/* Dedicated Initial D Eurobeat Jukebox & Player */}
        <EurobeatJukebox lang={lang} />

        {/* Authentic 4A-GE ITB Engine Sound & 11,000 RPM Tachometer */}
        <TachometerSimulator lang={lang} />

        {/* Bunta's Water Cup Delivery Test Simulation */}
        <WaterCupSimulator lang={lang} />

        {/* Technical Specs & Fujiwara Tofu Shop Heritage */}
        <CarSpecs lang={lang} />
      </main>

      {/* Clean Footer */}
      <Footer lang={lang} />
    </div>
  );
}

