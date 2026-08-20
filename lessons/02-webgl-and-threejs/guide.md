# ⚡ Lesson 02: WebGL ဆိုတာ ဘာလဲ? Three.js ကို ဘာကြောင့် သုံးရသလဲ?

> **သင်ကြားပြသသူ**: Bruno Simon (Three.js Journey)  
> **မြန်မာဘာသာ ပြုစုရှင်းလင်းသူ**: Antigravity  
> **သင်ခန်းစာ ပုံစံ**: ဆရာတစ်ယောက်က အနီးကပ် ရှင်းပြသလို ရင်းနှီးလွယ်ကူပြီး အသေးစိတ် ပြည့်စုံသော လမ်းညွှန်

---

## 📑 မာတိကာ (Table of Contents)

1. [WebGL ဆိုတာ အမှန်တကယ် ဘာလဲ? (What is WebGL?)](#၁-webgl-ဆိုတာ-အမှန်တကယ်-ဘာလဲ)
2. [3D ရုပ်လုံးများ၏ အခြေခံ အုတ်မြစ်: တြိဂံများ (Triangles, Vertices & Faces)](#၂-3d-ရုပ်လုံးများ၏-အခြေခံ-အုတ်မြစ်-တြိဂံများ)
3. [GPU Pipeline: Shaders နှင့် Matrices မိတ်ဆက်](#၃-gpu-pipeline-shaders-နှင့်-matrices-မိတ်ဆက်)
   - Vertex Shader (ငြမ်းဆင်ပြီး အမှတ်များ နေရာချထားခြင်း)
   - Fragment / Pixel Shader (ပန်းချီဆရာကဲ့သို့ အရောင် ဆေးခြယ်ခြင်း)
   - Transformation Matrices (Model, View, Projection)
4. [Native WebGL ဘာကြောင့် ရေးသားရ ခက်ခဲသလဲ? (၁၀၀+ ကုဒ်စာကြောင်း ပြဿနာ)](#၄-native-webgl-ဘာကြောင့်-ရေးသားရ-ခက်ခဲသလဲ)
5. [Three.js ၏ သမိုင်းကြောင်းနှင့် အဓိက အားသာချက်များ](#၅-threejs-၏-သမိုင်းကြောင်းနှင့်-အဓိက-အားသာချက်များ)
6. [အခြား WebGL Library များနှင့် အသေးစိတ် နှိုင်းယှဉ်ချက်](#၆-အခြား-webgl-library-များနှင့်-အသေးစိတ်-နှိုင်းယှဉ်ချက်)
   - Three.js vs Babylon.js vs Pixi.js vs PlayCanvas vs A-Frame vs OGL
7. [Web 3D ၏ အနာဂတ်: WebGPU အကြောင်း သိကောင်းစရာ](#၇-web-3d-၏-အနာဂတ်-webgpu-အကြောင်း-သိကောင်းစရာ)
8. [ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Lesson 02 Memory Hook)](#၈-ဆရာ့ရဲ့-အလွတ်မှတ်-မှတ်စုတို)

---

# ၁။ WebGL ဆိုတာ အမှန်တကယ် ဘာလဲ?

**WebGL (Web Graphics Library)** ဆိုတာ Browser ရဲ့ `<canvas>` element ပေါ်မှာ Hardware Acceleration (GPU စွမ်းအား) ကို ရယူပြီး 2D နဲ့ 3D Graphics တွေကို အလွန် လျင်မြန်တဲ့ အရှိန်နှုန်းနဲ့ ရေးဆွဲပေးတဲ့ **JavaScript API** တစ်ခု ဖြစ်ပါတယ်။

၎င်းသည် မိုဘိုင်းဖုန်းများနှင့် Console ဂိမ်းစက်များတွင် အသုံးပြုသော **OpenGL ES 2.0** စံနှုန်းကို အခြေခံထားပြီး W3C နှင့် Khronos Group တို့မှ ပူးပေါင်း ထိန်းသိမ်းထားပါသည်။

---

# ၂။ 3D ရုပ်လုံးများ၏ အခြေခံ အုတ်မြစ်: တြိဂံများ

3D Graphics လောကမှာ မည်သည့် ပုံသဏ္ဌာန်မဆို (စက်လုံး၊ ကား၊ လူရုပ်၊ တိုက်တာအဆောက်အအုံ) အားလုံးကို **တြိဂံ (Triangles)** ပေါင်း သောင်းနှင့်ချီ ဆက်စပ်ပြီး တည်ဆောက်ထားတာ ဖြစ်ပါတယ်:

```
                 Vertex 1 (X, Y, Z)
                     /\
                    /  \
                   /    \   <── မျက်နှာပြင် (Triangle Face)
                  /______\
     Vertex 2 (X, Y, Z)   Vertex 3 (X, Y, Z)
```

### အဓိက အစိတ်အပိုင်း (၃) ခုကို နားလည်ထားပါ:
1. **ထိပ်မှတ် (Vertex / အများကိန်း Vertices)**: 3D အာကာသထဲက တည်နေရာ အမှတ်အသား ($X, Y, Z$) ဖြစ်ပါတယ်။ ထို့အပြင် Vertex တိုင်းမှာ Normal (မျက်နှာမူရာ ဦးတည်ချက်) နဲ့ UV Coordinate (Texture ပုံ ကပ်ရန် အမှတ်) တွေ ပါဝင်ပါတယ်။
2. **မျက်နှာပြင် (Face)**: Vertex ၃ ခုကို ဆက်စပ်လိုက်တဲ့အခါ တြိဂံမျက်နှာပြင်လေးတစ်ခု ဖြစ်ပေါ်လာပါတယ်။
3. **Pixel ဆေးခြယ်ခြင်း (Rasterization)**: အဲ့ဒီ တြိဂံမျက်နှာပြင်လေးတွေဟာ Screen ပေါ် ဘယ် Pixel နေရာတွေမှာ ကျရောက်နေသလဲဆိုတာ တွက်ချက်ပြီး အလင်းရောင်၊ အရိပ်တွေ ပေါင်းစပ်ကာ ဆေးခြယ်ပေးတာ ဖြစ်ပါတယ်။

---

# ၃။ GPU Pipeline: Shaders နှင့် Matrices မိတ်ဆက်

GPU သည် CPU ကဲ့သို့ JavaScript ကုဒ်ကို တိုက်ရိုက် နားမလည်ပါ။ GPU ကို မည်သို့ အလုပ်လုပ်ရမည်ဟု ညွှန်ကြားရန် **GLSL (OpenGL Shading Language)** ဟူသော C-like Language ဖြင့် ရေးသားထားသည့် ပရိုဂရမ်များကို **Shaders** ဟု ခေါ်သည်:

```
[ 3D Vertices Data ] ──► [ 📍 Vertex Shader ] ──► [ Rasterizer ] ──► [ 🎨 Fragment Shader ] ──► [ Screen Pixels ]
```

---

### (က) Vertex Shader (ငြမ်းဆင်ပြီး အမှတ်များ နေရာချထားခြင်း)
* 3D Space ထဲရှိ Vertex တစ်ခုချင်းစီ၏ $X, Y, Z$ တည်နေရာကို Screen ဖန်သားပြင် (2D Screen) ပေါ်ရှိ မည်သည့်နေရာတွင် ပေါ်ရမည်ဟု တွက်ချက် နေရာချပေးသည်။
* ကင်မရာ၏ အကွာအဝေး၊ ထောင့်ဒီဂရီနှင့် လှည့်ပတ်မှုများကို ဤအဆင့်တွင် တွက်ချက်သည်။

### (ခ) Fragment / Pixel Shader (ပန်းချီဆရာကဲ့သို့ အရောင် ဆေးခြယ်ခြင်း)
* Vertex များ နေရာကျပြီးနောက် တြိဂံအတွင်းရှိ Pixel တစ်ခုချင်းစီအတွက် မည်သည့်အရောင် ($R, G, B, A$) ဖြစ်ရမည်ကို ဆုံးဖြတ်သည်။
* မီးရောင် (Light) ထိုးကျမှု၊ အရိပ်ကျရောက်မှု၊ ရောင်ပြန်ဟပ်မှုနှင့် Texture ဓာတ်ပုံများကို ဤအဆင့်တွင် ပေါင်းစပ် တွက်ချက်သည်။

### (ဂ) Transformation Matrices (Model, View, Projection)
3D အမှတ်များကို Screen ပေါ်သို့ ပြောင်းလဲရန် Matrix သင်္ချာ ၃ ခုကို အသုံးပြုသည်:
* **Model Matrix**: Object ၏ ကိုယ်ပိုင် Position, Rotation, Scale ကို တွက်ချက်သည်။
* **View Matrix**: Camera ၏ တည်နေရာနှင့် မျက်နှာမူရာကို တွက်ချက်သည်။
* **Projection Matrix**: Perspective (အနီးကြီး အဝေးသေး) သို့မဟုတ် Orthographic အဖြစ် ပြောင်းလဲပေးသည်။

---

# ၄။ Native WebGL ဘာကြောင့် ရေးသားရ ခက်ခဲသလဲ?

Native WebGL ဖြင့် ရိုးရိုး ၂ ဖက်မြင် တြိဂံပြားလေးတစ်ခု ရေးဆွဲရန်အတွက်ပင် အောက်ပါ အဆင့်များကို ကိုယ်တိုင် ကုဒ်ရေးသားရသည်:

1. HTML Canvas မှ `gl = canvas.getContext('webgl')` ဆွဲယူခြင်း
2. Vertex Data များကို `Float32Array` အဖြစ် သတ်မှတ်ပြီး GPU Memory Buffer တည်ဆောက်ခြင်း (`gl.createBuffer`, `gl.bindBuffer`, `gl.bufferData`)
3. Vertex Shader နှင့် Fragment Shader GLSL ကုဒ်များကို Text String အဖြစ် ရေးသားခြင်း
4. Shader များကို Compile လုပ်ခြင်း (`gl.compileShader`) နှင့် Error စစ်ဆေးခြင်း
5. Shader Program တည်ဆောက်၍ GPU သို့ Attach လုပ်ကာ Link ချိတ်ဆက်ခြင်း (`gl.linkProgram`)
6. Attribute Pointer များကို Binding ပြုလုပ်ခြင်း (`gl.vertexAttribPointer`)
7. Viewport သတ်မှတ်ပြီး Draw Call ခေါ်ယူခြင်း (`gl.drawArrays(gl.TRIANGLES, 0, 3)`)

ဤသို့ဖြင့် တြိဂံပြားတစ်ခုအတွက်ပင် ကုဒ်စာကြောင်းရေ **၁၀၀ ကျော်** ဖြစ်သွားသည်။ အကယ်၍ 3D Model, Shadows, Lights, Textures များနှင့် Controls များ ထည့်သွင်းလိုပါက ကုဒ်ထောင်သောင်းချီ ရှုပ်ထွေးသွားမည် ဖြစ်သည်။

---

# ၅။ Three.js ၏ သမိုင်းကြောင်းနှင့် အဓိက အားသာချက်များ

**Three.js** သည် အထက်ပါ ရှုပ်ထွေးလှသော WebGL ၏ အောက်ခြေစနစ်များကို စနစ်တကျ ကွယ်ဝှက် (Abstract) ပေးထားသော **Open-Source JavaScript 3D Library (MIT License)** ဖြစ်သည်။

```javascript
// Native WebGL တွင် စာကြောင်း ၁၀၀ ကျော် ရေးရမည့်အစား Three.js တွင်:
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

### Three.js ၏ ထူးခြားသော အားသာချက်များ:
* 💡 **အလွန်လွယ်ကူရှင်းလင်းခြင်း**: Scene, Camera, Mesh, Geometry, Material, Light ဟူသော သဘောတရားများဖြင့် အလိုလို နားလည်လွယ်သည်။
* 🌍 **အကြီးမားဆုံး Community**: ၂၀၁၀ တွင် **Mr.doob (Ricardo Cabello)** စတင်ခဲ့ပြီး ယနေ့တိုင် GitHub ပေါ်တွင် Star ပေါင်း ၉၀,၀၀၀ ကျော်ဖြင့် ကမ္ဘာ့အသုံးအများဆုံး ဖြစ်သည်။
* 🧩 **ကြွယ်ဝသော Loaders & Extensions**: GLTF, OBJ, FBX Model Loaders များနှင့် OrbitControls များ ပါဝင်ပြီး `threejs.org/examples` တွင် ဥပမာ ရာနှင့်ချီ ရှိသည်။

---

# ၆။ အခြား WebGL Library များနှင့် အသေးစိတ် နှိုင်းယှဉ်ချက်

| Library / Engine | အဓိက သွင်ပြင်လက္ခဏာ | အကောင်းဆုံး အသုံးချမှု |
| :--- | :--- | :--- |
| **`Three.js`** ⭐ | လေ့လာရ အလွယ်ဆုံး၊ အပေါ့ပါးဆုံး၊ အသုံးအများဆုံး စံသတ်မှတ်ချက် | Creative 3D Websites, Portfolios, Product Configurators |
| **`Babylon.js`** | Microsoft မှ ထောက်ပံ့ထားပြီး Physics, Audio, GUI, Collision စသော Game Engine စနစ်များ ပြည့်စုံ | Web 3D Games, Simulators, Enterprise Tools |
| **`PlayCanvas`** | Cloud-based Visual Editor ပါဝင်သော Web-first Game Engine | Collaborative 3D Web Games |
| **`Pixi.js`** | **2D WebGL သီးသန့်** အလွန်လျင်မြန်သော Engine | 2D Games, Rich Web UI, Canvas Animations |
| **`A-Frame`** | HTML Custom Tags ဖြင့် ရေးသားနိုင်သော WebXR/VR Framework | Quick VR/AR Prototypes, WebXR Experiences |
| **`OGL`** | Minimalist ဖြစ်ပြီး အရမ်းပေါ့ပါးသော Low-level WebGL Library | Custom WebGL Micro-interactions |

---

# ၇။ Web 3D ၏ အနာဂတ်: WebGPU အကြောင်း သိကောင်းစရာ

* **WebGPU ဆိုတာ ဘာလဲ?**:  
  WebGL ၏ ဆက်ခံသူအဖြစ် W3C မှ စံသတ်မှတ်ထားသော မျိုးဆက်သစ် Modern Graphics API ဖြစ်သည်။ Apple ၏ Metal, Microsoft ၏ DirectX 12, Linux/Android ၏ Vulkan ကဲ့သို့သော ခေတ်မီ Low-level Graphics Architecture များနှင့် တိုက်ရိုက် ကိုက်ညီသည်။
* **Compute Shaders**:  
  Graphics သာမက AI, Machine Learning နှင့် Physics တွက်ချက်မှုများကို GPU ပေါ်တွင် တိုက်ရိုက် မောင်းနှင်နိုင်သည်။
* **Three.js ၏ ပံ့ပိုးမှု**:  
  Three.js တွင် `WebGPURenderer` နှင့် TSL (Three.js Shading Language) Node Material စနစ်ကို အဆင်သင့် ပံ့ပိုးပေးနေပြီ ဖြစ်သဖြင့် Three.js ကို လေ့လာခြင်းဖြင့် အနာဂတ် WebGPU သို့ အလွယ်တကူ ကူးပြောင်းနိုင်မည် ဖြစ်သည်။

---

# ၈။ ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Lesson 02 Memory Hook)

> 🧠 **ဒီလိုလေး အလွတ်မှတ်ထားလိုက်ပါ**:  
> * **3D Object အားလုံး** = တြိဂံ (Triangles) မျက်နှာပြင်များဖြင့် တည်ဆောက်ထားသည်။  
> * **Vertex Shader** = ငြမ်းဆင်ပြီး အမှတ်တွေကို နေရာချပေးသော ဗိသုကာဆရာ။  
> * **Fragment Shader** = Pixel တွေကို အလင်းအမှောင်နဲ့ ဆေးခြယ်ပေးသော ပန်းချီဆရာ။  
> * **Three.js** = ခက်ခဲလှသော WebGL ကို လွယ်ကူစေသည့် ကမ္ဘာ့အကောင်းဆုံး 3D Library။
