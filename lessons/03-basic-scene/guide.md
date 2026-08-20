# 🎬 Three.js Journey - Lesson 03: Basic Scene (အခြေခံ Scene တည်ဆောက်ခြင်း)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 03: Basic Scene](https://threejs-journey.com/lessons/basic-scene)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 အဓိက အနှစ်ချုပ် (Core Concepts)

Three.js တွင် 3D ရုပ်ပုံတစ်ခု ဖန်သားပြင်ပေါ် ပေါ်လာစေရန် အနည်းဆုံး မဖြစ်မနေ လိုအပ်သော **အခြေခံ မဏ္ဍိုင် (၄) ခု** ရှိသည်:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Scene (ကမ္ဘာလောကကြီး / ကွန်တိန်နာ)                         │
│    └── 3D Object များ၊ မီးရောင်များ၊ ကင်မရာများ စုစည်းရာနေရာ  │
├─────────────────────────────────────────────────────────────┤
│ 2. Mesh (မျက်မြင် အရာဝတ္ထု)                                  │
│    ├── Geometry (ပုံသဏ္ဌာန် / အရိုးဖွဲ့စည်းပုံ)               │
│    └── Material (မျက်နှာပြင် အရောင် / အသားစိုင် / Texture)   │
├─────────────────────────────────────────────────────────────┤
│ 3. Camera (ကြည့်ရှုသည့် မျက်လုံး)                            │
│    └── Scene ထဲမှ မည်သည့်နေရာကို မည်သို့ မြင်ရမည်ကို သတ်မှတ်  │
├─────────────────────────────────────────────────────────────┤
│ 4. Renderer (ရေးဆွဲပေးသည့် စက်)                              │
│    └── Camera ၏ မြင်ကွင်းကို Canvas ပေါ်သို့ Render လုပ်ပေး    │
└─────────────────────────────────────────────────────────────┘
```

---

## 💻 Standard Boilerplate Code

```javascript
import * as THREE from 'three'

// 1. Scene ဖန်တီးခြင်း
const scene = new THREE.Scene()

// 2. Red Cube Mesh ဖန်တီးခြင်း
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 3. Sizes & Camera ဖန်တီးခြင်း
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// 4. Renderer ဖန်တီး၍ Render လုပ်ခြင်း
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

// Scene ကို Camera ဖြင့် ရေးဆွဲပြသခြင်း
renderer.render(scene, camera)
```

---

## ⚠️ သတိပြုရန် အချက်များ (Common Pitfalls)

1. **Camera Position မရွှေ့ခြင်း**: Mesh ရော Camera ပါ Default အားဖြင့် `(0, 0, 0)` နေရာတွင် စတင်သဖြင့် Camera ကို နောက်သို့ `camera.position.z = 3` မဆုတ်ထားပါက Mesh ၏ အတွင်းထဲသို့ ရောက်နေပြီး ဘာမှ မမြင်ရတော့ပါ။
2. **`scene.add(...)` ခေါ်ရန် မေ့လျော့ခြင်း**: Mesh သို့မဟုတ် Camera ကို ဖန်တီးပြီး Scene ထဲသို့ မထည့်ပါက Render ထဲတွင် ပေါ်လာမည် မဟုတ်ပါ။
