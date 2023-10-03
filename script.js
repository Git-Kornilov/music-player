"use strict";

const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Songs = cover
const songs = ["hey", "summer", "ukulele"];

// Keep track song
let songIndex = 0; // hey

// Update song details
const loadSong = function (song) {
  title.innerText = song;

  //   Put srs song
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

// Play song
const playSong = function () {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
};

// Stop song
const pauseSong = function () {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
};

// Previous song
const prevSong = function () {
  songIndex--;

  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong(songs[songIndex]);
  playSong();
};

// Next song
const nextSong = function () {
  songIndex++;

  if (songIndex > songs.length - 1) songIndex = 0;

  loadSong(songs[songIndex]);
  playSong();
};

// Update progress bar
const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
};

// Set progress
const setProgress = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Play addEventListener
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song addEventListener
nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

// Time song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);
