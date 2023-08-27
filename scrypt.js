const leftInfo = document.querySelector('.left-info');
const rightInfo = document.querySelector('.right-info');
// const locInput = document.querySelector('.loc-input');


leftInfo.addEventListener('click', ()=> {
    rightInfo.classList.toggle('active'),
    leftInfo.classList.toggle('active')
});

locInput.addEventListener('click', () => {
    locInput.classList.add('active')
});
locInput.addEventListener('mouseleave', () => {
    locInput.classList.remove('active')
});



// mouseleave  - відвеедення мишки з елемента