# 🎨 Three.js Journey - Lesson 10: Textures (မျက်နှာပြင် Texture များ)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 10: Textures](https://threejs-journey.com/lessons/textures)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 Core Concepts

Texture ဆိုသည်မှာ 3D Geometry ၏ မျက်နှာပြင်ပေါ်သို့ ကပ်တင်လိုက်သော 2D Image ဖြစ်သည်။

---

## 1. TextureLoader & LoadingManager

```javascript
// Loading Manager ဖြင့် Loading Progress ကို စောင့်ကြည့်ခြင်း
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => console.log('Loading started...')
loadingManager.onLoad = () => console.log('All textures loaded!')
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    console.log(`Loaded ${itemsLoaded} / ${itemsTotal}`)
}
loadingManager.onError = () => console.log('Loading error!')

// TextureLoader
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
```

---

## 2. Minification & Magnification Filter (Pixel Art vs Smooth)

```javascript
// Texture ကို သေးငယ်စွာ ပြသသည့်အခါ (Minification)
colorTexture.minFilter = THREE.NearestFilter

// Texture ကို အနီးကပ် ချဲ့ကြည့်သည့်အခါ (Magnification) - Minecraft/Pixel art စတိုင်
colorTexture.magFilter = THREE.NearestFilter

// NearestFilter သုံးပါက Mipmaps များ ထပ်ထုတ်ရန် မလိုတော့သဖြင့် GPU memory သက်သာစေသည်
colorTexture.generateMipmaps = false
```

> 💡 **Texture Resolution စည်းမျဉ်း (Power of 2)**:  
> Texture image ၏ width နှင့် height သည် $2$ ၏ ထပ်ညွှန်းများ (ဥပမာ - $512 \times 512, 1024 \times 1024, 2048 \times 2048$) ဖြစ်ရပါမည်။ သို့မှသာ WebGL ၏ Mipmapping စနစ် ကောင်းစွာ အလုပ်လုပ်ပါမည်။
