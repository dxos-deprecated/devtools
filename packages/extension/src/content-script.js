
import Bridge from 'crx-bridge';
import { installHook } from './hook';

Bridge.setNamespace('dxos.devtools');
Bridge.allowWindowMessaging('dxos.devtools');

console.log('content-script');

// inject the hook
if (document instanceof HTMLDocument) {
  const script = document.createElement('script');
  script.textContent = `;(${installHook.toString()})(window)`;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}

// window.addEventListener('message', (event) => {
//   // Only accept messages from the same frame
//   if (event.source !== window) {
//     return;
//   }

//   const message = event.data;

//   // Only accept messages that we know are ours
//   if (typeof message !== 'object' || message === null ||
//       message.source !== 'my-devtools-extension') {
//     return;
//   }

//   Bridge.sendMessage('content.metrics.metric', message.data, 'devtools');
// });


// Bridge.onMessage('log', async (message) => {
//   const { sender, timestamp } = message;
//   console.log(`log: ${sender.name}`, timestamp, message); // > devtools@681   1509269137197
// });
