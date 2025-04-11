document.addEventListener("DOMContentLoaded", function () {
    // Background Elements
    const backgroundElement = document.getElementById('background');
    const muteBackgroundInput = document.getElementById('muteBackground');
    const muteCheckbox = document.getElementById('muteBackground');
    const hintElement = document.querySelector('.hint');
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
    const clockdragButton = document.getElementById('clockdragButton');
    let isClockDraggingEnabled = false;
  

    // Day Elements
    const dayElement = document.getElementById('day');
    const showDayInput = document.getElementById('showDay');
    const dayStyleInput = document.getElementById('dayStyle');
    const dayFontTypeInput = document.getElementById('dayFontType');
    const dayFontColorInput = document.getElementById('dayFontColor');
    const dayFontSizeInput = document.getElementById('dayFontSize');
    const dayPositionInput = document.getElementById('dayPosition');
    const dayDragButton = document.getElementById('dayDragButton');
    let isDayDraggingEnabled = false;

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
    const dateDragButton = document.getElementById('dateDragButton');
    let isDateDraggingEnabled = false;

    // Sites Widget Elements
    const sitesElement = document.getElementById('sites');
    const showSitesInput = document.getElementById('showSites');
    const sitesViewInput = document.getElementById('sitesView');
    const sitesPositionInput = document.getElementById('sitesPosition');
    const sitesStyleInput = document.getElementById('sitesStyle');
    const sitesShowIconsInput = document.getElementById('sitesShowIcons');
    const sitesShowTitlesInput = document.getElementById('sitesShowTitles');
    const sitesDragButton = document.getElementById('sitesDragButton');
    const bookmarksFolderInput = document.getElementById('bookmarksFolder');
    const recentTimeRangeInput = document.getElementById('recentTimeRange');
    const mostVisitedCountInput = document.getElementById('mostVisitedCount');
    const customSitesList = document.getElementById('customSitesList');
    const addCustomSiteButton = document.getElementById('addCustomSite');
    let isSitesDraggingEnabled = false;

    // Add folder navigation state
    let folderNavigationStack = [];
    let currentFolderId = '';
    let folderStates = new Map(); // Track folder open/closed states

    // Function to toggle folder state
    function toggleFolder(folderId) {
        const currentState = folderStates.get(folderId) || 'closed';
        const newState = currentState === 'closed' ? 'open' : 'closed';
        folderStates.set(folderId, newState);
        return newState;
    }

    // Weather Elements
    const weatherElement = document.getElementById('weather');
    const showWeatherInput = document.getElementById('showWeather');
    const weatherUnitInput = document.getElementById('weatherUnit');
    const weatherFontTypeInput = document.getElementById('weatherFontType');
    const weatherFontColorInput = document.getElementById('weatherFontColor');
    const weatherFontSizeInput = document.getElementById('weatherFontSize');
    const weatherPositionInput = document.getElementById('weatherPosition');
    const weatherDragButton = document.getElementById('weatherDragButton');
    let isWeatherDraggingEnabled = false;

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

    // Hover Effects Elements
    const enableHoverEffectsInput = document.getElementById('enableHoverEffects');
    const hoverEffectsSettings = document.getElementById('hoverEffectsSettings');
    const hoverEffectsToggle = document.getElementById('hoverEffectsToggle');
    const hoverEffectsHeader = document.getElementById('hoverEffectsHeader');

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
        },

        sitesSettings: {
            showSites: true,
            view: 'bookmarks',
            position: 'top-left',
            style: 'grid',
            showIcons: true,
            showTitles: true,
            bookmarksFolder: 'bookmarks_bar',
            recentTimeRange: 'today',
            mostVisitedCount: 8,
            customSites: []
        },

        // Weather settings
        weatherSettings: {
            showWeather: true,
            unit: "metric",
            fontType: "Quicksand",
            color: "#ffffff",
            size: "40",
            position: "top-right"
        },

        // Hover Effects settings
        hoverEffectsSettings: {
            enabled: true
        }
    };

    // Initialize settings with default values
    let settings = { ...defaultSettings };

    // ==================== Settings Synchronization ====================
    function syncSettingsMenu() {
        chrome.storage.local.get(
            ["backgroundKey", "clockSettings", "daySettings", "dateSettings", "muteBackground", "backgroundBlur", "sitesSettings", "weatherSettings", "hoverEffectsSettings"],
            function (data) {
                // Update settings object with stored values
                if (data.clockSettings) settings.clockSettings = data.clockSettings;
                if (data.daySettings) settings.daySettings = data.daySettings;
                if (data.dateSettings) settings.dateSettings = data.dateSettings;
                if (data.sitesSettings) settings.sitesSettings = data.sitesSettings;
                if (data.weatherSettings) settings.weatherSettings = data.weatherSettings;
                if (data.muteBackground !== undefined) settings.muteBackground = data.muteBackground;
                if (data.backgroundBlur !== undefined) settings.backgroundBlur = data.backgroundBlur;
                if (data.hoverEffectsSettings) settings.hoverEffectsSettings = data.hoverEffectsSettings;

                // Sync UI elements with settings
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
                if (data.sitesSettings) {
                    applySitesSettings(data.sitesSettings);
                } else {
                    applySitesSettings(defaultSettings.sitesSettings);
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

                // Sync Weather Settings
                if (data.weatherSettings) {
                    showWeatherInput.checked = data.weatherSettings.showWeather;
                    weatherUnitInput.value = data.weatherSettings.unit;
                    weatherFontTypeInput.value = data.weatherSettings.fontType;
                    weatherFontColorInput.value = data.weatherSettings.color;
                    weatherFontSizeInput.value = data.weatherSettings.size;
                    weatherPositionInput.value = data.weatherSettings.position;
                } else {
                    showWeatherInput.checked = defaultSettings.weatherSettings.showWeather;
                    weatherUnitInput.value = defaultSettings.weatherSettings.unit;
                    weatherFontTypeInput.value = defaultSettings.weatherSettings.fontType;
                    weatherFontColorInput.value = defaultSettings.weatherSettings.color;
                    weatherFontSizeInput.value = defaultSettings.weatherSettings.size;
                    weatherPositionInput.value = defaultSettings.weatherSettings.position;
                }

                // Sync Sites Settings
                if (data.sitesSettings) {
                    showSitesInput.checked = data.sitesSettings.showSites;
                    sitesViewInput.value = data.sitesSettings.view;
                    sitesPositionInput.value = data.sitesSettings.position;
                    sitesStyleInput.value = data.sitesSettings.style;
                    sitesShowIconsInput.checked = data.sitesSettings.showIcons;
                    sitesShowTitlesInput.checked = data.sitesSettings.showTitles;
                    bookmarksFolderInput.value = data.sitesSettings.bookmarksFolder;
                    recentTimeRangeInput.value = data.sitesSettings.recentTimeRange;
                    mostVisitedCountInput.value = data.sitesSettings.mostVisitedCount;
                } else {
                    showSitesInput.checked = defaultSettings.sitesSettings.showSites;
                    sitesViewInput.value = defaultSettings.sitesSettings.view;
                    sitesPositionInput.value = defaultSettings.sitesSettings.position;
                    sitesStyleInput.value = defaultSettings.sitesSettings.style;
                    sitesShowIconsInput.checked = defaultSettings.sitesSettings.showIcons;
                    sitesShowTitlesInput.checked = defaultSettings.sitesSettings.showTitles;
                    bookmarksFolderInput.value = defaultSettings.sitesSettings.bookmarksFolder;
                    recentTimeRangeInput.value = defaultSettings.sitesSettings.recentTimeRange;
                    mostVisitedCountInput.value = defaultSettings.sitesSettings.mostVisitedCount;
                }

                // Sync Hover Effects Settings
                if (data.hoverEffectsSettings) {
                    enableHoverEffectsInput.checked = data.hoverEffectsSettings.enabled;
                    toggleHoverEffects(data.hoverEffectsSettings.enabled);
                } else {
                    enableHoverEffectsInput.checked = defaultSettings.hoverEffectsSettings.enabled;
                    toggleHoverEffects(defaultSettings.hoverEffectsSettings.enabled);
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
    function makeElementDraggable(element, storageKey, isDraggingEnabled) {
        let offsetX, offsetY, isDragging = false;

        // Store the event listeners on the element for later removal
        element._onMouseDown = function (e) {
            if (!isDraggingEnabled) return; // Only allow dragging if enabled
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.position = 'absolute';
            element.style.cursor = 'grabbing'; // Change cursor to "grabbing" while dragging
        };

        element._onMouseMove = function (e) {
            if (isDragging && isDraggingEnabled) {
                element.style.left = (e.clientX - offsetX) + "px";
                element.style.top = (e.clientY - offsetY) + "px";
            }
        };

        element._onMouseUp = function () {
            if (isDragging && isDraggingEnabled) {
                isDragging = false;
                element.style.cursor = 'grab'; // Change cursor back to "grab" after dragging
            }
        };

        // Attach the event listeners
        element.addEventListener("mousedown", element._onMouseDown);
        document.addEventListener("mousemove", element._onMouseMove);
        document.addEventListener("mouseup", element._onMouseUp);

        // Set the initial cursor style
        element.style.cursor = 'grab';
    }

    function removeElementDraggable(element) {
        // Remove the event listeners for dragging
        element.removeEventListener("mousedown", element._onMouseDown);
        document.removeEventListener("mousemove", element._onMouseMove);
        document.removeEventListener("mouseup", element._onMouseUp);

        // Reset the cursor style
        element.style.cursor = 'default';

        // Reset the saved handlers
        delete element._onMouseDown;
        delete element._onMouseMove;
        delete element._onMouseUp;
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

    // Function to update the hint text
    function updateHint() {
        if (muteCheckbox.checked) {
            hintElement.textContent = hintElement.getAttribute('data-hint-unmute'); // Show "Unmute"
        } else {
            hintElement.textContent = hintElement.getAttribute('data-hint-mute'); // Show "Mute"
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
            // Reset the clock's position to the default for the selected position
            clockElement.style.left = '';
            clockElement.style.top = '';
            clockElement.style.position = '';
            removeElementDraggable(clockElement); // Disable dragging
            clockdragButton.style.display = 'none'; // Hide the drag button
        } else {
            clockElement.classList.add("free");
            clockdragButton.style.display = 'inline-block'; // Show the drag button
        }

        // Apply the selected position
        clockElement.classList.add(position);

        // Retrieve the last saved position from chrome storage (only for "free" position)
        if (position === "free") {
            chrome.storage.local.get(['clockPosition'], function (data) {
                if (data.clockPosition) {
                    clockElement.style.left = data.clockPosition.left;
                    clockElement.style.top = data.clockPosition.top;
                    clockElement.style.position = 'absolute';
                }
            });
        }
    }
    function saveClockPosition() {
        const position = {
            left: clockElement.style.left,
            top: clockElement.style.top
        };
        chrome.storage.local.set({ clockPosition: position }, function () {
            console.log("Clock position saved:", position);
        });
    }
    function updateClockFontSizeLabel() {
        const fontSizeSlider = document.getElementById('ClockFontSize');
        const ClockfontSizeLabel = document.getElementById('ClockfontSizeLabel');

        ClockfontSizeLabel.textContent = fontSizeSlider.value; // Update the label with the slider's value
        clockElement.style.fontSize = `${fontSizeSlider.value}px`; // Apply the font size to the Clock element
    }

    function toggleClockSettings(enable) {
        const clockSettingsInputs = [
            timeFormatInput,
            fontTypeInput,
            fontColorInput,
            ClockFontSizeInput,
            clockPositionInput,
            showSecondsInput,
            clockdragButton
        ];

        clockSettingsInputs.forEach(input => {
            input.disabled = !enable;
            if (input.type === 'color' || input.type === 'range') {
                input.style.opacity = enable ? 1 : 0.5; // Adjust opacity for visual feedback
            } else {
                input.style.opacity = enable ? 1 : 0.5;
            }
        });
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

        if (position !== "free") {
            // Reset the day's position to the default for the selected position
            dayElement.style.left = '';
            dayElement.style.top = '';
            dayElement.style.position = '';
            removeElementDraggable(dayElement); // Disable dragging
            dayDragButton.style.display = 'none'; // Hide the drag button
        } else {
            dayElement.classList.add("free");
            dayDragButton.style.display = 'inline-block'; // Show the drag button
        }

        // Apply the selected position
        dayElement.classList.add(position);

        // Retrieve the last saved position from chrome storage (only for "free" position)
        if (position === "free") {
            chrome.storage.local.get(['dayPosition'], function (data) {
                if (data.dayPosition) {
                    dayElement.style.left = data.dayPosition.left;
                    dayElement.style.top = data.dayPosition.top;
                    dayElement.style.position = 'absolute';
                }
            });
        }
    }
    function saveDayPosition() {
        const position = {
            left: dayElement.style.left,
            top: dayElement.style.top
        };
        chrome.storage.local.set({ dayPosition: position }, function () {
            console.log("Day position saved:", position);
        });
    }
    function updatedayFontSizeLabel() {
        const fontSizeSlider = document.getElementById('dayFontSize');
        const dayfontSizeLabel = document.getElementById('dayfontSizeLabel');

        dayfontSizeLabel.textContent = fontSizeSlider.value; // Update the label with the slider's value
        dayElement.style.fontSize = `${fontSizeSlider.value}px`; // Apply the font size to the day element
    }

    function toggleDaySettings(enable) {
        const daySettingsInputs = [
            dayStyleInput,
            dayFontTypeInput,
            dayFontColorInput,
            dayFontSizeInput,
            dayPositionInput,
            dayDragButton
        ];

        daySettingsInputs.forEach(input => {
            input.disabled = !enable;
            if (input.type === 'color' || input.type === 'range') {
                input.style.opacity = enable ? 1 : 0.5; // Adjust opacity for visual feedback
            } else {
                input.style.opacity = enable ? 1 : 0.5;
            }
        });
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

        if (position !== "free") {
            // Reset the date's position to the default for the selected position
            dateElement.style.left = '';
            dateElement.style.top = '';
            dateElement.style.position = '';
            removeElementDraggable(dateElement); // Disable dragging
            dateDragButton.style.display = 'none'; // Hide the drag button
        } else {
            dateElement.classList.add("free");
            dateDragButton.style.display = 'inline-block'; // Show the drag button
        }

        // Apply the selected position
        dateElement.classList.add(position);

        // Retrieve the last saved position from chrome storage (only for "free" position)
        if (position === "free") {
            chrome.storage.local.get(['datePosition'], function (data) {
                if (data.datePosition) {
                    dateElement.style.left = data.datePosition.left;
                    dateElement.style.top = data.datePosition.top;
                    dateElement.style.position = 'absolute';
                }
            });
        }
    }

    function saveDatePosition() {
        const position = {
            left: dateElement.style.left,
            top: dateElement.style.top
        };
        chrome.storage.local.set({ datePosition: position }, function () {
            console.log("Date position saved:", position);
        });
    }

    function updatedateFontSizeLabel() {
        const fontSizeSlider = document.getElementById('dateFontSize');
        const datefontSizeLabel = document.getElementById('datefontSizeLabel');

        datefontSizeLabel.textContent = fontSizeSlider.value; // Update the label with the slider's value
        dateElement.style.fontSize = `${fontSizeSlider.value}px`; // Apply the font size to the date element
    }

    function toggleDateSettings(enable) {
        const dateSettingsInputs = [
            dateFormatInput,
            dateFontTypeInput,
            dateFontColorInput,
            dateFontSizeInput,
            datePositionInput,
            showYearInput,
            yearFormatInput,
            dateDragButton
        ];

        dateSettingsInputs.forEach(input => {
            input.disabled = !enable;
            if (input.type === 'color' || input.type === 'range') {
                input.style.opacity = enable ? 1 : 0.5; // Adjust opacity for visual feedback
            } else {
                input.style.opacity = enable ? 1 : 0.5;
            }
        });
    }

    // ==================== Sites Functions ====================
    // Function to update sites widget position
    function updateSitesPosition(position) {
        sitesElement.classList.remove("top-left", "top-right", "bottom-left", "bottom-right", "center", "free");

        if (position !== "free") {
            sitesElement.style.left = '';
            sitesElement.style.top = '';
            sitesElement.style.position = '';
            removeElementDraggable(sitesElement);
            sitesDragButton.style.display = 'none';
        } else {
            sitesElement.classList.add("free");
            sitesDragButton.style.display = 'inline-block';
            isSitesDraggingEnabled = true;
            makeElementDraggable(sitesElement, 'sitesPosition', isSitesDraggingEnabled);
            sitesElement.style.position = 'absolute';
            
            chrome.storage.local.get(['sitesPosition'], function(data) {
                if (data.sitesPosition) {
                    sitesElement.style.left = data.sitesPosition.left;
                    sitesElement.style.top = data.sitesPosition.top;
                }
            });
        }

        sitesElement.classList.add(position);
    }

    // Function to save sites position
    function saveSitesPosition() {
        const position = {
            left: sitesElement.style.left,
            top: sitesElement.style.top
        };
        chrome.storage.local.set({ sitesPosition: position });
    }

    // Function to load bookmarks
    function getFaviconUrl(url) {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch (error) {
            return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIj48L2NpcmNsZT48bGluZSB4MT0iMiIgeTE9IjEyIiB4Mj0iMjIiIHkyPSIxMiI+PC9saW5lPjxwYXRoIGQ9Ik0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDE1IDE1LjMgMTUuMyAwIDAgMS00IDE1IDE1LjMgMTUuMyAwIDAgMS00LTE1IDE1LjMgMTUuMyAwIDAgMSA0LTE1eiI+PC9wYXRoPjwvc3ZnPg==';
        }
    }

    // Update the bookmarks loading function
    function loadBookmarks(folder = '') {
        if (!chrome.bookmarks) {
            console.warn('Bookmarks API not available. Please check permissions.');
            renderSites([]);
            return;
        }

        try {
            chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
                if (chrome.runtime.lastError) {
                    console.error('Error accessing bookmarks:', chrome.runtime.lastError);
                    renderSites([]);
                    return;
                }

                let targetFolder = bookmarkTreeNodes;
                if (folder) {
                    // Update navigation stack
                    if (folder !== currentFolderId) {
                        if (currentFolderId) {
                            folderNavigationStack.push(currentFolderId);
                        }
                        currentFolderId = folder;
                    }

                    // Find the specified folder
                    const findFolder = (nodes, folderId) => {
                        for (const node of nodes) {
                            if (node.id === folderId) return node;
                            if (node.children) {
                                const found = findFolder(node.children, folderId);
                                if (found) return found;
                            }
                        }
                        return null;
                    };
                    targetFolder = findFolder(bookmarkTreeNodes, folder);
                    if (!targetFolder) {
                        targetFolder = bookmarkTreeNodes;
                    }
                } else {
                    // Reset navigation when going back to root
                    folderNavigationStack = [];
                    currentFolderId = '';
                }

                const items = [];
                const processNode = (node, level = 0) => {
                    if (!node) return;
                    
                    if (node.children) {
                        // This is a folder
                        const folderState = folderStates.get(node.id) || 'closed';
                        items.push({
                            id: node.id,
                            title: node.title || 'Bookmarks',
                            isFolder: true,
                            level: level,
                            state: folderState,
                            icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjIgMTlhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDVsMiAzaDlhMiAyIDAgMCAxIDIgMnoiPjwvcGF0aD48L3N2Zz4='
                        });
                        // Only process children if folder is open
                        if (folderState === 'open') {
                            node.children.forEach(child => processNode(child, level + 1));
                        }
                    } else if (node.url) {
                        // This is a bookmark
                        items.push({
                            id: node.id,
                            title: node.title,
                            url: node.url,
                            isFolder: false,
                            level: level,
                            icon: getFaviconUrl(node.url)
                        });
                    }
                };

                if (Array.isArray(targetFolder)) {
                    targetFolder.forEach(node => processNode(node));
                } else {
                    processNode(targetFolder);
                }

                renderSites(items);
            });
        } catch (error) {
            console.error('Error loading bookmarks:', error);
            renderSites([]);
        }
    }

    // Update the renderSites function to handle folder states
    function renderSites(sites) {
        sitesElement.innerHTML = '';
        sitesElement.className = `sites ${sitesStyleInput.value}-view`;

        // Add back button if we're in a subfolder
        if (folderNavigationStack.length > 0) {
            const backButton = document.createElement('div');
            backButton.className = 'site-item back-button';
            backButton.innerHTML = `
                <div class="site-icon" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTkgMTJINU0xMiAxOWwtNy03IDctNyIvPjwvc3ZnPg==')"></div>
                <div class="site-title">Back</div>
            `;
            backButton.addEventListener('click', () => {
                const previousFolder = folderNavigationStack.pop();
                currentFolderId = previousFolder || '';
                loadBookmarks(currentFolderId);
            });
            sitesElement.appendChild(backButton);
        }

        sites.forEach(site => {
            const siteItem = document.createElement(site.isFolder ? 'div' : 'a');
            siteItem.className = 'site-item' + (site.isFolder ? ' folder' : '');
            if (!site.isFolder) {
                siteItem.href = site.url;
                siteItem.target = '_blank';
                siteItem.rel = 'noopener noreferrer';
            }

            // Add indentation based on level
            siteItem.style.paddingLeft = `${site.level * 20}px`;

            if (sitesShowIconsInput.checked) {
                const iconContainer = document.createElement('div');
                iconContainer.className = 'site-icon';
                iconContainer.style.backgroundImage = `url(${site.icon})`;
                iconContainer.style.backgroundColor = '#f0f0f0';
                siteItem.appendChild(iconContainer);
            }

            if (sitesShowTitlesInput.checked) {
                const title = document.createElement('div');
                title.className = 'site-title';
                title.textContent = site.title || new URL(site.url).hostname;
                siteItem.appendChild(title);
            }

            if (site.isFolder) {
                // Set folder state
                siteItem.setAttribute('data-state', site.state || 'closed');
                
                siteItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    const newState = toggleFolder(site.id);
                    siteItem.setAttribute('data-state', newState);
                    loadBookmarks(site.id);
                });
            }

            sitesElement.appendChild(siteItem);
        });
    }

    // Function to handle custom sites
    function addCustomSite() {
        const siteItem = document.createElement('div');
        siteItem.className = 'custom-site-item';
        
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Site Title';
        titleInput.className = 'custom-site-title';
        
        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'Site URL';
        urlInput.className = 'custom-site-url';
        urlInput.addEventListener('input', function() {
            if (!urlInput.value.startsWith('http://') && !urlInput.value.startsWith('https://')) {
                urlInput.value = 'https://' + urlInput.value;
            }
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.className = 'custom-site-delete';
        deleteButton.onclick = () => {
            siteItem.remove();
            saveCustomSites();
        };
        
        siteItem.appendChild(titleInput);
        siteItem.appendChild(urlInput);
        siteItem.appendChild(deleteButton);
        
        customSitesList.appendChild(siteItem);
        
        // Add input event listeners to save changes
        titleInput.addEventListener('input', saveCustomSites);
        urlInput.addEventListener('input', saveCustomSites);
    }

    // Function to save custom sites
    function saveCustomSites() {
        const customSites = Array.from(customSitesList.children).map(item => {
            const titleInput = item.querySelector('.custom-site-title');
            const urlInput = item.querySelector('.custom-site-url');
            return {
                title: titleInput.value.trim(),
                url: urlInput.value.trim()
            };
        }).filter(site => site.title && site.url);
        
        chrome.storage.local.set({ customSites: customSites }, function() {
            console.log('Custom sites saved:', customSites);
            if (sitesViewInput.value === 'custom') {
                loadCustomSites();
            }
        });
    }

    // Function to load custom sites
    function loadCustomSites() {
        chrome.storage.local.get(['customSites'], function(data) {
            if (data.customSites && Array.isArray(data.customSites)) {
                const sites = data.customSites.map(site => ({
                    title: site.title,
                    url: site.url,
                    icon: getFaviconUrl(site.url),
                    isFolder: false
                }));
                renderSites(sites);
            } else {
                renderSites([]);
            }
        });
    }

    // Event Listeners
    sitesViewInput.addEventListener('change', function() {
        const view = this.value;
        document.querySelectorAll('.view-options').forEach(el => {
            if (el) {
                el.classList.remove('active');
            }
        });
        const viewOptions = document.getElementById(`${view}Options`);
        if (viewOptions) {
            viewOptions.classList.add('active');
        }
        
        try {
            switch(view) {
                case 'bookmarks':
                    loadBookmarks(bookmarksFolderInput.value);
                    break;
                case 'recent':
                    loadRecentSites(recentTimeRangeInput.value);
                    break;
                case 'most-visited':
                    loadMostVisitedSites(parseInt(mostVisitedCountInput.value));
                    break;
                case 'custom':
                    loadCustomSites();
                    break;
            }
        } catch (error) {
            console.error('Error switching view:', error);
            renderSites([]); // Fallback to empty state
        }
    });

    bookmarksFolderInput.addEventListener('change', function() {
        loadBookmarks(this.value);
    });

    recentTimeRangeInput.addEventListener('change', function() {
        loadRecentSites(this.value);
    });

    mostVisitedCountInput.addEventListener('change', function() {
        loadMostVisitedSites(this.value);
    });

    sitesStyleInput.addEventListener('change', function() {
        sitesElement.className = `sites ${this.value}-view`;
    });

    sitesShowIconsInput.addEventListener('change', function() {
        const sites = Array.from(sitesElement.children);
        sites.forEach(site => {
            const icon = site.querySelector('.site-icon');
            if (icon) {
                icon.style.display = this.checked ? 'block' : 'none';
            }
        });
    });

    sitesShowTitlesInput.addEventListener('change', function() {
        const sites = Array.from(sitesElement.children);
        sites.forEach(site => {
            const title = site.querySelector('.site-title');
            if (title) {
                title.style.display = this.checked ? 'block' : 'none';
            }
        });
    });

    addCustomSiteButton.addEventListener('click', addCustomSite);

    sitesDragButton.addEventListener('click', function() {
        if (isSitesDraggingEnabled) {
            sitesDragButton.textContent = 'Drag';
            isSitesDraggingEnabled = false;
            removeElementDraggable(sitesElement); // Disable dragging
            saveSitesPosition();
        } else {
            sitesDragButton.textContent = 'Save';
            isSitesDraggingEnabled = true;
            makeElementDraggable(sitesElement, 'sitesPosition', isSitesDraggingEnabled); // Enable dragging
        }
    });

    // Function to apply sites settings
    function applySitesSettings(settings) {
        if (!sitesElement) {
            console.error('Sites element not found');
            return;
        }

        try {
            // Update visibility
            sitesElement.style.display = settings.showSites ? 'block' : 'none';
            
            // Update view
            if (sitesViewInput) {
                sitesViewInput.value = settings.view;
                document.querySelectorAll('.view-options').forEach(el => el.classList.remove('active'));
                const viewOptionsElement = document.getElementById(`${settings.view}Options`);
                if (viewOptionsElement) {
                    viewOptionsElement.classList.add('active');
                }
            }

            // Update position
            if (sitesPositionInput) {
                sitesPositionInput.value = settings.position;
                updateSitesPosition(settings.position);
            }

            // Update style
            if (sitesStyleInput) {
                sitesStyleInput.value = settings.style;
                sitesElement.className = `sites ${settings.style}-view`;
            }

            // Update display options
            if (sitesShowIconsInput) {
                sitesShowIconsInput.checked = settings.showIcons;
            }
            if (sitesShowTitlesInput) {
                sitesShowTitlesInput.checked = settings.showTitles;
            }

            // Update view-specific settings
            if (bookmarksFolderInput) {
                bookmarksFolderInput.value = settings.bookmarksFolder;
            }
            if (recentTimeRangeInput) {
                recentTimeRangeInput.value = settings.recentTimeRange;
            }
            if (mostVisitedCountInput) {
                mostVisitedCountInput.value = settings.mostVisitedCount;
            }

            // Load initial sites based on view
            switch(settings.view) {
                case 'bookmarks':
                    loadBookmarks(settings.bookmarksFolder);
                    break;
                case 'recent':
                    loadRecentSites(settings.recentTimeRange);
                    break;
                case 'most-visited':
                    loadMostVisitedSites(settings.mostVisitedCount);
                    break;
                case 'custom':
                    renderSites(settings.customSites || []);
                    break;
            }
        } catch (error) {
            console.error('Error applying sites settings:', error);
        }
    }

    // Initialize sites widget
    function initializeSitesWidget() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeSitesWidget);
            return;
        }

        // Get all required elements
        const elements = {
            sitesElement: document.getElementById('sites'),
            showSitesInput: document.getElementById('showSites'),
            sitesViewInput: document.getElementById('sitesView'),
            sitesPositionInput: document.getElementById('sitesPosition'),
            sitesStyleInput: document.getElementById('sitesStyle'),
            sitesShowIconsInput: document.getElementById('sitesShowIcons'),
            sitesShowTitlesInput: document.getElementById('sitesShowTitles'),
            bookmarksFolderInput: document.getElementById('bookmarksFolder'),
            recentTimeRangeInput: document.getElementById('recentTimeRange'),
            mostVisitedCountInput: document.getElementById('mostVisitedCount')
        };

        // Add resize observer to save size
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                chrome.storage.local.set({
                    sitesSize: { width: `${width}px`, height: `${height}px` }
                }, () => {
                    console.log('Sites widget size saved:', { width, height });
                });
            }
        });

        // Start observing the sites element
        if (elements.sitesElement) {
            resizeObserver.observe(elements.sitesElement);

            // Restore saved size
            chrome.storage.local.get(['sitesSize'], (data) => {
                if (data.sitesSize) {
                    elements.sitesElement.style.width = data.sitesSize.width;
                    elements.sitesElement.style.height = data.sitesSize.height;
                }
            });
        }

        // Rest of the initialization code...

        // Check if any elements are missing
        const missingElements = Object.entries(elements)
            .filter(([_, element]) => !element)
            .map(([name]) => name);

        if (missingElements.length > 0) {
            console.error('Missing required elements for sites widget:', missingElements);
            return;
        }

        const settings = defaultSettings.sitesSettings;
        
        // Safely set input values
        try {
            elements.showSitesInput.checked = settings.showSites;
            elements.sitesViewInput.value = settings.view;
            elements.sitesPositionInput.value = settings.position;
            elements.sitesStyleInput.value = settings.style;
            elements.sitesShowIconsInput.checked = settings.showIcons;
            elements.sitesShowTitlesInput.checked = settings.showTitles;
            elements.bookmarksFolderInput.value = settings.bookmarksFolder;
            elements.recentTimeRangeInput.value = settings.recentTimeRange;
            elements.mostVisitedCountInput.value = settings.mostVisitedCount;

            // Update display and position
            elements.sitesElement.style.display = settings.showSites ? 'block' : 'none';
            updateSitesPosition(settings.position);

            // Add active class to view options
            const viewOptionsElement = document.getElementById(`${settings.view}Options`);
            if (viewOptionsElement) {
                viewOptionsElement.classList.add('active');
            }

            // Load initial sites
            switch(settings.view) {
                case 'bookmarks':
                    loadBookmarks(settings.bookmarksFolder);
                    break;
                case 'recent':
                    loadRecentSites(settings.recentTimeRange);
                    break;
                case 'most-visited':
                    loadMostVisitedSites(settings.mostVisitedCount);
                    break;
                case 'custom':
                    renderSites(settings.customSites || []);
                    break;
            }
        } catch (error) {
            console.error('Error initializing sites widget:', error);
        }
    }

    // Call initialize function
    initializeSitesWidget();

    // ==================== Weather Functions ====================
    // Weather cache
    let weatherCache = {
        data: null,
        timestamp: 0,
        position: null
    };

    // Weather update interval (15 minutes)
    const WEATHER_CACHE_DURATION = 15 * 60 * 1000;

    async function updateWeather() {
        if (!settings.weatherSettings.showWeather) {
            weatherElement.style.display = 'none';
            return;
        }

        try {
            // Check if we have cached weather data that's still valid
            const now = Date.now();
            if (weatherCache.data && 
                (now - weatherCache.timestamp) < WEATHER_CACHE_DURATION && 
                weatherCache.unit === weatherUnitInput.value) {
                
                updateWeatherDisplay(weatherCache.data);
                return;
            }

            // Show loading state
            weatherElement.style.display = 'block';
            weatherElement.innerHTML = '<div class="weather-loading">Loading weather...</div>';

            // Get position with timeout
            const position = await Promise.race([
                new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                }),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Geolocation timeout')), 5000)
                )
            ]);

            const { latitude, longitude } = position.coords;
            const unit = weatherUnitInput.value;
            const apiKey = 'b9b89f1577273d6144db2bfbe33ec132';

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`
            );
            
            if (!response.ok) {
                throw new Error('Weather API request failed');
            }

            const data = await response.json();

            // Update cache
            weatherCache = {
                data: data,
                timestamp: now,
                unit: unit
            };

            updateWeatherDisplay(data);

        } catch (error) {
            console.error('Error fetching weather:', error);
            weatherElement.innerHTML = '<div class="weather-error">Unable to load weather</div>';
            weatherElement.style.display = 'block';
        }
    }

    function updateWeatherDisplay(data) {
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const location = data.name;

        weatherElement.innerHTML = `
            <div class="weather-icon" style="background-image: url(https://openweathermap.org/img/wn/${icon}@2x.png)"></div>
            <div class="temperature">${temperature}°${weatherUnitInput.value === 'metric' ? 'C' : 'F'}</div>
            <div class="description">${description}</div>
            <div class="location">${location}</div>
        `;

        // Apply current settings
        applyWeatherSettings(settings.weatherSettings);
    }

    // Add loading and error styles
    const style = document.createElement('style');
    style.textContent = `
        .weather-loading {
            padding: 10px;
            text-align: center;
            font-style: italic;
        }
        .weather-error {
            padding: 10px;
            text-align: center;
            color: #ff6b6b;
        }
    `;
    document.head.appendChild(style);

    // Initialize weather with immediate update and then set interval
    updateWeather();
    setInterval(updateWeather, WEATHER_CACHE_DURATION);

    function applyWeatherSettings(settings) {
        if (!weatherElement) return;

        weatherElement.style.display = settings.showWeather ? 'block' : 'none';
        weatherElement.style.fontFamily = settings.fontType;
        weatherElement.style.color = settings.color;

        // Apply specific font sizes to each element
        const temperature = weatherElement.querySelector('.temperature');
        const description = weatherElement.querySelector('.description');
        const location = weatherElement.querySelector('.location');

        if (temperature) {
            temperature.style.fontSize = `${settings.size}px`;
        }
        if (description) {
            description.style.fontSize = `${Math.round(settings.size * 0.6)}px`; // Smaller font for description
        }
        if (location) {
            location.style.fontSize = `${Math.round(settings.size * 0.7)}px`; // Slightly larger than description
        }

        updateWeatherPosition(settings.position);

        // Update input values
        showWeatherInput.checked = settings.showWeather;
        weatherUnitInput.value = settings.unit;
        weatherFontTypeInput.value = settings.fontType;
        weatherFontColorInput.value = settings.color;
        weatherFontSizeInput.value = settings.size;
        weatherPositionInput.value = settings.position;
    }

    function updateWeatherFontSizeLabel() {
        const fontSizeSlider = document.getElementById('weatherFontSize');
        const weatherFontSizeLabel = document.getElementById('weatherFontSizeLabel');
        weatherFontSizeLabel.textContent = fontSizeSlider.value;
    }

    weatherFontSizeInput.addEventListener('input', function() {
        const size = parseInt(this.value);
        settings.weatherSettings.size = size;
        saveWeatherSettings();
        applyWeatherSettings(settings.weatherSettings);
        updateWeatherFontSizeLabel(); // Update the label
    });

    // Weather Event Listeners
    showWeatherInput.addEventListener('change', function() {
        settings.weatherSettings.showWeather = this.checked;
        saveWeatherSettings();
        updateWeather();
    });

    weatherUnitInput.addEventListener('change', function() {
        settings.weatherSettings.unit = this.value;
        saveWeatherSettings();
        updateWeather();
    });

    weatherFontTypeInput.addEventListener('change', function() {
        settings.weatherSettings.fontType = this.value;
        saveWeatherSettings();
        applyWeatherSettings(settings.weatherSettings);
    });

    weatherFontColorInput.addEventListener('input', function() {
        settings.weatherSettings.color = this.value;
        saveWeatherSettings();
        applyWeatherSettings(settings.weatherSettings);
    });

    weatherPositionInput.addEventListener('change', function() {
        settings.weatherSettings.position = this.value;
        saveWeatherSettings();
        updateWeatherPosition(this.value);
    });

    function saveWeatherSettings() {
        chrome.storage.local.set({ weatherSettings: settings.weatherSettings }, function() {
            console.log('Weather settings saved:', settings.weatherSettings);
        });
    }

    function updateWeatherPosition(position) {
        weatherElement.classList.remove('top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'free');
        
        if (position !== 'free') {
            weatherElement.style.left = '';
            weatherElement.style.top = '';
            weatherElement.style.position = '';
            removeElementDraggable(weatherElement);
            weatherDragButton.style.display = 'none';
            } else {
            weatherElement.classList.add('free');
            weatherDragButton.style.display = 'inline-block';
            makeElementDraggable(weatherElement, 'weatherPosition', isWeatherDraggingEnabled);
            
            chrome.storage.local.get(['weatherPosition'], function(data) {
                if (data.weatherPosition) {
                    weatherElement.style.left = data.weatherPosition.left;
                    weatherElement.style.top = data.weatherPosition.top;
                    weatherElement.style.position = 'absolute';
                }
            });
        }
        
        weatherElement.classList.add(position);
    }

    // ==================== Initialization ====================

    // Initialize settings and apply random animation
    syncSettingsMenu();
    applyRandomAnimation();
    updateHint();
    applySitesSettings(defaultSettings.sitesSettings);

    // Load saved settings and apply them
    chrome.storage.local.get(
        ["backgroundKey", "clockSettings", "daySettings", "dateSettings", "muteBackground", "backgroundBlur", "sitesSettings", "weatherSettings", "hoverEffectsSettings"],
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

            // Apply weather settings
            if (data.weatherSettings) {
                applyWeatherSettings(data.weatherSettings);
            } else {
                applyWeatherSettings(defaultSettings.weatherSettings); // Use default weather settings
            }

            // Apply sites settings
            if (data.sitesSettings) {
                applySitesSettings(data.sitesSettings);
            } else {
                applySitesSettings(defaultSettings.sitesSettings); // Use default sites settings
            }

            // Apply hover effects settings
            if (data.hoverEffectsSettings) {
                enableHoverEffectsInput.checked = data.hoverEffectsSettings.enabled;
                toggleHoverEffects(data.hoverEffectsSettings.enabled);
            } else {
                enableHoverEffectsInput.checked = defaultSettings.hoverEffectsSettings.enabled;
                toggleHoverEffects(defaultSettings.hoverEffectsSettings.enabled);
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

    clockdragButton.addEventListener('click', function () {
        if (isClockDraggingEnabled) {
            // Save the position and disable dragging
            clockdragButton.textContent = 'Drag';
            isClockDraggingEnabled = false;
            removeElementDraggable(clockElement); // Disable dragging
            saveClockPosition(); // Save the current position
        } else {
            // Enable dragging
            clockdragButton.textContent = 'Save';
            isClockDraggingEnabled = true;
            makeElementDraggable(clockElement, 'clockPosition', isClockDraggingEnabled); // Enable dragging
        }
    });
    // Day Drag Button
    dayDragButton.addEventListener('click', function () {
        if (isDayDraggingEnabled) {
            // Save the position and disable dragging
            dayDragButton.textContent = 'Drag';
            isDayDraggingEnabled = false;
            removeElementDraggable(dayElement); // Disable dragging
            saveDayPosition(); // Save the current position
        } else {
            // Enable dragging
            dayDragButton.textContent = 'Save';
            isDayDraggingEnabled = true;
            makeElementDraggable(dayElement, 'dayPosition', isDayDraggingEnabled); // Enable dragging
        }
    });

    // Date Drag Button
    dateDragButton.addEventListener('click', function () {
        if (isDateDraggingEnabled) {
            // Save the position and disable dragging
            dateDragButton.textContent = 'Drag';
            isDateDraggingEnabled = false;
            removeElementDraggable(dateElement); // Disable dragging
            saveDatePosition(); // Save the current position
        } else {
            // Enable dragging
            dateDragButton.textContent = 'Save';
            isDateDraggingEnabled = true;
            makeElementDraggable(dateElement, 'datePosition', isDateDraggingEnabled); // Enable dragging
        }
    });
    // site Drag Button
    sitesDragButton.addEventListener('click', function () {
        if (isSitesDraggingEnabled) {
            // Save the position and disable dragging
            sitesDragButton.textContent = 'Drag';
            isSitesDraggingEnabled = false;
            removeElementDraggable(sitesElement); // Disable dragging
            saveSitesPosition(); // Save the current position
        } else {
            // Enable dragging
            sitesDragButton.textContent = 'Save';
            isSitesDraggingEnabled = true;
            makeElementDraggable(sitesElement, 'sitesPosition', isSitesDraggingEnabled); // Enable dragging
        }
    });
    showClockInput.addEventListener("change", function () {
        const isClockVisible = showClockInput.checked;
        clockElement.style.display = isClockVisible ? 'block' : 'none';

        // Enable or disable clock settings based on visibility
        toggleClockSettings(isClockVisible);

        // Save the clock visibility in chrome storage
        const clockSettings = {
            showClock: isClockVisible,
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
    showDayInput.addEventListener("change", function () {
        const isDayVisible = showDayInput.checked;
        dayElement.style.display = isDayVisible ? 'block' : 'none';

        // Enable or disable day settings based on visibility
        toggleDaySettings(isDayVisible);

        // Save the day visibility in chrome storage
        const daySettings = {
            showDay: isDayVisible,
            style: dayStyleInput.value,
            fontType: dayFontTypeInput.value,
            color: dayFontColorInput.value,
            size: dayFontSizeInput.value,
            position: dayPositionInput.value
        };
        chrome.storage.local.set({ daySettings: daySettings }, function () {
            console.log("Day settings updated.");
        });
    });

    showDateInput.addEventListener("change", function () {
        const isDateVisible = showDateInput.checked;
        dateElement.style.display = isDateVisible ? 'block' : 'none';

        // Enable or disable date settings based on visibility
        toggleDateSettings(isDateVisible);

        // Save the date visibility in chrome storage
        const dateSettings = {
            showDate: isDateVisible,
            format: dateFormatInput.value,
            fontType: dateFontTypeInput.value,
            color: dateFontColorInput.value,
            size: dateFontSizeInput.value,
            position: datePositionInput.value,
            showYear: showYearInput.checked,
            yearFormat: yearFormatInput.value
        };
        chrome.storage.local.set({ dateSettings: dateSettings }, function () {
            console.log("Date settings updated.");
        });
    });
    showSitesInput.addEventListener("change", function () {
        const isSitesVisible = showSitesInput.checked;
        sitesElement.style.display = isSitesVisible ? 'block' : 'none';

        // Enable or disable sites settings based on visibility
        toggleSitesSettings(isSitesVisible);

        // Save the sites visibility in chrome storage
        const sitesSettings = {
            showSites: isSitesVisible,
            view: sitesViewInput.value,
            position: sitesPositionInput.value,
            style: sitesStyleInput.value,
            showIcons: sitesShowIconsInput.checked,
            showTitles: sitesShowTitlesInput.checked,
            bookmarksFolder: bookmarksFolderInput.value,
            recentTimeRange: recentTimeRangeInput.value,
            mostVisitedCount: mostVisitedCountInput.value
        };
        chrome.storage.local.set({ sitesSettings: sitesSettings }, function () {
            console.log("Sites settings updated.");
        });
    });
    muteCheckbox.addEventListener('change', updateHint);
    document.getElementById('muteBackground').addEventListener('change', function () {
        const isMuted = this.checked;
        toggleBackgroundSound(isMuted);

        // Save mute setting in Chrome storage
        chrome.storage.local.set({ muteBackground: isMuted }, function () {
            console.log("Mute background sound setting saved:", isMuted);
        });
    });


    // Handle background selection
    backgroundInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file.size > 500 * 1024 * 1024) {
            alert("Background file must be under 500MB.");
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
    muteCheckbox.addEventListener('change', updateHint);
    document.getElementById('muteBackground').addEventListener('change', function () {
        const isMuted = this.checked;
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

    sitesHeader.addEventListener("click", () => {
        sitesSettings.style.display = sitesSettings.style.display === "block" ? "none" : "block";
        sitesToggle.classList.toggle("rotated"); // Add or remove 'rotated' class to rotate arrow
    });

    weatherHeader.addEventListener("click", () => {
        weatherSettings.style.display = weatherSettings.style.display === "block" ? "none" : "block";
        weatherToggle.classList.toggle("rotated"); // Add or remove 'rotated' class to rotate arrow
    });

    // Toggle widget visibility
    showSitesInput.addEventListener("change", function () {
        sitesElement.style.display = showSitesInput.checked ? 'block' : 'none';
    });

    // Update widget position
    sitesPositionInput.addEventListener("change", function () {
        updateSitesPosition(sitesPositionInput.value);
    });

    // Update widget source
    sitesViewInput.addEventListener("change", function () {
        loadBookmarks(bookmarksFolderInput.value);
    });

    // ==================== Initial State ====================
    // Show or hide clock, date, and day settings based on saved state
    chrome.storage.local.get(["clockSettings", "dateSettings", "daySettings", "sitesSettings", "weatherSettings", "hoverEffectsSettings"], function (data) {
        if (data.clockSettings && !data.clockSettings.showClock) {
            clockSettingsGroup.style.display = 'none';
            clockElement.style.display = 'none';
            showClockInput.checked = false;
            const isClockVisible = data.clockSettings.showClock;
            showClockInput.checked = isClockVisible;
            clockElement.style.display = isClockVisible ? 'block' : 'none';
            toggleClockSettings(isClockVisible); // Enable/disable settings based on visibility
        }
        if (data.dateSettings && !data.dateSettings.showDate) {
            dateSettingsGroup.style.display = 'none';
            dateElement.style.display = 'none';
            showDateInput.checked = false;
            const isDayVisible = data.daySettings.showDay;
            showDayInput.checked = isDayVisible;
            dayElement.style.display = isDayVisible ? 'block' : 'none';
            toggleDaySettings(isDayVisible); // Enable/disable settings based on visibility
        }
        if (data.daySettings && !data.daySettings.showDay) {
            daySettings.style.display = 'none';
            dayElement.style.display = 'none';
            showDayInput.checked = false;
            const isDateVisible = data.dateSettings.showDate;
            showDateInput.checked = isDateVisible;
            dateElement.style.display = isDateVisible ? 'block' : 'none';
            toggleDateSettings(isDateVisible); // Enable/disable settings based on visibility
        }
        if (data.sitesSettings) {
            const isSitesVisible = data.sitesSettings.showSites;
            showSitesInput.checked = isSitesVisible;
            sitesElement.style.display = isSitesVisible ? 'block' : 'none';
            toggleSitesSettings(isSitesVisible); // Enable/disable settings based on visibility
        }
        if (data.weatherSettings && !data.weatherSettings.showWeather) {
            weatherElement.style.display = 'none';
            showWeatherInput.checked = false;
            showWeatherInput.checked = data.weatherSettings.showWeather;
            weatherElement.style.display = data.weatherSettings.showWeather ? 'block' : 'none';
            toggleWeatherSettings(data.weatherSettings.showWeather);
        }
        if (data.hoverEffectsSettings) {
            enableHoverEffectsInput.checked = data.hoverEffectsSettings.enabled;
            toggleHoverEffects(data.hoverEffectsSettings.enabled);
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

    // Save settings function
    function saveSettings() {
        chrome.storage.local.set({
            clockSettings: settings.clockSettings,
            daySettings: settings.daySettings,
            dateSettings: settings.dateSettings,
            sitesSettings: settings.sitesSettings,
            weatherSettings: settings.weatherSettings,
            hoverEffectsSettings: settings.hoverEffectsSettings,
            muteBackground: settings.muteBackground,
            backgroundBlur: settings.backgroundBlur
        }, function() {
            console.log('Settings saved');
        });
    }

    // Hover Effects Functions
    function toggleHoverEffects(enable) {
        const draggableElements = document.querySelectorAll('.draggable');
        draggableElements.forEach(element => {
            if (enable) {
                element.classList.add('with-hover');
            } else {
                element.classList.remove('with-hover');
            }
        });
    }

    function toggleHoverEffectsSettings(enable) {
        hoverEffectsSettings.style.display = enable ? 'block' : 'none';
        hoverEffectsToggle.textContent = enable ? '▼' : '▶';
    }

    // Event Listeners for Hover Effects
    hoverEffectsHeader.addEventListener("click", () => {
        hoverEffectsSettings.style.display = hoverEffectsSettings.style.display === "block" ? "none" : "block";
        hoverEffectsToggle.classList.toggle("rotated");
    });

    enableHoverEffectsInput.addEventListener("change", function() {
        settings.hoverEffectsSettings.enabled = this.checked;
        toggleHoverEffects(this.checked);
        saveSettings();
    });

    // Initialize hover effects
    toggleHoverEffects(settings.hoverEffectsSettings.enabled);

    // Function to load recent sites
    function loadRecentSites(timeRange) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        let startTime;
        
        switch(timeRange) {
            case 'today':
                startTime = Date.now() - millisecondsPerDay;
                break;
            case 'week':
                startTime = Date.now() - (7 * millisecondsPerDay);
                break;
            case 'month':
                startTime = Date.now() - (30 * millisecondsPerDay);
                break;
            default:
                startTime = Date.now() - millisecondsPerDay;
        }

        chrome.history.search({
            text: '',
            startTime: startTime,
            maxResults: 20
        }, function(historyItems) {
            const sites = historyItems.map(item => ({
                title: item.title,
                url: item.url,
                icon: getFaviconUrl(item.url),
                isFolder: false
            }));
            renderSites(sites);
        });
    }

    // Function to load most visited sites
    function loadMostVisitedSites(count) {
        chrome.topSites.get(function(sites) {
            const mostVisited = sites.slice(0, parseInt(count)).map(site => ({
                title: site.title,
                url: site.url,
                icon: getFaviconUrl(site.url),
                isFolder: false
            }));
            renderSites(mostVisited);
        });
    }

    // Function to toggle sites settings
    function toggleSitesSettings(enable) {
        const sitesSettingsInputs = [
            sitesViewInput,
            sitesPositionInput,
            sitesStyleInput,
            sitesShowIconsInput,
            sitesShowTitlesInput,
            bookmarksFolderInput,
            recentTimeRangeInput,
            mostVisitedCountInput,
            sitesDragButton,
            addCustomSiteButton
        ];

        sitesSettingsInputs.forEach(input => {
            if (input) {
                input.disabled = !enable;
                input.style.opacity = enable ? 1 : 0.5;
            }
        });

        // Also toggle the custom sites list container
        if (customSitesList) {
            customSitesList.style.opacity = enable ? 1 : 0.5;
            customSitesList.style.pointerEvents = enable ? 'auto' : 'none';
        }
    }

});


