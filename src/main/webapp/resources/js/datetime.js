let date = document.getElementById("date");
let time = document.getElementById("time");

date.innerHTML = new Date().toLocaleDateString();
time.innerHTML = new Date().toLocaleTimeString();

setInterval(() => {
    date.innerHTML = new Date().toLocaleDateString();
    time.innerHTML = new Date().toLocaleTimeString();
}, 13000)