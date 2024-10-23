document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.ytp-play-progress').forEach(function(element) {
    element.style.background = 'red';
  });
});


setInterval(function() {
  document.querySelectorAll('.ytp-play-progress').forEach(function(element) {
    element.style.background = 'red';
  });
  document.querySelectorAll('.ytd-thumbnail-overlay-resume-playback-renderer#progress').forEach(function(element) {
    element.style.background = 'red';
  });
}, 99999999999999999999999999);

document.querySelectorAll('#background.ytd-masthead, ytd-masthead[frosted-glass=with-chipbar] #background.ytd-masthead').forEach(element => {
    element.style.background = 'var(--yt-spec-base-background)';
});

const elements = document.querySelectorAll('.ytd-thumbnail-overlay-resume-playback-renderer#progress');
elements.forEach(element => {
    element.style.background = 'red';
});