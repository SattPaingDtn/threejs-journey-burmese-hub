# 🚀 Three.js Journey - Lesson 01: Introduction (မိတ်ဆက်နှင့် လေ့လာမှု လမ်းပြမြေပုံ)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 01: Introduction](https://threejs-journey.com/lessons/introduction)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity  
> **ချဉ်းကပ်မှုပုံစံ**: Medium / Balanced Deep Dive (အခြေခံမှ သဘောတရားအထိ ရှင်းလင်းလွယ်ကူပြီး လက်တွေ့ကျသော ချဉ်းကပ်မှု)

---

## 📑 မာတိကာ (Table of Contents)

1. [Three.js Journey မှ ကြိုဆိုပါသည် (Welcome)](#၁-threejs-journey-မှ-ကြိုဆိုပါသည်)
2. [Web 3D Graphics ၏ အခြေခံ သဘောတရား (CPU vs GPU vs WebGL)](#၂-web-3d-graphics-၏-အခြေခံ-သဘောတရား)
3. [Three.js ဆိုတာ ဘာလဲ? ဘာကြောင့် သုံးသင့်သလဲ?](#၃-threejs-ဆိုတာ-ဘာလဲ-ဘာကြောင့်-သုံးသင့်သလဲ)
4. [Three.js ဖြင့် ဖန်တီးနိုင်သော လက်တွေ့ နယ်ပယ်များ](#၄-threejs-ဖြင့်-ဖန်တီးနိုင်သော-လက်တွေ့-နယ်ပယ်များ)
5. [သင်ခန်းစာ လမ်းပြမြေပုံ (Complete Course Roadmap)](#၅-သင်ခန်းစာ-လမ်းပြမြေပုံ-complete-course-roadmap)
6. [ကြိုတင်သိရှိထားရန် လိုအပ်သော အခြေခံများ (Prerequisites)](#၆-ကြိုတင်သိရှိထားရန်-လိုအပ်သော-အခြေခံများ)
7. [အကောင်းဆုံး လေ့လာသင်ယူနည်း လမ်းညွှန် (Pro Study Tips)](#၇-အကောင်းဆုံး-လေ့လာသင်ယူနည်း-လမ်းညွှန်)
8. [အမြန်မှတ်စု (Lesson Memo)](#၈-အမြန်မှတ်စု-lesson-memo)

---

# ၁။ Three.js Journey မှ ကြိုဆိုပါသည်

**Three.js Journey** သည် ကမ္ဘာပေါ်တွင် အကျော်ကြားဆုံးနှင့် အပြည့်စုံဆုံး Web 3D / Creative Web Development သင်တန်း ဖြစ်သည်။ Bruno Simon (Award-winning Creative Developer) မှ အစပြု၍ အခြေခံ ဘာမှမသိသေးသူများမှစ၍ အဆင့်မြင့် 3D Web Developer ဖြစ်လာသည်အထိ စနစ်တကျ သင်ကြားပေးထားပါသည်။

```
                    ┌───────────────────────────────────────┐
                    │     Creative Web Development          │
                    │   (Three.js + WebGL + Shaders)        │
                    └───────────────────┬───────────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           │                            │                            │
┌──────────▼──────────┐      ┌──────────▼──────────┐      ┌──────────▼──────────┐
│  3D Websites / Arts │      │ 3D Games / Physics  │      │ Product Configurator│
│ (Awwwards / FWA)    │      │  (Web-based Games)  │      │  (E-Commerce 3D)    │
└─────────────────────┘      └─────────────────────┘      └─────────────────────┘
```

---

# ၂။ Web 3D Graphics ၏ အခြေခံ သဘောတရား

Website တစ်ခုပေါ်တွင် 3D အရာဝတ္ထုများ၊ အလင်းရောင်နှင့် ကာတွန်းလှုပ်ရှားမှုများကို မြန်ဆန်ချောမွေ့စွာ ပြသနိုင်ရန် ကွန်ပျူတာ၏ အတွင်းပိုင်း Hardware များ အလုပ်လုပ်ပုံကို နားလည်ရန် လိုအပ်သည်:

```
[ JavaScript Code ]  ──>  [ Three.js ]  ──>  [ WebGL API ]  ──>  [ GPU (Graphics Card) ]  ──>  [ Canvas Screen ]
```

### CPU နှင့် GPU ၏ ကွာခြားချက် (ရိုးရှင်းသော ဥပမာ):

* **CPU (Central Processing Unit)**:
  * အလွန်တော်သော ပါမောက္ခ ၁ ယောက်နှင့် တူသည်။ ရှုပ်ထွေးသော အလုပ်များကို တစ်ခုပြီးမှ တစ်ခု (Sequential) စဉ်းစားလုပ်ဆောင်သည်။
* **GPU (Graphics Processing Unit)**:
  * မူလတန်းကျောင်းသား ၁၀,၀၀၀ နှင့် တူသည်။ ကျောင်းသားတစ်ဦးချင်းစီသည် ရိုးရှင်းသော ပေါင်း/နုတ်/မြှောက်/စား အလုပ်ငယ်လေးများကိုသာ လုပ်နိုင်သော်လည်း၊ ကျောင်းသား ၁၀,၀၀၀ လုံး **တစ်ပြိုင်နက်တည်း (Massive Parallel Processing)** အလုပ်လုပ်ကြသည်။
  * 3D Graphics တွင် ဖန်သားပြင်ပေါ်ရှိ Pixels သန်းပေါင်းများစွာနှင့် 3D Vertices (ထောင့်စွန်းမှတ်များ) ကို တစ်စက္ကန့်လျှင် အကြိမ် ၆၀ (60 FPS) တွက်ချက်ရေးဆွဲရသဖြင့် **GPU သည် 3D အတွက် မရှိမဖြစ်** ဖြစ်သည်။

* **WebGL (Web Graphics Library)**:
  * Browser ထဲမှနေ၍ GPU ကို တိုက်ရိုက် ခိုင်းစေနိုင်သော Low-level JavaScript API ဖြစ်သည်။

---

# ၃။ Three.js ဆိုတာ ဘာလဲ? ဘာကြောင့် သုံးသင့်သလဲ?

### Raw WebGL ဖြင့် ရေးသားခြင်း၏ အခက်အခဲ:
အကယ်၍ သင်သည် Three.js မပါဘဲ Raw WebGL သက်သက်ဖြင့် ဖန်သားပြင်ပေါ်တွင် 3D Cube (သေတ္တာ) အနီရောင်လေးတစ်ခု ပေါ်လာစေရန်အတွက်:
1. Vertex Buffer Object (VBO) ဆောက်ရမည်။
2. Shader Code (GLSL) ရေးရမည် (Vertex Shader & Fragment Shader)။
3. Matrix Math (Perspective Matrix, View Matrix, Model Matrix) များကို ကိုယ်တိုင်တွက်ရမည်။
4. စာကြောင်းရေ **၁၅၀ မှ ၂၀၀ ကျော်** ခန့် ရေးရမည်။

### Three.js ၏ အခန်းကဏ္ဍ (The Hero):
**Three.js** သည် ထိုရှုပ်ထွေးလှသော WebGL ၏ အောက်ခြေအလုပ်များကို ကွယ်ဝှက်ပေးထားသော **JavaScript 3D Library** ဖြစ်သည်။

```javascript
// Three.js ဖြင့် Cube ဆောက်ရန် ၃ ကြောင်းသာ လိုအပ်သည်:
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

> 💡 **အနှစ်ချုပ်**: Three.js သည် WebGL ၏ စွမ်းဆောင်ရည်ကို မလျှော့ချဘဲ Developer များအတွက် ရေးရလွယ်ကူ၊ ဖတ်ရလွယ်ကူပြီး ပျော်စရာကောင်းအောင် ပြုလုပ်ပေးထားသော စနစ်ဖြစ်ပါသည်။

---

# ၄။ Three.js ဖြင့် ဖန်တီးနိုင်သော လက်တွေ့ နယ်ပယ်များ

1. 🏆 **Award-winning Websites (Awwwards / FWA)**: Interactive 3D Portfolio များ၊ Storytelling Websites များ။
2. 🛍️ **E-Commerce 3D Product Viewers**: ဖိနပ်၊ ကား၊ အဝတ်အထည်၊ အိမ်သုံးပစ္စည်းများကို ၃၆၀ ဒီဂရီ လှည့်ကြည့်နိုင်ပြီး အရောင်ပြောင်းနိုင်သော စနစ်များ (Configurators)။
3. 🎮 **Web-based 3D Games**: Browser ပေါ်တွင် တိုက်ရိုက် ကစားနိုင်သော 3D ဂိမ်းများ (Physics Engine များ ပေါင်းစပ်၍)။
4. 🏢 **Architectural & Real Estate Walkthroughs**: အဆောက်အအုံ၊ တိုက်ခန်းများကို 3D ဖြင့် လှည့်လည်ကြည့်ရှုခြင်း။
5. 📊 **3D Data Visualization**: သိပ္ပံပညာဆိုင်ရာ အချက်အလက်များ၊ ဂြိုဟ်တုနှင့် မြေပုံ Data များကို 3D ဖြင့် မြင်သာအောင် ပြသခြင်း။
6. 🥽 **WebXR (VR & AR)**: VR Headset များ သို့မဟုတ် ဖုန်းကင်မရာဖြင့် AR အတွေ့အကြုံများ ဖန်တီးခြင်း။

---

# ၅။ သင်ခန်းစာ လမ်းပြမြေပုံ (Complete Course Roadmap)

Three.js Journey ကို အဆင့် (၅) ဆင့်ဖြင့် စနစ်တကျ ဖွဲ့စည်းထားပါသည်:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Basics (အခြေခံများ)                                      │
│    ├── Scenes, Cameras, Mesh, Transform, Animations         │
│    └── Fullscreen/Resize, Geometries, Textures, Materials   │
├─────────────────────────────────────────────────────────────┤
│ 2. Classic Techniques (ဂန္ထဝင် နည်းစနစ်များ)                 │
│    ├── Lights & Shadows                                     │
│    ├── Haunted House (Full 3D Scene Project)                │
│    └── Particles & Galaxy Generator                         │
├─────────────────────────────────────────────────────────────┤
│ 3. Advanced Techniques (အဆင့်မြင့် နည်းစနစ်များ)              │
│    ├── Physics (Cannon.js)                                  │
│    ├── 3D Models Import (Blender to Three.js / GLTF)        │
│    └── Raycaster (Click/Hover) & Realistic Rendering        │
├─────────────────────────────────────────────────────────────┤
│ 4. Shaders (Shader ရေးသားနည်းများ)                          │
│    ├── GLSL Language Basics                                 │
│    ├── Custom Vertex & Fragment Shaders                     │
│    └── Raging Sea (လှိုင်းတံပိုး) & Animated Galaxy Project  │
├─────────────────────────────────────────────────────────────┤
│ 5. Extra & React Three Fiber (R3F)                          │
│    ├── Post-Processing Effects                              │
│    ├── Performance Optimization                             │
│    └── React Three Fiber (R3F) Ecosystem                    │
└─────────────────────────────────────────────────────────────┘
```

---

# ၆။ ကြိုတင်သိရှိထားရန် လိုအပ်သော အခြေခံများ

Three.js ကို လေ့လာရန်အတွက် သင်္ချာပါရဂူ ဖြစ်ရန် မလိုအပ်ပါ။ အောက်ပါ အခြေခံ Web Development ဗဟုသုတများ ရှိလျှင် လုံလောက်ပါသည်:

* ✅ **HTML**: `<canvas>` element နှင့် အခြေခံ HTML tag များ
* ✅ **CSS**: Window styling နှင့် Positioning
* ✅ **JavaScript (ES6)**:
  * Variables (`const`, `let`), Functions, Arrow functions
  * Objects (`{ x: 1, y: 2 }`) နှင့် Arrays (`[1, 2, 3]`)
  * Event Listeners (`window.addEventListener('mousemove', ...)`)
  * ES6 Modules (`import * as THREE from 'three'`)

---

# ၇။ အကောင်းဆုံး လေ့လာသင်ယူနည်း လမ်းညွှန် (Pro Study Tips)

1. ✍️ **Code ကို ကိုယ်တိုင် ရိုက်နှိပ်ပါ (Don't just watch/copy)**:
   * Video သို့မဟုတ် Guide ကို ကြည့်ရုံသက်သက် မဟုတ်ဘဲ Code ကို ကိုယ်တိုင် လက်တွေ့ ရိုက်နှိပ် စမ်းသပ်ပါ။
2. 🧪 **တန်ဖိုးများကို ပြောင်းလဲ ကစားကြည့်ပါ (Break & Tweak)**:
   * ကိန်းဂဏန်းများ (ဥပမာ - Camera FOV `75` ကို `20` သို့မဟုတ် `120` ပြောင်းကြည့်ခြင်း၊ Material Roughness ကို ပြောင်းကြည့်ခြင်း) ကို ပြောင်းလဲ၍ ဘာဖြစ်သွားသည်ကို မျက်မြင် လေ့လာပါ။
3. 🧱 **Project ငယ်လေးများ ကိုယ်တိုင် ဖန်တီးပါ**:
   * သင်ခန်းစာ တစ်ခုပြီးတိုင်း သင်ယူခဲ့သော အသိပညာဖြင့် ကိုယ်ပိုင် 3D Scene ငယ်လေးတစ်ခု စမ်းသပ် ဆောက်ကြည့်ပါ။

---

# ၈။ အမြန်မှတ်စု (Lesson Memo)

| သဘောတရား | ရှင်းလင်းချက် |
| :--- | :--- |
| **WebGL** | GPU ပေါ်တွင် 2D/3D graphics ရေးဆွဲပေးသော Low-level Web API ဖြစ်သည်။ |
| **Three.js** | WebGL ကို အလွယ်တကူ သုံးနိုင်အောင် ဖန်တီးထားသော JavaScript 3D Library ဖြစ်သည်။ |
| **CPU vs GPU** | CPU သည် အလုပ်တစ်ခုပြီးမှတစ်ခု လုပ်ပြီး၊ GPU သည် အလုပ်သန်းပေါင်းများစွာကို တစ်ပြိုင်နက် (Parallel) လုပ်သည်။ |
| **Core Roadmap** | Basics $\to$ Classic Techniques $\to$ Advanced $\to$ Shaders $\to$ React Three Fiber |
| **Target Goal** | Interactive 3D Websites, Product Viewers, Creative Art နှင့် Web Games များ ဖန်တီးနိုင်ခြင်း။ |
