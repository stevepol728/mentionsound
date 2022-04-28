const searchIcon = document.querySelector('.btn-responsivesearch');
const searchBox = document.querySelector('.responsive-search-box');
searchIcon.addEventListener('click', showSearchBox);

function showSearchBox() {
    if(searchBox.classList.contains('show')) {
        searchBox.classList.remove('show');
    } else {
        searchBox.classList.add('show');
    }
}
