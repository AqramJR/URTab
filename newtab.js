document.addEventListener("DOMContentLoaded", function () {
    // Background Elements
    const backgroundElement = document.getElementById('background');
    const muteBackgroundInput = document.getElementById('muteBackground');
    const backgroundSelect = document.getElementById('backgroundSelect');
    const customBackgroundLabel = document.getElementById('customBackgroundLabel');
    const backgroundToggle = document.getElementById('backgroundToggle');
    const backgroundBlurInput = document.getElementById('backgroundBlur');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsPopup = document.getElementById('settingsPopup');
    const backgroundInput = document.getElementById('backgroundInput');

    // Clock Elements
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

    // Day Elements
    const dayElement = document.getElementById('day');
    const showDayInput = document.getElementById('showDay');
    const dayStyleInput = document.getElementById('dayStyle');
    const dayFontTypeInput = document.getElementById('dayFontType');
    const dayFontColorInput = document.getElementById('dayFontColor');
    const dayFontSizeInput = document.getElementById('dayFontSize');
    const dayPositionInput = document.getElementById('dayPosition');

    // Date Elements
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

    // Loading Animations
    const animations = [
        "pulse",
        "spinner",
        "dots",
        "progress-bar",
        "wave",
        "glow",
        "cube"
    ];

    // Default Settings
    const defaultSettings = {
        // Background settings
        background: "assets/default_background.mp4",
        muteBackground: true,
        backgroundBlur: 0, 

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


    // ==================== Settings Synchronization ====================
    function syncSettingsMenu() {
        chrome.storage.local.get(
            ["backgroundKey", "clockSettings", "daySettings", "dateSettings", "muteBackground", "backgroundBlur"],
            function (data) {
                // Sync Background Settings
                if (data.backgroundKey) {
                    backgroundSelect.value = "custom";
                    customBackgroundLabel.style.display = 'block';
                    backgroundInput.style.display = 'block';
                } else {
                    backgroundSelect.value = defaultSettings.background;
                }

                if (data.muteBackground !== undefined) {
                    muteBackgroundInput.checked = data.muteBackground;
                } else {
                    muteBackgroundInput.checked = defaultSettings.muteBackground;
                }

                if (data.backgroundBlur !== undefined) {
                    backgroundBlurInput.value = data.backgroundBlur;
                } else {
                    backgroundBlurInput.value = defaultSettings.backgroundBlur;
                }

                // Sync Clock Settings
                if (data.clockSettings) {
                    showClockInput.checked = data.clockSettings.showClock;
                    timeFormatInput.value = data.clockSettings.format;
                    fontTypeInput.value = data.clockSettings.fontType;
                    fontColorInput.value = data.clockSettings.color;
                    ClockFontSizeInput.value = data.clockSettings.size;
                    clockPositionInput.value = data.clockSettings.position;
                    showSecondsInput.checked = data.clockSettings.showSeconds;
                } else {
                    showClockInput.checked = defaultSettings.clockSettings.showClock;
                    timeFormatInput.value = defaultSettings.clockSettings.format;
                    fontTypeInput.value = defaultSettings.clockSettings.fontType;
                    fontColorInput.value = defaultSettings.clockSettings.color;
                    ClockFontSizeInput.value = defaultSettings.clockSettings.size;
                    clockPositionInput.value = defaultSettings.clockSettings.position;
                    showSecondsInput.checked = defaultSettings.clockSettings.showSeconds;
                }

                // Sync Day Settings
                if (data.daySettings) {
                    showDayInput.checked = data.daySettings.showDay;
                    dayStyleInput.value = data.daySettings.style;
                    dayFontTypeInput.value = data.daySettings.fontType;
                    dayFontColorInput.value = data.daySettings.color;
                    dayFontSizeInput.value = data.daySettings.size;
                    dayPositionInput.value = data.daySettings.position;
                } else {
                    showDayInput.checked = defaultSettings.daySettings.showDay;
                    dayStyleInput.value = defaultSettings.daySettings.style;
                    dayFontTypeInput.value = defaultSettings.daySettings.fontType;
                    dayFontColorInput.value = defaultSettings.daySettings.color;
                    dayFontSizeInput.value = defaultSettings.daySettings.size;
                    dayPositionInput.value = defaultSettings.daySettings.position;
                }

                // Sync Date Settings
                if (data.dateSettings) {
                    showDateInput.checked = data.dateSettings.showDate;
                    showYearInput.checked = data.dateSettings.showYear;
                    yearFormatInput.value = data.dateSettings.yearFormat;
                    dateFormatInput.value = data.dateSettings.format;
                    dateFontTypeInput.value = data.dateSettings.fontType;
                    dateFontColorInput.value = data.dateSettings.color;
                    dateFontSizeInput.value = data.dateSettings.size;
                    datePositionInput.value = data.dateSettings.position;
                } else {
                    showDateInput.checked = defaultSettings.dateSettings.showDate;
                    showYearInput.checked = defaultSettings.dateSettings.showYear;
                    yearFormatInput.value = defaultSettings.dateSettings.yearFormat;
                    dateFormatInput.value = defaultSettings.dateSettings.format;
                    dateFontTypeInput.value = defaultSettings.dateSettings.fontType;
                    dateFontColorInput.value = defaultSettings.dateSettings.color;
                    dateFontSizeInput.value = defaultSettings.dateSettings.size;
                    datePositionInput.value = defaultSettings.dateSettings.position;
                }
            }
        );
    }

    // ==================== Loading Screen Functions ====================
    function applyRandomAnimation() {
        const loadingScreen = document.getElementById("loadingScreen");
        const loader = document.createElement("div");
        loader.className = "loader";

        // Randomly select an animation
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        loader.classList.add(randomAnimation);

        // Add dots or wave elements if needed
        if (randomAnimation === "dots") {
            loader.innerHTML = `<div></div><div></div><div></div>`;
        } else if (randomAnimation === "wave") {
            loader.innerHTML = `<div></div><div></div><div></div><div></div>`;
        } else if (randomAnimation === "cube") {
            loader.innerHTML = `<div></div><div></div><div></div><div></div><div></div><div></div>`;
        }

        // Clear any existing loader and add the new one
        loadingScreen.innerHTML = '';
        loadingScreen.appendChild(loader);
    }

    function hideLoadingScreen() {
        const loadingScreen = document.getElementById("loadingScreen");
        loadingScreen.style.opacity = "0";

        setTimeout(function () {
            loadingScreen.style.display = "none";
        }, 500); // Match the transition duration (0.5s)
    }

    // ==================== Draggable Elements ====================
    function makeElementDraggable(element, storageKey) {
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
                chrome.storage.local.set({ [storageKey]: position }, function () {
                    console.log(`${storageKey} saved:`, position);
                });
            }
        });
    }

    // ==================== IndexedDB Functions ====================
    function storeFileInIndexedDB(file, callback) {
        const request = indexedDB.open("BackgroundDB", 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('backgrounds')) {
                db.createObjectStore('backgrounds');
            }
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('backgrounds', 'readwrite');
            const store = transaction.objectStore('backgrounds');
            const fileRequest = store.put(file, 'background');

            fileRequest.onsuccess = function () {
                callback(null, 'background');
            };

            fileRequest.onerror = function (error) {
                callback(error);
            };
        };

        request.onerror = function (error) {
            callback(error);
        };
    }

    function getFileFromIndexedDB(key, callback) {
        const request = indexedDB.open("BackgroundDB", 1);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('backgrounds', 'readonly');
            const store = transaction.objectStore('backgrounds');
            const fileRequest = store.get(key);

            fileRequest.onsuccess = function () {
                callback(null, fileRequest.result);
            };

            fileRequest.onerror = function (error) {
                callback(error);
            };
        };

        request.onerror = function (error) {
            callback(error);
        };
    }

    // ==================== Background Functions ====================
    function updateBackgroundBlur(value) {
        const backgroundContent = document.getElementById('backgroundContent');
        backgroundContent.style.filter = `blur(${value}px)`; // Apply CSS blur filter to the child element
    }

    function toggleBackgroundSound(mute) {
        const videoElement = backgroundElement.querySelector("video");

        if (videoElement) {
            videoElement.muted = mute;
        }
    }

    function applyBackground(data) {
        if (!data || data === defaultSettings.background) {
            data = defaultSettings.background;
        }

        const backgroundContent = document.getElementById('backgroundContent');
        backgroundContent.innerHTML = '';

        if (typeof data === 'string' && (data.endsWith(".mp4") || data.startsWith("data:video"))) {
            // Handle default or DataURL backgrounds
            const video = document.createElement('video');
            video.src = data;
            video.autoplay = true;
            video.loop = true;
            video.muted = muteBackgroundInput.checked;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.position = 'absolute';

            backgroundContent.appendChild(video);

            video.onloadeddata = function () {
                video.play();
                hideLoadingScreen(); // Hide loading screen after video loads
            };

            video.onerror = function () {
                console.error("Error loading video:", video.src);
                hideLoadingScreen(); // Hide loading screen even if video fails
            };
        } else if (data instanceof Blob || data instanceof File) {
            // Handle Blob or File objects
            const video = document.createElement('video');
            video.src = URL.createObjectURL(data); // Use Blob URL
            video.autoplay = true;
            video.loop = true;
            video.muted = muteBackgroundInput.checked;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.position = 'absolute';

            backgroundContent.appendChild(video);

            video.onloadeddata = function () {
                video.play();
                hideLoadingScreen(); // Hide loading screen after video loads
            };

            video.onerror = function () {
                console.error("Error loading video:", video.src);
                hideLoadingScreen(); // Hide loading screen even if video fails
            };
        } else {
            // Handle image or GIF backgrounds
            backgroundContent.style.backgroundImage = `url(${data})`;
            backgroundContent.style.backgroundSize = 'cover';
            backgroundContent.style.backgroundPosition = 'center';
            hideLoadingScreen(); // Hide loading screen after image loads
        }
    }

    // ==================== Clock Functions ====================
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
            chrome.storage.local.get(['clockPosition'], function (data) {
                if (data.clockPosition) {
                    clockElement.style.left = data.clockPosition.left;
                    clockElement.style.top = data.clockPosition.top;
                    clockElement.style.position = 'absolute';
                }
                makeElementDraggable(clockElement, 'clockPosition');
            });
        }
    }

    function updateClockFontSizeLabel() {
        const fontSizeSlider = document.getElementById('ClockFontSize');
        const ClockfontSizeLabel = document.getElementById('ClockfontSizeLabel');

        ClockfontSizeLabel.textContent = fontSizeSlider.value; // Update the label with the slider's value
        clockElement.style.fontSize = `${fontSizeSlider.value}px`; // Apply the font size to the Clock element
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

    // ==================== Day Functions ====================
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

    function updateDayPosition(position) {
        dayElement.classList.remove("day-top-left", "day-top-right", "day-bottom-left", "day-bottom-right", "day-center", "free");
        dayElement.classList.add(position);

        if (position === "free") {
            makeElementDraggable(dayElement, 'dayPosition');
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

    // ==================== Date Functions ====================
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

    function updateDatePosition(position) {
        dateElement.classList.remove("d-top-left", "d-top-right", "d-bottom-left", "d-bottom-right", "d-center", "free");
        dateElement.classList.add(position);

        if (position === "free") {
            makeElementDraggable(dateElement, 'datePosition');
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

    // ==================== Initialization ====================

        // Initialize settings and apply random animation
        syncSettingsMenu();
        applyRandomAnimation();

        // Load saved settings and apply them
        chrome.storage.local.get(
            ["backgroundKey", "clockSettings", "daySettings", "dateSettings", "muteBackground", "backgroundBlur"],
            function (data) {
                // Apply background
                if (data.backgroundKey) {
                    getFileFromIndexedDB(data.backgroundKey, function (error, file) {
                        if (error) {
                            console.error("Error retrieving file from IndexedDB:", error);
                            applyBackground(defaultSettings.background); // Fallback to default
                            return;
                        }
                        applyBackground(file); // Apply the background from IndexedDB
                    });
                } else {
                    applyBackground(defaultSettings.background); // Fallback to default
                }

                // Apply background blur
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
            }
        );


    // ==================== Event Listeners ====================

    // Toggle settings popup
    settingsIcon.addEventListener("click", function () {
        settingsPopup.style.display = settingsPopup.style.display === 'block' ? 'none' : 'block';
    });

    // Close settings menu when clicking outside
    document.addEventListener("click", function (event) {
        const isClickInsidePopup = settingsPopup.contains(event.target);
        const isClickOnSettingsIcon = settingsIcon.contains(event.target);

        if (!isClickInsidePopup && !isClickOnSettingsIcon) {
            settingsPopup.style.display = 'none';
        }
    });

    // Handle background selection
    backgroundInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file.size > 200 * 1024 * 1024) {
            alert("Background file must be under 200MB.");
            return;
        }

        // Show loading screen
        const loadingScreen = document.getElementById("loadingScreen");
        loadingScreen.style.display = "flex";
        loadingScreen.style.opacity = "1";
        applyRandomAnimation(); // Apply a random animation

        storeFileInIndexedDB(file, function (error, key) {
            if (error) {
                console.error("Error storing file in IndexedDB:", error);
                hideLoadingScreen(); // Hide loading screen if there's an error
                return;
            }

            // Save the key to chrome.storage.local
            chrome.storage.local.set({ backgroundKey: key }, function () {
                console.log("Background key saved.");
            });

            // Apply the background
            const reader = new FileReader();
            reader.onload = function (e) {
                applyBackground(e.target.result);
            };
            reader.readAsDataURL(file);
        });
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
    muteBackgroundInput.addEventListener("change", function () {
        const isMuted = muteBackgroundInput.checked;
        toggleBackgroundSound(isMuted);

        // Save mute setting in Chrome storage
        chrome.storage.local.set({ muteBackground: isMuted }, function () {
            console.log("Mute background sound setting saved:", isMuted);
        });
    });

    // Handle background blur
    backgroundBlurInput.addEventListener('input', function () {
        const blurValue = this.value; // Get the current value of the slider
        updateBackgroundBlur(blurValue); // Apply the blur effect
        // Save the current blur level to storage
        chrome.storage.local.set({ backgroundBlur: blurValue }, function () {
            console.log("Background blur level saved:", blurValue);
        });
    });

    // Toggle settings groups
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

    // ==================== Initial State ====================
    // Show or hide clock, date, and day settings based on saved state
    chrome.storage.local.get(["clockSettings", "dateSettings", "daySettings"], function (data) {
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

    // ==================== Clock Event Listeners ====================
    fontColorInput.addEventListener('input', function () {
        clockElement.style.color = fontColorInput.value;

        // Save the clock color to chrome storage immediately
        chrome.storage.local.set({ clockColor: fontColorInput.value }, function () {
            console.log("Clock color saved:", fontColorInput.value);
        });
    });

    showClockInput.addEventListener("change", function () {
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
        chrome.storage.local.set({ clockSettings: clockSettings }, function () {
            console.log("Clock settings updated.");
        });
    });

    // Event listener for clock font size slider
    document.getElementById('ClockFontSize').addEventListener('input', updateClockFontSizeLabel);

    // Initial call to set the font size based on the default slider value
    updateClockFontSizeLabel();

    // Save clock settings on change
    [timeFormatInput, fontTypeInput, fontColorInput, ClockFontSizeInput, clockPositionInput, showSecondsInput].forEach(input => {
        input.addEventListener("change", function () {
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
            chrome.storage.local.set({ clockSettings: clockSettings }, function () {
                console.log("Clock settings saved.");
            });
            applyClockSettings(clockSettings);
        });
    });

    // Update clock initially
    updateClock();

    // ==================== Day Event Listeners ====================
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

    // ==================== Date Event Listeners ====================
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

    // Toggle year format visibility
    showYearInput.addEventListener('change', toggleYearFormatVisibility);
    toggleYearFormatVisibility();

    // Update date initially
    updateDate();

    // Update the date live if the color is changed
    dateFontColorInput.addEventListener('input', function () {
        dateElement.style.color = dateFontColorInput.value;
    });

    // ==================== Reset Button ====================
    document.getElementById('resetButton').addEventListener('click', function () {
        // Clear the background key from storage
        chrome.storage.local.remove("backgroundKey", function () {
            console.log("Background key cleared.");
            // Apply the default background
            applyBackground(defaultSettings.background);
        });
        chrome.storage.local.set(defaultSettings, function () {
            console.log("Default settings applied.");
        });
        location.reload(); // Reload to apply defaults
    });

});


