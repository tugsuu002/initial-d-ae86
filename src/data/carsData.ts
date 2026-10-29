export interface InitialDCar {
  id: string;
  name: string;
  make: string;
  chassisCode: string;
  driver: string;
  driverJapanese: string;
  team: string;
  teamCategory: 'project-d' | 'redsuns' | 'nightkids' | 'emperor' | 'akina';
  colorName: string;
  colorHex: string;
  quoteMn: string;
  quoteEn: string;
  imageSrc: string;
  hasCustomPhoto?: boolean;
  
  // Technical Specifications
  engineCode: string;
  engineType: string;
  horsepower: number;
  torqueNm: number;
  redlineRpm: number;
  weightKg: number;
  drivetrain: 'FR' | 'AWD' | 'FF' | 'MR';
  transmission: string;
  acceleration0to100: string;
  
  // Radar / Performance ratings (out of 10)
  ratings: {
    speed: number;
    handling: number;
    downhill: number;
    uphill: number;
    soundScore: number;
  };
  
  // Mod List & Lore
  modificationsMn: string[];
  modificationsEn: string[];
  battleHistoryMn: string;
  battleHistoryEn: string;
  soundType: '4age' | 'rotary' | 'rb26' | 'antilag' | 'vtec' | 'boxer';
}

export const INITIAL_D_CARS: InitialDCar[] = [
  {
    id: 'ae86-trueno',
    name: 'Toyota Sprinter Trueno GT-Apex (AE86)',
    make: 'TOYOTA',
    chassisCode: 'AE86 (Хачи-Рокү)',
    driver: 'Такуми Фүживара (Takumi Fujiwara)',
    driverJapanese: '藤原 拓海',
    team: 'Project D / Fujiwara Tofu',
    teamCategory: 'project-d',
    colorName: 'High-Tech Two-Tone Panda White/Black',
    colorHex: '#ffffff',
    quoteMn: '“Уруудах замын хамгийн хурдан нь байхын тулд надад турбо хэрэггүй.”',
    quoteEn: '“I don\'t need turbo power to be the fastest downhill on Mount Akina.”',
    imageSrc: '/src/assets/images/ae86_drift_akina_hairpin_1793245500325.jpg',
    hasCustomPhoto: true,
    engineCode: '4A-GE 20V Silvertop Group A (TRD)',
    engineType: '1.6L Inline-4 DOHC 20-Valve ITB',
    horsepower: 240,
    torqueNm: 178,
    redlineRpm: 11000,
    weightKg: 800,
    drivetrain: 'FR',
    transmission: 'TRD Close-Ratio 5-Speed Manual',
    acceleration0to100: '5.4s',
    ratings: {
      speed: 8.6,
      handling: 9.9,
      downhill: 10.0,
      uphill: 7.8,
      soundScore: 9.8
    },
    modificationsMn: [
      'TRD Formula Atlantic 11,000 RPM өндөр эргэлтийн уралдааны мотор',
      '4 бие даасан нээлттэй сорох хоолой (Individual Throttle Bodies)',
      'TRD 2-Way механик дифференциал цоожлогч (LSD)',
      'Спортын амортизатор & Тохируулгатай өндөр нам пүрш',
      'Бүхээгийн дотор талын аюулгүйн каркас рам (Roll Cage)'
    ],
    modificationsEn: [
      'TRD Formula Atlantic 11,000 RPM dry-sump race engine',
      'Quad Individual Throttle Bodies with velocity stacks',
      'TRD 2-Way Mechanical Limited-Slip Differential',
      'Race-tuned adjustable dampers with custom spring rates',
      'Chassis reinforcement spot-welds and roll cage'
    ],
    battleHistoryMn: 'Кэйсүкэгийн FD3S, Наказатогийн R32, Шингогийн EG6, Рёосүкэгийн FC3S, Кёичигийн Evo III зэрэг Гүнма мужийн бүх шилдгүүдийг Акинагийн уруудах замд өвдөг сөхрүүлсэн.',
    battleHistoryEn: 'Defeated Keisuke\'s FD3S, Nakazato\'s R32 GT-R, Shingo\'s EG6 duct tape match, Ryosuke\'s FC3S, and conquered Japan\'s Kanto region with Project D.',
    soundType: '4age'
  },
  {
    id: 'rx7-fd3s',
    name: 'Mazda Efini RX-7 Type R (FD3S)',
    make: 'MAZDA',
    chassisCode: 'FD3S',
    driver: 'Кэйсүкэ Такахаши (Keisuke Takahashi)',
    driverJapanese: '高橋 啓介',
    team: 'Akagi RedSuns / Project D (Өгсөх зам)',
    teamCategory: 'project-d',
    colorName: 'Competition Yellow Mica',
    colorHex: '#eab308',
    quoteMn: '“Н-ЮУ ВЭ?! ИНЕРЦИЙН ДРИФТ ГЭЖ ҮҮ?! (NANI?! KANSEI DORIFTO?!)”',
    quoteEn: '“N-NANI?! INERTIA DRIFT?! (Kansei Dorifto?!)”',
    imageSrc: '/src/assets/images/fd3s_rx7_keisuke_1793251110696.jpg',
    hasCustomPhoto: true,
    engineCode: '13B-REW Sequential Twin-Turbo',
    engineType: '1.3L Twin-Rotor Wankel Rotary Turbo',
    horsepower: 350,
    torqueNm: 366,
    redlineRpm: 8500,
    weightKg: 1220,
    drivetrain: 'FR',
    transmission: 'Mazdaspeed 5-Speed Manual',
    acceleration0to100: '4.5s',
    ratings: {
      speed: 9.6,
      handling: 9.4,
      downhill: 8.8,
      uphill: 9.9,
      soundScore: 9.9
    },
    modificationsMn: [
      'RE-Amemiya аэродинамик картер & өргөн кузов',
      'Apex\'i Power FC тохируулагддаг компютер',
      'Knight Sports дараалсан давхар турбо (Twin-scroll)',
      'Mazdaspeed хөнгөн жинтэй спорт яндан & Blow-off valve',
      'Brembo уралдааны дискэн тоормосны систем'
    ],
    modificationsEn: [
      'RE-Amemiya aero front bumper, carbon hood & rear GT wing',
      'Apex\'i Power FC standalone engine management',
      'Knight Sports high-flow twin turbos with sequential boost',
      'Mazdaspeed lightweight titanium exhaust with twin-scroll BOV',
      'Brembo big-brake kit with slotted rotors'
    ],
    battleHistoryMn: 'Акина ууланд Такумитай анх уралдаж, инерцийн дрифтийг харснаас хойш уралдааны чадвараа эрс ахиулж Project D багийн өгсөх замын шилдэг нисгэгч болсон.',
    battleHistoryEn: 'Pushed to his limits by Takumi at Akina; went on to become the undefeated uphill ace of Project D across the whole Kanto region.',
    soundType: 'rotary'
  },
  {
    id: 'rx7-fc3s',
    name: 'Mazda Savanna RX-7 Infini III (FC3S)',
    make: 'MAZDA',
    chassisCode: 'FC3S',
    driver: 'Рёосүкэ Такахаши (Ryosuke Takahashi)',
    driverJapanese: '高橋 涼介',
    team: 'Akagi RedSuns (Акаги уулын Цагаан сүүлт од)',
    teamCategory: 'redsuns',
    colorName: 'Crystal White',
    colorHex: '#f8fafc',
    quoteMn: '“Уралдаан бол зүгээр л хурд биш. Энэ бол математик, онол, хүндийн төвийн төгс төгөлдөр зохицол юм.”',
    quoteEn: '“Street racing isn\'t just speed. It is mathematical precision and perfect weight transfer.”',
    imageSrc: '/src/assets/images/fc3s_rx7_ryosuke_1793251110732.jpg',
    hasCustomPhoto: true,
    engineCode: '13B-T Rotary Single Turbo',
    engineType: '1.3L Twin-Rotor Electronic Fuel Injection Turbo',
    horsepower: 350,
    torqueNm: 390,
    redlineRpm: 8200,
    weightKg: 1200,
    drivetrain: 'FR',
    transmission: 'Custom Close-Ratio 5-Speed Manual',
    acceleration0to100: '4.6s',
    ratings: {
      speed: 9.5,
      handling: 9.7,
      downhill: 9.8,
      uphill: 9.5,
      soundScore: 9.5
    },
    modificationsMn: [
      'Хувиргасан өндөр даралтат турбо & Том завсрын хөргөгч (Intercooler)',
      'Рёосүкэгийн өөрийнх нь тооцоолсон нарийн төвөгтэй түдгэлзүүлэлт',
      'Такумитай хийх тулаанд зориулж 260 морины хүч рүү тусгайлан бууруулсан уян баланс',
      'Work Meister дугуйнууд & Карбон урд хошуу'
    ],
    modificationsEn: [
      'High-flow single turbo conversion with front-mount intercooler',
      'Ryosuke\'s custom suspension geometry calculations',
      'Detuned to 260 HP for the Akina showdown to achieve 50:50 balance against the AE86',
      'Work Meister S1 lightweight wheels & carbon aero'
    ],
    battleHistoryMn: 'Гүнма мужийн домогт удирдагч. Такумитай хийсэн Акинагийн тулаан нь Initial D-ийн түүхэн дэх хамгийн гайхалтай уралдаануудын нэг болсон.',
    battleHistoryEn: 'The White Comet of Akagi. Creator of the Fastest Street Theory and mastermind behind Project D.',
    soundType: 'rotary'
  },
  {
    id: 'skyline-r32',
    name: 'Nissan Skyline GT-R V-Spec II (BNR32)',
    make: 'NISSAN',
    chassisCode: 'BNR32',
    driver: 'Такэши Наказато (Takeshi Nakazato)',
    driverJapanese: '中里 毅',
    team: 'Myogi NightKids (Мёоги уулын удирдагч)',
    teamCategory: 'nightkids',
    colorName: 'Black Pearl Metallic',
    colorHex: '#18181b',
    quoteMn: '“Дрифт бол цаг алдалт! 4 дугуйн хөтлөгч ATTESA ба RB26 хөдөлгүүрийн наалдац л хамгийн хурдан!”',
    quoteEn: '“Drifting is just wasting time! Maximum four-wheel grip from ATTESA AWD is true speed!”',
    imageSrc: '/src/assets/images/skyline_r32_nakazato_1793251112666.jpg',
    hasCustomPhoto: true,
    engineCode: 'RB26DETT Twin-Turbo Inline-6',
    engineType: '2.6L Twin-Turbo 24V DOHC Cast-Iron Block',
    horsepower: 380,
    torqueNm: 410,
    redlineRpm: 8000,
    weightKg: 1430,
    drivetrain: 'AWD',
    transmission: '5-Speed Manual with ATTESA E-TS',
    acceleration0to100: '4.2s',
    ratings: {
      speed: 9.8,
      handling: 8.9,
      downhill: 8.2,
      uphill: 9.9,
      soundScore: 9.7
    },
    modificationsMn: [
      'HKS өндөр даралтын давхар турбо үлээгч систем',
      'ATTESA E-TS цахим хяналттай ухаалаг бүх дугуйн хөтлөгч',
      'Brembo 4-поршинт уралдааны калиперууд',
      'Томруулсан яндангийн шулуун хоолой & Тосон хөргөгч'
    ],
    modificationsEn: [
      'HKS upgraded twin turbochargers and boost controller',
      'ATTESA E-TS electronically controlled AWD split system',
      'Brembo 4-piston racing calipers',
      'Fujitsubo stainless straight-pipe cat-back exhaust'
    ],
    battleHistoryMn: 'Акина ууланд Такумигийн AE86-тай уралдаж, илүү жингээсээ болж урд дугуй нь хэт халж үсний хавчаар эргэлт дээр хашлага мөргөсөн.',
    battleHistoryEn: 'Challenged Takumi on Akina downhill; lost when the heavy front-end AWD weight cooked his front tires on the consecutive hairpins.',
    soundType: 'rb26'
  },
  {
    id: 'lancer-evo3',
    name: 'Mitsubishi Lancer Evolution III GSR (CE9A)',
    make: 'MITSUBISHI',
    chassisCode: 'CE9A',
    driver: 'Кёичи Сүдо (Kyoichi Sudo)',
    driverJapanese: '須藤 京一',
    team: 'Emperor (Император багийн ахлагч)',
    teamCategory: 'emperor',
    colorName: 'Pyrenees Black with Yellow Decals',
    colorHex: '#09090b',
    quoteMn: '“Дүпүний машин манай раллигийн MisFiring (Anti-Lag) системийн дэргэд тоглоом төдий!”',
    quoteEn: '“Your tofu delivery car is a joke compared to our Rally MisFiring Anti-Lag System!”',
    imageSrc: '/src/assets/images/lancer_evo3_kyoichi_1793251113091.jpg',
    hasCustomPhoto: true,
    engineCode: '4G63T Inline-4 Turbo with MisFiring System',
    engineType: '2.0L 16V DOHC Turbo with WRC Anti-Lag',
    horsepower: 310,
    torqueNm: 400,
    redlineRpm: 7500,
    weightKg: 1260,
    drivetrain: 'AWD',
    transmission: 'WRC Close-Ratio 5-Speed Manual',
    acceleration0to100: '4.4s',
    ratings: {
      speed: 9.7,
      handling: 9.3,
      downhill: 9.4,
      uphill: 9.8,
      soundScore: 9.8
    },
    modificationsMn: [
      'WRC Раллигийн албан ёсны MisFiring Систем (Байнгын турбо даралт хадгалагч, буун дуу мэт дэлбэрэлттэй)',
      'Full-time 4WD механик цоожлогчтой төвийн дифференциал',
      'Өндөр даралтын том хэмжээтэй спойлер & Аэро бампер',
      'Өндөр температурт тэсвэртэй уралдааны накладууд'
    ],
    modificationsEn: [
      'WRC-derived MisFiring System (Anti-Lag System providing zero turbo lag with violent backfires)',
      'Full-time mechanical locking center differential AWD',
      'Oversized rally rear spoiler and brake ducting',
      'High-temp competition compound brake pads'
    ],
    battleHistoryMn: 'Акаги ууланд Такумигийн эх хөдөлгүүрийг 11,000 эргэлтийн мотор тавихаас өмнө моторыг нь буутал шахаж ялж байсан аюултай өрсөлдөгч.',
    battleHistoryEn: 'Blew Takumi\'s original AE86 engine on Mount Akagi before Bunta installed the Group A race engine. Later lost in Irohazaka touge duel.',
    soundType: 'antilag'
  },
  {
    id: 'civic-eg6',
    name: 'Honda Civic SiR-II (EG6)',
    make: 'HONDA',
    chassisCode: 'EG6',
    driver: 'Шинго Шожи (Shingo Shoji)',
    driverJapanese: '庄司 慎吾',
    team: 'Myogi NightKids (Скотчтой гарын тулаан)',
    teamCategory: 'nightkids',
    colorName: 'Milano Red',
    colorHex: '#dc2626',
    quoteMn: '“Баруун гараа жолоотой скотчоор наагаад уралдвал хэн нь жинхэнэ зоригтойг харна!”',
    quoteEn: '“Tape your right hand to the steering wheel, let\'s see who has the real courage!”',
    imageSrc: '/src/assets/images/civic_eg6_shingo_1793251113635.jpg',
    hasCustomPhoto: true,
    engineCode: 'B16A DOHC VTEC',
    engineType: '1.6L Inline-4 Naturally Aspirated High-Rev VTEC',
    horsepower: 185,
    torqueNm: 155,
    redlineRpm: 8200,
    weightKg: 1020,
    drivetrain: 'FF',
    transmission: '5-Speed Manual with Spoon LSD',
    acceleration0to100: '6.8s',
    ratings: {
      speed: 8.2,
      handling: 8.8,
      downhill: 9.1,
      uphill: 7.9,
      soundScore: 9.3
    },
    modificationsMn: [
      'Spoon Sports өндөр эргэлтийн VTEC компютер',
      'Хөнгөн жинтэй уралдааны капот & Бампер',
      'Урд хөтлөгчтэй (FF) машинд зориулсан тусгай хатуу хойд амортизатор',
      'Хөнгөн магнийн 15 инчийн уралдааны обуд'
    ],
    modificationsEn: [
      'Spoon Sports high-cam VTEC ECU reflash',
      'Lightweight stripped interior and composite hood',
      'Stiff rear torsion bar to promote FF oversteer and corner rotation',
      'Ultra-light 15-inch racing alloy wheels'
    ],
    battleHistoryMn: 'Такумиг уурлуулан "Duct Tape Deathmatch" буюу баруун гараа скотчоор жолоонд наасан үхлийн уралдаан зарлаж, эцэст нь өөрөө хашлага мөргөсөн.',
    battleHistoryEn: 'Challenged Takumi to the infamous Duct Tape Deathmatch on Akina; crashed out trying to deliberately pit-maneuver the AE86.',
    soundType: 'vtec'
  },
  {
    id: 'silvia-s13',
    name: 'Nissan Silvia K\'s (S13)',
    make: 'NISSAN',
    chassisCode: 'S13',
    driver: 'Коичиро Икэтани (Koichiro Iketani)',
    driverJapanese: '池谷 浩一郎',
    team: 'Akina SpeedStars (Акинагийн СпийдСтарс)',
    teamCategory: 'akina',
    colorName: 'Lime Green Two-Tone',
    colorHex: '#84cc16',
    quoteMn: '“Бид бол Акинагийн эзэд SpeedStars баг! Бид уулынхаа нэр төрийг хамгаална!”',
    quoteEn: '“We are the Akina SpeedStars! We will defend the pride of our home mountain!”',
    imageSrc: '/src/assets/images/silvia_s13_iketani_1793251220537.jpg',
    hasCustomPhoto: true,
    engineCode: 'CA18DET Turbo',
    engineType: '1.8L Inline-4 DOHC Turbocharged',
    horsepower: 205,
    torqueNm: 240,
    redlineRpm: 7200,
    weightKg: 1120,
    drivetrain: 'FR',
    transmission: '5-Speed Manual with Viscous LSD',
    acceleration0to100: '6.4s',
    ratings: {
      speed: 8.0,
      handling: 8.4,
      downhill: 8.3,
      uphill: 8.1,
      soundScore: 8.8
    },
    modificationsMn: [
      'Nismo уралдааны пүрш & Өндөр хурдны амортизатор',
      'HKS Super Power Flow агаарын шүүлтүүр',
      'Kakimoto Racing өндөр дуутай спорт яндан',
      'Nardi сонгодог модон/арьсан спорт жолоо'
    ],
    modificationsEn: [
      'Nismo performance lowering springs and dampers',
      'HKS Super Power Flow mushroom air filter',
      'Kakimoto Racing high-flow stainless cat-back exhaust',
      'Classic Nardi leather 3-spoke steering wheel'
    ],
    battleHistoryMn: 'Акина уулын анхдагч багийн ахлагч. Кэйсүкэтэй уралдахын өмнө бэлтгэл дээрээ осолдож, түүний оронд Такуми анх удаа уулын тулаанд гарч ирсэн.',
    battleHistoryEn: 'Leader of the Akina SpeedStars. Crashed during practice before the RedSuns battle, prompting Bunta to send Takumi to race in his place.',
    soundType: 'rb26'
  },
  {
    id: 'impreza-gc8',
    name: 'Subaru Impreza WRX STi Coupe Type R (GC8)',
    make: 'SUBARU',
    chassisCode: 'GC8',
    driver: 'Бунта Фүживара (Bunta Fujiwara)',
    driverJapanese: '藤原 文太',
    team: 'Домогт Акинагийн Сүнс (Ghost of Akina)',
    teamCategory: 'akina',
    colorName: 'Sonic Blue Mica (555 Rally Blue)',
    colorHex: '#2563eb',
    quoteMn: '“Нүдээ аниад ч дрифт хийж тамхиа асааж болно. Харин жинхэнэ 4WD машины чадлыг Такуми одоо л ойлгоно.”',
    quoteEn: '“I can drift with my eyes closed while lighting a cigarette. Now Takumi will learn what true 4WD speed feels like.”',
    imageSrc: '/src/assets/images/impreza_gc8_bunta_1793251113314.jpg',
    hasCustomPhoto: true,
    engineCode: 'EJ207 Boxer-4 Turbo',
    engineType: '2.0L Horizontally-Opposed Boxer-4 Turbo with Intercooler Water Spray',
    horsepower: 300,
    torqueNm: 360,
    redlineRpm: 8000,
    weightKg: 1240,
    drivetrain: 'AWD',
    transmission: 'TY75 5-Speed Manual with DCCD',
    acceleration0to100: '4.5s',
    ratings: {
      speed: 9.8,
      handling: 10.0,
      downhill: 10.0,
      uphill: 10.0,
      soundScore: 9.8
    },
    modificationsMn: [
      'DCCD (Driver Controlled Center Differential) цахим төвийн дифференциал',
      'Интеркүүлерын ус цацагч систем (Intercooler Water Spray)',
      'STI World Rally Blue кузов & Хөнгөн хөнгөн цагаан капот',
      'Бунтагийн өөрийнх нь нууц тохируулгатай ралли түдгэлзүүлэлт'
    ],
    modificationsEn: [
      'DCCD (Driver Controlled Center Differential) adjustable torque bias',
      'Intercooler water-spray system for maximum charge density',
      'STi lightweight aluminum hood and aerodynamic pack',
      'Bunta\'s legendary secret touge rally damping setup'
    ],
    battleHistoryMn: 'Такумиг Акина уулын уруудах замд гүйцэж ирэн, араас нь наалдан аймшигтай хурдаар хялбархан гүйцэж түрүүлэн Такумид амьдралынх нь хамгийн том шокийг өгсөн машин.',
    battleHistoryEn: 'Bunta secretly bought this car and casually overtook Takumi\'s AE86 on Akina downhill with zero effort while lighting a cigarette, shocking Takumi to his core.',
    soundType: 'boxer'
  }
];
