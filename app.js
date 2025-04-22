// List of music tracks
let Musics = [
    { 
        Title: "Azizam", 
        Artist: "Ed Sheeran x Googoosh", 
        Music: new Audio("./Musics/Ed Sheeran x Googoosh - Azizam.mp3"), 
        Img: "./images/azizamm.jpg" 
    },
    { 
        Title: "Someone Like You", 
        Artist: "Adele", 
        Music: new Audio("./Musics/adele - someone like you live.mp3"), 
        Img: "./images/Adele-Someone-Like-You.jpg" 
    },
    { 
        Title: "Hope", 
        Artist: "NF", 
        Music: new Audio("./Musics/HOPE - NF (320).mp3"), 
        Img: "./images/hopejpg.jpg" 
    }
];

// Selecting HTML elements
let Title = document.querySelector(".title");
let Artist = document.querySelector(".artist");
let Img = document.querySelector(".Cover");
let range = document.querySelector(".range");

// Initial music setup
let count = 0;
Title.innerHTML = Musics[count].Title;
Artist.innerHTML = Musics[count].Artist;
Img.src = Musics[count].Img;
range.value = 0;


let play = document.querySelector(".play");
let isPlaying = false;

// Play and pause music functionality
play.addEventListener("click", () => {
    if (!isPlaying) {
        // Play the current track
        Musics[count].Music.play();
        document.title = Musics[count].Title;
        
       
        play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>`;

        // Update the progress bar with the current music time
        Musics[count].Music.ontimeupdate = () => {
            let music = Musics[count].Music;
            let percent = (music.currentTime / music.duration) * 100;
            range.value = percent;
            range.style.setProperty("--progress", percent + "%");
        };

        isPlaying = true; 
    } else {
        // Pause the current track
        Musics[count].Music.pause();
        document.title = "Music Player";
        
        // Change the pause button icon to play
        play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
        </svg>`;
        isPlaying = false; 
    }
});

// Update music position when the user interacts with the progress bar
range.addEventListener("input", () => {
    let music = Musics[count].Music;
    music.currentTime = (range.value / 100) * music.duration; 
});


let prev = document.querySelector(".prev");
let next = document.querySelector(".next");

// Update player to show the new track information
function updatePlayer(index) {
   
    Musics.forEach(m => m.Music.pause());

    // Update the displayed music details
    Title.innerHTML = Musics[index].Title;
    Artist.innerHTML = Musics[index].Artist;
    Img.src = Musics[index].Img;
    document.title = Musics[index].Title;

    // Play the new track if it's already playing
    if (isPlaying) {
        Musics[index].Music.play();
    } else {
        Musics[index].Music.pause();
        document.title = "Music Player";
    }
}

// Previous button functionality
prev.addEventListener("click", () => {
    count--; // Decrease the track index
    if (count == -1) {
        count = Musics.length - 1; // Go to the last track if the index goes negative
    }
    updatePlayer(count); // Update the player with the new track
});

// Next button functionality
next.addEventListener("click", () => {
    count++; // Increase the track index
    if (count >= Musics.length) {
        count = 0; // Go back to the first track if the index exceeds the array length
    }
    updatePlayer(count);
});
