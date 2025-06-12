namespace SpriteKind {
    export const sunflower = SpriteKind.create()
    export const pea_shooter_plant = SpriteKind.create()
    export const moneycounterclass = SpriteKind.create()
    export const Snow_golem_class = SpriteKind.create()
    export const Emerald_Class = SpriteKind.create()
    export const snowball_class = SpriteKind.create()
    export const skeleton_class = SpriteKind.create()
    export const skeleton_arrow = SpriteKind.create()
}
/**
 * Movement of Cursor
 */
/**
 * Makes an array of all of the zombies
 */
// Makes an Array of all of the plants
function Create_Plant_Array () {
    all_plants = []
    for (let value of sprites.allOfKind(SpriteKind.sunflower)) {
        all_plants.push(value)
    }
    for (let value2 of sprites.allOfKind(SpriteKind.pea_shooter_plant)) {
        all_plants.push(value2)
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Snow_golem_class)) {
        all_plants.push(value3)
    }
    return all_plants
}
function Spawn_skeleton () {
    skeleton = sprites.create(img`
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
        `, SpriteKind.skeleton_class)
    sprites.setDataNumber(skeleton, "Health", 6)
    tiles.placeOnTile(skeleton, tiles.getTileLocation(10, randint(1, 5)))
    sprites.setDataNumber(skeleton, "Speed", -3)
}
// Fix delay logic
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.y += -16
})
function spawn_chicken_jockey () {
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
    sprites.setDataNumber(chickenJockey, "Health", 5)
    tiles.placeOnTile(chickenJockey, tiles.getTileLocation(10, randint(1, 5)))
    sprites.setDataNumber(chickenJockey, "Speed", -6)
}
// Placing the plants
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value22 of sprites.allOfKind(SpriteKind.Emerald_Class)) {
        if (cursor.overlapsWith(value22)) {
            sprites.destroy(value22)
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
function initializePlantCharacters () {
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
    dispenser = sprites.create(img`
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
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.x += -16
})
sprites.onOverlap(SpriteKind.snowball_class, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    sprites.destroy(sprite)
    sprites.setDataNumber(otherSprite, "Speed", -1)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        sprites.destroy(otherSprite)
    }
})
function Level1 () {
    timer.after(25000, function () {
        spawn_zombie2()
    })
    timer.after(56000, function () {
        spawn_zombie2()
    })
    timer.after(72000, function () {
        spawn_zombie2()
    })
    timer.after(96000, function () {
        spawn_chicken_jockey()
    })
    timer.after(120000, function () {
        spawn_chicken_jockey()
        spawn_zombie2()
    })
    timer.after(152000, function () {
        spawn_chicken_jockey()
        spawn_chicken_jockey()
    })
    timer.after(167000, function () {
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
    })
    timer.after(180000, function () {
        spawn_chicken_jockey()
    })
    timer.after(181000, function () {
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
    })
    timer.after(200000, function () {
        if (Create_Zombie_Array().length == 0) {
            level2()
        }
    })
}
function level2 () {
    tiles.setTileAt(tiles.getTileLocation(3, 0), assets.tile`myTile8`)
    game.splash("Level 2!")
    timer.after(25000, function () {
        spawn_zombie2()
    })
    timer.after(56000, function () {
        spawn_zombie2()
    })
    timer.after(72000, function () {
        Spawn_skeleton()
    })
    timer.after(96000, function () {
        spawn_chicken_jockey()
        spawn_chicken_jockey()
    })
    timer.after(120000, function () {
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
    })
    timer.after(122000, function () {
        spawn_chicken_jockey()
        Spawn_skeleton()
        Spawn_skeleton()
    })
    timer.after(167000, function () {
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
    })
    timer.after(170000, function () {
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
        spawn_zombie2()
    })
    timer.after(171000, function () {
        spawn_chicken_jockey()
        spawn_chicken_jockey()
        spawn_chicken_jockey()
        spawn_chicken_jockey()
        spawn_chicken_jockey()
        spawn_chicken_jockey()
        spawn_chicken_jockey()
    })
    timer.after(172000, function () {
        Spawn_skeleton()
        Spawn_skeleton()
        Spawn_skeleton()
        Spawn_skeleton()
        Spawn_skeleton()
        Spawn_skeleton()
    })
    timer.after(200000, function () {
        if (Create_Zombie_Array().length == 0) {
            game.gameOver(true)
        }
    })
}
function EnemyCharacterInitialize () {
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
    spider = sprites.create(img`
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
}
sprites.onOverlap(SpriteKind.snowball_class, SpriteKind.skeleton_class, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    sprites.destroy(sprite)
    sprites.setDataNumber(otherSprite, "Speed", -1)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        sprites.destroy(otherSprite)
    }
})
// fix cursor going off screen
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.x += 16
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursor.y += 16
})
function spawn_zombie2 () {
    Normal_Zombie = sprites.create(img`
        . . . . 7 7 7 7 7 7 7 . . . . . 
        . . . . 7 7 e e e 7 7 . . . . . 
        . . . . 7 f f e f f 7 . . . . . 
        . . . . e e e e e e e . . . . . 
        . . . . e e f f f e e . . . . . 
        . . . a a a a a a a a a . . . . 
        . . . a a a a a a a a a . . . . 
        . . . e e a a a a a e e . . . . 
        . . . e e a a a a a e e . . . . 
        . . . e e a a a a a e e . . . . 
        . . . e e a a a a a e e . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . 9 9 9 9 9 . . . . . . 
        . . . . . f f f f f . . . . . . 
        `, SpriteKind.Enemy)
    sprites.setDataNumber(Normal_Zombie, "Health", 11)
    tiles.placeOnTile(Normal_Zombie, tiles.getTileLocation(10, randint(1, 5)))
    sprites.setDataNumber(Normal_Zombie, "Speed", -2.5)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.skeleton_class, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    sprites.destroy(sprite)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        sprites.destroy(otherSprite)
    }
})
function Create_Zombie_Array () {
    all_zombies = []
    for (let value4 of sprites.allOfKind(SpriteKind.Enemy)) {
        all_zombies.push(value4)
    }
    for (let value4 of sprites.allOfKind(SpriteKind.skeleton_class)) {
        all_zombies.push(value4)
    }
    return all_zombies
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    sprites.destroy(sprite)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        if (otherSprite == chickenJockey) {
            Normal_Zombie = sprites.create(img`
                . . . . 7 7 7 7 7 7 7 . . . . . 
                . . . . 7 7 e e e 7 7 . . . . . 
                . . . . 7 f f e f f 7 . . . . . 
                . . . . e e e e e e e . . . . . 
                . . . . e e f f f e e . . . . . 
                . . . a a a a a a a a a . . . . 
                . . . a a a a a a a a a . . . . 
                . . . e e a a a a a e e . . . . 
                . . . e e a a a a a e e . . . . 
                . . . e e a a a a a e e . . . . 
                . . . e e a a a a a e e . . . . 
                . . . . . 9 9 9 9 9 . . . . . . 
                . . . . . 9 9 9 9 9 . . . . . . 
                . . . . . 9 9 9 9 9 . . . . . . 
                . . . . . 9 9 9 9 9 . . . . . . 
                . . . . . f f f f f . . . . . . 
                `, SpriteKind.Enemy)
            sprites.setDataNumber(Normal_Zombie, "Health", 11)
            tiles.placeOnTile(Normal_Zombie, otherSprite.tilemapLocation())
            sprites.setDataNumber(Normal_Zombie, "Speed", -2.5)
        }
        sprites.destroy(otherSprite)
    }
})
let skeletonArrow: Sprite = null
let emerald: Sprite = null
let snowball: Sprite = null
let projectile: Sprite = null
let Sunflower: Sprite = null
let all_zombies: Sprite[] = []
let Normal_Zombie: Sprite = null
let mrHerobrine: Sprite = null
let spider: Sprite = null
let creeperAwwMan: Sprite = null
let dispenser: Sprite = null
let ironGolem: Sprite = null
let Snow_Golem: Sprite = null
let pea_shooter: Sprite = null
let current_plant = ""
let placingPlant = false
let chickenJockey: Sprite = null
let skeleton: Sprite = null
let all_plants: Sprite[] = []
let cursor: Sprite = null
let money = 50
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
// Pick up a plant
game.onUpdate(function () {
    if (controller.A.isPressed() && !(placingPlant)) {
        if (!(placingPlant)) {
            if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile6`) && money >= 50) {
                Sunflower = sprites.create(img`
                    . . . . 4 4 4 4 4 4 4 . . . . . 
                    . . . . 4 4 4 4 4 4 4 . . . . . 
                    . . . . 4 a a 4 a a 4 . . . . . 
                    . . . . 4 4 4 4 4 4 4 . . . . . 
                    . . . . 4 4 5 5 5 4 4 . . . . . 
                    . . . b b b 5 5 5 b b b . . . . 
                    . . . b b b 5 5 5 b b b . . . . 
                    . . . 4 4 b b b b b 4 4 . . . . 
                    . . . 4 4 4 4 4 4 4 4 4 . . . . 
                    . . . 4 4 4 4 4 4 4 4 4 . . . . 
                    . . . . . b b b b b . . . . . . 
                    . . . . . b b b b b . . . . . . 
                    . . . . . b b b b b . . . . . . 
                    . . . . . b b b b b . . . . . . 
                    . . . . . b b b b b . . . . . . 
                    . . . . . f f f f f . . . . . . 
                    `, SpriteKind.sunflower)
                placingPlant = true
                money += -50
                current_plant = "sunflower"
                sprites.setDataNumber(Sunflower, "next_generation_time", game.runtime() + randint(5000, 8000))
                sprites.setDataNumber(Sunflower, "Health", 10)
            }
            if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile7`) && money >= 100) {
                pea_shooter = sprites.create(img`
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
                    `, SpriteKind.pea_shooter_plant)
                placingPlant = true
                money += -100
                sprites.setDataBoolean(pea_shooter, "is_placed", false)
                sprites.setDataNumber(pea_shooter, "next_shoot_time", game.runtime() + randint(1700, 2000))
                sprites.setDataNumber(pea_shooter, "Health", 10)
                current_plant = "pea shooter"
            }
            if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile8`) && money >= 175) {
                Snow_Golem = sprites.create(img`
                    . . . . 4 4 4 4 4 4 4 4 . . . . 
                    . . . . 4 4 f 4 4 f 4 4 . . . . 
                    . . . . 4 4 4 4 4 4 4 4 . . . . 
                    . . . . 4 f 4 f 4 f 4 f . . . . 
                    . . . . 4 4 f 4 f 4 f 4 . . . . 
                    f . . . . 1 1 1 1 1 1 . . . . f 
                    . f . . . 1 1 1 1 1 1 . . . f . 
                    . . f f f 1 1 1 f 1 1 f f f . . 
                    . f . . . 1 1 1 1 1 1 . . . f . 
                    f . . . . 1 1 1 1 1 1 . . . . f 
                    . . . . 1 1 1 1 f 1 1 1 . . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    . . . . 1 1 1 1 f 1 1 1 . . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    . . . . 1 1 1 1 1 1 1 1 . . . . 
                    `, SpriteKind.Snow_golem_class)
                placingPlant = true
                money += -175
                sprites.setDataBoolean(Snow_Golem, "is_placed", false)
                sprites.setDataNumber(Snow_Golem, "next_shoot_time", game.runtime() + randint(1700, 2000))
                sprites.setDataNumber(Snow_Golem, "Health", 10)
                current_plant = "snow golem"
            }
        }
    }
})
game.onUpdate(function () {
    money_counter.sayText(money, 500, false)
})
game.onUpdate(function () {
	
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
game.onUpdate(function () {
    for (let value222 of sprites.allOfKind(SpriteKind.Enemy)) {
        value222.setVelocity(sprites.readDataNumber(value222, "Speed"), 0)
    }
    for (let value222 of sprites.allOfKind(SpriteKind.skeleton_class)) {
        if (value222.x >= 140) {
            value222.setVelocity(sprites.readDataNumber(value222, "Speed"), 0)
        }
    }
})
// Checks if player loses
game.onUpdate(function () {
    for (let value5 of Create_Zombie_Array()) {
        if (value5.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
            game.gameOver(false)
        }
    }
})
// Makes the plants shoot stuff and the sunflowers generate emeralds
game.onUpdate(function () {
    for (let value32 of sprites.allOfKind(SpriteKind.pea_shooter_plant)) {
        if (sprites.readDataBoolean(value32, "is_placed")) {
            if (sprites.readDataNumber(value32, "next_shoot_time") <= game.runtime()) {
                projectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . d d . . . . . . . . . . . . . 
                    . 1 1 d . . . . . . . . f . . . 
                    . . 1 1 d . . . . . . . . f . . 
                    . . . 1 1 . . . . . . . . . f . 
                    . . 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
                    . . . 1 1 . . . . . . . . . f . 
                    . . 1 1 d . . . . . . . . f . . 
                    . 1 1 d . . . . . . . . f . . . 
                    . d d . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, value32, 75, 0)
                sprites.setDataNumber(value32, "next_shoot_time", game.runtime() + randint(1700, 2000))
            }
        }
    }
    for (let value42 of sprites.allOfKind(SpriteKind.Snow_golem_class)) {
        if (sprites.readDataBoolean(value42, "is_placed")) {
            if (sprites.readDataNumber(value42, "next_shoot_time") <= game.runtime()) {
                snowball = sprites.create(img`
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
                    `, SpriteKind.snowball_class)
                snowball.setPosition(value42.x, value42.y)
                snowball.setVelocity(75, 0)
                sprites.setDataNumber(value42, "next_shoot_time", game.runtime() + randint(1700, 2000))
            }
        }
    }
    for (let value52 of sprites.allOfKind(SpriteKind.sunflower)) {
        if (sprites.readDataNumber(value52, "next_generation_time") <= game.runtime()) {
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
            emerald.setPosition(value52.x, value52.y)
            emerald.setVelocity(0, 0)
            emerald.setStayInScreen(false)
            sprites.setDataNumber(value52, "next_generation_time", game.runtime() + randint(25000, 30000))
        }
    }
})
// Makes the zombies able to eat the plants
game.onUpdate(function () {
    for (let value6 of Create_Zombie_Array()) {
        for (let val of Create_Plant_Array()) {
            if (value6.overlapsWith(val)) {
                sprites.changeDataNumberBy(val, "Health", -1)
                value6.x += sprites.readDataNumber(value6, "Speed") * -1
            }
            if (sprites.readDataNumber(val, "Health") <= 0) {
                sprites.destroy(val)
            }
        }
    }
    for (let value6 of sprites.allOfKind(SpriteKind.skeleton_arrow)) {
        for (let val of Create_Plant_Array()) {
            if (value6.overlapsWith(val)) {
                sprites.changeDataNumberBy(val, "Health", -1)
                sprites.destroy(value6)
            }
            if (sprites.readDataNumber(val, "Health") <= 0) {
                sprites.destroy(val)
            }
        }
    }
})
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.skeleton_class)) {
        if (value.x < 130) {
            skeletonArrow = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . d d . 
                . . . f . . . . . . . . d 1 1 . 
                . . f . . . . . . . . d 1 1 . . 
                . f . . . . . . . . . 1 1 . . . 
                f 4 4 4 4 4 4 4 4 4 4 4 4 4 . . 
                . f . . . . . . . . . 1 1 . . . 
                . . f . . . . . . . . d 1 1 . . 
                . . . f . . . . . . . . d 1 1 . 
                . . . . . . . . . . . . . d d . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.skeleton_arrow)
            skeletonArrow.setPosition(value.x, value.y)
            skeletonArrow.setVelocity(-50, 0)
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
