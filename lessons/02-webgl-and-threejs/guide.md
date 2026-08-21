# Lesson 02 — WebGL ဆိုတာဘာလဲ၊ Three.js ကို ဘာကြောင့်သုံးတာလဲ

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: What is WebGL and why use Three.js](https://threejs-journey.com/lessons/what-is-webgl-and-why-use-three-js)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤစာမျက်နှာအကြောင်း** — မူရင်းသင်ခန်းစာ၏ အဓိကအကြောင်းအရာများကို မြန်မာဘာသာဖြင့် နားလည်လွယ်စေရန် ပြန်လည်စီစဉ်ရှင်းပြထားသော လေ့လာရေးအကူအညီဖြစ်သည်။ Video နှင့် course resources များအတွက် မူရင်းသင်ခန်းစာကို တွဲဖက်အသုံးပြုပါ။

---

## ဒီသင်ခန်းစာပြီးရင် ဘာတွေ သိသွားမလဲ

ဒီ Lesson မှာ code အများကြီး မရေးသေးပါဘူး။ Three.js ရဲ့အောက်မှာ ဘာတွေ အလုပ်လုပ်နေသလဲဆိုတာကို အရင်မြင်အောင် လေ့လာမှာပါ။

- WebGL ဆိုတာ ဘာလဲ
- 3D model တွေကို triangle များနဲ့ ဘာကြောင့်တည်ဆောက်သလဲ
- GPU က vertex နဲ့ fragment တွေကို ဘယ်လို အပြိုင်တွက်ချက်သလဲ
- Shader နဲ့ matrix တွေက ဘာအလုပ်လုပ်သလဲ
- Native WebGL က ဘာကြောင့် ခက်ခဲသလဲ
- Three.js က WebGL ကို ဘယ်လို လွယ်ကူစေသလဲ

အောက်က ပုံစံတစ်ကြောင်းကို အရင်မှတ်ထားပါ။

```text
JavaScript code → Three.js → WebGL → GPU → Canvas ပေါ်က 3D ပုံရိပ်
```

---

## ၁။ Three.js ဆိုတာ ဘာလဲ

**Three.js** ဟာ web browser ထဲမှာ 3D experience များ ဖန်တီးနိုင်အောင် ကူညီပေးတဲ့ JavaScript library တစ်ခုပါ။ Scene၊ camera၊ geometry၊ material၊ light နဲ့ renderer လို နားလည်လွယ်တဲ့ object များကို အသုံးပြုပြီး 3D world တစ်ခု တည်ဆောက်နိုင်ပါတယ်။

Three.js က ပုံမှန်အားဖြင့် WebGL ကို အသုံးပြုပြီး render လုပ်ပါတယ်။ SVG သို့မဟုတ် CSS နဲ့ render လုပ်နိုင်တဲ့ နည်းလမ်းတချို့လည်း ရှိပေမယ့် စွမ်းဆောင်ရည်နဲ့ လုပ်ဆောင်နိုင်မှုက အကန့်အသတ်ရှိတာကြောင့် ဒီ course မှာ WebGL ကိုသာ အဓိကထားမှာပါ။

Three.js နဲ့ ဖန်တီးနိုင်တဲ့အရာတွေထဲမှာ—

- Interactive portfolio နဲ့ storytelling website
- 3D product viewer နဲ့ configurator
- Data visualization
- Browser game နဲ့ simulation
- Digital art နဲ့ virtual experience

တို့ ပါဝင်ပါတယ်။ ဒါပေမယ့် Three.js ရဲ့ တကယ့်အခန်းကဏ္ဍကို နားလည်ဖို့ အောက်ခြေက WebGL ကို အရင်သိရပါမယ်။

---

## ၂။ WebGL ဆိုတာ ဘာလဲ

**WebGL** ဟာ browser ထဲက `<canvas>` element ပေါ်မှာ graphics ရေးဆွဲနိုင်စေတဲ့ JavaScript API တစ်ခုပါ။ အရေးကြီးဆုံးအချက်က ပုံရိပ်တွက်ချက်မှုတွေကို computer ရဲ့ **GPU — Graphics Processing Unit** ဆီ ပို့ပြီး အလွန်မြန်မြန် လုပ်ဆောင်နိုင်ခြင်းဖြစ်ပါတယ်။

```html
<canvas class="webgl"></canvas>
```

WebGL က triangle တင်မကဘဲ point နဲ့ line များကိုလည်း ရေးဆွဲနိုင်ပါတယ်။ 2D experience များအတွက်လည်း အသုံးပြုနိုင်ပါတယ်။ ဒီ course မှာတော့ triangle များနဲ့ တည်ဆောက်ထားတဲ့ 3D experience ကို အဓိက လေ့လာမှာပါ။

### WebGL က plugin မဟုတ်ပါ

WebGL ကိုအသုံးပြုဖို့ Flash လို browser plugin တစ်ခု ထည့်စရာမလိုပါဘူး။ ခေတ်မီ browser အများစုမှာ browser ရဲ့အစိတ်အပိုင်းတစ်ခုအဖြစ် ပါဝင်ပြီးသားဖြစ်ပါတယ်။ JavaScript က WebGL API ကိုခေါ်ပြီး WebGL က GPU နဲ့ ဆက်သွယ်ပေးတာပါ။

---

## ၃။ 3D object တွေကို triangle နဲ့ တည်ဆောက်ပုံ

Screen ပေါ်မှာ ချောမွေ့တဲ့ sphere တစ်လုံး မြင်ရပေမယ့် GPU အတွက်တော့ triangle သေးသေးလေးတွေ အများကြီး စုထားတဲ့ ပုံသဏ္ဌာန်တစ်ခုပါ။ ကား၊ လူရုပ်၊ အဆောက်အအုံနဲ့ တောင်တန်းလို ရှုပ်ထွေးတဲ့ model တွေကိုလည်း triangle များနဲ့ ဖွဲ့စည်းနိုင်ပါတယ်။

```text
                   Vertex A
                      ●
                     / \
                    /   \
                   /     \
          Vertex B ●───────● Vertex C

             Vertex ၃ ခု = Triangle ၁ ခု
```

### Vertex နဲ့ triangle

- **Vertex** ဆိုတာ 3D space ထဲက အမှတ်တစ်ခုပါ။ အနည်းဆုံး `x`, `y`, `z` position ပါဝင်တယ်။
- Vertex သုံးခုကို ဆက်လိုက်ရင် **triangle** တစ်ခု ရလာတယ်။
- Triangle အများကြီး စုလိုက်ရင် 3D model ရဲ့ မျက်နှာပြင်ဖြစ်လာတယ်။

ဥပမာအားဖြင့် triangle ၁,၀၀၀ ပါတဲ့ model တစ်ခုကို စိတ်ကူးကြည့်ပါ။ ရိုးရှင်းအောင်ပြောရရင် GPU က triangle များရဲ့ vertex နေရာတွေကို တွက်ချက်ပြီးနောက် မြင်ရမယ့်မျက်နှာပြင်အတွင်းက အရောင်တွေကို ဆက်တွက်ရပါတယ်။ လက်တွေ့ geometry များမှာ vertex တစ်ခုကို triangle အများအပြားက မျှဝေသုံးနိုင်ပေမယ့် ဒီဥပမာက rendering အဆင့်တွေကို မြင်သာစေဖို့ ဖြစ်ပါတယ်။

---

## ၄။ GPU က ဘာကြောင့် မြန်တာလဲ

CPU နဲ့ GPU ဟာ ပြိုင်ဘက်တွေမဟုတ်ဘဲ မတူညီတဲ့အလုပ်အတွက် ဒီဇိုင်းလုပ်ထားတဲ့ အစိတ်အပိုင်းတွေပါ။

- **CPU** က application logic၊ JavaScript၊ file loading နဲ့ user event လို ရှုပ်ထွေးပြီး အမျိုးမျိုးကွဲပြားတဲ့အလုပ်တွေကို စီမံတယ်။
- **GPU** က vertex သို့မဟုတ် fragment အများကြီးအပေါ် တူညီတဲ့သင်္ချာတွက်ချက်မှုကို တစ်ပြိုင်နက် လုပ်ဖို့ အထူးကောင်းတယ်။

3D model တစ်ခု render လုပ်တဲ့အခါ vertex ထောင်ပေါင်းများစွာနဲ့ screen fragment သိန်းပေါင်းများစွာကို တွက်ရနိုင်ပါတယ်။ တွက်ချက်မှုတစ်ခုချင်းစီက ပုံစံတူတာကြောင့် GPU က အများအပြားကို **parallel — အပြိုင်** လုပ်ဆောင်နိုင်ပါတယ်။ ဒါက WebGL experience တွေ ချောမွေ့နိုင်တဲ့ အဓိကအကြောင်းရင်းတစ်ခုပါ။

> **ရိုးရှင်းတဲ့ mental model** — CPU က scene အတွက် ညွှန်ကြားချက်နဲ့ data ကို ပြင်ဆင်ပေးတယ်။ GPU က အဲဒီ data ကိုသုံးပြီး vertex နဲ့ fragment အများကြီးကို မြန်မြန်တွက်ပေးတယ်။

---

## ၅။ Rendering pipeline ကို အဆင့်လိုက်ကြည့်ခြင်း

3D model တစ်ခု canvas ပေါ်ရောက်လာတဲ့ လုပ်ငန်းစဉ်ကို အလွန်ရိုးရှင်းအောင် အောက်ပါအတိုင်း ခွဲကြည့်နိုင်ပါတယ်။

```text
Vertex data
    ↓
Vertex Shader — vertex တွေကို screen ဆီ နေရာပြောင်းပေးတယ်
    ↓
Rasterization — triangle ထဲက မြင်ရမယ့် fragment တွေ ဖော်ထုတ်တယ်
    ↓
Fragment Shader — fragment တစ်ခုချင်းစီရဲ့ အရောင်ကို ဆုံးဖြတ်တယ်
    ↓
Canvas ပေါ်က နောက်ဆုံးပုံရိပ်
```

### Vertex Shader

Vertex shader ဟာ vertex တစ်ခုချင်းစီရဲ့ နောက်ဆုံးတည်နေရာကို တွက်ပေးတဲ့ GPU program ပါ။ Object ရဲ့ position၊ rotation၊ scale၊ camera တည်နေရာနဲ့ perspective တို့ကို ထည့်တွက်ပြီး 3D coordinate ကို screen ပေါ်မှာ အသုံးပြုနိုင်တဲ့ coordinate အဖြစ် ပြောင်းပေးပါတယ်။

GPU က vertex အများကြီးအပေါ် vertex shader ကို အပြိုင် run နိုင်ပါတယ်။

### Rasterization

Vertex သုံးခုရဲ့ နေရာသတ်မှတ်ပြီးရင် အဲဒီ triangle က screen ရဲ့ ဘယ်အစိတ်အပိုင်းကို ဖုံးထားသလဲဆိုတာ ဆုံးဖြတ်ရပါတယ်။ ဒီအဆင့်ကို rasterization လို့ ခေါ်ပါတယ်။ Rasterizer က fragment shader ဆီပို့မယ့် fragment များကို ဖန်တီးပေးပါတယ်။

### Fragment Shader

Fragment shader ဟာ screen ပေါ်မှာ ရေးဆွဲမယ့် fragment တစ်ခုရဲ့ အရောင်ကို တွက်ပေးတဲ့ GPU program ပါ။ Texture၊ light၊ shadow၊ surface direction နဲ့ material properties စတဲ့ data တွေက နောက်ဆုံးအရောင်အပေါ် သက်ရောက်နိုင်ပါတယ်။

“Fragment” နဲ့ “pixel” ကို စတင်လေ့လာချိန်မှာ အနီးစပ်ဆုံးသဘောတရားအဖြစ် တွေးလို့ရပေမယ့် တကယ်တမ်း fragment တိုင်းက နောက်ဆုံး screen pixel ဖြစ်မယ်လို့ မဆိုလိုပါဘူး။ Depth testing နဲ့ blending လို အဆင့်တွေကြောင့် fragment တချို့ မပေါ်နိုင်ပါဘူး။

---

## ၆။ Matrix တွေက ဘာအတွက်လိုတာလဲ

Vertex ကို screen ပေါ်ရောက်အောင် position နံပါတ်သုံးခု ပြောင်းရုံတင် မလုံလောက်ပါဘူး။ Object ဘယ်နေရာမှာရှိသလဲ၊ camera က ဘယ်နေရာကကြည့်သလဲ၊ perspective ဘယ်လောက်ရှိသလဲ ဆိုတာတွေကို ပေါင်းတွက်ရပါတယ်။ ဒီလို transform အများအပြားကို ထိရောက်စွာ တွက်ဖို့ **matrix** တွေ အသုံးပြုပါတယ်။

အစပိုင်းမှာ အောက်က သုံးမျိုးကို အမည်နဲ့ အလုပ်သဘောလောက် သိထားရင် လုံလောက်ပါတယ်။

1. **Model matrix** — object ရဲ့ position၊ rotation နဲ့ scale ကို ကိုယ်စားပြုတယ်။
2. **View matrix** — camera ရဲ့ နေရာနဲ့ ကြည့်ရာဦးတည်ချက်အတိုင်း world ကို ပြောင်းတယ်။
3. **Projection matrix** — perspective သို့မဟုတ် orthographic ပုံစံနဲ့ screen ဆီ projection လုပ်တယ်။

Matrix သင်္ချာကို အခုချက်ချင်း ကိုယ်တိုင်ရေးတတ်စရာ မလိုပါဘူး။ Three.js က ပုံမှန်အသုံးပြုမှုအများစုမှာ ဒီ matrix တွေကို စီမံပေးပါတယ်။ နောက်ပိုင်း transform၊ camera နဲ့ shader lessons ရောက်တဲ့အခါ တဖြည်းဖြည်း ပိုနားလည်လာပါမယ်။

---

## ၇။ Native WebGL က ဘာကြောင့် ခက်တာလဲ

WebGL က GPU နဲ့ နီးကပ်တဲ့ low-level API ဖြစ်တဲ့အတွက် control ကောင်းကောင်းရသလို ကိုယ်တိုင်တာဝန်ယူရတဲ့အရာလည်း များပါတယ်။ ရိုးရိုး triangle တစ်ခုပြဖို့တောင် အောက်ပါအလုပ်တွေ လိုလာနိုင်ပါတယ်။

1. Canvas ကနေ WebGL context ရယူခြင်း
2. Vertex data ကို typed array အဖြစ် ပြင်ဆင်ခြင်း
3. GPU buffer တည်ဆောက်ပြီး data ထည့်ခြင်း
4. Vertex shader နဲ့ fragment shader ရေးခြင်း
5. Shader နှစ်ခုကို compile နဲ့ link လုပ်ခြင်း
6. Attribute နဲ့ uniform location များ ချိတ်ဆက်ခြင်း
7. Canvas size၊ viewport နဲ့ clear color သတ်မှတ်ခြင်း
8. Draw call ခေါ်ခြင်း

ဒါကြောင့် triangle တစ်ခုပဲ ရေးဆွဲဖို့ code စာကြောင်းများစွာ လိုနိုင်ပါတယ်။ Perspective camera၊ texture၊ light၊ model loading၊ animation နဲ့ interaction ထပ်ထည့်လာရင် project ကို စီမံရတာ ပိုရှုပ်လာပါတယ်။

Native WebGL က မကောင်းတာမဟုတ်ပါဘူး။ အောက်ခြေအဆင့်ကို တိတိကျကျ ထိန်းချုပ်လိုတဲ့အခါနဲ့ အထူး optimization လိုတဲ့အခါ အားသာချက်ရှိပါတယ်။ ဒါပေမယ့် creative 3D project အများစုမှာ အရာအားလုံးကို အစကနေ ပြန်တည်ဆောက်စရာ မလိုပါဘူး။

---

## ၈။ Three.js က WebGL ကို ဘယ်လိုလွယ်ကူစေသလဲ

Three.js ဟာ WebGL ရဲ့အပေါ်မှာ အလုပ်လုပ်တဲ့ MIT-licensed JavaScript library တစ်ခုပါ။ Buffer၊ shader compilation၊ matrix calculation နဲ့ render loop ဆိုင်ရာ အလုပ်များစွာကို စနစ်တကျ စီမံပေးပါတယ်။

Native WebGL ရဲ့ အသေးစိတ် command များအစား ဒီလို နားလည်လွယ်တဲ့ building blocks တွေ သုံးနိုင်ပါတယ်။

```js
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x7c6df2 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, width / height)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(width, height)
renderer.render(scene, camera)
```

ဒီ code ရဲ့အောက်မှာ WebGL buffer၊ shader နဲ့ matrix တွေ အလုပ်လုပ်နေဆဲပါ။ Three.js က အဲဒီအလုပ်တွေကို ဖျောက်ပစ်လိုက်တာ မဟုတ်ဘဲ အသုံးပြုရလွယ်တဲ့ API နဲ့ စီမံပေးထားတာပါ။

လိုအပ်လာတဲ့အခါ Three.js သုံးနေရင်း custom shader ရေးနိုင်သလို matrix နဲ့ WebGL renderer အဆင့်အထိလည်း ထိန်းချုပ်နိုင်ပါတယ်။ ဒါကြောင့် beginner အတွက် စတင်ရလွယ်ပြီး advanced developer အတွက်လည်း တိုးချဲ့နိုင်စွမ်းရှိပါတယ်။

---

## ၉။ Three.js project နဲ့ community

Three.js ကို Ricardo Cabello — **Mr.doob** က စတင်ဖန်တီးခဲ့ပြီး ယနေ့မှာ contributor များစွာ ပါဝင်ထိန်းသိမ်းနေတဲ့ open-source project ဖြစ်ပါတယ်။ လေ့လာတဲ့အခါ အောက်ပါ official resources တွေကို မကြာခဏ အသုံးပြုရပါမယ်။

- [Three.js website](https://threejs.org/) — project မိတ်ဆက်နဲ့ showcase
- [Three.js documentation](https://threejs.org/docs/) — class၊ property နဲ့ method အသေးစိတ်
- [Three.js examples](https://threejs.org/examples/) — လက်တွေ့ effect နဲ့ public source code
- [Three.js GitHub repository](https://github.com/mrdoob/three.js) — source code၊ releases နဲ့ contributors

Documentation ကို အဖြေအားလုံးမှတ်ထားဖို့ မဟုတ်ဘဲ လိုတဲ့အချိန်မှာ မှန်ကန်တဲ့ API ကို ရှာတတ်ဖို့ အသုံးပြုပါ။ Examples ကိုလည်း ကူးထည့်ရုံမလုပ်ဘဲ ဘယ် class နဲ့ technique သုံးထားသလဲဆိုတာ ခွဲကြည့်ပါ။

---

## ၁၀။ အခြား library တွေကရော

Web graphics အတွက် Three.js တစ်ခုတည်း ရှိတာမဟုတ်ပါဘူး။ 3D game engine ပုံစံပိုပြည့်စုံတဲ့ library၊ 2D rendering ကို အဓိကထားတဲ့ library၊ WebGL နဲ့ ပိုနီးတဲ့ lightweight library စသဖြင့် ရည်ရွယ်ချက်မတူတဲ့ရွေးချယ်စရာတွေ ရှိပါတယ်။

ဒီ course အတွက် Three.js ကို ရွေးရတဲ့အကြောင်းရင်းက—

- Feature များစွာ ပါဝင်ခြင်း
- Documentation နဲ့ examples ကောင်းခြင်း
- Community ကြီးမားပြီး ဆက်လက်တိုးတက်နေခြင်း
- Beginner အတွက် လွယ်ကူသော်လည်း WebGL နဲ့ custom shader အထိ ဆင်းသုံးနိုင်ခြင်း

တို့ကြောင့်ဖြစ်ပါတယ်။ ဒါပေမယ့် library တစ်ခုကို အကောင်းဆုံးလို့ အမြဲသတ်မှတ်စရာ မလိုပါဘူး။ ကိုယ်ဖန်တီးမယ့် project နဲ့ ကိုက်ညီတဲ့ tool ကို ရွေးဖို့ အခြားရွေးချယ်စရာတွေကိုလည်း စမ်းသပ်ကြည့်သင့်ပါတယ်။

---

## ၁၁။ မကြာခဏ မှားယွင်းနားလည်တတ်တဲ့အချက်များ

### “Three.js နဲ့ WebGL က တူတူပဲလား”

မတူပါဘူး။ WebGL က browser graphics API ဖြစ်ပြီး Three.js က WebGL ကို ပိုလွယ်ကူစွာ အသုံးပြုနိုင်အောင် တည်ဆောက်ထားတဲ့ JavaScript library ဖြစ်ပါတယ်။

### “Three.js သုံးရင် shader မလိုတော့ဘူးလား”

Three.js material များရဲ့အောက်မှာ shader တွေ အလုပ်လုပ်နေပါတယ်။ ပုံမှန် material သုံးတဲ့အခါ Three.js က shader ကို ပြင်ဆင်ပေးတာကြောင့် ကိုယ်တိုင်မရေးရတာပါ။ နောက်ပိုင်းမှာ custom shader ကို ကိုယ်တိုင်ရေးနိုင်ပါတယ်။

### “3D model တိုင်းက triangle နဲ့ပဲလား”

GPU render လုပ်မယ့် mesh surface များကို အဆုံးမှာ triangle များအဖြစ် ကိုင်တွယ်တာများပါတယ်။ Modeling software ထဲမှာ quad သို့မဟုတ် polygon မြင်ရနိုင်ပေမယ့် render pipeline မဝင်ခင် triangle များအဖြစ် ခွဲနိုင်ပါတယ်။

### “GPU က အလုပ်အားလုံး လုပ်ပေးတာလား”

မဟုတ်ပါဘူး။ JavaScript application logic၊ input၊ resource loading နဲ့ scene preparation အများစုကို CPU ဘက်က လုပ်ပါတယ်။ GPU က graphics ဆိုင်ရာ အပြိုင်တွက်ချက်မှုတွေကို အဓိကလုပ်ပါတယ်။

---

## ၁၂။ Lesson 02 အနှစ်ချုပ်

```text
3D mesh = Triangle များ
Triangle = Vertex ၃ ခု

Vertex Shader = Vertex နေရာတွက်ခြင်း
Fragment Shader = Fragment အရောင်တွက်ခြင်း
Matrix = Object + Camera + Projection transform များ

WebGL = Browser မှ GPU ကို အသုံးပြုနိုင်စေသော low-level API
Three.js = WebGL ကို လွယ်ကူစွာ စီမံအသုံးပြုနိုင်စေသော JavaScript library
```

နောက် Lesson မှာ ဒီ mental model ကို လက်တွေ့သုံးပြီး **ပထမဆုံး Three.js project** ကို စတင်တည်ဆောက်ပါမယ်။ Scene၊ object၊ camera နဲ့ renderer တို့ကို code အဖြစ် ကိုယ်တိုင် ချိတ်ဆက်ရတော့မှာပါ။

### Lesson ပြီးဆုံးမှု စစ်ဆေးရန်

- [ ] WebGL နဲ့ Three.js မတူပုံကို ကိုယ့်စကားနဲ့ ရှင်းပြနိုင်တယ်
- [ ] Vertex shader နဲ့ fragment shader ရဲ့ အလုပ်ကို ခွဲပြောနိုင်တယ်
- [ ] GPU parallel calculation က 3D rendering အတွက် ဘာကြောင့်အသုံးဝင်လဲ သိတယ်
- [ ] Native WebGL ရဲ့ control နဲ့ complexity trade-off ကို နားလည်တယ်
- [ ] Three.js က WebGL ကို အစားထိုးတာမဟုတ်ဘဲ အပေါ်ကနေ စီမံပေးတာကို သိတယ်
