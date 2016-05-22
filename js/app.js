// Enemies our player must avoid
var Enemy = function() {
    this.x = (Math.random() * 550);
    this.y = yLoc();
    this.sprite = 'images/enemy-bug.png';
    this.speed = (Math.random() * (150 - 50) + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// if statement will cause enemies that exit screen right to respawn on the
// left side of screen in (potentially) a different lane
Enemy.prototype.update = function(dt) {
    this.x = (this.x + (this.speed * dt));
    if (this.x > 700) {
        this.x = -100;
        this.y = yLoc();
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


//Returns a value to be used in Enemy generation to determine beginning Y position
function yLoc() {
        var num = Math.random() * 100;
        if (num >= 0 && num < 25) {
            return 60
        }
        if (num >= 25 && num < 50) {
            return 143
        }
        if (num >= 50 && num < 75) {
            return 226
        }
        if (num >= 75 && num <= 100) {
            return 309
        }
    };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;
    this.y = 392;
    this.score = 0;
    this.lives = 3;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.textBaseline = 'top';
    ctx.font = "32px Arial"
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 550, 50);
    ctx.fillStyle = "blue";
    ctx.fillText("Score: " + this.score, 15, 15);
    ctx.fillText("Lives: " + this.lives, 375, 15)
};

Player.prototype.update = function() {
    if (this.y == -23 ) {
        this.score = this.score + 10;
        this.x = 202;
        this.y = 392;
    }
     };

Player.prototype.handleInput = function(key){
    if (key == 'left' && this.x > 0) {
        this.x = (this.x - 101);
    }
    if (key == 'right' && this.x < 404) {
        this.x = (this.x + 101);
    }
    if (key == 'up' && this.y > 0) {
        this.y = (this.y - 83);
    }
    if (key == 'down' && this.y < 392) {
        this.y = (this.y + 83);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    var enemy1 = new Enemy;
    var enemy2 = new Enemy;


var allEnemies = [enemy1, enemy2]

var player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
