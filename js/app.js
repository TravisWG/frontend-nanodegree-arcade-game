// Enemies our player must avoid
var Enemy = function() {
    this.x = (Math.random() * 550);
    this.y = yLoc();
    this.sprite = 'images/enemy-bug.png';
    this.move = (Math.random() * (150 - 50) + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// if statement will cause enemies that exit screen right to respawn on the
// left side of screen in (potentially) a different lane
Enemy.prototype.update = function(dt) {
    this.x = (this.x + (this.move * dt));
    if (this.x > 700) {
        this.x = -100;
        this.y = yLoc();
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


var Rotator = function() {
    var obj = new Enemy;
    obj.sprite = "images/char-cat-girl.png";
    obj.x = xLocRotator();
    obj.y = yLoc();
    obj.update = function(dt) {
        //changes movement to down at right wall
        if (this.x >= COL[4] && this.y >= ROW[0]) {
            console.log("rightwall")
            this.x = COL[4];
            this.y = (this.y + (this.move * dt));
        };
        //changes movement to up at left wall
        if (this.x <= COL[0] && this.y <= ROW[3]) {
            console.log("left wall")
            this.x = COL[0];
            this.y = (this.y - (this.move * dt));
        }
        //changes movement to right at top wall
        if (this.y <= ROW[0] && this.x >= COL[0]) {
            console.log("topwall");
            this.y = ROW[0];
            this.x = (this.x + (this.move * dt));
        }
        //changes movement to left at bottom wall
        if (this.y >= ROW[3] && this.x <= COL[4]) {
            console.log("bottom wall");
            this.y = ROW[3];
            this.x = (this.x - (this.move * dt));
        }
    }
    return obj;
}

//Constant row and column values for x and y coordinates
var ROW = [60, 143, 226, 309];
var COL = [0, 101, 202, 303, 404]

//Returns a value to be used in Enemy and Item generation to determine beginning Y position
function yLoc() {
        var num = Math.random() * 100;
        if (num >= 0 && num < 25) {
            return ROW[0]
        };
        if (num >= 25 && num < 50) {
            return ROW[1]
        };
        if (num >= 50 && num < 75) {
            return ROW[2]
        };
        if (num >= 75 && num <= 100) {
            return ROW[3]
        };
    };

function xLoc() {
        var num = Math.random() * 100;
        if (num >= 0 && num < 20) {
            return COL[0]
        };
        if (num >= 20 && num < 40) {
            return COL[1]
        };
        if (num >= 40 && num < 60) {
            return COL[2]
        };
        if (num >= 60 && num <= 80) {
            return COL[3]
        };
        if (num >= 80 && num <= 100) {
            return COL[4]
        };
    };

//Returns a value to be used in Enemy Rotator generation to determine beginning X position
//Will return either COL[0] or COL[4] to ensure proper movement of Rotator class object
function xLocRotator() {
    var num = Math.random() * 100;
    if (num >= 0 && num < 50) {
        return COL[0]
    }
    if (num >= 50 && num <= 100) {
        return COL[4]
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = this.STARTINGX;
    this.y = this.STARTINGY;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Starting position for player
Player.prototype.STARTINGX = 202
Player.prototype.STARTINGY = 392

Player.prototype.update = function() {
    if (this.y == -23 ) {
        this.score = this.score + 10;
        this.x = this.STARTINGX;
        this.y = this.STARTINGY;
        this.level = this.level + 1
        if (this.level < 4) {
        allEnemies.push(new Enemy);
        }
        else {
        allEnemies.push(new Rotator);
        }
        console.log(this.level);
    };

    allEnemies.forEach(function(enemy) {
        if (player.x - enemy.x < 80 && player.x - enemy.x > -70 && player.y == enemy.y) {
            player.lives = player.lives - 1
            player.x = player.STARTINGX
            player.y = player.STARTINGY
        };
    });
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


var Item = function(){
    this.x = xLoc();
    this.y = yLoc();
    this.sprite = "images/Gem Blue.png";
}

Item.prototype.render = function() {
    ctx.scale(.5, .5)
    ctx.translate(50, 100)
    ctx.drawImage(Resources.get(this.sprite), (this.x * 2), (this.y * 2));
    ctx.translate(-50, -100)
    ctx.scale(2, 2)
};

item = new Item;

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
