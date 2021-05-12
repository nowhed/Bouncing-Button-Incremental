let scale = 0.17; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let speed = 24;
let borderThickness = 6;
var currentMousePos = { x: -1, y: -1 };
var cornerTextOpacity = 0;
var activeMoving = true;
var down = false;
var mouseinbox = false;
var mouseMoving = false;
var cursorImg = new Image();
//x, y, opacity
var plusTexts = []
var rect = {
    x: 0,
    y: 0,
    height: buttonSize * 6,
    xspeed: 120 / buttonSpeed,
    yspeed: 120 / buttonSpeed,
    color: '#383838'
};

(function main() {
    canvas = document.getElementById("buttonCanvas");
    ctx = canvas.getContext("2d");
    //Draw the "tv screen"
    canvas.width = canvasSize.x;
    canvas.height = canvasSize.y;
    canvas.addEventListener('click', function(event) {
        if (mouseinbox) {
            addPoints(pointsValue)
            plusTexts.push([rect.x, rect.y, 1])
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
        //draw text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '24px Sans-serif';
        ctx.fillText("+ " + pointsValue, rect.x + (buttonSize * 8 * scale / 2), rect.y + (buttonSize * 8 * scale / 2))
            //Move the button
            //if you hit a corner, show some text and then fade it out
        ctx.font = '30px Sans-serif';
        ctx.fillStyle = 'rgba(0, 0, 81, ' + cornerTextOpacity + ')'
        if (cornerTextOpacity > 0) { //if the "corner reached" text is not gone, make it slowly
            cornerTextOpacity -= 0.005
            ctx.fillText("Corner frenzy!", 180, 200)
        }
        ctx.font = '20px Sans-serif';
        for (i = 0; i < plusTexts.length; i++) { //for every fading number there is
            plusTexts[i][2] -= 0.02 //make it more transparent
            ctx.fillStyle = 'rgba(0, 0, 0, ' + plusTexts[i][2] + ')' //display transparency
            ctx.fillText(pointsValue, plusTexts[i][0], plusTexts[i][1]) //display
            plusTexts[i][1] += -1 //make it go up
            if (plusTexts[i][2] <= 0) plusTexts.splice(i, 1) //if it's transparent, get rid of it
        }
        if (activeMoving) {
            rect.x += rect.xspeed;
            rect.y += rect.yspeed;
        }
        //Check for collision 
        cursorEvents();
        checkHitBox();
    }, speed)
}


function cursorEvents() {
    for (i = 0; i < cursors.length; i++) { //for the cursors in cursrs
        // calculate distance and diret
        cspeedX = cursorSpeed * cursors[i][3]
        cspeedY = cursorSpeed * cursors[i][4]

        toButtonX = rect.x + buttonSize * 4 * scale - cursors[i][0]
        toButtonY = rect.y + buttonSize * 3 * scale - cursors[i][1]
        toButtonLength = Math.sqrt(toButtonX * toButtonX + toButtonY * toButtonY);
        toButtonX = toButtonX / toButtonLength;
        toButtonY = toButtonY / toButtonLength;
        //set the cursor closer to the button, times cursor speed
        cursors[i][0] += toButtonX * cspeedX
        cursors[i][1] += toButtonY * cspeedY
        ctx.fillStyle = '#000';
        ctx.font = '15px Sans-serif';
        //add a text box above, showing this cursor's speed
        ctx.fillText((cspeedX * cspeedY).toFixed(3), cursors[i][0], cursors[i][1] - 10)
        ctx.drawImage(cursorImg, cursors[i][0], cursors[i][1], 18, 29); //draw the cursor(s)
        if (cursors[i][0] >= rect.x &&
            cursors[i][0] <= rect.x + buttonSize * 8 * scale &&
            cursors[i][1] >= rect.y &&
            cursors[i][1] <= rect.y + buttonSize * 6 * scale) {
            //increase the "cursor click progress" by 1
            if (cursors[i][2] % Math.floor(100 / (cspeedX * cspeedY)) === 0) { //got a click!
                addPoints(pointsValue)
                plusTexts.push([rect.x, rect.y, 1])
                    //give a little bonus to this cursor's speed, as a reward
                cursors[i][3] = Math.pow(cursors[i][3], 1.05)
                cursors[i][4] = Math.pow(cursors[i][4], 1.05)
                    //if a cursor is faster than the button, penalize it.
                if (toButtonX * cursorSpeed * cursors[i][3] >= Math.abs(rect.xspeed)) {
                    cursors[i][3] = Math.pow(cursors[i][3], 0.8)
                }
                if (toButtonY * cursorSpeed * cursors[i][4] >= Math.abs(rect.yspeed)) {
                    cursors[i][4] = Math.pow(cursors[i][4], 0.8)
                }
            }
            cursors[i][2]++
        } else {
            cursors[i][2] = Math.floor(100 / (cspeedX * cspeedY))
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
        didfirst = true
    }

    if (rect.y + buttonSize * 6 * scale >= canvasSize.y || rect.y <= 0) {
        rect.yspeed *= -1;
        if (didfirst) {
            console.log("Hit a corner!")
            cornerTextOpacity = 1;
            ogp = pointsValue
            pointsValue *= 3
            setTimeout(() => {
                pointsValue = ogp
            }, 3000);
        }
    }
}

function checkMouse() {
    //if mouse is within button's borders
    if (currentMousePos.x >= rect.x &&
        currentMousePos.x <= rect.x + buttonSize * 8 * scale &&
        currentMousePos.y >= rect.y &&
        currentMousePos.y <= rect.y + buttonSize * 6 * scale) {
        rect.color = '#b8b8b8'
        mouseinbox = true
            //  console.log('Mouse!')
    } else {
        mouseinbox = false
        rect.color = '#383838';
    }
    // console.log(currentMousePos.x + ", " + currentMousePos.y + ", Rect:" + rect.x + ", " + rect.y + ", w/h: ", rect.width * scale + ", " + buttonSize * 6 * scale)
}

function findMouse(e) {
    currentMousePos.x = e.pageX - $('#buttonCanvas').offset().left;
    currentMousePos.y = e.pageY - $('#buttonCanvas').offset().top;
}
document.getElementById('buttonCanvas').addEventListener("mousemove", findMouse)
cursorImg.src = "./cursor.png";