# 🔷 Three.js Journey - Lesson 09: Geometries (ဂျီဩမေတြီများနှင့် BufferGeometry)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 09: Geometries](https://threejs-journey.com/lessons/geometries)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 Core Concepts

Geometry ဆိုသည်မှာ 3D Object တစ်ခု၏ ပုံသဏ္ဌာန် (Vertices အမှတ်များ၊ Faces မျက်နှာပြင်များ၊ Normals နှင့် UV Coordinates များ) ကို သတ်မှတ်ပေးသော ဒေတာဖွဲ့စည်းပုံ ဖြစ်သည်။

---

## 1. Built-in Geometries

* `BoxGeometry(w, h, d, segW, segH, segD)`: သေတ္တာပုံစံ
* `SphereGeometry(radius, widthSegments, heightSegments)`: စက်လုံးပုံစံ
* `PlaneGeometry(w, h)`: ၂ ဖက်မြင် ပြားချပ်သော မျက်နှာပြင်
* `TorusGeometry(radius, tube, radialSegments, tubularSegments)`: ဒိုးနတ်ကွင်း ပုံစံ
* `CylinderGeometry`, `ConeGeometry`, `TorusKnotGeometry`, `RingGeometry`, etc.

---

## 2. Custom BufferGeometry ဖန်တီးခြင်း (Float32Array)

Three.js တွင် GPU ပေါ်သို့ တိုက်ရိုက် Vertex data ပို့နိုင်ရန် `BufferGeometry` နှင့် `Float32Array` ကို အသုံးပြုပါသည်:

```javascript
// 1. BufferGeometry ဖန်တီးခြင်း
const geometry = new THREE.BufferGeometry()

// 2. တြိဂံ ၅၀ ခုအတွက် Vertices များ ထုတ်လုပ်ခြင်း
const count = 50
// တြိဂံ ၁ ခုတွင် Vertex ၃ ခုပါပြီး Vertex ၁ ခုတွင် (X, Y, Z) တန်ဖိုး ၃ ခုပါသဖြင့် 50 * 3 * 3
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// 3. BufferAttribute အဖြစ် သတ်မှတ်ပြီး 'position' attribute ထဲသို့ ထည့်သွင်းခြင်း
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3) // 3 components (X,Y,Z)
geometry.setAttribute('position', positionsAttribute)

// 4. Mesh တည်ဆောက်ခြင်း
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```
