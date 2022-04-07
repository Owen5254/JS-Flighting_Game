const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

class Spirit{
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastkey
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y  >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity
    }
}

const player = new Spirit({
    position: {
        x: 0,
        y: 0
    },   
    velocity: {
        x: 0,
        y: 0
    }
})



const enemy = new Spirit({
    position: {
        x: 400,
        y: 100
    },   
    velocity: {
        x: 0,
        y: 0
    }
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


function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()
    console.log('running')

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