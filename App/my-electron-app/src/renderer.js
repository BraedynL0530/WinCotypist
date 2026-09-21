import './index.css';

const textElement = document.getElementById('text');
const settingsButton = document.getElementById('settings');

window.winCotypist.onBackendEvent((message) => {
  switch (message.type) {
    case 'caret':
      break;

    case 'completion':
      textElement.textContent = message.text;
      break;

    case 'hide':
      textElement.textContent = '';
      break;
  }
});

settingsButton.addEventListener('click', () => {
  window.winCotypist.openSettings();
});