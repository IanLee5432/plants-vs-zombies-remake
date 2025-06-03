namespace SpriteKind {
    export const plant = SpriteKind.create()
    export const pea_shooter_plant = SpriteKind.create()
}
// Fix delay logic
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.y += -16
})
// Placing the plants
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (placingPlant && (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile1`) || cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`))) {
        placingPlant = false
    }
    if (placingSunflower && (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile1`) || cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`))) {
        placingSunflower = false
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.x += -16
})
function Level1 () {
    difficulty = 10
    pause(100)
    for (let index = 0; index < 4; index++) {
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
        Normal_Zombie.setVelocity(-5, 0)
        timer.after(500, function () {
        	
        })
    }
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
let pea_shooter: Sprite = null
let Sunflower: Sprite = null
let Normal_Zombie: Sprite = null
let difficulty = 0
let placingSunflower = false
let placingPlant = false
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
    }
})
game.onUpdateInterval(500, function () {
    for (let value of sprites.allOfKind(SpriteKind.pea_shooter_plant)) {
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
})
