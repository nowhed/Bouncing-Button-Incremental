let scale = 0.17; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let speed = 30;
let borderThickness = 6;
var currentMousePos = { x: -1, y: -1 };
var cornerTextOpacity = 0;
var activeMoving = true;
var down = false;
var mouseinbox = false;
var mouseMoving = false;
var cursorImg = new Image();
var bulletImg = new Image();
var dartGunImg = new Image();
//x, y, opacity
var plusTexts = []
var rect = {
    x: 0,
    y: 0,
    height: buttonSize * 6,
    xspeed: 120 / buttonSpeed,
    yspeed: 120 / buttonSpeed,
    color: "#383838"
};
canvas = document.getElementById("buttonCanvas");
ctx = canvas.getContext("2d");
const objGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
objGradient.addColorStop(0, 'red');
objGradient.addColorStop(1 / 6, 'orange');
objGradient.addColorStop(2 / 6, 'yellow');
objGradient.addColorStop(3 / 6, 'green')
objGradient.addColorStop(4 / 6, 'blue');
objGradient.addColorStop(5 / 6, 'Indigo');
objGradient.addColorStop(1, 'Violet');
var og = rect.color;
(function main() {
    //Draw the "tv screen"
    canvas.width = canvasSize.x;
    canvas.height = canvasSize.y;
    canvas.addEventListener('click', function(event) {
        if (mouseinbox) {
            addPoints(pointsValue)
            plusTexts.push([rect.x, rect.y, 1, pointsValue])
        }
    })
    window.setInterval(update, speed);
})();

function update() {
    setTimeout(() => {
        //get current mouse X and Y
        checkMouse();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        //Draw the canvas background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasSize.x, canvasSize.y);
        // draw button outline
        ctx.fillStyle = '#bcbcbc';
        ctx.fillRect(rect.x - borderThickness / 2, rect.y - borderThickness / 2, buttonSize * 8 * scale + borderThickness, buttonSize * 6 * scale + borderThickness);
        // draw button
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, buttonSize * 8 * scale, buttonSize * 6 * scale);
        //draw button value text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '24px Sans-serif';
        ctx.fillText("+ " + pointsValue, rect.x + (buttonSize * 8 * scale / 2), rect.y + (buttonSize * 8 * scale / 2))
            //Move the button
            //if you hit a corner, show some text and then fade it out
        ctx.font = '30px Sans-serif';
        ctx.fillStyle = 'rgba(0, 0, 81, ' + cornerTextOpacity + ')'
        if (cornerTextOpacity > 0) { //if the "corner reached" text is not gone, make it slowly
            cornerTextOpacity -= 0.005
            ctx.fillText("Corner frenzy! (x3 button value)", 300, 200)
        }
        ctx.font = '15px Sans-serif';
        for (i = 0; i < plusTexts.length; i++) { //for every fading number there is
            plusTexts[i][2] -= 0.02 //make it more transparent
            ctx.fillStyle = 'rgba(0, 0, 0, ' + plusTexts[i][2] + ')' //display transparency
            ctx.fillText(plusTexts[i][3], plusTexts[i][0], plusTexts[i][1]) //display
            plusTexts[i][1] += -1 //make it go up
            if (plusTexts[i][2] <= 0) plusTexts.splice(i, 1) //if it's transparent, get rid of it
        }
        if (activeMoving) {
            rect.x += rect.xspeed;
            rect.y += rect.yspeed;
        }
        //Check for collision 
        cursorEvents();
        dartGunEvents();
        checkHitBox();
    }, speed)
}

function dartGunEvents() {
    //render bullets
    for (i = 0; i < bullet.length; i++) {
        ctx.save();
        //x, y, rotation, velocity, opacity
        //0, 1, 2,        3,        4
        //if hit box, add points and stop
        if (bullet[i][0] >= rect.x - 10 &&
            bullet[i][0] <= rect.x + buttonSize * 8 * scale + 10 &&
            bullet[i][1] >= rect.y - 10 &&
            bullet[i][1] <= rect.y + buttonSize * 6 * scale + 10 &&
            bullet[i][4] === 1) {
            bullet[i][3] = 0; // if hit button
            addPoints(pointsValue)
            plusTexts.push([rect.x, rect.y, 1, pointsValue * gunMultiplier]) // add points
        }

        if (bullet[i][0] + 40 >= canvasSize.x - 10 ||
            bullet[i][0] <= 10 ||
            bullet[i][1] + 5.5 >= canvasSize.y - 25 ||
            bullet[i][1] <= 25) {
            bullet[i][3] = 0; // if I hit a wall, stop the velocity
        }
        //set the bullet closer to the button, times bullet speed
        bullet[i][3] = Math.pow(bullet[i][3], 0.98) //make the velocity a little slower
        bullet[i][0] += (bullet[i][3] - 1) * Math.cos(bullet[i][2]); // move fowards
        bullet[i][1] += (bullet[i][3] - 1) * Math.sin(bullet[i][2]); // move fowards
        ctx.translate(bullet[i][0], bullet[i][1]);
        ctx.rotate(bullet[i][2]) //rotate same direction as gun
        ctx.translate(-bullet[i][0], -bullet[i][1]);
        //draw bullet
        ctx.globalAlpha = bullet[i][4];
        ctx.drawImage(bulletImg, bullet[i][0], bullet[i][1], 40, 5.5)
        ctx.globalAlpha = 1;
        ctx.restore();
        if (bullet[i][3] < 2.5) { //is slower than 1.5/tick?
            bullet[i][4] -= 0.08 //start fading out
        }
        if (bullet[i][4] < 0.05) { //opacity < 0.05?
            bullet.splice(i, 1) //delete this bullet
        }
    }
    // render every dart gun
    ctx.globalAlpha = 0.75;
    for (i = 0; i < dartGuns.length; i++) {
        ctx.save();
        centerX = dartGuns[i][0] + 50
        centerY = dartGuns[i][1] + 10.5
            // 0:x, 1:y, 2:rotation, 3:reload progress, 4:rotate velocity
        dartGuns[i][3]++

            // distY = Math.abs(rect.y - centerX); //distance to y of button
            // distX = Math.abs(rect.x - centerY); // " " but x
            distY = (rect.y - centerY)
        distX = (rect.x - centerX)
            //distance + future
        if (activeMoving && gunSettings.enhanced) {
            distY = (rect.y - centerY + (Math.abs(distY) / gunSettings.dist * rect.yspeed) / gunSettings.enhancedVal); //distance to y of button, in the future
            distX = (rect.x - centerX + (Math.abs(distX) / gunSettings.dist * rect.xspeed) / gunSettings.enhancedVal); // based on how far it is
        }
        ctx.translate(centerX, centerY);
        ctx.rotate(Math.atan2(distY, distX))
            //if the gun can fire
        if (Math.floor(dartGuns[i][3] % (100 / (upgradesBought[8] / 3))) === 0) {
            //x, y, rotation, velocity, opacity
            bullet.push([centerX, centerY, Math.atan2(distY, distX), 40, 1])
                //fire bullet
        }
        ctx.translate(-centerX, -centerY);
        ctx.drawImage(dartGunImg, dartGuns[i][0], dartGuns[i][1], 90, 55);
        ctx.restore();
        ctx.fillStyle = "black";
        ctx.font = '15px Sans-serif';
        //add a text box above, showing time before firing
        ctx.fillText((((100 / (upgradesBought[8] / 3)) - dartGuns[i][3] % (100 / (upgradesBought[8] / 3))) / speed).toFixed(2) + "s",
            dartGuns[i][0] + 50, dartGuns[i][1] - 50)
    }
    ctx.globalAlpha = 1;
}

function cursorEvents() {
    for (i = 0; i < cursors.length; i++) { //for the cursors in cursors
        // calculate distance and diret
        cursorSigX = Math.abs((1.04 * buttonSpeed / (1 + Math.pow(Math.E, -cursors[i][3] * 0.2))) - buttonSpeed / 1.9)
        cursorSigY = Math.abs((1.04 * buttonSpeed / (1 + Math.pow(Math.E, -cursors[i][4] * 0.2))) - buttonSpeed / 1.9)
        while (cursorSigX > 120 / buttonSpeed) {
            cursorSigX = cursorSigX * (cursors[i][3] - Math.floor(cursors[i][3]))
        }
        while (cursorSigY > 120 / buttonSpeed) {
            cursorSigY = cursorSigY * (cursors[i][4] - Math.floor(cursors[i][4]))
        }
        cspeedX = cursorSpeed * cursorSigX
        cspeedY = cursorSpeed * cursorSigY
        toButtonX = rect.x + buttonSize * 4 * scale - cursors[i][0]
        toButtonY = rect.y + buttonSize * 3 * scale - cursors[i][1]
        toButtonLength = Math.sqrt(toButtonX * toButtonX + toButtonY * toButtonY);
        toButtonX = toButtonX / toButtonLength;
        toButtonY = toButtonY / toButtonLength;
        //set the cursor closer to the button, times cursor speed
        cursors[i][0] += toButtonX * cspeedX
        cursors[i][1] += toButtonY * cspeedY
        ctx.fillStyle = "black";
        ctx.font = '15px Sans-serif';
        //add a text box above, showing this cursor's speed
        ctx.fillText((cursorSigX * cursorSpeed * cursorSigY * cursorSpeed).toFixed(3), cursors[i][0], cursors[i][1] - 10)
        ctx.drawImage(cursorImg, cursors[i][0], cursors[i][1], 18, 29); //draw the cursor(s)
        if (cursors[i][0] >= rect.x &&
            cursors[i][0] <= rect.x + buttonSize * 8 * scale &&
            cursors[i][1] >= rect.y &&
            cursors[i][1] <= rect.y + buttonSize * 6 * scale) {
            //increase the "cursor click progress" by 1
            if (cursors[i][2] % Math.floor(120 / cursorSpeed) === 0) { //got a click!
                addPoints(pointsValue)
                plusTexts.push([rect.x, rect.y, 1, pointsValue])
                    //give a little bonus to this cursor's speed, as a reward
                    // sigmoid. 450 * buttonspeed /E^-0.3*cursor speed
                cursors[i][3] += cursors[i][3] / 16
                cursors[i][4] += cursors[i][4] / 16
                    //if a cursor is faster than the button, penalize it.
            }
            cursors[i][2]++
        } else {
            cursors[i][2] = Math.floor(120 / cursorSpeed)
        }
    }
}
// x = 40, bx = 10
// x = 10, bx = 15
// -30, 5
//Check for border collision
function checkHitBox() {
    didfirst = false;
    if (rect.x + buttonSize * 8 * scale >= canvasSize.x || rect.x <= 0) {
        rect.xspeed *= -1;
        rect.x += rect.xspeed;
        didfirst = true
    }

    if (rect.y + buttonSize * 6 * scale >= canvasSize.y || rect.y <= 0) {
        rect.yspeed *= -1;
        rect.y += rect.yspeed;
        if (didfirst) {
            //, 0%, rgba(255, 94, 0, 1) 28 % , rgba(53, 159, 39, 1) 53 % , rgba(50, 47, 255, 1) 79 % , rgba(255, 0, 236, 1) 100 % 
            rect.color = objGradient
            console.log("Hit a corner!")
            og = objGradient
            cornerTextOpacity = 1;
            ogp = pointsValue
            pointsValue *= 3
            setTimeout(() => {
                og = '#383838'
                pointsValue = ogp
            }, 6000);
        }
    }
}

function checkMouse() {
    //if mouse is within button's borders
    if (currentMousePos.x >= rect.x &&
        currentMousePos.x <= rect.x + buttonSize * 8 * scale &&
        currentMousePos.y >= rect.y &&
        currentMousePos.y <= rect.y + buttonSize * 6 * scale) {
        if (rect.color !== '#b8b8b8') {
            og = rect.color
        }
        rect.color = '#b8b8b8'
        mouseinbox = true
            //  console.log('Mouse!')
    } else {
        mouseinbox = false
        rect.color = og;
    }
    // console.log(currentMousePos.x + ", " + currentMousePos.y + ", Rect:" + rect.x + ", " + rect.y + ", w/h: ", rect.width * scale + ", " + buttonSize * 6 * scale)
}

function findMouse(e) {
    currentMousePos.x = e.pageX - $('#buttonCanvas').offset().left;
    currentMousePos.y = e.pageY - $('#buttonCanvas').offset().top;
}
document.getElementById('buttonCanvas').addEventListener("mousemove", findMouse)
cursorImg.src = "./cursor.png";
bulletImg.src = "./bullet.png";
dartGunImg.src = "./dartgun.png";