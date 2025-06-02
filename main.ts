/**
 * Fix delay logic
 */
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.x += -16
})
function Level1 () {
    difficulty = 10
    pause(100)
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
}
// fix cursor going off screen
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.x += 16
})
function shop () {
    tiles.setCurrentTilemap(tilemap`level2`)
}
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
let Normal_Zombie: Sprite = null
let difficulty = 0
let cursor: Sprite = null
let money = 100
tiles.setCurrentTilemap(tilemap`level1`)
let pea_shooter = sprites.create(img`
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
    `, SpriteKind.Player)
tiles.placeOnTile(pea_shooter, tiles.getTileLocation(1, 3))
cursor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . f f d . . . . . . 
    . . . . . . . f 1 f d . . . . . 
    . . . . . . . f 1 1 f d . . . . 
    . . . . . . . f 1 1 1 f d . . . 
    . . . . . . . f 1 1 1 1 f d . . 
    . . . . . . . f 1 1 1 1 d f . . 
    . . . . . . . f 1 1 1 f f f . . 
    . . . . . . . f d f 1 1 f d . . 
    . . . . . . . f f f d 1 f . . . 
    . . . . . . . . . d f f d . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(cursor, tiles.getTileLocation(0, 0))
scene.cameraFollowSprite(cursor)
Level1()
game.onUpdate(function () {
    if (controller.A.isPressed() && cursor.tileKindAt(TileDirection.Center, assets.tile`myTile3`)) {
        shop()
    }
})
game.onUpdateInterval(500, function () {
    console.log("shooting")
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
        `, pea_shooter, 50, 0)
})
