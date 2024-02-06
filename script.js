const Background = document.getElementById('bg-img'),
PlayerImg = document.getElementById('player-img'),
Title = document.getElementById('Song_title'),
Curr_Time = document.getElementById('curr_time'),
Duration = document.getElementById('duration'),
PlayerProgress = document.getElementById('player_progress'),
Progress = document.getElementById('progress'),
PrevBtn = document.getElementById('prev'),
NextBtn = document.getElementById('next'),
PlayBtn = document.getElementById('play'),
shuffle = document.getElementById('shuffle_loop'),
loop = document.getElementById('bx1');


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

function updateProgressBar() {
    const { duration, currentTime } = music;
    // console.log('duration:', duration);
    // console.log('currentTime:', currentTime);
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

let value = '';

    shuffle.addEventListener('click', function(){
        value = this.dataset.value;
        console.log(value)
        shuffle.style.display = 'none';
        loop.style.display = 'block';
    })

    loop.addEventListener('click', function(){
        value = this.dataset.value;
        console.log(value);
        loop.style.display = 'none';
        shuffle.style.display = 'block';
    })


PlayBtn.addEventListener('click', toogleMusic);
PrevBtn.addEventListener('click', ()=> ChangeMusic(-1));
NextBtn.addEventListener('click', ()=> ChangeMusic(1));
music.addEventListener('ended', function(){
    if(value === 'loop'){
        // console.log(value)
        // ChangeMusic(0);
        loadMusic(songs[musicIndex]);
        updateProgressBar();
        if(IsPLaying){
            music.play();
        }
    }
    else if(value === 'shuffle'){
        ChangeMusic(1);
    }
});
music.addEventListener('timeupdate', updateProgressBar);
PlayerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

const PopUp = document.getElementById('playlist'),
PopUp_Playlist = document.getElementById('list');

let pop_activity = false;

PopUp_Playlist.addEventListener('click', ()=>{

    if(pop_activity){
        PopUp.style.display = "none";
        pop_activity = false;
        PopUp_Playlist.setAttribute('title', 'Playlist');
    }
    else{
        PopUp.style.display = "flex";
        pop_activity = true;
        PopUp_Playlist.setAttribute('title', 'Close');
    }
})


const songElements = document.querySelectorAll('.songs');

songElements.forEach(function(songElement) {
  songElement.addEventListener('click', function() {
    let value = this.dataset.value;
    console.log(value);
    loadMusic(songs[value]);
    if(IsPLaying){
        music.play();
    }
  });
});

const volume = document.getElementById('volume_meter'),
icon = document.getElementById('volume_icon');

volume.addEventListener('input', ()=>{
    let value = volume.value;
    if(value == 0){
        icon.classList.replace('bxs-volume-low', 'bxs-volume-mute');
        icon.classList.replace('bxs-volume', 'bxs-volume-mute');
        icon.classList.replace('bxs-volume-full', 'bxs-volume-mute');
    }
    else if(value > 0 && value<=50){
        icon.classList.replace('bxs-volume-mute', 'bxs-volume-low');
        icon.classList.replace('bxs-volume', 'bxs-volume-low');
        icon.classList.replace('bxs-volume-full', 'bxs-volume-low');
    }
    else if(value >50 && value<=100){
        icon.classList.replace('bxs-volume-mute', 'bxs-volume-full');
        icon.classList.replace('bxs-volume-low', 'bxs-volume-full');
        icon.classList.replace('bxs-volume', 'bxs-volume-full');
    }
    music.volume = (value/100);
})


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

// let isLooping = false;

// function loop() {
//     const { currentTime, duration } = music;
//     if (currentTime + 0.1 >= duration) {
//         loadMusic(songs[musicIndex]);
//         updateProgressBar();
//     }
// }

// function startLoop(){
//     isLooping = true;
//     music.addEventListener('ended', loop);
// }

// function stopLoop(){
//     isLooping = false;
//     music.removeEventListener('ended', loop);
// }

// let looping = false;

// const shuffle = document.getElementById('shuffle_loop'),
// Repeat_one = document.getElementById('bx1');
// shuffle.addEventListener('click', ()=>{
//     shuffle.style.display = 'none';
//     Repeat_one.style.display = 'block'; 
//     music.addEventListener('ended', ()=> loadMusic(songs[musicIndex]));
//     updateProgressBar();
// })

// Repeat_one.addEventListener('click', ()=>{
//     shuffle.style.display = 'block';
//     Repeat_one.style.display = 'none';
//     music.addEventListener('ended', ()=> ChangeMusic(1));
// })



// const song = document.getElementById('song1');

// song.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song1 = document.getElementById('song1');

// song1.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song2 = document.getElementById('song2');

// song2.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song3 = document.getElementById('song3');

// song3.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song4 = document.getElementById('song4');

// song4.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song5 = document.getElementById('song5');

// song5.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song6 = document.getElementById('song6');

// song6.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song7 = document.getElementById('song7');

// song7.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const song8 = document.getElementById('song8');

// song8.addEventListener('click', function(){
//     let value = this.dataset.value;
//     console.log(value);
//     loadMusic(songs[value]);
//     music.play();
// })

// const Shuffle_Loop = document.getElementById('shuffle_loop'),
// loop = document.getElementById('bx');

// let loop_or_suffle = false;

// Shuffle_Loop.addEventListener('click', ()=>{

//     if(loop_or_suffle){
//         bx.style.display = 'block';
//         Shuffle_Loop.style.display = 'none';
//         loop_or_suffle = false;
//     }
//     else{
//         bx.style.display = 'none';
//         Shuffle_Loop.style.display = 'block';
//         loop_or_suffle = true;
//     }
// })