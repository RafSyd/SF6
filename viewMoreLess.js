document.addEventListener('DOMContentLoaded', function () {
    const syncSection = document.querySelector('.sync-section');
    const syncTrigger = document.getElementById('sync-trigger');
    const submenusync = syncSection.querySelector('.fly');
    const toggleIconsync = syncSection.querySelector('.toggle');

    // Initially hide the submenu
    submenusync.style.display = 'none';

    // Get the initial text from line 5
    const initialText = syncTrigger.querySelector('.toggle').textContent.trim();
    toggleIconsync.innerHTML = initialText + ' <img src="https://d2oir2m0sodeh3.cloudfront.net/products/VIEWmORE.png" alt="Icon" width="35" height="25">';

    syncTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        if (submenusync.style.display === 'block') {
            submenusync.style.display = 'none';
            toggleIconsync.innerHTML = initialText + ' <img src="https://d2oir2m0sodeh3.cloudfront.net/products/VIEWmORE.png" alt="Icon" width="35" height="25">';
        } else {
            submenusync.style.display = 'block';
            toggleIconsync.innerHTML = initialText + ' <img src="https://d2oir2m0sodeh3.cloudfront.net/products/VIEWLESS.png" alt="Icon" width="35" height="25">';
        }
    });

    // Display the icon and "Specialty Lifting" text after the first click
    toggleIconsync.style.display = 'inline';
});
