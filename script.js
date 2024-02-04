const Background = document.getElementById('bg-img'),
PlayerImg = document.getElementById('player-img'),
Title = document.getElementById('Song_title'),
Curr_Time = document.getElementById('curr_time'),
Duration = document.getElementById('duration'),
PlayerProgress = document.getElementById('player_progress'),
Progress = document.getElementById('progress'),
PrevBtn = document.getElementById('prev'),
NextBtn = document.getElementById('next'),
PlayBtn = document.getElementById('play');

// let audio = new Audio('/assets/song/Masakali.mp3');
// let IsPLaying = false;
// let ResumePosition = 0;

// PlayBtn.addEventListener("click", ()=>{
//     if(!IsPLaying){
//         if(ResumePosition === 0)
//         {
//             audio.play();
//         }
//         else{
//             audio.currentTime = ResumePosition;
//             audio.play();
//         }
//         PlayBtn.classList.replace("fa-play", "fa-pause");
//     }
//     else{
//         audio.pause();
//         PlayBtn.classList.replace("fa-pause", "fa-play");
//         ResumePosition = audio.currentTime;
//     }

//     IsPLaying = true;
// });

// audio.addEventListener("ended", ()=>{
//     PlayBtn.classList.replace("fa-pause", "fa-paly");
//     IsPLaying = false;
//     ResumePosition = 0;
// });

let music = new Audio();

const songs = [
    {
        path : 'assets/song/Bholi Si Surat.mp3',
        name : 'Bholi Si Surat',
        cover : 'assets/image/1.jpg',
    },
    {
        path : 'assets/song/deewane ham nahi hote.mp3',
        name : 'Deewane Hum Nahi Hote',
        cover : 'assets/image/3.jpg',
    },
    {
        path : 'assets/song/Ek Din Pyar.mp3',
        name : 'Ek Din Pyar',
        cover : 'assets/image/4.jpg',
    },
    {
        path : 'assets/song/Hua Hain Aaj Pehli Baar.mp3',
        name : 'Hua Hain Aaj Pehli Barr',
        cover : 'assets/image/2.jpg',
    },
    {
        path : 'assets/song/Masakali.mp3',
        name : 'Masakali',
        cover : 'assets/image/5.webp',
    },
    {
        path : 'assets/song/Jaadugar.mp3',
        name : 'Jaadugar',
        cover : 'assets/image/6.jpg',
    },
    {
        path : 'assets/song/Mohabbat Se Nahi Waqif.mp3',
        name : 'Mohabbat Se Nhi Waqif',
        cover : 'assets/image/7.jpg',
    },
    {
        path : 'assets/song/Phir Bhi Tumko Chaahunga.mp3',
        name : 'Phir Bhi Tumko Chaahunga',
        cover : 'assets/image/8.jpg',
    }
]

let musicIndex = 0;
let IsPLaying = false;

function toogleMusic(){
    if(IsPLaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    IsPLaying = true;

    PlayBtn.classList.replace("fa-play", "fa-pause");
    PlayBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    IsPLaying = false;

    PlayBtn.classList.replace("fa-pause", "fa-play");
    PlayBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    Title.textContent = song.name;
    Background.src = song.cover;
    PlayerImg.src = song.cover;
}

function ChangeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length ) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// function updateProgressBar(){
//     const {duration, currentTime} = music;
//     const progressPercent = (currentTime / duration) * 100;
//     Progress.style.width = `${progressPercent}%`;

//     const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
//     Duration.textContent = `${formatTime(duration / 60 )}:${formatTime(duration % 60)}`;
//     Curr_Time.textContent = `${formatTime(currentTime / 60 )}:${formatTime(currentTime % 60)}`;
// }

// function setProgressBar(e){
//     const width = PlayerProgress.clientWidth;
//     const clickX = e.offsetX;
//     music.currentTime = (clickX / width) * music.duration;
// }

function updateProgressBar() {
    const { duration, currentTime } = music;
    console.log('duration:', duration);
    console.log('currentTime:', currentTime);
    const progressPercent = Math.ceil((Math.round(currentTime) / Math.round(duration)) * 100);
    Progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    const currentTimeMinutes = Math.floor(currentTime / 60);
    const currentTimeSeconds = Math.floor(currentTime % 60);

    Duration.textContent = `${formatTime(durationMinutes)}:${formatTime(durationSeconds)}`;
    Curr_Time.textContent = `${formatTime(currentTimeMinutes)}:${formatTime(currentTimeSeconds)}`;
}

function setProgressBar(e) {
    const width = PlayerProgress.offsetWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}


PlayBtn.addEventListener('click', toogleMusic);
PrevBtn.addEventListener('click', ()=> ChangeMusic(-1));
NextBtn.addEventListener('click', ()=> ChangeMusic(1));
music.addEventListener('ended', ()=> ChangeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
PlayerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);