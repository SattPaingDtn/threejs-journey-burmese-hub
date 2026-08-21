# Lesson 09 — Debug UI (`lil-gui` နဲ့ Parameters စမ်းသပ်ခြင်း)

> **မူရင်းသင်ခန်းစာ** — [Three.js Journey: Debug UI](https://threejs-journey.com/lessons/debug-ui)<br>
> **သင်ကြားသူ** — Bruno Simon<br>
> **ဤ guide** — မူရင်း lesson ရဲ့ `lil-gui` workflow ကို မြန်မာလို နားလည်ပြီး ကိုယ်ပိုင် project မှာ reusable debug panel တည်ဆောက်နိုင်အောင် ရှင်းပြထားပါတယ်။

## ဒီသင်ခန်းစာပြီးရင် ဘာလုပ်နိုင်မလဲ

- Debug UI က development speed ကို ဘယ်လိုမြှင့်တင်သလဲ ရှင်းပြနိုင်မယ်
- `lil-gui` install/import လုပ်ပြီး controller တစ်ခု ဖန်တီးနိုင်မယ်
- Number၊ boolean၊ color နဲ့ function controls ထည့်နိုင်မယ်
- `.onChange()` နဲ့ `.onFinishChange()` ကို သင့်တော်သလို ခွဲသုံးနိုင်မယ်
- Geometry subdivision ပြောင်းတဲ့အခါ dispose/rebuild မှန်ကန်စွာ လုပ်နိုင်မယ်
- Folders၊ title၊ width၊ close/hide controls နဲ့ panel ကို စနစ်တကျ စီမံနိုင်မယ်

---

## ၁။ Debug UI ကို ဘာကြောင့်သုံးတာလဲ

3D scene တစ်ခုမှာ position၊ color၊ roughness၊ light intensity နဲ့ animation speed စတဲ့ values များကို code ပြင်၊ save၊ browser ပြန်ကြည့်နေရင် အချိန်ကုန်ပါတယ်။ Debug UI တစ်ခုက ဒီ parameters တွေကို slider၊ checkbox၊ color picker နဲ့ button အဖြစ် browser ထဲမှာ တိုက်ရိုက်ပြောင်းစေပါတယ်။

Debug UI ကို final user interface လို့ မယူဆသင့်ပါဘူး။ Developer/designer က values စမ်းပြီး သင့်တော်တဲ့ result ရှာဖို့ အသုံးပြုတဲ့ tool ဖြစ်ပါတယ်။ Final value ရပြီဆို code/config ထဲ သိမ်းထားနိုင်ပါတယ်။

---

## ၂။ `dat.GUI` ကနေ `lil-gui` သို့

Three.js tutorials အဟောင်းများမှာ `dat.GUI` ကို တွေ့နိုင်ပါတယ်။ မူရင်း Lesson 09 က ပိုမိုပေါ့ပါးပြီး maintained ဖြစ်တဲ့ `lil-gui` ကို သုံးပါတယ်။

```bash
npm install lil-gui
```

```js
import GUI from 'lil-gui'

const gui = new GUI()
```

GUI ကို scene ဖန်တီးမီ သို့မဟုတ် object controls ထည့်မီ instantiate လုပ်ထားပါ။

---

## ၃။ Number controller

`gui.add(object, 'property')` က object ရဲ့ property ကို တိုက်ရိုက်ဖတ်ပြီး UI control ဖန်တီးပါတယ်။

```js
gui.add(mesh.position, 'y')
```

Slider range၊ step နဲ့ display name သတ်မှတ်နိုင်ပါတယ်။

```js
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')
```

အတိုရေးနည်း—

```js
gui.add(mesh.position, 'y', -3, 3, 0.01)
```

`gui.add(myVariable, ...)` လို့ primitive variable တစ်ခုကို တိုက်ရိုက်မပေးနိုင်ပါဘူး။ Property ပါတဲ့ object လိုပါတယ်။

```js
const debugObject = {
    speed: 1
}

gui.add(debugObject, 'speed', 0, 3, 0.01)
```

---

## ၄။ Boolean၊ color နဲ့ function controls

### Checkbox

Boolean property ပေးရင် checkbox အလိုအလျောက် ဖန်တီးပါတယ်။

```js
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')
```

### Color picker

Three.js `Color` object ကို GUI version အလိုက် တိုက်ရိုက် handle လုပ်နိုင်ပေမယ့် debug object ထဲမှာ CSS color string ထားတာက စီမံရလွယ်ပါတယ်။

```js
const debugObject = {
    color: '#3a6ea6'
}

const material = new THREE.MeshBasicMaterial({
    color: debugObject.color
})

gui.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color)
})
```

### Button/function

Function property တစ်ခုထည့်ရင် GUI က button အဖြစ် ပြပေးပါတယ်။

```js
debugObject.spin = () => {
    gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI * 2
    })
}

gui.add(debugObject, 'spin')
```

---

## ၅။ `onChange` နှင့် `onFinishChange`

```js
controller.onChange((value) => {
    // slider ဆွဲနေစဉ် အကြိမ်များစွာ ခေါ်မယ်
})
```

```js
controller.onFinishChange((value) => {
    // user ဆွဲပြီး လွှတ်ချိန်မှ တစ်ခါခေါ်မယ်
})
```

Material color/opacity လို စျေးမကြီးတဲ့ update က `onChange()` သုံးနိုင်ပါတယ်။ Geometry အသစ်တည်ဆောက်ခြင်း၊ network request သို့မဟုတ် heavy calculation လို ကုန်ကျစရိတ်များတဲ့အလုပ်က `onFinishChange()` ပိုသင့်တော်ပါတယ်။

---

## ၆။ Geometry subdivision ကို runtime မှာ ပြောင်းခြင်း

Geometry constructor parameters ကို ဖန်တီးပြီးနောက် property ပြောင်းရုံနဲ့ shape ပြန်မတည်ဆောက်ပါဘူး။ Geometry အဟောင်းကို dispose လုပ်ပြီး အသစ်တည်ဆောက်ရပါတယ်။

```js
debugObject.subdivision = 2

gui
    .add(debugObject, 'subdivision', 1, 20, 1)
    .onFinishChange(() => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision,
            debugObject.subdivision,
            debugObject.subdivision
        )
    })
```

`dispose()` မလုပ်ရင် အဟောင်း GPU buffers များ memory ထဲ ကျန်နိုင်ပါတယ်။

---

## ၇။ Folders နဲ့ panel organization

Controls များလာရင် folders ဖြင့် ခွဲပါ။

```js
const cubeTweaks = gui.addFolder('Awesome cube')

cubeTweaks.add(mesh.position, 'y', -3, 3, 0.01)
cubeTweaks.add(mesh, 'visible')
cubeTweaks.add(material, 'wireframe')
cubeTweaks.addColor(debugObject, 'color')
```

```js
cubeTweaks.close()
```

GUI constructor မှာ title၊ width နဲ့ folder state သတ်မှတ်နိုင်ပါတယ်။

```js
const gui = new GUI({
    title: 'Scene controls',
    width: 300,
    closeFolders: false
})
```

အသုံးဝင်သော methods—

```js
gui.close()   // panel ကို collapse
gui.open()    // ပြန်ဖွင့်
gui.hide()    // ဖျောက်
gui.show()    // ပြန်ပြ
gui.destroy() // DOM/events ဖယ်ရှား
```

Project အကြီးမှာ debug mode ကို query parameter သို့မဟုတ် environment flag နဲ့သာ ဖွင့်တာကောင်းပါတယ်။

---

## ၈။ Complete mini example

```js
import GUI from 'lil-gui'

const gui = new GUI({ title: 'Cube lab' })
const debugObject = {
    color: '#7c6df2',
    spin: () => {
        gsap.to(mesh.rotation, {
            duration: 1,
            y: mesh.rotation.y + Math.PI * 2
        })
    }
}

const folder = gui.addFolder('Cube')
folder.add(mesh.position, 'y', -3, 3, 0.01).name('elevation')
folder.add(mesh, 'visible')
folder.add(material, 'wireframe')
folder.addColor(debugObject, 'color').onChange(() => {
    material.color.set(debugObject.color)
})
folder.add(debugObject, 'spin')
```

---

## လက်တွေ့လေ့ကျင့်ခန်း

1. Lab မှာ elevation၊ visibility၊ wireframe နဲ့ color controls ကို ပြောင်းပါ
2. Spin button ကို နှိပ်ပြီး function controller အလုပ်လုပ်ပုံကြည့်ပါ
3. Subdivision တိုးပြီး wireframe triangles များလာပုံကို စစ်ပါ
4. Controls ကို Transform၊ Material၊ Geometry folders သုံးခုအဖြစ် ကိုယ်တိုင်ခွဲရေးပါ

## ပြဿနာဖြေရှင်းရန်

- GUI မပေါ်ရင် `lil-gui` install/import မှန်သလား စစ်ပါ
- Controller မအလုပ်လုပ်ရင် object နဲ့ property name မှန်သလား စစ်ပါ
- Color UI ပြောင်းပေမယ့် mesh မပြောင်းရင် callback ထဲမှာ `material.color.set(...)` ခေါ်ပါ
- Geometry ပြောင်းတိုင်း အဟောင်းကို `dispose()` လုပ်ပါ
- Production page မှာ debug UI မလိုရင် `gui.destroy()` သို့မဟုတ် conditional setup သုံးပါ

Debug UI က parameter များကို ခန့်မှန်းပြီး code ပြန်ပြင်နေရတဲ့ loop ကို မြန်ဆန်တဲ့ visual experimentation အဖြစ် ပြောင်းပေးပါတယ်။ နောက် Lesson ရဲ့ texture filters နဲ့ transformations စမ်းတဲ့အခါလည်း အလွန်အသုံးဝင်ပါလိမ့်မယ်။
