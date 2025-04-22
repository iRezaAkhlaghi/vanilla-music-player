let Musics = [
    { Title: "Azizam", Artist: "Ed shrrran x Googoosh", Music: new Audio("./Musics/Ed Sheeran x Googoosh - Azizam.mp3"), Img: "./images/azizamm.jpg" },
    { Title: "Some One Like You", Artist: "Adele", Music: new Audio("./Musics/adele - someone like you live.mp3"), Img: "./images/Adele-Someone-Like-You.jpg" },
    { Title: "Hope", Artist: "NF", Music: new Audio("./Musics/HOPE - NF (320).mp3"), Img: "./images/hopejpg.jpg" }
]

let Title = document.querySelector(".title");
let Artist = document.querySelector(".artist");
let Img = document.querySelector(".Cover");
let range = document.querySelector(".range")

let count = 0;
Title.innerHTML = Musics[count].Title;
Artist.innerHTML = Musics[count].Artist;
Img.src = Musics[count].Img;
range.value = 0;





let play = document.querySelector(".play");
let isPlaying = false;

play.addEventListener("click", () => {
    if (!isPlaying) {
        Musics[count].Music.play();
        document.title = Musics[count].Title;
        play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>`;


        Musics[count].Music.ontimeupdate = () => {
            let music = Musics[count].Music;
            let percent = (music.currentTime / music.duration) * 100;
            range.value = percent;
            range.style.setProperty("--progress", percent + "%");
        };


        isPlaying = true;
    } else {
        Musics[count].Music.pause();
        document.title = "Music Player";
        play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
        </svg>`;
        isPlaying = false;
    }

})


range.addEventListener("input", () => {
    let music = Musics[count].Music;
    music.currentTime = (range.value / 100) * music.duration;
});


let prev = document.querySelector(".prev");
let next = document.querySelector(".next");


function updatePlayer(index) {

    Musics.forEach(m => m.Music.pause());


    Title.innerHTML = Musics[index].Title;
    Artist.innerHTML = Musics[index].Artist;
    Img.src = Musics[index].Img;
    document.title = Musics[index].Title;


    if (isPlaying) {
        Musics[index].Music.play();
    } else {
        Musics[index].Music.pause();
        document.title = "Music Player";
    }
}


prev.addEventListener("click", () => {
    count--;
    if (count == -1) {
        count = Musics.length - 1;
    }
    updatePlayer(count);
})

next.addEventListener("click", () => {
    count++;
    if (count >= Musics.length) {
        count = 0;
    }
    updatePlayer(count);
})







