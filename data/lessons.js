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
        title: "Chapter 5: Extra & React Three Fiber",
        description: "Post-Processing, Performance Optimization, React Three Fiber (R3F) နှင့် WebXR"
    }
];

export const LESSONS = [
    // Chapter 1: Basics
    {
        id: "01-introduction",
        number: "01",
        chapter: "basics",
        title: "Introduction (မိတ်ဆက်နှင့် လမ်းပြမြေပုံ)",
        subtitle: "WebGL vs Three.js, CPU vs GPU, Creative Web Development နယ်ပယ်များနှင့် Course Roadmap",
        status: "ready",
        guideFile: "lessons/01-introduction/guide.md",
        demoType: "introduction",
        tags: ["WebGL", "Three.js", "GPU", "Roadmap", "Introduction"]
    },
    {
        id: "03-basic-scene",
        number: "03",
        chapter: "basics",
        title: "Basic Scene (အခြေခံ Scene တည်ဆောက်ခြင်း)",
        subtitle: "Scene, Mesh, Geometry, Material, Camera နှင့် Renderer ၏ အခြေခံ Core ၄ ခု",
        status: "ready",
        guideFile: "lessons/03-basic-scene/guide.md",
        demoType: "basic-scene",
        tags: ["Scene", "PerspectiveCamera", "WebGLRenderer", "Mesh"]
    },
    {
        id: "04-transform-objects",
        number: "04",
        chapter: "basics",
        title: "Transform Objects (အရာဝတ္ထုများ ရွှေ့ပြောင်းခြင်း)",
        subtitle: "Position, Rotation (Euler), Quaternion, Scale, AxesHelper နှင့် Scene Graph (Group)",
        status: "ready",
        guideFile: "lessons/04-transform-objects/guide.md",
        demoType: "transform-objects",
        tags: ["Vector3", "Euler", "Quaternion", "Group", "AxesHelper"]
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
        id: "07-cameras",
        number: "07",
        chapter: "basics",
        title: "Cameras (ကင်မရာစနစ် အပြည့်အစုံ)",
        subtitle: "Perspective vs Orthographic, Clipping, Z-Fighting, Custom Mouse Controls နှင့် OrbitControls",
        status: "ready",
        guideFile: "lessons/07-cameras/guide.md",
        demoType: "cameras",
        tags: ["PerspectiveCamera", "OrthographicCamera", "OrbitControls", "Z-Fighting", "Frustum"]
    },
    {
        id: "08-fullscreen-and-resizing",
        number: "08",
        chapter: "basics",
        title: "Fullscreen and Resizing (ဖန်သားပြင် အပြည့်နှင့် Resize)",
        subtitle: "Responsive Viewport, Window Resize, Pixel Ratio (DPR) Handling နှင့် Fullscreen API",
        status: "ready",
        guideFile: "lessons/08-fullscreen-and-resizing/guide.md",
        demoType: "fullscreen-resize",
        tags: ["Resize Event", "PixelRatio", "Fullscreen API"]
    },
    {
        id: "09-geometries",
        number: "09",
        chapter: "basics",
        title: "Geometries (ဂျီဩမေတြီများနှင့် BufferGeometry)",
        subtitle: "Built-in Geometries, BufferGeometry, Float32Array, Vertices, Normals နှင့် UV Coordinates",
        status: "ready",
        guideFile: "lessons/09-geometries/guide.md",
        demoType: "geometries",
        tags: ["BufferGeometry", "BufferAttribute", "Float32Array", "Wireframe"]
    },
    {
        id: "10-textures",
        number: "10",
        chapter: "basics",
        title: "Textures (မျက်နှာပြင် Texture များ)",
        subtitle: "TextureLoader, LoadingManager, UV Mapping, Mipmapping, Min/Mag Filter နှင့် Optimization",
        status: "ready",
        guideFile: "lessons/10-textures/guide.md",
        demoType: "textures",
        tags: ["TextureLoader", "LoadingManager", "UVs", "Mipmaps", "NearestFilter"]
    },
    {
        id: "11-materials",
        number: "11",
        chapter: "basics",
        title: "Materials (ရုပ်ထွက် ပစ္စည်းအမျိုးအစားများ)",
        subtitle: "MeshBasic, MeshNormal, MeshMatcap, MeshLambert, MeshPhong, MeshStandard, MeshPhysical, Environment Maps",
        status: "ready",
        guideFile: "lessons/11-materials/guide.md",
        demoType: "materials",
        tags: ["MeshStandardMaterial", "PBR", "Roughness", "Metalness", "EnvMap"]
    },
    {
        id: "12-3d-text",
        number: "12",
        chapter: "basics",
        title: "3D Text (3D စာသား ဖန်တီးခြင်း)",
        subtitle: "Typeface Fonts, FontLoader, TextGeometry, Bounding Box ဖြင့် Center ချခြင်းနှင့် Matcap",
        status: "ready",
        guideFile: "lessons/12-3d-text/guide.md",
        demoType: "3d-text",
        tags: ["FontLoader", "TextGeometry", "computeBoundingBox", "Center"]
    },

    // Chapter 2: Classic Techniques
    {
        id: "13-lights",
        number: "13",
        chapter: "classic",
        title: "Lights (အလင်းရောင်စနစ်)",
        subtitle: "AmbientLight, DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight နှင့် Helpers",
        status: "upcoming",
        tags: ["AmbientLight", "DirectionalLight", "PointLight", "SpotLight"]
    },
    {
        id: "14-shadows",
        number: "14",
        chapter: "classic",
        title: "Shadows (အရိပ်စနစ်)",
        subtitle: "Shadow Maps (PCF, PCFSoft), castShadow, receiveShadow, Shadow Map Optimization",
        status: "upcoming",
        tags: ["castShadow", "receiveShadow", "ShadowMap", "PCFSoftShadowMap"]
    },
    {
        id: "15-haunted-house",
        number: "15",
        chapter: "classic",
        title: "Haunted House (သရဲခြောက်သောအိမ် ပရောဂျက်)",
        subtitle: "အဆောက်အအုံ၊ မြက်ခင်း၊ ဂူသင်္ချိုင်း၊ မီးရောင်များနှင့် အခိုးအငွေ့ Ghost လှုပ်ရှားမှုများ",
        status: "upcoming",
        tags: ["Project", "House", "Graves", "Fog", "PointLight Animation"]
    },
    {
        id: "16-particles",
        number: "16",
        chapter: "classic",
        title: "Particles (အမှုန်အမွှားစနစ်)",
        subtitle: "Points, PointsMaterial, BufferGeometry သုံး၍ နှင်း၊ မိုး၊ ဖုန်မှုန့် အမှုန်များ ဖန်တီးခြင်း",
        status: "upcoming",
        tags: ["Points", "PointsMaterial", "AlphaMap", "DepthWrite"]
    },
    {
        id: "17-galaxy-generator",
        number: "17",
        chapter: "classic",
        title: "Galaxy Generator (ဂလက်ဆီ ဖန်တီးခြင်း)",
        subtitle: "Spiral Galaxies, Particle Branching, Spin, Randomness, Core/Outside Colors နှင့် GUI Tweaks",
        status: "upcoming",
        tags: ["Galaxy", "Trigonometry", "Color Vertex", "lil-gui"]
    },
    {
        id: "18-scroll-based-animation",
        number: "18",
        chapter: "classic",
        title: "Scroll-based Animation (Scroll အလိုက် ကာတွန်းလှုပ်ရှားမှု)",
        subtitle: "HTML/CSS နှင့် WebGL ပေါင်းစပ်ခြင်း၊ Scroll Position အလိုက် ကင်မရာနှင့် 3D Object များ လှည့်ခြင်း",
        status: "upcoming",
        tags: ["Scroll", "Parallax", "HTML Integration", "Lerp"]
    },

    // Chapter 3: Advanced Techniques
    {
        id: "19-physics",
        number: "19",
        chapter: "advanced",
        title: "Physics (ရူပဗေဒစနစ် - Cannon-es)",
        subtitle: "Physics World vs Visual World, Rigid Bodies, Colliders, Forces/Impulses, Collision Events",
        status: "upcoming",
        tags: ["Cannon-es", "RigidBody", "Collisions", "Broadphase"]
    },
    {
        id: "20-imported-models",
        number: "20",
        chapter: "advanced",
        title: "Imported Models (3D Model များ တင်သွင်းခြင်း)",
        subtitle: "GLTF, GLB, GLTFLoader, DRACOLoader Compression, AnimationMixer ဖြင့် Animation ဖွင့်ခြင်း",
        status: "upcoming",
        tags: ["GLTFLoader", "DRACOLoader", "AnimationMixer", "Duck/Fox"]
    },
    {
        id: "21-raycaster",
        number: "21",
        chapter: "advanced",
        title: "Raycaster and Mouse Events (3D Click/Hover စနစ်)",
        subtitle: "Raycasting, Cursor Coordinate Casting, intersectObjects, Hover/Click Events",
        status: "upcoming",
        tags: ["Raycaster", "intersectObjects", "Mouse Hover", "Click"]
    },
    {
        id: "23-realistic-render",
        number: "23",
        chapter: "advanced",
        title: "Realistic Render (လက်တွေ့ဆန်သော ရုပ်ထွက်)",
        subtitle: "Tone Mapping (ACESFilmic), Color Space (sRGB), Output Encoding, Environment Map Lighting",
        status: "upcoming",
        tags: ["ACESFilmicToneMapping", "sRGBEncoding", "Shadows", "EnvMap Intensity"]
    },

    // Chapter 4: Shaders
    {
        id: "25-shaders",
        number: "25",
        chapter: "shaders",
        title: "Shaders (GLSL Shader မိတ်ဆက်)",
        subtitle: "ShaderMaterial, RawShaderMaterial, Vertex Shader, Fragment Shader, Attributes, Uniforms, Varyings",
        status: "upcoming",
        tags: ["GLSL", "Vertex Shader", "Fragment Shader", "Uniforms", "Varyings"]
    },
    {
        id: "27-raging-sea",
        number: "27",
        chapter: "shaders",
        title: "Raging Sea (ပင်လယ်လှိုင်းတံပိုး Shader ပရောဂျက်)",
        subtitle: "Wave Elevation, Perlin Noise, Directional Waves, Deep/Surface Color Mixing",
        status: "upcoming",
        tags: ["Perlin Noise", "Water Shader", "Sin Waves", "Color Interpolation"]
    }
];
