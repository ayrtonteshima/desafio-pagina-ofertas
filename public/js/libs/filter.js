module.exports = function(_data) {
	
	"use strict";

	var listFilters = [];


	// Função que faz todo o trabalho de filtrar e ordenar por preço
	// Permite adicionar filtros conforme necessário
	var filter = function() {

		if(listFilters.length <= 0) {
			sort(_data);
			return _data;
		}

		var totallistFilters = listFilters.length;

		var count = 0;

		var rs = [];

		var f = {
			from: '',
			daily: 2
		}


		// Itera pelos dados
		for (var i = 0, t1 = _data.length; i < t1; i++) {


			// Itera pelos filtros
			for(var j = 0; j < totallistFilters; j++) {

				var field = _data[i][listFilters[j].name];


				// Se o campo for um array, ele procura entre os valores dele
				if(Array.isArray(field)) {

					if(field.indexOf(listFilters[j].value) != -1) {
						++count;
					}

				} else {

					if(field == listFilters[j].value) {
						++count;
					}
				}

			}

			// Se a linha combinar com todos os filtros, adiciona no resultado
			if(count >= totallistFilters) {
				rs.push(_data[i]);
			}

			count = 0;

		}
		sort(rs);
		return rs;

	};

	function sort(rs){
		rs.sort(function(a, b) {
			return a.price - b.price;
		});
		return void 0;
	}

	var getFilter = function(_filter) {

		var ind = -1;

		for (var i = 0, t1 = listFilters.length; i < t1; i++) {
			if(listFilters[i].name === _filter) {
				ind = i;
				break;
			}
		}

		return ind;
	};

	return {

		set: function(_filter){


			for(var f in _filter) {

				var ind = getFilter(f);

				if(ind == -1) {

					if(_filter.hasOwnProperty(f)) {

						listFilters.push({ name: f, value:_filter[f] });

					}

				} else {

					listFilters[ind].value = _filter[f];

				}


			}

			return void 0;

		},

		get: function(_filter){

			var ind = getFilter(_filter);

			if(ind !== -1) {
				return listFilters[ind].value;
			}

			return void 0;

		},

		clear: function(_filter){

			var ind = getFilter(_filter);

			if(ind != -1) {
				listFilters.splice(ind, 1);
			}

			return void 0;
		},

		clearAll: function(){

			listFilters = [];

			return void 0;

		},

		getResult: function(){
			return filter();
		}
	}

}