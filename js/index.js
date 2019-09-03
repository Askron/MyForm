window.addEventListener('load', () => {
    $('.reviews__items').owlCarousel({
        loop:true,
        margin:10,
        pagination:true,
        nav: true,
        navText: ['test1', 'test2'],
        dots: true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    $('.aside-goods, .aside-reviews, .aside-articles').owlCarousel({
        loop:true,
        margin:10,
        responsive:{
            0:{
                items:1
            }
        }
    });

    document.querySelectorAll('.aside__btn_left').forEach((btn) => {
        btn.addEventListener('click', function () {
            $(this.closest('.aside__block').querySelector('.owl-carousel')).trigger('prev.owl.carousel');
        });
    });

    document.querySelectorAll('.aside__btn_right').forEach((btn) => {
        btn.addEventListener('click', function () {
            $(this.closest('.aside__block').querySelector('.owl-carousel')).trigger('next.owl.carousel');
        });
    });

    document.querySelector('.menu-btn').addEventListener('click', () => {
        let menuWrap = document.querySelector('.mobile-menu__wrap');
        if (menuWrap.getAttribute('data-opened') === 'false') {
            menuWrap.style.display = 'flex';
            menuWrap.setAttribute('data-opened', 'true');
        } else {
            menuWrap.style.display = 'none';
            menuWrap.setAttribute('data-opened', 'false');
        }
    });

    document.querySelector('.mobile-menu__wrap').addEventListener('click', function () {
        this.style.display = 'none';
        this.setAttribute('data-opened', 'false');
    });

    document.querySelector('.mobile-menu').addEventListener('click', function (e) {
        e.stopPropagation();
    });

    document.querySelector('.mobile-menu__btn-close').addEventListener('click', function () {
        let menuWrap = document.querySelector('.mobile-menu__wrap');
       menuWrap.style.display = 'none';
       menuWrap.setAttribute('data-opened', 'false');
    });

    document.querySelectorAll('.reviews__nav-btn').forEach(function (elem) {
        elem.addEventListener('click', function () {
            document.querySelector('.reviews__nav-btn_active').classList.remove('reviews__nav-btn_active');
            this.classList.add('reviews__nav-btn_active');
            $('.owl-carousel').trigger('to.owl.carousel', [$(this).index()*2, 100]);
        });
    });
});
