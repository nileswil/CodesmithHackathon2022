console.log('in the popup!')

//UPDATE DOM
const winCounter = document.querySelector('#win-Counter');
const lossCounter = document.querySelector('#loss-Counter');

chrome.storage.local.get(['win'], function (result) {
  console.log('Win Value currently is ' + result.win);
  winCounter.textContent = result.win;
});

chrome.storage.local.get(['loss'], function (result) {
  console.log('Loss Value currently is ' + result.loss);
  lossCounter.textContent = result.loss;
});


// var enabled = false; //disabled by default
// const pokeball = document.querySelector('#pokeball')

// chrome.storage.local.get('enabled', data => {
//   enabled = !!data.enabled;
//   myButton.textContent = enabled ? 'Disable' : 'Enable';
// });

// myButton.onclick = () => {
//   enabled = !enabled;
//   myButton.textContent = enabled ? 'Disable' : 'Enable';
//   chrome.storage.local.set({ enabled: enabled });
// };


// pokeball.addEventListener('click', disable_ext);