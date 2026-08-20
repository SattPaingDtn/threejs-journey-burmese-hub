# 📸 Three.js Journey - Lesson 06: Cameras (ကင်မရာစနစ် အပြည့်အစုံ)

---

## 📑 မာတိကာ (Table of Contents)

1. [Camera Space နှင့် Coordinate Transformations (အတွင်းပိုင်း အလုပ်လုပ်ပုံ)](#၁-camera-space-နှင့်-coordinate-transformations)
2. [Three.js ရှိ Camera အမျိုးအစားများ မိတ်ဆက်](#၂-threejs-ရှိ-camera-အမျိုးအစားများ)
3. [PerspectiveCamera အသေးစိတ် လေ့လာခြင်း](#၃-perspectivecamera-အသေးစိတ်-လေ့လာခြင်း)
   - FOV (Field of View - မြင်ကွင်းကျယ်)
   - Aspect Ratio (ဖန်သားပြင် အချိုး)
   - Near & Far Clipping Planes နှင့် Z-Fighting ပြဿနာ
4. [OrthographicCamera အသေးစိတ် လေ့လာခြင်း](#၄-orthographiccamera-အသေးစိတ်-လေ့လာခြင်း)
   - Frustum Box Math နှင့် Aspect Ratio ချိန်ညှိခြင်း
   - Isometric / 2D အသုံးချမှုများ
5. [Custom Mouse Controls (ကိုယ်ပိုင် Controller ရေးသားနည်း)](#၅-custom-mouse-controls-ကိုယ်ပိုင်-controller-ရေးသားနည်း)
   - Cursor Coordinates ပုံသေနည်း ($-0.5$ မှ $+0.5$)
   - Trigonometric Orbit (Math.sin & Math.cos)
   - Smooth Lerp Easing
6. [OrbitControls Built-in Controller အပြည့်အစုံ](#၆-orbitcontrols-built-in-controller-အပြည့်အစုံ)
   - Damping (အရှိန်ဖြင့် ချောမွေ့စွာ ရပ်ခြင်း)
   - Auto-Rotate နှင့် Constraint ကန့်သတ်ချက်များ
7. [အနှစ်ချုပ် မှတ်စုတို (Lesson 06 Memo)](#၇-အနှစ်ချုပ်-မှတ်စုတို)

---

# ၁။ Camera Space နှင့် Coordinate Transformations

3D ကမ္ဘာထဲရှိ အရာဝတ္ထုများကို ကျွန်ုပ်တို့၏ ၂ ဖက်မြင် ကွန်ပျူတာ ဖန်သားပြင် (2D Screen) ပေါ်သို့ ရောက်ရှိလာစေရန် အဆင့် (၄) ဆင့် ဖြတ်သန်းရသည်:

```
[ Local Space ] ──► [ World Space ] ──► [ View / Camera Space ] ──► [ Clip Space / Screen ]
```

1. **Local Space**: 3D Object တစ်ခုချင်းစီ၏ မူရင်း ဗဟိုမှတ် `(0, 0, 0)`။
2. **World Space**: Object များကို Scene ထဲတွင် နေရာချထားသော တည်နေရာ (`modelMatrix`)။
3. **View / Camera Space**: Camera ၏ တည်နေရာကို မူလ `(0, 0, 0)` ဟု သတ်မှတ်ပြီး ကမ္ဘာလောက တစ်ခုလုံးကို ကင်မရာ၏ မျက်လုံးရှေ့သို့ ပြောင်းလဲတွက်ချက်ခြင်း (`viewMatrix`)။
4. **Clip Space / Projection**: 3D အမှတ်များကို Screen ပေါ်သို့ Perspective သို့မဟုတ် Orthographic အဖြစ် ပြားကပ် ရေးဆွဲပေးခြင်း (`projectionMatrix`)။

---

# ၂။ Three.js ရှိ Camera အမျိုးအစားများ

`THREE.Camera` သည် အောက်ပါ Class များ၏ Base Class ဖြစ်သည်:

| Camera Class | သဘောတရားနှင့် အသုံးပြုမှု |
| :--- | :--- |
| **`PerspectiveCamera`** ⭐ | လူ့မျက်လုံးလို အနီးရှိအရာများ ကြီးပြီး အဝေးရှိအရာများ သေးငယ်သော အသုံးအများဆုံး စံကင်မရာ။ |
| **`OrthographicCamera`** ⭐ | အကွာအဝေးကြောင့် ပုံမသေးသွားဘဲ မျဉ်းပြိုင် (Parallel) အတိုင်း ပြသပေးသော ကင်မရာ (Isometric / 2D)။ |
| **`ArrayCamera`** | Screen တစ်ခုတည်းကို ကင်မရာငယ်လေးများစွာ ခွဲ၍ ပြသခြင်း (ဥပမာ - 4-Player Split Screen Games)။ |
| **`StereoCamera`** | ဘယ်ဘက်/ညာဘက် မျက်လုံး (၂) လုံးအတွက် ရုပ်ပုံခွဲထုတ်ပေးသော VR / Anaglyph 3D Glasses ကင်မရာ။ |
| **`CubeCamera`** | အရပ်မျက်နှာ ၆ ဖက်စလုံးကို ရိုက်ကူး၍ Reflection / Environment Map ဖန်တီးပေးသော ကင်မရာ။ |

---

# ၃။ PerspectiveCamera အသေးစိတ် လေ့လာခြင်း

```javascript
const camera = new THREE.PerspectiveCamera(
    75,                         // 1. FOV (Field of View)
    sizes.width / sizes.height, // 2. Aspect Ratio
    0.1,                        // 3. Near Plane
    100                         // 4. Far Plane
)
```

```
          Near Plane         Far Plane
             ┌───┐          ┌─────────┐
    Eye     /     \        /           \
     ● ────/───────\──────/─────────────\
            \     /        \           /
             └───┘          └─────────┘
              ◄─── View Frustum ───►
```

---

### (က) FOV (Field of View)
* ဒေါင်လိုက် မြင်ကွင်းကျယ်ထောင့် (Vertical Angle in Degrees) ဖြစ်သည်။
* တန်ဖိုး ကြီးလွန်းပါက (`120°+`) ဘေးဘက်များ ရွဲ့စောင်းသွားမည် (Fish-eye Effect)။
* တန်ဖိုး သေးလွန်းပါက (`20°~35°`) တယ်လီစကုပ် မှန်ဘီလူးကဲ့သို့ ချဲ့ကြည့်သကဲ့သို့ ဖြစ်မည်။
* ပုံမှန်အားဖြင့် **`45° ~ 75°`** ကြားကို အများဆုံး အသုံးပြုကြသည်။

### (ခ) Aspect Ratio
* ကင်မရာ မြင်ကွင်း၏ အကျယ်နှင့် အမြင့် အချိုး (`width / height`) ဖြစ်သည်။
* Canvas ၏ အချိုးနှင့် တူညီရမည်။ ကွဲလွဲပါက ပုံရုပ်လုံးများ ပြားကပ် သို့မဟုတ် ရှည်မျောသွားမည် ဖြစ်သည်။

### (ဂ) Near & Far Clipping Planes နှင့် Z-Fighting ပြဿနာ
* ကင်မရာသည် `near` ထက် ပိုနီးသော အရာများနှင့် `far` ထက် ပိုဝေးသော အရာများကို ဖြတ်တောက် (Clip) ပစ်သည်။
* **⚠️ Z-Fighting သတိပြုရန်**:  
  GPU ၏ Depth Buffer (Z-Buffer) တိကျမှုသည် Near နှင့် Far ကြား အကွာအဝေးပေါ် မူတည်သည်။ အကယ်၍ `near: 0.0001` နှင့် `far: 99999` ဟု သတ်မှတ်မိပါက GPU သည် မျက်နှာပြင် နှစ်ခု ထပ်တူကျသည့်အခါ မည်သည့်မျက်နှာပြင်က ရှေ့ရောက်သည်ကို မခွဲခြားနိုင်တော့ဘဲ **တဖျတ်ဖျတ် ပျက်စီးသည့် Z-Fighting bug** ဖြစ်ပွားမည်။ (အကြံပြုချက်: `near: 0.1`, `far: 100`)။

---

# ၄။ OrthographicCamera အသေးစိတ် လေ့လာခြင်း

OrthographicCamera သည် အကွာအဝေး မည်မျှပင် ဝေးပါစေ အရွယ်အစား လုံးဝ မပြောင်းလဲဘဲ မူလအတိုင်း တိုင်းတာ ပြသသည်:

```javascript
const aspect = sizes.width / sizes.height
const frustumSize = 4

const camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2, // Left
     frustumSize * aspect / 2, // Right
     frustumSize / 2,          // Top
    -frustumSize / 2,          // Bottom
     0.1,                      // Near
     100                       // Far
)
```

> 💡 **Aspect Ratio ပေါင်းစပ်ပုံ**: Left နှင့် Right ကို `aspect` ဖြင့် မမြှောက်ပါက မျက်နှာပြင် မညီမျှသည့်အခါ စက်လုံးသည် ဘဲဥပုံစံ ပြားကပ်သွားပါမည်။

---

# ၅။ Custom Mouse Controls (ကိုယ်ပိုင် Controller ရေးသားနည်း)

User ၏ Mouse လှုပ်ရှားမှုအတိုင်း ကင်မရာကို လိုက်ပါ လှည့်ပတ်စေရန် ကိုယ်ပိုင် ကုဒ်ရေးသားနည်း:

```javascript
// ၁။ Cursor တန်ဖိုးကို -0.5 မှ +0.5 သို့ ပုံသေသတ်မှတ်ခြင်း
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5) // Y ဝင်ရိုး ပြောင်းပြန်လှန်ခြင်း
})

// ၂။ Trigonometry သုံး၍ ၃၆၀ ဒီဂရီ စက်ဝိုင်းပတ် လှည့်ခြင်း
const tick = () => {
    const angle = cursor.x * Math.PI * 2

    camera.position.x = Math.sin(angle) * 4.5
    camera.position.z = Math.cos(angle) * 4.5
    camera.position.y = cursor.y * 4

    // ကင်မရာကို ကမ္ဘာ့ဗဟိုဆီသို့ အမြဲ မျက်နှာမူစေခြင်း
    camera.lookAt(mesh.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

# ၆။ OrbitControls Built-in Controller အပြည့်အစုံ

Three.js တွင် အဆင်သင့်ပါဝင်သော **OrbitControls** သည် Mouse Click & Drag ဖြင့် လှည့်ပတ်ခြင်း၊ Right Click ဖြင့် Pan ရွှေ့ခြင်းနှင့် Scroll ဖြင့် Zoom ဆွဲခြင်းများကို အပြည့်အစုံ လုပ်ဆောင်ပေးသည်:

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// OrbitControls စတင် ဖန်တီးခြင်း
const controls = new OrbitControls(camera, canvas)

// ၁။ အရှိန်ဖြင့် ချောမွေ့စွာ ရပ်တန့်ခြင်း (Damping)
controls.enableDamping = true
controls.dampingFactor = 0.05

// ၂။ အလိုအလျောက် လှည့်ပတ်စေခြင်း (Auto-Rotate)
controls.autoRotate = true
controls.autoRotateSpeed = 2.0

// ၃။ ကင်မရာ အနီး/အဝေး ကန့်သတ်ခြင်း (Distance Limits)
controls.minDistance = 2
controls.maxDistance = 10

// ၄။ ဒေါင်လိုက် ကင်မရာ ထောင့် ကန့်သတ်ခြင်း (Angle Limits - မြေကြီးအောက် မဆင်းစေရန်)
controls.maxPolarAngle = Math.PI / 2 // 90 ဒီဂရီ

// 🚨 အရေးကြီး: Damping သုံးပါက tick() loop ထဲတွင် controls.update() ခေါ်ပေးရမည်
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
```

---

# ၇။ အနှစ်ချုပ် မှတ်စုတို (Lesson 06 Memo)

```javascript
// ==========================================
// CAMERAS & CONTROLS BOILERPLATE
// ==========================================
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 1. Perspective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1.5, 4)
scene.add(camera)

// 2. OrbitControls with Damping
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05

// 3. Render Loop
const tick = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
```
