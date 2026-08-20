# 📸 Three.js Journey - Lesson 07: Cameras (Master Deep-Dive Study Guide & Memo)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 07: Cameras](https://threejs-journey.com/lessons/cameras)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity  
> **ရည်ရွယ်ချက်**: Three.js ရှိ Camera System အားလုံး၊ အတွင်းပိုင်း 3D Graphics Pipeline၊ Projection Matrix သင်္ချာသဘောတရားများ၊ ကင်မရာ (၆) မျိုး၏ အသေးစိတ် အလုပ်လုပ်ပုံ၊ Custom Controller တည်ဆောက်ပုံနှင့် OrbitControls ၏ Advanced Configuration များကို အခြေခံမှ Master အဆင့်အထိ နားလည်သဘောပေါက်စေရန် ပြုစုထားသော Deep-Dive လမ်းညွှန်စာအုပ် ဖြစ်ပါသည်။

---

## 📑 မာတိကာ အကျဉ်း (Table of Contents)

1. [3D Graphics Pipeline နှင့် Camera Space Transformations (အတွင်းပိုင်း အလုပ်လုပ်ပုံ)](#၁-3d-graphics-pipeline-နှင့်-camera-space-transformations)
   - Coordinate Systems (Local $\to$ World $\to$ View $\to$ Clip $\to$ Screen)
   - View Matrix နှင့် Inverse World Matrix သဘောတရား
   - Projection Matrix ၏ အခန်းကဏ္ဍ
2. [THREE.Camera (Abstract Base Class) အသေးစိတ်](#၂-threecamera-abstract-base-class-အသေးစိတ်)
   - `Object3D` အမွေဆက်ခံမှုနှင့် Properties များ
   - `camera.lookAt()` ၏ Vector Math တွက်ချက်ပုံ
   - `camera.up` Vector နှင့် Gimbal Lock သတိပြုရန်
3. [Camera အမျိုးအစား (၆) မျိုး Deep Dive](#၃-camera-အမျိုးအစား-၆-မျိုး-deep-dive)
   - [3.1 PerspectiveCamera (Deep Dive)](#၃၁-perspectivecamera-deep-dive)
     - Frustum (Truncated Pyramid)
     - Field of View (Vertical vs Horizontal FOV Math)
     - Aspect Ratio နှင့် Resize Handling
     - Near & Far Clipping Planes
     - **Z-Fighting Bug နှင့် Depth Buffer Precision Math**
     - `updateProjectionMatrix()` ဘာကြောင့် ခေါ်ရသနည်း?
   - [3.2 OrthographicCamera (Deep Dive)](#၃၂-orthographiccamera-deep-dive)
     - Orthographic Box (Cuboid Frustum)
     - Aspect Ratio Distortion နှင့် တွက်ချက်ပုံ
     - Window Resize ပြဿနာ ဖြေရှင်းနည်း
     - လက်တွေ့ အသုံးချနယ်ပယ်များ (Isometric, 2D UI/HUD, Shadows)
   - [3.3 ArrayCamera (Deep Dive)](#၃၃-arraycamera-deep-dive)
     - Sub-cameras Array နှင့် Normalized Viewport
     - Split-Screen Multiplayer & Multi-angle Showcase Code နမူနာ
   - [3.4 StereoCamera (Deep Dive)](#၃၄-stereocamera-deep-dive)
     - Interpupillary Distance (Eye Separation)
     - Parallax Effect (VR & Anaglyph 3D)
   - [3.5 CubeCamera (Deep Dive)](#၃၅-cubecamera-deep-dive)
     - 6 Directions Render Pass ($+X, -X, +Y, -Y, +Z, -Z$)
     - `WebGLCubeRenderTarget` ဖြင့် Real-time Reflection & Environment Mapping
     - Performance Impact နှင့် သတိပြုရန်
4. [Custom Camera Controls ဖန်တီးခြင်း (Math & Physics)](#၄-custom-camera-controls-ဖန်တီးခြင်း-math--physics)
   - Mouse Event Normalization (-0.5 မှ +0.5 သို့)
   - Trigonometry ($Math.sin$ & $Math.cos$) ဖြင့် 360° Circular Orbit
   - Spherical Coordinates (Polar Angle $\theta$, Azimuth Angle $\phi$, Radius $r$)
   - Smooth Motion ဖန်တီးခြင်း (Lerp / Linear Interpolation)
5. [Three.js Built-in Controls Masterclass](#၅-threejs-built-in-controls-masterclass)
   - Built-in Controls နှိုင်းယှဉ်ချက် ဇယား
   - `OrbitControls` Advanced Config (Damping, Limits, Auto-rotate, Keys)
   - `PointerLockControls` (FPS Game Controller အပြည့်အစုံ)
   - `TransformControls` (Gizmo Manipulation)
6. [Common Pitfalls, Pro-Tips & Performance Optimization](#၆-common-pitfalls-pro-tips--performance-optimization)
7. [Master Cheat Sheet & Code Snippets](#၇-master-cheat-sheet--code-snippets)

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
    logarithmicDepthBuffer: true
})
```

---

### (၃) `camera.updateProjectionMatrix()` ဘာကြောင့် ခေါ်ရသနည်း?

Three.js တွင် Performance ကောင်းမွန်စေရန်အတွက် `camera.fov`, `camera.aspect`, `camera.near`, `camera.far` စသည့် Parameter များကို ပြောင်းလဲလိုက်ရုံဖြင့် `projectionMatrix` ကို Frame တိုင်း အလိုအလျောက် ပြန်မတွက်ပါ။

ထို့ကြောင့် ၎င်းတန်ဖိုးများကို ပြောင်းလဲပြီးတိုင်း Matrix အသစ် ပြန်လည်တွက်ချက်ရန် **`camera.updateProjectionMatrix()`** ကို မဖြစ်မနေ ခေါ်ပေးရပါသည်:

```javascript
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

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
```javascript
const sizes = { width: window.innerWidth, height: window.innerHeight }
const aspectRatio = sizes.width / sizes.height

const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio, // left
     1 * aspectRatio, // right
     1,               // top
    -1,               // bottom
     0.1,             // near
     100              // far
)
```

---

## ၃.၃ ArrayCamera (Deep Dive)

```javascript
const AMOUNT = 2 // 2x2 = 4 sub-cameras
const subCameras = []

for (let x = 0; x < AMOUNT; x++) {
    for (let y = 0; y < AMOUNT; y++) {
        const subCamera = new THREE.PerspectiveCamera(40, (sizes.width / AMOUNT) / (sizes.height / AMOUNT), 0.1, 100)
        
        subCamera.viewport = new THREE.Vector4(
            x / AMOUNT,
            y / AMOUNT,
            1 / AMOUNT,
            1 / AMOUNT
        )
        
        subCamera.position.x = (x === 0 ? -3 : 3)
        subCamera.position.y = (y === 0 ? -3 : 3)
        subCamera.position.z = 3
        subCamera.lookAt(0, 0, 0)
        subCamera.updateProjectionMatrix()

        subCameras.push(subCamera)
    }
}

const camera = new THREE.ArrayCamera(subCameras)
scene.add(camera)
```

---

## ၃.၄ StereoCamera & ၃.၅ CubeCamera

* **`StereoCamera`**: Interpupillary Distance (IPD / `eyeSep`: 64mm) ဖြင့် VR / 3D glasses အတွက် Stereo render ပြုလုပ်ခြင်း။
* **`CubeCamera`**: အရပ် ၆ မျက်နှာ ဖမ်းယူ၍ `WebGLCubeRenderTarget` ဖြင့် Real-time Reflection & Dynamic Environment Mapping ဖန်တီးခြင်း။

---

# ၄။ Custom Camera Controls ဖန်တီးခြင်း (Math & Physics)

```javascript
const cursor = { x: 0, y: 0 }
const targetPos = new THREE.Vector3()

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

const tick = () => {
    const angle = cursor.x * Math.PI * 2
    const radius = 3

    targetPos.x = Math.sin(angle) * radius
    targetPos.z = Math.cos(angle) * radius
    targetPos.y = cursor.y * 5

    // Smooth Lerp
    camera.position.lerp(targetPos, 0.05)
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
```

---

# ၅။ OrbitControls Advanced Masterclass

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05

controls.minDistance = 2
controls.maxDistance = 15
controls.maxPolarAngle = Math.PI / 2 // Floor collision lock
controls.autoRotate = true
controls.autoRotateSpeed = 2.0

const tick = () => {
    controls.update() // Required for Damping & Auto-rotate
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```
