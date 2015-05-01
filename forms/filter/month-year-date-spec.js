describe('monthYearDate', function() {

	beforeEach(module('hf'));

	it('should ...', inject(function($filter) {

    var filter = $filter('monthYearDate');

    var date = new Date();
    date.setYear(2000);
    date.setMonth(3);

    expect(filter('032012')).toEqual('03/2012');
    expect(filter('011999')).toEqual('01/1999');
    expect(filter(date)).toEqual('03/2000');

	}));

});