document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navList = document.querySelector('nav ul');

    mobileMenuButton.addEventListener('click', function () {
        navList.classList.toggle('show');
    });
});