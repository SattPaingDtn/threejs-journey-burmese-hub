# 🎬 Three.js Journey - Lesson 03: First Three.js Project (ပထမဆုံး Three.js ပရောဂျက်နှင့် Build Tools)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 03: First Three.js Project](https://threejs-journey.com/lessons/first-threejs-project)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity  
> **ချဉ်းကပ်မှုပုံစံ**: Medium / Balanced Deep Dive (အခြေခံ Setup မှ Core 4 ခု၏ အလုပ်လုပ်ပုံအထိ လက်တွေ့ကျကျ ရှင်းလင်းချက်)

---

## 📑 မာတိကာ (Table of Contents)

1. [Local Server နှင့် Build Tools ဘာကြောင့် လိုအပ်သလဲ? (Why Vite?)](#၁-local-server-နှင့်-build-tools-ဘာကြောင့်-လိုအပ်သလဲ)
2. [Node.js, NPM နှင့် Package Management အခြေခံ](#၂-nodejs-npm-နှင့်-package-management-အခြေခံ)
3. [Vite + Three.js Project အစမှအဆုံး တည်ဆောက်ခြင်း (Step-by-Step)](#၃-vite--threejs-project-အစမှအဆုံး-တည်ဆောက်ခြင်း)
4. [Three.js ၏ မရှိမဖြစ် ပင်မမဏ္ဍိုင် (၄) ခု (The Core 4 Elements)](#၄-threejs-၏-မရှိမဖြစ်-ပင်မမဏ္ဍိုင်-၄-ခု)
   - ၁။ Scene (ကမ္ဘာလောက ကွန်တိန်နာ)
   - ၂။ Mesh (Geometry + Material)
   - ၃။ Camera (PerspectiveCamera နှင့် နေရာချထားခြင်း)
   - ၄။ Renderer (WebGLRenderer ဖြင့် ရေးဆွဲခြင်း)
5. [အဖြစ်များဆုံး အမှားများနှင့် ဖြေရှင်းနည်း (Troubleshooting)](#၅-အဖြစ်များဆုံး-အမှားများနှင့်-ဖြေရှင်းနည်း)
6. [အမြန်မှတ်စုနှင့် Code Cheat Sheet (Lesson 03 Memo)](#၆-အမြန်မှတ်စုနှင့်-code-cheat-sheet)

---

# ၁။ Local Server နှင့် Build Tools ဘာကြောင့် လိုအပ်သလဲ?

HTML ဖိုင်ကို Double-click နှိပ်၍ `file:///` ပုံစံဖြင့် တိုက်ရိုက်ဖွင့်ပါက Browser များ၏ Security Policy (CORS) အရ ES Modules (`import * as THREE from 'three'`), Texture ပုံများနှင့် 3D Model များကို ဆွဲယူခွင့် မပြုဘဲ Error တက်တတ်ပါသည်။

ထို့ကြောင့် **Local Web Server** တစ်ခု မဖြစ်မနေ လိုအပ်သည်။ ဤသင်တန်းတွင် ကမ္ဘာ့အမြန်ဆုံးနှင့် အပေါ့ပါးဆုံး Build Tool ဖြစ်သော **[Vite](https://vitejs.dev/)** ကို အသုံးပြုပါသည်:

* ⚡ **Hot Module Replacement (HMR)**: Code ပြင်လိုက်သည်နှင့် Browser ကို Manual Reload လုပ်ရန်မလိုဘဲ ချက်ချင်း ပြောင်းလဲသွားသည်။
* 📦 **Dependency Bundling**: `node_modules` မှ Package များကို အလိုအလျောက် ပေါင်းစည်းပေးသည်။

---

# ၂။ Node.js, NPM နှင့် Package Management အခြေခံ

* **Node.js**: JavaScript ကို Browser အပြင်ဘက် Terminal/Computer ပေါ်တွင် Run နိုင်စေသော Runtime ဖြစ်သည်။ (`node -v` ဖြင့် စစ်ဆေးနိုင်သည်)။
* **NPM (Node Package Manager)**: Three.js, Vite ကဲ့သို့သော Open-source Library များကို Download ဆွဲယူ စီမံပေးသော Tool ဖြစ်သည်။
* **`package.json`**: သင့် Project တွင် သုံးထားသော Library အမည်များနှင့် Version များကို မှတ်တမ်းတင်ထားသော စာရင်း ဖြစ်သည်။
* **`node_modules/`**: Download ဆွဲထားသော Library ဖိုင်အစစ်များ သိမ်းဆည်းရာ ဖိုဒါဖြစ်သည်။ (အခြားသူများသို့ Project ပေးပို့သည့်အခါ ဤဖိုဒါကို ချန်လှပ်၍ ပို့ရသည်)။

---

# ၃။ Vite + Three.js Project အစမှအဆုံး တည်ဆောက်ခြင်း

### အဆင့် (၁): Node Project စတင်ခြင်း
Terminal (VSCode တွင် `Ctrl + J` / `Cmd + J`) ဖွင့်၍:
```bash
npm init -y
```

### အဆင့် (၂): Dependencies (Vite & Three.js) သွင်းယူခြင်း
```bash
npm install vite three
```

### အဆင့် (၃): `package.json` တွင် Scripts သတ်မှတ်ခြင်း
```json
{
  "name": "my-first-threejs",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "three": "^0.160.0",
    "vite": "^5.0.0"
  }
}
```

### အဆင့် (၄): HTML ဖိုင် (`index.html`) တည်ဆောက်ခြင်း
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>03 - First Three.js Project</title>
</head>
<body>
    <!-- 3D Scene ကို ရေးဆွဲမည့် Canvas Element -->
    <canvas class="webgl"></canvas>
    <script type="module" src="./script.js"></script>
</body>
</html>
```

### အဆင့် (၅): Local Dev Server စတင်ခြင်း
```bash
npm run dev
```
Terminal တွင် ပေါ်လာသော `http://localhost:5173/` သို့ Browser ဖြင့် ဝင်ရောက်ပါ။

---

# ၄။ Three.js ၏ မရှိမဖြစ် ပင်မမဏ္ဍိုင် (၄) ခု

3D ရုပ်ပုံတစ်ခု ဖန်သားပြင်ပေါ် ပေါ်လာစေရန် အောက်ပါ အစိတ်အပိုင်း ၄ ခု မဖြစ်မနေ လိုအပ်သည်:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Scene (ကမ္ဘာလောက ကွန်တိန်နာ)                                          │
│    └── Object များ၊ ကင်မရာများ၊ မီးရောင်များ ထည့်သွင်းရာ အခန်း            │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Mesh (မျက်မြင် အရာဝတ္ထု) = Geometry (အရိုး) + Material (အရေပြား/ဆေး)  │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Camera (ကြည့်ရှုသည့် မျက်လုံး)                                       │
│    └── Scene ထဲမှ မည်သည့်နေရာကို မည်သို့ မြင်ရမည်ကို သတ်မှတ်             │
├────────────────────────────────────────────────────────────────────────┤
│ 4. WebGLRenderer (ရေးဆွဲပေးသည့် စက်)                                    │
│    └── Camera ၏ မြင်ကွင်းကို Canvas ပေါ်သို့ ရေးဆွဲပြသပေး                │
└────────────────────────────────────────────────────────────────────────┘
```

```javascript
// script.js အပြည့်အစုံ
import * as THREE from 'three'

// 1. Canvas ဆွဲယူခြင်း
const canvas = document.querySelector('canvas.webgl')

// 2. Scene တည်ဆောက်ခြင်း
const scene = new THREE.Scene()

// 3. Red Cube Mesh တည်ဆောက်ခြင်း
const geometry = new THREE.BoxGeometry(1, 1, 1)          // အရွယ်အစား (1x1x1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // အနီရောင်
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh) // Scene ထဲသို့ ထည့်သွင်းခြင်း

// 4. Sizes & Camera တည်ဆောက်ခြင်း
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3 // ကင်မရာကို နောက်သို့ 3 unit ဆုတ်ထားခြင်း
scene.add(camera)

// 5. Renderer ဖန်တီး၍ Render လုပ်ခြင်း
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Scene ကို Camera ဖြင့် Canvas ပေါ်သို့ ရေးဆွဲပြသခြင်း
renderer.render(scene, camera)
```

---

# ၅။ အဖြစ်များဆုံး အမှားများနှင့် ဖြေရှင်းနည်း (Troubleshooting)

1. ❓ **Screen ပေါ်တွင် ဘာမှမပေါ်ဘဲ မဲမှောင်နေခြင်း**:
   * ကင်မရာ Position ကို နောက်သို့ မရွှေ့ထားမိခြင်း (`camera.position.z = 3` ထည့်ရန် လိုအပ်သည်)။ ကင်မရာနှင့် Cube သည် `(0, 0, 0)` နေရာတူနေပါက ကင်မရာသည် Cube ၏ အတွင်းထဲ ရောက်နေပါမည်။
2. ❓ **`scene.add(mesh)` ထည့်ရန် မေ့လျော့ခြင်း**:
   * Mesh ကို ဖန်တီးရုံဖြင့် မပြီးဘဲ Scene ထဲသို့ `scene.add()` ဖြင့် မထည့်ပါက ပေါ်လာမည် မဟုတ်ပါ။
3. ❓ **Terminal တွင် Server ရပ်တန့်လိုပါက**:
   * Terminal ထဲတွင် `Ctrl + C` နှိပ်၍ Server ကို ရပ်တန့်နိုင်ပါသည်။

---

# ၆။ အမြန်မှတ်စုနှင့် Code Cheat Sheet (Lesson 03 Memo)

```javascript
// THREE.JS CORE BOILERPLATE
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
