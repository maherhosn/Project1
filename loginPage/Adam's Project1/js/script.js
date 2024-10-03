const progressEl = document.querySelector('#progress');
const aEl = document.createElement('a');
const sectionEl = document.createElement('section');
const loginEl = document.querySelector('#enter');
const usernameText = document.getElementById("username");


function loader() {

    let loadingTime = 0;

    function loadTime() {
        const loadInterval = setInterval(function () {

            loadingTime++;

            progressEl.textContent = loadingTime + '% Loading..........';
            if (loadingTime == 99) {

                window.location.href = "Create Order/create-order.html";
            }


        }, 20);
    }

    loadTime();
};

loginEl.addEventListener('click', function () {
    let firstName = usernameText.value;

    if (!((firstName === "") || (firstName === null))) {
        localStorage.setItem('profileName', firstName);
        loader();
    }
    else {
        alert("No username Entered")
    }
});


