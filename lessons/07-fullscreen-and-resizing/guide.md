# Lesson 07 — Fullscreen and Resizing (Responsive Canvas နှင့် DPR)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: Fullscreen and resizing](https://threejs-journey.com/lessons/fullscreen-and-resizing)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **လေ့လာနည်း** — Browser window ကို အရွယ်မျိုးစုံပြောင်းပြီး camera၊ renderer နဲ့ pixel ratio သုံးခုလုံး update ဖြစ်ပုံကို စောင့်ကြည့်ပါ။

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

- Canvas ကို viewport အပြည့် CSS နဲ့ နေရာချနိုင်မယ်
- Resize event မှာ sizes၊ camera နဲ့ renderer ကို အစဉ်လိုက် update လုပ်နိုင်မယ်
- Device Pixel Ratio ရဲ့ sharpness/performance trade-off ကို နားလည်မယ်
- Fullscreen API နဲ့ canvas ကို ဝင်/ထွက် ပြုလုပ်နိုင်မယ်
- Mobile နဲ့ Retina screen များအတွက် renderer cost ကို ထိန်းနိုင်မယ်

> **သင်ကြားပြသသူ**: Bruno Simon (Three.js Journey)  
> **မြန်မာဘာသာ ပြုစုရှင်းလင်းသူ**: Antigravity  
> **သင်ခန်းစာ ပုံစံ**: ဆရာတစ်ယောက်က အနီးကပ် ရှင်းပြသလို ရင်းနှီးလွယ်ကူပြီး အသေးစိတ် ပြည့်စုံသော လမ်းညွှန်

---

## 📑 မာတိကာ (Table of Contents)

1. [မိတ်ဆက်နှင့် Responsive 3D ၏ အရေးပါပုံ](#၁-မိတ်ဆက်နှင့်-responsive-3d-၏-အရေးပါပုံ)
2. [CSS ဖြင့် Full Viewport အပြည့် နေရာချထားခြင်း (Fit in Viewport)](#၂-css-ဖြင့်-full-viewport-အပြည့်-နေရာချထားခြင်း)
3. [Window Resize Event ကို ကိုင်တွယ်ဖြေရှင်းခြင်း (Handle Resize)](#၃-window-resize-event-ကို-ကိုင်တွယ်ဖြေရှင်းခြင်း)
   - Sizes Update ပြုလုပ်ခြင်း
   - Camera Aspect Ratio နှင့် `updateProjectionMatrix()`
   - Renderer Viewport ပြန်ချိန်ခြင်း
4. [Device Pixel Ratio (DPR) နှင့် Performance ထိန်းသိမ်းနည်း](#၄-device-pixel-ratio-dpr-နှင့်-performance-ထိန်းသိမ်းနည်း)
   - Retina Display ဆိုတာ ဘာလဲ?
   - `Math.min(window.devicePixelRatio, 2)` ဘာကြောင့် သုံးရသလဲ?
   - Multi-Monitor မျက်နှာပြင်များ ကူးပြောင်းရာတွင် ချိန်ညှိခြင်း
5. [Fullscreen API ဖြင့် မျက်နှာပြင်အပြည့် ဖွင့်ခြင်း (Handle Fullscreen)](#၅-fullscreen-api-ဖြင့်-မျက်နှာပြင်အပြည့်-ဖွင့်ခြင်း)
   - Double Click Event ဖြင့် ဖွင့်/ပိတ်ခြင်း
   - Safari / Webkit Cross-Browser Compatibility
6. [လက်တွေ့ ကုဒ်အပြည့်အစုံ (`script.js` Complete Code)](#၆-လက်တွေ့-ကုဒ်အပြည့်အစုံ)
7. [ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Lesson 07 Memory Hook)](#၇-ဆရာ့ရဲ့-အလွတ်မှတ်-မှတ်စုတို)

---

## ၁။ မိတ်ဆက်နှင့် Responsive 3D ၏ အရေးပါပုံ

လက်တွေ့ Web Development တွင် 3D Scene များကို Fixed Size (ဥပမာ `800x600`) ဖြင့်သာ ပြသလေ့မရှိဘဲ၊ **Device မျက်နှာပြင် အပြည့် (Full Viewport)** ဖြင့် ပြသကြသည်။

Desktop, Tablet, Mobile စသည့် Screen အမျိုးမျိုးတွင် ပုံပျက်သွားခြင်း မရှိဘဲ ချောမွေ့စွာ ပြောင်းလဲနိုင်စေရန် **Responsive Handling** ကို စနစ်တကျ ပြုလုပ်ရန် လိုအပ်သည်။

---

## ၂။ CSS ဖြင့် Full Viewport အပြည့် နေရာချထားခြင်း

Browser ၏ မူလ Margin, Padding များနှင့် Scrollbar များကို ဖယ်ရှားရန် အောက်ပါ CSS ကို ရေးသားရသည်:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    overflow: hidden; /* Scrollbar လုံးဝ မပေါ်စေရန် */
}

.webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none; /* Focus ဖြစ်ချိန် အပြာရောင်ဘောင် မပေါ်စေရန် */
}
```

```javascript
// JavaScript ထဲတွင် Window အကျယ်/အမြင့်ကို ရယူခြင်း
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
```

---

## ၃။ Window Resize Event ကို ကိုင်တွယ်ဖြေရှင်းခြင်း

User သည် Browser Window အရွယ်အစားကို ဆွဲချဲ့/ဆွဲချုံ့လိုက်သည့်အခါ Three.js သည် အလိုအလျောက် မသိရှိပါ။ ထို့ကြောင့် `resize` event ကို နားထောင်၍ အဆင့် (၃) ဆင့် ပြုလုပ်ပေးရသည်:

```javascript
window.addEventListener('resize', () => {
    // အဆင့် ၁။ Sizes တန်ဖိုးများကို Update လုပ်ခြင်း
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // အဆင့် ၂။ Camera Aspect Ratio အသစ်ကို တွက်ချက်၍ Projection Matrix ကို Update လုပ်ခြင်း
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix() // 🚨 မဖြစ်မနေ ခေါ်ပေးရမည်

    // အဆင့် ၃။ Renderer ၏ အရွယ်အစားနှင့် Pixel Ratio ကို ပြန်ချိန်ခြင်း
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```

> ⚠️ **အရေးကြီးသော သတိပြုရန်**: `camera.aspect` ကို ပြောင်းပြီးပါက `camera.updateProjectionMatrix()` ကို မခေါ်ပါက ကင်မရာ၏ မြင်ကွင်းသည် ပြားကပ် သို့မဟုတ် ရှည်မျောသွားမည် ဖြစ်သည်။

---

## ၄။ Device Pixel Ratio (DPR) နှင့် Performance

### (က) Pixel Ratio ဆိုတာ ဘာလဲ?
* `window.devicePixelRatio` သည် Screen ပေါ်ရှိ **CSS Pixel ၁ ခုအတွက် အသုံးပြုသော Physical Pixels အရေအတွက်** ဖြစ်သည်။
* ရိုးရိုး Screen များတွင် `DPR = 1` ဖြစ်ပြီး၊ Apple Retina Displays, 4K Monitors နှင့် ခေတ်မီ စမတ်ဖုန်းများတွင် `DPR = 2` (သို့မဟုတ်) `DPR = 3` ဖြစ်သည်။

```
DPR 1 (Standard Display)    :  [ ■ ] (1 physical pixel)
DPR 2 (Retina Display)      :  [ ■■ / ■■ ] (4 physical pixels - ပိုမိုကြည်လင်)
DPR 3 (Ultra High-End Phone):  [ 3x3 = 9 physical pixels - GPU ဝန်အရမ်းများ)
```

---

### (ခ) `Math.min(window.devicePixelRatio, 2)` ဘာကြောင့် သုံးရသလဲ?

* အကယ်၍ `DPR = 3` ဖြစ်ပါက GPU သည် Pixel ပေါင်း **၉ ဆ** ပိုမို ရေးဆွဲရသဖြင့် Battery အကုန်မြန်ပြီး Frame Rate ကျဆင်းသွားနိုင်သည်။
* လူ့မျက်စိသည် `DPR = 2` နှင့် `DPR = 3` ကြား ကြည်လင်ပြတ်သားမှု ကွာခြားချက်ကို မခွဲခြားနိုင်ပေ။
* ထို့ကြောင့် အကောင်းဆုံး Performance နှင့် Visual Quality ကို ရရှိရန် **အမြင့်ဆုံး `2` အထိသာ ကန့်သတ်ခြင်း (Capping)** သည် အကောင်းဆုံး အလေ့အထ ဖြစ်သည်:

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

---

## ၅။ Fullscreen API ဖြင့် မျက်နှာပြင်အပြည့် ဖွင့်ခြင်း

User က Screen ပေါ်တွင် Double Click နှိပ်လိုက်ပါက Fullscreen Mode သို့ ဝင်/ထွက်နိုင်ရန် ရေးသားနည်း:

```javascript
window.addEventListener('dblclick', () => {
    // Safari နှင့် အခြား Browser များ အားလုံးတွင် အလုပ်လုပ်စေရန် Prefix များ ထည့်သွင်းခြင်း
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        // Fullscreen ဝင်ရောက်ခြင်း
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen() // Safari အတွက်
        }
    } else {
        // Fullscreen မှ ထွက်ခြင်း
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen() // Safari အတွက်
        }
    }
})
```

---

## ၆။ လက်တွေ့ ကုဒ်အပြည့်အစုံ (`script.js`)

```javascript
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// ၁။ Canvas ဆွဲယူခြင်း
const canvas = document.querySelector('canvas.webgl')

// ၂။ Scene
const scene = new THREE.Scene()

// ၃။ Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// ၄။ Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// ၅။ Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// ၆။ Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ၇။ Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ၈။ Window Resize Event Listener
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ၉။ Fullscreen on Double Click
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) canvas.requestFullscreen()
        else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen()
    } else {
        if (document.exitFullscreen) document.exitFullscreen()
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
    }
})

// ၁၀။ Animation Loop
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

## ၇။ အလွတ်မှတ် မှတ်စုတို (Lesson 07 Memory Hook)

> 🧠 **ဒီလိုလေး အလွတ်မှတ်ထားလိုက်ပါ**:  
> * **Scrollbar ဖျောက်ဖို့** = `html, body { overflow: hidden; }`  
> * **Window Resize ဖြစ်တိုင်း မဖြစ်မနေ ခေါ်ရမှာ** = `camera.updateProjectionMatrix()`  
> * **Retina Screen မှာ ကြည်လင်ပြီး Battery မကုန်စေဖို့** = `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`  
> * **ဖန်သားပြင် အပြည့်ဖွင့်ဖို့** = `canvas.requestFullscreen()`

---

## လက်တွေ့လေ့ကျင့်ခန်း

1. Browser ကို အလျားရှည်၊ ဒေါင်လိုက်နဲ့ mobile width များအထိ resize လုပ်ပါ
2. `updateProjectionMatrix()` ကို ခဏ comment လုပ်ပြီး ပုံပျက်ပုံကို ကြည့်ကာ ပြန်ထည့်ပါ
3. DPR ကို 1၊ 2၊ 3 ပြောင်းပြီး sharpness နဲ့ FPS ကွာခြားမှုကို Lab မှာ စမ်းပါ
4. Fullscreen button နဲ့ ဝင်/ထွက်လုပ်ပြီး `document.fullscreenElement` state ကို စစ်ပါ

## ပြဿနာဖြေရှင်းရန်

- Canvas ဘေးမှာ white gap ရှိရင် body margin နဲ့ canvas position ကို စစ်ပါ
- Resize ပြီး blur ဖြစ်ရင် renderer size နဲ့ pixel ratio နှစ်ခုလုံး update ဖြစ်သလား စစ်ပါ
- Fullscreen request မအလုပ်လုပ်ရင် user click/double-click event အတွင်းက ခေါ်ထားသလား စစ်ပါ
- DPR အလွန်မြင့်တာက GPU render pixels ကို အများကြီးတိုးစေတယ်; ပုံမှန်အားဖြင့် `Math.min(devicePixelRatio, 2)` သုံးပါ
