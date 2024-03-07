'use strict';

const displayWatch = document.querySelector('.display__watch');
const resetWatchTab = document.querySelector('.reset');
const playPauseWatchTab = document.querySelector('.play-pause');
const timerTab = document.querySelector('.timer');
const stopWatchTab = document.querySelector('.stop_watch');
const displayTimer = document.querySelector('.display__timer');
const resetTimerTab = document.querySelector('.reset-timer');
const playPauseTimerTab = document.querySelector('.play__pause-timer');
const duration = document.getElementById('duration');

let timer;
let watchTimer;
let isWatchRunning = false;
let isTimerRunning = false;
let secs = 0;
let mins = 0;
let hrs = 0;
let milliSecs = 0;
let seconds = 300;

// Stop Watch

function startStopWatch() {
  if (isWatchRunning) {
    clearInterval(watchTimer);
    playPauseWatchTab.textContent = 'Start';
  } else {
    watchTimer = setInterval(updateWatch, 10);
    playPauseWatchTab.textContent = 'Stop';
  }
  isWatchRunning = !isWatchRunning;
}

function resetWatch() {
  clearInterval(watchTimer);
  isWatchRunning = false;
  secs = 0;
  mins = 0;
  playPauseWatchTab.textContent = 'Start';
  hrs = 0;
  milliSecs = 0;
  // updateWatch();
  displayWatch.innerHTML = '0s';
}

function updateWatch() {
  milliSecs++;
  if (milliSecs === 100) {
    milliSecs = 0;
    secs++;
  }
  if (secs === 60) {
    secs = 0;
    mins++;
  }
  if (mins === 60) {
    mins = 0;
    hrs++;
  }
  displayWatch.innerHTML =
    hrs +
    '<span>H</span>  ' +
    mins +
    '<span>M</span>  ' +
    secs +
    '<span>S</span>  ' +
    formatTime(milliSecs);
}

function formatTime(value) {
  return value < 10 ? '0' + value : value;
}

// Timer
function resetTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  seconds = parseInt(duration.value, 10) || 0;
  playPauseTimerTab.textContent = 'Start';
  updateTimer();
}

function updateTimer() {
  if (seconds <= 0) {
    clearInterval(timer);
    isTimerRunning = false;
    playPauseTimerTab.textContent = 'Start';
  } else {
    seconds--;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  displayTimer.textContent =
    formatTime(minutes) + 'm' + ' : ' + formatTime(remainingSeconds) + 's';

  // document.title = `${formatTime(minutes)} : ${formatTime(remainingSeconds)}`;
}

function startStopTimer() {
  if (isTimerRunning) {
    clearInterval(timer);
    playPauseTimerTab.textContent = 'Start';
  } else {
    timer = setInterval(updateTimer, 1000);
    playPauseTimerTab.textContent = 'Stop';
  }
  isTimerRunning = !isTimerRunning;
}

resetWatchTab.addEventListener('click', resetWatch);
playPauseWatchTab.addEventListener('click', startStopWatch);

resetTimerTab.addEventListener('click', resetTimer);
playPauseTimerTab.addEventListener('click', startStopTimer);

// Switching Tab
function openTab(tabId) {
  const selectedTab = document.getElementById(tabId);
  const tabs = document.querySelectorAll('.tab-content');
  const tabBtns = document.querySelectorAll('.tab_btn');
  tabs.forEach((tab) => (tab.style.display = 'none'));
  tabBtns.forEach((btn) => btn.classList.remove('active'));
  if (selectedTab) {
    selectedTab.style.display = 'flex';
  }
  const clickedButton = document.querySelector(`[data-tab="${tabId}"]`);
  if (clickedButton) {
    clickedButton.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab_btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const targetTabId = tab.getAttribute('data-tab');
      openTab(targetTabId);
    });
  });
  openTab(tabs[0].getAttribute('data-tab'));
});
