# 📐 Three.js Journey - Lesson 04: Transform Objects (အရာဝတ္ထုများ ရွှေ့ပြောင်းခြင်း)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 04: Transform Objects](https://threejs-journey.com/lessons/transform-objects)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် စနစ်တကျ ပြုစုသူ**: Antigravity  
> **အဆင့်**: အခြေခံ (Beginner Friendly)

---

## 🎯 ဤသင်ခန်းစာ၏ အဓိက ရည်ရွယ်ချက်
3D Space ထဲတွင် အရာဝတ္ထုများကို နေရာရွှေ့ခြင်း (`position`), အရွယ်အစားချဲ့ထွင်ခြင်း (`scale`), လှည့်ပတ်ခြင်း (`rotation`/`quaternion`), ဝင်ရိုးများကို စစ်ဆေးခြင်း (`AxesHelper`) နှင့် အုပ်စုဖွဲ့ခြင်း (`Group`) တို့ကို ရှင်းလင်းစွာ တတ်မြောက်စေရန် ဖြစ်ပါသည်။

---

## 💡 Mental Model: 3D ဝင်ရိုးများ (XYZ Coordinate System)

Three.js တွင် ဝင်ရိုး (၃) ခု ရှိပြီး `AxesHelper` ဖြင့် အရောင်ခွဲခြား မြင်တွေ့နိုင်သည်:

```
           +Y (Green / အစိမ်းရောင် - အပေါ်ဘက်)
            │
            │
            └────────── +X (Red / အနီရောင် - ညာဘက်)
           /
          /
        +Z (Blue / အပြာရောင် - မိမိဆီသို့ ဦးတည်)
```

```javascript
// 2 unit အလျားရှိသော AxesHelper ကို Scene ထဲ ထည့်သွင်းခြင်း
scene.add(new THREE.AxesHelper(2))
```

---

## 🔑 အခြေခံ Transform Properties (၄) ခု

### ၁။ Position (နေရာ ရွှေ့ပြောင်းခြင်း - Vector3)
`position` သည် $X, Y, Z$ တန်ဖိုး ၃ ခု ပါရှိသော `Vector3` Class ဖြစ်သည်:

```javascript
// ဝင်ရိုးတစ်ခုချင်းစီ သို့မဟုတ် set() ဖြင့် ရွှေ့ခြင်း
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1
// သို့မဟုတ် တစ်ကြောင်းတည်းဖြင့်:
mesh.position.set(0.7, -0.6, 1)

// အသုံးဝင်သော Vector3 Methods များ:
mesh.position.length()                        // Origin (0,0,0) မှ လက်ရှိ Object အထိ အကွာအဝေး
mesh.position.distanceTo(camera.position)     // Camera နှင့် Object ကြား အကွာအဝေး
mesh.position.normalize()                     // ဦးတည်ရာမပြောင်းဘဲ အလျားကို 1 သို့ လျှော့ချခြင်း
```

---

### ၂။ Scale (အရွယ်အစား ချဲ့/ချုံ့ခြင်း - Vector3)

```javascript
mesh.scale.x = 2    // အကျယ်ကို ၂ ဆ ချဲ့ခြင်း
mesh.scale.y = 0.5  // အမြင့်ကို တစ်ဝက် ချုံ့ခြင်း
mesh.scale.z = 0.5
mesh.scale.set(2, 0.5, 0.5) // တစ်ကြောင်းတည်း သတ်မှတ်ခြင်း
```

---

### ၃။ Rotation (လှည့်ပတ်ခြင်း - Euler & Radians)
Three.js တွင် ဒီဂရီအစား **Radians** စနစ်ကို သုံးသည်:
* $180^\circ = \pi \approx 3.14159$ (`Math.PI`)
* $360^\circ = 2\pi$ (`Math.PI * 2`)
* $90^\circ = \frac{\pi}{2}$ (`Math.PI * 0.5`)

```javascript
// Gimbal Lock ကာကွယ်ရန် ဝင်ရိုး အစဉ်အလိုက် ပြောင်းခြင်း
mesh.rotation.reorder('YXZ')
mesh.rotation.y = Math.PI * 0.5 // 90 ဒီဂရီ လှည့်ခြင်း

// lookAt(): သတ်မှတ်ထားသော Target သို့ တည့်တည့် မျက်နှာမူစေခြင်း
camera.lookAt(mesh.position)
```

---

### ၄။ Scene Graph နှင့် Grouping (`THREE.Group`)

အဆောက်အအုံတစ်ခု သို့မဟုတ် ကားတစ်စီးထဲရှိ အစိတ်အပိုင်းများစွာကို တစ်ပြိုင်နက် ရွှေ့ပြောင်း/လှည့်ပတ်လိုပါက `THREE.Group` ကို သုံးသည်:

```javascript
const group = new THREE.Group()
scene.add(group)

// Object များကို Group ထဲသို့ ထည့်ခြင်း
group.add(cube1, cube2, cube3)

// Group တစ်ခုလုံးကို တစ်ပြိုင်နက် ရွှေ့ပြောင်းခြင်း
group.position.y = 1
group.scale.set(1.5, 1.5, 1.5)
group.rotation.y = Math.PI * 0.25
```

---

## 📋 အမြန်မှတ်စု (Lesson 04 Memo)

```javascript
// TRANSFORM OBJECTS CHEAT SHEET
mesh.position.set(1, 2, 3)                   // Position ရွှေ့ခြင်း
mesh.scale.set(2, 0.5, 0.5)                  // Scale ချဲ့/ချုံ့ခြင်း
mesh.rotation.reorder('YXZ')                 // Gimbal Lock ကာကွယ်ခြင်း
mesh.rotation.y = Math.PI * 0.5              // 90 ဒီဂရီ လှည့်ခြင်း
camera.lookAt(mesh.position)                 // ကင်မရာ မျက်နှာမူခြင်း
const group = new THREE.Group()              // Group ဖွဲ့စည်းခြင်း
group.add(mesh1, mesh2)
```
