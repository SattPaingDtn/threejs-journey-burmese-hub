# 🚀 Three.js Journey - Lesson 01: Introduction (မိတ်ဆက်၊ 3D Web အခြေခံနှင့် လမ်းပြမြေပုံ)

---

## 📑 မာတိကာ (Table of Contents)

1. [3D Web Graphics နှင့် Creative Web Development မိတ်ဆက်](#၁-3d-web-graphics-နှင့်-creative-web-development-မိတ်ဆက်)
2. [ကွန်ပျူတာ ဟာ့ဒ်ဝဲ ဗိသုကာ: CPU နှင့် GPU မတူညီပုံ](#၂-ကွန်ပျူတာ-ဟာ့ဒ်ဝဲ-ဗိသုကာ-cpu-နှင့်-gpu-မတူညီပုံ)
   - CPU (Serial Processing) ၏ အခန်းကဏ္ဍ
   - GPU (Massive Parallel Processing) ၏ စွမ်းအား
   - 3D ရုပ်ပုံများကို GPU က မည်သို့ ရေးဆွဲပေးသနည်း?
3. [WebGL နှင့် Three.js တို့၏ ဆက်စပ်မှု](#၃-webgl-နှင့်-threejs-တို့၏-ဆက်စပ်မှု)
   - WebGL ဆိုတာ ဘာလဲ?
   - Three.js ဘာကြောင့် ပေါ်ပေါက်လာသလဲ?
4. [လက်တွေ့လောက အသုံးချမှုနယ်ပယ်များ (Real-World Use Cases)](#၄-လက်တွေ့လောက-အသုံးချမှုနယ်ပယ်များ)
5. [Chapter 1 မှ Chapter 6 အထိ လေ့လာမှု လမ်းပြမြေပုံ (Complete Roadmap)](#၅-လေ့လာမှု-လမ်းပြမြေပုံ)
6. [ထိရောက်စွာ လေ့လာနိုင်ရန် အကြံပြုချက်များ (Best Learning Tips)](#၆-ထိရောက်စွာ-လေ့လာနိုင်ရန်-အကြံပြုချက်များ)
7. [အနှစ်ချုပ် မှတ်စုတို (Lesson 01 Memo)](#၇-အနှစ်ချုပ်-မှတ်စုတို)

---

# ၁။ 3D Web Graphics နှင့် Creative Web Development မိတ်ဆက်

ယနေ့ခေတ် Web Development လောကတွင် သမရိုးကျ ၂ ဖက်မြင် (2D) စာမျက်နှာများ၊ ပုံများနှင့် စာသားများအပြင် အသုံးပြုသူကိုယ်တိုင် ၃၆၀ ဒီဂရီ လှည့်လည်ထိန်းချုပ်နိုင်သော **3D Web Experiences** များသည် အလွန်ခေတ်စားလာပါသည်။

Apple ၏ ထုတ်ကုန်မိတ်ဆက် ဝက်ဘ်ဆိုက်များ၊ Nike ဖိနပ် 3D Customizer များ၊ Porsche ကား ဒီဇိုင်းစနစ်များနှင့် ဆုတံဆိပ်ရ Awwwards ဝက်ဘ်ဆိုက်များသည် 3D Graphics နည်းပညာကို အဓိက အခြေခံထားကြသည်။ ဤနယ်ပယ်ကို ကျွမ်းကျင်စွာ တည်ဆောက်နိုင်ရန်အတွက် အခြေခံအကျဆုံးဖြစ်သော **Browser, WebGL, Three.js နှင့် Hardware (CPU/GPU)** တို့၏ အလုပ်လုပ်ပုံကို ဦးစွာ နားလည်ထားရန် လိုအပ်ပါသည်။

---

# ၂။ ကွန်ပျူတာ ဟာ့ဒ်ဝဲ ဗိသုကာ: CPU နှင့် GPU မတူညီပုံ

3D ရုပ်ပုံများကို ဖန်သားပြင်ပေါ်တွင် တစ်စက္ကန့်လျှင် အကြိမ် ၆၀ (60 Frames Per Second) ချောမွေ့စွာ ရေးဆွဲနိုင်ရန် ကွန်ပျူတာရှိ ပရိုဆက်ဆာ နှစ်မျိုးက ပူးပေါင်း လုပ်ဆောင်ကြသည်:

```
┌─────────────────────────────────────────────────────────────┐
│                 🧠 CPU (Central Processing Unit)            │
│   • Core အရေအတွက် နည်းသည် (4, 8, 16 Cores)                  │
│   • တစ်ကြိမ်လျှင် အလုပ်တစ်ခုကို အလွန်လျင်မြန်စွာ လုပ်သည် (Serial) │
│   • ရှုပ်ထွေးသော Logic, JavaScript Code, File Loading တွက်သည်  │
└──────────────────────────────┬──────────────────────────────┘
                               │ (ညွှန်ကြားချက်များ ပေးပို့)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 ⚡ GPU (Graphics Processing Unit)           │
│   • Core ထောင်သောင်းချီ ပါဝင်သည် (2,000 ~ 10,000+ Cores)      │
│   • အလုပ်ပေါင်း သန်းချီကို တစ်ပြိုင်နက်တည်း လုပ်သည် (Parallel)    │
│   • 3D Vertices တည်နေရာများနှင့် Pixels ဆေးခြယ်ခြင်းကို တွက်သည်   │
└─────────────────────────────────────────────────────────────┘
```

---

### (က) CPU (Serial Processing)
CPU သည် ဦးနှောက်ကောင်းသော ပါမောက္ခတစ်ဦးနှင့် တူသည်။ မည်မျှပင် ခက်ခဲရှုပ်ထွေးသော သင်္ချာနှင့် Business Logic ဖြစ်ပါစေ လျင်မြန်စွာ တွက်ချက်နိုင်သော်လည်း အလုပ်တစ်ခုပြီးမှ နောက်တစ်ခုကို အစဉ်လိုက်သာ လုပ်ဆောင်နိုင်သည်။ JavaScript ကုဒ်အများစုသည် CPU ပေါ်တွင် Run ပါသည်။

### (ခ) GPU (Massive Parallel Processing)
GPU သည် သာမန်လုပ်သား ထောင်ပေါင်းများစွာ စုဝေးနေသော စက်ရုံကြီးတစ်ခုနှင့် တူသည်။ ရိုးရှင်းသော $X, Y, Z$ မြှောက်ခြင်း၊ ပေါင်းခြင်းနှင့် အရောင်စပ်ခြင်း သင်္ချာများကို အလုပ်သမား ထောင်ပေါင်းများစွာက **တစ်ပြိုင်နက်တည်း (Simultaneously)** တွက်ချက်ပေးနိုင်သည်။

### (ဂ) 3D ရုပ်ပုံများကို GPU က မည်သို့ ရေးဆွဲသနည်း?
* 3D Model တစ်ခုတွင် တြိဂံပေါင်း `100,000` ခု ပါဝင်ပါက ထောင့်စွန်းမှတ် (Vertex) ပေါင်း `300,000` ခု ရှိမည်။
* CPU သည် ထိုအမှတ် ၃ သိန်းကို တစ်ခုပြီးမှတစ်ခု တွက်ချက်ရသဖြင့် အချိန်ကြာမြင့်ပြီး Frame Rate ကျဆင်းသွားမည် ဖြစ်သည်။
* GPU ကမူ Core ထောင်ပေါင်းများစွာ ပါရှိသဖြင့် အမှတ် ၃ သိန်းစလုံး၏ တည်နေရာနှင့် Screen ပေါ်ရှိ Pixel သန်းပေါင်းများစွာ၏ အရောင်ကို **၁ စက္ကန့်၏ ၆၀ ပုံ ၁ ပုံအတွင်း (16.6ms)** တစ်ပြိုင်နက်တည်း ပြီးပြည့်စုံအောင် ရေးဆွဲပေးနိုင်သည်။

---

# ၃။ WebGL နှင့် Three.js တို့၏ ဆက်စပ်မှု

```
┌─────────────────────────────────────────────────────────────┐
│                 Three.js (JavaScript 3D Library)            │
│   Scene, Mesh, Camera, Lights, Geometries, Materials, Loaders│
├─────────────────────────────────────────────────────────────┤
│                 WebGL API (Browser Low-level Driver)        │
│             Shaders, Buffers, Draw Calls, GLSL, Matrices    │
├─────────────────────────────────────────────────────────────┤
│                 GPU Hardware (Nvidia, AMD, Apple M-Series)  │
└─────────────────────────────────────────────────────────────┘
```

### (၁) WebGL ဆိုတာ ဘာလဲ?
WebGL သည် Browser ၏ `<canvas>` Tag ပေါ်တွင် GPU ၏ စွမ်းအားကို တိုက်ရိုက်ရယူ၍ 2D/3D Graphics များကို ရေးဆွဲပေးသော **Low-Level JavaScript API** ဖြစ်သည်။ WebGL သည် Plugin (ဥပမာ Flash) မလိုဘဲ ခေတ်မီ Browser တိုင်း (Chrome, Safari, Firefox, Edge) တွင် တိုက်ရိုက် အလုပ်လုပ်သည်။

### (၂) Three.js ဘာကြောင့် ပေါ်ပေါက်လာသလဲ?
Native WebGL ကုဒ်သည် အလွန် နိမ့်ကျပြီး ရှုပ်ထွေးသည်။ ရိုးရိုး တြိဂံပြားလေးတစ်ခု ဆွဲရန်အတွက်ပင် ကုဒ်စာကြောင်းရေ ၁၀၀ ကျော် ရေးသားရပြီး၊ ကင်မရာ၊ အလင်းရောင်၊ အရိပ်များနှင့် Texture ပုံများ ထည့်သွင်းလိုပါက ကုဒ်ထောင်ပေါင်းများစွာ ရေးရသည်။

၂၀၁၀ ပြည့်နှစ်တွင် **Ricardo Cabello (Mr.doob)** သည် ထိုအခက်အခဲများကို ဖြေရှင်းရန် **Three.js** ကို စတင် ဖန်တီးခဲ့သည်။ Three.js သည် WebGL ၏ အောက်ခြေ ရှုပ်ထွေးမှုများကို စနစ်တကျ ကွယ်ဝှက်ပေးကာ အောက်ပါအတိုင်း လွယ်ကူရှင်းလင်းစွာ ရေးသားနိုင်စေသည်:

```javascript
// Three.js ဖြင့် 3D Scene တစ်ခုကို အလွယ်တကူ တည်ဆောက်ခြင်း
const scene = new THREE.Scene()
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)
```

---

# ၄။ လက်တွေ့လောက အသုံးချမှုနယ်ပယ်များ

1. 🛍️ **E-Commerce 3D Product Customizers**: ကုန်ပစ္စည်းများကို အရွယ်အစား၊ အရောင်၊ ကုန်ကြမ်းပစ္စည်း အမျိုးအစားအလိုက် ၃၆၀ ဒီဂရီ အချိန်နှင့်တပြေးညီ ပြောင်းလဲကြည့်ရှုနိုင်ခြင်း။
2. 🏎️ **Interactive Portfolios**: Bruno Simon ၏ 3D Car Portfolio ကဲ့သို့ ကားမောင်း၍ Developer ၏ အချက်အလက်များကို စူးစမ်းနိုင်သော ဖန်တီးမှုများ။
3. 🎮 **Web 3D Games & Metaverse**: Browser ပေါ်တွင် App သွင်းရန်မလိုဘဲ တိုက်ရိုက် ကစားနိုင်သော 3D Multiplayer Games များ။
4. 🏢 **Architectural & Real Estate Visualization**: တိုက်ခန်းများ၊ အဆောက်အအုံများကို 3D Floor Plan ဖြင့် လှည့်ပတ် လေ့လာနိုင်ခြင်း။
5. 📊 **Scientific & Data Visualization**: ဆေးပညာဆိုင်ရာ မော်လီကျူး ဖွဲ့စည်းပုံများ၊ မြေပုံများနှင့် ကိန်းဂဏန်း အချက်အလက်များကို 3D Chart ဖြင့် ဖော်ပြခြင်း။

---

# ၅။ လေ့လာမှု လမ်းပြမြေပုံ (Complete Roadmap)

* **Chapter 1: Basics (အခြေခံများ)**
  * Basic Scene, Transform Objects, Animations, Cameras, Fullscreen/Resize, Geometries, Textures, Materials, 3D Text
* **Chapter 2: Classic Techniques (ဂန္ထဝင် နည်းစနစ်များ)**
  * Lights, Shadows, Haunted House Project, Particles System, Galaxy Generator, Scroll-based Animations
* **Chapter 3: Advanced Techniques (အဆင့်မြင့် နည်းပညာများ)**
  * Physics Engine (Cannon-es), 3D Models တင်သွင်းခြင်း (GLTF/GLB), Raycaster & Mouse Events, Environment Maps, Realistic PBR Rendering
* **Chapter 4: Shaders (GLSL ပရိုဂရမ်မင်း)**
  * Shaders မိတ်ဆက်၊ Vertex/Fragment Shaders, Shader Patterns, Raging Sea ပင်လယ်လှိုင်းတံပိုး Project, Animated Galaxy
* **Chapter 5: Extra & Performance (စွမ်းဆောင်ရည် မြှင့်တင်ခြင်း)**
  * Post-Processing Effects, Performance Optimization & Monitoring, Mixing HTML & 3D WebGL
* **Chapter 6: React Three Fiber (R3F)**
  * React နှင့် Three.js ပေါင်းစပ်ခြင်း၊ Drei Helper Library၊ R3F ဖြင့် Complex 3D Game Portfolio တည်ဆောက်ခြင်း

---

# ၆။ ထိရောက်စွာ လေ့လာနိုင်ရန် အကြံပြုချက်များ

1. **လက်တွေ့ ကိုယ်တိုင် ကုဒ်လိုက်ရိုက်ပါ (Code Along)**: ဖတ်ရုံ၊ ကြည့်ရုံဖြင့် မပြီးဘဲ ကုဒ်များကို ကိုယ်တိုင် စမ်းသပ် ရေးသားပါ။
2. **Parameters များကို ပြောင်းလဲ ကစားပါ**: Box Geometry ၏ အရွယ်အစား၊ Material အရောင်၊ Camera FOV တန်ဖိုးများကို အမျိုးမျိုး ပြောင်းလဲပြီး မည်သို့ ဖြစ်သွားသည်ကို လေ့လာပါ။
3. **Console Log ထုတ်ကြည့်ပါ**: Object တစ်ခုကို `console.log(mesh)` သို့မဟုတ် `console.log(camera)` ဖြင့် ထုတ်ကြည့်ပြီး ၎င်း၏ အတွင်းပိုင်း Properties များကို လေ့လာပါ။

---

# ၇။ အနှစ်ချုပ် မှတ်စုတို (Lesson 01 Memo)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        LESSON 01 SUMMARY MEMO                          │
├────────────────────────────────────────────────────────────────────────┤
│ • CPU       : Logic အပိုင်းကို တာဝန်ယူပြီး အလုပ်များကို တစ်ခုပြီးတစ်ခု လုပ်သည် │
│ • GPU       : Core ထောင်သောင်းချီဖြင့် Pixels များကို တစ်ပြိုင်နက်တည်း ဆွဲသည်  │
│ • WebGL     : Browser တွင် GPU ကို တိုက်ရိုက် အသုံးပြုသည့် Low-level API    │
│ • Three.js  : WebGL ကို JavaScript ဖြင့် ရေးသားရ လွယ်ကူစေသည့် 3D Engine │
│ • Goal      : Creative 3D Websites, Configurators နှင့် Games များ ဖန်တီးရန် │
└────────────────────────────────────────────────────────────────────────┘
```
