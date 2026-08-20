# 🎬 Lesson 03: ပထမဆုံး Three.js ပရောဂျက်နှင့် အခြေခံ Scene တည်ဆောက်ခြင်း

> **သင်ကြားပြသသူ**: Bruno Simon (Three.js Journey)  
> **မြန်မာဘာသာ ပြုစုရှင်းလင်းသူ**: Antigravity  
> **သင်ခန်းစာ ပုံစံ**: ဆရာတစ်ယောက်က အနီးကပ် ရှင်းပြသလို ရင်းနှီးလွယ်ကူပြီး အသေးစိတ် ပြည့်စုံသော လမ်းညွှန်

---

## 📑 မာတိကာ (Table of Contents)

1. [ရုပ်ရှင်ရိုက်ကွင်း ဥပမာဖြင့် နားလည်ခြင်း (Movie Set Mental Model)](#၁-ရုပ်ရှင်ရိုက်ကွင်း-ဥပမာဖြင့်-နားလည်ခြင်း)
2. [Local Server နှင့် Build Tools (Vite) ဘာကြောင့် မဖြစ်မနေ လိုအပ်သလဲ?](#၂-local-server-နှင့်-build-tools-ဘာကြောင့်-လိုအပ်သလဲ)
3. [Node.js, NPM နှင့် Package Management အခြေခံများ](#၃-nodejs-npm-နှင့်-package-management-အခြေခံများ)
4. [Vite + Three.js Project အစမှအဆုံး တည်ဆောက်ခြင်း (Step-by-Step)](#၄-vite--threejs-project-အစမှအဆုံး-တည်ဆောက်ခြင်း)
5. [Three.js ၏ မရှိမဖြစ် ပင်မမဏ္ဍိုင် (၄) ခု အသေးစိတ် (The Core 4 Elements)](#၅-threejs-၏-ပင်မမဏ္ဍိုင်-၄-ခု-အသေးစိတ်)
   - ၁။ Scene (စတူဒီယို အခန်းကျယ်ကြီး)
   - ၂။ Mesh = Geometry (အရိုး) + Material (အရေပြား/ဆေး)
   - ၃။ Camera (PerspectiveCamera နှင့် နေရာချထားခြင်း)
   - ၄။ WebGLRenderer (Canvas ပေါ်သို့ ရေးဆွဲပေးသည့် စက်)
6. [လက်တွေ့ ကုဒ်အပြည့်အစုံ (`script.js` Annotated Code)](#၆-လက်တွေ့-ကုဒ်အပြည့်အစုံ)
7. [ဆရာ့ရဲ့ ပြဿနာဖြေရှင်းနည်းများ (Troubleshooting Guide)](#၇-ဆရာ့ရဲ့-ပြဿနာဖြေရှင်းနည်းများ)
8. [ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Lesson 03 Memory Hook)](#၈-ဆရာ့ရဲ့-အလွတ်မှတ်-မှတ်စုတို)

---

# ၁။ ရုပ်ရှင်ရိုက်ကွင်း ဥပမာဖြင့် နားလည်ခြင်း

Three.js မှာ 3D ရုပ်ပုံတစ်ခု ဖန်သားပြင်ပေါ် ပေါ်လာအောင် လုပ်ဆောင်ရတာဟာ တကယ်တော့ **ရုပ်ရှင်ရိုက်ကွင်း (Movie Set)** တစ်ခုကို ဒါရိုက်တာတစ်ယောက် အနေနဲ့ စီမံရသလိုပါပဲ:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Scene (စတူဒီယို အခန်းကျယ်ကြီး)                                        │
│    └── သရုပ်ဆောင်တွေ၊ မီးရောင်တွေနဲ့ ကင်မရာကို ထည့်သွင်းမယ့် ကမ္ဘာလောက    │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Mesh (သရုပ်ဆောင် / ရုပ်တု)                                          │
│    ├── Geometry (အရိုးဖွဲ့စည်းပုံ - ဥပမာ ကုဗတုံး၊ စက်လုံး)                 │
│    └── Material (အရေပြား / ဆေးရောင် - ဥပမာ အနီရောင်၊ သစ်သား၊ ရွှေရောင်)  │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Camera (ရိုက်ကူးမယ့် ကင်မရာမန်း)                                     │
│    └── မည်သည့်ထောင့်ကနေ မည်သို့ ကြည့်မည်ကို ဆုံးဖြတ်တဲ့ ကင်မရာ          │
├────────────────────────────────────────────────────────────────────────┤
│ 4. WebGLRenderer (ပရိုဂျက်တာ ရုပ်ရှင်ပြစက်)                             │
│    └── ကင်မရာ မြင်ကွင်းကို Canvas ဖန်သားပြင်ပေါ် ရေးဆွဲပြသပေးတဲ့ စက်    │
└────────────────────────────────────────────────────────────────────────┘
```

---

# ၂။ Local Server နှင့် Build Tools ဘာကြောင့် လိုအပ်သလဲ?

HTML ဖိုင်ကို Double-Click နှိပ်၍ `file:///` ပုံစံဖြင့် Browser တွင် တိုက်ရိုက်ဖွင့်ပါက:
1. **CORS & Security Restrictions**: Browser များ၏ လုံခြုံရေး စည်းမျဉ်းအရ `import * as THREE from 'three'` ကဲ့သို့သော ES Modules များ၊ 3D Model ဖိုင်များနှင့် Texture ဓာတ်ပုံများကို ဆွဲယူခွင့် မပြုဘဲ Error တက်တတ်သည်။
2. **Package Management**: NPM မှ Three.js library ကို တိုက်ရိုက် Import ပြုလုပ်နိုင်ရန် Local Server တစ်ခု လိုအပ်သည်။

ဤသင်တန်းတွင် ကမ္ဘာ့အမြန်ဆုံး ခေတ်မီ Build Tool ဖြစ်သော **[Vite](https://vitejs.dev/)** ကို အသုံးပြုပါသည်:
* ⚡ **Hot Module Replacement (HMR)**: Code ပြင်လိုက်သည်နှင့် Browser ကို Manual Refresh လုပ်စရာမလိုဘဲ ချက်ချင်း ပြောင်းလဲသွားသည်။
* 📦 **အလိုအလျောက် Bundling**: `node_modules` မှ Package များကို အလိုအလျောက် စီမံပေါင်းစည်းပေးသည်။

---

# ၃။ Node.js, NPM နှင့် Package Management အခြေခံများ

* **Node.js**: JavaScript ကို Browser အပြင်ဘက် Terminal/Computer ပေါ်တွင် Run နိုင်စေသော Runtime ဖြစ်သည်။ (`node -v` ဖြင့် စစ်ဆေးနိုင်သည်)။
* **NPM (Node Package Manager)**: Three.js, Vite ကဲ့သို့သော Open-Source Library များကို Download ဆွဲယူ စီမံပေးသော Tool ဖြစ်သည်။
* **`package.json`**: သင့် Project တွင် သုံးထားသော Library အမည်များနှင့် Version များကို မှတ်တမ်းတင်ထားသော စာရင်း ဖြစ်သည်။
* **`node_modules/`**: Download ဆွဲထားသော Library ဖိုင်အစစ်များ သိမ်းဆည်းရာ ဖိုဒါဖြစ်သည်။ (Git သို့ တင်သည့်အခါ သို့မဟုတ် အခြားသူများသို့ ပေးပို့သည့်အခါ ဤဖိုဒါကို ချန်လှပ်၍ ပို့ရသည်)။
* **`package-lock.json`**: သွင်းထားသော Version အတိအကျကို မှတ်တမ်းတင်ထားသော ဖိုင်ဖြစ်သည်။

---

# ၄။ Vite + Three.js Project အစမှအဆုံး တည်ဆောက်ခြင်း

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

# ၅။ Three.js ၏ ပင်မမဏ္ဍိုင် (၄) ခု အသေးစိတ်

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

# ၆။ လက်တွေ့ ကုဒ်အပြည့်အစုံ (`script.js`)

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

# ၇။ ဆရာ့ရဲ့ ပြဿနာဖြေရှင်းနည်းများ (Troubleshooting)

1. ❓ **ဖန်သားပြင်ပေါ်တွင် ဘာမှမပေါ်ဘဲ မဲမှောင်နေခြင်း**:
   * 👉 **စစ်ဆေးရန် ၁**: `camera.position.z = 3` ကို ရေးထားပါသလား? မရေးထားပါက Camera နှင့် Mesh သည် `(0, 0, 0)` နေရာတူနေ၍ ကင်မရာသည် Cube ၏ အတွင်းထဲ ရောက်နေပါမည်။
   * 👉 **စစ်ဆေးရန် ၂**: `scene.add(mesh)` ထည့်ထားပါသလား?
   * 👉 **စစ်ဆေးရန် ၃**: `renderer.render(scene, camera)` ခေါ်ထားပါသလား?
2. ❓ **Terminal တွင် Server ရပ်တန့်လိုပါက**:
   * 👉 Terminal ထဲတွင် `Ctrl + C` နှိပ်၍ Server ကို ရပ်တန့်နိုင်ပါသည်။

---

# ၈။ ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Lesson 03 Memory Hook)

> 🧠 **ဒီလိုလေး အလွတ်မှတ်ထားလိုက်ပါ**:  
> * **Scene** = စတူဒီယို အခန်းကျယ်ကြီး  
> * **Mesh** = သရုပ်ဆောင် (Geometry အရိုး + Material အသား)  
> * **Camera** = ရိုက်ကူးမည့် မျက်လုံး (`camera.position.z = 3`)  
> * **Renderer** = ဖန်သားပြင်ပေါ် ရေးဆွဲပေးသည့် စက်  
> * **ရေးဆွဲပြသရန်** = `renderer.render(scene, camera)`
