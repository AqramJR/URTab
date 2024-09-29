document.addEventListener("DOMContentLoaded", function() {
	
    const backgroundElement = document.getElementById('background');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsPopup = document.getElementById('settingsPopup');
    const backgroundInput = document.getElementById('backgroundInput');
    const clockElement = document.getElementById('clock');
    const timeFormatInput = document.getElementById('timeFormat');
    const fontTypeInput = document.getElementById('fontType');
    const fontColorInput = document.getElementById('fontColor');
    const fontSizeInput = document.getElementById('fontSize');
    const clockPositionInput = document.getElementById('clockPosition');
    const showSecondsInput = document.getElementById('showSeconds');

    // Load saved background from storage
    chrome.storage.local.get(["background", "clockSettings"], function(data) {
        if (data.background) {
            applyBackground(data.background);
        } else {
            // Set default background if no custom background is selected
            backgroundElement.style.backgroundImage = "url('assets/default_background.jpg')";
        }

        // Load clock settings
        if (data.clockSettings) {
            applyClockSettings(data.clockSettings);
        }
    });

    // Show settings popup when settings icon is clicked
    settingsIcon.addEventListener("click", function() {
        settingsPopup.style.display = settingsPopup.style.display === 'block' ? 'none' : 'block';
    });

    // Handle background selection
    backgroundInput.addEventListener("change", function(event) {
		
		// limit size to 5MB
		const file = event.target.files[0];
        if (file.size > 5 * 1024 * 1024) {
           alert("Background file must be under 5MB.");
           return;
        }
		else if (file.size < 5 * 1024 * 1024) {
          if (event.target.files.length > 0) {
             const file = event.target.files[0];
             const reader = new FileReader();

             reader.onload = function(e) {
                 const backgroundData = e.target.result;
                 applyBackground(backgroundData);

                // Save the selected background in local storage
                 chrome.storage.local.set({ background: backgroundData }, function() {
                     if (chrome.runtime.lastError) {
                         console.error("Error saving background:", chrome.runtime.lastError);
                     } else {
                         console.log("Background saved.");
                     }
                 });
            };

            reader.readAsDataURL(file);
         }
		}
    });

    // Function to apply background
    function applyBackground(data) {
        if (data.startsWith("data:video")) {
            backgroundElement.innerHTML = `<video autoplay loop muted style="width: 100%; height: 100%; object-fit: cover;">
                                                <source src="${data}" type="video/mp4">
                                            </video>`;
        } else {
            backgroundElement.style.backgroundImage = `url(${data})`;
            backgroundElement.innerHTML = ""; // Clear any existing video
        }
    }

    // Clock settings
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const is12Hour = timeFormatInput.value === "12";

        if (is12Hour) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            clockElement.textContent = showSecondsInput.checked ? `${hours}:${minutes}:${seconds} ${ampm}` : `${hours}:${minutes} ${ampm}`;
        } else {
            clockElement.textContent = showSecondsInput.checked ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
        }

        setTimeout(updateClock, 1000);
    }

    function applyClockSettings(settings) {
        timeFormatInput.value = settings.format || "12";
        fontTypeInput.value = settings.fontType || "Arial";
        fontColorInput.value = settings.color || "#ffffff";
        fontSizeInput.value = settings.size || "40";
        clockPositionInput.value = settings.position || "center";
        showSecondsInput.checked = settings.showSeconds;

        clockElement.style.fontFamily = fontTypeInput.value;
        clockElement.style.color = fontColorInput.value;
        clockElement.style.fontSize = `${fontSizeInput.value}px`;
        updateClockPosition(clockPositionInput.value);
    }

    function updateClockPosition(position) {
        clockElement.classList.remove("top-left", "top-right", "bottom-left", "bottom-right", "center", "free");
        clockElement.classList.add(position);
        if (position === "free") {
            makeElementDraggable(clockElement);
        }
    }

    // Function to make clock draggable
    function makeElementDraggable(element) {
        let offsetX, offsetY, isDragging = false;

        element.addEventListener("mousedown", function(e) {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.position = 'absolute';
        });

        document.addEventListener("mousemove", function(e) {
            if (isDragging) {
                element.style.left = (e.clientX - offsetX) + "px";
                element.style.top = (e.clientY - offsetY) + "px";
            }
        });

        document.addEventListener("mouseup", function() {
            if (isDragging) {
                isDragging = false;

                // Save updated position in storage
                const clockSettings = {
                    format: timeFormatInput.value,
                    fontType: fontTypeInput.value,
                    color: fontColorInput.value,
                    size: fontSizeInput.value,
                    position: "free",
                    showSeconds: showSecondsInput.checked,
                    top: element.style.top,
                    left: element.style.left
                };
                chrome.storage.local.set({ clockSettings: clockSettings }, function() {
                    console.log("Clock position saved.");
                });
            }
        });
    }

    // Save clock settings on change
    [timeFormatInput, fontTypeInput, fontColorInput, fontSizeInput, clockPositionInput, showSecondsInput].forEach(input => {
        input.addEventListener("change", function() {
            const clockSettings = {
                format: timeFormatInput.value,
                fontType: fontTypeInput.value,
                color: fontColorInput.value,
                size: fontSizeInput.value,
                position: clockPositionInput.value,
                showSeconds: showSecondsInput.checked,
                top: clockElement.style.top,
                left: clockElement.style.left
            };
            chrome.storage.local.set({ clockSettings: clockSettings }, function() {
                console.log("Clock settings saved.");
            });
            applyClockSettings(clockSettings);
        });
    });

    // Update clock initially
    updateClock();
	
});

document.getElementById('resetButton').addEventListener('click', function() {
    chrome.storage.local.clear(); // Clear Chrome local storage
    localStorage.clear(); // Clear other local storage
    location.reload(); // Reload to apply defaults
});
