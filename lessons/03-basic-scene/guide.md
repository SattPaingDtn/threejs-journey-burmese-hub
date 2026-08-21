# Lesson 03 — ပထမဆုံး Three.js Project

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: First Three.js Project](https://threejs-journey.com/lessons/first-threejs-project)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤစာမျက်နှာအကြောင်း** — မူရင်းသင်ခန်းစာ၏ project setup နဲ့ first render အဆင့်များကို မြန်မာဘာသာဖြင့် နားလည်လွယ်စေရန် ပြန်လည်စီစဉ်ရှင်းပြထားသော လေ့လာရေးအကူအညီဖြစ်သည်။ Starter files နဲ့ video အတွက် မူရင်းသင်ခန်းစာကို တွဲဖက်အသုံးပြုပါ။

---

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

Lesson 01 နဲ့ 02 မှာ course လမ်းကြောင်းနဲ့ WebGL/Three.js ဆက်နွယ်ပုံကို သိခဲ့ပြီးပါပြီ။ အခုက စပြီး code တကယ်ရေးပါမယ်။ ဒီ Lesson အဆုံးမှာ—

- Node.js၊ NPM နဲ့ Vite တို့ရဲ့ အလုပ်ကို ခွဲပြောနိုင်မယ်
- Local development server ကို စတင်နိုင်မယ်
- Three.js ကို ES module အဖြစ် import လုပ်နိုင်မယ်
- Scene၊ Mesh၊ Camera နဲ့ Renderer ကို တည်ဆောက်နိုင်မယ်
- `<canvas>` ပေါ်မှာ ပထမဆုံး red cube ကို render လုပ်နိုင်မယ်
- အမည်းရောင် screen ပဲပေါ်တဲ့အခါ အခြေခံပြဿနာရှာနိုင်မယ်

ဒီ Lesson ရဲ့ အဓိက mental model က အောက်ပါအတိုင်းပါ။

```text
Scene + Mesh + Camera
          ↓
       Renderer
          ↓
        Canvas
```

---

## ၁။ HTML ဖိုင်ကို double-click ဖွင့်ရုံနဲ့ ဘာကြောင့် မလုံလောက်တာလဲ

ရိုးရိုး HTML page တစ်ခုကို double-click လုပ်ရင် browser က `file://` URL နဲ့ ဖွင့်ပေးပါတယ်။ စာသားနဲ့ CSS လောက်ဆို အလုပ်လုပ်နိုင်ပေမယ့် Three.js project မှာ ES modules၊ texture၊ model နဲ့ အခြား resource များ load လုပ်လာတဲ့အခါ browser security restriction တွေကြောင့် ပြဿနာတက်နိုင်ပါတယ်။

ဒါကြောင့် project ကို `http://localhost:...` ပုံစံနဲ့ ဝင်နိုင်အောင် **local server** တစ်ခု run ပါမယ်။ ဒီ course မှာ local server နဲ့ build process ကို **Vite** က တာဝန်ယူပေးပါတယ်။

> `index.html` ကို double-click မဖွင့်ပါနဲ့။ Terminal မှာ development server ကို run ပြီး Vite ပြတဲ့ URL ကို browser မှာ ဖွင့်ပါ။

---

## ၂။ Build tool နဲ့ Vite ရဲ့အလုပ်

Build tool တစ်ခုက code ရေးနေစဉ်နဲ့ production အတွက် ပြင်ဆင်ချိန်မှာ ထပ်ခါထပ်ခါ လိုအပ်တဲ့အလုပ်တွေကို စီမံပေးပါတယ်။ Vite က ဒီ project မှာ—

- Local development server run ပေးတယ်
- NPM dependency များကို browser က import လုပ်နိုင်အောင် ဖြေရှင်းပေးတယ်
- File ပြင်လိုက်တဲ့အခါ browser ကို update လုပ်ပေးတယ်
- Error ကို source file နဲ့ line number အလိုက် ဖတ်ရလွယ်အောင် ပြပေးတယ်
- Production အတွက် optimized files build လုပ်ပေးတယ်

နောက်ပိုင်းမှာ shader file သို့မဟုတ် React လို ထပ်ဆောင်းလိုအပ်ချက်တွေအတွက် plugin များ ထည့်နိုင်ပါတယ်။ ဒါပေမယ့် ဒီ Lesson က Vite အပြည့်အစုံသင်ခန်းစာမဟုတ်ပါဘူး။ Three.js စတင်ဖို့ လိုတဲ့အပိုင်းကိုသာ အသုံးပြုပါမယ်။

---

## ၃။ Node.js နဲ့ NPM

### Node.js

Browser အပြင်ဘက် computer ပေါ်မှာ JavaScript-based tools များ run နိုင်စေတဲ့ runtime ဖြစ်ပါတယ်။ Vite ကို run ဖို့ Node.js လိုအပ်ပါတယ်။ Installed ဖြစ်မဖြစ် စစ်ရန်—

```bash
node -v
```

Version number တစ်ခု ပြလာရင် Node.js ရှိပါတယ်။ Command မတွေ့ဘူးလို့ ပြရင် [Node.js website](https://nodejs.org/) မှာ လက်ရှိ support ရတဲ့ LTS version ကို install လုပ်ပါ။ Install ပြီးရင် terminal ကို ပိတ်ဖွင့်ပြီး `node -v` ပြန်စစ်ပါ။ Vite version တစ်ခုနဲ့တစ်ခု Node.js requirement မတူနိုင်တာကြောင့် error ရလာရင် [Vite documentation](https://vite.dev/guide/) ရဲ့ လက်ရှိ requirement ကို စစ်ပါ။

### NPM

Node.js install လုပ်တဲ့အခါ NPM — Node Package Manager လည်း ပါလာပါတယ်။ NPM က `three` နဲ့ `vite` လို project dependency များကို download လုပ်ပြီး version များကို စီမံပေးပါတယ်။

```bash
npm -v
```

---

## ၄။ Project folder နဲ့ Terminal

Three.js project တစ်ခုစီအတွက် folder သီးသန့်ထားပါ။ VS Code အသုံးပြုရင် project folder ကို VS Code နဲ့ ဖွင့်ပြီး integrated terminal ကို အသုံးပြုနိုင်ပါတယ်။

- macOS — `Cmd + J`
- Windows/Linux — `Ctrl + J`

Terminal က ဘယ် folder ထဲရောက်နေသလဲ စစ်ရန်—

```bash
pwd
```

Folder ထဲက files များကြည့်ရန်—

```bash
ls
```

တခြား folder သို့ ရွှေ့ရန်—

```bash
cd path/to/your-project
```

Command များကို project folder မဟုတ်တဲ့နေရာကနေ run မိခြင်းဟာ စတင်လေ့လာသူများအတွက် အဖြစ်များဆုံးပြဿနာတစ်ခုပါ။

---

## ၅။ Node project စတင်ခြင်း

Terminal က project folder ထဲမှာ ရှိနေကြောင်းသေချာပြီး အောက်ပါ command ကို run ပါ။

```bash
npm init -y
```

ဒီ command က `package.json` ဖိုင်တစ်ခု ဖန်တီးပေးပါတယ်။ `package.json` မှာ project အမည်၊ scripts နဲ့ dependencies စာရင်းတို့ကို မှတ်တမ်းတင်ထားပါတယ်။

### Project dependency files

| File / Folder | ဘာအတွက်လဲ |
| --- | --- |
| `package.json` | Project scripts နဲ့ dependency range များ |
| `package-lock.json` | Install လုပ်ထားတဲ့ dependency tree နဲ့ version အတိအကျ |
| `node_modules/` | Download လုပ်ထားတဲ့ package files များ |

`node_modules/` က အရွယ်အစားကြီးနိုင်တာကြောင့် Git သို့ မတင်သင့်သလို project share လုပ်တဲ့အခါလည်း မပို့သင့်ပါဘူး။ `package.json` နဲ့ `package-lock.json` ရှိရင် တခြား developer က `npm install` run ပြီး dependencies ကို ပြန်တည်ဆောက်နိုင်ပါတယ်။

---

## ၆။ Vite နဲ့ Three.js install လုပ်ခြင်း

Vite ကို development tool အဖြစ်၊ Three.js ကို application dependency အဖြစ် install လုပ်ပါမယ်။

```bash
npm install --save-dev vite
npm install three
```

Install ပြီးရင် `package.json` ထဲမှာ `dev` နဲ့ `build` scripts ထည့်ပါ။ တခြား fields တွေကို မဖျက်ဘဲ `scripts` အပိုင်းကို ဒီလိုထားနိုင်ပါတယ်။

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

- `npm run dev` — development server စတင်မယ်
- `npm run build` — production files တည်ဆောက်မယ်

Version number များကို guide ထဲက ကူးပြီး အတင်း pin မလုပ်ပါနဲ့။ Course starter မှာ `package-lock.json` ပါလာရင် အဲဒီ lesson နဲ့ စမ်းသပ်ထားတဲ့ versions ကို `npm install` က ပြန်ယူပေးပါမယ်။

---

## ၇။ အခြေခံ website ဖိုင်များ

Project folder ထဲမှာ အောက်ပါဖိုင်နှစ်ခု ဖန်တီးပါ။

```text
first-threejs-project/
├── index.html
├── script.js
├── package.json
└── package-lock.json
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>03 - First Three.js Project</title>
</head>
<body>
    <canvas class="webgl"></canvas>
    <script type="module" src="./script.js"></script>
</body>
</html>
```

`type="module"` က `script.js` ထဲမှာ `import` / `export` syntax အသုံးပြုမယ်လို့ browser နဲ့ Vite ကို ပြောတာပါ။ ဒီ attribute မပါရင် `import * as THREE from 'three'` အလုပ်မလုပ်နိုင်ပါဘူး။

### Development server run ခြင်း

```bash
npm run dev
```

Terminal မှာ `http://localhost:5173/` လို URL တစ်ခု ပြလာပါမယ်။ Port number က တခြား process အသုံးပြုနေခြင်းပေါ်မူတည်ပြီး ပြောင်းနိုင်ပါတယ်။ Terminal ပြတဲ့ URL ကို browser မှာ ဖွင့်ပါ။

Server run နေချိန်မှာ terminal က command အသစ်လက်မခံတာ ပုံမှန်ပါ။ Server ရပ်လိုရင် `Ctrl + C` နှိပ်ပါ။

---

## ၈။ Three.js ကို import လုပ်ခြင်း

`script.js` ရဲ့ အပေါ်ဆုံးမှာ Three.js core classes အားလုံးကို `THREE` namespace အဖြစ် import လုပ်ပါ။

```js
import * as THREE from 'three'
```

ဒီ import ပုံစံကို **ES modules** လို့ ခေါ်ပါတယ်။ အခုချိန်မှာ syntax အသေးစိတ်အားလုံး မသိသေးလည်း ရပါတယ်။

စမ်းကြည့်ချင်ရင်—

```js
console.log(THREE)
```

Browser DevTools Console မှာ Three.js classes နဲ့ constants များစွာကို မြင်ရပါမယ်။ `THREE` ကို အက္ခရာအကြီးနဲ့ ရေးထားတာ သတိပြုပါ။

---

## ၉။ ပထမဆုံး scene အတွက် Core 4

Screen ပေါ်မှာ object တစ်ခု ပေါ်လာဖို့ အဓိကအစိတ်အပိုင်း လေးခု လိုပါတယ်။

```text
1. Scene     — 3D world ရဲ့ container
2. Mesh      — Geometry + Material
3. Camera    — Scene ကို ကြည့်မယ့် viewpoint
4. Renderer  — Scene နဲ့ Camera ကို Canvas ပေါ်ရေးဆွဲပေးသူ
```

### ၉.၁ Scene

Scene က object၊ model၊ particle နဲ့ light များ ထည့်ထားမယ့် container ပါ။

```js
const scene = new THREE.Scene()
```

### ၉.၂ Mesh = Geometry + Material

ဒီ Lesson မှာ red cube တစ်ခု ဖန်တီးပါမယ်။

- **Geometry** — ပုံသဏ္ဌာန်
- **Material** — မျက်နှာပြင် ဘယ်လိုပေါ်မလဲ
- **Mesh** — Geometry နဲ့ Material ပေါင်းထားတဲ့ render လုပ်နိုင်သော object

```js
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)
```

`scene.add(mesh)` ကို မခေါ်ရင် mesh တည်ဆောက်ပြီးသားဖြစ်ပေမယ့် scene ထဲမရှိတာကြောင့် render မှာ မပေါ်ပါဘူး။

`MeshBasicMaterial` က light မလိုဘဲ သတ်မှတ်ထားတဲ့အရောင်ကို ပြပေးပါတယ်။ Lighting ကို နောက်ပိုင်း lesson မှာ လေ့လာပါမယ်။

### ၉.၃ Sizes နဲ့ Camera

ဒီ Lesson မှာ canvas ကို ယာယီ `800 × 600` သတ်မှတ်ပါမယ်။ Browser အရွယ်အစားအလိုက် responsive ဖြစ်အောင်လုပ်နည်းကို နောက် lesson မှာ လေ့လာပါမယ်။

```js
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height
)

camera.position.z = 3
scene.add(camera)
```

`PerspectiveCamera` ရဲ့ အရေးကြီးတဲ့ parameters နှစ်ခုက—

1. **Field of view — `75`**: ဒေါင်လိုက်မြင်ကွင်းထောင့်ကို degree နဲ့ သတ်မှတ်တယ်။
2. **Aspect ratio — `width / height`**: Canvas ရဲ့ အကျယ်နဲ့အမြင့် အချိုးဖြစ်တယ်။

Camera က render မဖြစ်တဲ့ viewpoint ဖြစ်တာကြောင့် screen ပေါ်မှာ camera ကို မမြင်ရပါဘူး။ Scene ကို ဘယ်နေရာကနေကြည့်မလဲသာ ဆုံးဖြတ်ပါတယ်။

### ဘာကြောင့် `camera.position.z = 3` လိုတာလဲ

Mesh နဲ့ camera နှစ်ခုလုံးရဲ့ default position က `(0, 0, 0)` ပါ။ Camera ကို မရွှေ့ရင် cube အတွင်းထဲကနေ ကြည့်နေသလို ဖြစ်ပြီး မျှော်လင့်တဲ့ပုံ မမြင်ရပါဘူး။ Camera ကို positive `z` ဘက် 3 units ရွှေ့ပြီး origin မှာရှိတဲ့ cube ဆီ ကြည့်စေပါတယ်။

### ၉.၄ Renderer

Renderer က scene ကို camera ရဲ့ viewpoint နဲ့တွက်ပြီး canvas ပေါ်ရေးဆွဲပေးပါတယ်။

```js
const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```

`renderer.setSize(...)` က renderer output နဲ့ canvas size ကို သတ်မှတ်ပေးတယ်။ `renderer.render(scene, camera)` က “ဒီ scene ကို ဒီ camera နဲ့ တစ်ကြိမ်ရေးဆွဲပါ” လို့ ပြောတာပါ။

---

## ၁၀။ `script.js` code အပြည့်အစုံ

```js
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height
)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```

အောင်မြင်ရင် canvas ပေါ်မှာ အနီရောင်စတုရန်းတစ်ခုလို မြင်ရပါမယ်။ တကယ်တော့ cube ကို အရှေ့တည့်တည့်က ကြည့်နေတဲ့အတွက် မျက်နှာတစ်ဖက်တည်းမြင်ရတာပါ။ Lesson 04 မှာ object ကို position၊ scale နဲ့ rotation ပြောင်းပြီး 3D ပုံသဏ္ဌာန်ကို ပိုရှင်းအောင် လေ့လာပါမယ်။

ဒီ Lesson မှာ animation loop မထည့်သေးပါဘူး။ `renderer.render(scene, camera)` ကို တစ်ကြိမ်ခေါ်ထားတဲ့ static first render ဖြစ်ပါတယ်။ Animation ကို သီးသန့် Lesson မှာ ဆက်လေ့လာပါမယ်။

---

## ၁၁။ Starter files ကို အသုံးပြုနည်း

နောက် lesson များမှာ project setup ကို အစကနေ အကြိမ်တိုင်း ပြန်လုပ်စရာမလိုအောင် starter zip ပေးထားပါတယ်။

1. Lesson ရဲ့ starter zip ကို download လုပ်ပြီး extract လုပ်ပါ။
2. Extract လုပ်ထားတဲ့ folder ကို VS Code နဲ့ ဖွင့်ပါ။
3. Terminal က အဲဒီ folder ထဲမှာရှိတာ စစ်ပါ။
4. Dependencies install လုပ်ပါ။
5. Development server run ပါ။

```bash
npm install
npm run dev
```

Starter folder ထဲမှာ `node_modules/` မပါလာတာ ပုံမှန်ပါ။ `package.json` နဲ့ `package-lock.json` ကိုအခြေခံပြီး `npm install` က ပြန်ဖန်တီးပေးပါမယ်။

Final files ကို ကိုယ်တိုင်မစမ်းခင် အဖြေကူးဖို့ မသုံးဘဲ၊ ပိတ်မိတဲ့အခါ ကိုယ့်ဖိုင်နဲ့ နှိုင်းယှဉ်စစ်ဖို့ အသုံးပြုပါ။

---

## ၁၂။ Troubleshooting — အလုပ်မလုပ်ရင် ဘယ်လိုစစ်မလဲ

### `npm` သို့မဟုတ် `node` command မတွေ့ခြင်း

- Node.js install လုပ်ထားတာ စစ်ပါ။
- Terminal ကို ပိတ်ပြီး ပြန်ဖွင့်ပါ။
- `node -v` နဲ့ `npm -v` ပြန်စစ်ပါ။

### `package.json` မတွေ့ခြင်း

Terminal က project folder ထဲမရောက်သေးတာ ဖြစ်နိုင်ပါတယ်။

```bash
pwd
ls
```

`ls` output ထဲမှာ `package.json` ရှိရပါမယ်။

### Browser မှာ blank page သို့မဟုတ် black canvas ပဲပေါ်ခြင်း

အောက်ပါအချက်တွေကို အစဉ်လိုက်စစ်ပါ။

1. DevTools Console မှာ error ရှိသလား
2. `script` tag မှာ `type="module"` ပါသလား
3. `import * as THREE from 'three'` မှန်သလား
4. Canvas selector နဲ့ HTML class ကိုက်ညီသလား
5. `scene.add(mesh)` ခေါ်ထားသလား
6. `camera.position.z = 3` ရှိသလား
7. `renderer.setSize(...)` ခေါ်ထားသလား
8. `renderer.render(scene, camera)` ခေါ်ထားသလား

### Folder path ပြဿနာ

- Project ကို folder အထပ်များစွာအောက် အရမ်းနက်နက်မထားပါနဲ့။
- Path ထဲမှာ မလိုအပ်တဲ့ special characters မထည့်တာ ပိုကောင်းပါတယ်။
- Dependency ပြဿနာဖြစ်ရင် cloud-sync folder မဟုတ်တဲ့နေရာမှာ စမ်းကြည့်ပါ။
- Starter folder အဟောင်းအတွင်း starter အသစ်ကို ထပ် extract မလုပ်ပါနဲ့။

### NPM vulnerability warning

Warning ကို မမြင်ချင်လို့ `npm audit fix --force` ကို မစဉ်းစားဘဲ မ run ပါနဲ့။ Major dependency version ပြောင်းသွားပြီး course code ပျက်နိုင်ပါတယ်။ Warning အသေးစိတ်ကို ဖတ်ပါ၊ course starter ရဲ့ lockfile ကို ထိန်းထားပါ၊ update လုပ်မယ်ဆိုရင် build နဲ့ lesson result ကို ပြန်စမ်းပါ။

### Server ကို ရပ်ရန်

```text
Ctrl + C
```

မဖြေရှင်းနိုင်သေးရင် error message၊ terminal output၊ folder structure နဲ့ သက်ဆိုင်ရာ code ကို စုစည်းပြီး အကူအညီတောင်းပါ။ “အလုပ်မလုပ်ဘူး” လို့ပဲ ပြောတာထက် အခြားသူက ပြဿနာကို မြန်မြန်ရှာပေးနိုင်ပါတယ်။

---

## ၁၃။ Lesson 03 အနှစ်ချုပ်

```text
Node.js  = Vite လို development tools run ပေးတယ်
NPM      = Dependencies install နဲ့ versions စီမံတယ်
Vite     = Local server + development/build workflow

Scene    = 3D world container
Geometry = Object ရဲ့ shape
Material = Surface ရဲ့ appearance
Mesh     = Geometry + Material
Camera   = Viewpoint
Renderer = Scene + Camera → Canvas
```

### Lesson ပြီးဆုံးမှု စစ်ဆေးရန်

- [ ] `npm install` နဲ့ `npm run dev` မတူပုံ သိတယ်
- [ ] `type="module"` ဘာကြောင့်လိုတာ ရှင်းပြနိုင်တယ်
- [ ] Mesh က Geometry + Material ဖြစ်တာ သိတယ်
- [ ] Camera ကို `z = 3` မရွှေ့ရင် ဘာဖြစ်မလဲ သိတယ်
- [ ] `renderer.render(scene, camera)` ရဲ့ အလုပ်ကို ရှင်းပြနိုင်တယ်
- [ ] Browser Console နဲ့ Terminal error ကို အရင်ဖတ်တတ်တယ်

အဆင်သင့်ဖြစ်ပြီဆိုရင် Lesson 04 မှာ cube နဲ့ camera ကို **position၊ scale နဲ့ rotation** သုံးပြီး transform လုပ်ကြမယ်။
