const videoPlayer = document.querySelector('video');
console.log(videoPlayer);
const playBtn = document.querySelector('.play-btn');
const playBtnIcon = playBtn.querySelector('img');
const volumeBtn = document.querySelector('.volume-btn');
const volumeBtnIcon = volumeBtn.querySelector('.volume-icon');
const volumeSlide = document.querySelector('.volume-range');
const progressContainer = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const currentTimeTxt = document.querySelector('.current-time');
const duationTxt = document.querySelector('.duration');
const fullScreenBtn = document.querySelector('.fullscreen-btn');

playBtn.addEventListener('click', handlePlayPause);
videoPlayer.addEventListener('timeupdate', handleProgress);
videoPlayer.addEventListener('click', handlePlayPauseWhithScreen);
volumeSlide.addEventListener('input', handleVolumeChange);
volumeBtn.addEventListener('click', handleMute);
progressContainer.addEventListener('click', setProgress);
fullScreenBtn.addEventListener('click', handleFullScreen)
console.dir(videoPlayer.requestFullscreen)

function handleFullScreen(){
    if(videoPlayer.requestFullscreen){
        videoPlayer.requestFullscreen();
    }
    else if(videoPlayer.webkitRequestFullscreen){
        videoPlayer.webkitRequestFullscreen();
    }
    else if(videoPlayer.msRequestFullscreen){
        videoPlayer.msRequestFullscreen();
    }
}

function handlePlayPause() {
    console.dir(videoPlayer.paused)
    if (videoPlayer.paused) {
        videoPlayer.play();
    }
    else {
        videoPlayer.pause();
    }
    update();
}

function handlePlayPauseWhithScreen() {
    if (videoPlayer.paused) videoPlayer.play()
    else videoPlayer.pause();
    update()
}

function handleVolumeChange(event) {
    videoPlayer.volume = event.target.value / 100;
}

function handleMute() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        volumeBtnIcon.src = './ressources/unmute.svg';
    } else {
        videoPlayer.muted = true;
        volumeBtnIcon.src = './ressources/mute.svg';
    }
    update()
}

function handleProgress() {
    const { currentTime, duration } = videoPlayer;
    progressBar.style.width = `${(currentTime / duration) * 100}%`;
    convertToTime(videoPlayer.currentTime, currentTimeTxt);
    convertToTime(videoPlayer.duration, duationTxt);
}

function setProgress(e) {
    const rect = progressContainer.getBoundingClientRect();
    console.log(rect);
    width = e.clientX;
    const x = rect.width;
    console.log(((x / width) * videoPlayer.duration));
    progressBar.style.width = `${((x/width)* videoPlayer.duration)}`
}

function convertToTime(duration, element) {
    const hours = Math.trunc(duration / 3600);
    const minutes = Math.trunc((duration - (hours * 3600)) / 60);
    let secondes = Math.trunc((duration - (hours * 3600)) % 60);
    if (secondes < 10) secondes = `0${secondes}`;
    element.textContent = `${hours && `${hours}:`}${minutes}:${secondes}`;
}

function update() {
    if (videoPlayer.paused) {
        playBtnIcon.src = './ressources/play.svg';
    } else {
        playBtnIcon.src = './ressources/pause.svg';
    }
    console.log('is updated!');
}