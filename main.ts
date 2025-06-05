namespace SpriteKind {
    export const plant = SpriteKind.create()
    export const pea_shooter_plant = SpriteKind.create()
    export const moneycounterclass = SpriteKind.create()
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
    sprites.setDataNumber(Normal_Zombie, "Health", 16)
    tiles.placeOnTile(Normal_Zombie, tiles.getTileLocation(10, randint(1, 5)))
    Normal_Zombie.setVelocity(-3, 0)
}
// Fix delay logic
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.y += -16
})
// Placing the plants
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (placingPlant && (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile1`) || cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`))) {
        placingPlant = false
        sprites.setDataBoolean(pea_shooter, "is_placed", false)
    }
    if (placingSunflower && (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile1`) || cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`))) {
        placingSunflower = false
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
    // 
    for (let index = 0; index <= 2; index++) {
        timer.after(90000 + index * 1500, function () {
            for (let index = 0; index <= 1; index++) {
                timer.after(index * 1000, function () {
                    spawn_zombie()
                })
            }
        })
    }
    timer.after(180000, function () {
        game.showLongText("A huge wave of zombies is approaching", DialogLayout.Bottom)
    })
    timer.after(190000, function () {
        for (let index = 0; index <= 7; index++) {
            timer.after(index * 1500, function () {
                spawn_zombie()
            })
        }
    })
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
let projectile: Sprite = null
let Sunflower: Sprite = null
let placingSunflower = false
let pea_shooter: Sprite = null
let placingPlant = false
let Normal_Zombie: Sprite = null
let cursor: Sprite = null
let money = 1000
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
// Makes the plant follow the cursor when the plant is picked up
game.onUpdate(function () {
    // If placing, follow cursor
    if (placingSunflower && Sunflower) {
        Sunflower.setPosition(cursor.x, cursor.y)
    }
    // If placing, follow cursor
    if (placingPlant && pea_shooter) {
        pea_shooter.setPosition(cursor.x, cursor.y)
    }
})
// Pick up a plant
game.onUpdate(function () {
    if (controller.A.isPressed() && cursor.tileKindAt(TileDirection.Center, assets.tile`myTile6`) && (!(placingSunflower) && !(placingPlant))) {
        if (money >= 50 && !(placingSunflower)) {
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
                `, SpriteKind.plant)
            placingSunflower = true
            money += -50
        }
    }
    if (controller.A.isPressed() && cursor.tileKindAt(TileDirection.Center, assets.tile`myTile7`) && (!(placingSunflower) && !(placingPlant))) {
        if (money >= 100 && !(placingPlant)) {
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
            sprites.setDataBoolean(pea_shooter, "is_placed", true)
        }
    }
})
game.onUpdateInterval(1750, function () {
    for (let value of sprites.allOfKind(SpriteKind.pea_shooter_plant)) {
        if (!(sprites.readDataBoolean(value, "is_placed"))) {
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
        }
    }
})
