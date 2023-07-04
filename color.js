let min_color = 0;
let max_color = 16777215;
let current_time = 5;
let timer_id;
let color;
let current_score = "";
let color_input;

let show;
let timer;
let start_button;
let picker;
let score_text;
let curr_score;
let submit_button;
let instructions;
let play_again;
let color_act;
let color_guessed;

const MAX_ALLOWED_POINTS = 100;
const BOOST = 2500;

function mount() {
    show = document.getElementById("show");
    score_text = document.getElementById("score-text");
    timer = document.getElementById("timer");
    start_button = document.getElementById("startButton");
    picker = document.getElementById("picker");
    submit_button = document.getElementById("submit");
    instructions = document.getElementById("instructions");
    curr_score = document.getElementById("score");
    timer.textContent = current_time;
    curr_score.textContent = current_score;
    play_again = document.getElementById("play-again");
    color_act = document.getElementById("actual");
    color_guessed = document.getElementById("input");
}

function getColor() {
    let random_color = Math.floor(Math.random() * (max_color - min_color + 1)) + min_color;
    return "#" + random_color.toString(16);
}

function setColor() {
    console.log("Hello");
    instructions.style.display = "block";
    color = getColor();
    show.style.backgroundColor = color;
    show.style.display = "block";
    start_button.style.display = "none";
    startTimer();
}

function startTimer() {
    timer.style.display = "block";
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
    submit_button.disabled = true;
    color_input = picker.value;
    console.log("Guessed: ", (color_input));
    console.log("Actual: ", (color));
    let color_difference = colorDifference(color, color_input);
    console.log("score:", current_score)
    let points_to_award = getAdjustedPoints(color_difference);
    console.log("cd: ", color_difference, "points: ", points_to_award)
    current_score += points_to_award;
    if(curr_score.textContent == "") {
        curr_score.textContent = current_score;
    }
    play_again.style.display = "inline-block";
    compareColors(color, color_input);
    showScore();
    if(color_difference < 20) {
        instructions.textContent = "WOW! Maximum points awarded."
    }
    else if(color_difference > 100) {
        instructions.textContent = "Way off. Play again!"
    }
    else {
        instructions.textContent = "Pretty close! Play again?"
    }
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
    if (dist <= 25) return MAX_ALLOWED_POINTS;
    if (dist >= 300) return 0;
    return Math.floor(BOOST/dist);
}

function colorDifference(color_actual, color_guess) {
    let actual_point = hexToRGB(color_actual);
    let guess_point = hexToRGB(color_guess);

    return euclidDist(actual_point, guess_point);
}

function compareColors(color_actual, color_guess) {
    console.log("comparing colors", color_actual, "and ", color_guess);
    color_guessed.style.backgroundColor = color_guess;
    color_act.style.backgroundColor = color_actual;
    color_act.style.display = "inline-block";
    color_guessed.style.display = "inline-block";
    picker.style.display = "none";
    
}

function showScore() {
    score_text.style.display = "block";
    curr_score.style.diplay = "block";
}


mount();