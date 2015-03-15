;(function($){

    var eventRegister = {};
    var stat = function(){};

    function registerCallback(code, callback){
        if(!eventRegister[code]){
            eventRegister[code] = [];
        }
        eventRegister[code].push(callback);
    }

    function onStatus(code, callback){
        if(!code || !callback){
            return stat;
        }
        registerCallback(code, callback);
        return stat;
    }

    function argumentsToArray(args){
        var array = [];
        for ( var i=0; i < args.length; i++ ) {
            array.push(args[i]);
        }
        return array;
    }

    function _trigger(code){
        var methods = eventRegister[code] || [];
        var args = argumentsToArray(arguments);
        args.shift();
        $.each(methods, function(key, cb){
            cb.apply(this, args);
        });
    }

    function _flush(){
        eventRegister = [];
    }

    stat.trigger = _trigger;
    stat.flush = _flush;

    $.ajaxOnStatus = onStatus;

    $( document ).ajaxComplete(function(event, xhr){
        var arguments = argumentsToArray(arguments);
        var args = [xhr.status].concat(arguments);
        _trigger.apply(this, args);
    });

})(jQuery);