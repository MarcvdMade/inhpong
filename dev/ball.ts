/// <reference path="gameobject.ts"/>

class Ball extends GameObject {
    
    // private div : HTMLElementsw
    
    // private x : number
    // private y: number
    
    private speedX: number
    private speedY: number
    
    constructor() {
        super()
        this.div = document.createElement("ball")
        document.body.appendChild(this.div)
        
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = Math.random() * (window.innerHeight - 100)

        this.speedX = 1
        this.speedY = 1
        super.update()
    }

    // public getRectangle(){
    //     return this.div.getBoundingClientRect()
    // }
    
    public hitPaddle(){
        this.speedX *= -1.2
    }

    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        if( this.y + this.getRectangle().height > window.innerHeight || this.y < 0) { 
            this.speedY *= -1
        }

        if (this.x > window.innerWidth) {
            this.div.remove()
        } 

        if (this.x < 0) {
            this.div.remove()
        }
                        
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }
}