namespace SpriteKind {
    export const life = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.life, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
    info.changeLifeBy(1)
    info.setLife(3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fountain, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
let cake: Sprite = null
let chocolate: Sprite = null
effects.starField.startScreenEffect()
let star = sprites.create(img`
    bbbb........bbbb.................
    c99bb......bb99b.................
    c999bb....bb999c.................
    c9b99bccccb99b9c.................
    c9bb99bccb99bb9c.................
    c93b99999999b39c.................
    c93399999999339c.................
    c99399999999399c.................
    c99999991199999c.................
    c999ff91119ff99c........bbbbbb...
    c999ff91111ff99c.......c999999bb.
    c99991111111999c......c99999999b.
    c9991111fff1199c.....c9991119999b
    c999c11fff1199bc.....c9911111999b
    c999cc111111c9bc.....c911dd11199b
    c99999bb33cc99bcc....cbddbbd1199c
    c999999b33c99999bbccccbbdbbb1199c
    c9999999bb9999999999999999bb1999c
    c999911119999999999999999999b999c
    c999111111999999999999999999999c.
    c99911111119999999999999999999cc.
    c99111111119999999999999999999c..
    c99111111111999999999999999999c..
    cb9111111111999999999999999999c..
    .f9111111111999999999999999999c..
    .ff111111111999999999999999999c..
    ..fb11111111999999999999999999c..
    ...fb1111119999999111111999999c..
    ...fbbb11119999991111111199999c..
    ....fbbfffb9999ccccccccccb9999c..
    ....fbbf..f999c.....fbbf.c9999c..
    ....fbbf..f999c.....fbbf.cc9999c.
    ....fbbf..f99c.......fbf..cc999c.
    ....fbbf..f99c.......fbbf..cc99c.
    ....fbbf..f99c.......fbbf...c99c.
    ....fbbf..f99c......fbbbf...c99c.
    ...fbbbf..f99c......ffff....cb9c.
    ...fbbf..f999c.............c999c.
    ...ffff..f99cc.............c999c.
    .........fffc..............cccc..
    `, SpriteKind.Player)
star.setPosition(80, 100)
controller.moveSprite(star, 100, 0)
star.setStayInScreen(true)
game.onUpdateInterval(5000, function () {
    star = sprites.createProjectileFromSide(assets.image`chocolate`, 0, 50)
    star.x = randint(0, scene.screenWidth())
    star.setKind(SpriteKind.life)
})
game.onUpdateInterval(2000, function () {
    chocolate = sprites.createProjectileFromSide(img`
        . . . . e e e e e e e e . . . . 
        . . . . e e f e e f e e . . . . 
        . . . . e e e e e e e e . . . . 
        . 7 . . e e f e e f e e . . . . 
        . 7 . . e e e e e e e e . . . . 
        . . . . e e f e e f e e . . . . 
        . . . . 2 7 2 7 2 7 2 7 . . . . 
        . . . . 1 2 1 2 1 2 1 2 . . . . 
        . . . . 2 1 2 1 2 1 2 1 . . . . 
        . . . . 7 2 7 2 7 2 7 2 . . . . 
        . . . . 2 1 2 1 2 1 2 1 . . . . 
        . . . . 1 2 1 2 1 2 1 2 . . . . 
        . . . . 2 1 2 1 2 1 2 1 . . . . 
        . . . . 7 2 7 2 7 2 7 2 . . . . 
        . . . . 2 1 2 1 2 1 2 1 . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 50)
    chocolate.x = randint(0, scene.screenWidth())
    chocolate.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(1000, function () {
    cake = sprites.createProjectileFromSide(img`
        ......................bbb.......
        ....................bb333b......
        .................bbb333d33b.....
        ................bb333333d3a.....
        ..............bb33332eeeedba....
        ............bbb333323eee2e3a....
        ..........bbd333333e22222ed3a...
        .......bbbdd3333333e22222edda...
        ......bb3d333333333be222eb3d3a..
        ...bbb3dd33333333333beeeb33d3a..
        ..b3ddd33333333333333333333dda..
        bbddd3333333333333333333333dd3a.
        b33dddddd3333333333333333333d3a.
        bb3333333ddddd33333333333333dda.
        bbbbbbb333dd33dddddddddd3333ddba
        b55553bbbbbb3333dd33333ddd33dd3a
        b555555555553bbbbbbbb33333dddd3a
        bd555555555555555dddbaaaaab3d3ba
        bb55555555555555555dddddddbb33ba
        b3bb35555555555d5555d55dddddbbba
        b33333bbb355dd55555d555ddddddbba
        b5555d333333bbb35dddddd55ddddbba
        b5d555dd5553333bbbbb3ddddddddb3a
        b5d555555555555dd3333bbbbbb3db3a
        bd5d555555d55555dd555ddbbbbbbb3a
        bbb55dd555555555555555ddddddbb3a
        ...bbbbdd555ddd5555ddddddddddb3a
        .......bbbb555555d5ddd5ddddddb3a
        ...........bbbb55555555555dd533a
        ...............bbbbddd5d55d5b3ba
        ...................bbbbddddb3ba.
        .......................bbbaaaa..
        `, 0, 50)
    cake.x = randint(0, scene.screenWidth())
    cake.setKind(SpriteKind.Food)
})
