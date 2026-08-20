# ⚡ Three.js Journey - Lesson 02: What is WebGL and why use Three.js? (WebGL နှင့် Three.js နားလည်ခြင်း)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 02: What is WebGL and why use Three.js](https://threejs-journey.com/lessons/what-is-webgl-and-why-use-three-js)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity  
> **ချဉ်းကပ်မှုပုံစံ**: Medium / Balanced Deep Dive (ရိုးရှင်းသော ဥပမာများနှင့် လက်တွေ့ကျသော နှိုင်းယှဉ်ချက်များ)

---

## 📑 မာတိကာ (Table of Contents)

1. [မိတ်ဆက်နှင့် အောင်မြင်ကျော်ကြားသော Three.js လက်ရာများ (Showcase)](#၁-မိတ်ဆက်နှင့်-အောင်မြင်ကျော်ကြားသော-threejs-လက်ရာများ)
2. [WebGL ဆိုတာ ဘာလဲ? (What is WebGL?)](#၂-webgl-ဆိုတာ-ဘာလဲ)
   - တြိဂံများ (Triangles) နှင့် GPU ၏ စွမ်းအား
   - Shaders မိတ်ဆက် (Vertex Shader & Fragment Shader)
   - Native WebGL ဘာကြောင့် ရေးရခက်ခဲသလဲ?
3. [Three.js မှ ကူညီကယ်တင်ပုံ (Three.js to the rescue)](#၃-threejs-မှ-ကူညီကယ်တင်ပုံ)
   - Three.js ၏ မူလဖန်တီးသူ Mr.doob နှင့် သမိုင်းကြောင်း
   - Native WebGL နှင့် Three.js ကုဒ် နှိုင်းယှဉ်ချက်
4. [အခြား WebGL Library များနှင့် နှိုင်းယှဉ်ချက် (Other Libraries)](#၄-အခြား-webgl-library-များနှင့်-နှိုင်းယှဉ်ချက်)
   - Three.js vs Babylon.js vs Pixi.js vs PlayCanvas
5. [Web 3D ၏ အနာဂတ်: WebGPU အကြောင်း အကျဉ်း](#၅-web-3d-၏-အနာဂတ်-webgpu-အကြောင်း-အကျဉ်း)
6. [အမြန်ကြည့် မှတ်စုတို (Lesson 02 Memo)](#၆-အမြန်ကြည့်-မှတ်စုတို-lesson-02-memo)

---

# ၁။ မိတ်ဆက်နှင့် အောင်မြင်ကျော်ကြားသော Three.js လက်ရာများ

Three.js သည် ကမ္ဘာ့ထိပ်တန်း Brand များနှင့် Creative Developer များ၏ Portfolio များတွင် အသုံးအများဆုံး 3D Web Library ဖြစ်သည်။

### ထင်ရှားသော နမူနာ Showcase များ:
* 🚗 **[Bruno Simon Portfolio](https://bruno-simon.com)**: Three.js နှင့် Physics ပေါင်းစပ်၍ 3D ကားလေးကို မောင်းနှင်ကာ စူးစမ်းနိုင်သော နာမည်ကျော် Portfolio။
* 🍇 **Chartogne-Taillet**: စပျစ်ခြံနှင့် တောင်ကုန်းမြေမျက်နှာသွင်ပြင်ကို လက်တွေ့ဆန်သော 3D Terrain ဖြင့် ဖော်ပြထားသော ဝက်ဘ်ဆိုက်။
* 🛍️ **Apple / Porsche / Gucci**: ကုန်ပစ္စည်းများကို ၃၆၀ ဒီဂရီ အနီးကပ် လှည့်လည်ကြည့်ရှုနိုင်ပြီး အရောင်နှင့် ပစ္စည်းအမျိုးအစား စိတ်ကြိုက် ပြောင်းလဲနိုင်သော 3D Product Configurators များ။

---

# ၂။ WebGL ဆိုတာ ဘာလဲ? (What is WebGL?)

**WebGL (Web Graphics Library)** သည် Browser ၏ `<canvas>` element ပေါ်တွင် 2D နှင့် 3D Graphics များကို အလွန်လျင်မြန်သော အရှိန်နှုန်းဖြင့် ရေးဆွဲပေးသည့် **Low-level JavaScript API** ဖြစ်သည်။

```
[ HTML5 Canvas ] <──── [ WebGL API ] <──── [ GPU (Graphic Processing Unit) ]
```

---

### (က) တြိဂံများ (Triangles) နှင့် GPU ၏ စွမ်းအား

3D Graphics လောကတွင် မည်သည့် 3D Model မဆို (လူရုပ်၊ ကား၊ အဆောက်အအုံ၊ စက်လုံး) အားလုံးကို **တြိဂံ (Triangles)** ပေါင်း သန်းနှင့်ချီ ဆက်စပ်၍ တည်ဆောက်ထားခြင်း ဖြစ်သည်။

```
        Vertex 1 (ထိပ်မှတ်)
            /\
           /  \
          /    \   <── 3D မျက်နှာပြင်တစ်ခု (Triangle Face)
         /______\
Vertex 2         Vertex 3
```

* ဥပမာ - 3D Model တစ်ခုတွင် တြိဂံပေါင်း `1,000` ခု ပါဝင်လျှင် ထောင့်စွန်းမှတ် (Vertex) ပေါင်း `3,000` ခု ရှိမည်။
* **GPU ၏ Parallel Power**: CPU သည် ထိုအမှတ် ၃,၀၀၀ ကို တစ်ခုပြီးမှတစ်ခု တွက်ချက်ရသော်လည်း၊ GPU သည် Core ပေါင်း ထောင်နှင့်ချီ ပါဝင်သဖြင့် ထိုအမှတ် ၃,၀၀၀ စလုံး၏ နေရာကို **တစ်ပြိုင်နက်တည်း (One pass)** တွက်ချက်ပေးနိုင်သည်။
* အမှတ်များ နေရာကျသွားသည်နှင့် တစ်ပြိုင်နက် ထိုတြိဂံများအတွင်းရှိ Pixel သန်းပေါင်းများစွာကို အရောင်ခြယ်ပေးခြင်းကိုလည်း GPU က တစ်ပြိုင်နက်တည်း လုပ်ဆောင်ပေးသည်။

---

### (ခ) Shaders မိတ်ဆက် (Vertex Shader & Fragment Shader)

GPU ကို အမှတ်များ မည်သည့်နေရာတွင် ချရမည်၊ Pixel များကို မည်သည့်အရောင် ခြယ်ရမည်ဟု ညွှန်ကြားသည့် Program များကို **Shaders** ဟု ခေါ်ပြီး **GLSL (OpenGL Shading Language)** ဖြင့် ရေးသားရသည်:

1. **Vertex Shader (အမှတ်များ နေရာချခြင်း)**:
   - 3D space ထဲရှိ Vertex တိုင်း၏ $X, Y, Z$ Coordinate များကို တွက်ချက်၍ Screen ပေါ် မည်သည့်နေရာတွင် ပေါ်ရမည်ကို ဆုံးဖြတ်သည်။
2. **Fragment (Pixel) Shader (အရောင် ခြယ်သခြင်း)**:
   - တြိဂံမျက်နှာပြင်ပေါ်ရှိ Pixel တစ်ခုချင်းစီ၏ အရောင် (RGB + Alpha) ကို အလင်းရောင်၊ အရိပ်၊ Texture ပုံများနှင့် တွက်ချက်၍ ဆေးခြယ်ပေးသည်။

---

### (ဂ) Native WebGL ဘာကြောင့် ရေးရခက်ခဲသလဲ?

Native WebGL သည် GPU နှင့် အလွန်နီးကပ်သော Low-level ဖြစ်သောကြောင့် **ထိန်းချုပ်မှုနှင့် Performance အလွန်ကောင်းမွန်သော်လည်း ရေးသားရ အလွန်ခက်ခဲသည်**:

* ရိုးရိုး ၂ ဖက်မြင် တြိဂံပြားလေးတစ်ခု ဆွဲရန်အတွက်ပင် ကုဒ်စာကြောင်းရေ **၁၀၀ ကျော်** ရေးရသည်။
* အကယ်၍ 3D Camera, Perspective, မီးရောင် (Lights), Shadows, Materials များနှင့် 3D Model တင်သွင်းမှုများ ထည့်သွင်းလိုပါက ကုဒ်စာကြောင်းရေ ထောင်နှင့်ချီ ရှုပ်ထွေးစွာ ရေးသားရမည် ဖြစ်သည်။

---

# ၃။ Three.js မှ ကူညီကယ်တင်ပုံ (Three.js to the rescue)

**Three.js** သည် WebGL ၏ အပေါ်တွင် တည်ဆောက်ထားသော **Open-source JavaScript Library (MIT License)** ဖြစ်သည်။

```
┌─────────────────────────────────────────────────────────────┐
│                 Three.js (High-Level API)                   │
│   Scene, Camera, Mesh, Geometry, Material, Light, Controls  │
├─────────────────────────────────────────────────────────────┤
│                 WebGL (Low-Level Driver API)                │
│             Shaders, Buffers, Draw Calls, GLSL              │
├─────────────────────────────────────────────────────────────┤
│                    GPU (Hardware Graphics)                  │
└─────────────────────────────────────────────────────────────┘
```

### Three.js ၏ အကျိုးကျေးဇူးများ:
1. **ရိုးရှင်း မြန်ဆန်ခြင်း**: Shader များနှင့် Matrix သင်္ချာများကို ကိုယ်တိုင်ရေးရန် မလိုဘဲ ကုဒ်အနည်းငယ်ဖြင့် 3D Scene တစ်ခုကို ချက်ချင်း ဖန်တီးနိုင်သည်။
2. **WebGL နှင့် ဆက်လက် ထိတွေ့နိုင်ခြင်း**: လိုအပ်ပါက မိမိစိတ်ကြိုက် Custom Shader (GLSL) များကိုလည်း Three.js ထဲတွင် လွတ်လပ်စွာ ရေးသားအသုံးပြုနိုင်သည်။
3. **ဖန်တီးသူနှင့် Community**: ၂၀၁၀ ပြည့်နှစ်တွင် **Ricardo Cabello (aka Mr.doob)** မှ စတင် ဖန်တီးခဲ့ပြီး၊ ယနေ့အခါ ကမ္ဘာတစ်ဝှမ်းရှိ Developer ထောင်ပေါင်းများစွာက လစဉ် Update ပုံမှန် ပြုလုပ်ပေးနေသည်။

---

# ၄။ အခြား WebGL Library များနှင့် နှိုင်းယှဉ်ချက်

Three.js အပြင် အခြား လူသိများသော Web 3D/2D Engine များလည်း ရှိပါသည်:

| Library / Engine | အဓိက အားသာချက် | သင့်တော်သော အသုံးပြုမှု |
| :--- | :--- | :--- |
| **`Three.js`** ⭐ | လေ့လာရ အလွယ်ကူဆုံး၊ Community အကြီးဆုံး၊ Creative Web နှင့် 3D Website များအတွက် စံသတ်မှတ်ချက် | Creative 3D Websites, Portfolios, Product Configurators |
| **`Babylon.js`** | Microsoft မှ ထောက်ပံ့ထားပြီး Physics, Audio, Collision, GUI စသည့် Game Engine feature များ အပြည့်အစုံပါဝင် | Web 3D Games, Complex Simulators, Enterprise Tools |
| **`PlayCanvas`** | Cloud-based Visual Editor ပါဝင်သော Web-first Game Engine | Collaborative 3D Games, Interactive Arch-viz |
| **`Pixi.js`** | **2D Graphics သီးသန့်** အတွက် အလွန်မြန်ဆန်သော WebGL Engine | 2D Games, Rich 2D Web Animations, Canvas Banners |
| **`A-Frame`** | HTML Tag ပုံစံဖြင့် ရေးသားနိုင်သော WebXR / VR Library | Quick VR/AR Prototypes, WebXR Experiences |

> 💡 **အကြံပြုချက်**: Creative Web Development နှင့် 3D Visual ပရောဂျက်များအတွက် **Three.js** ကို ဦးစွာ ကျွမ်းကျင်အောင် လေ့လာခြင်းသည် အကောင်းဆုံးနှင့် အထိရောက်ဆုံး လမ်းစ ဖြစ်ပါသည်။

---

# ၅။ Web 3D ၏ အနာဂတ်: WebGPU အကြောင်း အကျဉ်း

* **WebGPU ဆိုတာ ဘာလဲ?**:
  * WebGL ၏ မျိုးဆက်သစ် ဆက်ခံသူအဖြစ် W3C မှ စံသတ်မှတ်ထားသော နောက်ဆုံးပေါ် Modern Graphics API ဖြစ်သည်။ (Vulkan, Metal, DirectX 12 ကဲ့သို့သော ခေတ်မီ GPU Architecture များနှင့် တိုက်ရိုက် ကိုက်ညီသည်)။
* **Compute Shaders**: Graphics သာမက AI / Machine Learning နှင့် Physics တွက်ချက်မှုများကိုပါ GPU ပေါ်တွင် တိုက်ရိုက် လုပ်ဆောင်နိုင်သည်။
* **Three.js နှင့် WebGPU**: Three.js သည် WebGPU အတွက် Node-based Material စနစ်နှင့် `WebGPURenderer` ကို အဆင်သင့် ပံ့ပိုးပေးနေပြီ ဖြစ်သဖြင့် Three.js ကို လေ့လာထားခြင်းဖြင့် အနာဂတ် WebGPU သို့လည်း အလွယ်တကူ ကူးပြောင်းနိုင်မည် ဖြစ်သည်။

---

# ၆။ အမြန်ကြည့် မှတ်စုတို (Lesson 02 Memo)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        LESSON 02 CHEAT SHEET                           │
├────────────────────────────────────────────────────────────────────────┤
│ • WebGL      : Browser တွင် GPU စွမ်းအားဖြင့် တြိဂံများကို ရေးဆွဲပေးသော API │
│ • GPU Power  : တြိဂံနှင့် Pixel သန်းပေါင်းများစွာကို တစ်ပြိုင်နက် တွက်ချက်နိုင်စွမ်း │
│ • Shaders    : Vertex Shader (အမှတ်နေရာချ) + Fragment Shader (အရောင်ခြယ်)│
│ • Three.js   : WebGL ၏ အခက်အခဲများကို ဖြေရှင်းပေးသော JavaScript 3D Library│
│ • Mr.doob    : Three.js ၏ မူလဖန်တီးသူ (Ricardo Cabello)                │
│ • Future     : WebGPU သည် WebGL ထက် ပိုမိုစွမ်းအားမြင့်သော မျိုးဆက်သစ်ဖြစ်သည်│
└────────────────────────────────────────────────────────────────────────┘
```
