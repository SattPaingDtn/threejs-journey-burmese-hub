# 🖥️ Three.js Journey - Lesson 07: Fullscreen and Resizing (ဖန်သားပြင် အပြည့်နှင့် Resize)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 07: Fullscreen and Resizing](https://threejs-journey.com/lessons/fullscreen-and-resizing)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် စနစ်တကျ ပြုစုသူ**: Antigravity  
> **အဆင့်**: အခြေခံ (Beginner Friendly)

---

## 🎯 ဤသင်ခန်းစာ၏ အဓိက ရည်ရွယ်ချက်
Browser မျက်နှာပြင် အပြည့် (Full Viewport) ပြသနည်း၊ Window Resize ဖြစ်သည့်အခါ ပုံမပျက်ဘဲ အလိုအလျောက် ချိန်ညှိနည်း၊ Retina/Mobile Screens များအတွက် **Pixel Ratio (DPR)** ထိန်းသိမ်းနည်းနှင့် **Fullscreen API** အသုံးပြုနည်းတို့ကို ရှင်းလင်းစွာ တတ်မြောက်စေရန် ဖြစ်ပါသည်။

---

## 💡 Mental Model: Responsive Canvas & Pixel Ratio (DPR)

```
┌────────────────────────────────────────┐      ┌────────────────────────────────────────┐
│     📱 DPR = 1 (Standard Display)      │      │     ✨ DPR = 2 (Retina Display)        │
├────────────────────────────────────────┤      ├────────────────────────────────────────┤
│ • 1 CSS Pixel = 1 Physical Pixel       │      │ • 1 CSS Pixel = 4 Physical Pixels      │
│ • ပုံမှန် အကြည်ဓာတ်                     │      │ • အလွန်ကြည်လင် တောက်ပသည်                │
└────────────────────────────────────────┘      └────────────────────────────────────────┘
```

> **Performance Rule**:  
> High-End စမတ်ဖုန်းများတွင် `DPR = 3` (၉ ဆပိုမို ရေးဆွဲရခြင်း) ရှိသော်လည်း လူ့မျက်စိသည် DPR 2 နှင့် မကွာခြားသဖြင့် GPU မပင်ပန်းစေရန် **အမြင့်ဆုံး `2` အထိသာ ကန့်သတ်ခြင်း (`Math.min(devicePixelRatio, 2)`)** သည် စံသတ်မှတ်ချက် ဖြစ်သည်။

---

## 🔑 အဆင့် (၃) ဆင့်ဖြင့် Responsive ပြုလုပ်ခြင်း

### ၁။ CSS Reset (Scrollbar နှင့် Margin ဖျောက်ခြင်း)

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
    outline: none;
}
```

---

### ၂။ Window Resize Event ကို နားထောင်၍ ပြန်လည်ချိန်ညှိခြင်း

```javascript
window.addEventListener('resize', () => {
    // ၁။ Sizes တန်ဖိုးများကို Update လုပ်ခြင်း
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // ၂။ Camera Aspect Ratio ကို Update လုပ်ပြီး Projection Matrix ကို ပြန်တွက်ခြင်း
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix() // 🚨 မဖြစ်မနေ ခေါ်ပေးရမည်

    // ၃။ Renderer Size နှင့် Pixel Ratio ကို ပြန်ချိန်ခြင်း
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```

---

### ၃။ Fullscreen API ဖြင့် မျက်နှာပြင်အပြည့် ဖွင့်ခြင်း (Double Click)

```javascript
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen() // Safari အတွက်
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen() // Safari အတွက်
        }
    }
})
```

---

## 📋 အမြန်မှတ်စု (Lesson 07 Memo)

```javascript
// RESPONSIVE & FULLSCREEN BOILERPLATE
import * as THREE from 'three'

const sizes = { width: window.innerWidth, height: window.innerHeight }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas.webgl') })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// RESIZE HANDLER
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```
