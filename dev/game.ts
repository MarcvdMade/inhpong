class Game {
    
    private balls: Ball[] = []
    private paddle: Paddle[] = []
    private p1Score : number = -100
    private p2Score : number = -100

    private hit: number = -2

    constructor() {       

        for (var i = 0; i < 1; i++) {
            this.balls.push(new Ball())
        }

        this.paddle.push(new Paddle(20, 87, 83))
        this.paddle.push(new Paddle(window.innerWidth - 50, 38, 40)) 

        this.update()        
    }

    public update(): void {
        for (var b of this.balls) {

            // ball hits paddle 1
            if (this.checkCollision(b.getRectangle(), this.paddle[0].getRectangle())) {
                b.hitPaddle()
                this.p1Score += 100
                this.hit += 1
            }

            //ball hits paddle 2
            if (this.checkCollision(b.getRectangle(), this.paddle[1].getRectangle())) {
                b.hitPaddle()
                this.p2Score += 100
                this.hit += 1
            }

            // ball leaves the screen: gameover!
            if (b.getRectangle().left < 0) {
                console.log("game over")
            }

            b.update()
        }

        for(let i = 0; i < this.paddle.length; i++)
        this.paddle[i].update()

        //get score1 element
        let score1 = document.getElementsByTagName("score1")[0]
        score1.innerHTML = `Score: ${this.p1Score}`

        //get score2 element
        let score2 = document.getElementsByTagName("score2")[0]
        score2.innerHTML = `Score: ${this.p2Score}`

        //add ball if a ball is hit 5 times
        if(this.hit == 5) {
            this.hit = 0
            this.balls.push( new Ball())
        }

        requestAnimationFrame(() => this.update())
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
    
} 


window.addEventListener("load", () => new Game())