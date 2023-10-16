function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeHeaderColorRandomly() {
    const header = document.querySelector('body');
    header.style.backgroundColor = getRandomColor();
}


// Change color every 5 seconds (or adjust the interval as needed)
setInterval(changeHeaderColorRandomly, 5000);
