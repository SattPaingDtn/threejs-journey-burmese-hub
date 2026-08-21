# Lesson 10 — Textures (ပုံများကို 3D မျက်နှာပြင်ပေါ် တင်ခြင်း)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: Textures](https://threejs-journey.com/lessons/textures)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤ guide** — Texture loading၊ UV၊ transformations၊ filters နဲ့ optimization ကို မြန်မာလို စနစ်တကျ လေ့လာနိုင်အောင် ရှင်းပြထားပါတယ်။

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

- Color၊ alpha၊ normal၊ roughness စတဲ့ texture map အမျိုးအစားများကို ခွဲနိုင်မယ်
- `TextureLoader` နဲ့ `LoadingManager` သုံးနိုင်မယ်
- UV coordinates က texture ကို geometry ပေါ် ဘယ်လိုကပ်သလဲ နားလည်မယ်
- Repeat၊ offset၊ rotation နဲ့ wrapping ကို ပြောင်းနိုင်မယ်
- Minification၊ magnification နဲ့ mipmaps အတွက် filter မှန်ကန်စွာ ရွေးနိုင်မယ်
- Texture resolution၊ format နဲ့ color space ကို performance နဲ့ကိုက်ညီအောင် စီမံနိုင်မယ်

---

## ၁။ Texture ဆိုတာ ဘာလဲ

Texture ဟာ geometry မျက်နှာပြင်ပေါ် အသုံးပြုတဲ့ image data ဖြစ်ပါတယ်။ ပုံတစ်ပုံကို အရောင်အဖြစ်သုံးတာတင်မက material properties များကို နေရာအလိုက်ထိန်းဖို့လည်း သုံးပါတယ်။

| Map | အလုပ် |
| --- | --- |
| Color / Albedo | မျက်နှာပြင်အရောင် |
| Alpha | ပွင့်လင်း/မပွင့်လင်း နေရာ |
| Height / Displacement | Vertices ကို အမြင့်အနိမ့် ရွှေ့ခြင်း |
| Normal | အလင်းထိပုံအသေးစိတ်ကို normals အဖြစ် အတုဖန်တီးခြင်း |
| Ambient Occlusion | အပေါက်/ထောင့်နေရာများကို မှောင်စေခြင်း |
| Metalness | သတ္တု/မသတ္တု နေရာများ |
| Roughness | ချော/ကြမ်း ရောင်ပြန်မှု |

Map အားလုံးကို material တိုင်း မသုံးနိုင်ပါဘူး။ Lesson 11 မှာ material တစ်မျိုးချင်းနဲ့ တွဲသုံးပုံကို လေ့လာပါမယ်။

---

## ၂။ Native image နဲ့ texture ဖန်တီးခြင်း

Browser `Image` ကို ကိုယ်တိုင် load လုပ်နိုင်ပါတယ်။

```js
const image = new Image()
const texture = new THREE.Texture(image)

image.addEventListener('load', () => {
    texture.needsUpdate = true
})

image.src = '/textures/door/color.jpg'
```

Image load ပြီးမှ GPU ဆီ data အသစ်ပို့ဖို့ `needsUpdate = true` လုပ်ရပါတယ်။ ဒါပေမယ့် ပုံမှန် project မှာ `TextureLoader` က ပိုလွယ်ပါတယ်။

---

## ၃။ TextureLoader

```js
const textureLoader = new THREE.TextureLoader()

const colorTexture = textureLoader.load(
    '/textures/door/color.jpg'
)
```

Color image တွေကို correct color space နဲ့ ဖော်ပြဖို့—

```js
colorTexture.colorSpace = THREE.SRGBColorSpace
```

Normal၊ roughness၊ metalness နဲ့ height maps က color data မဟုတ်ဘဲ numeric data ဖြစ်လို့ ပုံမှန်အားဖြင့် sRGB မသတ်မှတ်ပါဘူး။

```js
const material = new THREE.MeshBasicMaterial({
    map: colorTexture
})
```

---

## ၄။ LoadingManager

Texture အများကြီး load လုပ်ရင် overall progress နဲ့ error state ကို `LoadingManager` တစ်ခုက စီမံပေးနိုင်ပါတယ်။

```js
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => console.log('loading started')
loadingManager.onProgress = (url, loaded, total) => {
    console.log(loaded, '/', total)
}
loadingManager.onLoad = () => console.log('all assets loaded')
loadingManager.onError = (url) => console.error('failed:', url)

const textureLoader = new THREE.TextureLoader(loadingManager)
```

နောက်ပိုင်း loading screen/progress bar ဖန်တီးတဲ့အခါ ဒီ callbacks များ အသုံးဝင်ပါတယ်။

---

## ၅။ UV coordinates

UV က 2D texture ရဲ့ coordinate system ဖြစ်ပါတယ်။ `u` က horizontal၊ `v` က vertical ကို ကိုယ်စားပြုပြီး အများအားဖြင့် `0` မှ `1` ကြား values သုံးပါတယ်။

```js
console.log(geometry.attributes.uv)
```

Built-in geometries မှာ UV ပါပြီးသားဖြစ်ပါတယ်။ Blender model များမှာ UV unwrapping လုပ်ပြီးမှ export လုပ်ရတတ်ပါတယ်။ Custom `BufferGeometry` မှာ texture သုံးချင်ရင် `uv` attribute ကို ကိုယ်တိုင်ထည့်ရပါမယ်။

---

## ၆။ Texture transformation

### Repeat နဲ့ wrapping

```js
colorTexture.repeat.set(2, 3)
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
```

Wrapping မပြောင်းဘဲ repeat တိုးရင် texture edge pixels ကို ဆွဲဆန့်ထားသလို ဖြစ်နိုင်ပါတယ်။ Alternatives အဖြစ် `MirroredRepeatWrapping` သုံးနိုင်ပါတယ်။

### Offset

```js
colorTexture.offset.set(0.5, 0.5)
```

### Rotation နဲ့ center

```js
colorTexture.center.set(0.5, 0.5)
colorTexture.rotation = Math.PI * 0.25
```

Default rotation center က corner ဖြစ်လို့ center ပတ်လည်လှည့်ချင်ရင် `(0.5, 0.5)` သတ်မှတ်ပါ။

---

## ၇။ Magnification၊ minification နဲ့ mipmaps

Texture ကို မူလ pixel ထက် screen ပေါ် ကြီးအောင်ပြတဲ့အခါ **magnification**၊ သေးအောင်ပြတဲ့အခါ **minification** ဖြစ်ပါတယ်။

### Pixel art

```js
colorTexture.magFilter = THREE.NearestFilter
colorTexture.minFilter = THREE.NearestFilter
colorTexture.generateMipmaps = false
```

Nearest filter က pixels ကို ရောမပစ်လို့ pixel art အနားသတ် ထင်ရှားပါတယ်။ Mipmap မလိုတဲ့ filter သုံးထားရင် mipmaps ပိတ်ပြီး memory လျှော့နိုင်ပါတယ်။

### Photo/realistic texture

Default linear/mipmap filtering က အဝေးနဲ့ angle စောင်းကြည့်ချိန်မှာ ပိုချောပါတယ်။ Renderer နဲ့ platform အလိုက် anisotropy လည်း texture quality ကို ကူညီနိုင်ပါတယ်။

```js
colorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
```

Max value ကို texture တိုင်း မလိုအပ်ဘဲ ground/road လို angle စောင်းကြည့်ရတဲ့ texture များမှာသာ သင့်တော်သလိုသုံးပါ။

---

## ၈။ Format နဲ့ optimization

Texture က download size သာမက GPU memory ကိုလည်း သုံးပါတယ်။ Compressed file တစ်ပုံ GPU memory ထဲ decode လုပ်ပြီးနောက် အရွယ်ပိုကြီးနိုင်ပါတယ်။

- Resolution ကို အသုံးပြုမယ့် screen size ထက် မလိုအပ်ဘဲ မကြီးစေပါနဲ့
- Mipmaps သုံးမယ်ဆို power-of-two dimensions (`512×512`, `1024×1024`) က compatibility အတွက် အဆင်ပြေတတ်ပါတယ်
- JPEG — alpha မလိုတဲ့ photo/color map
- PNG — transparency သို့မဟုတ် sharp graphics
- WebP/AVIF — browser support ကိုစစ်ပြီး file size လျှော့နိုင်
- KTX2/Basis — advanced GPU-compressed texture workflow

Normal/roughness maps မှာ မျက်စိမမြင်နိုင်လောက်တဲ့ compression artifacts က lighting ကို ထိခိုက်နိုင်လို့ quality ကို စမ်းသပ်ပါ။

---

## Complete example

```js
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/textures/door/color.jpg')
colorTexture.colorSpace = THREE.SRGBColorSpace
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
colorTexture.repeat.set(2, 2)

const material = new THREE.MeshBasicMaterial({
    map: colorTexture
})
```

## လက်တွေ့လေ့ကျင့်ခန်း

1. Lab မှာ Nearest နဲ့ Linear filter နှိုင်းယှဉ်ပါ
2. Repeat ကို X=2၊ Y=3 လုပ်ပြီး wrapping မပြောင်းခင်/ပြောင်းပြီး ကွာခြားမှုကြည့်ပါ
3. Rotation center မသတ်မှတ်ဘဲ လှည့်ပြီး `(0.5, 0.5)` သတ်မှတ်ကာ ပြန်နှိုင်းယှဉ်ပါ
4. Color texture မှာ sRGB ပိတ်/ဖွင့်ပြီး အရောင်ကွာခြားမှုကို စစ်ပါ

## ပြဿနာဖြေရှင်းရန်

- Texture မပေါ်ရင် path နဲ့ Network/Console error စစ်ပါ
- အရောင်မှောင်/မမှန်ရင် color texture ရဲ့ `colorSpace` စစ်ပါ
- Pixel art ဝါးနေရင် `NearestFilter` သုံးပါ
- Texture ဆွဲဆန့်နေရင် geometry UV နဲ့ aspect ratio ကို စစ်ပါ
- Texture အစားထိုးချိန် `texture.dispose()` လုပ်ပြီး GPU memory လွှတ်ပါ

Texture workflow ကို နားလည်သွားရင် geometry တစ်ခုတည်းကို သစ်သား၊ သတ္တု၊ ကျောက် သို့မဟုတ် stylized surface အဖြစ် ပြောင်းနိုင်ပါပြီ။
