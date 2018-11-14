class Game {
    constructor(canvasId) {
        this.player = "Player1";
        this.score = 400;
        this.lives = 3;
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
        ];
        this.level_screen();
    }
    start_screen() {
        this.writeAsteroidHeading();
        this.writeIntroText();
        this.writeStartButton();
        this.drawAsteroid();
    }
    writeAsteroidHeading() {
        this.writeText(70, 'white', 'center', 'Asteroids', this.canvas.width / 2, this.canvas.height / 5);
    }
    writeIntroText() {
        this.writeText(30, 'white', 'center', 'Press play to start', this.canvas.width / 2, this.canvas.height / 3);
    }
    writeStartButton() {
        let startButton = new Image();
        startButton.addEventListener('load', () => {
            this.ctx.drawImage(startButton, this.canvas.width / 2 - startButton.width / 2, this.canvas.height / 1.3);
            this.writeText(30, 'black', 'center', 'Play', this.canvas.width / 2, this.canvas.height / 1.3 + startButton.height / 1.3);
        });
        startButton.addEventListener('click', () => console.log('test'));
        startButton.src = './assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png';
    }
    drawAsteroid() {
        let startAsteroid = new Image();
        startAsteroid.onload = (() => this.ctx.drawImage(startAsteroid, this.canvas.width / 2 - startAsteroid.width / 2, this.canvas.height / 2 - startAsteroid.height / 2));
        startAsteroid.src = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png';
    }
    level_screen() {
        this.drawPlayerLives();
        this.drawYourScore();
        this.drawRandomAsteroids();
        this.drawSpaceShip();
    }
    drawPlayerLives() {
        for (let index = 0; index < this.lives; index++) {
            let lives = new Image();
            lives.addEventListener('load', () => this.ctx.drawImage(lives, (10 + lives.width * index), 10));
            lives.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
        }
    }
    drawYourScore() {
        this.writeText(20, 'white', 'end', `${this.player} - Your Score: ${this.score}`, this.canvas.width * 0.99, this.canvas.height / 15);
    }
    drawRandomAsteroids() {
        for (let index = 0; index < 5; index++) {
            let color = ['Brown', 'Grey'];
            let size = ['big', 'med', 'small', 'tiny'];
            let randomAsteroid = `${color[this.randomNumber(0, color.length - 1)]}_${size[this.randomNumber(0, size.length - 1)]}`;
            let asteroids = new Image();
            asteroids.addEventListener('load', () => this.ctx.drawImage(asteroids, this.randomNumber(0, this.canvas.width * 0.9), this.randomNumber(0, this.canvas.height * 0.9)));
            asteroids.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/meteor${randomAsteroid}1.png`;
        }
    }
    drawSpaceShip() {
        let ship = new Image();
        ship.addEventListener('load', () => this.ctx.drawImage(ship, this.canvas.width / 2 - ship.width / 2, this.canvas.height / 2 - ship.height / 2));
        ship.src = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
    }
    title_screen() {
        this.writePlayerScore();
        this.writeHighScores();
    }
    writePlayerScore() {
        this.writeText(70, 'white', 'center', `Your score is: ${this.score}`, this.canvas.width / 2, this.canvas.height / 5);
    }
    writeHighScores() {
        this.writeText(40, 'white', 'center', 'Highscores', this.canvas.width / 2, this.canvas.height / 3);
        for (let index = 0; index < this.highscores.length; index++) {
            this.writeText(20, 'white', 'center', `${index + 1}. ${this.highscores[index].playerName} - ${this.highscores[index].score}`, this.canvas.width / 2, this.canvas.height / 3 + (50 * (index + 1)));
        }
    }
    writeText(size, style, align, textInput, x, y) {
        this.ctx.font = `${size}px Minecraft`;
        this.ctx.fillStyle = style;
        this.ctx.textAlign = align;
        this.ctx.fillText(textInput, x, y);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map