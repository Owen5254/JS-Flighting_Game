const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1500
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)
const gravity = 0.7


const background = new Spirit({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'    
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },   
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    color: 'red'
})

const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },   
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0
    },
    color: 'blue'
})

const key ={
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },

    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}


decreaseTimer()

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // player movement
    if (key.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -5
    } else if (key.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
    }

    // enemy movement
    if (key.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -5
    } else if (key.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
    }

    // 碰狀偵測
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
    ){
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }
    
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking
    ){
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%'
        enemy.isAttacking = false
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerID})
    }
}
animate()

window.addEventListener('keydown', (event)=>{
    console.log(event.key)
    switch(event.key){
        case 'd':
            key.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            key.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            key.w.pressed = true
            player.velocity.y = -20
            break
        
        case ' ':
            player.attack()
            break
    

        case 'ArrowRight':
            key.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            key.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            key.ArrowUp.pressed = true
            enemy.velocity.y = -20
            break

        case 'ArrowDown':
            enemy.attack()
            break
}})

window.addEventListener('keyup', (event)=>{

    switch(event.key){
        case 'd':
            key.d.pressed = false
            player.velocity.x = 0
            break
        case 'a':
            key.a.pressed = false
            player.velocity.x = 0
            break
    }


    // enemy keys
    switch(event.key){    
        case 'ArrowRight':
            key.ArrowRight.pressed = false
            enemy.velocity.x = 0
            break
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false
            enemy.velocity.x = 0
            break
    }
    console.log(event.key)
})