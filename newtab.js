document.addEventListener("DOMContentLoaded", function() {
    const backgroundElement = document.getElementById('background');
    const settingsIcon = document.getElementById('settingsIcon');
    const settingsPopup = document.getElementById('settingsPopup');
    const backgroundInput = document.getElementById('backgroundInput');

    // Load saved background from storage
    chrome.storage.local.get("background", function(data) {
        if (data.background) {
            applyBackground(data.background);
        } else {
            // Set default background if no custom background is selected
            backgroundElement.style.backgroundImage = "url('assets/default_background.jpg')";
        }
    });

    // Show settings popup when settings icon is clicked
    settingsIcon.addEventListener("click", function() {
        settingsPopup.style.display = settingsPopup.style.display === 'block' ? 'none' : 'block';
    });

    // Handle background selection
    backgroundInput.addEventListener("change", function(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const backgroundData = e.target.result;
                applyBackground(backgroundData);

                // Save the selected background in local storage
                chrome.storage.local.set({ background: backgroundData }, function() {
                    console.log("Background saved.");
                });
            };

            reader.readAsDataURL(file);
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
});
