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
    console.log('Saved!')
}

function load() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    console.log(savegame)
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
        for (i = 0; i < upgradesBought.length; i++) {
            // a bit complex, but automates any new items I add to the shop. Explanation below
            document.getElementById(Object.keys(shopPrices)[i] + "Cost").innerHTML = Math.floor(Object.values(shopSV)[i] * Math.pow(Object.values(shopPrices)[i], upgradesBought[i]))
                /* First, the price element is found by finding the name of the current "i" plus the word "Cost"
                    Object.keys(shopPrices)[i] + "Cost"
                    Next, the price is calculated by finding the base value
                    Object.values(shopSV)[i]
                    multiplied by the current price increase
                    Math.pow(Object.values(shopPrices)[i], upgradesBought[i])
                    which is the price increase value to the power of the current amount bought.
                */
        }

        switch (tabsUnlocked) {
            case 2:
                document.getElementById('dartGun').innerHTML = "Dart Gun"
                document.getElementById('dartGun').disabled = false
            case 1:
                document.getElementById('Cursors').innerHTML = "Cursors"
                document.getElementById('Cursors').disabled = false
        }
        addPoints(0)
        d = new Date();
        logText.push('Loaded at ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds())
    } else {
        logText.push('No save file found.')
        logText.push('Tutorial.exe initiated.')
        logText.push('25% loaded')
        logText.push('58% loaded')
        logText.push('99% loaded')
        logText.push('99.9% loaded')
        logText.push('99.99% loaded')
        logText.push('99.999% loaded')
        logText.push('99.9999% loaded')
        logText.push('Bouncing Button Tutorial:')
        logText.push('Click the button to get points.')
        logText.push("If it's too diffcult, press 's' to stun it.")
        logText.push('Upgrade using the shop below, spending your points.')
        logText.push('Eventually you will unlock ways of automating point gain.')
        logText.push('After a certain amount of points, you can reset all your progress for a boost.')
        logText.push('Good luck, and have fun!')
    }
}