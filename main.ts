namespace SpriteKind {
    export const sunflower = SpriteKind.create()
    export const pea_shooter_plant = SpriteKind.create()
    export const moneycounterclass = SpriteKind.create()
    export const Snow_golem_class = SpriteKind.create()
    export const Emerald_Class = SpriteKind.create()
}
function spawn_zombie () {
    Normal_Zombie = sprites.create(img`
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . 4 4 f 4 4 f 4 4 . . . . 
        . . . 4 e e e f f e e 4 4 . . . 
        . . 4 . . e 2 e e 2 e . . 4 . . 
        . . . . . e e e e e e . . . . . 
        . . . . . e f e f f e . . . . . 
        . . . . . . e f f e f . . . . . 
        . . . . . . . e . . 2 . . . . . 
        . . . e e e e e . . . 2 . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . e e . . . . . . . . 
        . . . . . e e e e . . . . . . . 
        . . . . e e . . e . . . . . . . 
        . . . . e . . . . e e . . . . . 
        . . . . e . . . . . e e . . . . 
        `, SpriteKind.Enemy)
    sprites.setDataNumber(Normal_Zombie, "Health", 11)
    tiles.placeOnTile(Normal_Zombie, tiles.getTileLocation(10, randint(1, 5)))
    sprites.setDataNumber(Normal_Zombie, "Speed", -2.5)
}
// Fix delay logic
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.y += -16
})
// Placing the plants
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Emerald_Class)) {
        if (cursor.overlapsWith(value)) {
            sprites.destroy(value)
            money += 25
        }
    }
    if (placingPlant && (current_plant == "pea shooter" && (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile1`) || cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`)))) {
        placingPlant = false
        sprites.setDataBoolean(pea_shooter, "is_placed", true)
        current_plant = ""
    }
    if (placingPlant && (current_plant == "sunflower" && (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile1`) || cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`)))) {
        placingPlant = false
        current_plant = ""
    }
    if (placingPlant && (current_plant == "snow golem" && (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile1`) || cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`)))) {
        placingPlant = false
        current_plant = ""
        sprites.setDataBoolean(Snow_Golem, "is_placed", true)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.x += -16
})
function Level1 () {
    // early wave
    for (let index = 0; index <= 4; index++) {
        timer.after(index * 10000 + 30000, function () {
            spawn_zombie()
        })
    }
    // middle waves
    for (let index2 = 0; index2 <= 2; index2++) {
        timer.after(90000 + index2 * 1500, function () {
        	
        })
    }
    timer.after(180000, function () {
        game.showLongText("A huge wave of zombies is approaching", DialogLayout.Bottom)
    })
    timer.after(190000, function () {
        for (let index4 = 0; index4 <= 7; index4++) {
            timer.after(index4 * 1500, function () {
                spawn_zombie()
            })
        }
    })
}
function level2 () {
    tiles.setTileAt(tiles.getTileLocation(3, 0), assets.tile`myTile8`)
}
// fix cursor going off screen
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.x += 16
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.y += 16
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    sprites.destroy(sprite)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        sprites.destroy(otherSprite)
    }
})
let emerald: Sprite = null
let snowball: Sprite = null
let projectile: Sprite = null
let Sunflower: Sprite = null
let Snow_Golem: Sprite = null
let pea_shooter: Sprite = null
let current_plant = ""
let placingPlant = false
let Normal_Zombie: Sprite = null
let cursor: Sprite = null
let money = 25
tiles.setCurrentTilemap(tilemap`level1`)
cursor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . f f d . . . . . . . 
    . . . . . . f 1 f d . . . . . . 
    . . . . . . f 1 1 f d . . . . . 
    . . . . . . f 1 1 1 f d . . . . 
    . . . . . . f 1 1 1 1 f d . . . 
    . . . . . . f 1 1 1 1 d f . . . 
    . . . . . . f 1 1 1 f f f . . . 
    . . . . . . f d f 1 1 f d . . . 
    . . . . . . f f f d 1 f . . . . 
    . . . . . . . . d f f d . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(cursor, tiles.getTileLocation(0, 0))
Level1()
scene.cameraFollowSprite(cursor)
let money_counter = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.moneycounterclass)
tiles.placeOnTile(money_counter, tiles.getTileLocation(8, 1))
game.onUpdate(function () {
    money_counter.sayText(money, 500, false)
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.setVelocity(sprites.readDataNumber(value, "Speed"), 0)
    }
})
// Makes the plant follow the cursor when the plant is picked up
game.onUpdate(function () {
    // If placing, follow cursor
    if (placingPlant) {
        // If placing, follow cursor
        if (current_plant == "pea shooter") {
            pea_shooter.setPosition(cursor.x, cursor.y)
        }
        // If placing, follow cursor
        if (current_plant == "sunflower") {
            Sunflower.setPosition(cursor.x, cursor.y)
        }
        // If placing, follow cursor
        if (current_plant == "snow golem") {
            Snow_Golem.setPosition(cursor.x, cursor.y)
        }
    }
})
// Pick up a plant
game.onUpdate(function () {
    if (controller.A.isPressed() && !(placingPlant)) {
        if (!(placingPlant)) {
            if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile6`) && money >= 50) {
                Sunflower = sprites.create(img`
                    . . . . 5 5 5 5 5 . . . . . . . 
                    . . . . 5 5 5 5 5 5 5 . . . . . 
                    . . 5 5 5 5 5 5 5 5 5 5 5 . . . 
                    . 5 5 5 5 5 5 f 5 5 5 5 5 5 . . 
                    . 5 5 5 5 5 f f f 5 5 5 . 5 . . 
                    . . 5 5 5 5 5 f f 5 5 5 5 . . . 
                    . . 5 5 5 5 5 5 5 5 5 5 5 . . . 
                    . . 5 5 5 5 5 5 5 5 5 5 . . . . 
                    . . . . 5 5 5 5 5 5 5 5 . . . . 
                    . . . . . 5 5 5 5 5 5 . . . . . 
                    . . . . . . 5 5 5 5 . . . . . . 
                    . . . . . . . . 3 . . . . . . . 
                    . . . . . . . . 3 . . . . . . . 
                    . . . . . . . . 3 . . . . . . . 
                    . . . . . . . . 3 . . . . . . . 
                    . . . . . . . . 3 . . . . . . . 
                    `, SpriteKind.sunflower)
                placingPlant = true
                money += -50
                current_plant = "sunflower"
                sprites.setDataNumber(Sunflower, "next_generation_time", game.runtime() + randint(5000, 8000))
            }
            if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile7`) && money >= 100) {
                pea_shooter = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . 4 4 4 4 4 . . . . . . 
                    . . . . . 4 4 4 4 4 . . . . . . 
                    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
                    . . . 4 4 4 4 4 4 4 . . . . . . 
                    . . . 4 4 4 4 4 4 4 . . . . . . 
                    . . . 4 4 4 4 4 4 4 4 4 4 . . . 
                    . . . . 4 4 4 4 4 4 4 . . . . . 
                    . . . . 4 4 4 4 4 4 . . . . . . 
                    . . . . 4 4 4 4 4 4 . . . . . . 
                    . . . . 4 4 4 4 4 4 . . . . . . 
                    . . . . 4 4 4 4 4 . . . . . . . 
                    . . . . 4 4 4 4 . . . . . . . . 
                    . . . . 4 4 4 . . . . . . . . . 
                    . . . . 4 4 4 . . . . . . . . . 
                    . . . . . 4 4 . . . . . . . . . 
                    `, SpriteKind.pea_shooter_plant)
                placingPlant = true
                money += -100
                sprites.setDataBoolean(pea_shooter, "is_placed", false)
                sprites.setDataNumber(pea_shooter, "next_shoot_time", game.runtime() + randint(1700, 2000))
                current_plant = "pea shooter"
            }
            if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile8`) && money >= 175) {
                Snow_Golem = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                    `, SpriteKind.Snow_golem_class)
                placingPlant = true
                money += -175
                sprites.setDataBoolean(Snow_Golem, "is_placed", false)
                sprites.setDataNumber(Snow_Golem, "next_shoot_time", game.runtime() + randint(1700, 2000))
                current_plant = "snow golem"
            }
        }
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.pea_shooter_plant)) {
        if (sprites.readDataBoolean(value, "is_placed")) {
            if (sprites.readDataNumber(value, "next_shoot_time") <= game.runtime()) {
                projectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . a a a a a . a . . . 
                    . . . . . . a a . a a a a . . . 
                    . . . . . a a a a a a a a . . . 
                    . . . . . a a a a a a a a . . . 
                    . . . . a a a a a a a . a . . . 
                    . . . . a a a a a a a . a . . . 
                    . . . . a a a a a a a a . . . . 
                    . . . . . a a a a a a . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, value, 75, 0)
                sprites.setDataNumber(value, "next_shoot_time", game.runtime() + randint(1700, 2000))
            }
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.Snow_golem_class)) {
        if (sprites.readDataBoolean(value, "is_placed")) {
            if (sprites.readDataNumber(value, "next_shoot_time") <= game.runtime()) {
                snowball = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 1 1 1 1 1 . 1 . . . 
                    . . . . . . 1 1 . 1 1 1 1 . . . 
                    . . . . . 1 1 1 1 1 1 1 1 . . . 
                    . . . . . 1 1 1 1 1 1 1 1 . . . 
                    . . . . 1 1 1 1 1 1 1 . 1 . . . 
                    . . . . 1 1 1 1 1 1 1 . 1 . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    . . . . . 1 1 1 1 1 1 . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, value, 75, 0)
                sprites.setDataNumber(value, "next_shoot_time", game.runtime() + randint(1700, 2000))
            }
        }
    }
    for (let value of sprites.allOfKind(SpriteKind.sunflower)) {
        if (sprites.readDataNumber(value, "next_generation_time") <= game.runtime()) {
            emerald = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 7 7 7 7 . . . . . . 
                . . . . . 7 1 e 7 7 3 . . . . . 
                . . . . 7 1 e e e 7 7 3 . . . . 
                . . . 7 1 e e e e e e 7 3 . . . 
                . . . 7 e e e 1 e e e 7 3 . . . 
                . . . 7 e e e 1 e e e 7 3 . . . 
                . . . 7 e e e 1 e e e 7 3 . . . 
                . . . 7 e e e 1 e e 7 7 3 . . . 
                . . . 7 e e 1 e e 7 7 7 3 . . . 
                . . . . 7 e e e 7 7 7 3 . . . . 
                . . . . . 7 e e 3 3 3 . . . . . 
                . . . . . . 7 3 3 3 . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Emerald_Class)
            emerald.setPosition(value.x, value.y)
            emerald.setVelocity(0, 0)
            sprites.setDataNumber(value, "next_generation_time", game.runtime() + randint(20000, 25000))
        }
    }
})
game.onUpdateInterval(randint(8000, 12000), function () {
    emerald = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 7 7 7 7 . . . . . . 
        . . . . . 7 1 e 7 7 3 . . . . . 
        . . . . 7 1 e e e 7 7 3 . . . . 
        . . . 7 1 e e e e e e 7 3 . . . 
        . . . 7 e e e 1 e e e 7 3 . . . 
        . . . 7 e e e 1 e e e 7 3 . . . 
        . . . 7 e e e 1 e e e 7 3 . . . 
        . . . 7 e e e 1 e e 7 7 3 . . . 
        . . . 7 e e 1 e e 7 7 7 3 . . . 
        . . . . 7 e e e 7 7 7 3 . . . . 
        . . . . . 7 e e 3 3 3 . . . . . 
        . . . . . . 7 3 3 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Emerald_Class)
    tiles.placeOnTile(emerald, tiles.getTileLocation(randint(1, 9), 0))
    emerald.setVelocity(0, 10)
})
