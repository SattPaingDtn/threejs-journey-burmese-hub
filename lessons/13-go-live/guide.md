# Lesson 13 — Go Live (Three.js Project ကို Online တင်ခြင်း)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: Go live](https://threejs-journey.com/lessons/go-live)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤ guide** — Vite project ကို production build ပြုလုပ်၊ local preview စစ်ပြီး hosting service ပေါ်တင်တဲ့ workflow ကို မြန်မာလို ရှင်းပြထားပါတယ်။ Hosting UI နဲ့ pricing များ ပြောင်းနိုင်လို့ deploy မလုပ်မီ provider ရဲ့ လက်ရှိ documentation ကို စစ်ပါ။

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

- Development server နဲ့ production build ကို ခွဲနိုင်မယ်
- `npm run build` နဲ့ `dist/` ဖန်တီးနိုင်မယ်
- Production output ကို local preview စစ်နိုင်မယ်
- Traditional hosting နဲ့ modern continuous deployment ကွာခြားချက်ကို နားလည်မယ်
- Vercel၊ Netlify သို့မဟုတ် GitHub Pages လို option ကို project နဲ့ကိုက်ညီအောင် ရွေးနိုင်မယ်
- Asset paths၊ build errors နဲ့ SPA routing ပြဿနာများကို အခြေခံဖြေရှင်းနိုင်မယ်

---

## ၁။ ဘာကြောင့် Go Live လုပ်တာလဲ

Screenshot နဲ့ video က project ကိုပြနိုင်ပေမယ့် Three.js experience ရဲ့ အဓိကတန်ဖိုးက user ကိုယ်တိုင် drag၊ zoom၊ click နဲ့ လှုပ်ရှားကြည့်နိုင်တာပါ။ Website ကို online တင်လိုက်ရင် ဖုန်း၊ tablet နဲ့ တခြား computer များက link တစ်ခုနဲ့ စမ်းနိုင်ပါတယ်။

```text
Source code → Production build → Hosting → Public URL
```

Deploy မလုပ်မီ project ကို local မှာ error မရှိအောင် စစ်ပြီး mobile/performance ကိုလည်း စမ်းသင့်ပါတယ်။

---

## ၂။ Development နဲ့ Production

### Development server

```bash
npm run dev
```

- Source maps နဲ့ error messages ဖတ်ရလွယ်တယ်
- File ပြင်တိုင်း hot reload ဖြစ်တယ်
- Production optimization အပြည့်မလုပ်သေးဘူး
- Local development အတွက်ပဲ သုံးတယ်

### Production build

```bash
npm run build
```

Vite က source modules နဲ့ assets များကို browser သုံးနိုင်တဲ့ optimized output အဖြစ် ပြောင်းပြီး `dist/` folder ထဲ ထုတ်ပေးပါတယ်။

```text
project/
├── src or script.js
├── package.json
├── node_modules/
└── dist/
    ├── index.html
    └── assets/
```

Hosting ဆီ `node_modules/` တစ်ခုလုံး မတင်ရပါဘူး။ Traditional static host အတွက် build output ဖြစ်တဲ့ `dist/` ထဲက files များကို တင်ပါတယ်။ Git-based platform မှာတော့ source repository တင်ပြီး platform က install/build ကို လုပ်ပေးနိုင်ပါတယ်။

---

## ၃။ Build script ကို စစ်ခြင်း

`package.json` ထဲမှာ Vite scripts များ ရှိသင့်ပါတယ်။

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Dependencies install မရှိသေးရင်—

```bash
npm install
```

ပြီးမှ build လုပ်ပါ။ Build command အဆုံးမှာ error မရှိဘဲ output file sizes ပြလာရင် အောင်မြင်ပါတယ်။ Warning ကိုလည်း မလျစ်လျူရှုဘဲ ဘာကြောင့်ဖြစ်သလဲ ဖတ်ပါ။

---

## ၄။ Production build ကို local preview စစ်ခြင်း

```bash
npm run preview
```

Terminal ပြတဲ့ URL ကို browser မှာ ဖွင့်ပြီး အောက်ပါအချက်များ စစ်ပါ။

- Console error မရှိခြင်း
- Textures၊ fonts နဲ့ models load ဖြစ်ခြင်း
- Refresh လုပ်ပြီး page ဆက်ပေါ်ခြင်း
- Resize/fullscreen/interactions အလုပ်လုပ်ခြင်း
- Mobile width မှာ layout မပျက်ခြင်း
- Network tab မှာ 404 assets မရှိခြင်း

`dist/index.html` ကို double-click ဖွင့်တာက production preview အစားမဖြစ်ပါဘူး။ ES modules နဲ့ asset paths ကြောင့် local server ကနေ စစ်ရပါတယ်။

---

## ၅။ Traditional static hosting

ကိုယ်ပိုင် hosting/FTP ရှိပြီးသားဆို—

1. `npm run build`
2. `dist/` output ကို local preview စစ်
3. `dist/` အတွင်းက files များကို server public directory ဆီ upload
4. HTTPS URL နဲ့ စမ်း
5. Version အသစ်တိုင်း build ပြန်လုပ်ပြီး files အစားထိုး

Folder တစ်ခုအောက်မှာ host မယ်ဆို Vite `base` setting နဲ့ absolute asset paths ကို ချိန်ရနိုင်ပါတယ်။ Root domain မှာအလုပ်လုပ်ပေမယ့် subfolder မှာ assets 404 ဖြစ်ရင် ဒီအချက်ကို အရင်စစ်ပါ။

---

## ၆။ Modern hosting နှင့် continuous deployment

Vercel၊ Netlify နဲ့ အလားတူ platforms တွေက Git repository နဲ့ ချိတ်ပြီး commit အသစ် push တိုင်း install → build → deploy ကို အလိုအလျောက်လုပ်နိုင်ပါတယ်။

အများသုံး settings—

| Setting | Vite project value |
| --- | --- |
| Install command | `npm install` သို့မဟုတ် `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

Platform က Vite ကို detect လုပ်ရင် အဲဒီ values တွေကို အလိုအလျောက်ဖြည့်ပေးတတ်ပါတယ်။ UI က အချိန်နှင့်အမျှ ပြောင်းနိုင်လို့ deploy screen မှာ framework၊ build command နဲ့ output directory ကို မနှိပ်မီ ပြန်စစ်ပါ။

---

## ၇။ Vercel workflow နှစ်မျိုး

### Git integration

1. Project ကို Git repository ထဲ commit လုပ်ပါ
2. Repository ကို Git provider ဆီ push လုပ်ပါ
3. Vercel မှာ repository import လုပ်ပါ
4. Framework preset `Vite`၊ build `npm run build`၊ output `dist` ဖြစ်ကြောင်း စစ်ပါ
5. Deploy လုပ်ပြီး public URL ကို စမ်းပါ

ဒီနည်းက နောက် commit တိုင်း automatic deployment လုပ်ပေးနိုင်တာကြောင့် ပုံမှန်အသုံးများပါတယ်။

### CLI

Provider ရဲ့ current instructions ကို စစ်ပြီး CLI ကို project folder မှာ run နိုင်ပါတယ်။ မူရင်း lesson workflow မှာ Vercel CLI အသုံးပြုထားပြီး production deploy script ကို အောက်ပါပုံစံ ထည့်နိုင်ပါတယ်။

```json
{
  "scripts": {
    "deploy": "vercel --prod"
  }
}
```

```bash
npm run deploy
```

ဒီ command က external deployment ပြုလုပ်တာဖြစ်လို့ correct account၊ project နဲ့ production target ဟုတ်ကြောင်း အတည်ပြုပြီးမှ run ပါ။ Token မမှန်ရင် provider ရဲ့ current login command/documentation ကို လိုက်နာပါ။

---

## ၈။ Alternative hosting များ

- **Netlify** — Git integration နဲ့ static deployment
- **GitHub Pages** — public repository/static site အတွက်၊ subpath `base` config လိုနိုင်
- **Cloudflare Pages** — Git-based static/JAMstack deployment
- **Traditional host** — `dist/` files ကို FTP/SFTP upload

ရွေးချယ်ရာမှာ pricing တစ်ခုတည်းမဟုတ်ဘဲ custom domain၊ bandwidth၊ build minutes၊ collaboration၊ analytics နဲ့ privacy ကိုပါ စဉ်းစားပါ။ Pricing/limits က ပြောင်းနိုင်တာကြောင့် provider site မှာ နောက်ဆုံးအချက်အလက် စစ်ပါ။

---

## ၉။ Deploy မတိုင်မီ checklist

- [ ] `npm run build` အောင်မြင်တယ်
- [ ] `npm run preview` မှာ console error မရှိဘူး
- [ ] Texture/model/font URLs များ load ဖြစ်တယ်
- [ ] Mobile နဲ့ desktop resize အလုပ်လုပ်တယ်
- [ ] `dist/`၊ `.env` နဲ့ secret handling ကို နားလည်တယ်
- [ ] API keys/secrets ကို client bundle ထဲ မထည့်ထားဘူး
- [ ] Large textures/models ကို optimize လုပ်ထားတယ်
- [ ] Page title၊ favicon နဲ့ share description ပြင်ထားတယ်
- [ ] Public URL ကို incognito/အခြား device နဲ့ စမ်းထားတယ်

> Vite ရဲ့ client-exposed environment variables ကို browser user က ဖတ်နိုင်ပါတယ်။ Secret token သို့မဟုတ် private key ကို frontend code ထဲ မထည့်ပါနဲ့။

---

## ၁၀။ ပြဿနာဖြေရှင်းရန်

### Build အောင်မြင်ပေမယ့် blank page

- Browser console error ဖတ်ပါ
- Asset 404 ရှိမရှိ Network tab စစ်ပါ
- Subfolder hosting ဆို Vite `base` setting စစ်ပါ
- Case-sensitive server မှာ filename case ကိုက်သလား စစ်ပါ

### Local မှာရပြီး online မှာ texture/model ပျောက်တယ်

- `/textures/...` absolute path နဲ့ deployment base ကို စစ်ပါ
- Assets ကို public/static folder မှာ မှန်ကန်စွာထားသလား စစ်ပါ
- Mixed content (HTTPS page မှ HTTP asset) ရှိသလား စစ်ပါ

### Deploy အသစ်မပေါ်ဘူး

- Latest commit/build ဟုတ်သလား စစ်ပါ
- Build logs ကို ဖတ်ပါ
- Browser/CDN cache ကြောင့်လား hard refresh စမ်းပါ
- Traditional hosting ဆို `npm run build` ပြန်လုပ်ပြီး `dist/` အသစ်တင်ထားသလား စစ်ပါ

---

## အနှစ်ချုပ်

```bash
npm install
npm run build
npm run preview
```

ဒီ commands သုံးခုက dependency install၊ production build နဲ့ final local verification အဆင့်များဖြစ်ပါတယ်။ Preview အောင်မြင်ပြီးမှ hosting platform ရွေးကာ deploy လုပ်ပါ။ Public URL ရပြီဆို screenshot တင်ရုံထက် ပိုကောင်းတဲ့ interactive Three.js experience ကို တိုက်ရိုက်မျှဝေနိုင်ပါပြီ။
