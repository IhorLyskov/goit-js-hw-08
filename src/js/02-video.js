import Vimeo from '@vimeo/player';

const vimeoPlayer = new Vimeo('vimeo-player');

let vimeoPlayerTime = { 'ideoplayer-current-time': 0 };

vimeoPlayer
  .setCurrentTime(vimeoPlayerTime['ideoplayer-current-time'])
  .then(function (seconds) {
    console.log(seconds);
  })
  .catch(function (error) {
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

vimeoPlayer.on('timeupdate', function (data) {
  vimeoPlayerTime['ideoplayer-current-time'] = data.seconds;
  console.log(`on - ${vimeoPlayerTime['ideoplayer-current-time']}`);
});

vimeoPlayer.getVideoTitle().then(function (title) {
  console.log('title:', title);
  console.log(`Start time: ${vimeoPlayerTime['ideoplayer-current-time']}`);
});
