document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');

    // Open settings popup on icon click
    if (settingsIcon) {
        settingsIcon.addEventListener('click', function () {
            window.open(chrome.runtime.getURL('popup.html'), 'Settings', 'width=400,height=600');
        });
    } else {
        console.error("Settings icon not found.");
    }

    // Reset button functionality
    const resetButton = document.getElementById('resetBtn');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            chrome.storage.sync.set({
                backgroundPath: 'assets/default_background.jpg',
                clockFormat: '24h',
                clockFont: 'Arial',
                clockColor: '#000',
                clockPositionType: 'standard'
            }, function () {
                alert('Settings have been reset to default.');
            });
        });
    }
});
