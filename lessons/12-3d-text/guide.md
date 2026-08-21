# Lesson 12 — 3D Text (FontLoader၊ TextGeometry နှင့် Matcap)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: 3D Text](https://threejs-journey.com/lessons/3d-text)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤ guide** — Typeface font ကို load လုပ်ပြီး centered၊ beveled 3D text ဖန်တီးခြင်းနဲ့ scene optimization ကို မြန်မာလို ရှင်းပြထားပါတယ်။

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

- Typeface JSON font နဲ့ ပုံမှန် web font ကွာခြားချက်ကို နားလည်မယ်
- `FontLoader` နဲ့ font data load လုပ်နိုင်မယ်
- `TextGeometry` parameters များကို ထိန်းနိုင်မယ်
- Bounding box နဲ့ `center()` ကို အသုံးပြုနိုင်မယ်
- Matcap material နဲ့ light မလိုတဲ့ stylized text ဖန်တီးနိုင်မယ်
- Geometry/material share လုပ်ပြီး scene performance တိုးတက်စေနိုင်မယ်

---

## ၁။ Typeface font ဆိုတာ ဘာလဲ

`TextGeometry` က စာလုံး outline/shape data လိုပါတယ်။ `.woff` သို့မဟုတ် `.ttf` web font ကို တိုက်ရိုက်မသုံးဘဲ Three.js ဖတ်နိုင်တဲ့ **typeface JSON** format ကို အသုံးများပါတယ်။

Three.js package ထဲမှာ sample fonts များ ပါတတ်ပါတယ်။ ကိုယ်ပိုင် font သုံးမယ်ဆို licensing ကို စစ်ပြီး typeface JSON အဖြစ် ပြောင်းရပါတယ်။

```text
public/
└── fonts/
    └── helvetiker_regular.typeface.json
```

`public`/static folder ထဲက file ကို browser URL မှာ `/fonts/...` နဲ့ load လုပ်နိုင်ပါတယ်။

---

## ၂။ Addons များ import လုပ်ခြင်း

`FontLoader` နဲ့ `TextGeometry` က Three.js core import ထဲ မပါဘဲ addons/examples modules ဖြစ်ပါတယ်။

```js
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
```

Project version အဟောင်းတွင် `three/examples/jsm/...` path ကို တွေ့နိုင်ပါတယ်။ Install ထားတဲ့ Three.js version နဲ့ကိုက်ညီတဲ့ style တစ်မျိုးကို တသမတ်တည်းသုံးပါ။

---

## ၃။ Font load လုပ်ခြင်း

```js
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        console.log('font loaded', font)
    },
    undefined,
    (error) => {
        console.error('font failed', error)
    }
)
```

Font load က asynchronous ဖြစ်လို့ `TextGeometry` ကို success callback အတွင်းမှ ဖန်တီးရပါတယ်။ မဟုတ်ရင် font မရသေးခင် geometry ဖန်တီးမိနိုင်ပါတယ်။

---

## ၄။ TextGeometry ဖန်တီးခြင်း

```js
const textGeometry = new TextGeometry(
    'Hello Three.js',
    {
        font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    }
)
```

| Parameter | အလုပ် |
| --- | --- |
| `font` | Loaded typeface font |
| `size` | စာလုံးအမြင့် |
| `depth` | ရှေ့မှနောက် extrusion အထူ |
| `curveSegments` | Curve ချောမွေ့မှု |
| `bevelEnabled` | အနား bevel ဖွင့်/ပိတ် |
| `bevelThickness` | Bevel ရဲ့ depth |
| `bevelSize` | Outline မှ bevel အရွယ် |
| `bevelSegments` | Bevel ချောမွေ့မှု |

Segments များလွန်းရင် geometry vertices အများကြီး ဖြစ်နိုင်ပါတယ်။ Screen ပေါ်မြင်ရတဲ့ quality ထက် မလိုအပ်ဘဲ မတိုးပါနဲ့။

```js
const textMaterial = new THREE.MeshBasicMaterial({
    wireframe: true
})

const text = new THREE.Mesh(textGeometry, textMaterial)
scene.add(text)
```

Wireframe နဲ့ စတင်ကြည့်ရင် depth၊ curves နဲ့ bevel segments ကို မျက်မြင်လေ့လာနိုင်ပါတယ်။

---

## ၅။ Text ကို center ချခြင်း

TextGeometry origin က စာကြောင်းရဲ့ center မဟုတ်တတ်ပါဘူး။ Bounding box ကိုတွက်ပြီး position ကို manually ချိန်နိုင်ပါတယ်။

```js
textGeometry.computeBoundingBox()
console.log(textGeometry.boundingBox)
```

Bounding box က `min` နဲ့ `max` vectors နှစ်ခုဖြင့် geometry ရဲ့ အပြင်ဘောင်ကို ဖော်ပြပါတယ်။ Manual translate လုပ်နိုင်ပေမယ့် Three.js မှာ shortcut ရှိပါတယ်။

```js
textGeometry.center()
```

Center လုပ်ပြီးရင် mesh position `(0, 0, 0)` မှာ စာသားအလယ် scene origin နဲ့ ကိုက်လာပါတယ်။ OrbitControls target၊ rotation နဲ့ camera framing ပိုလွယ်သွားပါတယ်။

---

## ၆။ Matcap material

Matcap texture ထဲမှာ lighting look ပါပြီးသားဖြစ်လို့ scene light မထည့်ဘဲ 3D shape ကို ထင်ရှားစေပါတယ်။

```js
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})

const text = new THREE.Mesh(textGeometry, material)
scene.add(text)
```

Matcap က camera orientation နဲ့ ဆက်နွယ်တဲ့ stylized shading ဖြစ်လို့ physically accurate environment lighting မဟုတ်ပါဘူး။ Title/logo experiments များအတွက် မြန်ပြီးလှပပါတယ်။

---

## ၇။ Donuts များထည့်ပြီး optimize လုပ်ခြင်း

Lesson project မှာ text ပတ်လည် random torus objects များ ထည့်ပါတယ်။ Geometry နဲ့ material ကို loop အတွင်းအကြိမ်တိုင်း အသစ်မဖန်တီးဘဲ အပြင်မှာ တစ်ကြိမ်ဖန်တီးပြီး share လုပ်ပါ။

```js
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material)

    donut.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    )

    donut.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
    )

    const scale = Math.random()
    donut.scale.setScalar(scale)
    scene.add(donut)
}
```

Objects အရေအတွက် အလွန်များလာရင် shared resources ထက်တောင် draw calls များလာနိုင်ပါတယ်။ နောက်ပိုင်း `InstancedMesh` လို နည်းလမ်းများကို သုံးနိုင်ပါတယ်။

---

## ၈။ Burmese text သုံးရန် သတိထားစရာ

Font JSON ထဲမှာ မြန်မာ glyph outlines မပါရင် Burmese စာလုံး မပေါ်နိုင်ပါဘူး။ Myanmar Unicode glyphs ပါတဲ့ font ကို တရားဝင်အသုံးပြုခွင့်နှင့်အတူ typeface JSON ပြောင်းရပါမယ်။ Complex script shaping က `TextGeometry` တစ်ခုတည်းနဲ့ မပြည့်စုံနိုင်တဲ့အခါ HTML/CSS overlay၊ canvas-generated texture သို့မဟုတ် shaping-capable text solution ကို စဉ်းစားပါ။

---

## လက်တွေ့လေ့ကျင့်ခန်း

1. Lab ထဲက text color ကို ပြောင်းပြီး material update ကို ကြည့်ပါ
2. `geometry.center()` ကို ဖယ်ပြီး origin ကွာခြားပုံကို စမ်းပါ
3. Bevel ဖွင့်/ပိတ်ပြီး silhouette နဲ့ vertex count ကွာခြားမှုကို စဉ်းစားပါ
4. Donut geometry/material ကို loop အပြင်နဲ့ အတွင်းမှာ ဖန်တီးတဲ့နည်းနှစ်မျိုးကို နှိုင်းယှဉ်ပါ

## ပြဿနာဖြေရှင်းရန်

- Text မပေါ်ရင် font URL၊ Network error နဲ့ callback အတွင်း geometry ဖန်တီးထားမှုကို စစ်ပါ
- Import error ရင် Three.js version နဲ့ addons path ကို စစ်ပါ
- Text center မကျရင် geometry ဖန်တီးပြီးနောက် `center()` ခေါ်ပါ
- Burmese glyph ပျောက်ရင် font data ထဲ Myanmar Unicode characters ပါသလား စစ်ပါ
- Scene နှေးရင် curve/bevel segments နဲ့ object count လျှော့ပါ

Font data၊ geometry နဲ့ material သုံးခုကို ပေါင်းစပ်သွားရင် 3D title၊ logo နဲ့ typographic scene များ ဖန်တီးနိုင်ပါပြီ။
