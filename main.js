var points = 0;
var buttonSpeed = 20;
var upgradesBaught = [1, 1, 1, 1, 1];
var stunDuration = 500; // 0.5s
var stunCooldown = 7000; // 7s + the stun duration, 7 seconds so platers aren't too reliant on it
var pointsValue = 1;
var buttonContainer = document.getElementById('buttonMarq')
setTimeout(() => {
    document.getElementById('buttonContainer').innerHTML = document.getElementById('buttonContainer').innerHTML
    buttonContainer = document.getElementById('buttonMarq')
    load();
    //load at the start, refresh marquee, get the new marquee
}, 200);


function addPoints(add) {
    points += add;
    document.getElementById("pointsSpan").innerHTML = points;
}

buttonContainer.setAttribute("scrollamount", buttonSpeed)
buttonContainer.parentElement.setAttribute("scrollamount", buttonSpeed)

function buy(item) {
    switch (item) {
        case "speed":
            if (points >= (Math.floor(Math.pow(1.7, upgradesBaught[0])))) {
                addPoints(-1 * Math.floor(Math.pow(1.7, upgradesBaught[0])))
                upgradesBaught[0]++
                    buttonSpeed = buttonSpeed - buttonSpeed / 28
                buttonContainer.setAttribute("scrollamount", buttonSpeed)
                buttonContainer.parentElement.setAttribute("scrollamount", buttonSpeed)
            }
            var newCost = Math.floor(Math.pow(1.7, upgradesBaught[0]))
            break;
        case "size":
            if (points >= (Math.floor(Math.pow(3.2113, upgradesBaught[1])))) {
                addPoints(-1 * Math.floor(Math.pow(3.2113, upgradesBaught[1])))
                document.getElementById('movingButton').style.width = Math.pow(30, 1 + 0.06 * upgradesBaught[1]) + "px"
                document.getElementById('movingButton').style.height = Math.pow(30, 1 + 0.06 * upgradesBaught[1]) + "px"
                upgradesBaught[1]++
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
            if (points >= Math.floor(10 * Math.pow(upgradesBaught[4], 1.5))) {
                addPoints(-1 * Math.floor(10 * Math.pow(upgradesBaught[4], 1.5)))
                upgradesBaught[4]++
                    pointsValue += pointsValue;
                document.getElementById('movingButton').innerHTML = "+" + pointsValue
            }
            var newCost = Math.floor(10 * Math.pow(upgradesBaught[4], 1.4))
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
    buttonContainer.stop(); //stop the marquees
    buttonContainer.parentElement.stop();
    setTimeout(function() { //wait duration
        buttonContainer.start(); //start marquees
        buttonContainer.parentElement.start();
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

setTimeout(() => {
    save()
}, 15000); //save every 15s