(function ($) {
    const PrimaryMenu = () => {
        //primary-navigation-open
        let openMenuBtn = $('.open-primary-menu'),
            closeMenuBtn = $('.close_menu_btn'),
            overlayWrap = $('.resp_menu_dark')
        ;

        openMenuBtn.on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('primary-navigation-open lock-scrolling');
        });
        closeMenuBtn.on('click', function (e) {
            e.preventDefault();
            $('body').removeClass('primary-navigation-open lock-scrolling')
        })
        overlayWrap.on('click', function (e) {
            closeMenuBtn.trigger('click');
        })
        $(document).on('keydown', function (e) {
            if (!$('body').hasClass('primary-navigation-open')) return;
            let escKey = e.keyCode === 27;
            if (escKey) {
                e.preventDefault();
                closeMenuBtn.trigger('click');
            }
        })
    }
    window.addEventListener('load', function () {
        PrimaryMenu();
        $('body').addClass('__loaded');
    });
}(jQuery));
