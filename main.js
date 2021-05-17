var points = 0;
var buttonSpeed = 20;
var upgradesBought = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var stunDuration = 700; // 0.7s
var stunCooldown = 7000; // 7s + the stun duration, 7 seconds so platers aren't too reliant on it
var pointsValue = 1;
var buttonSize = 30;
var gunMultiplier = 1;
var ogp = 1;
var ppm = 0;
var tabsUnlocked = 0;
var logText = ["Game started."]
var messageBody = document.querySelector('#log');
const log = document.getElementById('log')
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
var cursorSpeed = 1.2
let canvasSize = {
        x: 700,
        y: 550
    }
    //shop prices starting values
const shopSV = {
        speed: 1,
        size: 2,
        stunTime: 1,
        stunCooldown: 1,
        value: 5,
        cursor: 8,
        cursorSpeed: 12,
        dartGun: 14,
        dartReload: 16,
        gunMultiplier: 10
    }
    //shop multiplier
const shopPrices = {
    speed: 1.7,
    size: 2.5,
    stunTime: 1.65,
    stunCooldown: 1.7,
    value: 5,
    cursor: 1.8,
    cursorSpeed: 1.5,
    dartGun: 3.6,
    dartReload: 1.8,
    gunMultiplier: 3
}
load();

function addPoints(add) {
    points += add;
    ppm += add;
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
    //shopPrices[item] is the price of the thing bought
    itemPrice = shopPrices[item]
        // Object.keys(shopPrices).indexOf(item)] is the item's order in the object, ex. 
        // "size" would get you the number 1.
        // shopSV is the starting value
    boughtNumber = Object.keys(shopPrices).indexOf(item)
        //the amount ever purchased
    if (points >= (Math.floor(shopSV[item] * Math.pow(itemPrice, upgradesBought[boughtNumber])))) {
        //check if can afford
        addPoints(-1 * Math.floor(shopSV[item] * Math.pow(itemPrice, upgradesBought[boughtNumber])))
            //take points
        upgradesBought[boughtNumber]++
            //bouHGT AMOUnt +1
            newCost = Math.floor(shopSV[item] * Math.pow(itemPrice, upgradesBought[boughtNumber]))
        document.getElementById(item + 'Cost').innerHTML = newCost;
        //calculate new cost
        switch (item) {
            case "speed":
                buttonSpeed = buttonSpeed + buttonSpeed / 10
                rect.xspeed = (120 / buttonSpeed) * (rect.xspeed / Math.abs(rect.xspeed))
                rect.yspeed = (120 / buttonSpeed) * (rect.yspeed / Math.abs(rect.yspeed))
                logText.push("Speed: " + (500 / buttonSpeed).toFixed(2))
                break;
            case "size":
                // sigmoid function, makes size level off at around 100
                buttonSize = 46.6 / (0.4 + Math.pow(Math.E, -0.3 * upgradesBought[1])) - 14
                logText.push("Size: " + (buttonSize).toFixed(2))
                break;
            case "stunTime":
                stunDuration = Math.pow(stunDuration, 1.014)
                document.getElementById('stunDuration').innerHTML = (stunDuration / 1000).toFixed(2)
                logText.push("Stun time: " + (stunDuration / 1000).toFixed(2) + "s")
                break;
            case "stunCooldown":
                stunCooldown = Math.pow(stunCooldown, 0.99)
                logText.push("Cooldown: " + (stunCooldown / 1000).toFixed(2) + "s")
                break;
            case "value":
                pointsValue += pointsValue;
                ogp += ogp;
                logText.push("Value: " + pointsValue)
                break;
            case "cursor":
                cursors.push([0, 0, 0, Math.random() + 0.5, Math.random() + 0.5])
                logText.push("Cursors: " + cursors.length)
                break;
            case "cursorSpeed":
                cursorSpeed = Math.pow(cursorSpeed, 1.23)
                logText.push("Cursor speed: " + cursorSpeed.toFixed(2))
                break;
            case "dartGun":
                dartGuns.push([Math.random() * 600 + 25, Math.random() * 400 + 100, 0, 0, 0])
                logText.push("Dart guns: " + dartGuns.length)
                break;
            case "dartReload":
                //since reload is based on the amount bought,
                //this case isn't needed. I'm going to leave it here
                //anyway just so it doesn't break anything.
                logText.push("Reload time: " + ((110 / Math.pow(upgradesBought[8], 0.2)) / speed).toFixed(2) + "s")
                break;
            case "gunMultiplier":
                gunMultiplier += 1
                logText.push("Dart multiplier: x" + gunMultiplier)
                break;
        }
    }
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
//anything setTimeout() related goes as follows:
autoSave()
checkPPM()
updateLog()

function autoSave() {
    setTimeout(() => {
        save()
        autoSave()
    }, 20000); //save every 15s
}

function checkPPM() {
    setTimeout(() => {
        logText.push('Points/minute: ' + (ppm / 2).toFixed(2))
        ppm = 0;
        checkPPM()
    }, 30000); // output points/minute every 30s
}

var logNum = 0
var ltr = 0

//disable scrolling in log section
$('#log').on("mousewheel touchmove",
        function(e) {
            e.preventDefault();
        })
    //writes text to the log
function updateLog() {
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    // if this current string value is less than the amount of strings in the array
    if (logNum < logText.length) {
        //if this current letter is less than the letters in the string
        if (ltr < logText[logNum].length) {
            //add a letter
            log.innerHTML += logText[logNum].charAt(ltr);
            //mark that you wroter a letter
            ltr++;
            //if this is not the last letter, wait 30ms
            if (ltr !== logText[logNum].length) {
                setTimeout(updateLog, 40);
                //if it is, wait 500ms
            } else {
                setTimeout(updateLog, 500);
            }
        } else {
            // if the string is finished and it isn't the last one, add a line break and a >
            log.innerHTML += "<br>> "
                //start another string
            logNum++
            //reset letters
            ltr = 0
                //wait 30ms
            setTimeout(updateLog, 40);
        }
    } else {
        //if there is no more text to run,
        //check every second for more,.
        setTimeout(updateLog, 1000);
    }
}