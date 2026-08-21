# Lesson 04 — Transform Objects (3D Object များကို ရွှေ့၊ လှည့်၊ ချဲ့ခြင်း)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: Transform objects](https://threejs-journey.com/lessons/transform-objects)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤစာမျက်နှာအကြောင်း** — မူရင်း lesson ရဲ့ transform အယူအဆများကို ကိုယ်တိုင် code ရေးပြီး စမ်းသပ်နိုင်အောင် မြန်မာလို ပြန်လည်စီစဉ်ရှင်းပြထားသော လေ့လာရေးအကူအညီဖြစ်ပါတယ်။ Video၊ starter files နဲ့ final files အတွက် မူရင်း lesson ကို တွဲဖက်အသုံးပြုပါ။

---

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

Lesson 03 မှာ ပထမဆုံး cube ကို render လုပ်ခဲ့ပါတယ်။ အခု cube၊ camera နဲ့ နောက်ပိုင်းတွေ့ရမယ့် 3D object များကို နေရာပြောင်းပြီး scene တစ်ခုအဖြစ် စီမံနိုင်အောင် လေ့လာပါမယ်။ Lesson အဆုံးမှာ—

- `position` နဲ့ object ကို X၊ Y၊ Z axis များပေါ် ရွှေ့နိုင်မယ်
- `scale` နဲ့ axis တစ်ခုချင်း သို့မဟုတ် အားလုံးကို ချဲ့/ချုံ့နိုင်မယ်
- `rotation`၊ radians နဲ့ rotation order ကို နားလည်မယ်
- `quaternion` က ဘာကြောင့်ရှိသလဲဆိုတာ အခြေခံသိမယ်
- `AxesHelper` နဲ့ 3D direction ကို မျက်မြင်စစ်နိုင်မယ်
- `lookAt()` နဲ့ camera သို့မဟုတ် object တစ်ခုကို target ဆီ မျက်နှာမူစေနိုင်မယ်
- `Group` နဲ့ object အများကြီးကို parent တစ်ခုကနေ တစ်ပြိုင်နက် transform လုပ်နိုင်မယ်

ဒီ Lesson ရဲ့ memory hook က—

```text
Position = ဘယ်နေရာမှာလဲ
Scale    = ဘယ်လောက်ကြီးလဲ
Rotation = ဘယ်ဘက်ကို လှည့်ထားလဲ
Group    = ဘယ်သူ့အောက်မှာ ပါလဲ
```

---

## ၁။ Transform လုပ်နိုင်တဲ့ property လေးခု

Three.js ရဲ့ `Mesh`၊ `Camera`၊ `Group` နဲ့ `Light` အများစုဟာ `Object3D` ကို အမွေဆက်ခံထားပါတယ်။ ဒါကြောင့် အောက်ပါ transform properties များကို အတူတူရရှိကြပါတယ်။

| Property | Type | အလုပ် |
| --- | --- | --- |
| `position` | `Vector3` | နေရာရွှေ့ခြင်း |
| `scale` | `Vector3` | အရွယ်အစားပြောင်းခြင်း |
| `rotation` | `Euler` | Axis အစဉ်လိုက် လှည့်ခြင်း |
| `quaternion` | `Quaternion` | Rotation ကို အခြားသင်္ချာပုံစံနဲ့ ကိုယ်စားပြုခြင်း |

ဒီ values တွေကို renderer က နောက်ကွယ်မှာ matrices အဖြစ် ပြောင်းပြီး WebGL/GPU ဆီပို့ပေးပါတယ်။ အခုအဆင့်မှာ matrix ကို ကိုယ်တိုင်တွက်ဖို့ မလိုသေးပါဘူး။ Object ရဲ့ property များကို ပြောင်းရုံနဲ့ Three.js က လိုအပ်တာကို ဆက်လုပ်ပေးပါတယ်။

> `rotation` နဲ့ `quaternion` နှစ်ခုလုံးက rotation တစ်ခုတည်းကို ဖော်ပြပါတယ်။ တစ်ခုကိုပြောင်းရင် နောက်တစ်ခုလည်း sync ဖြစ်ပါတယ်။ ပုံမှန် transform အတွက် နားလည်လွယ်တဲ့ `rotation` ကို စသုံးနိုင်ပါတယ်။

---

## ၂။ Position — 3D နေရာ ရွှေ့ခြင်း

3D space တစ်ခုမှာ axis သုံးခုရှိပါတယ်။ Three.js ရဲ့ အများသုံး orientation က—

- **X** — positive ဆို ညာဘက်၊ negative ဆို ဘယ်ဘက်
- **Y** — positive ဆို အပေါ်၊ negative ဆို အောက်
- **Z** — positive ဆို viewer ဘက်၊ negative ဆို scene အတွင်းဘက်

`position` ဟာ `THREE.Vector3` instance တစ်ခုဖြစ်ပြီး `x`၊ `y`၊ `z` values သုံးခု ပါပါတယ်။

```js
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1
```

တစ်ကြောင်းတည်း ရေးချင်ရင် `set(x, y, z)` ကို သုံးပါ။

```js
mesh.position.set(0.7, -0.6, 1)
```

Transform ကို static image မှာ မြင်ချင်ရင် `renderer.render(scene, camera)` မခေါ်မီ value ပြောင်းထားရပါတယ်။ Lesson 05 မှာ animation loop ထည့်လာတဲ့အခါ frame တိုင်း render ပြန်လုပ်မှာဖြစ်ပါတယ်။

### Unit ဆိုတာ ဘာလဲ

Three.js က `1 unit` ကို meter သို့မဟုတ် centimeter လို့ အတင်းမသတ်မှတ်ထားပါဘူး။ Project ဖန်တီးသူက ကိုယ်စားပြုမှုကို ရွေးနိုင်ပါတယ်။

- အိမ်/အခန်း project — `1 unit = 1 meter`
- စားပွဲတင်ပစ္စည်း — `1 unit = 1 centimeter` လို့ သတ်မှတ်နိုင်
- Stylized game — လက်တွေ့ unit မဟုတ်ဘဲ ကိုယ်ပိုင်စံ သုံးနိုင်

အရေးကြီးဆုံးက project တစ်ခုလုံးမှာ စံတစ်ခုတည်းကို တသမတ်တည်း သုံးဖို့ပါ။ Camera distance၊ model size နဲ့ physics values တွေ ထိန်းရပိုလွယ်သွားပါတယ်။

---

## ၃။ Vector3 ရဲ့ အသုံးဝင်သော methods

`position` နဲ့ `scale` ဟာ ရိုးရိုး object မဟုတ်ဘဲ `Vector3` ဖြစ်တာကြောင့် အဆင်သင့် methods များ သုံးနိုင်ပါတယ်။

### `length()` — origin မှ အကွာအဝေး

```js
console.log(mesh.position.length())
```

`(0, 0, 0)` ကနေ mesh position အထိ အကွာအဝေးကို ပြန်ပေးပါတယ်။

### `distanceTo()` — Vector နှစ်ခုကြား အကွာအဝေး

Camera ဖန်တီးပြီးနောက် အောက်ပါအတိုင်း တိုင်းနိုင်ပါတယ်။

```js
const distance = mesh.position.distanceTo(camera.position)
console.log(distance)
```

### `normalize()` — direction မပြောင်းဘဲ length ကို 1 ဖြစ်စေခြင်း

```js
mesh.position.normalize()
console.log(mesh.position.length()) // 1
```

သတိထားရမှာက `normalize()` ဟာ မူရင်း vector ကို တကယ်ပြောင်းပစ်ပါတယ်။ Direction ပဲလိုပြီး mesh position ကို မပြောင်းချင်ရင် copy တစ်ခုလုပ်ပါ။

```js
const direction = mesh.position.clone().normalize()
```

### `copy()` — Vector တစ်ခုကို နောက်တစ်ခုသို့ ကူးခြင်း

```js
mesh.position.copy(camera.position)
```

ဒီ code က mesh ကို camera နေရာအတိအကျ ရွှေ့မှာဖြစ်ပါတယ်။ မြင်ကွင်းထဲ မပေါ်တော့နိုင်တာကို သတိထားပါ။

---

## ၄။ AxesHelper — axis များကို မျက်မြင်ကြည့်ခြင်း

Camera လှည့်သွားတဲ့အခါ ဘယ် direction က X/Y/Z လဲဆိုတာ မှားလွယ်ပါတယ်။ `AxesHelper` က scene origin ကနေ positive axes သုံးခုကို ရောင်စုံမျဉ်းနဲ့ ပြပေးပါတယ်။

```js
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```

| အရောင် | Axis | အများသုံး direction |
| --- | --- | --- |
| အနီ | X | ညာဘက် |
| အစိမ်း | Y | အပေါ် |
| အပြာ | Z | viewer ဘက် |

Camera က Z axis နဲ့ တည့်တည့်ရှိနေရင် အပြာရောင်မျဉ်းကို အစက်သေးသေးလို သို့မဟုတ် လုံးဝမမြင်ရတာ ဖြစ်နိုင်ပါတယ်။ ပျောက်နေတာမဟုတ်ဘဲ camera view direction နဲ့ ထပ်နေတာပါ။

`AxesHelper` ဟာ development helper ဖြစ်ပါတယ်။ Debug လုပ်ချိန်မှာ အသုံးပြုပြီး final experience မှာ မလိုရင် ဖျောက်နိုင်ပါတယ်။

---

## ၅။ Scale — ချဲ့ခြင်းနှင့် ချုံ့ခြင်း

`scale` လည်း `Vector3` ဖြစ်ပါတယ်။ Default value က `(1, 1, 1)` ဖြစ်ပြီး မူလအရွယ်အစားကို ဆိုလိုပါတယ်။

```js
mesh.scale.x = 2      // X အတိုင်း ၂ ဆ
mesh.scale.y = 0.25   // Y အတိုင်း မူလရဲ့ လေးပုံတစ်ပုံ
mesh.scale.z = 0.5    // Z အတိုင်း တစ်ဝက်
```

```js
mesh.scale.set(2, 0.25, 0.5)
```

Axis သုံးခုလုံးကို အချိုးတူပြောင်းရင် uniform scale ဖြစ်ပါတယ်။

```js
mesh.scale.setScalar(1.5)
```

Scale `0` ဆို axis တစ်ခုမှာ ပြားသွားမယ်။ Negative scale က object ကို ပြန်လှန်နိုင်ပေမယ့် normals၊ face orientation နဲ့ နောက်ပိုင်း logic များမှာ မျှော်လင့်မထားတဲ့ ပြဿနာဖြစ်နိုင်လို့ မလိုအပ်ဘဲ မသုံးသင့်ပါဘူး။

---

## ၆။ Rotation — Euler angle နဲ့ radians

`mesh.rotation` ဟာ `THREE.Euler` instance ဖြစ်ပါတယ်။ `x`၊ `y`၊ `z` axis များကို angle တစ်ခုစီနဲ့ လှည့်နိုင်ပါတယ်။

- X axis — ကားဘီးလည်သလို
- Y axis — ချားရဟတ်/turntable လည်သလို
- Z axis — လေယာဉ်ရှေ့ propeller လည်သလို

Three.js မှာ angle ကို degrees မဟုတ်ဘဲ **radians** နဲ့ ရေးပါတယ်။

| Degrees | Radians code |
| ---: | --- |
| 45° | `Math.PI * 0.25` |
| 90° | `Math.PI * 0.5` |
| 180° | `Math.PI` |
| 360° | `Math.PI * 2` |

```js
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```

Degrees value ကို code ထဲမှာ ဖတ်ရလွယ်အောင် ပြောင်းချင်ရင်—

```js
mesh.rotation.y = THREE.MathUtils.degToRad(45)
```

---

## ၇။ Rotation order နဲ့ Gimbal Lock

Euler rotation ဟာ axes အားလုံးကို တစ်ပြိုင်နက်တည်း လှည့်တာမဟုတ်ပါဘူး။ Default order `XYZ` အရ X ကိုအရင်၊ Y ကိုနောက်၊ Z ကိုနောက်ဆုံး သက်ရောက်စေပါတယ်။ ပထမ axis လှည့်တဲ့အခါ နောက် axes တွေရဲ့ orientation ပါ ပြောင်းနိုင်တာကြောင့် combined rotation မှာ မျှော်လင့်မထားတဲ့ရလဒ် ဖြစ်နိုင်ပါတယ်။

လိုအပ်ရင် rotation order ကို angles မသတ်မှတ်မီ ပြောင်းနိုင်ပါတယ်။

```js
mesh.rotation.reorder('YXZ')
mesh.rotation.y = Math.PI * 0.5
mesh.rotation.x = Math.PI * 0.2
```

Euler axes နှစ်ခု ထပ်တူနီးပါးဖြစ်ပြီး လွတ်လပ်စွာလှည့်နိုင်တဲ့ direction တစ်ခု ဆုံးရှုံးသွားခြင်းကို **gimbal lock** လို့ ခေါ်ပါတယ်။ Rotation interpolation၊ camera rig သို့မဟုတ် physics လို အဆင့်မြင့်အလုပ်တွေမှာ `Quaternion` ကို အသုံးများပါတယ်။

### Quaternion ကို အခု ဘယ်လောက်သိရမလဲ

Quaternion ဟာ `(x, y, z, w)` values နဲ့ rotation ကို ကိုယ်စားပြုပါတယ်။ ဒီ Lesson မှာ သင်္ချာအသေးစိတ် မလိုသေးပါဘူး။ အောက်ပါအချက်သုံးချက်ကို မှတ်ထားရင် လုံလောက်ပါတယ်။

1. `rotation` နဲ့ `quaternion` က rotation တစ်ခုတည်းကို ဖော်ပြတယ်
2. တစ်ခုကိုပြောင်းရင် နောက်တစ်ခု update ဖြစ်တယ်
3. Quaternion က rotation order ပြဿနာကို ရှောင်နိုင်ပြီး smooth interpolation အတွက် အသုံးဝင်တယ်

Logic တစ်ခုတည်းအတွင်း `rotation` နဲ့ `quaternion` ကို အကြောင်းမရှိဘဲ အပြိုင်ပြင်နေရင် ဘယ် value က နောက်ဆုံးသက်ရောက်သလဲ ရှုပ်သွားနိုင်ပါတယ်။ နည်းလမ်းတစ်ခုကို ရွေးပြီး တသမတ်တည်း သုံးပါ။

---

## ၈။ `lookAt()` — target ဆီ မျက်နှာမူစေခြင်း

`Object3D` မှာ `lookAt()` method ရှိပါတယ်။ Target အဖြစ် `Vector3` တစ်ခု ပေးရပြီး object ရဲ့ local `-Z` direction ကို target ဆီ ချိန်ပေးပါတယ်။

```js
camera.lookAt(new THREE.Vector3(0, -1, 0))
```

ရှိပြီးသား vector ကိုလည်း တိုက်ရိုက်သုံးနိုင်ပါတယ်။

```js
camera.lookAt(mesh.position)
```

`lookAt()` ကို အသုံးချနိုင်တဲ့ ဥပမာများ—

- Camera ကို product ဆီ အမြဲချိန်ထားခြင်း
- Cannon ကို enemy ဆီ လှည့်ခြင်း
- Character ရဲ့ မျက်လုံးကို cursor target ဆီ ချိန်ခြင်း
- Sign သို့မဟုတ် label ကို camera ဆီ မျက်နှာမူစေခြင်း

> `lookAt(mesh)` လို့ Mesh တစ်ခုလုံး မပေးရပါဘူး။ `lookAt(mesh.position)` လို `Vector3` ပေးရပါတယ်။ Parent transform ရှိတဲ့ child object ရဲ့ world position လိုအပ်ရင် `getWorldPosition()` ကို သုံးရပါမယ်။

---

## ၉။ Transform များကို ပေါင်းစပ်ခြင်း

Position၊ rotation နဲ့ scale ကို object တစ်ခုတည်းမှာ အတူသုံးနိုင်ပါတယ်။ Static code မှာ နောက်ဆုံး property values တူနေရင် assignment ရေးတဲ့အစီအစဉ်ကြောင့် ရလဒ်မပြောင်းပါဘူး။

```js
mesh.position.set(0.7, -0.6, 1)
mesh.scale.set(2, 0.25, 0.5)
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```

Three.js က ဒီ state ကို object matrix အဖြစ် စုပေါင်းပြီး render လုပ်ပါတယ်။ ဒါပေမယ့် `translateX()`၊ `rotateX()` လို operation-based methods ကို ဆက်တိုက်ခေါ်ခြင်း သို့မဟုတ် parent/child hierarchy များမှာတော့ order နဲ့ local axes က အရေးကြီးလာနိုင်ပါတယ်။

---

## ၁၀။ Scene Graph — Parent နဲ့ Child

အိမ်တစ်လုံးမှာ နံရံ၊ တံခါး၊ ပြတင်းပေါက်နဲ့ ခေါင်မိုးများ ရှိပါတယ်။ အစိတ်အပိုင်းတစ်ခုချင်းကို scene ထဲ တိုက်ရိုက်ထည့်ထားပြီး အိမ်တစ်ခုလုံးကို ရွှေ့ချင်ရင် object အားလုံးကို တစ်ခုချင်း ပြင်ရပါမယ်။

`THREE.Group` ကို parent container အဖြစ် သုံးရင် children အားလုံးကို တစ်ပြိုင်နက် transform လုပ်နိုင်ပါတယ်။

```js
const group = new THREE.Group()
scene.add(group)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const cube1 = new THREE.Mesh(geometry, material)
cube1.position.x = -1.5
group.add(cube1)

const cube2 = new THREE.Mesh(geometry, material)
group.add(cube2)

const cube3 = new THREE.Mesh(geometry, material)
cube3.position.x = 1.5
group.add(cube3)

group.scale.y = 2
group.rotation.y = 0.2
```

ဒီနေရာမှာ—

- Cube ရဲ့ `position` က **Group အတွင်း local position** ဖြစ်တယ်
- Group ရွှေ့ရင် cubes အားလုံး world space ထဲမှာ လိုက်ရွှေ့တယ်
- Child ရဲ့ နောက်ဆုံး world transform က parent transform နဲ့ child local transform ပေါင်းထားတာဖြစ်တယ်
- Group ကိုလည်း `Object3D` ဖြစ်လို့ `position`၊ `scale`၊ `rotation`၊ `quaternion` နဲ့ `lookAt()` သုံးနိုင်တယ်

```text
Scene
└── Group (parent transform)
    ├── Cube 1 (local transform)
    ├── Cube 2 (local transform)
    └── Cube 3 (local transform)
```

ကားတစ်စီး၊ လူဇာတ်ကောင်တစ်ယောက်၊ စက်အစိတ်အပိုင်းတစ်စု သို့မဟုတ် solar system တစ်ခုလို hierarchy ရှိတဲ့ model များအတွက် scene graph က အခြေခံအုတ်မြစ်ဖြစ်ပါတယ်။

---

## ၁၁။ စမ်းသပ်ရန် အဆင့်လိုက်လေ့ကျင့်ခန်း

Interactive 3D Lab ကို ဖွင့်ပြီး အောက်ပါအစီအစဉ်နဲ့ စမ်းပါ။

1. **Center Cube** ကို target ရွေးပြီး Position X ကို ပြောင်းပါ
2. Rotation X နဲ့ Y ကို ပြောင်းပြီး axes တစ်ခုနောက်တစ်ခု လှည့်သွားပုံကို ကြည့်ပါ
3. Scale X၊ Y၊ Z ကို မတူအောင်ထားပြီး non-uniform scale ကို လေ့လာပါ
4. **Whole Group** ကို ရွေးပြီး Position သို့မဟုတ် Rotation ပြောင်းပါ
5. Parent Group ပြောင်းတဲ့အခါ cube သုံးခုလုံး လိုက်ပြောင်းတာကို သတိပြုပါ
6. Axes helper ကို ဖွင့်/ပိတ်ပြီး direction များကို ခန့်မှန်းစမ်းပါ
7. Live code panel မှာ slider value နဲ့ code value ကို တိုက်စစ်ပါ

### Mini challenge

အောက်ပါရလဒ်ရအောင် Lab controls နဲ့ စမ်းပါ။

- Group ကို Y axis ပေါ် `0.5` unit တင်ပါ
- Group ကို Y axis ပေါ် 45° လှည့်ပါ
- Center cube ကို X axis ပေါ် `0.5` unit ရွှေ့ပါ
- Center cube ရဲ့ Y scale ကို `1.5` လုပ်ပါ

Parent နဲ့ child transform နှစ်ခုလုံး သက်ရောက်နေတဲ့ နောက်ဆုံးပုံကို စောင့်ကြည့်ပါ။

---

## ၁၂။ ပြဿနာဖြေရှင်းရန် checklist

### Object မမြင်ရဘူး

- Camera နောက်ဘက် သို့မဟုတ် camera နေရာတူသို့ ရွှေ့မိသလား
- Scale တစ်ခုခု `0` ဖြစ်နေသလား
- Camera clipping range အပြင် ရောက်သွားသလား
- Transform ပြီးနောက် render ပြန်ခေါ်ထားသလား

### လှည့်ပုံ မျှော်လင့်ထားသလို မဟုတ်ဘူး

- Degrees value ကို radians အဖြစ် တိုက်ရိုက်ထည့်မိသလား
- Parent group မှာ rotation ရှိနေပြီးသားလား
- Euler rotation order က လိုချင်တဲ့အစီအစဉ် ဟုတ်သလား
- `rotation` နဲ့ `quaternion` နှစ်ခုလုံးကို logic မတူဘဲ ပြင်နေသလား

### Child position က ထင်ထားတဲ့ world position မဟုတ်ဘူး

Child `position` ဟာ parent အတွင်း local coordinate ဖြစ်ပါတယ်။ World position စစ်ချင်ရင်—

```js
const worldPosition = new THREE.Vector3()
child.getWorldPosition(worldPosition)
console.log(worldPosition)
```

---

## အနှစ်ချုပ်

```js
// Move
mesh.position.set(0.7, -0.6, 1)

// Resize
mesh.scale.set(2, 0.25, 0.5)

// Rotate
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

// Aim at a Vector3
camera.lookAt(mesh.position)

// Visual axis reference
scene.add(new THREE.AxesHelper(2))

// Parent container
const group = new THREE.Group()
group.add(mesh)
scene.add(group)
```

Transform တစ်ခုချင်းကို သီးခြားနားလည်ပြီး parent/child ဆက်နွယ်မှုကို သိသွားရင် 3D scene တစ်ခုရဲ့ အရာဝတ္ထုနေရာချမှုကို စနစ်တကျ ထိန်းနိုင်ပါပြီ။ နောက် Lesson မှာ ဒီ properties တွေကို အချိန်အလိုက် ပြောင်းပြီး animation ဖန်တီးပါမယ်။
