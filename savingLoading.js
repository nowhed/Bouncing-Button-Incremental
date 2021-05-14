function save() {
    var save = {
        points: points,
        buttonSpeed: buttonSpeed,
        buttonSize: buttonSize,
        stunDuration: stunDuration,
        stunCooldown: stunCooldown,
        pointsValue: pointsValue,
        upgradesBought: JSON.stringify(upgradesBought),
        cursorSpeed: cursorSpeed,
        cursors: JSON.stringify(cursors),
        dartGuns: JSON.stringify(dartGuns),
        gunSettings: JSON.stringify(gunSettings),
        gunMultiplier: gunMultiplier,
        tabsUnlocked: tabsUnlocked
    }
    localStorage.setItem("save", JSON.stringify(save));
    plusTexts.push([canvasSize.x / 2, canvasSize.y / 2, 1, "Game saved!"])
    console.log('Saved!')
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame !== null) {
        if (typeof savegame.points !== "undefined") points = savegame.points;
        if (typeof savegame.buttonSpeed !== "undefined") buttonSpeed = savegame.buttonSpeed;
        if (typeof savegame.stunDuration !== "undefined") stunDuration = savegame.stunDuration;
        if (typeof savegame.stunCooldown !== "undefined") stunCooldown = savegame.stunCooldown;
        if (typeof savegame.pointsValue !== "undefined") pointsValue = savegame.pointsValue;
        if (typeof savegame.upgradesBought !== "undefined") upgradesBought = JSON.parse(savegame.upgradesBought);
        if (typeof savegame.cursors !== "undefined") cursors = JSON.parse(savegame.cursors);
        if (typeof savegame.gunSettings !== "undefined") gunSettings = JSON.parse(savegame.gunSettings);
        if (typeof savegame.cursorSpeed !== "undefined") cursorSpeed = savegame.cursorSpeed
        if (typeof savegame.dartGuns !== "undefined") dartGuns = JSON.parse(savegame.dartGuns)
        if (typeof savegame.gunMultiplier !== "undefined") gunMultiplier = savegame.gunMultiplier
        if (typeof savegame.tabsUnlocked !== "undefined") tabsUnlocked = savegame.tabsUnlocked
        if (typeof savegame.buttonSize !== "undefined") buttonSize = savegame.buttonSize
        if (gunSettings.enhanced) {
            document.getElementById('enhanced').checked = true
        }
        document.getElementById('dist').value = gunSettings.dist
        document.getElementById('enhancedValue').value = gunSettings.enhancedVal
        document.getElementById('speedCost').innerHTML = Math.floor(Math.pow(1.7, upgradesBought[0]));
        document.getElementById('sizeCost').innerHTML = Math.floor(Math.pow(3.2113, upgradesBought[1]));
        document.getElementById('stunTimeCost').innerHTML = Math.floor(Math.pow(1.65, upgradesBought[2]))
        document.getElementById('stunCooldownCost').innerHTML = Math.floor(Math.pow(1.7, upgradesBought[3]))
        document.getElementById('valueCost').innerHTML = Math.floor(10 * Math.pow(upgradesBought[4], 3.8))
        document.getElementById('cursorCost').innerHTML = Math.floor(20 * Math.pow(upgradesBought[5], 1.05))
        document.getElementById('cursorSpeedCost').innerHTML = Math.floor(12 * Math.pow(upgradesBought[6], 1.5))
        document.getElementById('stunDuration').innerHTML = (stunDuration / 1000).toFixed(2)
        document.getElementById('dartGunCost').innerHTML = Math.floor(50 * Math.pow(upgradesBought[7], 1.8))
        document.getElementById('dartReloadCost').innerHTML = Math.floor(40 * Math.pow(upgradesBought[8], 1.8))
        document.getElementById('gunMultiplierCost').innerHTML = Math.floor(50 * Math.pow(upgradesBought[9], 3))
        switch (tabsUnlocked) {
            case 2:
                document.getElementById('dartGun').innerHTML = "Dart Gun"
                document.getElementById('dartGun').disabled = false
            case 1:
                document.getElementById('Cursors').innerHTML = "Cursors"
                document.getElementById('Cursors').disabled = false
        }
        addPoints(0)
    }
    console.log('Loaded!')
}
autoSave()

function autoSave() {
    setTimeout(() => {
        save()
        autoSave()
    }, 20000); //save every 15s
}