# 📸 Three.js Journey - Lesson 07: Cameras (Master Deep-Dive Study Guide & Memo)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 07: Cameras](https://threejs-journey.com/lessons/cameras)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity  
> **ရည်ရွယ်ချက်**: Three.js ရှိ Camera System အားလုံး၊ အတွင်းပိုင်း 3D Graphics Pipeline၊ Projection Matrix သင်္ချာသဘောတရားများ၊ ကင်မရာ (၆) မျိုး၏ အသေးစိတ် အလုပ်လုပ်ပုံ၊ Custom Controller တည်ဆောက်ပုံနှင့် OrbitControls ၏ Advanced Configuration များကို အခြေခံမှ Master အဆင့်အထိ နားလည်သဘောပေါက်စေရန် ပြုစုထားသော Deep-Dive လမ်းညွှန်စာအုပ် ဖြစ်ပါသည်။

---

## 📑 မာတိကာ အကျဉ်း (Table of Contents)

- [📸 Three.js Journey - Lesson 07: Cameras (Master Deep-Dive Study Guide \& Memo)](#-threejs-journey---lesson-07-cameras-master-deep-dive-study-guide--memo)
  - [📑 မာတိကာ အကျဉ်း (Table of Contents)](#-မာတိကာ-အကျဉ်း-table-of-contents)
- [၁။ 3D Graphics Pipeline နှင့် Camera Space Transformations](#၁-3d-graphics-pipeline-နှင့်-camera-space-transformations)
    - [အဆင့်ဆင့် ရှင်းလင်းချက်:](#အဆင့်ဆင့်-ရှင်းလင်းချက်)
- [၂။ THREE.Camera (Abstract Base Class) အသေးစိတ်](#၂-threecamera-abstract-base-class-အသေးစိတ်)
    - [အဓိက Properties နှင့် Methods များ:](#အဓိက-properties-နှင့်-methods-များ)
- [၃။ Camera အမျိုးအစား (၆) မျိုး Deep Dive](#၃-camera-အမျိုးအစား-၆-မျိုး-deep-dive)
  - [၃.၁ PerspectiveCamera (Deep Dive)](#၃၁-perspectivecamera-deep-dive)
    - [(၁) Field of View (FOV) အသေးစိတ်](#၁-field-of-view-fov-အသေးစိတ်)
    - [(၂) Near \& Far Clipping Planes နှင့် Z-Fighting သင်္ချာ](#၂-near--far-clipping-planes-နှင့်-z-fighting-သင်္ချာ)
      - [Z-Fighting ဖြစ်ရခြင်း၏ အတွင်းပိုင်း အကြောင်းရင်း (Non-Linear Depth Buffer Math):](#z-fighting-ဖြစ်ရခြင်း-အတွင်းပိုင်း-အကြောင်းရင်း-non-linear-depth-buffer-math)
      - [✅ အကောင်းဆုံး ဖြေရှင်းနည်းများ (Best Practices):](#-အကောင်းဆုံး-ဖြေရှင်းနည်းများ-best-practices)
    - [(၃) `camera.updateProjectionMatrix()` ဘာကြောင့် ခေါ်ရသနည်း?](#၃-cameraupdateprojectionmatrix-ဘာကြောင့်-ခေါ်ရသနည်း)
  - [၃.၂ OrthographicCamera (Deep Dive)](#၃၂-orthographiccamera-deep-dive)
    - [Aspect Ratio Distortion ကို သင်္ချာနည်းဖြင့် ဖြေရှင်းခြင်း:](#aspect-ratio-distortion-ကို-သင်္ချာနည်းဖြင့်-ဖြေရှင်းခြင်း)
      - [Window Resize အတွက် Orthographic Pattern:](#window-resize-အတွက်-orthographic-pattern)
  - [၃.၃ ArrayCamera (Deep Dive)](#၃၃-arraycamera-deep-dive)
    - [လက်တွေ့ ကုဒ်နမူနာ (4-Way Split Screen):](#လက်တွေ့-ကုဒ်နမူနာ-4-way-split-screen)
  - [၃.၄ StereoCamera (Deep Dive)](#၃၄-stereocamera-deep-dive)
  - [၃.၅ CubeCamera (Deep Dive)](#၃၅-cubecamera-deep-dive)
    - [Real-time Reflection ပြုလုပ်ပုံ ကုဒ်နမူနာ:](#real-time-reflection-ပြုလုပ်ပုံ-ကုဒ်နမူနာ)
- [၄။ Custom Camera Controls ဖန်တီးခြင်း (Math \& Physics)](#၄-custom-camera-controls-ဖန်တီးခြင်း-math--physics)
    - [အဆင့် (၁): Mouse Coordinates ကို Unit Range သို့ ပြောင်းခြင်း (-0.5 မှ +0.5)](#အဆင့်-၁-mouse-coordinates-ကို-unit-range-သို့-ပြောင်းခြင်း--05-မှ-05)
    - [အဆင့် (၂): Trigonometry ဖြင့် 360° စက်ဝိုင်းပတ် Orbit ပြုလုပ်ခြင်း](#အဆင့်-၂-trigonometry-ဖြင့်-360-စက်ဝိုင်းပတ်-orbit-ပြုလုပ်ခြင်း)
    - [အဆင့် (၃): Lerp (Linear Interpolation) ဖြင့် Smooth Inertia ထည့်သွင်းခြင်း](#အဆင့်-၃-lerp-linear-interpolation-ဖြင့်-smooth-inertia-ထည့်သွင်းခြင်း)
- [၅။ Three.js Built-in Controls Masterclass](#၅-threejs-built-in-controls-masterclass)
    - [Built-in Controls နှိုင်းယှဉ်ချက် ဇယား](#built-in-controls-နှိုင်းယှဉ်ချက်-ဇယား)
    - [OrbitControls Advanced Configuration Guide](#orbitcontrols-advanced-configuration-guide)
    - [PointerLockControls (FPS Game Controller အပြည့်အစုံ)](#pointerlockcontrols-fps-game-controller-အပြည့်အစုံ)
- [၆။ Common Pitfalls, Pro-Tips \& Performance Optimization](#၆-common-pitfalls-pro-tips--performance-optimization)
    - [❌ အဖြစ်များဆုံး အမှား (၅) မျိုးနှင့် ဖြေရှင်းနည်း:](#-အဖြစ်များဆုံး-အမှား-၅-မျိုးနှင့်-ဖြေရှင်းနည်း)
- [၇။ Master Cheat Sheet \& Code Snippets](#၇-master-cheat-sheet--code-snippets)

---

# ၁။ 3D Graphics Pipeline နှင့် Camera Space Transformations

Three.js တွင် 3D Object တစ်ခုကို 2D ဖန်သားပြင် (Canvas) ပေါ်သို့ ပြသနိုင်ရန်အတွက် အဆင့်ဆင့်သော Matrix Transformation များကို ဖြတ်သန်းရပါသည်။ ကင်မရာ၏ အလုပ်လုပ်ပုံကို အမှန်တကယ် နားလည်ရန် ဤ Pipeline ကို သိရှိထားရန် လိုအပ်ပါသည်။

```
┌──────────────┐     World Matrix      ┌──────────────┐      View Matrix      ┌──────────────┐
│ Object Space │ ────────────────────> │  World Space │ ────────────────────> │  View Space  │
│(Local Coords)│ (position/rot/scale)  │ (Scene Origin│  (Camera Inversion)   │(Camera Origin│
└──────────────┘                       └──────────────┘                       └──────────────┘
                                                                                      │
                                                                                      │ Projection
                                                                                      │ Matrix
                                                                                      ▼
┌──────────────┐      Viewport/Screen  ┌──────────────┐      Perspective      ┌──────────────┐
│ Screen Space │ <──────────────────── │  NDC Space   │ <──────────────────── │  Clip Space  │
│ (2D Pixels)  │    (Renderer size)    │ (-1 to +1)   │       Division        │ (4D Homogen) │
└──────────────┘                       └──────────────┘                       └──────────────┘
```

### အဆင့်ဆင့် ရှင်းလင်းချက်:

1. **Object / Local Space**: 3D Object တစ်ခုချင်းစီ၏ ကိုယ်ပိုင် Coordinate System ဖြစ်သည် (ဥပမာ - Cube တစ်ခု၏ အလယ်ဗဟိုသည် `(0,0,0)` ဖြစ်ခြင်း)။
2. **World Space**: Scene တစ်ခုလုံး၏ ပင်မ Coordinate System ဖြစ်သည်။ Object ၏ `position`, `rotation`, `scale` တို့ကို ပေါင်းစပ်ထားသော **`ModelMatrix` (သို့မဟုတ် `matrixWorld`)** ဖြင့် Local Space မှ World Space သို့ ပြောင်းလဲပေးသည်။
3. **View Space (Eye Space / Camera Space)**:
   > 💡 **အရေးကြီးသော သဘောတရား**: 3D Graphics တွင် ကင်မရာသည် အမှန်တကယ် ရွေ့လျားခြင်း မရှိပါ။ Scene တစ်ခုလုံးကို ကင်မရာနှင့် ဆန့်ကျင်ဘက်သို့ ရွှေ့ပစ်ခြင်း ဖြစ်ပါသည်။  
   > ဥပမာ - ကင်မရာကို ရှေ့သို့ 5 unit ရွှေ့လျှင်၊ ကမ္ဘာလောကကြီး (Scene) တစ်ခုလုံးကို နောက်သို့ -5 unit ဆွဲယူလိုက်ခြင်း ဖြစ်ပါသည်။  
   > ဤတွက်ချက်မှုကို **`ViewMatrix` (သို့မဟုတ် `matrixWorldInverse`)** က လုပ်ဆောင်ပေးသည်။
4. **Clip Space & Projection Matrix**:
   - `ProjectionMatrix` သည် 3D View Space ထဲရှိ အရာများကို 4D Homogeneous Coordinates အဖြစ်သို့ ပြောင်းပေးပြီး ကင်မရာမြင်ကွင်း (Frustum) အပြင်ဘက်သို့ ရောက်နေသော Vertex များကို ဖြတ်ထုတ်ပစ်သည် (Clipping)။
5. **NDC (Normalized Device Coordinates)**:
   - $X, Y, Z$ တန်ဖိုးအားလုံးကို `[-1, 1]` ကြားသို့ Perspective Division ($X/W, Y/W, Z/W$) ဖြင့် Normalize ပြုလုပ်ပေးသည်။
6. **Screen Space**:
   - နောက်ဆုံးတွင် WebGL Renderer က `[-1, 1]` NDC Coordinate များကို Canvas ၏ Pixel Coordinates `(width x height)` အဖြစ်သို့ ပြောင်းလဲ၍ Display ပေါ်သို့ ရေးဆွဲပေးသည်။

---

# ၂။ THREE.Camera (Abstract Base Class) အသေးစိတ်

Three.js တွင် `Camera` class သည် `Object3D` ကို အမွေဆက်ခံ (inherit) ထားသော **Abstract Base Class** ဖြစ်သည်။

```
THREE.Object3D
   └── THREE.Camera
         ├── THREE.PerspectiveCamera
         ├── THREE.OrthographicCamera
         ├── THREE.ArrayCamera
         ├── THREE.StereoCamera
         └── THREE.CubeCamera
```

### အဓိက Properties နှင့် Methods များ:

* **`matrixWorldInverse`**: ကင်မရာ၏ World Matrix ကို ပြောင်းပြန်လှန်ထားသော View Matrix ဖြစ်သည်။
* **`projectionMatrix`**: ကင်မရာ၏ အမျိုးအစား (Perspective/Orthographic) အလိုက် မြင်ကွင်းကို တွက်ချက်ပေးသော 4x4 Matrix ဖြစ်သည်။
* **`camera.lookAt(targetVector)`**:
  - ကင်မရာကို သတ်မှတ်ထားသော Vector3 နေရာဆီသို့ တိုက်ရိုက် ဦးတည်မျက်နှာမူစေသည်။
  - **အတွင်းပိုင်း သင်္ချာ**: ကင်မရာ၏ လက်ရှိ Position နှင့် Target Position ကြား Forward Vector $\vec{F} = \text{normalize}(\vec{T} - \vec{P})$ ကို ရှာပြီး Up Vector နှင့် Cross Product လုပ်ကာ Rotation Matrix ကို တည်ဆောက်ပေးသည်။
* **`camera.up` Vector (Default: `(0, 1, 0)`)**:
  - ကင်မရာအတွက် "အပေါ်ဘက်" (World Up Direction) သည် မည်သည့်ဘက်ဖြစ်သည်ကို သတ်မှတ်ပေးသည်။
  - အကယ်၍ ကင်မရာကို ဒေါင်လိုက် တည့်တည့်အပေါ် (Top-down) သို့မဟုတ် တည့်တည့်အောက် (Bottom-up) `(0, 10, 0)` မှ `(0, 0, 0)` ဆီသို့ `lookAt` လုပ်ပါက **Gimbal Lock** ဖြစ်ပြီး ကင်မရာ လည်ထွက်သွားတတ်သည်။
  - **ဖြေရှင်းနည်း**: ထိုသို့ Top-down ကြည့်လိုပါက `camera.up.set(0, 0, -1)` ဟု Up vector ကို ပြောင်းပေးရပါမည်။

---

# ၃။ Camera အမျိုးအစား (၆) မျိုး Deep Dive

---

## ၃.၁ PerspectiveCamera (Deep Dive)

လက်တွေ့ လူ့မျက်လုံး (သို့မဟုတ်) ရုပ်ရှင် ကင်မရာများ၏ သဘာဝအတိုင်း အနီးရှိအရာများ ကြီးမားပြီး အဝေးရှိအရာများ သေးငယ်သွားသော စနစ်ဖြစ်သည်။

```javascript
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
```

```
               Viewing Frustum (Truncated Pyramid)
                     Near Plane
                     ┌───────┐
                    /│       │\
                   / └───────┘ \
                  /             \
    Camera       /               \
    Origin (0) ──                 ── Far Plane
                 \               /   ┌───────────────┐
                  \             /    │               │
                   \ ┌───────┐ /     │               │
                    \│       │/      └───────────────┘
                     └───────┘
```

### (၁) Field of View (FOV) အသေးစိတ်
Three.js တွင် FOV သည် **Vertical Field of View (ဒေါင်လိုက် မြင်ကွင်းထောင့်)** ကို ဒီဂရီဖြင့် ကိုယ်စားပြုသည်။

$$\tan\left(\frac{\text{FOV}_{\text{horizontal}}}{2}\right) = \text{aspect} \times \tan\left(\frac{\text{FOV}_{\text{vertical}}}{2}\right)$$

* **FOV နိမ့်ခြင်း (15° - 35°)**: Telephoto / Zoom-in effect ဖြစ်သည်။ မြင်ကွင်းကျဉ်းပြီး အရာဝတ္ထုများ ပြားကပ်သွားသလို ခံစားရစေသည်။
* **FOV ပုံမှန် (45° - 75°)**: လူ့မျက်လုံး မြင်ကွင်းနှင့် အနီးစပ်ဆုံး ဖြစ်သည်။ Standard 3D Scene များအတွက် အသင့်တော်ဆုံးဖြစ်သည်။
* **FOV မြင့်ခြင်း (90° - 120°)**: Wide-angle / Fisheye effect ဖြစ်သည်။ ဘေးဘောင်များ ဆွဲဆန့်ခံရပြီး အရှိန်အဟုန် မြန်ဆန်သော ခံစားချက် (FPS game speed sensation) ကို ပေးသည်။

---

### (၂) Near & Far Clipping Planes နှင့် Z-Fighting သင်္ချာ

ကင်မရာ Frustum ၏ ရှေ့ဆုံးမျက်နှာပြင်သည် `near` ဖြစ်ပြီး၊ နောက်ဆုံးမျက်နှာပြင်သည် `far` ဖြစ်သည်။

> ⚠️ **Z-Fighting ဆိုသည်မှာ အဘယ်နည်း?**  
> 3D Scene ထဲတွင် မျက်နှာပြင် (Polygon/Mesh) (၂) ခုသည် နေရာအကွာအဝေး အလွန်နီးကပ်စွာ ထပ်နေသည့်အခါ မည်သည့်မျက်နှာပြင်က ရှေ့မှာရှိပြီး မည်သည့်မျက်နှာပြင်က နောက်မှာရှိသည်ကို GPU က မခွဲခြားနိုင်တော့ဘဲ ဖန်သားပြင်ပေါ်တွင် တဖျတ်ဖျတ် လုပေါ်နေသည့် Visual Glitch ဖြစ်သည်။

#### Z-Fighting ဖြစ်ရခြင်း၏ အတွင်းပိုင်း အကြောင်းရင်း (Non-Linear Depth Buffer Math):
WebGL Depth Buffer တွင် Depth $Z_{\text{ndc}}$ တန်ဖိုးကို သိမ်းဆည်းရာတွင် Linear (မျဉ်းဖြောင့်) အတိုင်း မသိမ်းဘဲ $1/Z$ (Perspective Division) အတိုင်း သိမ်းဆည်းပါသည်:

$$Z_{\text{ndc}} = \frac{\text{far} + \text{near}}{\text{far} - \text{near}} + \frac{1}{Z_{\text{view}}} \left( \frac{-2 \times \text{far} \times \text{near}}{\text{far} - \text{near}} \right)$$

* **ရလဒ်**: Depth Buffer ၏ Precision (တိကျမှု) 90% ကျော်သည် ကင်မရာနှင့် အနီးဆုံး `near` ပတ်ဝန်းကျင်တွင်သာ စုပြုံနေပြီး၊ အဝေးသို့ ရောက်သွားသည်နှင့် တိကျမှု သိသိသာသာ ထိုးကျသွားပါသည်။
* အကယ်၍ သင်သည် `near: 0.0001` နှင့် `far: 100000` ဟု ထားလိုက်ပါက `near` တန်ဖိုး သေးငယ်လွန်းသဖြင့် Precision အားလုံး နားတွင် ကုန်သွားပြီး အဝေးရှိ Object များသည် Z-fighting ပြဿနာ ချက်ချင်း ကြုံတွေ့ရပါမည်။

```
Depth Precision ဖြန့်ကျက်ပုံ:
Near [|||||||||||||||||||||||||                  ] Far
     ^--- Precision 90% သည် ဤနားတွင်သာရှိသည်
```

#### ✅ အကောင်းဆုံး ဖြေရှင်းနည်းများ (Best Practices):
1. **သင့်တင့်သော တန်ဖိုး သတ်မှတ်ပါ**: `near: 0.1`, `far: 100` သို့မဟုတ် Scene အရွယ်အစားအလိုက် အနီးဆုံးနှင့် အဝေးဆုံးကို အတတ်နိုင်ဆုံး ကျဉ်းကျဉ်းထားပါ။
2. **Logarithmic Depth Buffer အသုံးပြုခြင်း**: အကယ်၍ Universe / Space Simulation ကဲ့သို့ မဖြစ်မနေ အလွန်ကြီးမားသော `far` နှင့် အလွန်သေးငယ်သော `near` လိုအပ်ပါက WebGLRenderer တွင် `logarithmicDepthBuffer: true` ကို ဖွင့်သုံးနိုင်ပါသည်:
```javascript
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    logarithmicDepthBuffer: true // Depth precision ကို logarithm ဖြင့် ညီမျှစွာ ဖြန့်ပေးသည်
})
```

---

### (၃) `camera.updateProjectionMatrix()` ဘာကြောင့် ခေါ်ရသနည်း?

Three.js တွင် Performance ကောင်းမွန်စေရန်အတွက် `camera.fov`, `camera.aspect`, `camera.near`, `camera.far` စသည့် Parameter များကို ပြောင်းလဲလိုက်ရုံဖြင့် `projectionMatrix` ကို Frame တိုင်း အလိုအလျောက် ပြန်မတွက်ပါ။

ထို့ကြောင့် ၎င်းတန်ဖိုးများကို ပြောင်းလဲပြီးတိုင်း Matrix အသစ် ပြန်လည်တွက်ချက်ရန် **`camera.updateProjectionMatrix()`** ကို မဖြစ်မနေ ခေါ်ပေးရပါသည်:

```javascript
// Window Resize ဖြစ်သည့်အခါ အမြဲသုံးရသော Pattern
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // 1. Aspect ratio ပြောင်းခြင်း
    camera.aspect = sizes.width / sizes.height

    // 2. Projection Matrix အသစ်ပြန်တွက်ရန် ခေါ်ပေးခြင်း
    camera.updateProjectionMatrix()

    // 3. Renderer size update လုပ်ခြင်း
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```

---

## ၃.၂ OrthographicCamera (Deep Dive)

Orthographic Camera သည် Perspective (အကွာအဝေးကြောင့် သေးသွားခြင်း) မရှိဘဲ အရာအားလုံးကို မျဉ်းပြိုင် (Parallel Projection) အတိုင်း Render လုပ်ပေးသော ကင်မရာ ဖြစ်သည်။

```javascript
const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
```

```
               Orthographic Frustum (Box / Cuboid)
               ┌───────────────────────────┐
               │                           │
Camera ───────>│           Scene           │ (All rays are parallel)
Origin         │                           │
               └───────────────────────────┘
```

### Aspect Ratio Distortion ကို သင်္ချာနည်းဖြင့် ဖြေရှင်းခြင်း:
Orthographic Camera ၏ Frustum အကျယ်သည် `(right - left)` ဖြစ်ပြီး အမြင့်သည် `(top - bottom)` ဖြစ်သည်။

အကယ်၍ Canvas သည် `800 x 600` (Aspect Ratio = 1.333) ဖြစ်နေချိန်တွင် `left: -1, right: 1, top: 1, bottom: -1` ဟု ထားပါက ကင်မရာမြင်ကွင်းသည် စတုရန်းဖြစ်နေသော်လည်း Screen က ထောင့်မှန်စတုဂံဖြစ်နေ၍ Object များ အလျားလိုက် ဆွဲဆန့် (Stretched) ခံရပါမည်။

```javascript
const sizes = { width: window.innerWidth, height: window.innerHeight }
const aspectRatio = sizes.width / sizes.height

// Frustum ၏ အမြင့်ကို 2 unit (top: 1, bottom: -1) အဖြစ် သတ်မှတ်ထားလျှင်
// အကျယ်ကို aspect ratio ဖြင့် ချိန်ညှိရမည်
const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio, // left
     1 * aspectRatio, // right
     1,               // top
    -1,               // bottom
     0.1,             // near
     100              // far
)
```

#### Window Resize အတွက် Orthographic Pattern:
```javascript
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    const aspectRatio = sizes.width / sizes.height

    camera.left = -1 * aspectRatio
    camera.right = 1 * aspectRatio
    camera.top = 1
    camera.bottom = -1

    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})
```

---

## ၃.၃ ArrayCamera (Deep Dive)

`ArrayCamera` သည် Canvas တစ်ခုတည်းတွင် Scene တစ်ခုတည်းကို မတူညီသော ကင်မရာထောင့်ပေါင်းစုံဖြင့် **Single Render Pass** အဖြစ် ထိရောက်စွာ Render လုပ်နိုင်သော ကင်မရာ ဖြစ်သည်။

```
┌─────────────────────────┐
│       Canvas (100%)     │
│  ┌──────────┬──────────┐│
│  │ Camera 1 │ Camera 2 ││  <- Split Screen Multiplayer
│  ├──────────┼──────────┤│
│  │ Camera 3 │ Camera 4 ││  <- CAD Multi-angle view
│  └──────────┴──────────┘│
└─────────────────────────┘
```

### လက်တွေ့ ကုဒ်နမူနာ (4-Way Split Screen):
```javascript
const AMOUNT = 2 // 2x2 = 4 sub-cameras
const subCameras = []

for (let x = 0; x < AMOUNT; x++) {
    for (let y = 0; y < AMOUNT; y++) {
        const subCamera = new THREE.PerspectiveCamera(40, (sizes.width / AMOUNT) / (sizes.height / AMOUNT), 0.1, 100)
        
        // Normalized Viewport: Vector4(x, y, width, height) - တန်ဖိုး 0 မှ 1 ကြား
        subCamera.viewport = new THREE.Vector4(
            x / AMOUNT,
            y / AMOUNT,
            1 / AMOUNT,
            1 / AMOUNT
        )
        
        // ထောင့်တစ်ခုချင်းစီအလိုက် ကင်မရာနေရာ ချထားခြင်း
        subCamera.position.x = (x === 0 ? -3 : 3)
        subCamera.position.y = (y === 0 ? -3 : 3)
        subCamera.position.z = 3
        subCamera.lookAt(0, 0, 0)
        subCamera.updateProjectionMatrix()

        subCameras.push(subCamera)
    }
}

// ArrayCamera တည်ဆောက်ခြင်း
const camera = new THREE.ArrayCamera(subCameras)
scene.add(camera)
```

---

## ၃.၄ StereoCamera (Deep Dive)

`StereoCamera` သည် လူ့မျက်လုံး ၂ လုံးကဲ့သို့ ဘယ်/ညာ ကင်မရာ ၂ ခုဖြင့် Render လုပ်ပြီး သဘာဝကျသော အတိမ်အနက် (Stereoscopic Depth / Parallax) ကို ဖန်တီးပေးသည်။

```
       Eye Separation (IPD: ~64mm)
            ┌───┬───┐
       Left │ 👁️ │ 👁️ │ Right
       Cam  └───┴───┘ Cam
             \     /
              \   /
               \ /
           Convergence (ဆုံချက်မှတ်)
```

* **`camera.eyeSep` (Interpupillary Distance)**: မျက်လုံးနှစ်လုံးကြား အကွာအဝေး (Default: `0.064` မီတာ သို့မဟုတ် 64mm)။
* **အသုံးပြုပုံ**: VR Headset (WebXR) များ၊ Google Cardboard နှင့် Anaglyph (Red/Cyan မျက်မှန်သုံး 3D Effect) များအတွက် သုံးသည်။

---

## ၃.၅ CubeCamera (Deep Dive)

`CubeCamera` သည် ၎င်းတည်ရှိရာ နေရာမှ အရပ် ၆ မျက်နှာလုံးကို $90^\circ$ FOV ရှိသော Perspective Camera ၆ လုံးဖြင့် ဖမ်းယူပြီး Cube Texture တစ်ခုအဖြစ် ပြုလုပ်ပေးသည်။

```
              ┌─────────┐
              │ +Y (Top)│
    ┌─────────┼─────────┼─────────┬─────────┐
    │-X (Left)│+Z(Front)│+X(Right)│-Z (Back)│
    └─────────┼─────────┼─────────┴─────────┘
              │-Y (Btm) │
              └─────────┘
```

### Real-time Reflection ပြုလုပ်ပုံ ကုဒ်နမူနာ:
```javascript
// 1. Cube Render Target ဖန်တီးခြင်း
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter
})

// 2. CubeCamera တည်ဆောက်ခြင်း
const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)
scene.add(cubeCamera)

// 3. ရောင်ပြန်ဟပ်မည့် Chrome Sphere ဖန်တီးခြင်း
const mirrorMaterial = new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    envMap: cubeRenderTarget.texture // CubeCamera ရိုက်ကူးထားသော Texture ထည့်သွင်းခြင်း
})
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), mirrorMaterial)
scene.add(sphere)

// 4. Animation Loop ထဲတွင် Update လုပ်ခြင်း
const tick = () => {
    // Sphere ကိုယ်တိုင် ပြန်မထပ်စေရန် ခေတ္တဖျောက်ထားပြီးမှ update လုပ်ရသည်
    sphere.visible = false
    cubeCamera.position.copy(sphere.position)
    cubeCamera.update(renderer, scene)
    sphere.visible = true

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
```

> ⚠️ **Performance သတိပြုရန်**: `CubeCamera.update()` သည် Frame တစ်ခုတည်းတွင် Scene တစ်ခုလုံးကို **၆ ကြိမ် (6 Draw Calls)** Render လုပ်ရသဖြင့် မလိုအပ်ဘဲ Frame တိုင်း မ run သင့်ပါ။ အပြောင်းအလဲရှိမှသာ သို့မဟုတ် စက္ကန့်ပိုင်းခြားပြီးမှ update လုပ်သင့်ပါသည်။

---

# ၄။ Custom Camera Controls ဖန်တီးခြင်း (Math & Physics)

Three.js library များကို အသုံးမပြုဘဲ သင်္ချာနှင့် ရူပဗေဒသဘောတရားများဖြင့် ကိုယ်ပိုင် Camera Controller တည်ဆောက်နည်း ဖြစ်သည်။

---

### အဆင့် (၁): Mouse Coordinates ကို Unit Range သို့ ပြောင်းခြင်း (-0.5 မှ +0.5)

Browser ၏ Mouse Coordinate သည် ဘယ်ဘက်ထိပ်မှ `(0, 0)` စတင်ပြီး ညာဘက်အောက်တွင် `(width, height)` ဖြစ်သည်။ Three.js ၏ Coordinate System နှင့် ကိုက်ညီရန် အလယ်ဗဟိုကို `(0, 0)` အဖြစ် ပြောင်းလဲရမည်:

```javascript
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
    // 0 မှ 1 ရအောင် အရင်စားပြီး 0.5 နုတ်ခြင်းဖြင့် (-0.5 မှ +0.5) သို့ ရောက်သည်
    cursor.x = event.clientX / sizes.width - 0.5

    // Browser တွင် အောက်ဘက်သည် Y-positive ဖြစ်ပြီး Three.js တွင် အပေါ်ဘက်သည် Y-positive ဖြစ်၍ (-) ခံရသည်
    cursor.y = -(event.clientY / sizes.height - 0.5)
})
```

---

### အဆင့် (၂): Trigonometry ဖြင့် 360° စက်ဝိုင်းပတ် Orbit ပြုလုပ်ခြင်း

စက်ဝိုင်းတစ်ခု၏ အမှတ်များကို Trigonometric Functions ($x = r \cos\theta, z = r \sin\theta$) ဖြင့် ဖော်ပြနိုင်သည်:

```
                  +Z (Front)
                      │
                      │ cursor.x = 0
                      │ (cos=1, sin=0)
       -X ────────────┼──────────── +X
     (Left)           │           (Right)
                      │
                  -Z (Back)
```

```javascript
const tick = () => {
    // cursor.x (-0.5 to +0.5) ကို 2*PI (360°) ဖြင့် မြှောက်ပါက -180° မှ +180° သို့ လည်ပတ်နိုင်မည်
    const angle = cursor.x * Math.PI * 2
    const radius = 3

    camera.position.x = Math.sin(angle) * radius
    camera.position.z = Math.cos(angle) * radius
    camera.position.y = cursor.y * 5

    // အလယ်ဗဟို Mesh ကို အမြဲတမ်း မျက်နှာမူထားစေရန်
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
```

---

### အဆင့် (၃): Lerp (Linear Interpolation) ဖြင့် Smooth Inertia ထည့်သွင်းခြင်း

Mouse ရွေ့လျားမှုအတိုင်း ချက်ချင်းတောင့်ခနဲ မလိုက်ဘဲ ချောမွေ့စွာ ပြေးလိုက်လာစေရန် **Lerp Math** ကို သုံးနိုင်သည်:

$$\text{Position}_{\text{current}} = \text{Position}_{\text{current}} + (\text{Position}_{\text{target}} - \text{Position}_{\text{current}}) \times \text{factor}$$

```javascript
const targetPosition = new THREE.Vector3()

const tick = () => {
    const angle = cursor.x * Math.PI * 2
    const radius = 3

    targetPosition.x = Math.sin(angle) * radius
    targetPosition.z = Math.cos(angle) * radius
    targetPosition.y = cursor.y * 5

    // 0.05 factor ဖြင့် တဖြည်းဖြည်း ချောမွေ့စွာ ရွေ့လျားစေခြင်း (Smooth Lerp)
    camera.position.lerp(targetPosition, 0.05)
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
```

---

# ၅။ Three.js Built-in Controls Masterclass

---

### Built-in Controls နှိုင်းယှဉ်ချက် ဇယား

| Control Class | အဓိက လုပ်ဆောင်ချက် | အသုံးပြုရန် အကောင်းဆုံး နေရာများ |
| :--- | :--- | :--- |
| **`OrbitControls`** | Target တစ်ခုကို ဗဟိုပြု၍ လှည့်ပတ်ခြင်း၊ Zoom ဆွဲခြင်း၊ Pan ရွှေ့ခြင်း | 3D Model Viewers, Product Showcases, Portfolio Sites |
| **`PointerLockControls`** | Mouse Cursor ဖျောက်၍ WASD + Mouse Look ဖြင့် သွားလာခြင်း | First-Person Shooter (FPS) Games, Virtual Tours, Metaverse |
| **`FlyControls`** | 6-Degrees-of-Freedom ဖြင့် လွတ်လပ်စွာ ပျံသန်းလှည့်လည်ခြင်း | Flight Simulators, Space Exploration Scenes |
| **`FirstPersonControls`** | Drone သို့မဟုတ် လေယာဉ်မောင်းသကဲ့သို့ သွားလာခြင်း (Up-vector ထိန်းထားသည်) | Drone Simulators, Architectural Walkthroughs |
| **`TrackballControls`** | OrbitControls နှင့် ဆင်တူသော်လည်း ဒေါင်လိုက် လှည့်ပတ်မှု ကန့်သတ်ချက် မရှိခြင်း | Data Visualization, Scientific Molecule Analysis |
| **`TransformControls`** | 3D Object များကို ရွှေ့ရန်/လှည့်ရန်/ချဲ့ရန် 3-Axis Gizmo ပေးခြင်း | 3D Web Editors, Level Designers, Scene Builders |

---

### OrbitControls Advanced Configuration Guide

`OrbitControls` တွင် ပရော်ဖက်ရှင်နယ် Project များတွင် မဖြစ်မနေ ထည့်သွင်းအသုံးပြုလေ့ရှိသော အဆင့်မြင့် Setting များ:

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const controls = new OrbitControls(camera, canvas)

// 1. Damping (Smooth Inertia - မောက်စ်လွှတ်လိုက်လျှင် အရှိန်ဖြင့် ချောမွေ့စွာ ရပ်ခြင်း)
controls.enableDamping = true
controls.dampingFactor = 0.05 // ချောမွေ့မှု အတိုင်းအတာ (Default: 0.05)

// 2. Distance Limits (Zoom အနီး/အဝေး ကန့်သတ်ခြင်း)
controls.minDistance = 2  // ကင်မရာ Mesh ထဲသို့ ထိုးဖောက်မဝင်စေရန်
controls.maxDistance = 15 // မြင်ကွင်း အပြင်ဘက်သို့ အဝေးကြီး မထွက်သွားစေရန်

// 3. Polar Angle Limits (ဒေါင်လိုက် အနိမ့်/အမြင့် လှည့်နိုင်သော ထောင့် ကန့်သတ်ခြင်း)
controls.minPolarAngle = Math.PI / 6 // အပေါ်စီး 30 ဒီဂရီထက် ပိုမတက်စေရန်
controls.maxPolarAngle = Math.PI / 2 // ကြမ်းပြင်အောက်သို့ ကင်မရာ ငုပ်မဆင်းစေရန် (90 ဒီဂရီတွင် ကန့်သတ်)

// 4. Azimuth Angle Limits (အလျားလိုက် ဘယ်/ညာ လှည့်နိုင်သော ထောင့် ကန့်သတ်ခြင်း)
// controls.minAzimuthAngle = - Math.PI / 4 // ဘယ်ဘက် 45°
// controls.maxAzimuthAngle = Math.PI / 4  // ညာဘက် 45°

// 5. Auto-Rotation (အလိုအလျောက် 360° ဖြည်းဖြည်းချင်း လှည့်နေစေခြင်း)
controls.autoRotate = true
controls.autoRotateSpeed = 2.0 // လှည့်သည့် အမြန်နှုန်း

// 6. Panning ကန့်သတ်ခြင်း
controls.enablePan = true
controls.screenSpacePanning = true // Screen မျက်နှာပြင်အတိုင်း Pan လုပ်ခြင်း

// 7. Mouse Buttons စိတ်ကြိုက် ပြောင်းလဲခြင်း
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
}
```

```javascript
// Animation Loop (Damping သုံးပါက controls.update() ကို မဖြစ်မနေ ထည့်ရမည်)
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

### PointerLockControls (FPS Game Controller အပြည့်အစုံ)

ဂိမ်းများတွင် ကစားသမား၏ မျက်လုံးနေရာမှ ဇာတ်ကောင်လျှောက်လှမ်းသကဲ့သို့ ဖန်တီးလိုပါက `PointerLockControls` ကို အောက်ပါအတိုင်း အသုံးပြုနိုင်ပါသည်:

```javascript
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'

const controls = new PointerLockControls(camera, document.body)

// Click နှိပ်လျှင် Mouse cursor ကို Lock လုပ်ပြီး ကင်မရာထိန်းချုပ်ခွင့် ယူခြင်း
document.addEventListener('click', () => {
    controls.lock()
})

const keys = { forward: false, backward: false, left: false, right: false }

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW') keys.forward = true
    if (event.code === 'KeyS') keys.backward = true
    if (event.code === 'KeyA') keys.left = true
    if (event.code === 'KeyD') keys.right = true
})

document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW') keys.forward = false
    if (event.code === 'KeyS') keys.backward = false
    if (event.code === 'KeyA') keys.left = false
    if (event.code === 'KeyD') keys.right = false
})

const clock = new THREE.Clock()

const tick = () => {
    const delta = clock.getDelta()
    const speed = 5 // 5 units per second

    if (controls.isLocked) {
        if (keys.forward) controls.moveForward(speed * delta)
        if (keys.backward) controls.moveForward(-speed * delta)
        if (keys.right) controls.moveRight(speed * delta)
        if (keys.left) controls.moveRight(-speed * delta)
    }

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

# ၆။ Common Pitfalls, Pro-Tips & Performance Optimization

### ❌ အဖြစ်များဆုံး အမှား (၅) မျိုးနှင့် ဖြေရှင်းနည်း:

1. **`updateProjectionMatrix()` ခေါ်ရန် မေ့လျော့ခြင်း**:
   - `camera.fov`, `camera.aspect`, `camera.near`, `camera.far` တန်ဖိုးများကို ပြောင်းပြီးတိုင်း ၎င်း function ကို မခေါ်ပါက ကင်မရာ visual ပြောင်းလဲမည် မဟုတ်ပါ။
2. **Damping ဖွင့်ထားပြီး `controls.update()` မခေါ်ခြင်း**:
   - `controls.enableDamping = true` ထားပြီး `tick()` function ထဲတွင် `controls.update()` မခေါ်ပါက ကင်မရာသည် လုံးဝ ရပ်တန့်နေမည် သို့မဟုတ် တွန့်ဆုတ်နေပါမည်။
3. **Z-Fighting ဖြစ်စေသော အစွန်းရောက် Near/Far တန်ဖိုးများ**:
   - `near: 0.00001` နှင့် `far: 9999999` မထားပါနှင့်။ Default အနေဖြင့် `near: 0.1` နှင့် `far: 100` သာ သုံးပါ။
4. **Orthographic Camera တွင် Aspect Ratio ထည့်မတွက်ခြင်း**:
   - `left: -1, right: 1, top: 1, bottom: -1` ဟု Hardcode ရေးပါက ပုံများ ပိန်ရှည်/ပုပြား ဖြစ်ကုန်ပါမည်။ `aspectRatio` ဖြင့် မြှောက်ပေးပါ။
5. **Gimbal Lock ဖြစ်ခြင်း**:
   - ကင်မရာကို `(0, 10, 0)` မှ `(0, 0, 0)` သို့ ဒေါင်လိုက် တည့်တည့် `lookAt` လုပ်ပါက `camera.up` vector နှင့် ထပ်တူကျသွားပြီး ကင်မရာ လည်ထွက်သွားတတ်သည်။ `camera.up.set(0, 0, -1)` ဟု ပြောင်းပေးပါ။

---

# ၇။ Master Cheat Sheet & Code Snippets

```javascript
// ==========================================
// 1. STANDARD PERSPECTIVE CAMERA SETUP
// ==========================================
const camera = new THREE.PerspectiveCamera(
    75,                             // FOV (Vertical in degrees)
    sizes.width / sizes.height,     // Aspect Ratio
    0.1,                            // Near Plane
    100                             // Far Plane
)
camera.position.set(0, 2, 5)
camera.lookAt(0, 0, 0)
scene.add(camera)

// ==========================================
// 2. ORTHOGRAPHIC CAMERA SETUP
// ==========================================
const aspect = sizes.width / sizes.height
const frustumSize = 5
const orthoCam = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,      // Left
     frustumSize * aspect / 2,      // Right
     frustumSize / 2,               // Top
    -frustumSize / 2,               // Bottom
     0.1,                           // Near
     100                            // Far
)

// ==========================================
// 3. ORBITCONTROLS SETUP WITH DAMPING
// ==========================================
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.maxPolarAngle = Math.PI / 2 // Floor collision lock

// ==========================================
// 4. RESPONSIVE RESIZE LISTENER
// ==========================================
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ==========================================
// 5. ANIMATION TICK LOOP
// ==========================================
const tick = () => {
    controls.update() // Required for damping
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```
