"use strict";
(function () {
    var init = window.performance.now();
    while (window.performance.now() - init < 1000) {
        // Block the thread for way too long because this is a terrible analytics
        // company that is only interested in money and is unable to hire
        // decent developers
    }
})();
