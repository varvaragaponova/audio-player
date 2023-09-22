const audioPlayBtn = document.querySelector('.play');
const audioPauseBtn = document.querySelector('.pause');
const playNextAudio = document.querySelector('.play_next');
const playPrevAudio = document.querySelector('.play_prev');
const textAuthor = document.querySelector('.single_author');
const textNameSingle = document.querySelector('.single_name');
const albumImg = document.querySelector('.album');
const backgroundImg = document.querySelector('.filter_img');
const progressRange = document.querySelector('.progress');
const currentTimeNow = document.querySelector('.time_now');
const timeAudio = document.querySelector('.time_all');
const volumeRange = document.querySelector('.volume_range');
const volumeBtn = document.querySelector('.volume');

let audio;
let numberSong = 0;
let timeAudioAll;

window.addEventListener("load", () => {
    if(audio) {
        timeAudio.textContent = getTimeCodeFromNum(audio.duration);
    } else {
        timeAudio.textContent = '03:08';
    }
})

audioPlayBtn.addEventListener('click', () => {
    playAudio();
});
audioPauseBtn.addEventListener('click', pauseAudio);

playNextAudio.addEventListener('click', () => {
    playNext();
    playAudio();
});

playPrevAudio.addEventListener('click', () => {
    playPrev();
    playAudio();
});

progressRange.addEventListener("input", (e) => {
    currentTimeAudio(e);
});

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
];

const imgForSingle = [
    `./assets/images/five-finger.jpg`,
    `./assets/images/oomph!.jpg`,
    `./assets/images/Skillet.jpg`,
    `./assets/images/tfk1.jpg`,
    `./assets/images/tdg.jpg`
]

function playAudio() {

    if (!audio) {
        audio = new Audio();
        audio.src = soundLinks[numberSong];
        audio.play();
    }

    audio.src = soundLinks[numberSong];
    audio.currentTime = 0;
    audio.play();
    audioPlayBtn.classList.remove('visible');
    audioPlayBtn.classList.add('hidden');
    audioPauseBtn.classList.remove('hidden');
    audioPauseBtn.classList.add('visible');

    setInterval(() => {
        progressRange.value = (audio.currentTime * 100) / audio.duration;
        currentTimeNow.textContent = getTimeCodeFromNum(audio.currentTime);
        timeAudio.textContent = getTimeCodeFromNum(audio.duration);
    }, 500);
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
    }

    numberSong += 1;

    if(numberSong > soundLinks.length - 1) {
        numberSong = 0;
    }

    textAuthor.textContent = soundsAuthor[numberSong];
    textNameSingle.textContent = soundsName[numberSong];
    albumImg.src = imgForSingle[numberSong];
    backgroundImg.src = imgForSingle[numberSong];

    timeAudio.textContent = getTimeCodeFromNum(audio.duration);
}

function playPrev() {

    if(numberSong <= 0) {
        numberSong = soundLinks.length;
    }
    numberSong = numberSong - 1;

    textAuthor.textContent = soundsAuthor[numberSong];
    textNameSingle.textContent = soundsName[numberSong];
    albumImg.src = imgForSingle[numberSong];
    backgroundImg.src = imgForSingle[numberSong];

    timeAudio.textContent = getTimeCodeFromNum(audio.duration);
}

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    return `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`;
}

function currentTimeAudio(e) {
    audio.currentTime = (e.target.value / 100) * audio.duration;
    setInterval(() => {
        currentTimeNow.textContent = getTimeCodeFromNum(audio.currentTime);
    }, 500);
}

volumeBtn.addEventListener("click", () => {

    if(audio && volumeBtn.classList.contains("volume_visible")) {
        audio.muted = true;
        volumeBtn.classList.remove("volume_visible");
        volumeBtn.classList.add("volume_none");
    } else if(audio && volumeBtn.classList.contains("volume_none")) {
        audio.muted = false;
        volumeBtn.classList.add("volume_visible");
        volumeBtn.classList.remove("volume_none");
    }
});

volumeRange.addEventListener("input", (e) => {
    console.log(e);
    audio.volume = e.target.value / 100;
    if(audio.muted == true) {
        volumeRange.value = "0";
    }
});