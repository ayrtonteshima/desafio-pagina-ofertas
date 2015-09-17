"use strict";


var filterJS = require("../public/js/libs/filter.js");
var _ = require("underscore");

describe("Teste da lib filter", function(){

	var mockupOffers = {};
	var filter;

	beforeEach(function(){

		mockupOffers = [
		      {
		        "id": 2,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Brasilia",
		          "Campo Grande"
		        ],
		        "daily": 5,
		        "price": 2380
		      },
		      {
		        "id": 0,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Manaus",
		          "Belém"
		        ],
		        "daily": 5,
		        "price": 2549
		      },
		      {
		        "id": 1,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Rio de Janeiro"
		        ],
		        "daily": 5,
		        "price": 2620
		      },
		      {
		        "id": 3,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Manaus"
		        ],
		        "daily": 8,
		        "price": 3549
		      },
		      {
		        "id": 7,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Rio de Janeiro"
		        ],
		        "daily": 12,
		        "price": 5120
		      },
		      {
		        "id": 8,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Brasilia",
		          "Salvador",
		          "Campo Grande"
		        ],
		        "daily": 12,
		        "price": 5380
		      },
		      {
		        "id": 4,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Rio de Janeiro",
		          "São Paulo"
		        ],
		        "daily": 8,
		        "price": 3720
		      },
		      {
		        "id": 5,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Brasilia"
		        ],
		        "daily": 8,
		        "price": 3380
		      },
		      {
		        "id": 6,
		        "title": "Noites em Vegas e Albuquerque",
		        "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		        "from": [
		          "Manaus",
		          "Salvador",
		          "Ilhéus",
		          "Boa Vista",
		          "Cuiabá"
		        ],
		        "daily": 12,
		        "price": 5549
		      }
		    ];

	  	filter = filterJS(mockupOffers);

	});


	describe("Testa lib", function() {


		it("Métodos get e set", function(){

			filter.set({ from: 'Manaus' });

			expect(filter.get('from')).toEqual('Manaus');

		});


		it("Método get quando passa valor inválido", function(){

			expect(filter.get(123)).toBeUndefined();

		});


		it("Método get quando filtro troca de valor", function(){

			filter.set({ from: 'Manaus' });

			filter.set({ from: 'Rio de Janeiro' });

			filter.set({ from: 'Belém' });

			expect(filter.get('from')).toEqual('Belém');

		});

		it("Método clearAll", function() {

			filter.set({ from: 'Manaus' });

			filter.clearAll();

			expect(filter.get('from')).toBeUndefined();

		});


		it("Método clear", function(){

			filter.set({ from: 'Manaus', daily: 3 });

			filter.clear('from');

			expect(filter.get('from')).toBeUndefined();

		});


	});



	describe("Testa resultados", function(){

		describe("Filtro saída", function(){

			beforeEach(function(){

				filter.clearAll();

				filter.set({ from: 'Rio de Janeiro' });

			});


			it("Verifica se resultado está filtrado", function(){

				var c = 0;

				for(var i = 0, t = mockupOffers.length; i < t; i++) {

					if(mockupOffers[i].from.indexOf(filter.get('from')) != -1) {
						++c;
					}

				};

				expect(filter.getResult().length).toEqual(c);

			});

			it("Verifica ordenação por preço, menor para o maior", function(){

				var resultPrice = _.pluck(filter.getResult(), 'price');
				
				var copyResult = resultPrice.slice();


				expect(resultPrice).toEqual(copyResult.sort());


			});

		});



		describe("Filtro diária", function(){

			beforeEach(function(){

				filter.clearAll();

				filter.set({ daily: 2 });

			});

			it("Verifica se resultado está filtrado", function(){

				var c = 0;

				for(var i = 0, t = mockupOffers.length; i < t; i++) {

					if(mockupOffers[i].daily == filter.get('daily')) {
						++c;
					}

				};

				expect(filter.getResult().length).toEqual(c);

			});


			it("Resultado deve estar ordenado por preço, menor para o maior", function(){

				var resultPrice = _.pluck(filter.getResult(), 'price');

				var copyResult = resultPrice.slice();

				expect(resultPrice).toEqual(copyResult.sort());


			});

		});


		describe("Combinação do filtro Saída e Diária", function(){

			beforeEach(function(){

				filter.clearAll();

				filter.set({ from: 'Belém', daily: 5 });

			});


			it("Verifica se resultado está filtrado", function(){
				
				var rs = filter.getResult();

				var count = 0;

				for (var i = 0; i < rs.length; i++) {

					if(rs[i].from.indexOf(filter.get('from')) !== -1 && rs[i].daily == filter.get('daily')) {
						++count;
					}

				}

				expect(rs.length).toBe(count);


			});

			it("Resultado deve estar ordenado por preço, menor para o maior", function(){

				var resultPrice = _.pluck(filter.getResult(), 'price');

				var copyResult = resultPrice.slice();

				expect(resultPrice).toEqual(copyResult.sort());


			});

		});


		describe("Testa sem filtros", function(){

			it("Resultado deve trazer todas as opções", function(){

				filter.clearAll();

				expect(filter.getResult().length).toBe(mockupOffers.length);

			});

			it("Resultado deve estar ordenado por preço, menor para o maior", function(){

				var resultPrice = _.pluck(filter.getResult(), 'price');

				var copyResult = resultPrice.slice();

				expect(resultPrice).toEqual(copyResult.sort());


			});

		});

	});

});
