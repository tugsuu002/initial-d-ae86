export interface TechniqueStep {
  stepNumber: number;
  titleMn: string;
  titleEn: string;
  descMn: string;
  descEn: string;
  // Cockpit pedals (0 to 100)
  throttle: number;
  brake: number;
  clutch: number;
  steeringDeg: number; // Negative = turn right, positive = countersteer left, etc.
  speedKmh: number;
  rpm: number;
  gear: number;
  gForceLat: number; // Lateral G-force
  carPos: { x: number; y: number; angleDeg: number }; // Coordinates on normalized 0-100 hairpin SVG track
  soundAction?: 'brake' | 'rev' | 'shift' | 'drift' | 'gutter' | 'idle';
}

export interface DriftTechnique {
  id: string;
  nameMn: string;
  nameEn: string;
  japanese: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro' | 'God Foot / Fujiwara';
  badge: string;
  summaryMn: string;
  summaryEn: string;
  physicsPrincipleMn: string;
  physicsPrincipleEn: string;
  fujiwaraSecretMn: string;
  fujiwaraSecretEn: string;
  steps: TechniqueStep[];
}

export const DRIFT_TECHNIQUES: DriftTechnique[] = [
  {
    id: 'braking-drift',
    nameMn: 'Тормослох Дрифт (Braking Drift / Trail Braking)',
    nameEn: 'Braking Drift & Trail Braking',
    japanese: 'ブレーキングドリフト',
    difficulty: 'Intermediate',
    badge: 'WEIGHT TRANSFER',
    summaryMn: 'Эргэлт рүү өндөр хурдтай ойртож, тормослох үеийн жингийн урагш шилжилтийг ашиглан хойд тэнхлэгийн барьцалдлыг алдуулах Такумигийн суурь техник.',
    summaryEn: 'Initiating a controlled slide purely through forward weight transfer by trailing off the brake while aggressively turning into the corner apex.',
    physicsPrincipleMn: 'Эргэлтийн өмнө хүчтэй тормослоход машины жин урд дугуй руу шилжинэ (Inertial Load Transfer). Урд дугуйн замаас зуурах барьцалдалт дээд цэгтээ хүрч, харин хойд тэнхлэг хөнгөрч төвөөс зугтах хүчээр гадагш савлана.',
    physicsPrincipleEn: 'Heavy braking compresses front springs, dramatically increasing front tire grip while unweighting the rear axle. Turning the wheel then causes the lightweight rear end to break loose into an inertia slide.',
    fujiwaraSecretMn: 'Такуми энэ аргыг Акинагийн уруу замд дөрөөн дээр усны аяганаас нэг ч дусал ус асгахгүйгээр, маш зөөлөн жин шилжүүлэн хийдэг.',
    fujiwaraSecretEn: 'Takumi mastered this on Mount Akina without spilling a drop from Bunta\'s paper cup, proving that seamless weight transfer is faster than violent jerking.',
    steps: [
      {
        stepNumber: 1,
        titleMn: '1. Шулуун шугамын хурдатгал & Дөхөлт',
        titleEn: '1. Straight Line Approach',
        descMn: 'Эргэлт рүү 3-р араатай 115 км/ц хурдтайгаар гадна талын замаар дөхөж ирнэ.',
        descEn: 'Approach on the outer edge of the track at 115 km/h in 3rd gear maintaining full road width.',
        throttle: 90,
        brake: 0,
        clutch: 0,
        steeringDeg: 0,
        speedKmh: 115,
        rpm: 7400,
        gear: 3,
        gForceLat: 0.1,
        carPos: { x: 18, y: 88, angleDeg: 0 },
        soundAction: 'rev'
      },
      {
        stepNumber: 2,
        titleMn: '2. Огцом Тормос & 2-р Араа руу шилжих (Heel-and-Toe)',
        titleEn: '2. Heavy Trail Braking & Heel-and-Toe',
        descMn: 'Шулуун дээрээ хүчтэй тормослон жинг урагш ачаалж, өсгий-хуруу техникээр 2-р араа руу цохиж оруулна.',
        descEn: 'Apply hard braking to plant the front nose, heel-toe blip down to 2nd gear without shocking the drivetrain.',
        throttle: 20,
        brake: 85,
        clutch: 70,
        steeringDeg: -12,
        speedKmh: 75,
        rpm: 8200,
        gear: 2,
        gForceLat: 0.8,
        carPos: { x: 26, y: 55, angleDeg: -15 },
        soundAction: 'brake'
      },
      {
        stepNumber: 3,
        titleMn: '3. Тэнхлэгийг оруулах & Эсрэг жолоодлого (Countersteer)',
        titleEn: '3. Turn-in, Rear Breakaway & Countersteer',
        descMn: 'Тормосоо аажмаар суллах үед хойд дугуй шарваж эхэлмэгц жолоогоо эсрэг зүг рүү (Countersteer) огцом эргүүлнэ.',
        descEn: 'Trail off the brake, snap the wheel toward the inside. The rear slides wide; immediately catch the slide with countersteer.',
        throttle: 45,
        brake: 10,
        clutch: 0,
        steeringDeg: 35,
        speedKmh: 68,
        rpm: 7800,
        gear: 2,
        gForceLat: 1.35,
        carPos: { x: 50, y: 28, angleDeg: -55 },
        soundAction: 'drift'
      },
      {
        stepNumber: 4,
        titleMn: '4. Орой цэг (Apex) шүргэх & Бүрэн хааз өгч гарах',
        titleEn: '4. Apex Clipping & Throttle-Out Exit',
        descMn: 'Эргэлтийн дотор талын оройг шүргэн, 4A-GE-ийн 9,500 эргэлт дээр хаазаа тултал өгч дрифтээс шулуун шугам руу татан гарна.',
        descEn: 'Clip the apex millimeter-close, balance the slide with throttle feathers, and hammer the accelerator to straighten out.',
        throttle: 100,
        brake: 0,
        clutch: 0,
        steeringDeg: 5,
        speedKmh: 92,
        rpm: 9600,
        gear: 2,
        gForceLat: 0.9,
        carPos: { x: 82, y: 58, angleDeg: -105 },
        soundAction: 'rev'
      }
    ]
  },
  {
    id: 'inertia-drift',
    nameMn: 'Инерцийн Дрифт / Feint Motion (Scandinavian Flick)',
    nameEn: 'Inertia Drift & Feint Motion',
    japanese: '慣性ドリフト',
    difficulty: 'Pro',
    badge: 'PENDULUM EFFECT',
    summaryMn: 'Тормос бараг хүрэхгүйгээр жолоог эхлээд гадагш савлуулаад дотогш огцом дарах дүүжингийн хуулиар үүсэх хамгийн хурдан дрифт.',
    summaryEn: 'Flicking the car away from the turn before snapping into it, inducing a massive pendulum inertia snap without locking brakes.',
    physicsPrincipleMn: 'Эхлээд эсрэг зүг рүү жолоо дарахад кузовт ташуу инерци үүснэ. Дараа нь эргэлтийн зүг рүү огцом буцаахад пүрш ба тогтворжуулагч дүүжин мэт буцаж цохигдон (Snap Oversteer) дрифт эхэлнэ.',
    physicsPrincipleEn: 'Steering briefly away from the corner loads outside suspension. Quickly snapping the steering back reverses this inertia violently, breaking rear traction through pure centrifugal force.',
    fujiwaraSecretMn: 'Кэйсүкэ Такумитай анх уралдахдаа: "Тэр ямар ч тормослох гэрэл асаалгүйгээр, миний хажуугаар галзуу инерцээр гулгаад орчихлоо!" гэж дуу алдсан алдарт үзэгдэл.',
    fujiwaraSecretEn: 'Keisuke Takahashi shouted into his radio: "He\'s not even braking! He initiated an inertia drift from that impossible speed!" during their first battle.',
    steps: [
      {
        stepNumber: 1,
        titleMn: '1. Замын голд өндөр хурдаар байрлах',
        titleEn: '1. High-Speed Mid-Lane Positioning',
        descMn: '120 км/ц хурдтай дөхөж, машины жингийн төвийг тогтвортой байлгана.',
        descEn: 'Charge down Mount Akina at 120 km/h in 3rd gear, positioning the car center-track.',
        throttle: 95,
        brake: 0,
        clutch: 0,
        steeringDeg: 0,
        speedKmh: 120,
        rpm: 8100,
        gear: 3,
        gForceLat: 0.05,
        carPos: { x: 18, y: 88, angleDeg: 0 },
        soundAction: 'rev'
      },
      {
        stepNumber: 2,
        titleMn: '2. Гадагш шидэлт хийх (The Feint Flick)',
        titleEn: '2. The Feint (Flick Outward)',
        descMn: 'Эргэлтийн өмнөхөн жолоогоо гадна талын хадан хана руу 20° огцом эргүүлж жинг гадагш нь ачаална.',
        descEn: 'Snap steering 20° away from the turn for a fraction of a second, loading the chassis like a compressed spring.',
        throttle: 60,
        brake: 5,
        clutch: 0,
        steeringDeg: 22,
        speedKmh: 110,
        rpm: 7600,
        gear: 3,
        gForceLat: 0.95,
        carPos: { x: 22, y: 62, angleDeg: 18 },
        soundAction: 'drift'
      },
      {
        stepNumber: 3,
        titleMn: '3. Дотогш шидэх & Пүршний урвуу ойлт',
        titleEn: '3. Aggressive Snap Inward & Lift-Off',
        descMn: 'Хаазаа огцом суллаж, жолоогоо дотогш огцом дарахад хойд хэсэг дүүжин мэт шидэгдэн дрифтэд орно.',
        descEn: 'Lift off the gas and yank the wheel hard toward the corner apex. The rebound slings the tail around.',
        throttle: 25,
        brake: 0,
        clutch: 0,
        steeringDeg: -45,
        speedKmh: 95,
        rpm: 7900,
        gear: 2,
        gForceLat: 1.45,
        carPos: { x: 48, y: 32, angleDeg: -48 },
        soundAction: 'drift'
      },
      {
        stepNumber: 4,
        titleMn: '4. Төгс тэнцвэрээр эргэлтээс сугарах',
        titleEn: '4. Balanced Countersteer Pull-Out',
        descMn: 'Жолоог эсрэг зүгт тогтоон, хаазаа 100% гишгэж инерцээ урагшлах хурдатгал болгон хувиргана.',
        descEn: 'Hold countersteer with micro-corrections and pin the throttle as the car shoots out like a rocket.',
        throttle: 100,
        brake: 0,
        clutch: 0,
        steeringDeg: 28,
        speedKmh: 102,
        rpm: 10200,
        gear: 2,
        gForceLat: 1.1,
        carPos: { x: 82, y: 58, angleDeg: -105 },
        soundAction: 'rev'
      }
    ]
  },
  {
    id: 'gutter-run',
    nameMn: 'Гуу Жалга Ашиглах (Mizootoshi / The Gutter Run)',
    nameEn: 'The Gutter Run (Mizootoshi)',
    japanese: '溝落とし',
    difficulty: 'God Foot / Fujiwara',
    badge: 'CENTRIFUGAL LOCK',
    summaryMn: 'Эргэлтийн дотор талын ус зайлуулах жалганд урд, хойд дотор дугуйгаа унагаж, төвөөс зугтах хүчийг хааж уралдах Такумигийн нууц зэвсэг.',
    summaryEn: 'Hooking the inside front and rear tires into the roadside drainage ditch, locking against centrifugal force to corner at impossible speeds.',
    physicsPrincipleMn: 'Эгц огцом эргэлтэд өндөр хурдтай ороход төвөөс зугтах хүч (Centrifugal Force) машиныг замын гадна талын хадан хана руу түлхдэг. Дотор дугуй жалганд унах үед жалгын хана дугуйн ирмэгийг тулж (Mechanical Lip Lock), физикийн хязгаарыг даван халихаас сэргийлдэг.',
    physicsPrincipleEn: 'Normally, lateral G-forces exceed tire grip, causing catastrophic understeer. By sinking inside tires into the drainage gutter, the ditch lip acts as a physical rail that counteracts lateral centrifugal forces entirely.',
    fujiwaraSecretMn: 'Такуми энэ техникийг хөгжүүлж байж Кэйсүкэгийн 350 морины хүчтэй RX-7 FD3S-ийг 5 үсний хавчаар (5 Hairpin) эргэлт дээр гүйцэж түрүүлдэг.',
    fujiwaraSecretEn: 'Takumi used this exact move on the 5 consecutive hairpins to overtake Keisuke Takahashi\'s FD3S, leaving spectator crowds speechless.',
    steps: [
      {
        stepNumber: 1,
        titleMn: '1. Хэт дотуур замаар хурдтай орох',
        titleEn: '1. Tight Inside Trajectory',
        descMn: 'Бусад жолооч нар гаднаас ордог бол Такуми эхнээсээ замын дотор ирмэгийг чиглэн 95 км/ц-ээр дайрна.',
        descEn: 'Unlike standard racers who enter wide, dive straight into the apex hugging the inner edge.',
        throttle: 70,
        brake: 30,
        clutch: 0,
        steeringDeg: -15,
        speedKmh: 95,
        rpm: 8300,
        gear: 2,
        gForceLat: 0.9,
        carPos: { x: 24, y: 78, angleDeg: -10 },
        soundAction: 'brake'
      },
      {
        stepNumber: 2,
        titleMn: '2. Урд дотор дугуйг жалганд унагах (Front Wheel Drop)',
        titleEn: '2. Dropping Front Inside Wheel into Gutter',
        descMn: 'Жалганы эхлэл дээр урд баруун дугуйгаа бетонон ховилд оновчтой унагаж, залуурдлагыг түгжинэ.',
        descEn: 'Precisely place the inside front tire over the concrete lip into the drainage gutter with zero hesitation.',
        throttle: 65,
        brake: 0,
        clutch: 0,
        steeringDeg: -35,
        speedKmh: 86,
        rpm: 8900,
        gear: 2,
        gForceLat: 1.6,
        carPos: { x: 38, y: 45, angleDeg: -38 },
        soundAction: 'gutter'
      },
      {
        stepNumber: 3,
        titleMn: '3. Хойд дугуй дагах & Жалганд бүрэн түгжигдэх',
        titleEn: '3. Rear Wheel Locks into Gutter Rail',
        descMn: 'Хойд дугуй даган унаж, машин төмөр зам дээр яваа мэт төвөөс зугтах хүчгүйгээр 88 км/ц-ээр эргэнэ.',
        descEn: 'The rear tire falls into the channel. Centrifugal force is completely negated as the gutter walls pull the car through.',
        throttle: 90,
        brake: 0,
        clutch: 0,
        steeringDeg: -10,
        speedKmh: 88,
        rpm: 9400,
        gear: 2,
        gForceLat: 1.85,
        carPos: { x: 50, y: 25, angleDeg: -80 },
        soundAction: 'gutter'
      },
      {
        stepNumber: 4,
        titleMn: '4. Жалганаас сугарч өрсөлдөгчийг ардаа орхих',
        titleEn: '4. Gutter Exit & Unmatched Corner Speed',
        descMn: 'Жалга дуусах цэгт хаазаа 100% дарж, өрсөлдөгчийнхөө дотуур нь асар их хурдаар сугаран гарна.',
        descEn: 'As the gutter ends, slingshot onto the flat asphalt with full throttle, carrying insane exit speed.',
        throttle: 100,
        brake: 0,
        clutch: 0,
        steeringDeg: 0,
        speedKmh: 105,
        rpm: 10500,
        gear: 3,
        gForceLat: 0.6,
        carPos: { x: 84, y: 55, angleDeg: -105 },
        soundAction: 'rev'
      }
    ]
  },
  {
    id: 'power-over',
    nameMn: 'Clutch Kick & Power Over (Авцуулах холбооны цохилт)',
    nameEn: 'Clutch Kick & Power Over Drift',
    japanese: 'クラッチキック',
    difficulty: 'Intermediate',
    badge: 'TORQUE SPIKE',
    summaryMn: 'Эргэлтийн голд клатч дээр огцом товшиж (өшиглөж) хөдөлгүүрийн 10,000 RPM-ийг хойд дугуй руу гэнэт цохиж шарвуулах арга.',
    summaryEn: 'Depressing and violently dumping the clutch mid-corner to spike engine RPM and abruptly break rear tire adhesion.',
    physicsPrincipleMn: 'Энгийн үед 1.6L моторын чадал хойд дугуйг дрифтэд оруулахад дутаж болзошгүй. Клатч гишгэх үед хөдөлгүүрийн эргэлт агшин зуур чөлөөтэй үсэрч, буцааж суллах мөчид үүсэх хүчтэй мушгих момент (Shock Torque) дугуйн барьцалдлыг тасална.',
    physicsPrincipleEn: 'In naturally aspirated lower-displacement engines, kicking the clutch allows RPM to surge freely without load, shocking the drivetrain with instant peak torque upon release to initiate oversteer.',
    fujiwaraSecretMn: 'Project D-ийн уралдааны TRD 4A-GE групп А мотор суулгасны дараа Такуми 11,000 эргэлтийн чадлыг энэ аргаар дуртай цагтаа гаргадаг болсон.',
    fujiwaraSecretEn: 'With the TRD 11,000 RPM race engine installed, clutch kicks unlock violent torque snaps whenever Takumi demands instant angle.',
    steps: [
      {
        stepNumber: 1,
        titleMn: '1. Эргэлтэд 2-р араагаар дайрах',
        titleEn: '1. Steady Corner Entry',
        descMn: '2-р араатай 75 км/ц хурдтайгаар орой цэгийг чиглэн жолоогоо эргүүлнэ.',
        descEn: 'Enter corner in 2nd gear at 75 km/h, aiming steering toward the apex at 6,500 RPM.',
        throttle: 70,
        brake: 0,
        clutch: 0,
        steeringDeg: -25,
        speedKmh: 75,
        rpm: 6500,
        gear: 2,
        gForceLat: 0.7,
        carPos: { x: 28, y: 72, angleDeg: -15 },
        soundAction: 'rev'
      },
      {
        stepNumber: 2,
        titleMn: '2. Клатч дээр огцом өшиглөх (The Clutch Kick)',
        titleEn: '2. The Violent Clutch Kick',
        descMn: 'Хаазаа 100% дарсан хэвээрээ зүүн хөлөөрөө авцуулах холбоог агшин зуур өшиглөөд суллана. Эргэлт 9,500 RPM руу үсэрнэ.',
        descEn: 'Keep the throttle pinned 100% while instantly kicking and dumping the clutch pedal. RPM flares instantly to redline.',
        throttle: 100,
        brake: 0,
        clutch: 100,
        steeringDeg: -35,
        speedKmh: 72,
        rpm: 9500,
        gear: 2,
        gForceLat: 1.1,
        carPos: { x: 42, y: 40, angleDeg: -35 },
        soundAction: 'shift'
      },
      {
        stepNumber: 3,
        titleMn: '3. Хойд дугуй задарч утаарах',
        titleEn: '3. Instant Wheelspin & Smoke Breakaway',
        descMn: 'Клатч залгагдах агшинд хойд дугуй зам дээр шууд эргэлдэж утаа хаялан, машин хүчтэй хажуугаараа явна.',
        descEn: 'The torque shock breaks rear tires instantly. Wheelspin takes over; countersteer rapidly to catch the angle.',
        throttle: 85,
        brake: 0,
        clutch: 0,
        steeringDeg: 38,
        speedKmh: 70,
        rpm: 9800,
        gear: 2,
        gForceLat: 1.4,
        carPos: { x: 55, y: 26, angleDeg: -70 },
        soundAction: 'drift'
      },
      {
        stepNumber: 4,
        titleMn: '4. Хаазаар чиглүүлэн урагш хурдлах',
        titleEn: '4. Throttle Steering & Exit',
        descMn: 'Хаазны тохируулгаар шарвалтын өнцгийг барьж, шулуун шугам руу хөдөлгүүрийн хүчээр түлхэн гарна.',
        descEn: 'Modulate throttle to control drift angle, unwinding the steering as the car grips up for straight-line acceleration.',
        throttle: 95,
        brake: 0,
        clutch: 0,
        steeringDeg: 10,
        speedKmh: 89,
        rpm: 10400,
        gear: 2,
        gForceLat: 0.8,
        carPos: { x: 82, y: 58, angleDeg: -105 },
        soundAction: 'rev'
      }
    ]
  },
  {
    id: 'blind-attack',
    nameMn: 'Гэрэл Унтраах Дайралт (Blind Attack)',
    nameEn: 'Blind Attack (Stealth Touge Technique)',
    japanese: 'ブラインド・アタック',
    difficulty: 'God Foot / Fujiwara',
    badge: 'STEALTH PASS',
    summaryMn: 'Шөнийн уулын замд их гэрлээ унтрааж өрсөлдөгчийн толин дахь хараанаас үл үзэгдэгч болон гэнэтийн дотуур дайралт хийх техник.',
    summaryEn: 'Extinguishing pop-up headlights in total darkness, vanishing from the opponent\'s mirrors before launching a stealth dive-bomb pass.',
    physicsPrincipleMn: 'Энэ нь зөвхөн сэтгэл зүйн дайралт төдийгүй замын эргэлт, хурд, зайг 100% нүдээ аниад ч мэддэг зөн совингийн дээд хэлбэр. Гэрэл унтарснаар AE86-ийн аэродинамик сайжирч (Pop-up гэрэл агаар зүсэх саадыг багасгадаг) өрсөлдөгч толиндоо хаана байгааг харах боломжгүй болно.',
    physicsPrincipleEn: 'Beyond physiological psychological warfare, closing pop-up headlights improves aerodynamic drag coefficient, while total pitch-black touge memorization allows hitting apexes purely by engine frequency and G-force muscle memory.',
    fujiwaraSecretMn: 'Такуми энэ аргыг Томонори Тачи (EK9 Civic), мөн Кагаватай хийсэн шийдвэрлэх тулаан дээр хэрэглэн ялалт байгуулсан.',
    fujiwaraSecretEn: 'Used against Tomo\'s Spoon EK9 Civic and later against Shinji Inui, striking fear into rivals as the Trueno vanishes and reappears on their inside door.',
    steps: [
      {
        stepNumber: 1,
        titleMn: '1. Өрсөлдөгчийн ард наалдан дагах',
        titleEn: '1. Bumper-to-Bumper Pursuit',
        descMn: 'Өрсөлдөгчийн хойд бампераас 30 см зайд 120 км/ц хурдтай наалдаж явна.',
        descEn: 'Follow 30 centimeters behind the opponent\'s bumper at 120 km/h, syncing rhythm.',
        throttle: 90,
        brake: 0,
        clutch: 0,
        steeringDeg: 0,
        speedKmh: 120,
        rpm: 8500,
        gear: 4,
        gForceLat: 0.1,
        carPos: { x: 18, y: 88, angleDeg: 0 },
        soundAction: 'rev'
      },
      {
        stepNumber: 2,
        titleMn: '2. Гэрлээ унтраах (Headlights OFF)',
        titleEn: '2. Extinguish Headlights & Vanish',
        descMn: 'Pop-up гэрлээ аниулан тас харанхуйд орно. Өрсөлдөгч толиндоо "Хаашаа алга болов?" гэж цочирдон самуурна.',
        descEn: 'Retract pop-up headlights into complete touge blackness. The lead driver checks their rearview mirror in panic.',
        throttle: 100,
        brake: 0,
        clutch: 0,
        steeringDeg: -10,
        speedKmh: 125,
        rpm: 8800,
        gear: 4,
        gForceLat: 0.4,
        carPos: { x: 30, y: 55, angleDeg: -12 },
        soundAction: 'rev'
      },
      {
        stepNumber: 3,
        titleMn: '3. Совингоороо дотуур шугам руу дайрах',
        titleEn: '3. Blind Apex Dive-Bomb',
        descMn: 'Зөвхөн замын хэмнэл, Бунтагийн заасан биеийн мэдрэмжээрээ өрсөлдөгчийн сохор бүс (Blind Spot)-ийн дотуур нь орно.',
        descEn: 'Reading corner apex purely by tire roar and inertia memory, dive-bombing inside the rival\'s line without headlights.',
        throttle: 70,
        brake: 25,
        clutch: 0,
        steeringDeg: -40,
        speedKmh: 95,
        rpm: 8200,
        gear: 3,
        gForceLat: 1.5,
        carPos: { x: 48, y: 26, angleDeg: -60 },
        soundAction: 'drift'
      },
      {
        stepNumber: 4,
        titleMn: '4. Түрүүлж гэрлээ асаах (Headlights ON & Pass)',
        titleEn: '4. Snap Headlights Open & Claim Victory',
        descMn: 'Эргэлтээс гарч урд нь оронгуутаа гэрлээ асааж, өрсөлдөгчийн өмнө Panda Trueno-ийн сүр хүчийг үзүүлнэ.',
        descEn: 'Pop headlights back open as the AE86 takes the lead, the twin yellow fog lamps blinding the stunned rival.',
        throttle: 100,
        brake: 0,
        clutch: 0,
        steeringDeg: 0,
        speedKmh: 112,
        rpm: 9700,
        gear: 3,
        gForceLat: 0.3,
        carPos: { x: 84, y: 55, angleDeg: -105 },
        soundAction: 'rev'
      }
    ]
  }
];
