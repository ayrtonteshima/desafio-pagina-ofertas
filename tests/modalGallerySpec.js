"use strict";

var modalGallery = require('../public/js/libs/gallery.js');


describe("Teste modal fullscreen da galeria", function() {

    var el;

    var galleryContainerThumbs;


    beforeEach(function() {

        jasmine.getFixtures().fixturesPath = 'base/tests/fixtures';

        loadFixtures('modalGallery.html');

        modalGallery({
            el: '.modal-gallery',
            data: [{
                "id": 2,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Brasilia", "Campo Grande"],
                "daily": 5,
                "price": 2380
            }, {
                "id": 0,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Manaus", "Belém"],
                "daily": 5,
                "price": 2549
            }, {
                "id": 1,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Rio de Janeiro"],
                "daily": 5,
                "price": 2620
            }, {
                "id": 3,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Manaus"],
                "daily": 8,
                "price": 3549
            }, {
                "id": 7,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Rio de Janeiro"],
                "daily": 12,
                "price": 5120
            }, {
                "id": 8,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Brasilia", "Salvador", "Campo Grande"],
                "daily": 12,
                "price": 5380
            }, {
                "id": 4,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Rio de Janeiro", "São Paulo"],
                "daily": 8,
                "price": 3720
            }, {
                "id": 5,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Brasilia"],
                "daily": 8,
                "price": 3380
            }, {
                "id": 6,
                "title": "Noites em Vegas e Albuquerque",
                "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
                "from": ["Manaus", "Salvador", "Ilhéus", "Boa Vista", "Cuiabá"],
                "daily": 12,
                "price": 5549
            }]
        });

        el = $('.modal-gallery');

        galleryContainerThumbs = el.find('.modal-gallery-thumbs');
    });

    describe("Paginação thumbs", function() {

        it("Testa troca de imagem ao clicar e classe active na thumb", function() {

            var src = el.find(".modal-gallery-container").find("img").attr("src");

            galleryContainerThumbs.find('li:eq(3)').click(); 

            expect(src).not.toEqual(el.find(".modal-gallery-container").find("img").attr("src"));

            expect(galleryContainerThumbs.find('li:eq(3)')).toHaveClass('active');

        });

    });

    describe("Setas", function() {

        var galleryContainerThumbs;
        var timerCallback;

        beforeEach(function() {
            galleryContainerThumbs = el.find('.modal-gallery-thumbs');
            galleryContainerThumbs.find('li:eq(3)').click();
 
        });
  

        it("Botão esquerdo, verifica se trocou imagem", function() {

            var src = el.find(".modal-gallery-container").find("img").attr("src");

            el.find(".modal-gallery-btn-left").click();

            expect(src).not.toEqual(el.find(".modal-gallery-container").find("img").attr("src"));

        });


        it("Botão direito, verifica se trocou imagem", function() {

            var src = el.find('.modal-gallery-container').find('img').attr('src');

            el.find('.modal-gallery-btn-right').click();

            expect(src).not.toEqual(el.find('.modal-gallery-container').find('img').attr('src'));

        });

        it("Verifica se adicionou a classe active nas thumbs ao clicar na seta esquerda", function() {

            var ind = galleryContainerThumbs.find('.active').index();

            el.find('.modal-gallery-btn-left').click();

            expect(galleryContainerThumbs.find('.active').index()).toBe(ind - 1);

        });


        it("Verifica se adicionou a classe active nas thumbs ao clicar na seta direita", function() {

            var ind = galleryContainerThumbs.find('.active').index();

            el.find('.modal-gallery-btn-right').click();

            expect(galleryContainerThumbs.find('.active').index()).toBe(ind + 1);

        });

    });
});