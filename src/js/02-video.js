import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENTTIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay({ seconds }) {
  localStorage.setItem(CURRENTTIME_KEY, seconds);
}

console.log(localStorage.getItem(CURRENTTIME_KEY));

player.setCurrentTime(localStorage.getItem(CURRENTTIME_KEY));
