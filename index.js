// Function to generate random glitch text
function generateGlitchText(originalText) {
    const glitchSymbols = "!@#$%^&*()_+{}|<>?~"; // Symbols for glitch effect
    let result = "";
    for (let i = 0; i < originalText.length; i++) {
        const randomSymbol = glitchSymbols[Math.floor(Math.random() * glitchSymbols.length)];
        result += randomSymbol; // Append random symbol
    }
    return result; // Return generated glitch text
}

// Function to set up a button with glitch effect and sound
function setupButton(buttonId) {
    const button = document.getElementById(buttonId);
    const glitchText = button.querySelector('.glitch-text');
    const realText = button.querySelector('.real-text');

    const originalText = realText.textContent; // Get actual button text
    glitchText.textContent = generateGlitchText(originalText); // Set initial glitch text

    // Update glitch text every interval for dynamic effect
    setInterval(() => {
        if (glitchText.style.opacity !== "0") { // Only update if not hovered
            glitchText.textContent = generateGlitchText(originalText);
        }
    }, 100); // Update every interval

    // Play Sound on Hover Based on Audio State
    button.addEventListener("mouseenter", () => {
        const audio = document.getElementById("hover-sound");

        // Only play the hover sound if the audio is playing
        if (isAudioPlaying) {
            audio.currentTime = 0; // Reset audio to start
            audio.play(); // Play the sound
        }
    });
}

// Set up buttons once the page is loaded
setupButton('glitch-button-socials');
setupButton('glitch-button-about');

// Typewriter effect for document title (existing functionality)
let titleText = "@legend4d";
let index = 1;
let speed = 250;
let deletingSpeed = 150;
let isDeleting = false;

function typeWriter() {
    if (!isDeleting) {
        if (index <= titleText.length) {
            document.title = titleText.charAt(0) + titleText.slice(1, index);
            index++;
            setTimeout(typeWriter, speed);
        } else {
            isDeleting = true;
            setTimeout(typeWriter, 1000);
        }
    } else {
        if (index > 1) {
            document.title = titleText.charAt(0) + titleText.slice(1, index - 1);
            index--;
            setTimeout(typeWriter, deletingSpeed);
        } else {
            isDeleting = false;
            setTimeout(typeWriter, 500);
        }
    }
}

// Combine both window.onload functions into one
window.onload = function () {
    typeWriter(); // Initialize the typewriter effect for the tab title
    updateProgress(); // Initialize progress when the page loads
};

// Set volume for background music and hover sound
document.getElementById("background-music").volume = 0.5; // Set volume between 0.0 and 1.0
document.getElementById("hover-sound").volume = 0.5; // Set volume for hover sound

// Variables to track asset loading progress
const totalAssets = 3; // Total number of assets (video, audio, etc.)
let loadedAssets = 0;

// Update progress on the page
function updateProgress() {
    const progressText = document.getElementById('asset-progress-text');
    progressText.textContent = `${loadedAssets}/${totalAssets}`;
}

// Track asset loading progress (video, audio, etc.)
const video = document.getElementById('background-video');
video.onloadeddata = () => {
    loadedAssets++;
    updateProgress();
};

const backgroundMusic = document.getElementById('background-music');
backgroundMusic.oncanplaythrough = () => {
    loadedAssets++;
    updateProgress();
};

const hoverSound = document.getElementById('hover-sound');
hoverSound.oncanplaythrough = () => {
    loadedAssets++;
    updateProgress();
};

// Hide loading screen and asset progress after all assets are loaded
function checkAllAssetsLoaded() {
    if (loadedAssets === totalAssets) {
        setTimeout(() => {
            // Fade out the loading screen
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.style.opacity = '0'; // Fade out
            setTimeout(() => {
                loadingScreen.style.display = 'none'; // Hide loading screen after fade
            }, 1000);

            // Fade out the asset progress text
            const progressText = document.getElementById('asset-progress');
            progressText.style.opacity = '0'; // Fade out progress text
            setTimeout(() => {
                progressText.style.display = 'none'; // Hide progress text after fade
            }, 1000);
        }, 1000);
    }
}

// Update progress and check if all assets are loaded
setInterval(checkAllAssetsLoaded, 100);

// Play/Pause Button Control
const audioControlButton = document.getElementById("play-pause-button"); // Assuming your button has the ID 'play-pause-button'
const audioButtonImg = document.getElementById("audio-button-img"); // Assuming the button image has ID 'audio-button-img'

// Flag to track whether background music is playing or paused
let isAudioPlaying = false;

// Function to toggle background music (play/pause)
function toggleAudio() {
    if (isAudioPlaying) {
        // Pause background music only
        backgroundMusic.pause();
        
        // Change button image to "play"
        audioButtonImg.src = "music-play.png"; // Replace this with the path to your play image
    } else {
        // Play background music only
        backgroundMusic.play();
        
        // Change button image to "pause"
        audioButtonImg.src = "music-pause.png"; // Replace this with the path to your pause image
    }

    // Toggle the state
    isAudioPlaying = !isAudioPlaying;
}

// Add event listener for the button
audioControlButton.addEventListener("click", toggleAudio);

// Script for about and socials
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");

    function setupPopup(buttonId, popupId, closeButtonId) {
        const button = document.getElementById(buttonId);
        const popup = document.getElementById(popupId);
        const closeButton = document.getElementById(closeButtonId);

        // Function to open popup
        function openPopup() {
            overlay.style.display = "block";
            popup.style.display = "block";

            setTimeout(() => {
                overlay.style.opacity = "1";
                popup.style.opacity = "1";
            }, 10);
        }

        // Function to close popup
        function closePopup() {
            popup.style.opacity = "0";
            overlay.style.opacity = "0";

            setTimeout(() => {
                popup.style.display = "none";
                overlay.style.display = "none";
            }, 500);
        }

        // Event Listeners
        button.addEventListener("click", openPopup);
        closeButton.addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup); // Close if clicking outside
    }

    // Initialize popups for both About Me and Socials
    setupPopup("glitch-button-about", "aboutme", "close-aboutme");
    setupPopup("glitch-button-socials", "socials", "close-socials");
});







