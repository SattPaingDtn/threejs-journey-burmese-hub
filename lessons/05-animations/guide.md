# 🏃 Lesson 05: အရာဝတ္ထုများကို လှုပ်ရှားသက်ဝင်စေခြင်း (Animations)

> **သင်ကြားပြသသူ**: Bruno Simon (Three.js Journey)  
> **မြန်မာဘာသာ ပြုစုရှင်းလင်းသူ**: Antigravity  
> **သင်ခန်းစာ ပုံစံ**: ဆရာတစ်ယောက်က အနီးကပ် ရှင်းပြသလို ရင်းနှီးလွယ်ကူသော လမ်းညွှန်

---

## 👋 မင်္ဂလာပါ! အခု ကျွန်တော်တို့ရဲ့ 3D လောကကြီးကို စတင် လှုပ်ရှားစေတော့မှာ ဖြစ်ပါတယ်!

3D Animation ဆိုတာ တကယ်တော့ စာအုပ်ထောင့်လေးတွေမှာ အရုပ်လေးတွေ တစ်မျက်နှာချင်းစီ ဆွဲပြီး လက်မနဲ့ အမြန် လှန်ကြည့်တဲ့ **Flipbook ကာတွန်းစာအုပ်** နဲ့ အတူတူပါပဲ။

Frame တိုင်းမှာ အရာဝတ္ထုလေးတွေကို နည်းနည်းစီ ရွှေ့ပေးပြီး တစ်စက္ကန့်ကို အကြိမ် ၆၀ (60 FPS) အရှိန်နဲ့ ဖန်သားပြင်ပေါ် အဆက်မပြတ် ပြန်လည် ရေးဆွဲပြသပေးတာ ဖြစ်ပါတယ်။

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Frame 1      │ ──> │ Frame 2      │ ──> │ Frame 3      │ ──> │ Frame 60     │
│ rot.y = 0.01 │     │ rot.y = 0.02 │     │ rot.y = 0.03 │     │ rot.y = 0.60 │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

---

## 🔄 ၁။ RequestAnimationFrame Tick Loop အလုပ်လုပ်ပုံ

Animation လုပ်ဖို့အတွက် Browser ရဲ့ အကောင်းဆုံး Function ဖြစ်တဲ့ **`window.requestAnimationFrame(...)`** ကို သုံးရပါတယ်:

```javascript
// Function ကိုယ်တိုင် ပြန်လည်ခေါ်ဆိုသော Loop (Recursion)
const tick = () => {
    // ၁။ အရာဝတ္ထုကို နည်းနည်းလေး လှည့်လိုက်မယ်
    mesh.rotation.y += 0.01

    // ၂။ Scene ကို ပြန်လည် Render လုပ်မယ်
    renderer.render(scene, camera)

    // ၃။ နောက် Frame မှာ ဒီ function ကို ထပ်ခေါ်ပေးပါလို့ Browser ကို တောင်းဆိုမယ်
    window.requestAnimationFrame(tick)
}

tick() // ပထမဆုံး စတင်ခေါ်ယူလိုက်ပြီ!
```

> 💡 **Browser ရဲ့ ကောင်းကွက်**: `requestAnimationFrame` ဟာ User က အခြား Tab ကို ကူးသွားတဲ့အခါ ကွန်ပျူတာ အပူမလွန်စေဖို့ Loop ကို အလိုအလျောက် ရပ်တန့် (Pause) ပေးထားပါတယ်။

---

## ⏱️ ၂။ Gaming Monitor တွေရဲ့ ထောင်ချောက်နှင့် THREE.Clock

အပေါ်က ကုဒ်မှာ `mesh.rotation.y += 0.01` လို့ ရေးထားရင်:
* **60Hz သာမန် Screen** မှာ ၁ စက္ကန့်ကို အကြိမ် ၆၀ ပဲ လည်ပေမယ့်...
* **144Hz / 240Hz Gaming Monitor** မှာ ၁ စက္ကန့်ကို ၁၄၄ ကြိမ် လည်ပတ်ပြီး **၂ ဆကျော် ပိုမြန်နေပါလိမ့်မယ်!**

### ဖြေရှင်းနည်း: `THREE.Clock` ကို အသုံးပြုခြင်း
Frame အရေအတွက်အစား ကုန်ဆုံးသွားတဲ့ **အချိန် (Elapsed Time စက္ကန့်)** နဲ့ တွက်ချက်လိုက်ရင် မည်သည့်စက်မှာမဆို အမြန်နှုန်း အတူတူ ဖြစ်သွားပါမယ်:

```javascript
const clock = new THREE.Clock()

const tick = () => {
    // စတင်ချိန်မှ ကုန်ဆုံးသွားသော စက္ကန့် (e.g. 1.2s, 2.5s)
    const elapsedTime = clock.getElapsedTime()

    // စက်တိုင်းတွင် ၁ စက္ကန့်လျှင် ၁ ပတ် (2*PI) ပုံမှန် လည်ပတ်စေခြင်း
    mesh.rotation.y = elapsedTime * Math.PI * 2

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

## 🌊 ၃။ $Math.sin$ နဲ့ $Math.cos$ ဖြင့် သဘာဝကျသော လှုပ်ရှားမှုများ

* **$Math.sin(time)$**: အချိန်ကြာလာတာနဲ့အမျှ တန်ဖိုးကို **`-1` နဲ့ `+1` ကြား** ချောမွေ့စွာ အတက်အဆင်း လှိုင်းပုံစံ ထုတ်ပေးတယ် (Floating / Bouncing Effect)။
* **$Math.cos(time)$ နဲ့ ပေါင်းစပ်လိုက်တဲ့အခါ**: နေကို လှည့်ပတ်နေတဲ့ ဂြိုဟ်တွေလို **စက်ဝိုင်းပတ် (Orbit)** လှုပ်ရှားမှု ဖြစ်လာတယ်!

```javascript
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // ၁။ အပေါ်အောက် ဖြည်းဖြည်းလေး ပျံဝဲနေစေခြင်း
    mesh.position.y = Math.sin(elapsedTime)

    // ၂။ ကင်မရာကို စက်ဝိုင်းပတ် လှည့်ပြီး Mesh ကို အမြဲ ချိန်ထားခြင်း
    camera.position.x = Math.cos(elapsedTime) * 3
    camera.position.z = Math.sin(elapsedTime) * 3
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
```

---

## ⚡ ၄။ GSAP Animation Library ပေါင်းစပ်ခြင်း

ခလုတ်နှိပ်လိုက်တဲ့အခါ ချောမွေ့စွာ ခုန်တက်သွားတာ၊ ရွေ့သွားတာမျိုးအတွက် **GSAP** ကို သုံးနိုင်ပါတယ်:

```bash
npm install gsap
```

```javascript
import gsap from 'gsap'

// ၁ စက္ကန့်အတွင်း X ဝင်ရိုး 2 unit ဆီသို့ ချောမွေ့စွာ ရွှေ့မယ်
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// 🚨 သတိပြုရန်: Screen ပေါ် ပေါ်စေဖို့ tick() loop ထဲက renderer.render() ဆက်လက် လိုအပ်ပါသည်
```

---

## 💡 ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Memory Hook)

> 🧠 **ဒီလိုလေး မှတ်ထားလိုက်ပါ**:  
> * **Animation Loop** = `requestAnimationFrame(tick)`  
> * **စက်တိုင်းမှာ အမြန်နှုန်း တူညီစေဖို့** = `clock.getElapsedTime()` သုံးရမည်  
> * **အပေါ်အောက် လှိုင်းပုံစံ ပျံဝဲစေဖို့** = `Math.sin(elapsedTime)`  
> * **စက်ဝိုင်းပတ် လှည့်ပတ်စေဖို့** = `Math.cos()` နဲ့ `Math.sin()` ပေါင်းသုံးပါ
