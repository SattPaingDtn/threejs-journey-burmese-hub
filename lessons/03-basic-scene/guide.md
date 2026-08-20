# 🎬 Three.js Journey - Lesson 03: First Three.js Project (ပထမဆုံး ပရောဂျက်နှင့် Basic Scene)

---

## 📑 မာတိကာ (Table of Contents)

1. [Local Server နှင့် Build Tools ဘာကြောင့် မဖြစ်မနေ လိုအပ်သလဲ?](#၁-local-server-နှင့်-build-tools-ဘာကြောင့်-လိုအပ်သလဲ)
2. [Node.js, NPM နှင့် Package Management စနစ် နားလည်ခြင်း](#၂-nodejs-npm-နှင့်-package-management-စနစ်)
3. [Vite + Three.js Project အစမှအဆုံး တည်ဆောက်ခြင်း (Step-by-Step)](#၃-vite--threejs-project-အစမှအဆုံး-တည်ဆောက်ခြင်း)
4. [Three.js ၏ မရှိမဖြစ် ပင်မမဏ္ဍိုင် (၄) ခု အသေးစိတ် (The Core 4 Elements)](#၄-threejs-၏-ပင်မမဏ္ဍိုင်-၄-ခု-အသေးစိတ်)
   - ၁။ Scene (ကမ္ဘာလောက ကွန်တိန်နာ)
   - ၂။ Mesh = Geometry (အရိုး) + Material (အရေပြား/ဆေး)
   - ၃။ Camera (PerspectiveCamera နှင့် နေရာချထားခြင်း)
   - ၄။ WebGLRenderer (Canvas ပေါ်သို့ ရေးဆွဲပေးသည့် စက်)
5. [လက်တွေ့ ကုဒ်အပြည့်အစုံ (Complete Annotated Code)](#၅-လက်တွေ့-ကုဒ်အပြည့်အစုံ)
6. [အဖြစ်များဆုံး အမှားများနှင့် ဖြေရှင်းနည်းများ (Troubleshooting Guide)](#၆-အဖြစ်များဆုံး-အမှားများနှင့်-ဖြေရှင်းနည်းများ)
7. [အနှစ်ချုပ် မှတ်စုတို (Lesson 03 Memo)](#၇-အနှစ်ချုပ်-မှတ်စုတို)

---

# ၁။ Local Server နှင့် Build Tools ဘာကြောင့် လိုအပ်သလဲ?

HTML ဖိုင်ကို Double-Click နှိပ်၍ `file:///` ပုံစံဖြင့် Browser တွင် တိုက်ရိုက်ဖွင့်ပါက:
1. **CORS & Security Restrictions**: Browser များ၏ လုံခြုံရေး စည်းမျဉ်းအရ `import * as THREE from 'three'` ကဲ့သို့သော ES Modules များ၊ 3D Model ဖိုင်များနှင့် Texture ဓာတ်ပုံများကို ဆွဲယူခွင့် မပြုဘဲ Error တက်တတ်သည်။
2. **Package Management**: NPM မှ Three.js library ကို တိုက်ရိုက် Import ပြုလုပ်နိုင်ရန် Local Server တစ်ခု လိုအပ်သည်။

ဤသင်တန်းတွင် ကမ္ဘာ့အမြန်ဆုံး ခေတ်မီ Build Tool ဖြစ်သော **[Vite](https://vitejs.dev/)** ကို အသုံးပြုပါသည်:
* ⚡ **Hot Module Replacement (HMR)**: Code ပြင်လိုက်သည်နှင့် Browser ကို Manual Refresh လုပ်စရာမလိုဘဲ ချက်ချင်း ပြောင်းလဲသွားသည်။
* 📦 **အလိုအလျောက် Bundling**: `node_modules` မှ Package များကို အလိုအလျောက် စီမံပေါင်းစည်းပေးသည်။

---

# ၂။ Node.js, NPM နှင့် Package Management စနစ်

* **Node.js**: JavaScript ကို Browser အပြင်ဘက် Terminal/Computer ပေါ်တွင် Run နိုင်စေသော Runtime ဖြစ်သည်။ (`node -v` ဖြင့် စစ်ဆေးနိုင်သည်)။
* **NPM (Node Package Manager)**: Three.js, Vite ကဲ့သို့သော Open-Source Library များကို Download ဆွဲယူ စီမံပေးသော Tool ဖြစ်သည်။
* **`package.json`**: သင့် Project တွင် သုံးထားသော Library အမည်များနှင့် Version များကို မှတ်တမ်းတင်ထားသော စာရင်း ဖြစ်သည်။
* **`node_modules/`**: Download ဆွဲထားသော Library ဖိုင်အစစ်များ သိမ်းဆည်းရာ ဖိုဒါဖြစ်သည်။ (Git သို့ တင်သည့်အခါ သို့မဟုတ် အခြားသူများသို့ ပေးပို့သည့်အခါ ဤဖိုဒါကို ချန်လှပ်၍ ပို့ရသည်)။
* **`package-lock.json`**: သွင်းထားသော Version အတိအကျကို မှတ်တမ်းတင်ထားသော ဖိုင်ဖြစ်သည်။

---

# ၃။ Vite + Three.js Project အစမှအဆုံး တည်ဆောက်ခြင်း

### အဆင့် (၁): Folder အသစ်ဆောက်၍ Node Project စတင်ခြင်း
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
  "name": "first-threejs-project",
  "private": true,
  "version": "1.0.0",
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

### အဆင့် (၄): `index.html` တည်ဆောက်ခြင်း
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

### အဆင့် (၅): Local Dev Server စတင် Run ခြင်း
```bash
npm run dev
```
Terminal တွင် ပေါ်လာသော `http://localhost:5173/` သို့ Browser ဖြင့် ဝင်ရောက်ကြည့်ရှုပါ။

---

# ၄။ Three.js ၏ ပင်မမဏ္ဍိုင် (၄) ခု အသေးစိတ်

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

---

### (၁) Scene (ကမ္ဘာလောက ကွန်တိန်နာ)
`Scene` သည် ကျွန်ုပ်တို့၏ 3D အရာဝတ္ထုများ၊ ကင်မရာများနှင့် မီးရောင်များကို ထည့်သွင်းသိမ်းဆည်းရာ အခန်းလွတ်ကြီးတစ်ခု ဖြစ်သည်။
```javascript
const scene = new THREE.Scene()
```

### (၂) Mesh = Geometry + Material
* **Geometry (အရိုးဖွဲ့စည်းပုံ)**: 3D အရာဝတ္ထု၏ ပုံသဏ္ဌာန် (ဥပမာ Box, Sphere, Cylinder) ဖြစ်သည်။ အမှတ် (Vertices) များဖြင့် ဖွဲ့စည်းထားသည်။
* **Material (အရေပြား / ဆေးရောင်)**: အရာဝတ္ထု၏ မျက်နှာပြင် အရောင်၊ ပြောင်လက်မှု၊ အလင်းပြန်မှု ဖြစ်သည်။
* **Mesh**: Geometry နှင့် Material ကို ပေါင်းစပ်လိုက်သည့်အခါ မျက်စိဖြင့် မြင်တွေ့နိုင်သော 3D Object တစ်ခု ဖြစ်လာသည်။
```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1)          // 1x1x1 အရွယ်အစား ကုဗတုံး
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // အနီရောင် (Hex code)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh) // 💡 Scene ထဲသို့ ထည့်သွင်းခြင်း
```

### (၃) Camera (ကင်မရာ)
Scene ထဲရှိ အရာဝတ္ထုများကို မည်သည့် ထောင့်မှ ကြည့်မည်ကို သတ်မှတ်သည်။ အသုံးအများဆုံးမှာ လူ့မျက်လုံးကဲ့သို့ မြင်ရသော **`PerspectiveCamera`** ဖြစ်သည်:
```javascript
const sizes = { width: 800, height: 600 }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3 // 💡 ကင်မရာကို နောက်သို့ 3 unit ဆုတ်ထားခြင်း
scene.add(camera)
```

### (၄) WebGLRenderer (ရေးဆွဲပေးသည့် စက်)
Camera က မြင်ရသော Scene ကို HTML `<canvas>` ပေါ်သို့ ရေးဆွဲပြသပေးသည်:
```javascript
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera) // 💡 ရေးဆွဲပြသရန် ညွှန်ကြားခြင်း
```

---

# ၅။ လက်တွေ့ ကုဒ်အပြည့်အစုံ (`script.js`)

```javascript
import * as THREE from 'three'

// ၁။ Canvas ဆွဲယူခြင်း
const canvas = document.querySelector('canvas.webgl')

// ၂။ Scene ဖန်တီးခြင်း
const scene = new THREE.Scene()

// ၃။ Red Cube Mesh (Geometry + Material) တည်ဆောက်ခြင်း
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// ၄။ Sizes နှင့် Camera တည်ဆောက်ခြင်း
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// ၅။ Renderer တည်ဆောက်၍ ရေးဆွဲခြင်း
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```

---

# ၆။ အဖြစ်များဆုံး အမှားများနှင့် ဖြေရှင်းနည်းများ

1. ❓ **ဖန်သားပြင်ပေါ်တွင် ဘာမှမပေါ်ဘဲ မဲမှောင်နေခြင်း**:
   * 👉 **စစ်ဆေးရန် ၁**: `camera.position.z = 3` ကို ရေးထားပါသလား? မရေးထားပါက Camera နှင့် Mesh သည် `(0, 0, 0)` နေရာတူနေ၍ ကင်မရာသည် Cube ၏ အတွင်းထဲ ရောက်နေပါမည်။
   * 👉 **စစ်ဆေးရန် ၂**: `scene.add(mesh)` ထည့်ထားပါသလား?
   * 👉 **စစ်ဆေးရန် ၃**: `renderer.render(scene, camera)` ခေါ်ထားပါသလား?
2. ❓ **Terminal တွင် Server ရပ်တန့်လိုပါက**:
   * 👉 Terminal ထဲတွင် `Ctrl + C` နှိပ်၍ Server ကို ရပ်တန့်နိုင်ပါသည်။

---

# ၇။ အနှစ်ချုပ် မှတ်စုတို (Lesson 03 Memo)

```javascript
// THREE.JS CORE 4 BOILERPLATE CHEAT SHEET
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
