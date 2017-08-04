var string_concat = function () {
    var t0 = performance.now();
    
    var arrayLength = 50000;
    var results = new Array(arrayLength);
    
    for (var i = 1; i <= arrayLength; i++) {            
        var s1 = "string" + i;
        var s2 = "concatenation" + i;
        var s3 = "operation" + i;       

        var result = s1 + s2 + s3 + i;
        results.push(result);
    }
    
    results = 0;
    
    var t1 = performance.now();
    return t1 - t0;
}

var traverse_array = function () {
    var t0 = performance.now();
    
    var sum = 0;
    var arrayLength = 20000;
    var array = new Array(arrayLength);
    
    for (var i = 0; i < array.length; i++) {            
        array[i] = i;
    }
    
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            sum += array[(i + j) % arrayLength];
        }
    }
    
    array = 0;
    
    var t1 = performance.now();
    return t1 - t0;
}

var DECIMAL_PRECISION = 4;

$(document).ready(function () {
    var vm = {
        string_concat_time_js: ko.observable('...'),
        string_concat_time_c: ko.observable('...'),
        string_concat_time_c_js: ko.observable('...'),
        traverse_array_time_js: ko.observable('...'),
        traverse_array_time_c: ko.observable('...'),
        traverse_array_time_c_js: ko.observable('...'),
    };
    
    ko.applyBindings(vm);
    
    setTimeout(function () {
        vm.string_concat_time_js(string_concat().toFixed(DECIMAL_PRECISION) + 'ms');
        
        var t0 = performance.now();
        vm.string_concat_time_c(Module.ccall('string_concat').toFixed(DECIMAL_PRECISION) + 'ms');
        var t1 = performance.now();
        
        vm.string_concat_time_c_js((t1 - t0).toFixed(DECIMAL_PRECISION) + 'ms');
        
        vm.traverse_array_time_js(traverse_array().toFixed(DECIMAL_PRECISION) + 'ms');
        
        var t0 = performance.now();
        vm.traverse_array_time_c(Module.ccall('traverse_array').toFixed(DECIMAL_PRECISION) + 'ms');
        var t1 = performance.now();
        
        vm.traverse_array_time_c_js((t1 - t0).toFixed(DECIMAL_PRECISION) + 'ms');
    }, 2000);
})
