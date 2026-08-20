# 🏃 Three.js Journey - Lesson 05: Animations (လှုပ်ရှားသက်ဝင်စေခြင်းနှင့် အချိန်ကိုက် ထိန်းချုပ်ခြင်း)

---

## 📑 မာတိကာ (Table of Contents)

1. [Animation ဆိုတာ ဘာလဲ? (Stop-Motion သဘောတရား)](#၁-animation-ဆိုတာ-ဘာလဲ)
2. [RequestAnimationFrame Tick Loop အလုပ်လုပ်ပုံ](#၂-requestanimationframe-tick-loop-အလုပ်လုပ်ပုံ)
3. [FPS ကွာခြားမှု ပြဿနာနှင့် Delta Time (Frame Rate Independence)](#၃-fps-ကွာခြားမှု-ပြဿနာနှင့်-delta-time)
   - Date.now() ဖြင့် တွက်ချက်ပုံ
4. [THREE.Clock ဖြင့် သဘာဝကျသော လှုပ်ရှားမှုများ ဖန်တီးခြင်း](#၄-threeclock-ဖြင့်-သဘာဝကျသော-လှုပ်ရှားမှုများ-ဖန်တီးခြင်း)
   - `clock.getElapsedTime()` ၏ စွမ်းဆောင်ရည်
   - Trigonometry ($Math.sin$ & $Math.cos$) ဖြင့် လှိုင်းပုံစံ/စက်ဝိုင်းပတ် လှုပ်ရှားခြင်း
   - Camera ကို လှည့်ပတ်၍ Mesh အား မျက်နှာမူစေခြင်း (`lookAt`)
   - ⚠️ `clock.getDelta()` သုံးရာတွင် သတိပြုရန်
5. [GSAP (GreenSock) Animation Library ပေါင်းစပ် အသုံးပြုခြင်း](#၅-gsap-greensock-animation-library-ပေါင်းစပ်-အသုံးပြုခြင်း)
6. [မည်သည့်နည်းလမ်းကို မည်သည့်အခါတွင် သုံးသင့်သလဲ? (Decision Guide)](#၆-မည်သည့်နည်းလမ်းကို-မည်သည့်အခါတွင်-သုံးသင့်သလဲ)
7. [အနှစ်ချုပ် မှတ်စုတို (Lesson 05 Memo)](#၇-အနှစ်ချုပ်-မှတ်စုတို)

---

# ၁။ Animation ဆိုတာ ဘာလဲ? (Stop-Motion သဘောတရား)

3D Animation ဆိုသည်မှာ **Stop-motion ရုပ်ရှင်** တစ်ခု ရိုက်ကူးသကဲ့သို့ ဖြစ်သည်။

Frame တိုင်းတွင် အရာဝတ္ထုများ၏ Property (`position`, `rotation`, `scale`) များကို အနည်းငယ်စီ ပြောင်းလဲပေးပြီး၊ ထိုပြောင်းလဲသွားသော မြင်ကွင်းကို Renderer ဖြင့် Screen ပေါ်သို့ တစ်စက္ကန့်လျှင် အကြိမ် ၆၀ (60 FPS) အမြန်နှုန်းဖြင့် အဆက်မပြတ် ပြန်လည် ရေးဆွဲပြသပေးခြင်း ဖြစ်သည်။

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Frame 1      │ ──> │ Frame 2      │ ──> │ Frame 3      │ ──> │ Frame 60     │
│ rot.y = 0.01 │     │ rot.y = 0.02 │     │ rot.y = 0.03 │     │ rot.y = 0.60 │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

# ၂။ RequestAnimationFrame Tick Loop အလုပ်လုပ်ပုံ

Browser များတွင် Animation တစ်ခုကို မျက်နှာပြင် Refresh Rate နှင့် ကိုက်ညီစွာ စွမ်းဆောင်ရည် အကောင်းဆုံး ခေါ်ဆိုနိုင်ရန် **`window.requestAnimationFrame(...)`** Function ကို အသုံးပြုရသည်:

```javascript
// Function ကိုယ်တိုင် ပြန်လည်ခေါ်ဆိုသော Infinite Loop (Recursion)
const tick = () => {
    // 1. အရာဝတ္ထုများကို ပြောင်းလဲခြင်း
    mesh.rotation.y += 0.01

    // 2. Scene ကို ပြန်လည် Render လုပ်ခြင်း
    renderer.render(scene, camera)

    // 3. နောက် Frame တွင် ဤ function အား ထပ်မံခေါ်ရန် Browser အား တောင်းဆိုခြင်း
    window.requestAnimationFrame(tick)
}

tick() // ပထမဆုံးအကြိမ် စတင် ခေါ်ယူခြင်း
```

> 💡 **အားသာချက်**: `requestAnimationFrame` သည် User က အခြား Tab သို့ ပြောင်းသွားသည့်အခါ သို့မဟုတ် Window ကို Minimize လုပ်ထားသည့်အခါ CPU/GPU မကုန်စေရန် Loop ကို အလိုအလျောက် ရပ်တန့် (Pause) ပေးထားသည်။

---

# ၃။ FPS ကွာခြားမှု ပြဿနာနှင့် Delta Time

အထက်ပါ ကုဒ်တွင် `mesh.rotation.y += 0.01` ဟု ရေးသားထားပါက:
* **60Hz မျက်နှာပြင်** ရှိသော ကွန်ပျူတာတွင် ၁ စက္ကန့်လျှင် အကြိမ် ၆၀ ခေါ်သဖြင့် $60 \times 0.01 = 0.6$ လည်မည်။
* **144Hz / 240Hz မျက်နှာပြင် (Gaming Monitor/MacBook Pro)** တွင် ၁ စက္ကန့်လျှင် အကြိမ် ၁၄၄ ကြိမ် ခေါ်သဖြင့် $144 \times 0.01 = 1.44$ လည်ပြီး **၂ ဆကျော် ပိုမြန်နေမည်** ဖြစ်သည်။

---

### Date.now() ဖြင့် Delta Time တွက်ချက်၍ ဖြေရှင်းပုံ:
Frame တစ်ခုနှင့် တစ်ခုကြား ကုန်ဆုံးသွားသော အချိန်ကွာခြားချက် (**Delta Time**) ဖြင့် မြှောက်ပေးရမည်:

```javascript
let time = Date.now()

const tick = () => {
    const currentTime = Date.now()
    const deltaTime = currentTime - time // Frame နှစ်ခုကြား ကွာခြားသော မီလီစက္ကန့် (e.g. 16ms)
    time = currentTime

    // deltaTime ဖြင့် မြှောက်ပေးလိုက်သဖြင့် မည်သည့် စက်တွင်မဆို အမြန်နှုန်း တူညီသွားမည်
    mesh.rotation.y += 0.001 * deltaTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

# ၄။ THREE.Clock ဖြင့် သဘာဝကျသော လှုပ်ရှားမှုများ ဖန်တီးခြင်း

Three.js တွင် အချိန်ကို ပိုမိုလွယ်ကူ စနစ်တကျ တိုင်းတာနိုင်ရန် **`THREE.Clock`** class ပါရှိသည်:

```javascript
const clock = new THREE.Clock()

const tick = () => {
    // Clock စတင်ချိန်မှ ကုန်ဆုံးသွားသော စက္ကန့် (e.g. 1.54s, 2.89s)
    const elapsedTime = clock.getElapsedTime()

    // 1 စက္ကန့်လျှင် 1 ပတ် (2*PI) ပုံမှန်လည်စေခြင်း
    mesh.rotation.y = elapsedTime * Math.PI * 2

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

### Trigonometry ($Math.sin$ & $Math.cos$) ဖြင့် လှိုင်းနှင့် စက်ဝိုင်းပတ် လှုပ်ရှားမှုများ:

$Math.sin(\text{time})$ သည် အချိန်ကြာလာသည်နှင့်အမျှ တန်ဖိုးကို **`-1` မှ `+1` ကြား** ချောမွေ့စွာ အတက်အဆင်း လှိုင်းပုံစံ ထုတ်ပေးသည်:

```javascript
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // 1. ဒေါင်လိုက် အတက်အဆင်း လှိုင်းပုံစံ (Hovering / Floating Effect)
    mesh.position.y = Math.sin(elapsedTime)

    // 2. ဘယ်/ညာ လှုပ်ရှားမှု ပေါင်းစပ်၍ စက်ဝိုင်းပတ် လှည့်ခြင်း
    mesh.position.x = Math.cos(elapsedTime)

    // 3. ကင်မရာကို စက်ဝိုင်းပတ် လှည့်၍ အလယ်က Mesh ကို မျက်နှာမူစေခြင်း
    camera.position.x = Math.cos(elapsedTime) * 3
    camera.position.z = Math.sin(elapsedTime) * 3
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
```

> ⚠️ **သတိပြုရန် (`getDelta()` vs `getElapsedTime()`)**:  
> သင်၏ Code ထဲတွင် `clock.getDelta()` နှင့် `clock.getElapsedTime()` ကို ရောနှော မသုံးပါနှင့်။ `getDelta()` သည် Clock ၏ အတွင်းပိုင်း Timestamp ကို Reset ချပစ်သဖြင့် `getElapsedTime()` ၏ တန်ဖိုးများ လွဲချော်သွားတတ်ပါသည်။ ပုံမှန်အားဖြင့် `getElapsedTime()` ကိုသာ အသုံးပြုသင့်ပါသည်။

---

# ၅။ GSAP (GreenSock) Animation Library ပေါင်းစပ် အသုံးပြုခြင်း

ရှုပ်ထွေးသော Keyframes, Chaining Transitions, Bouncing သို့မဟုတ် Elastic Easing များအတွက် **[GSAP](https://greensock.com/gsap/)** ကို တွဲဖက် အသုံးပြုနိုင်သည်:

### အဆင့် (၁): GSAP သွင်းယူခြင်း
```bash
npm install gsap
```

### အဆင့် (၂): GSAP Code ရေးသားခြင်း
```javascript
import gsap from 'gsap'

// 1 စက္ကန့်အကြာတွင် X ဝင်ရိုး 2 unit သို့ 1 စက္ကန့်အတွင်း ချောမွေ့စွာ ရွှေ့မည်
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// 2 စက္ကန့်အကြာတွင် X ဝင်ရိုး 0 သို့ ပြန်လာမည်
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// 🚨 အရေးကြီး: GSAP သည် Property တန်ဖိုးများကို ပြောင်းလဲပေးရုံသာ ဖြစ်၍
// Screen ပေါ်သို့ ရေးဆွဲရန် tick() loop ထဲတွင် renderer.render() ဆက်လက် လိုအပ်သည်
const tick = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

# ၆။ မည်သည့်နည်းလမ်းကို မည်သည့်အခါတွင် သုံးသင့်သလဲ?

| လိုအပ်ချက် / အခြေအနေ | အကြံပြု နည်းလမ်း |
| :--- | :--- |
| **အမြဲတမ်း ပုံမှန် လည်ပတ်နေသော လှုပ်ရှားမှုများ** (e.g. ပန်ကာ၊ ကမ္ဘာလုံး၊ ရေလှိုင်း) | **`THREE.Clock` + `Math.sin/cos`** |
| **User Interaction ကြောင့်ဖြစ်သော ချောမွေ့သည့် အကူးအပြောင်းများ** (e.g. Page Transition, Camera Move to Target, UI Click Animation) | **`GSAP` Library** |
| **ဆွဲငင်အား၊ တိုက်မိခြင်းနှင့် ရူပဗေဒ လှုပ်ရှားမှုများ** (e.g. ဘောလုံးခုန်ခြင်း၊ ကားမောင်းခြင်း) | **`Physics Engine (Cannon.js)`** (Chapter 3 တွင် သင်ရမည်) |

---

# ၇။ အနှစ်ချုပ် မှတ်စုတို (Lesson 05 Memo)

```javascript
// ==========================================
// 1. STANDARD TICK ANIMATION LOOP
// ==========================================
import * as THREE from 'three'

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Circular Orbit Math
    mesh.position.y = Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)
    mesh.rotation.y = elapsedTime * Math.PI

    // Render Scene
    renderer.render(scene, camera)

    // Call Next Frame
    window.requestAnimationFrame(tick)
}
tick()

// ==========================================
// 2. GSAP TWEEN INTEGRATION
// ==========================================
import gsap from 'gsap'

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
```
