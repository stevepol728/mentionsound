
// SEE MORE AND LESS EVENT
const seeless = document.querySelector('.btn-showless');
const showmore = document.querySelector('.btn-showall');
const seeall = document.querySelector('.btn-seeall');

seeless.addEventListener('click', toggleSeeLess);
showmore.addEventListener('click', toggleMore);
seeall.addEventListener('click', seeMore);

function toggleSeeLess() {
    const tagbox = document.querySelector('.tag-buttons');

    if(tagbox.classList.contains('show')) {
        tagbox.classList.remove('show');
        seeless.textContent = 'See more';
    } else {
        tagbox.classList.add('show');
        seeless.textContent = 'See less';
    }
}

function toggleMore() {
    const libraryBox = document.querySelector('.library-buttons');

    if(libraryBox.classList.contains('show')) {
        libraryBox.classList.remove('show');
        showmore.textContent = 'See more';
    } else {
        libraryBox.classList.add('show');
        showmore.textContent = 'See less';
    }
}

function seeMore() {
    const allCategories = document.querySelector('.categoryall');

    if(allCategories.classList.contains('show')) {
        allCategories.classList.remove('show');
        seeall.textContent = 'See more';
    } else {
        allCategories.classList.add('show');
        seeall.textContent = 'See less';
    }
}

const seelessmobile = document.querySelector('.btn-showless-mobile');
const showmoremobile = document.querySelector('.btn-showall-mobile');
const seeallmobile = document.querySelector('.btn-seeall-mobile');

seelessmobile.addEventListener('click', toggleSeeLessmobile);
showmoremobile.addEventListener('click', toggleMoremobile);
seeallmobile.addEventListener('click', seeMoremobile);

function toggleSeeLessmobile() {
    const tagboxmobile = document.querySelector('.tag-buttons-mobile');

    if(tagboxmobile.classList.contains('show')) {
        tagboxmobile.classList.remove('show');
        seelessmobile.textContent = 'See more';
    } else {
        tagboxmobile.classList.add('show');
        seelessmobile.textContent = 'See less';
    }
}

function toggleMoremobile() {
    const libraryBoxmobile = document.querySelector('.library-buttons-mobile');

    if(libraryBoxmobile.classList.contains('show')) {
        libraryBoxmobile.classList.remove('show');
        showmoremobile.textContent = 'See more';
    } else {
        libraryBoxmobile.classList.add('show');
        showmoremobile.textContent = 'See less';
    }
}

function seeMoremobile() {
    const allCategories = document.querySelector('.categoryall-mobile');

    if(allCategories.classList.contains('show')) {
        allCategories.classList.remove('show');
        seeallmobile.textContent = 'See more';
    } else {
        allCategories.classList.add('show');
        seeallmobile.textContent = 'See less';
    }
}

const collapseBtn = document.querySelector('.btn-collapse');
const collapse = document.querySelector('.collapse');

collapseBtn.addEventListener('click', () => {
    if(collapseBtn.classList.contains('active')) {
        collapseBtn.classList.remove('remove');
    } else {
        collapseBtn.classList.add('active');
    }
});