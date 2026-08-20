# 📐 Lesson 04: အရာဝတ္ထုများကို နေရာရွှေ့ပြောင်းခြင်းနှင့် စီမံခြင်း (Transform Objects)

> **သင်ကြားပြသသူ**: Bruno Simon (Three.js Journey)  
> **မြန်မာဘာသာ ပြုစုရှင်းလင်းသူ**: Antigravity  
> **သင်ခန်းစာ ပုံစံ**: ဆရာတစ်ယောက်က အနီးကပ် ရှင်းပြသလို ရင်းနှီးလွယ်ကူပြီး အသေးစိတ် ပြည့်စုံသော လမ်းညွှန်

---

## 📑 မာတိကာ (Table of Contents)

1. [အခြေခံ Transform Properties (၄) ခု မိတ်ဆက်](#၁-အခြေခံ-transform-properties-၄-ခု-မိတ်ဆက်)
2. [Position (နေရာအကွာအဝေးနှင့် Vector3 စွမ်းဆောင်ရည်များ)](#၂-position-နေရာအကွာအဝေးနှင့်-vector3-စွမ်းဆောင်ရည်များ)
   - Unit ဆိုသည်မှာ အဘယ်နည်း?
   - `length()`, `distanceTo()`, `normalize()` နှင့် `set()`
3. [AxesHelper (ဝင်ရိုး လမ်းညွှန်မျဉ်းများ)](#၃-axeshelper-ဝင်ရိုး-လမ်းညွှန်မျဉ်းများ)
4. [Scale (အရွယ်အစား ချဲ့ထွင်/ချုံ့ခြင်း)](#၄-scale-အရွယ်အစား-ချဲ့ထွင်ချုံ့ခြင်း)
5. [Rotation (လည်ပတ်ခြင်း - Euler vs Quaternion)](#၅-rotation-လည်ပတ်ခြင်း---euler-vs-quaternion)
   - Radians နှင့် Math.PI သဘောတရား
   - Gimbal Lock ဆိုတာ ဘာလဲ? `reorder()` ဖြင့် ဖြေရှင်းပုံ
   - Quaternion မိတ်ဆက်
   - `lookAt(...)` ဖြင့် အလိုအလျောက် မျက်နှာမူစေခြင်း
6. [Scene Graph နှင့် Grouping (အုပ်စုဖွဲ့ ရွှေ့ပြောင်းခြင်း)](#၆-scene-graph-နှင့်-grouping-အုပ်စုဖွဲ့-ရွှေ့ပြောင်းခြင်း)
7. [ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Lesson 04 Memory Hook)](#၇-ဆရာ့ရဲ့-အလွတ်မှတ်-မှတ်စုတို)

---

# ၁။ အခြေခံ Transform Properties (၄) ခု မိတ်ဆက်

Three.js တွင် `Object3D` class ကို အမွေဆက်ခံထားသော အရာအားလုံး (`Mesh`, `Group`, `Camera`, `Light`) တွင် နေရာရွှေ့ပြောင်းရန် အခြေခံ Properties (၄) ခု ပါရှိသည်:

1. **`position`** (နေရာအကွာအဝေး - `Vector3`)
2. **`scale`** (အရွယ်အစား အကြီး/အသေး - `Vector3`)
3. **`rotation`** (ထောင့်ဒီဂရီဖြင့် လှည့်ပတ်ခြင်း - `Euler`)
4. **`quaternion`** (သင်္ချာ 4D ဖြင့် လှည့်ပတ်ခြင်း - `Quaternion`)

> 💡 **Matrix ပေါင်းစပ်ပုံ**: သင့်အနေဖြင့် Position, Rotation, Scale တို့ကို မည်သည့်အစီအစဉ်ဖြင့်ပင် ကုဒ်ရေးသားစေကာမူ Three.js သည် နောက်ကွယ်တွင် **Scale $\to$ Rotation $\to$ Translation (Position)** အစီအစဉ်အတိုင်း `modelMatrix` ထဲတွင် အလိုအလျောက် မှန်ကန်စွာ ပေါင်းစပ် တွက်ချက်ပေးပါသည်။

---

# ၂။ Position (နေရာအကွာအဝေးနှင့် Vector3 စွမ်းဆောင်ရည်များ)

`position` သည် $X, Y, Z$ ဝင်ရိုး ၃ ခု ပါရှိသော **`THREE.Vector3`** Class ဖြစ်သည်။

```javascript
// ဝင်ရိုးတစ်ခုချင်းစီအလိုက် ရွှေ့ခြင်း
mesh.position.x = 0.7   // ညာဘက်သို့ 0.7 unit
mesh.position.y = -0.6  // အောက်ဘက်သို့ 0.6 unit
mesh.position.z = 1     // မိမိဆီသို့ (ရှေ့ဘက်) 1 unit

// တစ်ကြောင်းတည်းဖြင့် သတ်မှတ်ခြင်း (set method)
mesh.position.set(0.7, -0.6, 1)
```

---

### (က) 3D Space ရှိ "Unit" ဆိုသည်မှာ အဘယ်နည်း?
Three.js တွင် `1 unit` သည် မည်သည့်အတိုင်းအတာကိုမဆို ကိုယ်စားပြုနိုင်သည်:
* အဆောက်အအုံ ဆောက်လုပ်ရေး Project ဖြစ်ပါက `1 unit = 1 meter`
* အာကာသ Project ဖြစ်ပါက `1 unit = 1 kilometer (သို့မဟုတ်) 1 light-year`
* အရေးကြီးသည်မှာ **Project တစ်ခုလုံးတွင် Unit အတိုင်းအတာ စံနှုန်းတစ်ခုတည်းကိုသာ တညီတညွတ်တည်း သတ်မှတ် အသုံးပြုရန်** ဖြစ်သည်။

---

### (ခ) Vector3 ၏ အသုံးဝင်သော Methods များ

```javascript
// 1. length(): Origin (0, 0, 0) မှ လက်ရှိ Object အထိ အကွာအဝေးကို တိုင်းတာခြင်း
console.log(mesh.position.length()) // e.g. 1.36

// 2. distanceTo(): အခြား Object / Camera တစ်ခုနှင့် အကွာအဝေးကို တိုင်းတာခြင်း
console.log(mesh.position.distanceTo(camera.position))

// 3. normalize(): ဦးတည်ရာ Direction မပြောင်းဘဲ Vector ၏ အလျား (Length) ကို 1 သို့ လျှော့ချခြင်း
mesh.position.normalize()
console.log(mesh.position.length()) // အမြဲတမ်း 1 ဖြစ်သွားမည်
```

---

# ၃။ AxesHelper (ဝင်ရိုး လမ်းညွှန်မျဉ်းများ)

3D Space ထဲတွင် $X, Y, Z$ ဝင်ရိုးများကို မျက်စိဖြင့် တိကျစွာ မြင်သာစေရန် `AxesHelper` ကို အသုံးပြုပါသည်:

```javascript
// 2 unit အလျားရှိသော AxesHelper ဖန်တီးခြင်း
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```

```
           +Y (Green / အစိမ်းရောင် - အပေါ်ဘက်)
            │
            │
            └────────── +X (Red / အနီရောင် - ညာဘက်)
           /
          /
        +Z (Blue / အပြာရောင် - မိမိဆီသို့ ဦးတည်)
```

* 🔴 **Red (အနီရောင်)**: **$X$ Axis** (ညာဘက်သို့ Positive / ဘယ်ဘက်သို့ Negative)
* 🟢 **Green (အစိမ်းရောင်)**: **$Y$ Axis** (အပေါ်ဘက်သို့ Positive / အောက်ဘက်သို့ Negative)
* 🔵 **Blue (အပြာရောင်)**: **$Z$ Axis** (ဖန်သားပြင် အပြင်ဘက် မိမိဆီသို့ Positive / အနောက်ဘက်သို့ Negative)

---

# ၄။ Scale (အရွယ်အစား ချဲ့ထွင်/ချုံ့ခြင်း)

`scale` သည်လည်း `Vector3` ဖြစ်ပြီး မူလအရွယ်အစား `1` ကို အခြေခံ၍ ဆတိုး ချဲ့ထွင်ခြင်း ဖြစ်သည်:

```javascript
mesh.scale.x = 2    // အကျယ်ကို ၂ ဆ ချဲ့ခြင်း
mesh.scale.y = 0.5  // အမြင့်ကို တစ်ဝက် ချုံ့ခြင်း
mesh.scale.z = 0.5

// တစ်ကြောင်းတည်းဖြင့် သတ်မှတ်ခြင်း
mesh.scale.set(2, 0.5, 0.5)
```

---

# ၅။ Rotation (လည်ပတ်ခြင်း - Euler vs Quaternion)

3D Object တစ်ခုကို လှည့်ပတ်ရန် နည်းလမ်း (၂) မျိုး ရှိသည်:

---

### (က) Euler Angles (`mesh.rotation`)
Euler သည် $X, Y, Z$ ဝင်ရိုးများကို ထောင့်ဒီဂရီဖြင့် လှည့်ခြင်း ဖြစ်သည်။ Three.js တွင် **Radians** စနစ်ကို အသုံးပြုသည်:

$$180^\circ = \pi \approx 3.14159 \text{ (`Math.PI`)}$$

$$360^\circ = 2\pi \approx 6.28318 \text{ (`Math.PI * 2`)}$$

$$90^\circ = \frac{\pi}{2} \approx 1.57079 \text{ (`Math.PI * 0.5`)}$$

```javascript
// Y ဝင်ရိုးအတိုင်း 45 ဒီဂရီ လှည့်ခြင်း
mesh.rotation.y = Math.PI * 0.25

// X ဝင်ရိုးအတိုင်း 90 ဒီဂရီ လှည့်ခြင်း
mesh.rotation.x = Math.PI * 0.5
```

---

### (ခ) Gimbal Lock ဆိုတာ ဘာလဲ? `reorder()` ဖြင့် ဖြေရှင်းပုံ

* **Gimbal Lock အန္တရာယ်**: Euler rotation သည် ဝင်ရိုးများကို အစဉ်လိုက် (Default: $X \to Y \to Z$) လှည့်သည်။ ဝင်ရိုးတစ်ခုကို လှည့်လိုက်သည့်အခါ ကျန်ဝင်ရိုးများပါ လိုက်ပါ ရွေ့လျားသွားသဖြင့် ဝင်ရိုး (၂) ခု ထပ်တူကျသွားကာ လှည့်ပတ်နိုင်စွမ်း (Degree of Freedom) ၁ ခု ဆုံးရှုံးသွားသော ပြဿနာကို **Gimbal Lock** ဟု ခေါ်သည်။
* **ဖြေရှင်းနည်း**: လှည့်ပတ်မည့် ဝင်ရိုး အစဉ်အလိုက်ကို `reorder()` ဖြင့် ကြိုတင် ပြောင်းလဲပေးနိုင်သည်:

```javascript
// Y ကို အရင်လှည့်ပြီးမှ X, Z ကို လှည့်စေရန် သတ်မှတ်ခြင်း (FPS Games & Characters အတွက် အသုံးများ)
mesh.rotation.reorder('YXZ')
mesh.rotation.y = Math.PI * 0.5
mesh.rotation.x = Math.PI * 0.2
```

---

### (ဂ) Quaternion မိတ်ဆက် (`mesh.quaternion`)
* Quaternion သည် 4D Complex Numbers $(x, y, z, w)$ ဖြင့် လှည့်ပတ်မှုများကို တွက်ချက်သော စနစ်ဖြစ်သည်။
* **အားသာချက်**: Gimbal Lock ပြဿနာ လုံးဝ မဖြစ်ပွားပါ။
* Three.js တွင် `rotation` ကို ပြောင်းလဲလိုက်လျှင် `quaternion` က နောက်ကွယ်တွင် အလိုအလျောက် Update ဖြစ်သွားသဖြင့် ပုံမှန်အားဖြင့် `rotation` ကိုသာ သုံးကြပြီး၊ Physics (သို့မဟုတ်) အဆင့်မြင့် လှည့်ပတ်မှုများတွင် `quaternion` ကို သုံးကြသည်။

---

### (ဃ) `lookAt(...)` ဖြင့် အလိုအလျောက် မျက်နှာမူစေခြင်း

Object တစ်ခု (သို့မဟုတ် ကင်မရာ) ကို သတ်မှတ်ထားသော Target Coordinate ဆီသို့ တည့်တည့် မျက်နှာမူစေရန် `lookAt()` ကို သုံးနိုင်သည်:

```javascript
// ကင်မရာကို Mesh တည်ရှိရာ နေရာသို့ တည့်တည့် မျက်နှာမူစေခြင်း
camera.lookAt(mesh.position)

// ကင်မရာကို ကမ္ဘာ့အလယ်ဗဟို (0, 0, 0) သို့ မျက်နှာမူစေခြင်း
camera.lookAt(new THREE.Vector3(0, 0, 0))
```

---

# ၆။ Scene Graph နှင့် Grouping (အုပ်စုဖွဲ့ ရွှေ့ပြောင်းခြင်း)

အဆောက်အအုံတစ်ခု၊ ကားတစ်စီး၊ သို့မဟုတ် ဇာတ်ကောင်တစ်ခုတွင် ပါဝင်သော Object အများအပြားကို တစ်ပြိုင်နက် ရွှေ့ပြောင်း၊ လှည့်ပတ်၊ ချဲ့ထွင်လိုပါက **`THREE.Group`** ကို အသုံးပြုရသည်:

```javascript
// 1. Group အသစ်တစ်ခု ဖန်တီး၍ Scene ထဲသို့ ထည့်ခြင်း
const group = new THREE.Group()
scene.add(group)

// 2. Cube ၃ ခု ဖန်တီး၍ Group ထဲသို့ ထည့်သွင်းခြင်း
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 1.5
group.add(cube3)

// 3. Group တစ်ခုလုံးကို တစ်ပြိုင်နက် ရွှေ့ပြောင်း/လှည့်ပတ်ခြင်း
group.position.y = 1
group.scale.set(1.2, 1.2, 1.2)
group.rotation.y = Math.PI * 0.25
```

---

# ၇။ ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Lesson 04 Memory Hook)

> 🧠 **ဒီလိုလေး အလွတ်မှတ်ထားလိုက်ပါ**:  
> * **Red = X** (ဘယ်/ညာ), **Green = Y** (အထက်/အောက်), **Blue = Z** (ရှေ့/နောက်)  
> * **90 ဒီဂရီ လှည့်လိုလျှင်** = `Math.PI * 0.5`  
> * **180 ဒီဂရီ လှည့်လိုလျှင်** = `Math.PI`  
> * **အရာဝတ္ထုဆီ တည့်တည့် ချိန်လိုလျှင်** = `camera.lookAt(mesh.position)`  
> * **အုပ်စုဖွဲ့ ရွှေ့လိုလျှင်** = `const group = new THREE.Group()`
