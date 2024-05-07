import { ThreeLampScene } from '@/resources/ts/scripts/threeLampScene'

export async function initThreeObjects() {
    function getElementOffsetTop(selector: string) {
        let offset = 0
        let element = document.querySelector(selector)

        if (element) {
            offset =
                element.getBoundingClientRect().top +
                window.scrollY -
                element.getBoundingClientRect().height
        }

        return offset
    }

    const mainRightLamp: Record<any, any> = new ThreeLampScene({
        texturePath: `/public/models/demo-model/textures/metal-min.jpg`,
        filePath: `/public/models/demo-model/model.fbx`,
        renderElem: document.querySelector('.three-lamp--main-right'),
        modelInitialRotation: {
            x: -0.6,
            z: -0.4,
            y: 0,
        },
    } as any)

    const mainLeftLamp: Record<any, any> = new ThreeLampScene({
        texturePath: `/public/models/demo-model/textures/metal-min.jpg`,
        filePath: `/public/models/demo-model/model.fbx`,
        renderElem: document.querySelector('.three-lamp--main-left'),
        modelInitialRotation: {
            x: -0.8,
            z: 0.4,
            y: 0,
        },
        modelMoveAnimationSettings: {
            direction: 'right',
            axis: 'y',
            value: 0.001,
            moreValue: [1, -1],
        },
    } as any)

    const mainBannerLamp: Record<any, any> = new ThreeLampScene({
        texturePath: `/public/models/demo-model/textures/metal-min.jpg`,
        filePath: `/public/models/demo-model/model.fbx`,
        renderElem: document.querySelector('.three-lamp--main-banner'),
        modelInitialRotation: {
            x: 0.6,
            z: 0.4,
            y: 0,
        },
        modelMoveAnimationSettings: {
            direction: 'right',
            axis: 'y',
            value: 0.00054,
            moreValue: [0.7, -0.6],
        },
    } as any)

    const subscribeLeftLamp: Record<any, any> = new ThreeLampScene({
        texturePath: `/public/models/demo-model/textures/metal-min.jpg`,
        filePath: `/public/models/demo-model/model.fbx`,
        renderElem: document.querySelector('.three-lamp--subscribe-left'),
        modelInitialRotation: {
            x: -3.6,
            z: -0.4,
            y: 0,
        },
        modelMoveAnimationSettings: {
            direction: 'left',
            axis: 'y',
            value: 0.00054,
            moreValue: [1, -1],
        },
    } as any)

    const subscribeRightLamp: Record<any, any> = new ThreeLampScene({
        texturePath: `/public/models/demo-model/textures/metal-min.jpg`,
        filePath: `/public/models/demo-model/model.fbx`,
        renderElem: document.querySelector('.three-lamp--subscribe-right'),
        modelInitialRotation: {
            x: -0.09,
            z: -0.4,
            y: 0,
        },
    } as any)

    const footerLamp: Record<any, any> = new ThreeLampScene({
        texturePath: `/public/models/demo-model/textures/metal-min.jpg`,
        filePath: `/public/models/demo-model/model.fbx`,
        renderElem: document.querySelector('.three-lamp--footer'),
        modelInitialRotation: {
            x: -2.2,
            z: 0.4,
            y: 0,
        },
        modelMoveAnimationSettings: {
            direction: 'right',
            axis: 'y',
            value: 0.00054,
            moreValue: [0.7, -0.6],
        },
    } as any)

    let lastKnownScrollPosition = 0
    let deltaY = 0
    let footerOffseTop = getElementOffsetTop('.js-app-footer')
    let subscribeBlockOffsetTop = getElementOffsetTop('.js-subscribe-block')

    function moveThreeObjectsOnScroll(event: any) {
        let ticking = false

        if (!ticking) {
            window.requestAnimationFrame(() => {
                deltaY = window.scrollY - lastKnownScrollPosition
                lastKnownScrollPosition = window.scrollY

                if (window.scrollY > 0) {
                    if (mainLeftLamp.model) {
                        mainLeftLamp.model.rotation.x += deltaY * 0.0016
                        mainLeftLamp.model.rotation.z -= deltaY * 0.0018
                    }

                    if (mainRightLamp.model) {
                        mainRightLamp.model.rotation.x -= deltaY * 0.0025
                    }

                    if (mainBannerLamp.model) {
                        mainBannerLamp.model.rotation.x -= deltaY * 0.002
                    }

                    if (subscribeLeftLamp.model) {
                        subscribeLeftLamp.model.rotation.x -= deltaY * 0.002
                    }

                    if (subscribeRightLamp.model && window.scrollY > subscribeBlockOffsetTop) {
                        subscribeRightLamp.model.rotation.x -= deltaY * 0.002
                    }

                    if (footerLamp.model && window.scrollY > footerOffseTop) {
                        footerLamp.model.rotation.x += deltaY * 0.002
                    }
                }
                ticking = false
            })
            ticking = true
        }
    }

    document.removeEventListener('scroll', moveThreeObjectsOnScroll)
    document.addEventListener('scroll', moveThreeObjectsOnScroll)
}
