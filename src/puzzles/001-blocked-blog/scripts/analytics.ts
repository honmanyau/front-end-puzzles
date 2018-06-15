function checkId(id: string) {
  return id === '1024some2048api4096key';
}

interface ICallbackArg {
  init: () => void;
}

function initialiseAnalytics(id: string, callback: ({}: ICallbackArg) => void) {
  let idIsValid = checkId(id);

  if (idIsValid) {
    // Simulate delays
    (function downloadDelay() {
      let init = window.performance.now();

      while (window.performance.now() - init < 5000) {
        // Do nothing and block the thread for 5 seconds.
      }
    })();

    (function executeDelay() {
      let init = window.performance.now();

      while (window.performance.now() - init < 1000) {
        // Do nothing and block the thread for 1 seconds.
      }
    })();

    let analyticsApi = {
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

initialiseAnalytics('1024some2048api4096key', function(analyticsApi) {
  analyticsApi.init();
});
