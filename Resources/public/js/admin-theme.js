jQuery(document).ready(function ($) {

    //== aside menu
    var $body = $('body');

    $('.aside-menu-list-item').on('click', function (e) {

        var $thisSubmenu = $(this).children('.aside-menu-list-sub-menu');
        var $thisSiblingsListItem = $(this).siblings('.aside-menu-list-item');
        var $thisMenuListItem = $(this).closest('.aside-menu-list-item');
        var $hasSubMenu = $thisSubmenu.length;

        if ($hasSubMenu) {
            e.preventDefault();

            if ($(this).hasClass('active')) {
                $thisSubmenu.slideUp(function () {
                    $thisMenuListItem.removeClass('active');
                });
            } else {
                $thisSiblingsListItem.find('.aside-menu-list-sub-menu').slideUp(function () {
                    $('.aside-menu-list-item').removeClass('active');
                });
                $thisSubmenu.slideDown(function () {
                    $thisMenuListItem.addClass('active');
                });
            }

            if (!$body.hasClass('menu-expanded')) {
                $body.toggleClass('menu-expanded');
            }
        }
    });
    $('.aside-menu-list-sub-item').on('click', function (e) {
        e.stopPropagation();
    });
    $('.header-toggle-aside-menu').on('click', function (e) {
        e.preventDefault();

        $body.toggleClass('menu-expanded');
        $('.aside-menu-list-item').removeClass('active');
        $('.aside-menu-list-sub-menu').slideUp();
    });
});
