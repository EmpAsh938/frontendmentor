const navmenu = document.querySelector('.nav__menu');
const sidebar = document.querySelector('.sidemenu');
const closemenu = document.querySelector('.sidemenu__close img');

function toggleSideBar() {
    sidebar.classList.toggle('sidemenu__active');
}


navmenu.addEventListener('click', toggleSideBar);
closemenu.addEventListener('click', toggleSideBar);