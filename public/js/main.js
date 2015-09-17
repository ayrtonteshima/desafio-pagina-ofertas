
window.$ = require('jquery');

load(0, init);

function init(rs) {

	"use strict";

	// Include por Browserify
	var _ = require('underscore');
	var Handlebars = require('handlebars');
	var slick = require('slick-carousel');
	var filter = require('./libs/filter.js')(rs);
	var modalGallery = require('./libs/gallery.js');


	var dom = (function(){
		var cache = {};
		return {
			get: function(el) {
				if(!cache[el]) {
					cache[el] = $(el);
				}
				return cache[el];
			}
		}
	}());

	var tpl_option = $("#tpl_option").html();
	
	start();

	function start() {

		gallery();

		fillCombos();

		fillList();

		bindEvents();	

	}


	function gallery() {

		var ind = 0;

		dom.get('.container-full-banners').slick({
			prevArrow: null,
			nextArrow: null
		});

		dom.get('.container-full-banners').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			dom.get('.container-thumbs').find('.active').removeClass('active');
			dom.get('.container-thumbs').find('li:eq('+ nextSlide +')').addClass('active');
		});

		dom.get('.container-thumbs').on('click', 'li', function() {
			ind = $(this).index();
			if(ind == 9) {
				openModalGallery();
			} else {
				dom.get('.container-full-banners').slick('slickGoTo', ind);
			}
		});


		dom.get('.container-banners').on('click', 'figure', function() {
			openModalGallery();
		});

		function openModalGallery() {
			var imgs = _.map(rs, function(img) {
				return {
					big: img,
					small: img
				}
			});

			modalGallery({
				el: '.modal-gallery',
				data: imgs

			}).open(ind);
		}


		function marcaThumb() {
			dom.get('.container-thumbs').find('.active').removeClass('active');
			dom.get('.container-thumbs').find('li:eq('+ currentSlide +')').addClass('active');
		}

	}


	function fillCombos() {

		var cities = _.unique(_.flatten(_.pluck(filter.getResult(), 'from'))).sort();
		var daily = _.unique(_.pluck(filter.getResult(), 'daily'));

		daily.sort(function(a, b){ return a - b; });

		dom.get('#combo_from').html(fill(cities));
		dom.get('#combo_daily').html(fill(daily));


		function fill(values) {

			var html = '<option value="-1">Escolha</option>';

			for (var i = 0, t1 = values.length; i < t1; i++) {
				html = html + '<option value="'+values[i]+'">'+values[i]+'</option>';
			}

			return html;
		}

		

	}

	function fillList() {
		var html = '';
		var comp;

		dom.get('.list-options').html('');

		$(filter.getResult()).each(function(i){
			comp = Handlebars.compile(tpl_option);
			
			dom.get('.list-options')
				.append(comp(this))
				.find('.option:last')
				.stop()
				.delay(200 * i)
				.animate({
					opacity: 1
				}, 200);

		});
	}

	function bindEvents() {

		dom.get('.combo_filter').on('change', function() {

			var field = $(this).data('field');
			var val = $(this).val();

			if($(this).val() == -1) {

				filter.clear(field);

			} else {

				var o = {};

				o[field] = val;

				filter.set(o);

			}

			fillList();

		});

	}

}


function load(id, cb) {
	$.ajax({
		url: '/offers/' + id,
		dataType: 'json',
		cache: false,
		success: function(rs) {
			cb(rs);
		},

		error: function(err) {
			console.log(err);
		}
	})
}


