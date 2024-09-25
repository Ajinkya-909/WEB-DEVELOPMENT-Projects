let menu_in = document.getElementById("menu");
menu_in.onclick = () => {
  let a = document.querySelector(".left");
  a.classList.remove("out");
  a.classList.add("in");
};

let menu_out = document.getElementById("close");
menu_out.onclick = () => {
  let b = document.querySelector(".left");
  b.classList.add("out");
  b.classList.remove("in");
};

function elements() {
  let z = document.getElementById("menu"),
    y = document.querySelector(".close_box");
  if (window.innerWidth <= 1000) {
    z.style.display = "inline";
    y.style.display = "flex";
  } else if (window.innerWidth >= 1000) {
    z.style.display = "none";
    y.style.display = "none";
  }
}
elements();
var song_src;
var current_audio = new Audio();
var song_name;
var index_ofsong;

let songs = [
  {
    key: "City Grove",
    value: `"StockTune-Anime City Groove_1723783024.mp3"`,
  },
  {
    key: "Dance of the Dark Joy",
    value: `"StockTune-Dance Of The Dark Joy_1723783048.mp3"`,
  },
  {
    key: "Daylight Dance Celebration",
    value: `"StockTune-Daylight Dance Celebration_1723783040.mp3"`,
  },
  {
    key: "Echoes Of Silence",
    value: `"StockTune-Echoes Of Silence_1723782990.mp3"`,
  },
  {
    key: "Turmoil Reflected Melody",
    value: `"StockTune-Inner Turmoil Reflected Melody_1723782949.mp3"`,
  },
  {
    key: "Desert Rock",
    value: `"StockTune-Sundown Desert Rock_1723782964.mp3"`,
  },
  {
    key: "Together We Thrive",
    value: `"StockTune-Together We Thrive_1723783077.mp3"`,
  },
  {
    key: "Victory Dance At Dawn",
    value: `"StockTune-Victory Dance At Dawn_1723783009.mp3"`,
  },
  {
    key: "-Whispers Of Silent Hearts",
    value: `"StockTune-Whispers Of Silent Hearts_1723782980.mp3"`,
  },
  {
    key: "Echoes Of Silence 2",
    value: `"StockTune-Echoes Of Silence_1723782990.mp3"`,
  },
];

//seek bar

function bar_control() {
  setInterval(() => {
    document.querySelector(".circle").style.left =
      (current_audio.currentTime / current_audio.duration) * 100 + "%";
    elements();
  }, 200);
}

let seek = document.querySelector(".scroll-line");
seek.onclick = (e) => {
  let percentage = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
  document.querySelector(".circle").style.left = percentage + "%";
  current_audio.currentTime = (current_audio.duration * percentage) / 100;
};

//TIME INTERVALS
let time_sec, time_min, total_time, curr_time;
function time() {
  setInterval(() => {
    total_time = Math.floor(current_audio.duration);
    curr_time = Math.floor(current_audio.currentTime);
    let x = document.querySelector(".time");
    x.innerHTML = `<p>${Math.floor(curr_time / 60)}:${Math.floor(
      curr_time % 60
    )}/${Math.floor(total_time / 60)}:${Math.floor(total_time % 60)}</p>`;
  }, 1000);
}

let div = document.querySelector(".play-list").getElementsByTagName("ol")[0];
div.innerHTML = "";
songs.forEach((element) => {
  div.innerHTML =
    div.innerHTML +
    `<li><span class="name" data-src=${element.value}>${element.key}</span><span class="play-btn"><p>Play Now </p><img src="play-svgrepo-com.svg" alt=""></span></li>`;
});
let item = div.children;
let a = Array.from(item);
a.forEach((element) => {
  element.onclick = (item) => {
    let a = element.querySelector(".name").dataset.src;
    song_name = element.querySelector(".name").innerHTML;
    song_src = `songs/${a}`;
    play();
    document.getElementById("play").src = "play-svgrepo-com.svg";
  };
});

async function play() {
  current_audio.src = song_src;
  current_audio.play();
  bar_control();
  time();
  let a = document.getElementById("song-name").firstChild;
  a.innerHTML = `<P>${song_name}</P>`;
  let controll = document.getElementById("play");
  controll.onclick = () => {
    if (current_audio.paused) {
      current_audio.play();
      controll.src = "play-svgrepo-com.svg";
    } else {
      current_audio.pause();
      controll.src = "pause-circle-svgrepo-com.svg";
    }
  };
  index_ofsong = indexsong(songs, song_name);

  //back and forward

  let back = document.getElementById("back");
  back.onclick = () => {
    if (index_ofsong == 0) {
    } else {
      index_ofsong = index_ofsong - 1;
      let a = document.getElementById("song-name").firstChild;
      song_name = songs[index_ofsong].key;
      a.innerHTML = `<P>${song_name}</P>`;
      let b = songs[index_ofsong].value;
      let z = `songs/${b}`;
      current_audio.src = z.replace(/"/gi, "");
      current_audio.play();
      bar_control();
    }
  };

  let forward = document.getElementById("forward");
  forward.onclick = () => {
    if (index_ofsong == songs.length) {
    } else {
      index_ofsong = index_ofsong + 1;
      let a = document.getElementById("song-name").firstChild;
      song_name = songs[index_ofsong].key;
      a.innerHTML = `<P>${song_name}</P>`;
      let b = songs[index_ofsong].value;
      let z = `songs/${b}`;
      current_audio.src = z.replace(/"/gi, "");
      current_audio.play();
      bar_control();
    }
  };
}
function indexsong(songs, search) {
  for (let i = 0; i < songs.length; i++) {
    const element = songs[i];
    if (element.key === search) {
      return i;
    }
  }
}
