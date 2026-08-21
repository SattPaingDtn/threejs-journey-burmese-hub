# Lesson 11 — Materials (မျက်နှာပြင်ရုပ်ထွက်နှင့် PBR)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: Materials](https://threejs-journey.com/lessons/materials)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤ guide** — Three.js material အမျိုးအစားများ၊ အလင်းလိုအပ်မှုနဲ့ PBR properties ကို မြန်မာလို နှိုင်းယှဉ်လေ့လာနိုင်အောင် စီစဉ်ထားပါတယ်။

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

- Geometry နဲ့ material တာဝန်ကို ခွဲနိုင်မယ်
- Basic၊ Normal၊ Matcap၊ Depth၊ Lambert၊ Phong၊ Toon၊ Standard နဲ့ Physical materials ကို ရွေးနိုင်မယ်
- Transparency၊ side နဲ့ wireframe properties ကို သုံးနိုင်မယ်
- Roughness/metalness PBR workflow ကို နားလည်မယ်
- Lighting နဲ့ material ဆက်နွယ်မှုကို debug လုပ်နိုင်မယ်

---

## ၁။ Scene ပြင်ဆင်ခြင်း

Material တစ်ခုရဲ့ ရုပ်ထွက်ကို ပုံသဏ္ဌာန်မတူတဲ့ objects များပေါ် နှိုင်းယှဉ်ရင် ပိုနားလည်လွယ်ပါတယ်။

```js
const material = new THREE.MeshBasicMaterial()

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)
```

Objects များကို ဖြည်းဖြည်းလှည့်ထားရင် highlight နဲ့ normals ပြောင်းပုံကို ပိုမြင်ရပါတယ်။

---

## ၂။ MeshBasicMaterial

Light calculation မလုပ်ဘဲ color/texture ကို တိုက်ရိုက်ပြပါတယ်။ UI-like objects၊ flat style နဲ့ debugging အတွက် သင့်တော်ပါတယ်။

```js
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    map: colorTexture
})
```

အသုံးများတဲ့ properties—

```js
material.wireframe = true
material.transparent = true
material.opacity = 0.5
material.alphaMap = alphaTexture
material.side = THREE.DoubleSide
```

`opacity < 1` သုံးရင် `transparent = true` လုပ်ရပါတယ်။ `DoubleSide` က faces နှစ်ဘက် render လုပ်လို့ cost တိုးနိုင်သဖြင့် လိုမှသုံးပါ။

---

## ၃။ Light မလိုသော special materials

### MeshNormalMaterial

Normal direction ကို RGB အရောင်အဖြစ် ပြပါတယ်။ Texture/light မလိုဘဲ geometry orientation ကို debug လုပ်ဖို့ ကောင်းပါတယ်။

```js
const material = new THREE.MeshNormalMaterial()
material.flatShading = true
```

### MeshMatcapMaterial

Matcap image တစ်ပုံထဲမှာ lighting/shading look ပါပြီးသားဖြစ်ပါတယ်။ Scene lights မလိုဘဲ stylized result မြန်မြန်ရနိုင်ပါတယ်။ Camera-relative shading ဖြစ်တာကြောင့် physically correct lighting မဟုတ်ပါဘူး။

```js
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})
```

### MeshDepthMaterial

Camera နဲ့ အကွာအဝေးအလိုက် depth ကို grayscale ဆန်ဆန် ပြပါတယ်။ Depth effects နဲ့ rendering techniques များမှာ အသုံးဝင်ပါတယ်။

---

## ၄။ Light ကို တုံ့ပြန်သော classic materials

### MeshLambertMaterial

Diffuse lighting အခြေခံပြီး matte surface အတွက် သင့်တော်ပါတယ်။ Phong/Standard ထက် ရိုးရှင်းပေမယ့် real-time light calculation လိုပါတယ်။

### MeshPhongMaterial

Diffuse နဲ့ shiny specular highlight ပါပါတယ်။

```js
const material = new THREE.MeshPhongMaterial({
    color: 0x38bdf8,
    shininess: 100,
    specular: 0x1188ff
})
```

### MeshToonMaterial

Lighting ကို အဆင့်လိုက် band များအဖြစ် ပြပြီး cartoon style ရစေပါတယ်။ Gradient texture ကို nearest filter နဲ့သုံးရင် band edges ထင်ရှားပါတယ်။

```js
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const material = new THREE.MeshToonMaterial({
    gradientMap: gradientTexture
})
```

ဒီ materials များ မည်းနေရင် light မထည့်ထားတာ ဖြစ်နိုင်ပါတယ်။

```js
scene.add(new THREE.AmbientLight(0xffffff, 1))

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)
```

---

## ၅။ MeshStandardMaterial — PBR အခြေခံ

Standard material က Physically Based Rendering (PBR) workflow ကို သုံးပြီး realistic asset pipelines နဲ့ အဆင်ပြေပါတယ်။

```js
const material = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.35,
    roughness: 0.45
})
```

### Metalness

- `0` — သစ်သား၊ ပလတ်စတစ်၊ ကျောက်လို non-metal
- `1` — သံ၊ ကြေး၊ ရွှေလို metal
- Real-world surface အများစုကို 0 သို့မဟုတ် 1 နီးနီးသုံးပြီး texture က transition ကို ထိန်းတတ်ပါတယ်

### Roughness

- `0` — ချောပြီး sharp reflection
- `1` — ကြမ်းပြီး reflection ပြန့်နှံ့

အောက်ပါ maps များနဲ့ တွဲသုံးနိုင်ပါတယ်။

```js
material.map = colorTexture
material.aoMap = ambientOcclusionTexture
material.normalMap = normalTexture
material.metalnessMap = metalnessTexture
material.roughnessMap = roughnessTexture
```

Environment map ပါရင် metal surface ရဲ့ reflection ကို ပိုနားလည်လွယ်ပါတယ်။

---

## ၆။ MeshPhysicalMaterial

`MeshStandardMaterial` ကို တိုးချဲ့ထားပြီး advanced physical effects များ ထပ်ပေးပါတယ်။

- `clearcoat` / `clearcoatRoughness` — ကားဆေးလို အပေါ်ယံအလွှာ
- `transmission` / `thickness` — ဖန်လို အလင်းဖြတ်သန်းမှု
- `ior` — index of refraction
- `sheen` — အဝတ်သားလို soft highlight
- `iridescence` — ဆပ်ပြာပူဖောင်း/ဆီအလွှာလို အရောင်ပြောင်းမှု

```js
const glass = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    thickness: 0.5,
    roughness: 0.1,
    ior: 1.5
})
```

Physical features များက render cost ပိုရှိနိုင်တာကြောင့် လိုအပ်တဲ့အရာကိုသာ ဖွင့်ပါ။

---

## ၇။ Material ရွေးချယ်ရန် shortcut

| လိုချင်တဲ့ရလဒ် | Material |
| --- | --- |
| Light မလိုတဲ့ flat color/texture | `MeshBasicMaterial` |
| Normals debug | `MeshNormalMaterial` |
| Stylized baked lighting | `MeshMatcapMaterial` |
| ရိုးရှင်း matte lighting | `MeshLambertMaterial` |
| Classic shiny highlight | `MeshPhongMaterial` |
| Cartoon bands | `MeshToonMaterial` |
| General realistic PBR | `MeshStandardMaterial` |
| Glass/clearcoat/sheen | `MeshPhysicalMaterial` |

---

## လက်တွေ့လေ့ကျင့်ခန်း

1. Lab အလယ် sphere ရဲ့ roughness ကို 0 နဲ့ 1 ပြောင်းပါ
2. Metalness ကို 0 နဲ့ 1 ပြောင်းပြီး light response နှိုင်းယှဉ်ပါ
3. Basic material နဲ့ Standard material ကို light ပိတ်ပြီး နှိုင်းယှဉ်ပါ
4. Material တစ်ခုကို geometry သုံးမျိုးပေါ် share လုပ်ပြီး property ပြောင်းတဲ့အခါ အားလုံးပြောင်းပုံကြည့်ပါ

## ပြဿနာဖြေရှင်းရန်

- Material မည်းနေရင် light-reactive material ဖြစ်ပြီး scene မှာ light ရှိသလား စစ်ပါ
- Alpha မအလုပ်လုပ်ရင် `transparent` နဲ့ `alphaMap`/`opacity` ကို စစ်ပါ
- Normal map ထူးဆန်းရင် correct color space နဲ့ normal orientation ကို စစ်ပါ
- Material အစားထိုးတိုင်း ဟောင်းတာကို `material.dispose()` လုပ်ပါ

Material ကို မှန်ကန်စွာ ရွေးချယ်ခြင်းက look တင်မက lighting complexity နဲ့ performance ကိုပါ သက်ရောက်စေပါတယ်။
