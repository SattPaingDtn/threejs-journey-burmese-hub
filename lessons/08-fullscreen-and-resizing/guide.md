# 🖥️ Three.js Journey - Lesson 08: Fullscreen and Resizing (ဖန်သားပြင် အပြည့်နှင့် Resize)

> **မူရင်းသင်ခန်းစာ**: [Three.js Journey - Lesson 08: Fullscreen and Resizing](https://threejs-journey.com/lessons/fullscreen-and-resizing)  
> **Course Instructor**: Bruno Simon  
> **ဘာသာပြန်နှင့် ပြုစုသူ**: Antigravity

---

## 📑 Core Concepts

3D Web Application များကို Browser Window အပြည့် ပြသနိုင်ရန်နှင့် Window အရွယ်အစား ပြောင်းလဲသည့်အခါ ပုံမပျက်ဘဲ အလိုအလျောက် ချိန်ညှိနိုင်စေရန် ပြုလုပ်နည်း ဖြစ်သည်။

---

## 1. CSS Reset (Scrollbar နှင့် Margin ဖျောက်ခြင်း)

```css
* {
    margin: 0;
    padding: 0;
}

html, body {
    overflow: hidden;
    height: 100%;
}

.webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
```

---

## 2. Window Resize Event Handling

```javascript
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // 1. Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // 2. Update Camera Aspect Ratio & Matrix
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // 3. Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```

---

## 3. Pixel Ratio (DPR) Optimization

Retina / High-DPI မျက်နှာပြင်များတွင် ပုံရိပ်များ ဝါးမနေစေရန် `window.devicePixelRatio` ဖြင့် ချိန်ညှိရသည်။

> ⚠️ **သတိပြုရန်**: Pixel Ratio 3 (သို့မဟုတ်) 4 ရှိသော ဖုန်းများတွင် GPU ပူလောင်ပြီး Performance ကျဆင်းခြင်း မဖြစ်စေရန် အများဆုံး **`2`** တွင် ကန့်သတ်ထားသင့်ပါသည် (`Math.min(window.devicePixelRatio, 2)`)။

```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

---

## 4. Fullscreen API (Double-click ဖြင့် ဖန်သားပြင်အပြည့် ဖွင့်ခြင်း)

Safari နှင့် Standard Browser များအားလုံးတွင် အလုပ်လုပ်စေသော Cross-browser Fullscreen code:

```javascript
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }
})
```
