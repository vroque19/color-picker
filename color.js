let min_color = 0;
let max_color = 16777215;
let current_time = 5;
let timer_id;
let color;
let current_score = 0;
let color_input;

let show;
let timer;
let start_button;
let picker;
let score_text;
let submit_button;
let instructions;
let play_again;

const MAX_ALLOWED_POINTS = 1000;
const BOOST = 1000;

function mount() {
    show = document.getElementById("show");
    timer = document.getElementById("timer");
    start_button = document.getElementById("startButton");
    picker = document.getElementById("picker");
    submit_button = document.getElementById("submit");
    instructions = document.getElementById("instructions");
    score_text = document.getElementById("score");
    timer.textContent = current_time;
    score_text.textContent = current_score;
    play_again = document.getElementById("play-again");
}

function getColor() {
    let random_color = Math.floor(Math.random() * (max_color - min_color + 1)) + min_color;
    return "#" + random_color.toString(16);
}

function setColor() {
    console.log("Hello");
    color = getColor();
    show.style.backgroundColor = color;
    show.style.display = "block";
    start_button.style.display = "none";
    startTimer();
}

function startTimer() {
    picker.value = getColor();
    timer_id = setInterval(function(){
        timer.textContent = current_time;
        if(current_time < 0) {
            endTimer();
        }
        current_time -= 1;
    }, 1000)
}

function endTimer() {
    clearInterval(timer_id);
    show.style.display = "none";
    timer.style.display = "none";
    picker.style.display = "block";
    submit.style.display = "block";
    instructions.textContent = "What was the color? Use the color picker below."
    
}
function handleGuess() {
    color_input = picker.value;
    console.log("Guessed: ", (color_input));
    console.log("Actual: ", (color));
    let color_difference = colorDifference(color, color_input);
    let points_to_award = getAdjustedPoints(color_difference);
    console.log("cd: ", color_difference, "points: ", points_to_award)
    current_score += points_to_award;
    score_text.textContent = current_score;
    play_again.style.display = "block";
}

function hexToRGB(hex_color) {
    let hex = hex_color.slice(1);
    let pieces = [];
    let idx = 0;
    for (let i = 0; i < hex.length; ++i) {
        if ( i % 2 == 0 ) {
            let new_pieces = hex.substring(i, i+2);
            console.log("new_pieces: " , new_pieces);
            pieces.push(new_pieces);
        }
    }

    let rgb = []
    // each piece to int
    pieces.forEach((piece) => {
        let as_int = parseInt(piece, 16);
        rgb.push(as_int);
    })

    return rgb;
}

function euclidDist(p1, p2) {
    console.log("p1" , p1, "p2", p2)
    let sum_of_differences = 0;
    const n = p1.length;
    for (let i = 0; i < n; ++i) {
        sum_of_differences += Math.pow(p1[i]-p2[i], 2);
    }

    return Math.sqrt(sum_of_differences)
}

function getAdjustedPoints(dist) {
    console.log('dist', dist)
    if (dist <= 40) return MAX_ALLOWED_POINTS;
    if (dist >= 400) return 0;
    return Math.floor(BOOST/dist);
}

function colorDifference(color_actual, color_guess) {
    let actual_point = hexToRGB(color_actual);
    let guess_point = hexToRGB(color_guess);

    return euclidDist(actual_point, guess_point);
}


mount();