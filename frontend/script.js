const camera = document.getElementById("camera");
const checkBtn = document.getElementById("checkMood");
const chooseMood = document.getElementById("chooseMood");
const manualMood = document.getElementById("manualMood");
const scanner = document.getElementById("scannerBar");
const result = document.getElementById("result");

// Dummy movie list
const movies = {
  Happy: {
    name: "Welcome",
    link: "https://www.primevideo.com/detail/0MJFLZHIV04F9V9V21RAY2Z8ZZ/",
    thumbnail: "https://m.media-amazon.com/images/S/pv-target-images/af13e1c59556eb143d2b213c9f95567677f409033d4c9619c553367d71bee982._SX1920_FMwebp_.jpg",
  },
  Sad: {
    name: "Call me Bae",
    link: "https://www.primevideo.com/detail/0TF2BODX83KZOWTP08NXFE897E/",
    thumbnail: "https://m.media-amazon.com/images/S/pv-target-images/0cb7ac74d1d6e8eb2e3d59aa5354359714eb54d84fcfaa616d9de19d64b492ca._SX1920_FMwebp_.jpg",
  },
  Excited: {
    name: "Citadel Honey Bunny",
    link: "https://www.primevideo.com/detail/0KYRVT4JDB957NXZO72E2MIFW5",
    thumbnail:"https://m.media-amazon.com/images/S/pv-target-images/51c2c75da778c109ccc33ff293ff48f0cccc60b18c3fef8a42afe2a80e07acac._SX1920_FMwebp_.jpg",
  },
  Neutral: {
    name: "Farzi",
    link: "https://www.primevideo.com/detail/0HDHQAUF5LPWOJRCO025LFJSJI",
    thumbnail: "https://m.media-amazon.com/images/S/pv-target-images/8aed532f0875925f72c4012aab688ed409773ecbfb3b18e1a39cd9ad1a4dd485._SX1920_FMwebp_.jpg",
  },
  Angry: {
    name: "Agneepath",
    link: "https://www.primevideo.com/detail/0NU7IFXPL2WWSDHNGAR5Z1GUJE/",
    thumbnail: "https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/1863426056ae862def9a69ca76e8af54cdb6b8a5a2be1100e096e59b00060847._UX1920_.png",
  },
};

// Start camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    camera.srcObject = stream;
  })
  .catch(() => {
    document.getElementById("noCam").innerText = "Camera not available. Please choose your mood.";
  });

// Scanner GSAP animation
gsap.fromTo("#scannerBar", 
    { y: 0 }, 
    { y: 180, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut" }
);

// Handle "Check My Mood"
checkBtn.addEventListener("click", () => {
  scanner.style.display = "block";

  // Simulate face detection + OpenAI (replace with real logic later)
  setTimeout(() => {
    scanner.style.display = "none";

    // Simulate mood detection (replace this with actual mood detection logic)
    const dummyDetection = {
      expressions: {
        neutral: 0.15,
        happy: 0.72,
        sad: 0.05,
        angry: 0.02,
        fearful: 0.01,
        disgusted: 0.01,
        surprised: 0.04
      }
    };

    const mood = getMoodFromExpressions(dummyDetection.expressions); // Get the mood
    showMoodOnScreen(mood); // Show the mood on screen
    showMovie(mood); // Suggest a movie based on the mood
  }, 3000);
});

// Show mood select
chooseMood.addEventListener("click", () => {
  manualMood.style.display = "block";
});

// Handle manual mood click
document.querySelectorAll(".moodBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    showMoodOnScreen(mood); // Show the mood on screen
    showMovie(mood); // Suggest a movie based on the mood
  });
});

// Show movie
function showMovie(mood) {
  const movie = movies[mood] || movies["Neutral"];
  result.innerHTML = `
    <img src="${movie.thumbnail}" alt="${movie.name}" />
    <h3>${movie.name}</h3>
    <a href="${movie.link}" target="_blank">🎥 Watch Now</a>
  `;
}

// Extract mood from detected expressions
function getMoodFromExpressions(expressions) {
  return Object.keys(expressions).reduce((a, b) =>
    expressions[a] > expressions[b] ? a : b
  );
}

// Display the mood on screen
function showMoodOnScreen(mood) {
  const moodDisplay = document.getElementById("moodDisplay");
  moodDisplay.innerHTML = `Detected Mood: <strong>${mood}</strong>`;
}
