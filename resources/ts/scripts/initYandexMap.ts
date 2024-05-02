export async function initContactsMap() {
    ymaps.ready(() => {
        const map = new ymaps.Map('contacts-map', {
            center: [59.94422, 30.354145],
            zoom: 12,
            controls: [],
        })

        const addressMarker = new ymaps.Placemark(
            [59.94422, 30.354145],
            {
                balloonContent: '',
                iconCaption: '',
            },
            {
                iconLayout: 'default#imageWithContent',
                iconImageOffset: [-15, -15],
                iconImageHref: 'img/geo-marker.svg',
                iconImageSize: [30, 30],
            }
        )

        map.geoObjects.add(addressMarker)

        // disables
        map.behaviors.disable('scrollZoom')
        map.behaviors.disable('drag')
    })
}
