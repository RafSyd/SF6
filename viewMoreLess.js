document.addEventListener('DOMContentLoaded', function () {
    const syncSection = document.querySelector('.sync-section');
    const syncTrigger = document.getElementById('sync-trigger');
    const submenusync = syncSection.querySelector('.fly');
    const toggleIconsync = syncSection.querySelector('.toggle');
    const additionalInfo = syncSection.querySelector('.additional-info');

    // Initially hide the submenu
    submenusync.style.display = 'none';

    // Get the initial text from line 5
    const initialText = syncTrigger.querySelector('.toggle').textContent.trim();
    toggleIconsync.innerHTML = '<span style="color: red; font-weight: bold;">+</span> ' + initialText;
    additionalInfo.style.display = 'inline'; // Display additional info by default

    syncTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        if (submenusync.style.display === 'block') {
            submenusync.style.display = 'none';
            toggleIconsync.innerHTML = '<span style="color: red; font-weight: bold;">+</span> ' + initialText;
            additionalInfo.style.display = 'inline'; // Show additional info when menu is closed
        } else {
            submenusync.style.display = 'block';
            toggleIconsync.innerHTML = '<span style="color: red; font-weight: bold;">-</span> ' + initialText;
            additionalInfo.style.display = 'none'; // Hide additional info when menu is open
        }
    });

    // Display the icon and "Specialty Lifting" text after the first click
    toggleIconsync.style.display = 'inline';
});
