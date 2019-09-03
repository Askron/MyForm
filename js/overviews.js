window.addEventListener('load', () => {
    window.addEventListener('resize', () => {
        document.querySelectorAll('.overviews__video').forEach((v) => {
            let size = v.getBoundingClientRect();
            v.style.height = size.width * 9 / 16 + 'px';
        });
    });
    document.querySelectorAll('.overviews__video').forEach((v) => {
        let size = v.getBoundingClientRect();
        v.style.height = size.width * 9 / 16 + 'px';
    });
});
