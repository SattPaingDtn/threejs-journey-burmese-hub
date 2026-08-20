# 🔤 Three.js Journey - Lesson 12: 3D Text (3D စာသား ဖန်တီးခြင်း)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 12: 3D Text](https://threejs-journey.com/lessons/3d-text)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 Core Concepts

Three.js တွင် 3D Text ဖန်တီးရန် Typeface JSON Font ကို `FontLoader` ဖြင့် Load လုပ်ပြီး `TextGeometry` ကို အသုံးပြုရသည်။

---

## 1. FontLoader & TextGeometry

```javascript
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Hello Three.js', {
        font: font,
        size: 0.5,
        height: 0.2,            // အထူ (Extrude depth)
        curveSegments: 12,
        bevelEnabled: true,     // အနားသတ် ကွေးခြင်း
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    })

    // Text ကို အလယ်ဗဟိုသို့ ရောက်အောင် Center ချခြင်း
    textGeometry.center()

    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    const textMesh = new THREE.Mesh(textGeometry, material)
    scene.add(textMesh)
})
```

---

## 2. Text ကို Center ချနည်း (Bounding Box vs center())

* **နည်းလမ်း (၁)**: `textGeometry.center()` ကို တိုက်ရိုက် ခေါ်လိုက်ခြင်း (အလွယ်ဆုံးနှင့် အကောင်းဆုံး)
* **နည်းလမ်း (၂)**: `textGeometry.computeBoundingBox()` တွက်ချက်ပြီး Box3 ၏ `max` နှင့် `min` ကို ရှာကာ $-(max.x - min.x)/2$ သို့ Translate လုပ်ခြင်း
