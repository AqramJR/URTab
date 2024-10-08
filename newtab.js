document.addEventListener("DOMContentLoaded", function() {
	
    const backgroundElement = document.getElementById('background');
    const muteBackgroundInput = document.getElementById('muteBackground');
    const backgroundSelect = document.getElementById('backgroundSelect');
    const customBackgroundLabel = document.getElementById('customBackgroundLabel');
    const backgroundToggle = document.getElementById('backgroundToggle');
    const backgroundBlurInput = document.getElementById('backgroundBlur'); // Get the slider
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsPopup = document.getElementById('settingsPopup');
    const backgroundInput = document.getElementById('backgroundInput');
	// Clock
	const showClockInput = document.getElementById('showClock');
    const clockSettingsGroup = document.getElementById('clockSettings');
    const clockToggle = document.getElementById('clockToggle');
	const clockHeader = document.getElementById('clockHeader');
    const clockElement = document.getElementById('clock');
    const timeFormatInput = document.getElementById('timeFormat');
    const fontTypeInput = document.getElementById('fontType');
    const fontColorInput = document.getElementById('fontColor');
    const ClockFontSizeInput = document.getElementById('ClockFontSize');
    const clockPositionInput = document.getElementById('clockPosition');
    const showSecondsInput = document.getElementById('showSeconds');
	// Day
    const dayElement = document.getElementById('day');
    const showDayInput = document.getElementById('showDay');
    const dayStyleInput = document.getElementById('dayStyle');
    const dayFontTypeInput = document.getElementById('dayFontType');
    const dayFontColorInput = document.getElementById('dayFontColor');
    const dayFontSizeInput = document.getElementById('dayFontSize');
    const dayPositionInput = document.getElementById('dayPosition');
    // Date
    const dateElement = document.getElementById('date');
	const dateSettingsGroup = document.getElementById('dateSettings');
    const dateToggle = document.getElementById('dateToggle');
    const dateHeader = document.getElementById('dateHeader');
    const dateFormatInput = document.getElementById('dateFormat');
    const showYearInput = document.getElementById('showYear');
    const yearFormatInput = document.getElementById('yearFormat');
    const dateFontTypeInput = document.getElementById('dateFontType');
    const dateFontColorInput = document.getElementById('dateFontColor');
    const dateFontSizeInput = document.getElementById('dateFontSize');
    const datePositionInput = document.getElementById('datePosition');
    const showDateInput = document.getElementById('showDate');

    const defaultSettings = {
        // Background settings
        background: "assets/default_background.mp4",
        muteBackground: true,
        backgroundBlur: 0, // Default blur level (0 means no blur)

        // Clock settings
        clockSettings: {
            showClock: true,
            format: "12",
            fontType: "Great Vibes",
            color: "#ffffff",
            size: "40",
            position: "center",
            showSeconds: false
        },

        // Day settings
        daySettings: {
            showDay: true,
            style: "Full", 
            fontType: "Anurati",
            color: "#ffffff",
            size: "90",
            position: "day-center"
        },

        // Date settings
        dateSettings: {
            showDate: true,
            format: "DD MMM", 
            fontType: "Great Vibes",
            color: "#ffffff",
            size: "50",
            position: "d-center",
            showYear: true,
            yearFormat: "full" 
        }
    };
    chrome.storage.local.get(["background", "clockSettings", "daySettings", "dateSettings", "muteBackground", "backgroundBlur"], function (data) {

    if (data.background) {
        applyBackground(data.background);
    } else {
        applyBackground(defaultSettings.background); // Use default background
    }

        const blurValue = data.backgroundBlur !== undefined ? data.backgroundBlur : defaultSettings.backgroundBlur;
        backgroundBlurInput.value = blurValue; // Set the slider value
        updateBackgroundBlur(blurValue); // Apply initial blur

    // Apply clock settings
    if (data.clockSettings) {
        applyClockSettings(data.clockSettings);
    } else {
        applyClockSettings(defaultSettings.clockSettings); // Use default clock settings
    }

    // Apply day settings
    if (data.daySettings) {
        applyDaySettings(data.daySettings);
    } else {
        applyDaySettings(defaultSettings.daySettings); // Use default day settings
    }

    // Apply date settings
    if (data.dateSettings) {
        applyDateSettings(data.dateSettings);
    } else {
        applyDateSettings(defaultSettings.dateSettings); // Use default date settings
    }

    // Apply mute setting
    if (data.muteBackground !== undefined) {
        toggleBackgroundSound(data.muteBackground);
    } else {
        toggleBackgroundSound(defaultSettings.muteBackground); // Use default mute setting
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
    // Event listener for background selection
    backgroundSelect.addEventListener('change', function () {
        const selectedValue = this.value;

        if (selectedValue === "custom") {
            customBackgroundLabel.style.display = 'block'; // Show label
            backgroundInput.style.display = 'block'; // Show file input

            // Check if there's a saved custom background
            chrome.storage.local.get('customBackground', function (result) {
                if (result.customBackground) {
                    applyBackground(result.customBackground); // Load and apply the last saved custom background
                }
            });
        } else {
            customBackgroundLabel.style.display = 'none'; // Hide label
            backgroundInput.style.display = 'none'; // Hide file input
            applyBackground(selectedValue); // Apply selected predefined background
        }
    });

    // Handle file selection for custom background
    backgroundInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const customBackgroundData = e.target.result;
                applyBackground(customBackgroundData); // Apply the new custom background

                // Save the custom background in storage
                chrome.storage.local.set({ customBackground: customBackgroundData }, function () {
                    console.log("Custom background saved.");
                });
            };
            reader.readAsDataURL(file);
        }
    });
    // Mute/Unmute background sound based on user input
    muteBackgroundInput.addEventListener("change", function() {
        const isMuted = muteBackgroundInput.checked;
        toggleBackgroundSound(isMuted);

        // Save mute setting in Chrome storage
        chrome.storage.local.set({ muteBackground: isMuted }, function() {
            console.log("Mute background sound setting saved:", isMuted);
        });
    });

    // Function to mute/unmute background video sound
    function toggleBackgroundSound(mute) {
        const videoElement = backgroundElement.querySelector("video");

        if (videoElement) {
            videoElement.muted = mute;
        }
    }
	
    function applyBackground(data) {
        // Check if the data is empty and set to default if needed
        if (!data || data === defaultSettings.background) {
            data = defaultSettings.background; // Use default background
        }

        // Clear existing content in the backgroundElement
        backgroundElement.innerHTML = '';

        // Determine if the data is a video, image, or GIF
        if (data.endsWith(".mp4") || data.startsWith("data:video")) {
            // If the background is a video
            const video = document.createElement('video');
            video.src = data; // Set the video source
            video.autoplay = true; // Automatically play the video
            video.loop = true; // Loop the video
            video.muted = muteBackgroundInput.checked; // Mute if checkbox is checked
            video.style.width = '100%'; // Full width
            video.style.height = '100%'; // Full height
            video.style.objectFit = 'cover'; // Cover the entire container
            video.style.position = 'absolute'; // Position absolute for full coverage

            // Append the video element to the backgroundElement
            backgroundElement.appendChild(video);

            // Add event listeners to handle video load
            video.onloadeddata = function () {
                // Video is loaded and can start playing
                video.play();
            };

            video.onerror = function () {
                console.error("Error loading video:", video.src);
            };

        } else {
            // If the background is an image or GIF
            backgroundElement.style.backgroundImage = `url(${data})`;
            backgroundElement.style.backgroundSize = 'cover'; // Cover the entire container
            backgroundElement.style.backgroundPosition = 'center'; // Center the background
            backgroundElement.style.position = 'absolute'; // Position absolute for full coverage

            // For GIFs, we don't need to add a separate element since they work as background images
        }
    }

	
    backgroundBlurInput.addEventListener('input', function() {
    const blurValue = this.value; // Get the current value of the slider
    updateBackgroundBlur(blurValue); // Apply the blur effect
    // Save the current blur level to storage
    chrome.storage.local.set({ backgroundBlur: blurValue }, function() {
        console.log("Background blur level saved:", blurValue);
    });
});

// Function to apply blur effect to the background
function updateBackgroundBlur(value) {
    backgroundElement.style.filter = `blur(${value}px)`; // Apply CSS blur filter
}
	
    backgroundHeader.addEventListener("click", () => {
        backgroundSettings.style.display = backgroundSettings.style.display === "block" ? "none" : "block";
        backgroundToggle.classList.toggle("rotated"); // Add or remove 'rotated' class to rotate arrow
    });

    dateHeader.addEventListener("click", () => {
    dateSettings.style.display = dateSettings.style.display === "block" ? "none" : "block";
    dateToggle.classList.toggle("rotated"); // Add or remove 'rotated' class to rotate arrow
    });

	dayHeader.addEventListener("click", () => {
    daySettings.style.display = daySettings.style.display === "block" ? "none" : "block";
    dayToggle.classList.toggle("rotated"); // Add or remove 'rotated' class to rotate arrow
    });

    clockHeader.addEventListener("click", () => {
        clockSettings.style.display = clockSettings.style.display === "block" ? "none" : "block";
        clockToggle.classList.toggle("rotated"); // Add or remove 'rotated' class to rotate arrow
    });
	

    // Initial state: Show or hide clock settings based on saved state
    chrome.storage.local.get(["clockSettings", "dateSettings", "daySettings"], function(data) {
        if (data.clockSettings && !data.clockSettings.showClock) {
            clockSettingsGroup.style.display = 'none';
            clockElement.style.display = 'none';
            showClockInput.checked = false;
        }
        if (data.dateSettings && !data.dateSettings.showDate) {
            dateSettingsGroup.style.display = 'none';
            dateElement.style.display = 'none';
            showDateInput.checked = false;
        }
        if (data.daySettings && !data.daySettings.showDay) {
            daySettings.style.display = 'none';
            dayElement.style.display = 'none';
            showDayInput.checked = false;
        }
    });

    fontColorInput.addEventListener('input', function () {
        clockElement.style.color = fontColorInput.value;

        // Save the clock color to chrome storage immediately
        chrome.storage.local.set({ clockColor: fontColorInput.value }, function () {
            console.log("Clock color saved:", fontColorInput.value);
        });
    });
	
    showClockInput.addEventListener("change", function() {
        clockElement.style.display = showClockInput.checked ? 'block' : 'none';

        // Save the clock visibility in chrome storage
        const clockSettings = {
            showClock: showClockInput.checked,
            format: timeFormatInput.value,
            fontType: fontTypeInput.value,
            color: fontColorInput.value,
            size: ClockFontSizeInput.value,
            position: clockPositionInput.value,
            showSeconds: showSecondsInput.checked
        };
        chrome.storage.local.set({ clockSettings: clockSettings }, function() {
            console.log("Clock settings updated.");
        });
    });

    // Clock settings
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const is12Hour = timeFormatInput.value === "12";

        // Format the time correctly
        if (is12Hour) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            // Add leading zeros for single-digit minutes and seconds
            clockElement.textContent = showSecondsInput.checked 
                ? `- ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm} -`
                : `- ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm} -`;
        } else {
            // Add leading zeros for single-digit hours, minutes, and seconds
            clockElement.textContent = showSecondsInput.checked 
                ? `- ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} -`
                : `- ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} -`;
        }

        setTimeout(updateClock, 1000);
    }

    function applyClockSettings(settings) {
		showClockInput.checked = settings.showClock !== undefined ? settings.showClock : true;
        clockElement.style.display = showClockInput.checked ? 'block' : 'none';
	
        timeFormatInput.value = settings.format || "12";
        fontTypeInput.value = settings.fontType || "Arial";
        fontColorInput.value = settings.color || "#ffffff";
        ClockFontSizeInput.value = settings.size || "40";
        clockPositionInput.value = settings.position || "center";
        showSecondsInput.checked = settings.showSeconds;

        clockElement.style.fontFamily = fontTypeInput.value;
        clockElement.style.color = fontColorInput.value;
        clockElement.style.fontSize = `${ClockFontSizeInput.value}px`;
        updateClockPosition(clockPositionInput.value);
    }

    function updateClockPosition(position) {
        clockElement.classList.remove("top-left", "top-right", "bottom-left", "bottom-right", "center", "free");

        if (position !== "free") {
            clockElement.style.left = '';
            clockElement.style.top = '';
            clockElement.style.position = '';
            removeElementDraggable(clockElement);
        }

        clockElement.classList.add(position);

        if (position === "free") {
            // Retrieve the last saved position from chrome storage
            chrome.storage.local.get(['clockPosition'], function(data) {
                if (data.clockPosition) {
                    clockElement.style.left = data.clockPosition.left;
                    clockElement.style.top = data.clockPosition.top;
                    clockElement.style.position = 'absolute';
                }
                makeElementDraggable(clockElement); // Enable drag
            });
        }
    }

    function updateClockFontSizeLabel() {
        const fontSizeSlider = document.getElementById('ClockFontSize');
        const ClockfontSizeLabel = document.getElementById('ClockfontSizeLabel');

        ClockfontSizeLabel.textContent = fontSizeSlider.value; // Update the label with the slider's value
        clockElement.style.fontSize = `${fontSizeSlider.value}px`; // Apply the font size to the Clock element
    }
    // Event listener for when the slider is used
    document.getElementById('ClockFontSize').addEventListener('input', updateClockFontSizeLabel);

    // Initial call to set the font size based on the default slider value
    updateClockFontSizeLabel();
	
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

                // Save the current drag position in chrome storage
                const position = {
                    left: element.style.left,
                    top: element.style.top
                };
                chrome.storage.local.set({ clockPosition: position }, function() {
                    console.log("Clock position saved:", position);
                });
            }
        });
    }

    function removeElementDraggable(element) {
        // Remove the event listeners for dragging
        document.removeEventListener("mousemove", element._onMouseMove);
        document.removeEventListener("mouseup", element._onMouseUp);
        element.removeEventListener("mousedown", element._onMouseDown);

        // Reset the saved handlers
        delete element._onMouseMove;
        delete element._onMouseUp;
        delete element._onMouseDown;
    }

        // Save clock settings on change
    [timeFormatInput, fontTypeInput, fontColorInput, ClockFontSizeInput, clockPositionInput, showSecondsInput].forEach(input => {
            input.addEventListener("change", function() {
                const clockSettings = {
                    format: timeFormatInput.value,
                    fontType: fontTypeInput.value,
                    color: fontColorInput.value,
                    size: ClockFontSizeInput.value,
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
		
		
    //-------------------------->DAY<-------------------------//
    // Update the day display
    function updateDay() {
        const now = new Date();
        const dayStyle = dayStyleInput.value; // This should reference your dayStyle select element
        let dayString = '';

        switch (dayStyle) {
            case 'Full':
                dayString = now.toLocaleString('default', { weekday: 'long' }).toUpperCase();
                break;
            case 'Short':
                dayString = now.toLocaleString('default', { weekday: 'short' }).toUpperCase();
                break;
        }

        // Insert a space between each letter
        dayString = dayString.split('').join(' ');

        // Update the day element with the formatted day string
        dayElement.textContent = dayString;
    }

    // Apply the day settings
    function applyDaySettings(settings) {
        dayStyleInput.value = settings.style || "Full"; 
        dayFontTypeInput.value = settings.fontType || "Anurati";
        dayFontColorInput.value = settings.color || "#ffffff";
        dayFontSizeInput.value = settings.size || "60";
        dayPositionInput.value = settings.position || "day-center";
        showDayInput.checked = settings.showDay !== undefined ? settings.showDay : true;

        dayElement.style.fontFamily = dayFontTypeInput.value;
        dayElement.style.color = dayFontColorInput.value;
        dayElement.style.fontSize = `${dayFontSizeInput.value}px`;
        updateDayPosition(dayPositionInput.value);

        // Show or hide day
        dayElement.style.display = showDayInput.checked ? 'block' : 'none';

        // Update the day immediately
        updateDay();
    }

    // Update day position
    function updateDayPosition(position) {
        dayElement.classList.remove("day-top-left", "day-top-right", "day-bottom-left", "day-bottom-right", "day-center", "free");
        dayElement.classList.add(position);

        if (position === "free") {
            makeElementDraggable(dayElement);
        } else {
            dayElement.style.position = 'absolute'; // Ensure position is absolute for other positions
            dayElement.style.left = '';
            dayElement.style.top = '';
        }
    }
    function updatedayFontSizeLabel() {
        const fontSizeSlider = document.getElementById('dayFontSize');
        const dayfontSizeLabel = document.getElementById('dayfontSizeLabel');

        dayfontSizeLabel.textContent = fontSizeSlider.value; // Update the label with the slider's value
        dayElement.style.fontSize = `${fontSizeSlider.value}px`; // Apply the font size to the day element
    }
    // Event listener for when the slider is used
    document.getElementById('dayFontSize').addEventListener('input', updatedayFontSizeLabel);

    // Initial call to set the font size based on the default slider value
    updatedayFontSizeLabel();


    // Save day settings
    [dayStyleInput, dayFontTypeInput, dayFontColorInput, dayFontSizeInput, dayPositionInput, showDayInput].forEach(input => {
        input.addEventListener("change", function () {
            const daySettings = {
                style: dayStyleInput.value,
                fontType: dayFontTypeInput.value,
                color: dayFontColorInput.value,
                size: dayFontSizeInput.value,
                position: dayPositionInput.value,
                showDay: showDayInput.checked
            };
            chrome.storage.local.set({ daySettings: daySettings }, function () {
                console.log("Day settings saved.");
            });
            applyDaySettings(daySettings);
        });
    });

    // Update day initially
    updateDay();

    // Update day text color live if the color is changed
    dayFontColorInput.addEventListener('input', function () {
        dayElement.style.color = dayFontColorInput.value;
    });

    // Save last drag position for the day
    function makeElementDraggable(element) {
        let offsetX, offsetY, isDragging = false;

        element.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.position = 'absolute';
        });

        document.addEventListener("mousemove", function (e) {
            if (isDragging) {
                element.style.left = (e.clientX - offsetX) + "px";
                element.style.top = (e.clientY - offsetY) + "px";
            }
        });

        document.addEventListener("mouseup", function () {
            if (isDragging) {
                isDragging = false;

                // Save the last drag position in chrome storage
                const position = {
                    left: element.style.left,
                    top: element.style.top
                };
                chrome.storage.local.set({ dayPosition: position }, function () {
                    console.log("Day position saved:", position);
                });
            }
        });
    }


    //---------------->DATE<-----------------//

    // Update the date display
    function updateDate() {
        const now = new Date();
        const format = dateFormatInput.value;
        const showYear = showYearInput.checked;
        const yearFormat = yearFormatInput.value; // "full" or "short"

        let yearString = now.getFullYear();
        if (yearFormat === "short") {
            yearString = String(yearString).slice(-2); // Shorten year to 2 digits
        }

        let dateString = '';
        switch (format) {
            case 'MM/DD/YYYY':
                dateString = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
                if (showYear) {
                    dateString += `/${yearString}`;
                }
                break;
            case 'DD/MM/YYYY':
                dateString = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
                if (showYear) {
                    dateString += `/${yearString}`;
                }
                break;
            case 'YYYY-MM-DD':
                if (showYear) {
                    dateString = `${yearString}-`;
                }
                dateString += `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                break;
            case 'DD MMM': // Format: 18 Sep
                dateString = `${now.getDate()} ${now.toLocaleString('en-US', { month: 'short' })}`;
                if (showYear) {
                    dateString += ` ${yearString}`;
                }
                break;
            case 'DD MMMM': // Format: 18 September
                dateString = `${now.getDate()} ${now.toLocaleString('en-US', { month: 'long' })}`;
                if (showYear) {
                    dateString += ` ${yearString}`;
                }
                break;
        }
        dateElement.textContent = dateString;
    }

    function toggleYearFormatVisibility() {
        const yearFormatContainer = document.getElementById('yearFormatContainer');
        if (showYearInput.checked) {
            yearFormatContainer.style.display = 'block'; // Show the year format dropdown
        } else {
            yearFormatContainer.style.display = 'none';  // Hide the year format dropdown
        }
    }
    // Apply the date settings
    // Apply the date settings
    function applyDateSettings(settings) {
        dateFormatInput.value = settings.format || "MM/DD/YYYY";
        dateFontTypeInput.value = settings.fontType || "Anurati";
        dateFontColorInput.value = settings.color || "#ffffff";
        dateFontSizeInput.value = settings.size || "45";
        datePositionInput.value = settings.position || "d-center";
        showDateInput.checked = settings.showDate !== undefined ? settings.showDate : true;
        showYearInput.checked = settings.showYear !== undefined ? settings.showYear : true;
        yearFormatInput.value = settings.yearFormat || "full";

        dateElement.style.fontFamily = dateFontTypeInput.value;
        dateElement.style.color = dateFontColorInput.value;
        dateElement.style.fontSize = `${dateFontSizeInput.value}px`;
        updateDatePosition(datePositionInput.value);

        // Show or hide date
        dateElement.style.display = showDateInput.checked ? 'block' : 'none';

        // Toggle the visibility of the year format dropdown
        toggleYearFormatVisibility();

        // Update the date immediately
        updateDate();
    }
    showYearInput.addEventListener('change', toggleYearFormatVisibility);
    toggleYearFormatVisibility();

    // Update date position
    function updateDatePosition(position) {
        dateElement.classList.remove("d-top-left", "d-top-right", "d-bottom-left", "d-bottom-right", "d-center", "free");
        dateElement.classList.add(position);

        if (position === "free") {
            makeElementDraggable(dateElement);
        } else {
            dateElement.style.position = '';
            dateElement.style.left = '';
            dateElement.style.top = '';
        }
    }
    function updatedateFontSizeLabel() {
        const fontSizeSlider = document.getElementById('dateFontSize');
        const datefontSizeLabel = document.getElementById('datefontSizeLabel');

        datefontSizeLabel.textContent = fontSizeSlider.value; // Update the label with the slider's value
        dateElement.style.fontSize = `${fontSizeSlider.value}px`; // Apply the font size to the date element
    }
    // Event listener for when the slider is used
    document.getElementById('dateFontSize').addEventListener('input', updatedateFontSizeLabel);

    // Initial call to set the font size based on the default slider value
    updatedateFontSizeLabel();

    // Save date settings
    [dateFormatInput, dateFontTypeInput, dateFontColorInput, dateFontSizeInput, datePositionInput, showDateInput, showYearInput, yearFormatInput].forEach(input => {
        input.addEventListener("change", function () {
            const dateSettings = {
                format: dateFormatInput.value,
                fontType: dateFontTypeInput.value,
                color: dateFontColorInput.value,
                size: dateFontSizeInput.value,
                position: datePositionInput.value,
                showDate: showDateInput.checked,
                showYear: showYearInput.checked,
                yearFormat: yearFormatInput.value
            };
            chrome.storage.local.set({ dateSettings: dateSettings }, function () {
                console.log("Date settings saved.");
            });
            applyDateSettings(dateSettings);
        });
    });

    // Update date initially
    updateDate();

    // Update the date live if the color is changed
    dateFontColorInput.addEventListener('input', function () {
        dateElement.style.color = dateFontColorInput.value;
    });

    // Save last drag position for the date
    function makeElementDraggable(element) {
        let offsetX, offsetY, isDragging = false;

        element.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.position = 'absolute';
        });

        document.addEventListener("mousemove", function (e) {
            if (isDragging) {
                element.style.left = (e.clientX - offsetX) + "px";
                element.style.top = (e.clientY - offsetY) + "px";
            }
        });

        document.addEventListener("mouseup", function () {
            if (isDragging) {
                isDragging = false;

                // Save the last drag position in chrome storage
                const position = {
                    left: element.style.left,
                    top: element.style.top
                };
                chrome.storage.local.set({ datePosition: position }, function () {
                    console.log("Date position saved:", position);
                });
            }
        });
    }
    document.getElementById('resetButton').addEventListener('click', function () {
        // Clear Chrome storage and set the default settings
        chrome.storage.local.set(defaultSettings, function () {
            console.log("Default settings applied.");
            location.reload(); // Reload to apply defaults
        });
    });

});


