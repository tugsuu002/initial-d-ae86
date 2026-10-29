export interface CarXTuneSetup {
  carId: string;
  carName: string;
  carXModelName: string; // The in-game CarX name (e.g. Hachi-Roku, Falcon RZ, etc.)
  tuneClass: 'Racing' | 'Ultimate' | 'Drift';
  recommendedTireAdhesion: '90%' | '100%' | '110%' | '120%';
  
  // Suspension
  frontSpringLengthCm: number;
  rearSpringLengthCm: number;
  frontSpringStiffnessNm: number;
  rearSpringStiffnessNm: number;
  frontStabilizer: number;
  rearStabilizer: number;
  
  // Wheel Alignment
  frontCamberDeg: number;
  rearCamberDeg: number;
  frontToeDeg: number;
  rearToeDeg: number;
  casterDeg: number;
  ackermanPercent: number;
  maxSteeringAngleDeg: number;
  
  // Wheels & Tires
  frontRimSizeInch: number;
  rearRimSizeInch: number;
  frontTireWidthMm: number;
  rearTireWidthMm: number;
  frontTirePressureKpa: number;
  rearTirePressureKpa: number;
  
  // Engine & Drivetrain
  turboBoostBar: number;
  engineRevLimitRpm: number;
  differentialLockRatio: number; // 0.0 to 1.0
  finalDriveRatio: number;
  
  // Brakes
  brakeTorqueNm: number;
  frontBrakeBiasPercent: number;
  
  // Tuning Notes
  styleTipMn: string;
  styleTipEn: string;
}

export const CARX_PRESET_TUNES: Record<string, CarXTuneSetup> = {
  'ae86-trueno': {
    carId: 'ae86-trueno',
    carName: 'Toyota Sprinter Trueno AE86',
    carXModelName: 'Hachi-Roku (AE86)',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '100%',
    frontSpringLengthCm: 7,
    rearSpringLengthCm: 8,
    frontSpringStiffnessNm: 95,
    rearSpringStiffnessNm: 85,
    frontStabilizer: 25,
    rearStabilizer: 15,
    frontCamberDeg: -7.5,
    rearCamberDeg: -0.8,
    frontToeDeg: 0.15,
    rearToeDeg: -0.10,
    casterDeg: 8.5,
    ackermanPercent: 28,
    maxSteeringAngleDeg: 65,
    frontRimSizeInch: 15,
    rearRimSizeInch: 15,
    frontTireWidthMm: 205,
    rearTireWidthMm: 215,
    frontTirePressureKpa: 175,
    rearTirePressureKpa: 140,
    turboBoostBar: 1.25,
    engineRevLimitRpm: 11000,
    differentialLockRatio: 0.95,
    finalDriveRatio: 4.30,
    brakeTorqueNm: 2200,
    frontBrakeBiasPercent: 72,
    styleTipMn: 'Акинагийн уруудах замд зориулсан 65 градусын том өнцөгтэй тохиргоо. Акерманыг 28% дээр тавьснаар шарвах үед машин спин хийхгүй, хөнгөн жингээрээ жигд гулгана.',
    styleTipEn: 'Mount Akina downhill setup. 65° steering lock with 28% Ackerman prevents snap-spins and gives ultra-smooth inertia slides through hairpins.'
  },
  'rx7-fd3s': {
    carId: 'rx7-fd3s',
    carName: 'Mazda Efini RX-7 (FD3S)',
    carXModelName: 'Falcon RZ (FD3S)',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '100%',
    frontSpringLengthCm: 6,
    rearSpringLengthCm: 7,
    frontSpringStiffnessNm: 120,
    rearSpringStiffnessNm: 105,
    frontStabilizer: 35,
    rearStabilizer: 20,
    frontCamberDeg: -8.0,
    rearCamberDeg: -1.2,
    frontToeDeg: 0.20,
    rearToeDeg: 0.05,
    casterDeg: 9.0,
    ackermanPercent: 22,
    maxSteeringAngleDeg: 63,
    frontRimSizeInch: 18,
    rearRimSizeInch: 18,
    frontTireWidthMm: 235,
    rearTireWidthMm: 265,
    frontTirePressureKpa: 185,
    rearTirePressureKpa: 150,
    turboBoostBar: 1.65,
    engineRevLimitRpm: 8800,
    differentialLockRatio: 1.0,
    finalDriveRatio: 3.90,
    brakeTorqueNm: 2600,
    frontBrakeBiasPercent: 70,
    styleTipMn: 'Өндөр хурдны уралдааны түнэ. Өргөн 265мм хойд дугуй ба 1.65 бар турбо даралт нь өгсөх замд хүчтэй таталт өгч, 13B роторын өндөр эргэлтийг төгс ашиглана.',
    styleTipEn: 'High-speed uphill sweeper tune. 265mm rear rubber and 1.65 Bar twin-turbo boost gives endless wheelspin and razor-sharp high-speed transitions.'
  },
  'rx7-fc3s': {
    carId: 'rx7-fc3s',
    carName: 'Mazda Savanna RX-7 (FC3S)',
    carXModelName: 'FC3S / White Comet',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '100%',
    frontSpringLengthCm: 7,
    rearSpringLengthCm: 7,
    frontSpringStiffnessNm: 110,
    rearSpringStiffnessNm: 100,
    frontStabilizer: 30,
    rearStabilizer: 18,
    frontCamberDeg: -7.0,
    rearCamberDeg: -1.0,
    frontToeDeg: 0.10,
    rearToeDeg: 0.00,
    casterDeg: 8.0,
    ackermanPercent: 30,
    maxSteeringAngleDeg: 64,
    frontRimSizeInch: 17,
    rearRimSizeInch: 17,
    frontTireWidthMm: 225,
    rearTireWidthMm: 245,
    frontTirePressureKpa: 180,
    rearTirePressureKpa: 155,
    turboBoostBar: 1.45,
    engineRevLimitRpm: 8400,
    differentialLockRatio: 0.90,
    finalDriveRatio: 4.10,
    brakeTorqueNm: 2400,
    frontBrakeBiasPercent: 68,
    styleTipMn: 'Рёосүкэгийн 50:50 төгс жингийн хуваарилалтын тохиргоо. Шилжилт (Transition) хийх үед хамгийн тогтвортой бөгөөд урьдчилан таамаглахад тун хялбар түнэ.',
    styleTipEn: 'Ryosuke\'s clinical 50:50 balance setup. Predictable steering geometry with 30% Ackerman makes high-speed tandem transitions effortless.'
  },
  'skyline-r32': {
    carId: 'skyline-r32',
    carName: 'Nissan Skyline GT-R (BNR32)',
    carXModelName: 'Godzilla R32',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '100%',
    frontSpringLengthCm: 8,
    rearSpringLengthCm: 8,
    frontSpringStiffnessNm: 135,
    rearSpringStiffnessNm: 115,
    frontStabilizer: 40,
    rearStabilizer: 22,
    frontCamberDeg: -6.5,
    rearCamberDeg: -1.5,
    frontToeDeg: 0.25,
    rearToeDeg: 0.10,
    casterDeg: 7.5,
    ackermanPercent: 18,
    maxSteeringAngleDeg: 62,
    frontRimSizeInch: 18,
    rearRimSizeInch: 18,
    frontTireWidthMm: 255,
    rearTireWidthMm: 265,
    frontTirePressureKpa: 195,
    rearTirePressureKpa: 160,
    turboBoostBar: 1.80,
    engineRevLimitRpm: 8200,
    differentialLockRatio: 1.0,
    finalDriveRatio: 4.11,
    brakeTorqueNm: 2900,
    frontBrakeBiasPercent: 74,
    styleTipMn: 'Хүнд жинтэй R32-ийг дрифт хийлгэх CarX тусгай тохиргоо. Урд кемберийг -6.5° дээр барьж, 1.8 бар даралттай RB26-ийн өндөр эргүүлэх хүчээр дрифтийг удаан барина.',
    styleTipEn: 'Heavyweight GT-R CarX drift tune. RB26 raw torque at 1.8 Bar powers through long sweepers with solid high-speed stability.'
  },
  'lancer-evo3': {
    carId: 'lancer-evo3',
    carName: 'Mitsubishi Lancer Evolution III (CE9A)',
    carXModelName: 'Evo III Rally-Drift',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '100%',
    frontSpringLengthCm: 9,
    rearSpringLengthCm: 9,
    frontSpringStiffnessNm: 115,
    rearSpringStiffnessNm: 95,
    frontStabilizer: 28,
    rearStabilizer: 24,
    frontCamberDeg: -6.8,
    rearCamberDeg: -1.0,
    frontToeDeg: 0.15,
    rearToeDeg: -0.15,
    casterDeg: 7.8,
    ackermanPercent: 32,
    maxSteeringAngleDeg: 64,
    frontRimSizeInch: 17,
    rearRimSizeInch: 17,
    frontTireWidthMm: 225,
    rearTireWidthMm: 235,
    frontTirePressureKpa: 180,
    rearTirePressureKpa: 145,
    turboBoostBar: 1.70,
    engineRevLimitRpm: 7800,
    differentialLockRatio: 0.95,
    finalDriveRatio: 4.50,
    brakeTorqueNm: 2500,
    frontBrakeBiasPercent: 65,
    styleTipMn: 'MisFiring системийн шууд хариу үйлдэлд зориулсан ралли-дрифт түнэ. Богино хурдны хайрцаг 4.50 ба хойд тое -0.15° нь эргэлтэд маш хурдан орно.',
    styleTipEn: 'Anti-Lag aggressive snap setup. 4.50 short final drive and -0.15° rear toe makes the rear swing wide instantly on handbrake tap.'
  },
  'civic-eg6': {
    carId: 'civic-eg6',
    carName: 'Honda Civic SiR-II (EG6)',
    carXModelName: 'Civic EG VTEC',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '90%',
    frontSpringLengthCm: 7,
    rearSpringLengthCm: 9,
    frontSpringStiffnessNm: 110,
    rearSpringStiffnessNm: 140,
    frontStabilizer: 20,
    rearStabilizer: 38,
    frontCamberDeg: -5.5,
    rearCamberDeg: -0.5,
    frontToeDeg: 0.10,
    rearToeDeg: -0.25,
    casterDeg: 7.0,
    ackermanPercent: 35,
    maxSteeringAngleDeg: 60,
    frontRimSizeInch: 15,
    rearRimSizeInch: 15,
    frontTireWidthMm: 205,
    rearTireWidthMm: 195,
    frontTirePressureKpa: 210,
    rearTirePressureKpa: 120,
    turboBoostBar: 0.85,
    engineRevLimitRpm: 8600,
    differentialLockRatio: 0.85,
    finalDriveRatio: 4.70,
    brakeTorqueNm: 2000,
    frontBrakeBiasPercent: 80,
    styleTipMn: 'Урд хөтлөгчтэй (FF) машиныг дрифт хийлгэх тусгай CarX түнэ: Хойд пүрш ба тогтворжуулагчийг маш хатуу тавьж, хойд дугуйн даралтыг 120 kPa болгон хөнгөн шарвуулна.',
    styleTipEn: 'FF drift trick tune: Ultra-stiff rear sway bar (38) and low 120 kPa rear pressure breaks traction easily into lift-off oversteer.'
  },
  'silvia-s13': {
    carId: 'silvia-s13',
    carName: 'Nissan Silvia K\'s (S13)',
    carXModelName: 'Silvia S13 / Phoenix NX',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '100%',
    frontSpringLengthCm: 7,
    rearSpringLengthCm: 8,
    frontSpringStiffnessNm: 105,
    rearSpringStiffnessNm: 90,
    frontStabilizer: 30,
    rearStabilizer: 16,
    frontCamberDeg: -7.2,
    rearCamberDeg: -0.9,
    frontToeDeg: 0.18,
    rearToeDeg: -0.05,
    casterDeg: 8.2,
    ackermanPercent: 26,
    maxSteeringAngleDeg: 65,
    frontRimSizeInch: 17,
    rearRimSizeInch: 17,
    frontTireWidthMm: 215,
    rearTireWidthMm: 235,
    frontTirePressureKpa: 180,
    rearTirePressureKpa: 145,
    turboBoostBar: 1.35,
    engineRevLimitRpm: 7600,
    differentialLockRatio: 1.0,
    finalDriveRatio: 4.08,
    brakeTorqueNm: 2300,
    frontBrakeBiasPercent: 70,
    styleTipMn: 'Анхлан суралцагч болон Touge замд төгс тохирох сонгодог S-Chassis түнэ. 65° өнцөгтэй урд гар, түгжигдсэн дифференциалаар хялбархан дрифт хийнэ.',
    styleTipEn: 'Classic S-chassis drift benchmark. 65° angle lock and welded diff allows beginner-friendly yet highly competitive touge control.'
  },
  'impreza-gc8': {
    carId: 'impreza-gc8',
    carName: 'Subaru Impreza WRX STi GC8',
    carXModelName: 'Impreza GC8 / Blue Phantom',
    tuneClass: 'Ultimate',
    recommendedTireAdhesion: '100%',
    frontSpringLengthCm: 8,
    rearSpringLengthCm: 9,
    frontSpringStiffnessNm: 125,
    rearSpringStiffnessNm: 110,
    frontStabilizer: 34,
    rearStabilizer: 26,
    frontCamberDeg: -6.6,
    rearCamberDeg: -1.4,
    frontToeDeg: 0.20,
    rearToeDeg: 0.00,
    casterDeg: 8.0,
    ackermanPercent: 25,
    maxSteeringAngleDeg: 63,
    frontRimSizeInch: 17,
    rearRimSizeInch: 17,
    frontTireWidthMm: 235,
    rearTireWidthMm: 245,
    frontTirePressureKpa: 190,
    rearTirePressureKpa: 150,
    turboBoostBar: 1.55,
    engineRevLimitRpm: 8200,
    differentialLockRatio: 0.90,
    finalDriveRatio: 4.44,
    brakeTorqueNm: 2700,
    frontBrakeBiasPercent: 68,
    styleTipMn: 'Бунтагийн 4WD дрифт мастер түнэ: Төвийн дифференциалын хуваарилалтыг хойш ихэсгэж, Boxer моторын нам хүндийн төвийг ашиглан маш өндөр хурдаар дрифт хийнэ.',
    styleTipEn: 'Bunta\'s AWD drift monster tune: Rear-biased center diff lock and boxer low center-of-gravity allows impossible entry speeds.'
  }
};

export type DriftStyleType = 'tandem' | 'touge' | 'reverse' | 'street';

export interface DriftStylePreset {
  id: DriftStyleType;
  nameMn: string;
  nameEn: string;
  badge: string;
  tag: string;
  descriptionMn: string;
  descriptionEn: string;
  modifiers: {
    frontCamberOffset: number;
    rearCamberOffset: number;
    steeringAngle: number;
    ackerman: number;
    boostOffset: number;
    frontHeightCm: number;
    rearHeightCm: number;
    diffLockPercent: number;
    rearPressureKpa: number;
    adhesion: '90%' | '100%' | '110%' | '120%';
  };
}

export const DRIFT_STYLE_PRESETS: DriftStylePreset[] = [
  {
    id: 'tandem',
    nameMn: '🏆 Про Тандем (100% Grip)',
    nameEn: '🏆 Pro Tandem (100% Grip)',
    badge: 'ONLINE BATTLE',
    tag: 'Tandem 100%',
    descriptionMn: 'CarX онлайн өрөөнд бусад машинтай хаалга шүргэн ойрхон зэрэгцэж гулгах тэнцвэртэй түнэ. Хөдөлгөөн урьдчилан таамаглахад тун найдвартай.',
    descriptionEn: 'The gold standard for online multiplayer tandem battles. Stable lines, predictable transitions, and optimal 100% tire adhesion.',
    modifiers: {
      frontCamberOffset: 0,
      rearCamberOffset: 0,
      steeringAngle: 65,
      ackerman: 25,
      boostOffset: 0,
      frontHeightCm: 7,
      rearHeightCm: 8,
      diffLockPercent: 95,
      rearPressureKpa: 145,
      adhesion: '100%'
    }
  },
  {
    id: 'touge',
    nameMn: '⚡ Touge Attack (Уулын Хурд)',
    nameEn: '⚡ Touge Downhill Attack',
    badge: 'TOUGE SPEED',
    tag: 'Akina Downhill',
    descriptionMn: 'Initial D-ийн уулын уруудах нарийн замд зориулсан маш хурдан шилжилттэй (Inertia Drift), өндөр турбо даралттай тохиргоо.',
    descriptionEn: 'Ultra-fast snap transitions for downhill mountain passes. High turbo boost and responsive inertia slide for tight hairpins.',
    modifiers: {
      frontCamberOffset: -0.5,
      rearCamberOffset: +0.2,
      steeringAngle: 63,
      ackerman: 32,
      boostOffset: +0.20,
      frontHeightCm: 6,
      rearHeightCm: 7,
      diffLockPercent: 90,
      rearPressureKpa: 160,
      adhesion: '100%'
    }
  },
  {
    id: 'reverse',
    nameMn: '🔥 Reverse Entry (Гүн Өнцөг 68°)',
    nameEn: '🔥 Reverse Entry (Max 68° Angle)',
    badge: 'HIGH ANGLE',
    tag: 'Reverse 68°',
    descriptionMn: 'Хамгийн дээд 68° жолооны өнцөг, урд талын их кембер (-8.8° хүртэл) ба 0% Акерман. Машин бараг ухрах шахан том өнцгөөр гулгана.',
    descriptionEn: 'Maximum 68° lock with aggressive front camber and near-zero Ackerman. Allows radical backwards reverse entries without spinning out.',
    modifiers: {
      frontCamberOffset: -1.2,
      rearCamberOffset: -0.3,
      steeringAngle: 68,
      ackerman: 8,
      boostOffset: +0.35,
      frontHeightCm: 5,
      rearHeightCm: 6,
      diffLockPercent: 100,
      rearPressureKpa: 130,
      adhesion: '100%'
    }
  },
  {
    id: 'street',
    nameMn: '🔰 Easy Street (90% Наалдац)',
    nameEn: '🔰 Easy Street (90% Adhesion)',
    badge: 'EASY DRIFT',
    tag: 'Street 90%',
    descriptionMn: 'Анхлан суралцагч болон бага хүчээр ч хөнгөхөн шарвуулахад хамгийн эвтэйхэн, хальтаргаа өндөртэй 90% дугуйн наалдацтай түнэ.',
    descriptionEn: 'Slippery 90% adhesion setup. Easy to initiate and maintain continuous drift even at lower RPM and power levels.',
    modifiers: {
      frontCamberOffset: +0.8,
      rearCamberOffset: +0.5,
      steeringAngle: 60,
      ackerman: 35,
      boostOffset: -0.20,
      frontHeightCm: 8,
      rearHeightCm: 8,
      diffLockPercent: 85,
      rearPressureKpa: 170,
      adhesion: '90%'
    }
  }
];

