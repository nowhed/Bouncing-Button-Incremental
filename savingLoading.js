function save() {
    var save = {
        points: points,
        buttonSpeed: buttonSpeed,
        buttonSize: buttonSize,
        stunDuration: stunDuration,
        stunCooldown: stunCooldown,
        pointsValue: pointsValue,
        upgradesBaught: JSON.stringify(upgradesBaught),
        cursorSpeed: cursorSpeed,
        cursors: JSON.stringify(cursors)
    }
    localStorage.setItem("save", JSON.stringify(save));
    console.log('Saved! ' + JSON.stringify(save))
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame !== null) {
        if (typeof savegame.points !== "undefined") points = savegame.points;
        if (typeof savegame.buttonSpeed !== "undefined") buttonSpeed = savegame.buttonSpeed;
        if (typeof savegame.stunDuration !== "undefined") stunDuration = savegame.stunDuration;
        if (typeof savegame.stunCooldown !== "undefined") stunCooldown = savegame.stunCooldown;
        if (typeof savegame.pointsValue !== "undefined") pointsValue = savegame.pointsValue;
        if (typeof savegame.upgradesBaught !== "undefined") upgradesBaught = JSON.parse(savegame.upgradesBaught);
        if (typeof savegame.cursors !== "undefined") cursors = JSON.parse(savegame.cursors);
        if (typeof savegame.cursorSpeed !== "undefined") cursorSpeed = savegame.cursorSpeed

        document.getElementById("pointsSpan").innerHTML = points;
        document.getElementById('speedCost').innerHTML = Math.floor(Math.pow(1.7, upgradesBaught[0]));
        document.getElementById('sizeCost').innerHTML = Math.floor(Math.pow(3.2113, upgradesBaught[1]));
        document.getElementById('stunTimeCost').innerHTML = Math.floor(Math.pow(1.65, upgradesBaught[2]))
        document.getElementById('stunCooldownCost').innerHTML = Math.floor(Math.pow(1.7, upgradesBaught[3]))
        document.getElementById('valueCost').innerHTML = Math.floor(10 * Math.pow(upgradesBaught[4], 3.8))
        document.getElementById('cursorCost').innerHTML = Math.floor(20 * Math.pow(upgradesBaught[5], 1.2))
        document.getElementById('cursorSpeedCost').innerHTML = Math.floor(12 * Math.pow(upgradesBaught[6], 1.5))
        document.getElementById('stunDuration').innerHTML = (stunDuration / 1000).toFixed(2)
    }
    console.log('Loaded! ' + localStorage.getItem("save"))
}

setTimeout(() => {
    save()
}, 15000); //save every 15s