var points = 0;
var buttonSpeed = 30;
var upgradesBaught = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var stunDuration = 700; // 0.7s
var stunCooldown = 7000; // 7s + the stun duration, 7 seconds so platers aren't too reliant on it
var pointsValue = 1;
var buttonSize = 30;
var gunMultiplier = 1;
var ogp = 1;
var cursors = [
    //x, y, clickprogress, random factor x, random factor 
]
var dartGuns = [
    //  x, y, rotation, rotValue (0-1), reload progress, rotate velocity
]
var bullet = [
    //x, y, rotation, velocity, opacity
]
load();
var cursorSpeed = 1.2
let canvasSize = {
    x: 700,
    y: 550
}

function addPoints(add) {
    points += add;
    document.getElementById("pointsSpan").innerHTML = points;
    if (points >= 15) {
        document.getElementById('Cursors').innerHTML = "Cursors"
        document.getElementById('Cursors').disabled = false
    } else {
        return;
    }
    if (points >= 40) {
        document.getElementById('dartGun').innerHTML = "Dart Gun"
        document.getElementById('dartGun').disabled = false
    } else {
        return;
    }
}

function buy(item) {
    switch (item) {
        case "speed":
            if (points >= (Math.floor(Math.pow(1.7, upgradesBaught[0])))) {
                addPoints(-1 * Math.floor(Math.pow(1.7, upgradesBaught[0])))
                upgradesBaught[0]++
                    buttonSpeed = buttonSpeed - buttonSpeed / 30
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
            if (points >= Math.floor(20 * Math.pow(upgradesBaught[5], 1.1))) {
                addPoints(-1 * Math.floor(20 * Math.pow(upgradesBaught[5], 1.1)))
                upgradesBaught[5]++
                    cursors.push([0, 0, 0, 1.5 * Math.random() + 0.2, 1.5 * Math.random() + 0.2])
            }
            var newCost = Math.floor(20 * Math.pow(upgradesBaught[5], 1.1))
            break;
        case "cursorSpeed":
            if (points >= Math.floor(12 * Math.pow(upgradesBaught[6], 1.5))) {
                addPoints(-1 * Math.floor(12 * Math.pow(upgradesBaught[6], 1.5)))
                upgradesBaught[6]++
                    cursorSpeed = Math.pow(cursorSpeed, 1.23)
            }
            var newCost = Math.floor(12 * Math.pow(upgradesBaught[6], 1.5))
            break;
        case "dartGun":
            if (points >= Math.floor(50 * Math.pow(upgradesBaught[7], 1.8))) {
                addPoints(-1 * Math.floor(50 * Math.pow(upgradesBaught[7], 1.8)))
                upgradesBaught[7]++
                    dartGuns.push([Math.random() * 350 - 50, Math.random() * 450 + 50, 0, 0, 0])
            }
            var newCost = Math.floor(50 * Math.pow(upgradesBaught[7], 1.8))
            break;
        case "dartReload":
            if (points >= Math.floor(40 * Math.pow(upgradesBaught[8], 1.1))) {
                addPoints(-1 * Math.floor(40 * Math.pow(upgradesBaught[8], 1.1)))
                upgradesBaught[8]++
            }
            var newCost = Math.floor(40 * Math.pow(upgradesBaught[8], 1.1))
            break;
        case "gunMultiplier":
            if (points >= Math.floor(50 * Math.pow(upgradesBaught[9], 1.7))) {
                addPoints(-1 * Math.floor(50 * Math.pow(upgradesBaught[9], 1.7)))
                upgradesBaught[9]++
                    gunMultiplier *= 2
            }
            var newCost = Math.floor(50 * Math.pow(upgradesBaught[9], 1.7))
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

function swapTab(evt, tab) { //tabs
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active";
}

function toRadian(d) {
    return d * 0.01745;
}