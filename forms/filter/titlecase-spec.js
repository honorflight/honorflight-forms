describe('titlecase', function() {

	beforeEach(module('hf'));

it( 'titlecase filter', function($filter) {
    var result;
    result = $filter('titlecase')( 'i am a test' );
    expect( result ).toEqual( 'I Am A Test' );

    result = $filter('titlecase')( 'I AM A TEST' );
    expect( result ).toEqual( 'I Am A Test' );

    result = $filter('titlecase')( '' );
    expect( result ).toEqual( '' );

    result = $filter('titlecase')( );
    expect( result ).toEqual( '' );

    result = $filter('titlecase')( 10 );
    expect( result ).toEqual( '10' );

    result = $filter('titlecase')( true );
    expect( result ).toEqual( 'True' );

    result = $filter('titlecase')( false );
    expect( result ).toEqual( 'False' );

    result = $filter('titlecase')( null );
    expect( result ).toEqual( '' );
});


});