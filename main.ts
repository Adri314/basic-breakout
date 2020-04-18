function setUpBlocks () {
    for (let index = 0; index <= 4; index++) {
        blockY = 8 * index + 18
        for (let index = 0; index <= 9; index++) {
            block = sprites.create(img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 e 
e e e e e e e e e e e e e e e e 
`, SpriteKind.Enemy)
            blockX = 16 * index + 8
            block.setPosition(blockX, blockY)
        }
    }
}
function setUpBall () {
    ball = sprites.createProjectileFromSide(img`
. 1 1 1 . 
1 1 1 1 1 
1 1 1 1 1 
1 1 1 1 1 
. 1 1 1 . 
`, 50, 100)
    ball.setPosition(60, 70)
    ball.setFlag(SpriteFlag.BounceOnWall, true)
}
function setUpPlayer () {
    paddle = sprites.create(img`
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
`, SpriteKind.Player)
    paddle.setPosition(80, 110)
    controller.moveSprite(paddle, 100, 0)
    paddle.setFlag(SpriteFlag.StayInScreen, true)
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.vy = -1 * otherSprite.vy
    sprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.vy = -1 * otherSprite.vy
})
let paddle: Sprite = null
let ball: Sprite = null
let blockX = 0
let block: Sprite = null
let blockY = 0
setUpPlayer()
setUpBall()
setUpBlocks()
info.setScore(0)
info.setLife(3)
game.onUpdate(function () {
    if (ball.top > paddle.bottom) {
        info.changeLifeBy(-1)
        paddle.destroy()
        ball.destroy()
        pause(100)
        setUpPlayer()
        setUpBall()
    }
})
