function save() {
    var save = {
        points: points,
        buttonSpeed: buttonSpeed,
        stunDuration: stunDuration,
        stunCooldown: stunCooldown,
        pointsValue: pointsValue,
        upgradesBaught: JSON.stringify(upgradesBaught)
    }
    localStorage.setItem("save", JSON.stringify(save));
    console.log('Saved! ' + save)
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.points !== "undefined") points = savegame.points;
    if (typeof savegame.buttonSpeed !== "undefined") buttonSpeed = savegame.buttonSpeed;
    if (typeof savegame.stunDuration !== "undefined") stunDuration = savegame.stunDuration;
    if (typeof savegame.stunCooldown !== "undefined") stunCooldown = savegame.stunCooldown;
    if (typeof savegame.pointsValue !== "undefined") pointsValue = savegame.pointsValue;
    if (typeof savegame.upgradesBaught !== "undefined") upgradesBaught = JSON.parse(savegame.upgradesBaught);

    document.getElementById("pointsSpan").innerHTML = points;
    document.getElementById('speedCost').innerHTML = Math.floor(Math.pow(1.7, upgradesBaught[0]));
    document.getElementById('sizeCost').innerHTML = Math.floor(Math.pow(3.2113, upgradesBaught[1]));
    document.getElementById('stunTimeCost').innerHTML = Math.floor(Math.pow(1.65, upgradesBaught[2]))
    document.getElementById('stunCooldownCost').innerHTML = Math.floor(Math.pow(1.7, upgradesBaught[3]))
    document.getElementById('valueCost').innerHTML = Math.floor(10 * Math.pow(upgradesBaught[4], 1.4))
    document.getElementById('movingButton').style.width = Math.pow(30, 1 + 0.06 * upgradesBaught[1]) + "px"
    document.getElementById('movingButton').style.height = Math.pow(30, 1 + 0.06 * upgradesBaught[1]) + "px"
    console.log('Loaded! ' + savegame)
}