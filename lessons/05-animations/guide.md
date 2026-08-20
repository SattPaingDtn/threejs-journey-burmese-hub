# 🏃 Three.js Journey - Lesson 05: Animations (ကာတွန်းလှုပ်ရှားမှု ဖန်တီးခြင်း)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 05: Animations](https://threejs-journey.com/lessons/animations)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 Core Concepts

Animation ဆိုသည်မှာ အရာဝတ္ထုတစ်ခု၏ property (ဥပမာ - `position`, `rotation`) များကို Frame တိုင်း အနည်းငယ်စီ ပြောင်းလဲပေးပြီး Screen ပေါ်သို့ ပြန်လည် Render လုပ်ပေးခြင်း ဖြစ်သည်။

---

## 1. RequestAnimationFrame Tick Loop

Browser ၏ မျက်နှာပြင် Refresh Rate (60Hz / 120Hz / 144Hz) အတိုင်း Frame တိုင်း Function ကို အလိုအလျောက် ပြန်ခေါ်ပေးသည်:

```javascript
const tick = () => {
    // 1. Update Objects
    mesh.rotation.y += 0.01

    // 2. Render Scene
    renderer.render(scene, camera)

    // 3. Next Frame Call
    window.requestAnimationFrame(tick)
}

tick()
```

---

## 2. Frame Rate Independence (FPS ကွာခြားမှု ပြဿနာ ဖြေရှင်းနည်း)

ကွန်ပျူတာ မတူညီပါက Frame Rate (FPS) ကွာခြားနိုင်သည် (ဥပမာ - 60Hz မျက်နှာပြင်တွင် 60 ကြိမ် run ချိန်၌ 144Hz မျက်နှာပြင်တွင် 144 ကြိမ် run သဖြင့် ပိုမြန်နေမည်)။

### THREE.Clock အသုံးပြု၍ Delta Time တွက်ချက်ခြင်း:
`THREE.Clock` သည် စက္ကန့် အချိန် (Elapsed Time) ကို တိုင်းတာပေးသဖြင့် မည်သည့် စက်တွင်မဆို အမြန်နှုန်း တူညီနေမည်:

```javascript
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime() // စတင်ချိန်မှ ကုန်ဆုံးသွားသော စက္ကန့်

    // 1 စက္ကန့်လျှင် 1 ပတ် လည်စေခြင်း
    mesh.rotation.y = elapsedTime * Math.PI * 2

    // တက်လိုက် ဆင်းလိုက် လှိုင်းပုံစံ Animation (Math.sin)
    mesh.position.y = Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

## 3. GSAP (GreenSock Animation Platform) Library ပေါင်းစပ်ခြင်း

ရှုပ်ထွေးသော Keyframe နှင့် Easing Animations များအတွက် GSAP ကို တွဲသုံးနိုင်သည်:

```javascript
import gsap from 'gsap'

// 2 စက္ကန့်အတွင်း X ဝင်ရိုး 2 unit သို့ ချောမွေ့စွာ ရွေ့စေခြင်း
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// GSAP သုံးသော်လည်း Canvas ကို ပြန်ရေးဆွဲရန် RequestAnimationFrame loop လိုအပ်ဆဲဖြစ်သည်
const tick = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```
