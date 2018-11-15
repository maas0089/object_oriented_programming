class Game {
    //global attr for canvas
    //readonly attributes must be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; // find the right type
    private readonly ctx: CanvasRenderingContext2D; // find the right type

    //some global player attributes
    private readonly player: string = "Player1";
    private readonly score: number = 400;
    private readonly lives: number = 3;
    private readonly highscores: Array<any>; //TODO: do not use 'any': write an interface!

    public constructor(canvasId: HTMLCanvasElement) {
        //construct all canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ]

        // all screens: uncomment to activate 
        this.start_screen();
        // this.level_screen();
        // this.title_screen();

    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Function to initialize the splash screen
     */
    public start_screen() {
        //1. add 'Asteroids' text
        this.writeAsteroidHeading();
        //2. add 'Press to play' text
        this.writeIntroText();
        //3. add button with 'start' text
        this.writeStartButton();
        //4. add Asteroid image
        this.drawAsteroid();
    }

    public writeAsteroidHeading(){
        this.writeTextToCanvas('Asteroids', 70, this.canvas.width / 2, this.canvas.height / 5);
    }

    public writeIntroText(){
        this.writeTextToCanvas('Press play to start', 30, this.canvas.width / 2, this.canvas.height / 3);
    }

    public writeStartButton(){
        let startButton = new Image();
        startButton.addEventListener('load', () => {
            this.ctx.drawImage(startButton, this.canvas.width / 2 - startButton.width /2, this.canvas.height / 1.3);
            this.writeTextToCanvas('Play', 20, this.canvas.width / 2, this.canvas.height / 1.3 + startButton.height / 2, 'black', undefined, 'middle');
        });
        startButton.addEventListener( 'click', ()=> console.log('test'));
        startButton.src = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
    }

    public drawAsteroid(){
        let startAsteroid = new Image();
        startAsteroid.onload = (() => this.ctx.drawImage(startAsteroid, this.canvas.width / 2 - startAsteroid.width /2, this.canvas.height / 2 - startAsteroid.height / 2));
        startAsteroid.src = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png';
    }



    //-------- level screen methods -------------------------------------
    /**
     * Function to initialize the level screen
     */
    public level_screen() {
        //1. load life images
        this.drawPlayerLives();
        //2. draw current score
        this.drawYourScore();
        //3. draw random asteroids
        this.drawRandomAsteroids();
        //4. draw player spaceship
        this.drawSpaceShip();
    }

    public drawPlayerLives(){
        for (let index = 0; index < this.lives; index++) {
            let lives = new Image();
            lives.addEventListener('load', () => this.ctx.drawImage(lives, (10 + lives.width * index), 10));
            lives.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png'                
        }
    }

    public drawYourScore(){
        this.writeTextToCanvas(`${this.player} - Your Score: ${this.score}`, 20, this.canvas.width * 0.99, this.canvas.height / 15, undefined, 'end');
    }

    public drawRandomAsteroids(){
        for (let index = 0; index < 5; index++) {
            let color : Array<string> = ['Brown', 'Grey'];
            let size : Array<string> = ['big', 'med', 'small', 'tiny'];
            let randomAsteroid = `${color[this.randomNumber(0, color.length - 1)]}_${size[this.randomNumber(0, size.length - 1)]}`;
            let asteroids = new Image();
            asteroids.addEventListener('load', () => this.ctx.drawImage(asteroids, this.randomNumber(0, this.canvas.width * 0.9), this.randomNumber(0, this.canvas.height * 0.9)));
            asteroids.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${randomAsteroid}1.png`;             
        }
    }

    public drawSpaceShip(){
        let ship = new Image();
        ship.addEventListener('load', () => this.ctx.drawImage(ship, this.canvas.width / 2 - ship.width / 2, this.canvas.height / 2 - ship.height /2));
        ship.src = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png'

    }

    //-------- Title screen methods -------------------------------------

    /**
    * Function to initialize the title screen   
    */
    public title_screen() {
        //1. draw your score
        this.writePlayerScore();
        //2. draw all highscores
        this.writeHighScores();
    }

    public writePlayerScore(){
        this.writeTextToCanvas(`Your score is: ${this.score}`, 70, this.canvas.width / 2, this.canvas.height / 5);
    }

    public writeHighScores(){
        this.writeTextToCanvas('Highscores', 40, this.canvas.width / 2, this.canvas.height / 3);
        for (let index = 0; index < this.highscores.length; index++) {
            this.writeTextToCanvas(`${index + 1}. ${this.highscores[index].playerName} - ${this.highscores[index].score}`, 20, this.canvas.width / 2, this.canvas.height / 3 + (50 * (index + 1)), 'white', 'center');
        }
    }

    //-------Generic canvas functions ----------------------------------

    public writeTextToCanvas(textInput: string, size: number, x: number, y: number, style: string = 'white', align: CanvasTextAlign = 'center', baseline: CanvasTextBaseline = 'alphabetic'){
        this.ctx.font = `${size}px Minecraft`;
        this.ctx.fillStyle = style;
        this.ctx.textAlign = align;
        this.ctx.textBaseline = baseline;
        this.ctx.fillText(textInput, x, y);        
    }
    
    public writeImageToCanvas(
        src: string, xCoordinate: number, yCoordinate: number, deltaX: number = 0, deltaY: number = 0, loops: number = 1) {
        let element = document.createElement("img");
        element.src = src;
        for (let i = 0; i < loops; i++) {
            element.addEventListener("load", () => {
                xCoordinate += deltaX;
                yCoordinate += deltaY;
                this.ctx.drawImage(element, xCoordinate, yCoordinate);
            });
        }
    }

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};
//add loadlistener for custom font types
window.addEventListener('load', init);
