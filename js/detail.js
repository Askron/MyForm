window.addEventListener('load', () => {
    window.addEventListener('resize', () => {
        jQuery(function(){
            if(!$.fn.imagezoomsl){
                $('.msg').show();
                return;
            }
             else $('.msg').hide();
            $('.product__img').imagezoomsl({
                 zoomrange: [1, 12],
                 zoomstart: 4,
                 innerzoom: true,
                 magnifierborder: "none"
            });
        });
    });

    jQuery(function(){
        if(!$.fn.imagezoomsl){
            $('.msg').show();
            return;
        }
         else $('.msg').hide();
        $('.product__img').imagezoomsl({
             zoomrange: [1, 12],
             zoomstart: 4,
             innerzoom: true,
             magnifierborder: "none"
        });
    });

    document.querySelectorAll('.product__tab').forEach((tab) => {
        tab.addEventListener('click', function () {
            if (!this.classList.contains('product__tab_active')) {
                let activeBtn = document.querySelector('.product__tab_active');
                let activeTab = document.querySelector('.product__content-elem_active');
                activeBtn.classList.remove('product__tab_active');
                this.classList.add('product__tab_active');
                activeTab.classList.remove('product__content-elem_active');
                document.querySelectorAll('.product__content-elem')[$(this).index()].classList.add('product__content-elem_active');

            }
        });
    });
});
