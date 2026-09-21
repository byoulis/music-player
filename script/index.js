const songsList = [
    {
        name: "Confident",
        artist: "Justin Bieber",
        src: "assets/1.mp3",
        cover: "assets/1.jpg"
    },
    {
        name: "No Pole",
        artist: "Don Toliver",
        src: "assets/2.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "Crazy Story",
        artist: "King Von",
        src: "assets/3.mp3",
        cover: "assets/3.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');
const volumeSlider = document.getElementById('volume');
const playlistItems = document.getElementById('playlist-items');
const playlistToggle = document.querySelector('.playlist-toggle');
const themeToggle = document.getElementById('theme-toggle');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    loadPlaylist();
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
    volumeSlider.addEventListener('input', () => {
        song.volume = volumeSlider.value;
        volumeSlider.previousElementSibling.classList.toggle('fa-volume-mute', song.volume === 0);
        volumeSlider.previousElementSibling.classList.toggle('fa-volume-up', song.volume > 0);
    });
    playlistToggle.addEventListener('click', () => {
        document.querySelector('.playlist').classList.toggle('active');
        playlistToggle.innerHTML = `<i class="fas fa-list"></i> ${document.querySelector('.playlist').classList.contains('active') ? 'Ocultar' : 'Playlist'}`;
    });
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        themeToggle.innerHTML = `<i class="fas fa-${document.body.classList.contains('light-theme') ? 'sun' : 'moon'}"></i>`;
    });
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function loadPlaylist() {
    playlistItems.innerHTML = '';
    songsList.forEach((song, index) => {
        const li = document.createElement('li');
        li.innerText = `${song.name} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSong = index;
            playMusic();
        });
        playlistItems.appendChild(li);
    });
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}