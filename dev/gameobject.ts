class GameObject {

    protected div : HTMLElement

    // set x and y
    protected x : number
    protected y: number

    //ball speed
    // protected speedX: number
    // protected speedY: number
    
    constructor() {
        console.log("I am a gameobject")
    }

    public getRectangle(){
        return this.div.getBoundingClientRect()
    }

    public update() : void {
        console.log("loaded game object")
        
    }
    
}