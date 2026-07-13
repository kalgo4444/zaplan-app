import type { ImageSourcePropType } from 'react-native';

/**
 * Mashqlar katalogi.
 *
 * RASMLAR: har bir mashq o'zining optimallashtirilgan WebP assetiga ulangan.
 * Yangi mashq qo'shilsa, rasmni `assets/images/exercises/` papkasiga tashlang
 * va statik `require(...)` bilan ulang.
 */

export type MuscleGroupId = 'yelka' | 'qol' | 'oyoq' | 'cardio';

export interface MuscleGroup {
  id: MuscleGroupId;
  title: string;
  subtitle: string;
}

export interface Exercise {
  id: string;
  name: string;
  group: MuscleGroupId;
  purpose: string;
  muscles: string[];
  steps: string[];
  tips: string[];
  mistakes: string[];
  image: ImageSourcePropType | null;
}

// plam.md bo'yicha katalog to'rt guruhga bo'linadi: Yelka, Qo'l, Oyoq, Cardio.
export const muscleGroups: MuscleGroup[] = [
  { id: 'yelka', title: 'Yelka', subtitle: 'Deltasimon mushaklar' },
  { id: 'qol', title: "Qo'l", subtitle: "Biceps, triceps, ko'krak va orqa" },
  { id: 'oyoq', title: 'Oyoq', subtitle: 'Son, boldir va dumba' },
  { id: 'cardio', title: 'Cardio', subtitle: 'Chidamlilik va core barqarorligi' },
];

export const exercises: Exercise[] = [
  // ===== YELKA =====
  {
    id: 'shoulder-press',
    name: 'Shoulder press',
    group: 'yelka',
    purpose: "Yelka mushaklarining old va o'rta qismini kuchaytirish.",
    muscles: ['Old delta', "O'rta delta", 'Triceps'],
    steps: [
      "O'rindiqqa suyanib o'tiring, gantellarni yelka balandligida ushlang.",
      'Kaftlar oldinga qaragan holda gantellarni yuqoriga itaring.',
      "Qo'llar deyarli to'liq yozilganda bir soniya to'xtang.",
      'Nazorat bilan boshlang\'ich holatga qayting.',
    ],
    tips: [
      'Belingizni o\'rindiqqa yopishtirib turing.',
      "Harakatni sekin va tekis bajaring, siltamang.",
      "Nafas: yuqoriga itarishda chiqaring, tushirishda oling.",
    ],
    mistakes: [
      'Belni ortiqcha egib yuborish.',
      "Gantellarni bir-biriga urishtirish.",
      "Juda og'ir vazn bilan yarim amplitudada ishlash.",
    ],
    image: require('../../assets/images/exercises/shoulder-press.webp'),
  },
  {
    id: 'arnold-press',
    name: 'Arnold press',
    group: 'yelka',
    purpose: "Yelkaning uchala boshini ham bitta harakatda ishlatish.",
    muscles: ['Old delta', "O'rta delta", 'Orqa delta'],
    steps: [
      "Gantellarni ko'krak oldida, kaftlar o'zingizga qaragan holda ushlang.",
      "Yuqoriga itarish davomida bilaklarni tashqariga buring.",
      "Yuqori nuqtada kaftlar oldinga qaragan bo'lishi kerak.",
      "Teskari tartibda burib, boshlang'ich holatga qayting.",
    ],
    tips: [
      'Burilishni butun harakat davomida tekis taqsimlang.',
      "Yengil vazndan boshlang — bu texnik jihatdan murakkab mashq.",
    ],
    mistakes: [
      'Bilakni faqat oxirida keskin burish.',
      'Tirsaklarni pastda juda orqaga olib ketish.',
    ],
    image: require('../../assets/images/exercises/arnold-press.webp'),
  },
  {
    id: 'lateral-raise',
    name: 'Lateral raise',
    group: 'yelka',
    purpose: "Yelkaning o'rta qismini alohida ishlatib, yelka kengligini shakllantirish.",
    muscles: ["O'rta delta"],
    steps: [
      'Gantellarni yon tomonda, tirsaklar biroz bukilgan holda ushlang.',
      "Qo'llarni yon tomonga yelka balandligigacha ko'taring.",
      "Yuqori nuqtada qisqa to'xtang.",
      'Sekin pastga tushiring.',
    ],
    tips: [
      "Yengil vazn tanlang — bu izolyatsiya mashqi.",
      "Kaft pastga qaragan, xuddi suv quyayotgandek harakat qiling.",
    ],
    mistakes: [
      'Tanani tebratib vaznni siltab ko\'tarish.',
      "Qo'llarni yelkadan ancha yuqoriga chiqarish.",
    ],
    image: require('../../assets/images/exercises/lateral-raise.webp'),
  },
  {
    id: 'rear-delt-fly',
    name: 'Rear delt fly',
    group: 'yelka',
    purpose: 'Yelkaning orqa qismini kuchaytirish va qaddi-qomatni yaxshilash.',
    muscles: ['Orqa delta', 'Romb mushaklar'],
    steps: [
      'Tanani oldinga engashtirib, gantellarni pastda ushlang.',
      "Qo'llarni yon tomonga, kuraklarni bir-biriga yaqinlashtirib oching.",
      "Yuqori nuqtada bir soniya ushlab turing.",
      'Nazorat bilan qaytaring.',
    ],
    tips: [
      'Belni tekis tuting, harakat faqat yelkadan chiqsin.',
      'Kichik vazn bilan katta amplituda ustida ishlang.',
    ],
    mistakes: [
      'Belni bukib yuborish.',
      'Harakatni trapetsiya bilan bajarish.',
    ],
    image: require('../../assets/images/exercises/rear-delt-fly.webp'),
  },
  {
    id: 'face-pull',
    name: 'Face pull',
    group: 'yelka',
    purpose: "Orqa delta va yuqori orqani kuchaytirish, yelka sog'lig'ini saqlash.",
    muscles: ['Orqa delta', 'Trapetsiya', 'Rotator manjeti'],
    steps: [
      'Trosli tortish dastagini yuz balandligiga o\'rnating.',
      "Arqonni ikki qo'llab ushlab, bir qadam orqaga chekining.",
      "Arqonni yuzingiz tomon torting, tirsaklar yon-yuqoriga ochilsin.",
      "Kuraklarni qisib, sekin boshlang'ich holatga qayting.",
    ],
    tips: [
      "Tortish oxirida bosh barmoqlar orqaga qaragan bo'lsin.",
      'Yengil vazn — bu mushak emas, texnika mashqi.',
    ],
    mistakes: [
      "Og'ir vazn bilan tanani orqaga tashlash.",
      'Tirsaklarni pastga tushirib, orqa mashqiga aylantirish.',
    ],
    image: require('../../assets/images/exercises/face-pull.webp'),
  },

  // ===== QO'L =====
  {
    id: 'triceps-pushdown',
    name: 'Triceps pushdown',
    group: 'qol',
    purpose: "Qo'lning orqa qismi (triceps)ni izolyatsiyada kuchaytirish.",
    muscles: ['Triceps'],
    steps: [
      'Trosli dastakni yuqoriga o\'rnatib, uni yelka kengligida ushlang.',
      'Tirsaklarni tanaga yopishtirib turing.',
      "Dastakni pastga, qo'llar to'liq yozilguncha itaring.",
      'Sekin yuqoriga qaytaring.',
    ],
    tips: [
      'Faqat bilak harakatlanadi — tirsak joyida qoladi.',
      "Pastki nuqtada tricepsni bir soniya qisib turing.",
    ],
    mistakes: [
      'Tirsaklarni oldinga chiqarib, yelkani ishlatish.',
      'Tananing og\'irligi bilan bosish.',
    ],
    image: require('../../assets/images/exercises/triceps-pushdown.webp'),
  },
  {
    id: 'dips',
    name: 'Parallel bar dips',
    group: 'qol',
    purpose: "Triceps va ko'krakning pastki qismini o'z tana vazni bilan kuchaytirish.",
    muscles: ['Triceps', "Ko'krak", 'Old delta'],
    steps: [
      "Parallel turniklarga chiqib, qo'llarni to'liq yozing.",
      'Tirsaklarni bukib, tanani sekin pastga tushiring.',
      "Yelka tirsak balandligiga yetganda to'xtang.",
      "Kuch bilan yuqoriga qaytib chiqing.",
    ],
    tips: [
      "Qiynalsangiz, gravitron (yordamchi trenajyor)dan foydalaning.",
      'Tanani biroz oldinga engashtirsangiz ko\'krak ko\'proq ishlaydi.',
    ],
    mistakes: [
      'Juda chuqur tushib, yelka bo\'g\'imini zo\'riqtirish.',
      'Yarim amplitudada tez-tez bajarish.',
    ],
    image: require('../../assets/images/exercises/dips.webp'),
  },
  {
    id: 'dumbbell-curl',
    name: 'Dumbbell curl',
    group: 'qol',
    purpose: 'Bicepsni kuchaytirish va hajmini oshirish.',
    muscles: ['Biceps'],
    steps: [
      'Gantellarni yon tomonda, kaftlar oldinga qaragan holda ushlang.',
      'Tirsakni joyida ushlagan holda gantelni yelka tomon buking.',
      "Yuqori nuqtada bicepsni qisib turing.",
      'Sekin pastga tushiring.',
    ],
    tips: [
      "Har bir takrorda qo'lni pastda to'liq yozing.",
      "Ikkala qo'lni navbatma-navbat yoki birga bajarish mumkin.",
    ],
    mistakes: [
      'Tanani orqaga tashlab, bel bilan siltash.',
      'Tirsakni oldinga chiqarib yelkani qo\'shish.',
    ],
    image: require('../../assets/images/exercises/dumbbell-curl.webp'),
  },
  {
    id: 'hammer-curl',
    name: 'Hammer curl',
    group: 'qol',
    purpose: "Biceps va bilak mushaklarini birgalikda kuchaytirish.",
    muscles: ['Biceps', 'Brachialis', 'Bilak'],
    steps: [
      "Gantellarni bolg'a tutgandek, kaftlar bir-biriga qaragan holda ushlang.",
      'Tirsakni qimirlatmasdan gantelni yuqoriga buking.',
      "Yuqorida qisqa to'xtang.",
      'Nazorat bilan tushiring.',
    ],
    tips: [
      'Bilak butun harakat davomida neytral holatda qoladi.',
      'Oddiy curl bilan almashlab bajarish samarali.',
    ],
    mistakes: [
      'Vaznni siltab ko\'tarish.',
      'Tirsaklarni tanadan uzoqlashtirish.',
    ],
    image: require('../../assets/images/exercises/hammer-curl.webp'),
  },
  {
    id: 'dead-hang',
    name: 'Dead hang',
    group: 'qol',
    purpose: "Panja kuchini oshirish, yelka va umurtqani cho'zish.",
    muscles: ['Panja', 'Bilak', 'Yelka kamari'],
    steps: [
      "Turnikni yelka kengligida ushlang.",
      "Oyoqlarni yerdan uzib, erkin osilib turing.",
      'Yelkalarni bo\'shashtirmasdan, faol holatda ushlang.',
      "Belgilangan vaqt davomida osilib turing.",
    ],
    tips: [
      '20–30 soniyadan boshlab, sekin oshirib boring.',
      'Nafasni tekis olishda davom eting.',
    ],
    mistakes: [
      "Yelkalarni quloqqacha ko'tarib, passiv osilish.",
      'Tanani u yoq-bu yoqqa tebratish.',
    ],
    image: require('../../assets/images/exercises/dead-hang.webp'),
  },

  // ===== QO'L (davomi): ko'krak va orqa mashqlari =====
  {
    id: 'chest-press',
    name: 'Chest press',
    group: 'qol',
    purpose: "Ko'krak mushaklarini xavfsiz trenajyorda kuchaytirish.",
    muscles: ["Ko'krak", 'Old delta', 'Triceps'],
    steps: [
      "O'rindiqni dastaklar ko'krak balandligida bo'ladigan qilib sozlang.",
      'Dastaklarni ushlab, oldinga itaring.',
      "Qo'llar deyarli to'liq yozilganda to'xtang.",
      "Sekin, nazorat bilan orqaga qaytaring.",
    ],
    tips: [
      'Kuraklarni orqaga qisib, ko\'krakni ochiq tuting.',
      'Itarishda nafas chiqaring.',
    ],
    mistakes: [
      'Yelkalarni oldinga chiqarib itarish.',
      "Vaznni tashlab yuborib, zarba bilan qaytarish.",
    ],
    image: require('../../assets/images/exercises/chest-press.webp'),
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell bench press',
    group: 'qol',
    purpose: "Ko'krakni erkin vazn bilan kuchaytirish va barqarorlikni oshirish.",
    muscles: ["Ko'krak", 'Old delta', 'Triceps'],
    steps: [
      'Skameykaga yotib, gantellarni ko\'krak ustida ushlang.',
      "Gantellarni ko'krak chetigacha sekin tushiring.",
      'Kuch bilan yuqoriga, boshlang\'ich nuqtaga itaring.',
      "Yuqorida gantellarni urishtirmasdan yaqinlashtiring.",
    ],
    tips: [
      "Oyoqlarni yerga mahkam qo'ying.",
      'Bilaklar doim gantel ostida, tik holatda bo\'lsin.',
    ],
    mistakes: [
      'Gantellarni juda pastga tushirib, yelkani zo\'riqtirish.',
      'Belni skameykadan ko\'tarib yuborish.',
    ],
    image: require('../../assets/images/exercises/dumbbell-bench-press.webp'),
  },
  {
    id: 'lat-pulldown',
    name: 'Lat pulldown',
    group: 'qol',
    purpose: "Orqaning keng mushaklarini kuchaytirish, V-shakl hosil qilish.",
    muscles: ['Keng orqa (lat)', 'Biceps', 'Romb mushaklar'],
    steps: [
      "Dastakni yelkadan kengroq ushlab, o'rindiqqa o'tiring.",
      "Dastakni ko'krakning yuqori qismigacha torting.",
      'Pastki nuqtada kuraklarni qisib turing.',
      "Sekin, to'liq yozilguncha qaytaring.",
    ],
    tips: [
      'Tortishni tirsaklar bilan boshlang, qo\'l emas.',
      'Tanani biroz orqaga engashtirish mumkin, lekin tebranmang.',
    ],
    mistakes: [
      "Dastakni bo'yin orqasiga tortish.",
      'Butun tana bilan orqaga yotib olish.',
    ],
    image: require('../../assets/images/exercises/lat-pulldown.webp'),
  },
  {
    id: 'pull-up',
    name: 'Pull-up',
    group: 'qol',
    purpose: "O'z tana vazni bilan orqa va qo'lni kompleks kuchaytirish.",
    muscles: ['Keng orqa (lat)', 'Biceps', 'Core'],
    steps: [
      'Turnikni yelkadan kengroq, kaftlar oldinga qaragan holda ushlang.',
      "Kuraklarni pastga qisib, tortilishni boshlang.",
      'Iyak turnik balandligiga yetguncha tortiling.',
      "Sekin, to'liq osilgan holatgacha tushing.",
    ],
    tips: [
      "Qiynalsangiz rezina yordamida yoki gravitronda bajaring.",
      'Har takrorda pastda to\'liq yoziling.',
    ],
    mistakes: [
      'Oyoq siltashi bilan chiqish (kipping).',
      'Yarim amplitudada tez-tez tortilish.',
    ],
    image: require('../../assets/images/exercises/pull-up.webp'),
  },
  {
    id: 'chin-up',
    name: 'Chin-up',
    group: 'qol',
    purpose: 'Orqa bilan birga bicepsga kuchli yuk beruvchi tortilish varianti.',
    muscles: ['Biceps', 'Keng orqa (lat)', 'Core'],
    steps: [
      'Turnikni yelka kengligida, kaftlar o\'zingizga qaragan holda ushlang.',
      "Ko'krakni turnik tomon yo'naltirib tortiling.",
      "Iyak turnikdan oshganda bir soniya to'xtang.",
      'Nazorat bilan pastga tushing.',
    ],
    tips: [
      "Pull-up'dan osonroq — tortilishni shu variantdan boshlash mumkin.",
      'Core mushaklarini taranglab, tebranishni oldini oling.',
    ],
    mistakes: [
      'Bo\'ynini cho\'zib "iyak bilan aldash".',
      'Pastga erkin tashlab yuborish.',
    ],
    image: require('../../assets/images/exercises/chin-up.webp'),
  },

  // ===== OYOQ =====
  {
    id: 'leg-press',
    name: 'Leg press',
    group: 'oyoq',
    purpose: 'Oyoqning asosiy mushaklarini xavfsiz trenajyorda kuchaytirish.',
    muscles: ['Kvadriceps', 'Dumba', 'Orqa son'],
    steps: [
      "Trenajyorga o'tirib, oyoqlarni platformaga yelka kengligida qo'ying.",
      'Platformani ushlagichdan bo\'shatib, tizzani sekin buking.',
      "Tizza 90 daraja bo'lguncha tushiring.",
      "Tovon bilan itarib, boshlang'ich holatga qayting.",
    ],
    tips: [
      "Tizzalar oyoq uchi yo'nalishida harakatlansin.",
      "Yuqorida tizzani qulflab qotirmang.",
    ],
    mistakes: [
      'Belni o\'rindiqdan ko\'tarib yuborish.',
      "Juda og'ir vazn bilan qisqa amplituda.",
    ],
    image: require('../../assets/images/exercises/leg-press.webp'),
  },
  {
    id: 'goblet-squat',
    name: 'Goblet squat',
    group: 'oyoq',
    purpose: "To'g'ri squat texnikasini o'rgatish va oyoqni har tomonlama ishlatish.",
    muscles: ['Kvadriceps', 'Dumba', 'Core'],
    steps: [
      "Gantelni ikki qo'llab ko'krak oldida tik ushlang.",
      'Oyoqlar yelka kengligida, uchlari biroz tashqariga.',
      "Sonlar yerga parallel bo'lguncha cho'king.",
      'Tovon bilan itarib turing.',
    ],
    tips: [
      "Ko'krak doim oldinga qaragan, bel tekis.",
      'Tizza oyoq uchidan chiqsa ham, tovon yerdan uzilmasin.',
    ],
    mistakes: [
      'Tovonni yerdan uzish.',
      'Tizzalarni ichkariga yiqitish.',
    ],
    image: require('../../assets/images/exercises/goblet-squat.webp'),
  },
  {
    id: 'leg-curl',
    name: 'Leg curl',
    group: 'oyoq',
    purpose: 'Orqa son mushaklarini izolyatsiyada kuchaytirish.',
    muscles: ['Orqa son (hamstring)'],
    steps: [
      "Trenajyorga yotib, boldirni valik ostiga joylashtiring.",
      'Tovonni dumba tomon torting.',
      "Yuqori nuqtada bir soniya ushlab turing.",
      'Sekin yozib qaytaring.',
    ],
    tips: [
      'Sonlar o\'rindiqdan uzilmasin.',
      "Salbiy (qaytish) fazani ayniqsa sekin bajaring.",
    ],
    mistakes: [
      'Belni egib, dumbani ko\'tarish.',
      'Vaznni tashlab yuborish.',
    ],
    image: require('../../assets/images/exercises/leg-curl.webp'),
  },
  {
    id: 'leg-extension',
    name: 'Leg extension',
    group: 'oyoq',
    purpose: 'Son old mushaklarini (kvadriceps) izolyatsiyada ishlatish.',
    muscles: ['Kvadriceps'],
    steps: [
      "O'rindiqqa o'tirib, boldirni valik orqasiga joylashtiring.",
      "Oyoqlarni to'liq yozilguncha ko'taring.",
      "Yuqorida kvadricepsni qisib turing.",
      'Sekin pastga tushiring.',
    ],
    tips: [
      "O'rindiq suyanchig'iga mahkam suyaning.",
      "O'rta vazn, toza texnika — tizza uchun xavfsiz yo'l.",
    ],
    mistakes: [
      "Siltab ko'tarib, inersiya bilan ishlash.",
      'Tizzada og\'riq bo\'lsa ham davom etish.',
    ],
    image: require('../../assets/images/exercises/leg-extension.webp'),
  },

  // ===== CARDIO (boshlanishi): core barqarorlik mashqlari =====
  {
    id: 'plank',
    name: 'Plank',
    group: 'cardio',
    purpose: "Qorin, bel va butun tana barqarorligini mustahkamlash.",
    muscles: ['Qorin', 'Bel', 'Yelka kamari'],
    steps: [
      'Tirsak va oyoq uchlariga tayanib, tanani tekis chiziqda ushlang.',
      "Qorin va dumbani tarang qiling.",
      'Nafasni tekis olib, holatni saqlang.',
      "Belgilangan vaqtgacha ushlab turing.",
    ],
    tips: [
      '30 soniyadan boshlab sekin oshirib boring.',
      "Boshdan tovongacha bitta to'g'ri chiziq bo'lsin.",
    ],
    mistakes: [
      "Dumbani yuqoriga ko'tarish yoki belni cho'ktirish.",
      'Nafasni ushlab qolish.',
    ],
    image: require('../../assets/images/exercises/plank.webp'),
  },
  {
    id: 'dead-bug',
    name: 'Dead bug',
    group: 'cardio',
    purpose: "Chuqur qorin mushaklarini xavfsiz, belga yuk bermasdan ishlatish.",
    muscles: ['Chuqur qorin', 'Bel barqarorligi'],
    steps: [
      "Chalqancha yotib, qo'llarni tepaga, tizzalarni 90 daraja ko'taring.",
      "Qarama-qarshi qo'l va oyoqni sekin yerga yaqinlashtiring.",
      "Belni yerdan uzmagan holda boshlang'ich holatga qayting.",
      'Ikkinchi tomon bilan takrorlang.',
    ],
    tips: [
      'Bel doim yerga yopishib tursin.',
      'Harakat qancha sekin bo\'lsa, shuncha samarali.',
    ],
    mistakes: [
      'Belni yerdan ko\'tarib yuborish.',
      'Ikkala oyoqni birdan tushirish.',
    ],
    image: require('../../assets/images/exercises/dead-bug.webp'),
  },

  // ===== CARDIO =====
  {
    id: 'dynamic-warmup',
    name: 'Dynamic warm-up',
    group: 'cardio',
    purpose: "Tanani mashg'ulotga tayyorlash, jarohat xavfini kamaytirish.",
    muscles: ['Butun tana'],
    steps: [
      "Yengil yurish yoki joyida yugurish — 2 daqiqa.",
      "Qo'l va yelka aylanishlari — har tomonga 10 tadan.",
      'Tana burilishlari va engashishlar — 10 tadan.',
      "Vaznsiz squat va oldinga hamla — 10 tadan.",
    ],
    tips: [
      'Harakatlarni ravon, siltovsiz bajaring.',
      "Qizdirishni hech qachon o'tkazib yubormang.",
    ],
    mistakes: [
      "Sovuq mushak bilan statik cho'zilish qilish.",
      'Juda tez boshlab charchab qolish.',
    ],
    image: require('../../assets/images/exercises/dynamic-warmup.webp'),
  },
  {
    id: 'treadmill',
    name: 'Treadmill',
    group: 'cardio',
    purpose: 'Yurak-qon tomir tizimini mustahkamlash va kaloriya yoqish.',
    muscles: ['Oyoq', 'Yurak-qon tomir tizimi'],
    steps: [
      'Yo\'lakchaga chiqib, sekin tezlikdan boshlang.',
      "Qulay tezlikka yetguncha asta oshiring.",
      "Belgilangan vaqt davomida tekis sur'atda yuring yoki yuguring.",
      'Oxirida 2 daqiqa sekinlashib tugating.',
    ],
    tips: [
      "Qomatni tik tuting, oldga engashmang.",
      'Suhbat qura oladigan sur\'at — to\'g\'ri sur\'at.',
    ],
    mistakes: [
      'Dastaklardan ushlab yugurish.',
      'Birdan yuqori tezlikda boshlash.',
    ],
    image: require('../../assets/images/exercises/treadmill.webp'),
  },
  {
    id: 'jump-rope',
    name: 'Jump rope',
    group: 'cardio',
    purpose: "Tez qizish, koordinatsiya va chidamlilikni oshirish.",
    muscles: ['Boldir', 'Yelka', 'Yurak-qon tomir tizimi'],
    steps: [
      "Arqonni tana yoniga, tirsaklarni tanaga yaqin tuting.",
      'Oyoq uchida past sakrashlar bilan boshlang.',
      "Bilak harakati bilan arqonni aylantiring.",
      'Tekis ritmda belgilangan vaqt davomida sakrang.',
    ],
    tips: [
      "Baland sakrash shart emas — 2-3 sm yetarli.",
      'Adashsangiz, to\'xtamasdan qaytadan davom eting.',
    ],
    mistakes: [
      "Butun qo'l bilan aylantirish (bilak o'rniga).",
      'Tovonga qo\'nish.',
    ],
    image: require('../../assets/images/exercises/jump-rope.webp'),
  },
  {
    id: 'exercise-bike',
    name: 'Exercise bike',
    group: 'cardio',
    purpose: "Bo'g'imlarga yuk bermasdan chidamlilikni rivojlantirish.",
    muscles: ['Oyoq', 'Yurak-qon tomir tizimi'],
    steps: [
      "O'rindiq balandligini sozlang — pastki nuqtada tizza biroz bukilgan bo'lsin.",
      'Yengil qarshilikda 2 daqiqa qizib oling.',
      "O'rtacha qarshilikda tekis sur'atda aylantiring.",
      'Oxirida sekinlashib tugating.',
    ],
    tips: [
      "Qomatni tik tuting, rulga og'irlik tashlamang.",
      'Kadensni (aylanish tezligini) tekis ushlang.',
    ],
    mistakes: [
      "Juda past o'rindiqda tizzani zo'riqtirish.",
      'Faqat oyoq uchi bilan pedal bosish.',
    ],
    image: require('../../assets/images/exercises/exercise-bike.webp'),
  },
  {
    id: 'high-knees',
    name: 'High knees',
    group: 'cardio',
    purpose: "Pulsni tez ko'tarish va oyoqni qizdirish.",
    muscles: ['Son', 'Core', 'Yurak-qon tomir tizimi'],
    steps: [
      'Joyida turgan holda tizzalarni navbatma-navbat yuqoriga ko\'taring.',
      "Tizza bel balandligiga yetsin.",
      "Qo'llar yugurishdagi kabi ishlasin.",
      "Tez sur'atda belgilangan vaqt davomida bajaring.",
    ],
    tips: [
      'Oyoq uchida yumshoq qo\'ning.',
      "Qomat tik, ko'krak oldinga qaragan bo'lsin.",
    ],
    mistakes: [
      'Orqaga engashib bajarish.',
      "Tizzani past ko'tarib, shunchaki yugurish.",
    ],
    image: require('../../assets/images/exercises/high-knees.webp'),
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain climbers',
    group: 'cardio',
    purpose: "Core va cardio yukini birlashtirgan dinamik mashq.",
    muscles: ['Core', 'Yelka', 'Yurak-qon tomir tizimi'],
    steps: [
      "Plank holatida qo'llarga tayanib turing.",
      "Bir tizzani ko'krak tomon torting.",
      "Sakrab oyoqlarni almashtiring.",
      "Tez sur'atda ritmni saqlab davom eting.",
    ],
    tips: [
      'Dumbani plank chizig\'ida ushlang.',
      'Avval sekin, keyin tezlikni oshiring.',
    ],
    mistakes: [
      "Dumbani yuqoriga ko'tarib yuborish.",
      'Yelkalarni bilakdan orqada qoldirish.',
    ],
    image: require('../../assets/images/exercises/mountain-climbers.webp'),
  },
  {
    id: 'incline-walk',
    name: 'Incline walk',
    group: 'cardio',
    purpose: "Qiyalikda yurish orqali yumshoq, samarali cardio yakuni.",
    muscles: ['Dumba', 'Boldir', 'Yurak-qon tomir tizimi'],
    steps: [
      "Yo'lakcha qiyaligini 5–10% ga o'rnating.",
      "O'rtacha tezlikda (4,5–5,5 km/soat) yurishni boshlang.",
      "Belgilangan vaqt davomida tekis yuring.",
      "Oxirida qiyalikni pasaytirib, sekinlashing.",
    ],
    tips: [
      'Dastaklardan ushlamasdan yuring — samara ancha yuqori.',
      "Qadamni tabiiy uzunlikda tashlang.",
    ],
    mistakes: [
      'Dastakka osilib olish.',
      'Juda katta qiyalikda engashib yurish.',
    ],
    image: require('../../assets/images/exercises/incline-walk.webp'),
  },
];

const exerciseById = new Map(exercises.map((exercise) => [exercise.id, exercise]));

const exercisesByGroup = new Map<MuscleGroupId, Exercise[]>();
for (const exercise of exercises) {
  const group = exercisesByGroup.get(exercise.group);
  if (group) group.push(exercise);
  else exercisesByGroup.set(exercise.group, [exercise]);
}

export function getExercise(id: string): Exercise | undefined {
  return exerciseById.get(id);
}

export function getExercisesByGroup(group: MuscleGroupId): Exercise[] {
  return exercisesByGroup.get(group) ?? [];
}
