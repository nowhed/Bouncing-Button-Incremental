var points = 0;
var buttonSpeed = 26;
var upgradesBaught = [1, 1, 1, 1, 1, 1, 1];
var stunDuration = 700; // 0.7s
var stunCooldown = 7000; // 7s + the stun duration, 7 seconds so platers aren't too reliant on it
var pointsValue = 1;
var buttonSize = 30;
var cursors = [
    //x, y, clickprogress, random factor x, random factor 
]
load();
var cursorSpeed = 1.5
let canvasSize = {
    x: 700,
    y: 550
}

function addPoints(add) {
    points += add;
    document.getElementById("pointsSpan").innerHTML = points;
}

function buy(item) {
    switch (item) {
        case "speed":
            if (points >= (Math.floor(Math.pow(1.7, upgradesBaught[0])))) {
                addPoints(-1 * Math.floor(Math.pow(1.7, upgradesBaught[0])))
                upgradesBaught[0]++
                    buttonSpeed = buttonSpeed - buttonSpeed / 25
            }
            var newCost = Math.floor(Math.pow(1.7, upgradesBaught[0]))
            break;
        case "size":
            if (points >= (Math.floor(Math.pow(3.2113, upgradesBaught[1])))) {
                addPoints(-1 * Math.floor(Math.pow(3.2113, upgradesBaught[1])))
                upgradesBaught[1]++
                    // sigmoid function, makes size level off at around 100
                    buttonSize = 46.6 / (0.4 + Math.pow(Math.E, -0.3 * upgradesBaught[1])) - 14
            }
            var newCost = Math.floor(Math.pow(3.2113, upgradesBaught[1]))
            break;
        case "stunTime":
            if (points >= (Math.floor(Math.pow(1.65, upgradesBaught[2])))) {
                addPoints(-1 * Math.floor(Math.pow(1.65, upgradesBaught[2])))
                upgradesBaught[2]++
                    stunDuration = Math.pow(stunDuration, 1.014)
                document.getElementById('stunDuration').innerHTML = (stunDuration / 1000).toFixed(2)
            }
            var newCost = Math.floor(Math.pow(1.65, upgradesBaught[2]))
            break;
        case "stunCooldown":
            if (points >= (Math.floor(Math.pow(1.7, upgradesBaught[3])))) {
                addPoints(-1 * Math.floor(Math.pow(1.7, upgradesBaught[3])))
                upgradesBaught[3]++
                    stunCooldown = Math.pow(stunCooldown, 0.99)
            }
            var newCost = Math.floor(Math.pow(1.7, upgradesBaught[3]))
            break;
        case "value":
            if (points >= Math.floor(10 * Math.pow(upgradesBaught[4], 3.8))) {
                addPoints(-1 * Math.floor(10 * Math.pow(upgradesBaught[4], 3.8)))
                upgradesBaught[4]++
                    pointsValue += pointsValue;
                ogp += ogp;
            }
            var newCost = Math.floor(10 * Math.pow(upgradesBaught[4], 3.8))
            break;
        case "cursor":
            if (points >= Math.floor(20 * Math.pow(upgradesBaught[5], 1.2))) {
                addPoints(-1 * Math.floor(20 * Math.pow(upgradesBaught[5], 1.2)))
                upgradesBaught[5]++
                    cursors.push([0, 0, 0, 1 + Math.random(), 1 + Math.random()])
            }
            var newCost = Math.floor(20 * Math.pow(upgradesBaught[5], 1.2))
            break;
        case "cursorSpeed":
            if (points >= Math.floor(12 * Math.pow(upgradesBaught[6], 1.5))) {
                addPoints(-1 * Math.floor(12 * Math.pow(upgradesBaught[6], 1.5)))
                upgradesBaught[6]++
                    cursorSpeed = Math.pow(cursorSpeed, 1.23)
            }
            var newCost = Math.floor(12 * Math.pow(upgradesBaught[6], 1.5))
            break;
    }
    document.getElementById(item + 'Cost').innerHTML = newCost;
}

$(document).keydown(function(event) {
    if ((event.keyCode === 83))
        if (document.getElementById('stunbutton').disabled === false) {
            stunButton()
        }
});

function stunButton() {
    document.getElementById('stunbutton').disabled = true; //disable button
    activeMoving = false //stop button
    setTimeout(function() { //wait duration
        activeMoving = true //start button
        moveProgress("stunCooldown", (stunCooldown)) //start the cooldown bar
        setTimeout(function() { //wait for cooldown
            document.getElementById('stunbutton').disabled = false; // enable button
        }, (stunCooldown));
    }, (stunDuration));

    function moveProgress(barId, duration) {
        var elem = document.getElementById(barId);
        var width = 0;
        var id = setInterval(frame, (duration / 100));

        function frame() {
            if (width >= 100) {
                elem.style.backgroundColor = "#69ded6";
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
                elem.innerHTML = width * 1 + '%';
            }
        }
    }
}