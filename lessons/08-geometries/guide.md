# Lesson 08 — Geometries (Vertices၊ Faces နှင့် BufferGeometry)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: Geometries](https://threejs-journey.com/lessons/geometries)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤ guide** — မူရင်း lesson ရဲ့ geometry အယူအဆနဲ့ code flow ကို မြန်မာလို လေ့ကျင့်နိုင်အောင် ပြန်လည်စီစဉ်ထားပါတယ်။

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

- Geometry၊ vertex၊ face/triangle နဲ့ attribute တို့ရဲ့ ဆက်နွယ်မှုကို ရှင်းပြနိုင်မယ်
- Built-in geometry တစ်ခုကို သင့်တော်တဲ့ parameters နဲ့ ဖန်တီးနိုင်မယ်
- Segments တိုးခြင်းရဲ့ quality/performance trade-off ကို နားလည်မယ်
- `BufferGeometry`၊ `Float32Array` နဲ့ `BufferAttribute` သုံးပြီး custom triangle ဖန်တီးနိုင်မယ်
- Wireframe နဲ့ geometry structure ကို debug လုပ်နိုင်မယ်

---

## ၁။ Geometry ဆိုတာ ဘာလဲ

`Mesh` တစ်ခုမှာ အဓိကအစိတ်အပိုင်းနှစ်ခု ရှိပါတယ်။

```text
Mesh = Geometry (ပုံသဏ္ဌာန်) + Material (မျက်နှာပြင်ရုပ်ထွက်)
```

Geometry က 3D space ထဲရှိ points များဖြစ်တဲ့ **vertices** နဲ့ အဲဒီ points တွေကို ဆက်ပြီးဖွဲ့ထားတဲ့ triangles များကို သိမ်းထားပါတယ်။ GPU က triangles ကို အခြေခံပြီး screen ပေါ် pixels များအဖြစ် render လုပ်ပါတယ်။

Geometry attributes အများသုံးများ—

| Attribute | အဓိပ္ပာယ် |
| --- | --- |
| `position` | Vertex တစ်ခုချင်းရဲ့ X/Y/Z coordinate |
| `normal` | မျက်နှာပြင်ဘယ်ဘက်ကို မျက်နှာမူသလဲ |
| `uv` | 2D texture ကို 3D surface ပေါ် ဘယ်လိုကပ်မလဲ |
| `color` | Vertex တစ်ခုချင်းရဲ့ အရောင် |

---

## ၂။ Built-in geometries

Three.js မှာ အဆင်သင့် geometry classes များ ရှိပါတယ်။

- `BoxGeometry`
- `PlaneGeometry`
- `CircleGeometry` / `RingGeometry`
- `SphereGeometry`
- `ConeGeometry` / `CylinderGeometry`
- `TorusGeometry` / `TorusKnotGeometry`
- `ShapeGeometry` / `ExtrudeGeometry`
- `TubeGeometry`

```js
const geometry = new THREE.BoxGeometry(1, 1, 1)
```

`BoxGeometry` ရဲ့ ပထမသုံးခုက width၊ height၊ depth ဖြစ်ပြီး နောက်သုံးခုက axis တစ်ခုချင်းစီရဲ့ segments ဖြစ်ပါတယ်။

```js
const geometry = new THREE.BoxGeometry(
    1, 1, 1, // width, height, depth
    2, 2, 2  // widthSegments, heightSegments, depthSegments
)
```

### Segments များရင် ဘာဖြစ်မလဲ

Segments တိုးရင် vertices နဲ့ triangles ပိုများလာပါတယ်။ Sphere လို အဝိုင်းပုံစံက ပိုချောလာပေမယ့် GPU က process လုပ်ရမယ့် data တိုးပါတယ်။ Box ကတော့ displacement သို့မဟုတ် vertex deformation မလုပ်ဘူးဆို အပို segments မလိုတတ်ပါဘူး။

```js
const sphere = new THREE.SphereGeometry(1, 32, 32)
```

လိုအပ်တဲ့ quality ရောက်ရင် segments ဆက်မတိုးတာက performance အတွက် ပိုကောင်းပါတယ်။

---

## ၃။ Wireframe နဲ့ structure ကြည့်ခြင်း

Material ကို wireframe ပြောင်းရင် triangles ရဲ့ edges ကို မြင်နိုင်ပါတယ်။

```js
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})
```

Wireframe က final design မဟုတ်ပေမယ့် geometry density၊ topology နဲ့ unexpected faces များကို debug လုပ်ဖို့ အသုံးဝင်ပါတယ်။

---

## ၄။ Custom BufferGeometry

Built-in shape မလုံလောက်ရင် ကိုယ်ပိုင် vertex data နဲ့ geometry ဖန်တီးနိုင်ပါတယ်။ အနည်းဆုံး triangle တစ်ခုအတွက် vertices သုံးခု လိုပါတယ်။ Vertex တစ်ခုမှာ X/Y/Z values သုံးခု ရှိလို့ စုစုပေါင်း number ကိုးခု လိုပါတယ်။

```js
const geometry = new THREE.BufferGeometry()

const positionsArray = new Float32Array([
    0, 0, 0, // vertex 1
    0, 1, 0, // vertex 2
    1, 0, 0  // vertex 3
])
```

`Float32Array` က တန်ဖိုးအားလုံးကို 32-bit floating-point format တစ်မျိုးတည်းနဲ့ memory ထဲ အစဉ်လိုက်သိမ်းပေးပါတယ်။ GPU buffer ဆီ ထိရောက်စွာ ပို့နိုင်တာကြောင့် သုံးတာပါ။

### BufferAttribute ဖန်တီးခြင်း

```js
const positionsAttribute = new THREE.BufferAttribute(
    positionsArray,
    3
)
```

ဒုတိယ parameter `3` က vertex တစ်ခုလျှင် values သုံးခု—X၊ Y၊ Z—ဖတ်ရမယ်ဆိုတဲ့ `itemSize` ဖြစ်ပါတယ်။

```js
geometry.setAttribute('position', positionsAttribute)
```

အခု geometry ကို material နဲ့ ပေါင်းပြီး scene ထဲထည့်နိုင်ပါပြီ။

```js
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

Triangle vertices အစီအစဉ်က face orientation ကို သက်ရောက်စေပါတယ်။ Camera ဘက်က မမြင်ရရင် vertex winding order သို့မဟုတ် material side ကို စစ်ပါ။ Learning/debug အတွက် `DoubleSide` သုံးနိုင်ပေမယ့် production မှာ လိုအပ်မှသာ သုံးပါ။

---

## ၅။ Random triangles ဖန်တီးခြင်း

Triangle 50 ခုအတွက် vertices `50 × 3` နဲ့ coordinate values `50 × 3 × 3` လိုပါတယ်။

```js
const count = 50
const positions = new Float32Array(count * 3 * 3)

for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 4
}

const geometry = new THREE.BufferGeometry()
geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)
```

ဒီနည်းက particles၊ procedural terrain နဲ့ custom shapes များအတွက် အခြေခံဖြစ်ပါတယ်။ Lighting material သုံးမယ်ဆို normals လိုနိုင်ပြီး geometry ဖန်တီးပြီးနောက် `geometry.computeVertexNormals()` သုံးနိုင်ပါတယ်။

---

## ၆။ Index ဆိုတာ ဘာလဲ

Triangle နှစ်ခုက vertex တစ်ခုတည်းကို share လုပ်နိုင်ပါတယ်။ Vertex data ကို ထပ်ခါထပ်ခါ သိမ်းမယ့်အစား unique vertices စာရင်းတစ်ခုနဲ့ ဘယ် vertex များကို triangle တစ်ခုစီသုံးမလဲဆိုတဲ့ **index** စာရင်း ထားနိုင်ပါတယ်။

```js
geometry.setIndex([
    0, 1, 2,
    2, 1, 3
])
```

Indexed geometry က memory ကို လျှော့နိုင်ပေမယ့် custom attributes နဲ့ hard edges စီမံတဲ့အခါ structure ကို သေချာနားလည်ဖို့ လိုပါတယ်။ ဒီ Lesson မှာ concept သိထားရုံ လုံလောက်ပါတယ်။

---

## လက်တွေ့လေ့ကျင့်ခန်း

1. Lab မှာ Box၊ Sphere နဲ့ TorusKnot ကို wireframe ဖွင့်ပြီး triangles density နှိုင်းယှဉ်ပါ
2. Sphere segments ကို လျှော့ထားတဲ့ code တစ်ခုဖန်တီးပြီး အနားစောင်းလာပုံကို ကြည့်ပါ
3. Custom triangle ရဲ့ vertex တစ်ခုကို ပြောင်းပြီး shape ပြောင်းပုံကို စောင့်ကြည့်ပါ
4. Random triangles 10 ခုနဲ့ 100 ခုရဲ့ performance/data ကွာခြားမှုကို စဉ်းစားပါ

## ပြဿနာဖြေရှင်းရန်

- Geometry မပေါ်ရင် `position` attribute name နဲ့ itemSize `3` မှန်သလား စစ်ပါ
- Triangle ဘက်တစ်ဖက်က ပျောက်ရင် winding order နဲ့ material `side` ကို စစ်ပါ
- Lighting မမှန်ရင် normals ရှိသလား သို့မဟုတ် `computeVertexNormals()` လိုသလား စစ်ပါ
- Geometry အစားထိုးတိုင်း ဟောင်းတာကို `geometry.dispose()` လုပ်ပြီး GPU memory လွှတ်ပါ

## အနှစ်ချုပ်

```js
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array([
    0, 0, 0,
    0, 1, 0,
    1, 0, 0
])
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
```

Geometry ကို vertices နဲ့ attributes အဖြစ် နားလည်သွားရင် Three.js ရဲ့ built-in shapes ကိုသာမက ကိုယ်ပိုင် procedural 3D forms များကိုပါ ဖန်တီးနိုင်မယ့် အခြေခံရသွားပါပြီ။
