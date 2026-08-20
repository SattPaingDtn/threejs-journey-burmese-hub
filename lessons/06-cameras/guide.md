# 📸 Lesson 06: ကင်မရာစနစ် အပြည့်အစုံ (Cameras & OrbitControls)

> **သင်ကြားပြသသူ**: Bruno Simon (Three.js Journey)  
> **မြန်မာဘာသာ ပြုစုရှင်းလင်းသူ**: Antigravity  
> **သင်ခန်းစာ ပုံစံ**: ဆရာတစ်ယောက်က အနီးကပ် ရှင်းပြသလို ရင်းနှီးလွယ်ကူသော လမ်းညွှန်

---

## 👋 မင်္ဂလာပါ! အခု ကျွန်တော်တို့ မှန်ဘီလူး ရွေးချယ်ကြတော့မှာ ဖြစ်ပါတယ်!

3D လောကမှာ Scene တစ်ခုလုံး ဘယ်လောက်ပဲ လှပနေပါစေ၊ မှန်ကန်တဲ့ ကင်မရာထောင့်ကနေ မကြည့်ရင် ဘာမှ မြင်ရမှာ မဟုတ်ပါဘူး။

Three.js မှာ အဓိက သုံးတဲ့ ကင်မရာ (၂) မျိုး ရှိတယ်:

```
┌─────────────────────────────────────────┐     ┌─────────────────────────────────────────┐
│     🎥 PerspectiveCamera (လူ့မျက်လုံး)     │     │   📐 OrthographicCamera (အင်ဂျင်နီယာပုံစံ)│
├─────────────────────────────────────────┤     ├─────────────────────────────────────────┤
│ • အနီးရှိအရာများ ကြီးပြီး အဝေးရှိအရာများ သေး│     │ • အကွာအဝေးကြောင့် ပုံမသေးသွားဘဲ မျဉ်းပြိုင်│
│ • ပိရမစ် ထိပ်ပြတ် (Frustum) ပုံစံ       │     │ • သေတ္တာ (Box) ပုံစံ                    │
│ • 3D ဝက်ဘ်ဆိုက်များနှင့် ဂိမ်းများအတွက်  │     │ • Isometric Games & 2D ပုံဆွဲခြင်းအတွက်│
└─────────────────────────────────────────┘     └─────────────────────────────────────────┘
```

---

## 🎥 ၁။ PerspectiveCamera အသေးစိတ် နားလည်ခြင်း

```javascript
const camera = new THREE.PerspectiveCamera(
    75,                         // 1. FOV (Field of View)
    sizes.width / sizes.height, // 2. Aspect Ratio
    0.1,                        // 3. Near Plane
    100                         // 4. Far Plane
)
```

```
          Near Plane         Far Plane
             ┌───┐          ┌─────────┐
    Eye     /     \        /           \
     ● ────/───────\──────/─────────────\
            \     /        \           /
             └───┘          └─────────┘
              ◄─── View Frustum ───►
```

### (က) FOV (Field of View - မြင်ကွင်းကျယ်)
* ကင်မရာရဲ့ ဒေါင်လိုက် မြင်ကွင်းကျယ် ဒီဂရီ ဖြစ်ပါတယ်။
* `75°` ဆိုတာ လူ့မျက်လုံးလို သဘာဝကျတဲ့ မြင်ကွင်းပါ။
* `120°+` ထားရင် ဘေးဘက်တွေ စောင်းရွဲ့သွားမယ် (Fish-eye)။
* `25°` လောက်ထားရင် တယ်လီစကုပ်နဲ့ ချဲ့ကြည့်သလို ဖြစ်သွားပါမယ်။

### (ခ) Near & Far Planes (မြင်နိုင်သော အကွာအဝေး အကန့်အသတ်)
* ကင်မရာဟာ `near` ထက် ပိုနီးတဲ့ အရာတွေနဲ့ `far` ထက် ပိုဝေးတဲ့ အရာတွေကို ဖြတ်တောက် (Clip) ပစ်ပါတယ်။
* ⚠️ **ဆရာ့ရဲ့ အရေးကြီး သတိပေးချက် (Z-Fighting ရှောင်ရန်)**:  
  `near: 0.0001` နဲ့ `far: 99999` လို့ အစွန်းမရောက်ပါစေနဲ့! GPU ရဲ့ Depth Buffer တွက်ချက်မှု တိကျမှု လျော့သွားပြီး မျက်နှာပြင် နှစ်ခု ထပ်တူကျတဲ့အခါ တဖျတ်ဖျတ် ပျက်စီးတဲ့ **Z-Fighting** ဖြစ်ပွားတတ်ပါတယ်။ (အကြံပြုချက်: `near: 0.1, far: 100`)။

---

## 📐 ၂။ OrthographicCamera (အင်ဂျင်နီယာ ပုံစံပြား)

အကွာအဝေးကြောင့် ပုံမသေးသွားဘဲ SimCity, Age of Empires လို Isometric ဂိမ်းတွေ ဖန်တီးချင်ရင် သုံးပါတယ်:

```javascript
const aspect = sizes.width / sizes.height
const frustumSize = 4

const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2, // Left
     frustumSize * aspect / 2, // Right
     frustumSize / 2,          // Top
    -frustumSize / 2,          // Bottom
     0.1,                      // Near
     100                       // Far
)
```

---

## 🕹️ ၃။ OrbitControls (Mouse ဖြင့် ၃၆၀ ဒီဂရီ လှည့်ပတ်ခြင်း)

Three.js မှာ အသုံးအများဆုံး Controller ဖြစ်ပါတယ်။ Mouse Click & Drag နဲ့ လှည့်ပတ်လို့ ရအောင် လုပ်ပေးပါတယ်:

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// OrbitControls စတင် ဖန်တီးခြင်း
const controls = new OrbitControls(camera, canvas)

// 💡 Damping: ကားဘရိတ်ကို အရှိန်နဲ့ ညင်သာစွာ နင်းသလို ချောမွေ့သွားစေခြင်း
controls.enableDamping = true
controls.dampingFactor = 0.05

// 🚨 အရမ်းအရေးကြီးတယ်: Damping အလုပ်လုပ်ဖို့ tick() loop ထဲမှာ update() ခေါ်ပေးရမယ်
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

## 💡 ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Memory Hook)

> 🧠 **ဒီလိုလေး မှတ်ထားလိုက်ပါ**:  
> * **လူ့မျက်လုံးလို သဘာဝကျချင်ရင်** = `PerspectiveCamera(75, aspect, 0.1, 100)`  
> * **2D / Isometric ဂိမ်းလို မျဉ်းပြိုင်ကြည့်ချင်ရင်** = `OrthographicCamera`  
> * **Z-Fighting ကာကွယ်ဖို့** = `near` ကို အရမ်းမသေးစေနဲ့၊ `far` ကို အရမ်းမကြီးစေနဲ့  
> * **Mouse လှည့်ပတ်မှု ချောမွေ့စေဖို့** = `controls.enableDamping = true`
