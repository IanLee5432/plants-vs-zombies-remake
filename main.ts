namespace SpriteKind {
    export const plant = SpriteKind.create()
    export const pea_shooter_plant = SpriteKind.create()
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
    sprites.setDataNumber(Normal_Zombie, "Health", 3)
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
    timer.after(15000, function () {
        for (let index = 0; index <= 2; index++) {
            timer.after(index * 5000, function () {
                spawn_zombie()
            })
        }
        for (let index = 0; index <= 4; index++) {
            timer.after(30000 + index * 5000, function () {
                spawn_zombie()
            })
        }
    })
}




//--------------------THESE ARE THE FUNCTIONS TO CREATE THE NEW CHARACTER SPRITES AND ENEMY SPRITES!!!!!----------------------//




/*function initializeEnemyCharacters () {
    chickenJockey = sprites.create(img`
        . . . . . . . 3 3 3 3 3 . . . . 
        . . 1 1 1 1 1 7 f 7 f 7 . . . . 
        1 . 1 f 1 1 1 7 7 7 7 7 . . . . 
        . . 1 1 1 1 1 . d d d . . . . . 
        5 5 5 1 1 1 1 7 7 d 7 . . . . . 
        5 5 5 1 1 1 1 . d d 7 . . . . . 
        4 4 4 1 1 1 1 8 d d d 1 1 1 . . 
        . 2 1 1 1 1 1 1 8 8 8 1 1 1 . . 
        . 2 1 1 1 1 1 8 8 8 1 1 1 1 . . 
        . 2 1 1 1 1 1 8 8 8 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . . 5 . . . 5 . . . . . . . 
        . . . . 5 . . . 5 . . . . . . . 
        . . . 5 5 . . 5 5 . . . . . . . 
        `, SpriteKind.Enemy)
    creeperAwwMan = sprites.create(img`
        . . . . . d d d d d . . . . . . 
        . . . . . f f d f f . . . . . . 
        . . . . . d d d d d . . . . . . 
        . . . . . d f f f d . . . . . . 
        . . . . . . . d . . . . . . . . 
        . . . . . . . d . . . . . . . . 
        . . . . d d d d d d d . . 2 2 . 
        . . . . d d . d . d d . 1 . 2 . 
        . . . d . d d d d d . d 1 . 2 . 
        . . . d . d . d . d . d 1 . 2 . 
        . . d . . d d d d d . . 1 . 2 . 
        . . . . . . . d . . . . 1 . 2 . 
        . . . . . . d d d . . . 1 . 2 . 
        . . . . . . d d d . . . . 2 2 . 
        . . . . . . d d d . . . . . . . 
        . . . . . . d d d . . . . . . . 
        `, SpriteKind.Enemy)
    creeperAwwMan = sprites.create(img`
        . . . . 2 6 6 2 e 1 4 e . . . . 
        . . . . 1 f f 2 4 f f 1 . . . . 
        . . . . 6 f 8 2 e 8 f 1 . . . . 
        . . . . 2 2 6 4 2 4 4 4 . . . . 
        . . . . e 2 4 f f 4 2 2 . . . . 
        . . . . 1 2 f 2 4 f 4 4 . . . . 
        . . . . e 4 f 4 4 f e 2 . . . . 
        . . . . . . 2 4 4 4 . . . . . . 
        . . . . . . 4 4 4 1 . . . . . . 
        . . . . . . 1 4 2 4 . . . . . . 
        . . . . . . 4 2 4 4 . . . . . . 
        . . . . . . 4 4 4 1 . . . . . . 
        . . . . . . 4 4 2 e . . . . . . 
        . . . . . 4 1 4 4 2 e . . . . . 
        . . . . . 4 4 2 2 e 1 . . . . . 
        . . . . . d f 4 4 f d . . . . . 
        `, SpriteKind.Enemy)
    spiderSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f b b f f f f f b . 
        . . f f b f b f f f f b b b f . 
        . . b 8 f 8 f b f b f f f f f . 
        . . b f b f b f f f f f f b b . 
        . . f 1 f 1 b f b f f f b b f . 
        . . . . b f f b f f b f b f f . 
        . . . . . f . . f . . f . f . . 
        `, SpriteKind.Enemy)
    mrHerobrine = sprites.create(img`
        . . . . f f f f f f f . . . . . 
        . . . . f f c c c f f . . . . . 
        . . . . f 1 1 c 1 1 f . . . . . 
        . . . . c c c c c c c . . . . . 
        . . . . c c f f f c c . . . . . 
        . . . a a a a a a a a a . . . . 
        . . . a a a a a a a a a . . . . 
        . . . c c a a a a a c c . . . . 
        . . . c c a a a a a c c . . . . 
        . . . c c a a a a a c c . . . . 
        . . . c c a a a a a c c . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . f f f f f . . . . . . 
        `, SpriteKind.Enemy)
}*/
/*function initializePlantCharacters () {

    ironGolem = sprites.create(img`
        . . . . . 1 1 1 1 . . . . . . . 
        . . . . . 8 1 1 8 . . . . . . . 
        . . . . . 1 1 1 1 . . . . . . . 
        . . . . . 1 1 1 1 . . . . . . . 
        . . 1 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 f 1 1 f 1 1 1 1 1 . . . . 
        . . 1 1 1 f 1 1 1 1 f 1 . . . . 
        . . 1 1 1 1 1 1 f 1 1 1 . . . . 
        . . 1 1 1 1 1 1 1 1 1 1 . . . . 
        . . 1 f 1 1 f 1 1 1 1 1 . . . . 
        . . 1 1 1 1 1 1 f 1 f 1 . . . . 
        . . 1 1 1 1 f 1 1 1 1 1 . . . . 
        . . 1 1 f 1 1 1 1 1 1 1 . . . . 
        . . . . . 1 1 . 1 1 . . . . . . 
        . . . . . 1 1 . 1 1 . . . . . . 
        . . . . . 1 1 . 1 1 . . . . . . 
        `, SpriteKind.Player)
    ironGolem = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . 8 f f f f f f f f f f f f 8 . 
        . f d b d d d d 5 d d d d b f . 
        . f 5 d b d d d d d d d b d f . 
        . f 5 d d b d d 5 d d b d d f . 
        . f d d d b b d d d b d 5 d f . 
        . f d d d d b d d b d d d d f . 
        . f 5 d 5 d d f f d d 5 d d f . 
        . f d d d d d f f d d d d d f . 
        . f d d 5 d b d d b d d d 5 f . 
        . f 5 d d b d d d d b d d d f . 
        . f d d b d d 5 d 5 d b d d f . 
        . f d b d d d d d d d d b d f . 
        . f b d d 5 d d d d 5 d d b f . 
        . 8 f f f f f f f f f f f f 8 . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
}*/




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
let money = 100
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
    if (controller.A.isPressed() && cursor.tileKindAt(TileDirection.Center, assets.tile`myTile6`) && !(placingPlant)) {
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
    }
    if (controller.A.isPressed() && cursor.tileKindAt(TileDirection.Center, assets.tile`myTile7`) && !(placingPlant)) {
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
        sprites.setDataBoolean(pea_shooter, "is_placed", true)
    }
})
game.onUpdateInterval(1500, function () {
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
                `, value, 50, 0)
        }
    }
})
