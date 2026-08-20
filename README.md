# 🌟 Three.js Journey - Burmese Master Study Notes & Interactive Lab

Three.js Journey သင်ခန်းစာများကို မြန်မာလို အလွယ်တကူ လေ့လာနိုင်ရန် ပြုစုထားသော စာရွက်စာတမ်းများနှင့် Interactive Lab ဖြစ်ပါသည်။

---

## 📁 ဖိုင်များစာရင်း (Files in this Workspace)

1. **[07-cameras-burmese-guide.md](file:///Users/sp/Documents/My3Djourneylesson/07-cameras-burmese-guide.md)** 📚
   - **Lesson 07: Cameras** ၏ Master Deep-Dive မြန်မာဘာသာ သင်ခန်းစာ လမ်းညွှန်နှင့် Cheat Sheet ဖြစ်ပါသည်။
   - **ပါဝင်သော Deep Dive အခန်းကဏ္ဍများ**:
     - 3D Graphics Pipeline (Model Space $\to$ World $\to$ View/Eye $\to$ Clip/Projection $\to$ NDC $\to$ Screen Space)
     - `THREE.Camera` Base Class, `lookAt()` Vector Math & `camera.up` Gimbal Lock ဖြေရှင်းနည်း
     - ကင်မရာ (၆) မျိုး၏ အသေးစိတ် အလုပ်လုပ်ပုံ (Perspective, Orthographic, ArrayCamera, StereoCamera, CubeCamera)
     - **Z-Fighting သင်္ချာ**: Depth buffer non-linearity ($1/Z$) ကြောင့် ဖြစ်ရသည့် အကြောင်းအရင်းနှင့် `logarithmicDepthBuffer` ဖြေရှင်းနည်း
     - Custom Controls သင်္ချာ ($Math.sin$, $Math.cos$, Spherical coordinates, Lerp smoothing)
     - `OrbitControls` Advanced Config (Limits, Damping, Auto-rotate) နှင့် `PointerLockControls` (FPS Game Controller အပြည့်အစုံ)
     - Common Pitfalls, Performance Tips & Master Cheat Sheet

2. **[interactive-camera-demo.html](file:///Users/sp/Documents/My3Djourneylesson/interactive-camera-demo.html)** 🎮
   - Browser တွင် တိုက်ရိုက်ဖွင့်၍ စမ်းသပ်နိုင်သော **Interactive Three.js Camera Studio** ဖြစ်ပါသည်။
   - **စမ်းသပ်နိုင်သော အချက်များ**:
     - `PerspectiveCamera` နှင့် `OrthographicCamera` Switch လုပ်၍ ကွာခြားချက်ကို အချိန်နှင့်တပြေးညီ ကြည့်ရှုခြင်း
     - `FOV`, `Near`, `Far` slider များကို ပြောင်းလဲပြီး Frustum clipping ပုံစံကို စမ်းသပ်ခြင်း
     - `OrbitControls` (Damping, Auto-rotate), `Trigonometric Mouse Orbit (sin/cos)`, `Smooth Lerp Motion` စသည့် Control Mode (၃) မျိုးကို နှိုင်းယှဉ်စမ်းသပ်ခြင်း
     - Active Parameter များအလိုက် **Live Generated Code** ကို တိုက်ရိုက် ကြည့်ရှုကူးယူနိုင်ခြင်း

---

## 🚀 စတင်အသုံးပြုပုံ (How to use)

- Markdown မှတ်စုများကို ဖတ်ရှုလိုပါက [07-cameras-burmese-guide.md](file:///Users/sp/Documents/My3Djourneylesson/07-cameras-burmese-guide.md) ကို ဖွင့်ပါ။
- Visual အနေဖြင့် လက်တွေ့ စမ်းသပ်ကြည့်လိုပါက [interactive-camera-demo.html](file:///Users/sp/Documents/My3Djourneylesson/interactive-camera-demo.html) ဖိုင်ကို Browser (Chrome/Safari/Edge/Firefox) ဖြင့် ဖွင့်လိုက်ရုံပင် ဖြစ်ပါသည်။
