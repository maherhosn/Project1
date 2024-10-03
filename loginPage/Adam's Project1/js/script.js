const progressEl = document.querySelector('#progress');
const aEl = document.createElement('a');
const sectionEl = document.createElement('section');
const loginEl = document.querySelector('#enter');


function loader() {

let loadingTime = 0;

function loadTime() {
    const loadInterval = setInterval(function () {
       
        loadingTime++;
       
     progressEl.textContent = loadingTime + '% Loading..........';
        if (loadingTime == 99) {
           
         window.location.href = "../../Create Order/create-order.html";
        }

    
    }, 20);
}

loadTime();
};

loginEl.addEventListener('click', loader);

