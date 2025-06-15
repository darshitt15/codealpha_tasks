const songs = [
    {
        title: "Kulosa",
        file: "songs/song.mp3",
        cover: "covers/cover.jpg"
    },
    {
        title: "LIKE JENNIE",
        file: "songs/LIKEJENNIE.mp3",
        cover: "covers/LIKEJENNIE.jpg"
    },
    {
        title: "ATTENTION",
        file: "songs/Attention.mp3",
        cover: "covers/attention.jpg"
    },
    {
        title: "DRIP",
        file: "songs/Drip.mp3",
        cover: "covers/Drip.jpg",
    }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.querySelector('.cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    audio.src = song.file;
    cover.src = song.cover;
    updateTimeDisplay();
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '&#10073;&#10073;';
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '&#9658;';
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;
    updateTimeDisplay();
});

progress.addEventListener('input', () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

audio.addEventListener('ended', () => {
    nextBtn.click(); // Auto-play next song when current ends
});

function updateTimeDisplay() {
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
}

function formatTime(time) {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

// Load first song on page load
loadSong(currentSong);
