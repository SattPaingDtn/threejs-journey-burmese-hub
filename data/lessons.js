export const CHAPTERS = [
    {
        id: "basics",
        title: "Chapter 1: Basics (အခြေခံများ)",
        description: "Three.js ၏ အခြေခံ သဘောတရားများ၊ Scene, Mesh, Transform, Animation, Cameras နှင့် Materials များ"
    },
    {
        id: "classic",
        title: "Chapter 2: Classic Techniques (ဂန္ထဝင် နည်းစနစ်များ)",
        description: "Lights, Shadows, Particles, Galaxy Generator နှင့် Haunted House ပရောဂျက်"
    },
    {
        id: "advanced",
        title: "Chapter 3: Advanced Techniques (အဆင့်မြင့် နည်းစနစ်များ)",
        description: "Physics (Cannon-es), 3D Models (GLTF), Raycaster နှင့် Realistic Rendering"
    },
    {
        id: "shaders",
        title: "Chapter 4: Shaders (Shader ရေးသားနည်းများ)",
        description: "GLSL, Vertex Shaders, Fragment Shaders, Raging Sea နှင့် Custom Shader Materials"
    },
    {
        id: "extra",
        title: "Chapter 5: Extra & Performance",
        description: "Post-Processing, Performance Optimization, Mixing HTML & WebGL"
    },
    {
        id: "r3f",
        title: "Chapter 6: React Three Fiber (R3F)",
        description: "React Three Fiber, Drei, Physics in R3F, 3D Text နှင့် Complex Portfolios"
    }
];

export const LESSONS = [
    // Chapter 1: Basics
    {
        id: "01-introduction",
        number: "01",
        chapter: "basics",
        title: "Introduction (Three.js Journey ကို စတင်ခြင်း)",
        subtitle: "Course လမ်းပြမြေပုံ၊ လေ့လာနည်း၊ လိုအပ်ချက်များနှင့် အခက်အခဲဖြေရှင်းနည်း",
        status: "ready",
        guideFile: "lessons/01-introduction/guide.md",
        demoType: "introduction",
        tags: ["Three.js", "Roadmap", "Study Guide", "Prerequisites", "Introduction"]
    },
    {
        id: "02-webgl-and-threejs",
        number: "02",
        chapter: "basics",
        title: "What is WebGL and why use Three.js? (WebGL နှင့် Three.js)",
        subtitle: "Triangles၊ GPU Parallelism၊ Shaders၊ Matrices နှင့် Three.js က WebGL ကို လွယ်ကူစေပုံ",
        status: "ready",
        guideFile: "lessons/02-webgl-and-threejs/guide.md",
        demoType: "webgl-threejs",
        tags: ["WebGL", "Three.js", "Triangles", "GPU", "Shaders", "Matrices"]
    },
    {
        id: "03-basic-scene",
        number: "03",
        chapter: "basics",
        title: "First Three.js Project (ပထမဆုံး ပရောဂျက်နှင့် Basic Scene)",
        subtitle: "Node.js၊ NPM၊ Vite setup နှင့် Scene၊ Mesh၊ Camera၊ Renderer သုံးပြီး ပထမဆုံး cube render လုပ်ခြင်း",
        status: "ready",
        guideFile: "lessons/03-basic-scene/guide.md",
        demoType: "basic-scene",
        tags: ["Node.js", "NPM", "Vite", "Scene", "PerspectiveCamera", "WebGLRenderer", "Mesh"]
    },
    {
        id: "04-transform-objects",
        number: "04",
        chapter: "basics",
        title: "Transform Objects (အရာဝတ္ထုများ ရွှေ့ပြောင်းခြင်း)",
        subtitle: "Position၊ Scale၊ Euler/Quaternion rotation၊ AxesHelper၊ lookAt နှင့် Parent/Child Scene Graph",
        status: "ready",
        guideFile: "lessons/04-transform-objects/guide.md",
        demoType: "transform-objects",
        tags: ["Object3D", "Vector3", "Position", "Scale", "Euler", "Quaternion", "lookAt", "Group", "AxesHelper"]
    },
    {
        id: "05-animations",
        number: "05",
        chapter: "basics",
        title: "Animations (လှုပ်ရှားသက်ဝင်စေခြင်း)",
        subtitle: "requestAnimationFrame, Frame Rate Independence, Clock (Delta Time) နှင့် GSAP",
        status: "ready",
        guideFile: "lessons/05-animations/guide.md",
        demoType: "animations",
        tags: ["requestAnimationFrame", "THREE.Clock", "GSAP", "Delta Time"]
    },
    {
        id: "06-cameras",
        number: "06",
        chapter: "basics",
        title: "Cameras (ကင်မရာစနစ် အပြည့်အစုံ)",
        subtitle: "Perspective vs Orthographic, Clipping, Z-Fighting, Custom Mouse Controls နှင့် OrbitControls",
        status: "ready",
        guideFile: "lessons/06-cameras/guide.md",
        demoType: "cameras",
        tags: ["PerspectiveCamera", "OrthographicCamera", "OrbitControls", "Z-Fighting", "Frustum"]
    },
    {
        id: "07-fullscreen-and-resizing",
        number: "07",
        chapter: "basics",
        title: "Fullscreen and Resizing (ဖန်သားပြင် အပြည့်နှင့် Resize)",
        subtitle: "Responsive Viewport, Window Resize, Pixel Ratio (DPR) Handling နှင့် Fullscreen API",
        status: "ready",
        guideFile: "lessons/07-fullscreen-and-resizing/guide.md",
        demoType: "fullscreen-resize",
        tags: ["Resize Event", "PixelRatio", "Fullscreen API", "DPR"]
    },
    {
        id: "08-geometries",
        number: "08",
        chapter: "basics",
        title: "Geometries (ဂျီဩမေတြီများနှင့် BufferGeometry)",
        subtitle: "Built-in Geometries, BufferGeometry, Float32Array, Vertices, Normals နှင့် UV Coordinates",
        status: "ready",
        guideFile: "lessons/08-geometries/guide.md",
        demoType: "geometries",
        tags: ["BufferGeometry", "BufferAttribute", "Float32Array", "Wireframe"]
    },
    {
        id: "09-debug-ui",
        number: "09",
        chapter: "basics",
        title: "Debug UI (lil-gui ဖြင့် Parameters စမ်းသပ်ခြင်း)",
        subtitle: "Number၊ Boolean၊ Color၊ Function controls၊ Geometry rebuild နှင့် GUI folders/setup",
        status: "ready",
        guideFile: "lessons/09-debug-ui/guide.md",
        demoType: "debug-ui",
        tags: ["lil-gui", "Debug", "onChange", "onFinishChange", "Folders"]
    },
    {
        id: "10-textures",
        number: "10",
        chapter: "basics",
        title: "Textures (မျက်နှာပြင် Texture များ)",
        subtitle: "TextureLoader၊ LoadingManager၊ UV၊ wrapping၊ filters၊ mipmaps၊ color space နှင့် optimization",
        status: "ready",
        guideFile: "lessons/10-textures/guide.md",
        demoType: "textures",
        tags: ["TextureLoader", "LoadingManager", "UV", "Mipmaps", "NearestFilter", "ColorSpace"]
    },
    {
        id: "11-materials",
        number: "11",
        chapter: "basics",
        title: "Materials (မျက်နှာပြင်ရုပ်ထွက်နှင့် PBR)",
        subtitle: "Basic၊ Normal၊ Matcap၊ Lambert၊ Phong၊ Toon၊ Standard နှင့် Physical materials",
        status: "ready",
        guideFile: "lessons/11-materials/guide.md",
        demoType: "materials",
        tags: ["MeshStandardMaterial", "MeshPhysicalMaterial", "PBR", "Roughness", "Metalness", "Matcap"]
    },
    {
        id: "12-3d-text",
        number: "12",
        chapter: "basics",
        title: "3D Text (FontLoader၊ TextGeometry နှင့် Matcap)",
        subtitle: "Typeface JSON font၊ TextGeometry၊ bevel၊ bounding box၊ center နှင့် shared resources",
        status: "ready",
        guideFile: "lessons/12-3d-text/guide.md",
        demoType: "3d-text",
        tags: ["FontLoader", "TextGeometry", "Typeface", "BoundingBox", "Matcap", "Center"]
    },
    {
        id: "13-go-live",
        number: "13",
        chapter: "basics",
        title: "Go Live (Three.js Project ကို Online တင်ခြင်း)",
        subtitle: "Production build၊ local preview၊ dist output၊ static hosting နှင့် continuous deployment",
        status: "ready",
        guideFile: "lessons/13-go-live/guide.md",
        demoType: "go-live",
        tags: ["Vite Build", "Preview", "Deployment", "Vercel", "Static Hosting"]
    },

    // Chapter 2: Classic Techniques
    {
        id: "14-lights",
        number: "14",
        chapter: "classic",
        title: "Lights (အလင်းရောင်စနစ်)",
        subtitle: "AmbientLight, DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight နှင့် Helpers",
        status: "upcoming",
        tags: ["AmbientLight", "DirectionalLight", "PointLight", "SpotLight"]
    },
    {
        id: "15-shadows",
        number: "15",
        chapter: "classic",
        title: "Shadows (အရိပ်စနစ်)",
        subtitle: "Shadow Maps (PCF, PCFSoft), castShadow, receiveShadow, Shadow Map Optimization",
        status: "upcoming",
        tags: ["castShadow", "receiveShadow", "ShadowMap", "PCFSoftShadowMap"]
    },
    {
        id: "16-haunted-house",
        number: "16",
        chapter: "classic",
        title: "Haunted House (သရဲခြောက်သောအိမ် ပရောဂျက်)",
        subtitle: "အဆောက်အအုံ၊ မြက်ခင်း၊ ဂူသင်္ချိုင်း၊ မီးရောင်များနှင့် အခိုးအငွေ့ Ghost လှုပ်ရှားမှုများ",
        status: "upcoming",
        tags: ["Project", "House", "Graves", "Fog", "PointLight Animation"]
    },
    {
        id: "17-particles",
        number: "17",
        chapter: "classic",
        title: "Particles (အမှုန်အမွှားစနစ်)",
        subtitle: "Points, PointsMaterial, BufferGeometry သုံး၍ နှင်း၊ မိုး၊ ဖုန်မှုန့် အမှုန်များ ဖန်တီးခြင်း",
        status: "upcoming",
        tags: ["Points", "PointsMaterial", "AlphaMap", "DepthWrite"]
    },
    {
        id: "18-galaxy-generator",
        number: "18",
        chapter: "classic",
        title: "Galaxy Generator (ဂလက်ဆီ ဖန်တီးခြင်း)",
        subtitle: "Spiral Galaxies, Particle Branching, Spin, Randomness, Core/Outside Colors နှင့် GUI Tweaks",
        status: "upcoming",
        tags: ["Galaxy", "Trigonometry", "Color Vertex", "lil-gui"]
    },
    {
        id: "19-scroll-based-animation",
        number: "19",
        chapter: "classic",
        title: "Scroll-based Animation (Scroll အလိုက် ကာတွန်းလှုပ်ရှားမှု)",
        subtitle: "HTML/CSS နှင့် WebGL ပေါင်းစပ်ခြင်း၊ Scroll Position အလိုက် ကင်မရာနှင့် 3D Object များ လှည့်ခြင်း",
        status: "upcoming",
        tags: ["Scroll", "Parallax", "HTML Integration", "Lerp"]
    },

    // Chapter 3: Advanced Techniques
    {
        id: "20-physics",
        number: "20",
        chapter: "advanced",
        title: "Physics (ရူပဗေဒစနစ် - Cannon-es)",
        subtitle: "Physics World vs Visual World, Rigid Bodies, Colliders, Forces/Impulses, Collision Events",
        status: "upcoming",
        tags: ["Cannon-es", "RigidBody", "Collisions", "Broadphase"]
    },
    {
        id: "21-imported-models",
        number: "21",
        chapter: "advanced",
        title: "Imported Models (3D Model များ တင်သွင်းခြင်း)",
        subtitle: "GLTF, GLB, GLTFLoader, DRACOLoader Compression, AnimationMixer ဖြင့် Animation ဖွင့်ခြင်း",
        status: "upcoming",
        tags: ["GLTFLoader", "DRACOLoader", "AnimationMixer", "Duck/Fox"]
    },
    {
        id: "22-raycaster-and-mouse-events",
        number: "22",
        chapter: "advanced",
        title: "Raycaster and Mouse Events (3D Click/Hover စနစ်)",
        subtitle: "Raycasting, Cursor Coordinate Casting, intersectObjects, Hover/Click Events",
        status: "upcoming",
        tags: ["Raycaster", "intersectObjects", "Mouse Hover", "Click"]
    },
    {
        id: "23-custom-models-with-blender",
        number: "23",
        chapter: "advanced",
        title: "Custom Models with Blender (Blender ဖြင့် 3D Model ပြုလုပ်ခြင်း)",
        subtitle: "Blender Basics, Modeling, UV Unwrapping, Baking Textures, GLTF Export",
        status: "upcoming",
        tags: ["Blender", "Baking", "UV Unwrapping", "GLTF Export"]
    },
    {
        id: "24-environment-and-staging",
        number: "24",
        chapter: "advanced",
        title: "Environment and Staging (ပတ်ဝန်းကျင်နှင့် အလင်းအမှောင် ဖန်တီးခြင်း)",
        subtitle: "HDRI Environment Maps, Ground Projected EnvMap, Background Blur, Lighting Setup",
        status: "upcoming",
        tags: ["HDRI", "RGBELoader", "GroundProjectedEnvMap", "BackgroundBlur"]
    },
    {
        id: "25-realistic-render",
        number: "25",
        chapter: "advanced",
        title: "Realistic Render (လက်တွေ့ဆန်သော ရုပ်ထွက်)",
        subtitle: "Tone Mapping (ACESFilmic), Color Space (sRGB), Output Encoding, Environment Map Lighting",
        status: "upcoming",
        tags: ["ACESFilmicToneMapping", "sRGBEncoding", "Shadows", "EnvMap Intensity"]
    },
    {
        id: "26-code-structuring",
        number: "26",
        chapter: "advanced",
        title: "Code Structuring for Bigger Projects (ကြီးမားသော ပရောဂျက်များအတွက် Code ဖွဲ့စည်းပုံ)",
        subtitle: "OOP Classes, EventEmitter, Resources Loader, Time, Sizes, Experience Class Pattern",
        status: "upcoming",
        tags: ["Architecture", "OOP", "EventEmitter", "Singleton"]
    },

    // Chapter 4: Shaders
    {
        id: "27-shaders",
        number: "27",
        chapter: "shaders",
        title: "Shaders (GLSL Shader မိတ်ဆက်)",
        subtitle: "ShaderMaterial, RawShaderMaterial, Vertex Shader, Fragment Shader, Attributes, Uniforms, Varyings",
        status: "upcoming",
        tags: ["GLSL", "Vertex Shader", "Fragment Shader", "Uniforms", "Varyings"]
    },
    {
        id: "28-shader-patterns",
        number: "28",
        chapter: "shaders",
        title: "Shader Patterns (Shader ပုံစံ ၅၀ ကျော် ရေးဆွဲနည်း)",
        subtitle: "Step, Smoothstep, Modulo, Distance, Length, Noise, UV Math Patterns",
        status: "upcoming",
        tags: ["Patterns", "Math", "Step", "Smoothstep", "Noise"]
    },
    {
        id: "29-raging-sea",
        number: "29",
        chapter: "shaders",
        title: "Raging Sea (ပင်လယ်လှိုင်းတံပိုး Shader ပရောဂျက်)",
        subtitle: "Wave Elevation, Perlin Noise, Directional Waves, Deep/Surface Color Mixing",
        status: "upcoming",
        tags: ["Perlin Noise", "Water Shader", "Sin Waves", "Color Interpolation"]
    }
];
