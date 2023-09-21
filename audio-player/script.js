const audioPlayBtn = document.querySelector('.play');
const audioPauseBtn = document.querySelector('.pause');
const playNextAudio = document.querySelector('.play_next');
const textAuthor = document.querySelector('.single_author');
const textNameSingle = document.querySelector('.single_name');

let audio;
let numberSong = 0;

audioPlayBtn.addEventListener('click', playAudio);
audioPauseBtn.addEventListener('click', pauseAudio);
playNextAudio.addEventListener('click', () => {
    playNext();
    playAudio();
    console.log(1);
})

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

const soundLinks = [
    `./assets/music/Five_Finger_Death_Punch.mp3`,
    `./assets/music/OOMPH!.mp3`,
    `./assets/music/Skillet.mp3`,
    `./assets/music/Thousand_Foot_Krutch.mp3`,
    `./assets/music/Three_Days_Grace.mp3`
]

function playAudio() {

    if (!audio) {
        audio = new Audio();
        audio.src = soundLinks[numberSong];
        audio.play();
    }

    audio.src = soundLinks[numberSong];
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

function playNext() {
    if(!audio) {
        numberSong;
    } else {
        numberSong += 1;
    }

    if(numberSong > soundLinks.length - 1) {
        numberSong = 0;
    }

    textAuthor.textContent = soundsAuthor[numberSong];
    textNameSingle.textContent = soundsName[numberSong];
}

