# 🏃 Three.js Journey - Lesson 05: Animations (လှုပ်ရှားသက်ဝင်စေခြင်း)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 05: Animations](https://threejs-journey.com/lessons/animations)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် စနစ်တကျ ပြုစုသူ**: Antigravity  
> **အဆင့်**: အခြေခံ (Beginner Friendly)

---

## 🎯 ဤသင်ခန်းစာ၏ အဓိက ရည်ရွယ်ချက်
3D အရာဝတ္ထုများကို `requestAnimationFrame` ဖြင့် အဆက်မပြတ် လှုပ်ရှားစေပုံ၊ စက်တိုင်းတွင် အမြန်နှုန်း တူညီစေရန် `THREE.Clock` အသုံးပြုပုံ၊ သင်္ချာဖော်မြူလာများ ($Math.sin / Math.cos$) ဖြင့် လှိုင်းပုံစံ လှုပ်ရှားစေပုံနှင့် **GSAP** Library ပေါင်းစပ်ပုံတို့ကို ရှင်းလင်းစွာ တတ်မြောက်စေရန် ဖြစ်ပါသည်။

---

## 💡 Mental Model: Stop-Motion သဘောတရား

3D Animation ဆိုသည်မှာ **Frame တိုင်းတွင် Object ၏ တည်နေရာကို အနည်းငယ်စီ ပြောင်းပြီး Screen ပေါ်သို့ တစ်စက္ကန့်လျှင် အကြိမ် ၆၀ (60 FPS) ပြန်လည် ရေးဆွဲပြသပေးခြင်း** ဖြစ်သည်:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Frame 1      │ ──> │ Frame 2      │ ──> │ Frame 3      │ ──> │ Frame 60     │
│ rot.y = 0.01 │     │ rot.y = 0.02 │     │ rot.y = 0.03 │     │ rot.y = 0.60 │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## 🔑 အဓိက သဘောတရားများ

### ၁။ RequestAnimationFrame Tick Loop
Browser ၏ Refresh Rate နှင့် ကိုက်ညီစွာ Animation ကို ခေါ်ဆိုရန် `requestAnimationFrame` ကို သုံးသည်:

```javascript
const tick = () => {
    // ၁။ Object ကို အနည်းငယ် လှည့်ခြင်း
    mesh.rotation.y += 0.01

    // ၂။ Scene ကို ပြန်လည် Render လုပ်ခြင်း
    renderer.render(scene, camera)

    // ၃။ နောက် Frame အတွက် Browser ထံ ထပ်မံ တောင်းဆိုခြင်း (Infinite Loop)
    window.requestAnimationFrame(tick)
}
tick()
```

---

### ၂။ FPS ကွာခြားမှု ပြဿနာနှင့် THREE.Clock

* **ပြဿနာ**: 60Hz မျက်နှာပြင်တွင် ၁ စက္ကန့်လျှင် အကြိမ် ၆၀ လည်ပတ်ချိန်၌ 144Hz Gaming Monitor တွင် ၁၄၄ ကြိမ် လည်ပတ်သဖြင့် စက်မတူပါက အမြန်နှုန်း ကွာခြားသွားသည်။
* **ဖြေရှင်းနည်း**: ကုန်ဆုံးသွားသော အချိန်စက္ကန့် (**`THREE.Clock`**) ဖြင့် တွက်ချက်ခြင်း:

```javascript
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime() // စက္ကန့် (e.g. 1.2s, 2.5s)

    // စက်တိုင်းတွင် ၁ စက္ကန့်လျှင် ၁ ပတ် ပုံမှန် လည်စေခြင်း
    mesh.rotation.y = elapsedTime * Math.PI * 2

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

### ၃။ Trigonometry ($Math.sin$ & $Math.cos$) ဖြင့် လှိုင်းနှင့် စက်ဝိုင်းပတ် လှုပ်ရှားခြင်း

* $Math.sin(time)$: တန်ဖိုးကို **`-1` မှ `+1` ကြား** ချောမွေ့စွာ အတက်အဆင်း လှိုင်းပုံစံ ထုတ်ပေးသည်။
* $Math.cos(time)$ နှင့် ပေါင်းစပ်လိုက်သည့်အခါ **စက်ဝိုင်းပတ် (Orbit)** လှုပ်ရှားမှု ဖြစ်ပေါ်လာသည်:

```javascript
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // ၁။ ဒေါင်လိုက် အတက်အဆင်း လှိုင်းပုံစံ (Floating Effect)
    mesh.position.y = Math.sin(elapsedTime)

    // ၂။ ဘယ်/ညာ လှုပ်ရှားမှု ပေါင်းစပ်၍ စက်ဝိုင်းပတ် လှည့်ခြင်း
    mesh.position.x = Math.cos(elapsedTime)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
```

---

### ၄။ GSAP Animation Library ပေါင်းစပ်ခြင်း

ချောမွေ့သော Transitions များ၊ Bouncing များနှင့် Timelines များအတွက် **GSAP** ကို သုံးနိုင်သည်:

```bash
npm install gsap
```

```javascript
import gsap from 'gsap'

// ၁ စက္ကန့်အကြာတွင် X ဝင်ရိုး 2 unit သို့ ချောမွေ့စွာ ရွှေ့မည်
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// 🚨 သတိပြုရန်: Screen ပေါ်သို့ ရေးဆွဲရန် tick() loop ဆက်လက် လိုအပ်သည်
```

---

## 📋 အမြန်မှတ်စု (Lesson 05 Memo)

```javascript
// ANIMATION TICK LOOP CHEAT SHEET
import * as THREE from 'three'

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Smooth Sine Wave & Spin
  mesh.position.y = Math.sin(elapsedTime)
  mesh.rotation.y = elapsedTime * Math.PI

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
```
