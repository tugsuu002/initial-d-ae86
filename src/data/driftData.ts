export interface DriftImage {
  id: string;
  titleMn: string;
  titleEn: string;
  techniqueMn: string;
  techniqueEn: string;
  locationMn: string;
  locationEn: string;
  descriptionMn: string;
  descriptionEn: string;
  aspectRatio: string;
  rpm: number;
  speedKmh: number;
  gear: number;
  driftAngleDeg: number;
  gForce: number;
  src: string;
  aspect: '16:9' | '4:3';
  tags: string[];
}

export const DRIFT_IMAGES: DriftImage[] = [
  {
    id: 'akina-hairpin',
    titleMn: 'Акинагийн үсний хавчаар огцом эргэлтийн дрифт',
    titleEn: 'Mount Akina Hairpin Counter-Steer Drift',
    techniqueMn: 'Эсрэг жолоодлого ба өнцгийн баланс (Counter-steer)',
    techniqueEn: 'High-Angle Full Counter-Steer & Weight Transfer',
    locationMn: 'Акина уул (Харуна), 5 дараалсан үсний хавчаар эргэлт',
    locationEn: 'Mount Akina (Haruna Touge), 5 Consecutive Hairpins',
    descriptionMn: 'Шөнийн манантай Акина уулын хамгийн хүнд эргэлт дээр хойд дугуйнуудаас өтгөн утаа гарган, поп-ап гэрлээ асаан 9000 эрг/мин-ээр төгс өнцгөөр гулган орж буй домогт AE86.',
    descriptionEn: 'The iconic AE86 panda coupe slicing through the midnight mist of Mount Akina, rear tires smoking furiously under 9,000 RPM power sliding into the apex with Fujiwara Tofu Shop decal clearly visible.',
    aspectRatio: '16:9',
    rpm: 9600,
    speedKmh: 112,
    gear: 3,
    driftAngleDeg: 46,
    gForce: 1.28,
    src: '/src/assets/images/ae86_drift_akina_hairpin_1793245500325.jpg',
    aspect: '16:9',
    tags: ['Hairpin', 'Touge', 'Night Drift', 'Panda Trueno', 'Fujiwara Tofu']
  },
  {
    id: 'gutter-run',
    titleMn: 'Домогт тэвшний (Gutter Run) дрифт техник',
    titleEn: 'The Legendary Inside Gutter Drop (Mizo-Otoshi)',
    techniqueMn: 'Тэвш ашиглан төвөөс зугтах хүчийг ялах нууц техник',
    techniqueEn: 'Centrifugal Force Cancellation via Drainage Gutter Hook',
    locationMn: 'Харуна уулын уруудах зам, Үдшийн бүрий',
    locationEn: 'Mount Haruna Downhill Pass, Twilight Run',
    descriptionMn: 'Урд дотор дугуйгаа замын хажуугийн борооны урсгалын бетонон тэвшинд оруулан төвөөс зугтах хүчийг барьж, боломжгүй гэмээр хурдаар эргэлтийг огцом туулах Такумигийн суут техник.',
    descriptionEn: 'Takumi dropping the inside front tire into the concrete drainage gutter to defy centrifugal force, sliding through the bend at speeds physics would normally forbid.',
    aspectRatio: '16:9',
    rpm: 8800,
    speedKmh: 124,
    gear: 4,
    driftAngleDeg: 38,
    gForce: 1.42,
    src: '/src/assets/images/ae86_drift_gutter_run_1793245500458.jpg',
    aspect: '16:9',
    tags: ['Gutter Run', 'Mizo-Otoshi', 'Touge Attack', 'Twilight']
  },
  {
    id: 'night-battle',
    titleMn: 'Шөнийн тулаан: AE86 ба Nissan Skyline GT-R R32',
    titleEn: 'Midnight Touge Battle: AE86 vs Skyline GT-R R32',
    techniqueMn: 'Хөнгөн кузов, уруудах чиглэлийн инерцээр тулалдах',
    techniqueEn: 'Downhill Inertia Drift vs Heavyweight AWD Turbo',
    locationMn: 'Акина уул, Барианд хүрэхээс өмнөх эцсийн S-эргэлт',
    locationEn: 'Mount Akina, Final S-Curve Complex before Finish',
    descriptionMn: 'Хүнд хүчирхэг Nissan Skyline GT-R R32-ийн өмнө 800 кг хөнгөн AE86 Trueno уруудах замын хурд, инерцээрээ илүүрхэн нойтон асфальт дээр шарван өнгөрч буй агшин.',
    descriptionEn: 'The 800kg lightweight Trueno outmaneuvering Takeshi Nakazato\'s heavyweight 380HP R32 Skyline GT-R on the rain-dampened downhill touge descent.',
    aspectRatio: '4:3',
    rpm: 9200,
    speedKmh: 118,
    gear: 3,
    driftAngleDeg: 52,
    gForce: 1.34,
    src: '/src/assets/images/ae86_drift_night_battle_1793245502789.jpg',
    aspect: '4:3',
    tags: ['Touge Battle', 'AE86 vs R32', 'Night Rain', 'Downhill Special']
  },
  {
    id: 'cockpit-water-cup',
    titleMn: 'Кабины харагдац: Усны аяганы төгс баланс',
    titleEn: 'Cockpit View: Fujiwara Water Cup Technique',
    techniqueMn: 'Ус дусал ч асгаруулахгүй жигд G-force шилжүүлэлт',
    techniqueEn: 'Zero-Spill Inertia Training & 11,000 RPM Racing Gauge',
    locationMn: 'AE86 Sprinter Trueno жолоочийн суудал',
    locationEn: 'AE86 Sprinter Trueno Driver Cockpit, Akina Downhill',
    descriptionMn: 'Бунтагийн заасан даалгавар: Аягатай усны түвшинг дусал ч асгаруулахгүйгээр уулын замыг туулах жигд жолоодлогын урлаг. Хяналтын самбарын шар өнгийн 9000-11000 эрг/мин заагч ба спорт жолоо.',
    descriptionEn: 'Bunta\'s legendary training regime: perfecting weight transfer by keeping a paper cup of water on the dash without spilling a single drop while sliding at over 100 km/h.',
    aspectRatio: '16:9',
    rpm: 9900,
    speedKmh: 105,
    gear: 3,
    driftAngleDeg: 28,
    gForce: 0.95,
    src: '/src/assets/images/ae86_cockpit_drift_water_1793245502078.jpg',
    aspect: '16:9',
    tags: ['Cockpit', 'Water Cup', '11000 RPM Gauge', 'Interior POV']
  }
];

export interface CarSpec {
  categoryMn: string;
  categoryEn: string;
  items: { labelMn: string; labelEn: string; value: string }[];
}

export const AE86_SPECS: CarSpec[] = [
  {
    categoryMn: 'Хөдөлгүүр ба Чадал',
    categoryEn: 'Powertrain & Performance',
    items: [
      { labelMn: 'Хөдөлгүүрийн загвар', labelEn: 'Engine Model', value: 'Toyota 4A-GE Silvertop Group A (TRD Formula Atlantic Spec)' },
      { labelMn: 'Эзлэхүүн', labelEn: 'Displacement', value: '1,587 cc (1.6L Inline-4 DOHC 20-Valve)' },
      { labelMn: 'Дээд эргэлт (Redline)', labelEn: 'Max Redline', value: '11,000 RPM (Өндөр эргэлтийн уралдааны мотор)' },
      { labelMn: 'Хүчин чадал', labelEn: 'Horsepower', value: '240 HP @ 9,800 RPM' },
      { labelMn: 'Эргүүлэх хүч', labelEn: 'Peak Torque', value: '178 N·m @ 8,500 RPM' },
      { labelMn: 'Хөтлөгч төрөл', labelEn: 'Drivetrain', value: 'FR (Front-Engine, Rear-Wheel Drive)' }
    ]
  },
  {
    categoryMn: 'Явах эд анги & Жин',
    categoryEn: 'Chassis & Suspension',
    items: [
      { labelMn: 'Нийт жин', labelEn: 'Curb Weight', value: '800 kg (Хөнгөн атлаа төгс 53:47 баланс)' },
      { labelMn: 'Хурдны хайрцаг', labelEn: 'Transmission', value: 'TRD Close-Ratio 5-Speed Manual' },
      { labelMn: 'Дифференциал', labelEn: 'Differential', value: 'TRD 2-Way Mechanical LSD' },
      { labelMn: 'Амортизатор', labelEn: 'Suspension', value: 'Custom TRD Race Springs & Adjustable Dampers' },
      { labelMn: 'Дугуй', labelEn: 'Tires', value: 'Bridgestone Potenza RE71R (Front 185/60R14, Rear 185/60R14)' },
      { labelMn: 'Хаалганы бичиг', labelEn: 'Door Lettering', value: '藤原とうふ店 (自家用) - Fujiwara Tofu Shop' }
    ]
  }
];
