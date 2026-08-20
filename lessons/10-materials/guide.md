# ✨ Three.js Journey - Lesson 10: Materials (ရုပ်ထွက် ပစ္စည်းအမျိုးအစားများ)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 10: Materials](https://threejs-journey.com/lessons/materials)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 Materials နှိုင်းယှဉ်ချက် ဇယား

| Material အမည် | အလင်းရောင် လို/မလို | ထူးခြားချက် |
| :--- | :--- | :--- |
| **`MeshBasicMaterial`** | မလို | အရောင် သို့မဟုတ် Texture ကို တိုက်ရိုက်ပြ (အရိပ်/အလင်း မရှိ) |
| **`MeshNormalMaterial`** | မလို | မျက်နှာပြင်၏ Normal Vector ထောင့်များအလိုက် RGB အရောင်ပြ |
| **`MeshMatcapMaterial`** | မလို | စက်လုံးပုံ Texture တစ်ခုဖြင့် အလင်းရောင်အတု ဖန်တီးပြသ (အလွန်မြန်သည်) |
| **`MeshDepthMaterial`** | မလို | ကင်မရာနှင့် အနီး/အဝေး အလိုက် အဖြူ/အမဲ ပြသခြင်း |
| **`MeshLambertMaterial`** | လိုအပ် | ပထမဆုံး အလင်းရောင်တုပြန်သော Material (ဖျော့တော့တော့ Matte ရုပ်ထွက်) |
| **`MeshPhongMaterial`** | လိုအပ် | ပြောင်လက်သော အလင်းပြန်မှု (Specular Highlights) ပါရှိ |
| **`MeshToonMaterial`** | လိုအပ် | ကာတွန်း/Cel-shading စတိုင် အလင်းရောင် |
| **`MeshStandardMaterial`** ⭐ | လိုအပ် | **PBR (Physically Based Rendering)** စနစ်သုံး လက်တွေ့ဆန်သော Material |
| **`MeshPhysicalMaterial`** | လိုအပ် | Standard ထက် Clearcoat, Transmission, Sheen, IOR များ ပိုမိုပါဝင် |

---

## MeshStandardMaterial (PBR) အသုံးပြုပုံ

```javascript
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7  // သတ္တုဆန်မှု (0 မှ 1)
material.roughness = 0.2  // ကြမ်းတမ်းမှု (0 = ပြောင်လက်မှန်ရိပ်, 1 = ကြမ်း)

// Texture Maps များ ထည့်သွင်းခြင်း
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.05
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.alphaMap = doorAlphaTexture
material.transparent = true

// Environment Map ထည့်သွင်းခြင်း (Realistic Reflection)
material.envMap = environmentMapTexture
```
