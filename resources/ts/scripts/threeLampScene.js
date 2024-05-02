const fbxLoader = new THREE.FBXLoader()
const textureLoader = new THREE.TextureLoader()

/**
 * ошибка текстур
 * https://github.com/mrdoob/three.js/issues/16542
 */

export class ThreeLampScene {
    scene = null
    camera = null
    renderer = null
    model = null
    renderElem = null
    texturePath = null
    filePath = null
    controls = null
    orbitControlEnabled = false
    modelInitialRotation = {
        y: 0,
        x: 0,
        z: 0
    }
    modelMoveAnimationSettings = {
        direction: 'left',
        axis: 'y',
        value: 0.0003,
        moreValue: [0.5, -0.5]
    }

    constructor({
        texturePath,
        filePath,
        renderElem,
        orbitControlEnabled,
        modelInitialRotation,
        modelMoveAnimationSettings
    }) {
        if (orbitControlEnabled) {
            this.orbitControlEnabled = orbitControlEnabled
        }
        if (modelInitialRotation) {
            this.modelInitialRotation = modelInitialRotation
        }
        if (modelMoveAnimationSettings) {
            this.modelMoveAnimationSettings = modelMoveAnimationSettings
        }
        this.texturePath = texturePath
        this.filePath = filePath
        this.renderElem = renderElem
        this.init()
    }

    animateModelMove() {
        if (this.modelMoveAnimationSettings.direction === 'right') {
            this.model.rotation.y += this.modelMoveAnimationSettings.value

            if (this.model.rotation.y > this.modelMoveAnimationSettings.moreValue[0]) {
                this.modelMoveAnimationSettings.direction = 'left'
            }
        }

        if (this.modelMoveAnimationSettings.direction === 'left') {
            this.model.rotation.y -= this.modelMoveAnimationSettings.value

            if (this.model.rotation.y < this.modelMoveAnimationSettings.moreValue[1]) {
                this.modelMoveAnimationSettings.direction = 'right'
            }
        }
    }

    animateScene() {
        this.renderer.render(this.scene, this.camera);
        this.animateModelMove()
        requestAnimationFrame(this.animateScene.bind(this));
    }

    async setTextureOnModel() {
        const texture = textureLoader.load(this.texturePath)
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.rotation = 1.45
        texture.opacity = .1
        texture.repeat.set(1, 20);
        this.model?.children.forEach(child => {
            if (child.isMesh) {
                child.material.map = texture
                child.material.needsUpdate = true
            }
        });
    }

    init() {
        if (!this.renderElem) {
            return
        }
        this.renderElem.innerHTML = ''
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(10.2, this.renderElem.offsetWidth / this.renderElem.offsetHeight, 1, 5000)
        this.camera.position.z = 1000
        
        let light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 2)
        light1.position.set(0, 1, 0)
        this.scene.add(light1)
        
        let light2 = new THREE.DirectionalLight(0xffffff, 1.5)
        light2.position.set(0, 1, 0)
        this.scene.add(light2)
        
        let light3 = new THREE.DirectionalLight(0xffffff, 0.8)
        light3.position.set(0, -3, 0)
        this.scene.add(light3)
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        
        this.renderer.setSize(this.renderElem.offsetWidth, this.renderElem.offsetHeight)
        this.renderElem.appendChild(this.renderer.domElement)
        
        if (this.orbitControlEnabled) {
            this.controls = new THREE.OrbitControls(this.camera,  this.renderer.domElement);
            this.controls.enableZoom = false;
            this.controls.enablePan = false;
        }

        fbxLoader.load(this.filePath, (obj) => {
            this.model = obj
            this.model.rotation.x += this.modelInitialRotation.x
            this.model.rotation.y += this.modelInitialRotation.y
            this.model.rotation.z += this.modelInitialRotation.z
            this.scene.add(this.model)
            this.animateScene()
            this.renderElem.classList.add('is-loaded')
            this.setTextureOnModel()
        })

        // this.renderElem.addEventListener('wheel', (event) => {
        //     event.preventDefault()
        //     const axis = new THREE.Vector3(0, 1, 0).normalize();
        //     const speed = event.deltaY * 0.001;
        //     this.model.rotateOnAxis(axis, speed)
        // })
    }
}