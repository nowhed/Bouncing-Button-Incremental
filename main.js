var points = 0;
var buttonSpeed = 20;
var upgradesBought = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var stunDuration = 700; // 0.7s
var stunCooldown = 7000; // 7s + the stun duration, 7 seconds so platers aren't too reliant on it
var pointsValue = 1;
var buttonSize = 30;
var gunMultiplier = 1;
var ogp = 1;
var tabsUnlocked = 0;
var cursors = [
    //x, y, clickprogress, random factor x, random factor 
]
var dartGuns = [
    //  x, y, rotation, rotValue (0-1), reload progress, rotate velocity
]
var bullet = [
    //x, y, rotation, velocity, opacity
]
var gunSettings = {
    enhanced: true,
    dist: 2,
    enhancedVal: 10
};
load();
var cursorSpeed = 1.2
let canvasSize = {
    x: 700,
    y: 550
}

function addPoints(add) {
    points += add;
    document.getElementById("pointsSpan").innerHTML = points;
    if (points >= 15 && tabsUnlocked === 0) {
        document.getElementById('Cursors').innerHTML = "Cursors"
        document.getElementById('Cursors').disabled = false
        tabsUnlocked = 1
    }
    if (points >= 40 && tabsUnlocked > 0) {
        document.getElementById('dartGun').innerHTML = "Dart Gun"
        document.getElementById('dartGun').disabled = false
        tabsUnlocked = 2
    }
}

function buy(item) {
    switch (item) {
        case "speed":
            if (points >= (Math.floor(Math.pow(1.7, upgradesBought[0])))) {
                addPoints(-1 * Math.floor(Math.pow(1.7, upgradesBought[0])))
                upgradesBought[0]++
                    buttonSpeed = buttonSpeed + buttonSpeed / 10
                rect.xspeed = (120 / buttonSpeed) * (rect.xspeed / Math.abs(rect.xspeed))
                rect.yspeed = (120 / buttonSpeed) * (rect.yspeed / Math.abs(rect.yspeed))
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Speed: " + (500 / buttonSpeed).toFixed(2)])
            }
            var newCost = Math.floor(Math.pow(1.7, upgradesBought[0]))
            break;
        case "size":
            if (points >= (Math.floor(Math.pow(3.2113, upgradesBought[1])))) {
                addPoints(-1 * Math.floor(Math.pow(3.2113, upgradesBought[1])))
                upgradesBought[1]++
                    // sigmoid function, makes size level off at around 100
                    buttonSize = 46.6 / (0.4 + Math.pow(Math.E, -0.3 * upgradesBought[1])) - 14
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Size: " + (buttonSize).toFixed(2)])
            }
            var newCost = Math.floor(Math.pow(3.2113, upgradesBought[1]))
            break;
        case "stunTime":
            if (points >= (Math.floor(Math.pow(1.65, upgradesBought[2])))) {
                addPoints(-1 * Math.floor(Math.pow(1.65, upgradesBought[2])))
                upgradesBought[2]++
                    stunDuration = Math.pow(stunDuration, 1.014)
                document.getElementById('stunDuration').innerHTML = (stunDuration / 1000).toFixed(2)
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Stun time: " + (stunDuration / 1000).toFixed(2) + "s"])
            }
            var newCost = Math.floor(Math.pow(1.65, upgradesBought[2]))
            break;
        case "stunCooldown":
            if (points >= (Math.floor(Math.pow(1.7, upgradesBought[3])))) {
                addPoints(-1 * Math.floor(Math.pow(1.7, upgradesBought[3])))
                upgradesBought[3]++
                    stunCooldown = Math.pow(stunCooldown, 0.99)
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Cooldown: " + (stunCooldown / 1000).toFixed(2) + "s"])
            }
            var newCost = Math.floor(Math.pow(1.7, upgradesBought[3]))
            break;
        case "value":
            if (points >= Math.floor(10 * Math.pow(upgradesBought[4], 3.8))) {
                addPoints(-1 * Math.floor(10 * Math.pow(upgradesBought[4], 3.8)))
                upgradesBought[4]++
                    pointsValue += pointsValue;
                ogp += ogp;
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Value: " + pointsValue])
            }
            var newCost = Math.floor(10 * Math.pow(upgradesBought[4], 3.8))
            break;
        case "cursor":
            if (points >= Math.floor(20 * Math.pow(upgradesBought[5], 1.05))) {
                addPoints(-1 * Math.floor(20 * Math.pow(upgradesBought[5], 1.05)))
                upgradesBought[5]++
                    cursors.push([0, 0, 0, 1.5 * Math.random() + 0.2, 1.5 * Math.random() + 0.2])
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Cursors: " + cursors.length])
            }
            var newCost = Math.floor(20 * Math.pow(upgradesBought[5], 1.05))
            break;
        case "cursorSpeed":
            if (points >= Math.floor(12 * Math.pow(upgradesBought[6], 1.5))) {
                addPoints(-1 * Math.floor(12 * Math.pow(upgradesBought[6], 1.5)))
                upgradesBought[6]++
                    cursorSpeed = Math.pow(cursorSpeed, 1.23)
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Cursor speed: " + cursorSpeed.toFixed(2)])
            }
            var newCost = Math.floor(12 * Math.pow(upgradesBought[6], 1.5))
            break;
        case "dartGun":
            if (points >= Math.floor(50 * Math.pow(upgradesBought[7], 1.8))) {
                addPoints(-1 * Math.floor(50 * Math.pow(upgradesBought[7], 1.8)))
                upgradesBought[7]++
                    dartGuns.push([Math.random() * 600 + 25, Math.random() * 400 + 100, 0, 0, 0])
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Dart guns: " + dartGuns.length])
            }
            var newCost = Math.floor(50 * Math.pow(upgradesBought[7], 1.8))
            break;
        case "dartReload":
            if (points >= Math.floor(40 * Math.pow(upgradesBought[8], 1.8))) {
                addPoints(-1 * Math.floor(40 * Math.pow(upgradesBought[8], 1.8)))
                upgradesBought[8]++
                    plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Reload time: " + ((100 / (upgradesBought[8] / 3)) / speed).toFixed(2) + "s"])
            }
            var newCost = Math.floor(40 * Math.pow(upgradesBought[8], 1.8))
            break;
        case "gunMultiplier":
            if (points >= Math.floor(50 * Math.pow(upgradesBought[9], 3))) {
                addPoints(-1 * Math.floor(50 * Math.pow(upgradesBought[9], 3)))
                upgradesBought[9]++
                    gunMultiplier *= 2
                plusTexts.push([rect.x + buttonSize * 8 * scale * Math.random(), rect.y + buttonSize * 6 * scale * Math.random(), 1, "Dart multiplier: x" + gunMultiplier])
            }
            var newCost = Math.floor(50 * Math.pow(upgradesBought[9], 3))
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