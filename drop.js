document.addEventListener('DOMContentLoaded', function () {
    var menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            var submenu = this.querySelector('.submenu');
            submenu.style.display = (submenu.style.display === 'none' || submenu.style.display === '') ? 'block' : 'none';

            // Add margin-top to the first offset-item within the submenu
            var firstOffsetItem = submenu.querySelector('.submenu-item');
            if (firstOffsetItem) {
                firstOffsetItem.style.marginTop = '30px';
            }
        });
    });
});
