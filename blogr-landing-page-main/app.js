const openMenu = document.querySelector('.navbar-menu button');
const submenu = document.querySelector('.sidemenu');
const sidemenulinks = document.querySelectorAll('.sidemenu-links-text');
const sidemenuarrow = document.querySelectorAll('.sidemenu-arrow img');


// const closeMenu = document.querySelector('.navbar-menu');

function toggleMenu(){
    submenu.classList.toggle('active');
}

function toggleSideLinks(e){
    const elem = e.target;
    if(elem.classList.contains('sidemenu-links-text')) {
        elem.parentElement.nextElementSibling.classList.toggle('active');
    } else {
        elem.parentElement.parentElement.nextElementSibling.classList.toggle('active');
    }
    
}


function handleToggleMenu(e) {
    if(e.target.classList.contains('sidemenu')) submenu.classList.remove('active');
}


openMenu.addEventListener('click', toggleMenu);
sidemenulinks.forEach(sl => sl.addEventListener('click', toggleSideLinks));
sidemenuarrow.forEach(sa => sa.addEventListener('click', toggleSideLinks));
submenu.addEventListener('click', handleToggleMenu);
// closeMenu.addEventListener('click', () => toggleMenu(false));