const dice = () => {
  const dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  document.getElementById("number").innerHTML = dice;
}

const statusElem = document.querySelector('#status p');
const wakeButton = document.querySelector('[data-status]');
const reaquireCheck = document.querySelector('#reaquire');

const changeUI = (status = 'acquired') => {
  const acquired = status === 'acquired' ? true : false;
  wakeButton.dataset.status = acquired ? 'on' : 'off';
  wakeButton.textContent = `Turn Wake Lock ${acquired ? 'OFF' : 'ON'}`;
  statusElem.textContent = `Wake Lock ${acquired ? 'is active!' : 'has been released.'}`;
}

let isSupported = false;
if ('wakeLock' in navigator) {
  isSupported = true;
  statusElem.textContent = 'Screen Wake Lock API supported 🎉';
} else {
  wakeButton.disabled = true;
  statusElem.textContent = 'Wake lock is not supported by this browser.';
}

if (isSupported) {
  let wakeLock = null;
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      changeUI();
      wakeLock.addEventListener('release', () => {
        changeUI('released');
      });
    } catch {
      wakeButton.dataset.status = 'off';
      wakeButton.textContent = 'Turn Wake Lock ON';
      statusElem.textContent = `${err.name}, ${err.message}`;
    }
  } // requestWakeLock()

  wakeButton.addEventListener('click', () => {
    if (wakeButton.dataset.status === 'off') {
      requestWakeLock();
    } else { // if it's on release it
      wakeLock.release()
      .then(() => {
        wakeLock = null;
      })
    }
  })

  const handleVisibilityChange = () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      requestWakeLock();
    }
  }

  reaquireCheck.addEventListener('chage', () => {
    if (reaquireCheck.checked) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    } else {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  });
} // isSupported