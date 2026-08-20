# 📐 Three.js Journey - Lesson 04: Transform Objects (အရာဝတ္ထုများ ရွှေ့ပြောင်းခြင်း)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 04: Transform Objects](https://threejs-journey.com/lessons/transform-objects)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 Transform Properties (၄) ခု

Three.js ရှိ `Object3D` (Mesh, Group, Camera) အားလုံးတွင် အခြေခံ Transform Properties (၄) ခု ပါရှိသည်:

1. **`position`** (`THREE.Vector3`): နေရာအကွာအဝေး $(X, Y, Z)$
2. **`scale`** (`THREE.Vector3`): အရွယ်အစား ချဲ့/ချုံ့ခြင်း $(X, Y, Z)$
3. **`rotation`** (`THREE.Euler`): ထောင့်ဒီဂရီဖြင့် လှည့်ပတ်ခြင်း $(X, Y, Z)$
4. **`quaternion`** (`THREE.Quaternion`): သင်္ချာ 4D Complex Number ဖြင့် လှည့်ပတ်ခြင်း (Gimbal lock ကင်းဝေးစေသည်)

---

## 1. Position (Vector3)

```javascript
// နေရာ ရွှေ့ခြင်း
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1

// တစ်ကြောင်းတည်းဖြင့် ရွှေ့ခြင်း
mesh.position.set(0.7, -0.6, 1)

// အကွာအဝေး တိုင်းတာခြင်း
console.log(mesh.position.length()) // Origin (0,0,0) မှ အကွာအဝေး
console.log(mesh.position.distanceTo(camera.position)) // Camera နှင့် အကွာအဝေး

// Vector ကို Normalize ပြုလုပ်ခြင်း (Length ကို 1 သို့ လျှော့ချခြင်း)
mesh.position.normalize()
```

---

## 2. AxesHelper (ဝင်ရိုး လမ်းညွှန်မျဉ်းများ)

3D Space တွင် $X, Y, Z$ ဝင်ရိုးများကို မျက်စိဖြင့် မြင်သာစေရန် သုံးသည်:

```javascript
const axesHelper = new THREE.AxesHelper(2) // 2 unit အရှည်
scene.add(axesHelper)
```

* 🔴 **Red (အနီရောင်)**: **$X$ Axis** (ညာဘက်သို့ Positive)
* 🟢 **Green (အစိမ်းရောင်)**: **$Y$ Axis** (အပေါ်ဘက်သို့ Positive)
* 🔵 **Blue (အပြာရောင်)**: **$Z$ Axis** (ဖန်သားပြင် အပြင်ဘက် မိမိဆီသို့ Positive)

---

## 3. Rotation (Euler) နှင့် Gimbal Lock

`mesh.rotation` သည် Radians ဖြင့် တိုင်းတာသည်။ $180^\circ = \pi$ (`Math.PI`), $360^\circ = 2\pi$ (`Math.PI * 2`) ဖြစ်သည်။

```javascript
mesh.rotation.y = Math.PI * 0.25 // 45 ဒီဂရီ လှည့်ခြင်း
mesh.rotation.x = Math.PI * 0.25

// ဝင်ရိုး လှည့်သည့် အစဉ်အလိုက် ပြောင်းလဲခြင်း (Gimbal lock ရှောင်ရန်)
mesh.rotation.reorder('YXZ')
```

---

## 4. Scene Graph & Grouping (အုပ်စုဖွဲ့ခြင်း)

Object အများအပြားကို တစ်ပြိုင်နက် ရွှေ့ပြောင်းလှည့်ပတ်လိုလျှင် `THREE.Group` ကို အသုံးပြုရသည်:

```javascript
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
group.add(cube1)

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
cube2.position.x = -2
group.add(cube2)

// Group တစ်ခုလုံးကို တစ်ပြိုင်နက် ရွှေ့ခြင်း/လှည့်ခြင်း
group.position.y = 1
group.scale.set(1.5, 1.5, 1.5)
group.rotation.y = Math.PI * 0.5
```
