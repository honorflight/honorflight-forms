describe('valueOrNull', function() {

	beforeEach(module('hf'));

	it('should ...', inject(function($filter) {

		var filter = $filter('valueOrNull');

		var array = [
			{id: 1, name: "Hello", other_arg: 2},
			{id: 2, name: "Hello", other_arg: 2},
			{id: 3, name: "Hello", other_arg: null},
			{id: 4, name: "Hello", other_arg: 1},
		];

		var answer = [
			{id: 1, name: "Hello", other_arg: 2},
			{id: 2, name: "Hello", other_arg: 2},
			{id: 3, name: "Hello", other_arg: null},
		];



		expect(filter(array, "other_arg", 2)).toEqual(answer);

	}));

});