# Zaplan 🏋️

Sport zalida haftasiga 3 kun shug'ullanadiganlar uchun sodda fitness-rejalashtiruvchi ilova. Expo (SDK 57) va React Native asosida qurilgan.

## Imkoniyatlar

- **Bugungi mashg'ulot** — ilova bugun qaysi kun ekanini aniqlab, mashg'ulot yoki dam olish kunini ko'rsatadi
- **2 xil haftalik jadval** — Du/Chor/Ju yoki Se/Pay/Sha
- **3 ta Full Body dastur** — A (oyoq, ko'krak, triceps), B (orqa, oyoq, biceps), C (yelka, full body, cardio)
- **Mashqlar katalogi** — 28 ta mashq, texnika, tavsiyalar va xatolar bilan
- **Progress kuzatuvi** — workout, dastur va hafta darajasida foizlar
- **Lokal saqlash** — natijalar qurilmada saqlanadi (AsyncStorage)

## Ishga tushirish

```bash
npm install
npx expo start
```

Keyin iOS simulyator, Android emulyator yoki Expo Go orqali oching.

## Mashq rasmlarini qo'shish

Rasmlar uchun joylar tayyorlab qo'yilgan:

1. Rasmni `assets/images/exercises/` papkasiga tashlang (masalan `leg-press.png`)
2. `src/data/exercises.ts` da tegishli mashqning `image` maydonini yangilang:

```ts
image: require('../../assets/images/exercises/leg-press.png'),
```

Rasm ulanmagan mashqlarda avtomatik "Rasm joyi" plashka ko'rsatiladi.

## Texnologiyalar

- Expo SDK 57 / React Native 0.86 / React 19
- expo-router (fayl-asosli navigatsiya, typed routes)
- Zustand + AsyncStorage (holat va saqlash)
- Rubik va Space Grotesk shriftlari (@expo-google-fonts)
- Dizayn tizimi: `DESIGN.md` asosidagi tungi-binafsha palitra
