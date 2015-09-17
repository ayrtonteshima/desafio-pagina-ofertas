module.exports = function(configs) {

    "use strict";

    var data = configs.data;

    var el = $(configs.el);

    var galleryThumb = el.find('.modal-gallery-thumbs');

    var galleryContainer = el.find('.modal-gallery-container');

    var pos = 0;

    var total = galleryThumb.find('li').length;

    el.on('click', '.modal-gallery-btn-close', function() {
        el.fadeOut(200);
        resetGallery();
    });


    el.on('click', '.modal-gallery-btn', function() {

        if ($(this).hasClass('modal-gallery-btn-left')) {
            if (--pos < 0) {
                pos = 0;
            }
        } else {
            if (++pos >= total - 1) {
                pos = total - 1;
            }
        }

        setImage();


    });

    el.on('click', '.modal-gallery-thumb', function() {
        pos = $(this).index();
        setImage();
    });

    setImage();
    resizeModalGallery();


    function setImage() {

        var imgRef = galleryThumb.find('li:eq(' + pos + ')').find('img');

        var imgSrc = imgRef.data('src');

        var img = galleryContainer.find('img');

        imgRef.closest('li')
            .addClass('active')
            .siblings()
            .removeClass('active');

        img.stop()
            .fadeOut(100)
            .prop('src', imgSrc)
            .on('load', function() {
                $(this).stop()
                    .fadeIn(200);
            }).each(function() {
                if (this.complete) {
                    $(this).trigger('load');
                }
            });

    }


    function resetGallery() {
        pos = 0;
    }


    function resizeModalGallery() {

        var w = $(window).width();
        var h = w*0.5625;

        if(h < ($(window).height()-90)) {
            h = $(window).height()-90;
            w = h * 1.77777777777777777778;

        } else {

            if(w > 740) {

                if(h > ($(window).height()-90)) {
                    h = $(window).height()-90;
                    w = h * 1.77777777777777777778;
                }
                
            } else {
                w = 700;
                h = w * 0.5625;

            }

        }

        galleryContainer.css({
            height: h
        }).find('img').css({
            width: w,
            height: h - 20,
            left: -((w-$(window).width())/2)
        });
    }

    $(window).on('resize', function() {
        resizeModalGallery();
    });


    return {
        open: function(ind) {
            pos = ind;
            el.fadeIn();
            setImage();
            resizeModalGallery();
        }
    }
};
