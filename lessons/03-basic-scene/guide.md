# 🎬 Three.js Journey - Lesson 03: First Three.js Project (ပထမဆုံး ပရောဂျက်နှင့် Basic Scene)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 03: First Three.js Project](https://threejs-journey.com/lessons/first-threejs-project)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် စနစ်တကျ ပြုစုသူ**: Antigravity  
> **အဆင့်**: အခြေခံ (Beginner Friendly)

---

## 🎯 ဤသင်ခန်းစာ၏ အဓိက ရည်ရွယ်ချက်
Vite Tool ဖြင့် ပရောဂျက်တစ်ခု စတင်တည်ဆောက်ပုံ၊ Three.js ၏ မရှိမဖြစ် **ပင်မမဏ္ဍိုင် (၄) ခု** ဖြစ်သော Scene, Mesh, Camera နှင့် Renderer တို့၏ အလုပ်လုပ်ပုံကို လက်တွေ့ ကုဒ်ရေးသားရင်း တတ်မြောက်စေရန် ဖြစ်ပါသည်။

---

## 💡 Mental Model: ရုပ်ရှင်ရိုက်ကူးရေး ဥပမာ (Movie Set Analogy)

Three.js တွင် 3D ပုံရိပ်တစ်ခု ပေါ်လာစေရန် အောက်ပါ အစိတ်အပိုင်း ၄ ခု အမြဲ လိုအပ်သည်:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Scene (စတူဒီယို အခန်း)                                                │
│    └── သရုပ်ဆောင်၊ ကင်မရာနှင့် မီးရောင်များ ထည့်သွင်းရာ ကမ္ဘာလောက        │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Mesh (သရုပ်ဆောင် / ရုပ်တု)                                          │
│    ├── Geometry (အရိုးဖွဲ့စည်းပုံ - ဥပမာ စက်လုံး၊ ကုဗတုံး)                  │
│    └── Material (အရေပြား / ဆေးရောင် - ဥပမာ အနီရောင်၊ သစ်သား၊ ဖန်)        │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Camera (ရိုက်ကူးသည့် ကင်မရာ)                                         │
│    └── မည်သည့် ထောင့်မှ၊ မည်သည့် အကွာအဝေးဖြင့် ကြည့်မည်ကို သတ်မှတ်သည်    │
├────────────────────────────────────────────────────────────────────────┤
│ 4. WebGLRenderer (ပရိုဂျက်တာ / ဖန်သားပြင်)                              │
│    └── ကင်မရာက မြင်ရသော မြင်ကွင်းကို Canvas ပေါ်သို့ ရေးဆွဲပြသပေးသည်      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ အဆင့် (၃) ဆင့်ဖြင့် Project စတင်ခြင်း (Vite Setup)

Terminal ဖွင့်၍ အောက်ပါ command ၃ ကြောင်းကို ရိုက်ပါ:

```bash
# ၁။ Node project အသစ် စတင်ခြင်း
npm init -y

# ၂။ Vite နှင့် Three.js package သွင်းယူခြင်း
npm install vite three

# ၃။ Local Server စတင် Run ခြင်း
npm run dev
```

---

## 💻 လက်တွေ့ ကုဒ်အပြည့်အစုံ (Annotated Code)

```javascript
import * as THREE from 'three'

// ၁။ HTML ရှိ Canvas Element ကို ဆွဲယူခြင်း
const canvas = document.querySelector('canvas.webgl')

// ၂။ Scene (ကမ္ဘာလောက) ဖန်တီးခြင်း
const scene = new THREE.Scene()

// ၃။ Mesh ဖန်တီးခြင်း = Geometry (အရိုး) + Material (အရေပြား)
const geometry = new THREE.BoxGeometry(1, 1, 1)                  // အရွယ်အစား (1x1x1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // အနီရောင်ဆေး
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh) // 💡 Scene ထဲသို့ ထည့်ရန် မမေ့ပါနှင့်

// ၄။ Sizes နှင့် Camera (ကင်မရာ) ဖန်တီးခြင်း
const sizes = { width: 800, height: 600 }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3 // 💡 ကင်မရာကို နောက်သို့ 3 unit ဆုတ်ထားခြင်း
scene.add(camera)

// ၅။ Renderer ဖန်တီး၍ Screen ပေါ်သို့ ရေးဆွဲခြင်း
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// ကင်မရာ မြင်ကွင်းကို Canvas ပေါ်သို့ ရေးဆွဲပြသခြင်း
renderer.render(scene, camera)
```

---

## ⚠️ အဖြစ်များဆုံး အမှားများနှင့် ဖြေရှင်းနည်း (Troubleshooting)

1. ❓ **ဖန်သားပြင်ပေါ် ဘာမှမပေါ်ဘဲ မဲမှောင်နေပါသလား?**
   * 👉 **အကြောင်းရင်း**: ကင်မရာ Position ကို နောက်သို့ မဆုတ်ထားမိခြင်း (`camera.position.z = 3`)။ Cube နှင့် ကင်မရာသည် `(0, 0, 0)` နေရာတူနေပါက ကင်မရာသည် Cube ၏ အတွင်းထဲ ရောက်နေပါမည်။
2. ❓ **`scene.add(mesh)` ထည့်ရန် မေ့လျော့နေပါသလား?**
   * 👉 Mesh ကို `new THREE.Mesh` ဖြင့် တည်ဆောက်ရုံဖြင့် မပြီးဘဲ `scene.add(mesh)` မခေါ်ပါက Scene ထဲ ရောက်မည် မဟုတ်ပါ။

---

## 📋 အမြန်မှတ်စု (Lesson 03 Memo)

```javascript
// THREE.JS CORE 4 BOILERPLATE
import * as THREE from 'three'

const scene = new THREE.Scene()
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, 800 / 600)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas.webgl') })
renderer.setSize(800, 600)
renderer.render(scene, camera)
```
