# 📸 Three.js Journey - Lesson 06: Cameras (ကင်မရာစနစ် အပြည့်အစုံ)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 06: Cameras](https://threejs-journey.com/lessons/cameras)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် စနစ်တကျ ပြုစုသူ**: Antigravity  
> **အဆင့်**: အခြေခံမှ အလယ်အလတ် (Beginner to Intermediate)

---

## 🎯 ဤသင်ခန်းစာ၏ အဓိက ရည်ရွယ်ချက်
PerspectiveCamera နှင့် OrthographicCamera တို့၏ ကွာခြားချက်၊ FOV, Near/Far Clipping Planes သဘောတရား၊ Z-Fighting ပြဿနာ ဖြေရှင်းပုံနှင့် **OrbitControls** ဖြင့် Mouse ထိန်းချုပ်မှု ပြုလုပ်ပုံတို့ကို ရှင်းလင်းစွာ တတ်မြောက်စေရန် ဖြစ်ပါသည်။

---

## 💡 Mental Model: Perspective vs Orthographic

```
┌────────────────────────────────────────┐      ┌────────────────────────────────────────┐
│     🎥 PerspectiveCamera (လူ့မျက်လုံး)    │      │    📐 OrthographicCamera (အင်ဂျင်နီယာပုံစံ)│
├────────────────────────────────────────┤      ├────────────────────────────────────────┤
│ • အနီးရှိအရာများ ကြီးပြီး အဝေးရှိအရာများ သေး│      │ • အကွာအဝေးကြောင့် ပုံမသေးသွားဘဲ မျဉ်းပြိုင်│
│ • Frustum (ပိရမစ် ထိပ်ပြတ် ပုံစံ)       │      │ • Box Projection (သေတ္တာ ပုံစံ)         │
│ • 3D Websites & FPS Games များအတွက်     │      │ • 2D Games, Isometric & CAD များအတွက်  │
└────────────────────────────────────────┘      └────────────────────────────────────────┘
```

---

## 🔑 အဓိက သဘောတရားများ

### ၁။ PerspectiveCamera ၏ Parameters (၄) ခု

```javascript
const camera = new THREE.PerspectiveCamera(
    75,                         // 1. FOV (Field of View - ဒေါင်လိုက် မြင်ကွင်းကျယ် ဒီဂရီ)
    sizes.width / sizes.height, // 2. Aspect Ratio (ဖန်သားပြင် အကျယ် / အမြင့် အချိုး)
    0.1,                        // 3. Near (ကင်မရာနှင့် အနီးဆုံး မြင်နိုင်သော အကွာအဝေး)
    100                         // 4. Far (ကင်မရာနှင့် အဝေးဆုံး မြင်နိုင်သော အကွာအဝေး)
)
```

> ⚠️ **Z-Fighting သတိပြုရန်**:  
> `near` ကို အရမ်းငယ်လွန်းခြင်း (ဥပမာ `0.0001`) နှင့် `far` ကို အရမ်းကြီးလွန်းခြင်း (ဥပမာ `99999`) မလုပ်ပါနှင့်။ Depth Buffer တွက်ချက်မှု တိကျမှု လျော့ကျသွားပြီး မျက်နှာပြင် နှစ်ခု ထပ်တူကျကာ တဖျတ်ဖျတ် ဖြစ်ပေါ်သော **Z-Fighting** ပြဿနာ ဖြစ်ပွားတတ်ပါသည်။ (ပုံမှန်အားဖြင့် `0.1` နှင့် `100` သုံးသင့်သည်)။

---

### ၂။ OrthographicCamera တည်ဆောက်ပုံ

```javascript
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(
    -1 * aspectRatio, // Left
     1 * aspectRatio, // Right
     1,               // Top
    -1,               // Bottom
     0.1,             // Near
     100              // Far
)
```

---

### ၃။ OrbitControls ဖြင့် Mouse ထိန်းချုပ်မှု ထည့်သွင်းခြင်း

Three.js တွင် အသုံးအများဆုံး Controller ဖြစ်ပြီး Mouse ဖြင့် ၃၆၀ ဒီဂရီ လှည့်ပတ်ကြည့်ရှုနိုင်စေသည်:

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// OrbitControls တည်ဆောက်ခြင်း
const controls = new OrbitControls(camera, canvas)

// အရှိန်ဖြင့် ချောမွေ့စွာ ရပ်တန့်စေရန် (Damping)
controls.enableDamping = true
controls.dampingFactor = 0.05

// 🚨 အရေးကြီး: Damping အလုပ်လုပ်စေရန် tick() loop ထဲတွင် update() ခေါ်ပေးရမည်
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

## 📋 အမြန်မှတ်စု (Lesson 06 Memo)

```javascript
// CAMERAS & ORBIT CONTROLS CHEAT SHEET
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 1. Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1.5, 4)
scene.add(camera)

// 2. OrbitControls with Damping
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// 3. Animation Loop
const tick = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
```
