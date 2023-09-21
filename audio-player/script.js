const audioPlayBtn = document.querySelector('.play');
const audioPauseBtn = document.querySelector('.pause');

let audio;

let numberSong = 0;

audioPlayBtn.addEventListener('click', playAudio);
audioPauseBtn.addEventListener('click', pauseAudio);

const soundsAuthor = [
    "Five Finger Death Punch",
    "OOMPH!",
    "Skillet",
    "Thousand Foot Krutch",
    "Three Days Grace"
];

const soundsName = [
    "Pick up behind you",
    "Tausend mann und ein befehl",
    "Rise up",
    "War of change",
    "Someone to talk to"
];

function playAudio() {
    if (!audio) {
        audio = new Audio();
        audio.src = `./assets/music/Five_Finger_Death_Punch.mp3`;
        // audio.currentTime = 0;
        audio.play();
        console.log(audio.currentTime);
    }

    // audio.src = `./assets/music/Five_Finger_Death_Punch.mp3`;
    audio.play();
    audioPlayBtn.classList.remove('visible');
    audioPlayBtn.classList.add('hidden');
    audioPauseBtn.classList.remove('hidden');
    audioPauseBtn.classList.add('visible');
}

function pauseAudio() {
    if(audio) {
        audio.pause();
        audioPlayBtn.classList.add('visible');
        audioPlayBtn.classList.remove('hidden');
        audioPauseBtn.classList.add('hidden');
        audioPauseBtn.classList.remove('visible');
    }
}