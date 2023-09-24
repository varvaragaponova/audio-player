console.log("Итоговая оценка: 70\nВёрстка +10(есть кнопка Play/Pause, кнопки 'Вперёд' и 'Назад', прогресс-бар, отображается название и автор трека, в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс)\nКнопка Play/Pause +10(есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека, внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек\nПри кликах по кнопкам 'Вперёд' и 'Назад' переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\nПри смене аудиотрека меняется изображение - обложка аудиотрека +10\nПрогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\nОтображается продолжительность аудиотрека и его текущее время проигрывания +10\nОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10");

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
    audioEnded();
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

volumeRange.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
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

    audio.play();

    audioPlayBtn.classList.remove('visible');
    audioPlayBtn.classList.add('hidden');
    audioPauseBtn.classList.remove('hidden');
    audioPauseBtn.classList.add('visible');

    setInterval(() => {
        progressRange.value = (audio.currentTime * 100) / audio.duration;
        currentTimeNow.textContent = getTimeCodeFromNum(audio.currentTime);
        if(getTimeCodeFromNum(audio.duration) == 'NaN:NaN') {
            timeAudio.textContent = "00:00";
        } else {
            timeAudio.textContent = getTimeCodeFromNum(audio.duration);
        }
    }, 500);
}

function audioEnded() {
    audio.addEventListener('ended', () => {
        if(numberSong >= soundLinks.length - 1) {
            numberSong = 0;
        } else {
            numberSong++;
        }

        if(audio) {
            audio.src = soundLinks[numberSong];
        }

        audio.play();
        textAuthor.textContent = soundsAuthor[numberSong];
        textNameSingle.textContent = soundsName[numberSong];
        albumImg.src = imgForSingle[numberSong];
        backgroundImg.src = imgForSingle[numberSong];
        progressRange.value = 0;
    })
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

    if(audio) {
        audio.src = soundLinks[numberSong];
    }

    textAuthor.textContent = soundsAuthor[numberSong];
    textNameSingle.textContent = soundsName[numberSong];
    albumImg.src = imgForSingle[numberSong];
    backgroundImg.src = imgForSingle[numberSong];
    progressRange.value = 0;

}

function playPrev() {

    if(numberSong <= 0) {
        numberSong = soundLinks.length;
    }

    numberSong = numberSong - 1;

    if(audio) {
        audio.src = soundLinks[numberSong];
    }

    textAuthor.textContent = soundsAuthor[numberSong];
    textNameSingle.textContent = soundsName[numberSong];
    albumImg.src = imgForSingle[numberSong];
    backgroundImg.src = imgForSingle[numberSong];
    progressRange.value = 0;
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
    if(!audio) {
        audio = new Audio();
        audio.src = soundLinks[numberSong];
    }

    if(audio && volumeBtn.classList.contains("volume_visible")) {
        audio.muted = true;
        volumeBtn.classList.remove("volume_visible");
        volumeBtn.classList.add("volume_none");
    } else if(audio && volumeBtn.classList.contains("volume_none")) {
        audio.muted = false;
        volumeBtn.classList.add("volume_visible");
        volumeBtn.classList.remove("volume_none");
    }

    if(audio?.muted == true) {
        volumeRange.value = 0;
    } else {
        volumeRange.value = 100;
        audio.volume = volumeRange.value / 100;
    }
});