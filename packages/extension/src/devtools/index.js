
/* global chrome */

console.log('devtool');

// chrome.devtools.panels.create(
//   'DxOS',
//   null,
//   'devtools-main.html'
// );

let panelCreated = false;

// stop after 10 seconds
let checkCount = 0;
let loadCheckInterval;

function createPanel() {
  // stop trying if above 120 seconds or already made
  if (panelCreated || checkCount++ > 120) return;

  // Other dev tools may not have easy access to client, so they can set display flag to true manually.
  chrome.devtools.inspectedWindow.eval(
    '!!(window.__DXOS__);',
    (result, isException) => {
      // XXX how should we better handle this error?
      if (isException) console.log('DxOS devtools', isException);

      // already created or no client
      if (!result || panelCreated) return;

      // clear watcher
      if (loadCheckInterval) clearInterval(loadCheckInterval);
      panelCreated = true;

      chrome.devtools.panels.create(
        'DxOS',
        null,
        'main-panel.html'
      );
    },
  );
}

// Attempt to create panel on navigations as well
chrome.devtools.network.onNavigated.addListener(createPanel);

// Attempt to create panel once per second in case
// DxOS is loaded after page load
loadCheckInterval = setInterval(createPanel, 1000);

// Start the first attempt immediately
createPanel();
