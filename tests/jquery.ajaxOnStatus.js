QUnit.module( "jQuery ajaxOnStatus-Observer" );

QUnit.test("Events", function( assert ) {
    var stat = "EV";
    var callsCount = 0;
    var handler = $.ajaxOnStatus(stat, function(){ callsCount++ });

    assert.equal(callsCount, 0, "Ein event darf nicht automatisch aufgerufen werden");
    handler.trigger(11);
    assert.equal(callsCount, 0, "Ein nicht registrierte Event getriggert");

    handler.trigger(stat);
    assert.equal(callsCount, 1, "Event wurde nicht getriggert");

    handler.trigger(stat);
    assert.equal(callsCount, 2, "Event muss jedes Mal getriggert werden");

});

QUnit.test("Attributes prüfen", function( assert ) {
    var stat = "AP";
    var args = {};
    var handler = $.ajaxOnStatus(stat, function(a, b){
        args = [a, b];
    });

    handler.trigger(stat, "foo", "bar");
    assert.deepEqual(args, ["foo", "bar"]);
});

QUnit.test("Mehrere handlers für ein Statuscode", function( assert ) {
    var stat = "MH";
    var callsCount = 0;
    var handler = $.ajaxOnStatus(stat, function(){ callsCount++; });

    $.ajaxOnStatus(stat, function(){
        callsCount++;
    });

    handler.trigger(stat);
    assert.equal(callsCount, 2);

});

QUnit.test("AJAX", function( assert ) {
    var done = assert.async();
    var stat = "Server Error";


    function doRequest(status){
        var url = "/tests/ajaxOnStatus/" + status;
        $.mockjax({ url: url, status: status });
        $.ajax({ url: url });
    }

    $.ajaxOnStatus(stat, function(event, xhr){
        assert.equal(arguments.length, 3);
        assert.equal(xhr.status, stat);
        done();
    });

    assert.expect( 2 );
    doRequest(stat);

});