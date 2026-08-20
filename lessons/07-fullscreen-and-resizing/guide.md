# 🖥️ Lesson 07: ဖန်သားပြင် အပြည့်နှင့် Responsive ချိန်ညှိခြင်း (Fullscreen & Resizing)

> **သင်ကြားပြသသူ**: Bruno Simon (Three.js Journey)  
> **မြန်မာဘာသာ ပြုစုရှင်းလင်းသူ**: Antigravity  
> **သင်ခန်းစာ ပုံစံ**: ဆရာတစ်ယောက်က အနီးကပ် ရှင်းပြသလို ရင်းနှီးလွယ်ကူသော လမ်းညွှန်

---

## 👋 မင်္ဂလာပါ! အခု ကျွန်တော်တို့ 3D Scene ကို မျက်နှာပြင် အပြည့် ပြသကြပါမယ်!

လက်တွေ့ ဝက်ဘ်ဆိုက်တွေမှာ 3D Scene တွေကို ဘောင်အသေးလေးထဲ မဟုတ်ဘဲ ဖန်သားပြင် အပြည့် (Full Screen) ပြသကြပါတယ်။

User က Browser Window ကို ဆွဲချုံ့/ဆွဲချဲ့လိုက်တဲ့အခါ ဒါမှမဟုတ် Mobile, Tablet, 4K Monitor တွေမှာ ကြည့်တဲ့အခါ ပုံမပျက်ဘဲ ကြည်လင်တောက်ပနေအောင် ဘယ်လို လုပ်မလဲ ကြည့်ရအောင်။

---

## 🎨 ၁။ CSS Reset (Scrollbar နဲ့ Margin ဖျောက်ခြင်း)

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    overflow: hidden; /* Scrollbar လုံးဝ မပေါ်စေရန် */
}

.webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
```

```javascript
// JavaScript မှာ Window အကျယ်/အမြင့်ကို ယူလိုက်မယ်
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
```

---

## 🔄 ၂။ Window Resize Event ကို နားထောင်၍ ပြန်ချိန်ခြင်း

User က Window အရွယ်အစား ပြောင်းလိုက်တဲ့အခါ Three.js က အလိုအလျောက် မသိပါဘူး။ ဒါကြောင့် `resize` event ထဲမှာ အောက်ပါ အဆင့် (၃) ဆင့် လုပ်ပေးရပါမယ်:

```javascript
window.addEventListener('resize', () => {
    // အဆင့် ၁။ Sizes တန်ဖိုးများကို Update လုပ်ခြင်း
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // အဆင့် ၂။ ကင်မရာ Aspect Ratio အသစ်တွက်ပြီး Matrix ကို ပြန်တွက်ခြင်း
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix() // 🚨 အရမ်းအရေးကြီးတယ်: ဒါမခေါ်ရင် ပုံရုပ်လုံးတွေ ပြားသွားပါမယ်

    // အဆင့် ၃။ Renderer Size နဲ့ Pixel Ratio ကို ပြန်ချိန်ခြင်း
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```

---

## 📱 ၃။ Device Pixel Ratio (DPR) ရဲ့ လျှို့ဝှက်ချက်

* **DPR ဆိုတာ ဘာလဲ?**: Screen ပေါ်က CSS Pixel ၁ ခုအတွက် ကွန်ပျူတာ ဟာ့ဒ်ဝဲက physical pixel ဘယ်နှစ်ခု သုံးသလဲဆိုတာ ဖြစ်ပါတယ်။
* Apple Retina Displays နဲ့ စမတ်ဖုန်းတွေမှာ `DPR = 2` ဒါမှမဟုတ် `DPR = 3` ပါဝင်ပါတယ်။

```
DPR 1 (သာမန် Display)     :  [ ■ ] (1 physical pixel)
DPR 2 (Retina Display)    :  [ ■■ / ■■ ] (4 physical pixels - အရမ်းကြည်လင်တယ်)
DPR 3 (High-End Phone)    :  [ 3x3 = 9 pixels - GPU ဝန် ၉ ဆ ပိတယ်!)
```

> 💡 **ဆရာ့ရဲ့ ရွှေစည်းမျဉ်း**:  
> လူ့မျက်စိဟာ DPR 2 နဲ့ DPR 3 ရဲ့ ကွာခြားချက်ကို မခွဲခြားနိုင်ပါဘူး။ ဒါပေမယ့် DPR 3 ဟာ GPU ကို ၉ ဆ ပိုခိုင်းသလို ဖြစ်ပြီး Battery အရမ်းကုန်စေပါတယ်။ ဒါကြောင့် **အမြင့်ဆုံး ၂ အထိသာ ကန့်သတ်ခြင်း (`Math.min(window.devicePixelRatio, 2)`)** ဟာ အကောင်းဆုံး စံနှုန်း ဖြစ်ပါတယ်။

---

## ⛶ ၄။ Fullscreen API (Double Click နှိပ်လျှင် ဖန်သားပြင်အပြည့် ဖွင့်ခြင်း)

```javascript
window.addEventListener('dblclick', () => {
    // Safari အပါအဝင် Browser အားလုံးတွင် အလုပ်လုပ်စေရန်
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if (!fullscreenElement) {
        if (canvas.requestFullscreen) canvas.requestFullscreen()
        else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen()
    } else {
        if (document.exitFullscreen) document.exitFullscreen()
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
    }
})
```

---

## 💡 ဆရာ့ရဲ့ အလွတ်မှတ် မှတ်စုတို (Memory Hook)

> 🧠 **ဒီလိုလေး မှတ်ထားလိုက်ပါ**:  
> * **Scrollbar ဖျောက်ဖို့** = `html, body { overflow: hidden; }`  
> * **Window Resize ဖြစ်တိုင်း မဖြစ်မနေ ခေါ်ရမှာ** = `camera.updateProjectionMatrix()`  
> * **Retina Screen မှာ ကြည်လင်ပြီး Battery မကုန်စေဖို့** = `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`  
> * **ဖန်သားပြင် အပြည့်ဖွင့်ဖို့** = `canvas.requestFullscreen()`
