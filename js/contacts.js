window.addEventListener('load', () => {
    var map;

    DG.then(function () {
        map = DG.map('map', {
            center: [55.685556, 37.296528],
            zoom: 16
        });

        DG.marker([55.685556, 37.296528]).addTo(map).bindPopup('Оружейные технологии');
    });
});
