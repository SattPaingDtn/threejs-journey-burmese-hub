# 🌟 Three.js Journey - Burmese Learning Hub & Interactive Studio (မြန်မာဘာသာ သင်ယူမှု ပလက်ဖောင်း)

[Three.js Journey](https://threejs-journey.com) သင်ခန်းစာများကို မြန်မာဘာသာဖြင့် စနစ်တကျ လေ့လာသင်ယူနိုင်ပြီး 3D Interactive Lab များဖြင့် လက်တွေ့ စမ်းသပ်နိုင်သော **Full-featured Learning Portal & Memo** ဖြစ်ပါသည်။

---

## 🚀 အဓိက ပါဝင်သော အင်္ဂါရပ်များ (Key Features)

* 📚 **Multi-Lesson Support**: Three.js Journey ၏ Chapter အားလုံး (Basics, Classic Techniques, Advanced Techniques, Shaders, R3F) ကို စနစ်တကျ ခွဲခြားစီစဉ်ထားခြင်း။
* 🔍 **Instant Search & Drawer Navigation**: မည်သည့် သင်ခန်းစာ သို့မဟုတ် Topic Keyword ကိုမဆို ရှာဖွေနိုင်ပြီး Bookmarkable Hash URL (ဥပမာ - `/#06-cameras`, `/#13-go-live`) ဖြင့် တိုက်ရိုက် သွားရောက်နိုင်ခြင်း။
* 📖 **Deep-Dive Burmese Guides**: သင်္ချာသဘောတရားများ (Matrix Transformations, Trigonometry, Non-linear Depth Buffer, PBR Material Math) ကို ရှင်းလင်းထားသော လမ်းညွှန်များ။
* 🎮 **Interactive 3D Lab**: Three.js Canvas တွင် ကင်မရာ၊ မီးရောင်၊ Geometries၊ Controls (OrbitControls vs Custom Mouse vs Smooth Lerp) များကို အချိန်နှင့်တပြေးညီ စမ်းသပ်နိုင်ခြင်း။
* ⚡ **Production Ready for Vercel & GitHub**: Vanilla JavaScript + Vite ဖြင့် local development နှင့် optimized production build ပြုလုပ်နိုင်ခြင်း။

---

## 📁 Project Directory Structure

```text
My3Djourneylesson/
├── index.html                 # Main Learning Portal Web App (SPA)
├── vercel.json                # Vercel Deployment & Clean Routing Config
├── package.json               # Metadata and scripts
├── .gitignore                 # Git ignore configuration
├── README.md                  # Project Documentation
├── data/
│   └── lessons.js             # Chapters and Lessons Registry & Metadata
├── lessons/                   # Chapter 1 Burmese Study Guides
│   ├── 01-introduction/guide.md
│   ├── 02-webgl-and-threejs/guide.md
│   ├── 03-basic-scene/guide.md
│   ├── 04-transform-objects/guide.md
│   ├── 05-animations/guide.md
│   ├── 06-cameras/guide.md
│   ├── 07-fullscreen-and-resizing/guide.md
│   ├── 08-geometries/guide.md
│   ├── 09-debug-ui/guide.md
│   ├── 10-textures/guide.md
│   ├── 11-materials/guide.md
│   ├── 12-3d-text/guide.md
│   └── 13-go-live/guide.md
```

---

## 🛠️ GitHub နှင့် Vercel တွင် အသုံးပြုပုံ (Publish & Deploy)

### Local မှာ ဖွင့်ရန်

Node.js 20 နှင့်အထက် ထည့်သွင်းထားပြီး project folder ထဲမှာ အောက်ပါ command များကို run ပါ။

```bash
npm install
npm start
```

Terminal မှာ ပြသလာတဲ့ `http://127.0.0.1:5173/` သို့မဟုတ် `http://localhost:5173/` ကို browser ဖြင့် ဖွင့်ပါ။ Production build စစ်ရန် `npm run build` ကို အသုံးပြုနိုင်ပါတယ်။

### 1. GitHub သို့ Push ပြုလုပ်ရန်:
```bash
git add .
git commit -m "feat: upgrade to multi-lesson Three.js Journey Burmese learning hub"
# Remote ချိတ်ဆက်ပြီး push လုပ်ပါ
git push -u origin main
```

### 2. Vercel ပေါ်သို့ Deploy ပြုလုပ်ရန်:
1. [Vercel Dashboard](https://vercel.com/new) သို့ သွားပါ။
2. GitHub Repository ကို **Import** လုပ်ပြီး **Deploy** ခလုတ်ကို နှိပ်လိုက်ရုံဖြင့် အခမဲ့ Live Hosting ရရှိမည် ဖြစ်ပါသည်။
# threejs-journey-burmese-hub
