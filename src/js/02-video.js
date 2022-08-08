import Vimeo from '@vimeo/player';
import _ from 'lodash';

const vimeoPlayer = new Vimeo('vimeo-player');

vimeoPlayer.setVolume(0);

const currentTime = Number(localStorage.getItem('videoplayer-current-time'));

window.addEventListener('load', function (event) {
  vimeoPlayer.setCurrentTime(currentTime).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'The time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        console.log('Some other error occurred');
    }
  });
});

vimeoPlayer.on(
  'timeupdate',
  _.throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
    console.log(data.seconds);
  }, 1000)
);

vimeoPlayer.getVideoTitle().then(function (title) {
  console.log('title:', title);
  console.log(`Start time: ${timeString(currentTime)}`);
});

function timeString(time) {
  const date = new Date(0);
  date.setSeconds(time);
  return date.toTimeString().slice(3, 8);
}
