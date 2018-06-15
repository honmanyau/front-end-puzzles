"use strict";
function checkId(id) {
    return id === '1024some2048api4096key';
}
function initialiseAnalytics(id, callback) {
    var idIsValid = checkId(id);
    if (idIsValid) {
        // Simulate delays
        (function downloadDelay() {
            var init = window.performance.now();
            while (window.performance.now() - init < 5000) {
                // Do nothing and block the thread for 5 seconds.
            }
        })();
        (function executeDelay() {
            var init = window.performance.now();
            while (window.performance.now() - init < 1000) {
                // Do nothing and block the thread for 1 seconds.
            }
        })();
        var analyticsApi = {
            init: function init() {
                // Does things!
            }
        };
        callback(analyticsApi);
    }
    else {
        throw 'TypeError: NetworkError when attempting to fetch resource.';
    }
}
initialiseAnalytics('1024some2048api4096key', function (analyticsApi) {
    analyticsApi.init();
});
