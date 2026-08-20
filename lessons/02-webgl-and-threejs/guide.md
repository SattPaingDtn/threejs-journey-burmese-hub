# ⚡ Three.js Journey - Lesson 02: What is WebGL and why use Three.js?

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 02: What is WebGL and why use Three.js](https://threejs-journey.com/lessons/what-is-webgl-and-why-use-three-js)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် စနစ်တကျ ပြုစုသူ**: Antigravity  
> **အဆင့်**: အခြေခံ (Beginner Friendly)

---

## 🎯 ဤသင်ခန်းစာ၏ အဓိက ရည်ရွယ်ချက်
3D ရုပ်ပုံများကို ကွန်ပျူတာက တြိဂံ (Triangles) များဖြင့် မည်သို့ တည်ဆောက်ပုံ၊ Shaders (Vertex & Fragment) ၏ အခန်းကဏ္ဍ၊ Native WebGL အစား Three.js ကို အဘယ်ကြောင့် ရွေးချယ် အသုံးပြုရသည်ကို ရှင်းလင်းစွာ သဘောပေါက်စေရန် ဖြစ်ပါသည်။

---

## 💡 Mental Model: 3D Graphics တည်ဆောက်ပုံ

3D လောကတွင် မည်သည့် အရာဝတ္ထုမဆို (စက်လုံး၊ ကား၊ လူ၊ အဆောက်အအုံ) အားလုံးကို **တြိဂံ (Triangles)** များဖြင့်သာ ဆက်စပ် တည်ဆောက်ထားသည်:

```
        Vertex 1 (ထိပ်မှတ်)
            /\
           /  \
          /    \   <── မျက်နှာပြင် (Triangle Face)
         /______\
Vertex 2         Vertex 3
```

1. **ထိပ်မှတ်များ (Vertices)**: 3D Space ထဲရှိ အမှတ် $X, Y, Z$ Coordinate များ။
2. **တြိဂံမျက်နှာပြင် (Face)**: အမှတ် ၃ ခုကို ဆက်စပ်လိုက်သည့်အခါ မျက်နှာပြင်တစ်ခု ဖြစ်ပေါ်လာသည်။
3. **အရောင်ဆေးခြယ်ခြင်း (Pixel Coloring)**: ထိုမျက်နှာပြင်အတွင်းရှိ Pixel များကို အလင်း/အရိပ် တွက်ချက်၍ ဆေးခြယ်သည်။

---

## 🔑 အဓိက သဘောတရားများ

### ၁။ Shaders ဆိုတာ ဘာလဲ? (GPU သို့ ညွှန်ကြားချက်များ)
GPU ပေါ်တွင် တိုက်ရိုက် Run သော ပရိုဂရမ်ငယ်များကို **Shaders** ဟု ခေါ်ပြီး အမျိုးအစား (၂) မျိုး ရှိသည်:

* 📍 **Vertex Shader**: 3D အမှတ် (Vertices) များကို Screen ပေါ် မည်သည့်နေရာတွင် ချရမည်ကို တွက်ချက်သည်။
* 🎨 **Fragment (Pixel) Shader**: တြိဂံအတွင်းရှိ Pixel တစ်ခုချင်းစီကို မည်သည့်အရောင် (RGB) ခြယ်ရမည်ကို တွက်ချက်သည်။

---

### ၂။ Native WebGL နှင့် Three.js နှိုင်းယှဉ်ချက်

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

* **Native WebGL ၏ အခက်အခဲ**: ရိုးရိုး တြိဂံပြားလေးတစ်ခု ဆွဲရန်အတွက်ပင် ကုဒ်စာကြောင်းရေ **၁၀၀ ကျော်** ရေးသားရသည်။
* **Three.js ၏ အားသာချက်**: ရှုပ်ထွေးသော သင်္ချာနှင့် GPU Pipeline များကို ကွယ်ဝှက်ပေးကာ စာကြောင်းအနည်းငယ်ဖြင့် လှပသော 3D Scene များကို ဖန်တီးစေနိုင်သည်။

```javascript
// Three.js ဖြင့် ရေးသားရပုံ ရိုးရှင်းမှု:
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

---

### ၃။ အခြား WebGL Libraries များနှင့် နှိုင်းယှဉ်ချက်

| Library | အဓိက အားသာချက် | သင့်တော်သော နေရာ |
| :--- | :--- | :--- |
| **`Three.js`** ⭐ | လေ့လာရ အလွယ်ကူဆုံး၊ Community အကြီးဆုံး | Creative 3D Websites, Product Configurators, Portfolios |
| **`Babylon.js`** | Microsoft ကျောထောက်နောက်ခံပြုထားပြီး Physics, Audio, GUI ဂိမ်းစနစ်များ ပါဝင် | Web 3D Games, Enterprise Simulators |
| **`Pixi.js`** | **2D Graphics သီးသန့်** အလွန်မြန်ဆန်သော WebGL Engine | 2D Games, Canvas Rich Animations |
| **`PlayCanvas`** | Cloud Editor ပါဝင်သော Web Game Engine | Collaborative 3D Games |

---

## 📋 အမြန်မှတ်စု (Lesson 02 Memo)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        LESSON 02 CHEAT SHEET                           │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Triangles : 3D Object အားလုံးကို တြိဂံများ ဆက်စပ်၍ တည်ဆောက်ထားသည်     │
│ 2. Vertex    : 3D အာကာသထဲရှိ ထောင့်စွန်း အမှတ် (X, Y, Z)               │
│ 3. Shaders   : Vertex Shader (အမှတ်နေရာချ) + Fragment Shader (အရောင်ခြယ်)│
│ 4. Three.js  : WebGL ကို အလွယ်တကူ ရေးသားနိုင်အောင် ကူညီပေးသည့် စံ Library│
└────────────────────────────────────────────────────────────────────────┘
```
