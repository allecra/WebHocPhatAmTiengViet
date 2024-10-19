let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchFrom.classList.remove('active');
}

let searchFrom = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchFrom.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchFrom.classList.remove('active');
}
function closeVideoBanner() {
    var videoBanner = document.getElementById('videoBanner');
    videoBanner.style.display = 'none';
}
