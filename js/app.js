// Enemies our player must avoid
var Enemy = function() {
    this.x = (Math.random() * 550);
    this.y = function() {
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
    //Returns a value to be used in Enemygeneration to determine beginning X position
    this.xLoc = function() {
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
    //Returns a value to be used in Enemy generation to determine beginning Y position
    this.yLoc = function() {
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
        this.y = this.yLoc();
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

//Rotator Enemy class
var Rotator = function() {
    var obj = new Enemy;
    obj.sprite = "images/char-cat-girl.png";
    //Returns a value to be used in Enemy Rotator generation to determine beginning X position
    //Will return either COL[0] or COL[4] to ensure proper movement of Rotator class object
    obj.xLoc = function() {
        var num = Math.random() * 100;
        if (num >= 0 && num < 50) {
            return COL[0];
        };
        if (num >= 50 && num <= 100) {
           return COL[4];
        };
    };
    obj.x = obj.xLoc();
    obj.y = obj.yLoc();
    obj.update = function(dt) {
        //changes movement to down at right wall
        if (this.x >= COL[4] && this.y >= ROW[0]) {
            this.x = COL[4];
            this.y = (this.y + (this.move * dt));
        };
        //changes movement to up at left wall
        if (this.x <= COL[0] && this.y <= ROW[3]) {
            this.x = COL[0];
            this.y = (this.y - (this.move * dt));
        }
        //changes movement to right at top wall
        if (this.y <= ROW[0] && this.x >= COL[0]) {
            this.y = ROW[0];
            this.x = (this.x + (this.move * dt));
        }
        //changes movement to left at bottom wall
        if (this.y >= ROW[3] && this.x <= COL[4]) {
            this.y = ROW[3];
            this.x = (this.x - (this.move * dt));
        }
    }
    return obj
};

//Creates Sun Enemy class
var Sun = function() {
    var obj = new Enemy;
    obj.sprite = 'images/Star.png'
    obj.level = 7
    obj.update = function() {
        //creates movement of Sun class objects on level up
        if (player.level > this.level) {
            obj.x = obj.xLoc();
            obj.y = obj.yLoc();
            this.level++
        //checks to make sure Sun doesn't lay overtop item and gets new Sun coordinates if necessary
        if (this.x == item.x && this.y == item.y) {
            obj.x = obj.xLoc();
            obj.y = obj.yLoc();
        }
        };
    };
    return obj
}

//Constant row and column values for x and y coordinates
var ROW = [60, 143, 226, 309];
var COL = [0, 101, 202, 303, 404]

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Creates Player class
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = this.STARTINGX;
    this.y = this.STARTINGY;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
}
//Renders player character
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Starting position for player
Player.prototype.STARTINGX = 202;
Player.prototype.STARTINGY = 392;

Player.prototype.update = function() {
    //resets player to start, increases level, and spawns new enemy after successfully getting to water
    if (this.y == -23 ) {
        this.score = this.score + 10;
        this.x = this.STARTINGX;
        this.y = this.STARTINGY;
        this.level++;

        if (this.level < 4 || this.level > 8) {
            allEnemies.push(new Enemy);
        }
        if (this.level < 7 && this.level >= 4) {
            allEnemies.push(new Rotator);
        }
        if (this.level == 7||this.level == 8) {
            allEnemies.push(new Sun);
        }
        if (item.status == 0) {
            item = new Item;
        }
    }

    //controls scoring and item disappearance when player enters containing square
    if (this.x == item.x && this.y == item.y && item.status == 1) {
        this.score = this.score + item.value;
        item.status = 0;
    }
};


var XMOVE = 101
var YMOVE = 83
//handles input from and controls player movement
Player.prototype.handleInput = function(key){
    //if statement ensures that all inputs (besides space) cease to function at GAME OVER screen
    if (this.lives > 0){
        if (key == 'left' && this.x > 0) {
        this.x = (this.x - XMOVE);
        }
        if (key == 'right' && this.x < 404) {
            this.x = (this.x + XMOVE);
        }
        if (key == 'up' && this.y > 0) {
            this.y = (this.y - YMOVE);
        }
        if (key == 'down' && this.y < 392) {
            this.y = (this.y + YMOVE);
        }
    }
    //allows space bar to initiate a new game
    if (this.lives == 0){
        if (key == 'space') {
            this.lives = 3;
            this.level = 1;
            this.score = 0;
            allEnemies = [enemy1, enemy2];
        }
    }
}

//collision detection
var checkCollisions = function(){
    allEnemies.forEach(function(enemy) {
        if (player.x - enemy.x < 80 && player.x - enemy.x > -70 && player.y == enemy.y) {
            player.lives = player.lives - 1;
            player.x = player.STARTINGX;
            player.y = player.STARTINGY;
        }
    });
}

// Now instantiate your objects.
var enemy1 = new Enemy;
var enemy2 = new Enemy;

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2];

// Place the player object in a variable called player
var player = new Player;

//Creates item class
var Item = function(){
    this.sprite = "images/Gem Blue.png";
    this.status = 1;
    this.value = 10;
    //Returns a value to be used in Item generation to determine beginning X position
    this.xLoc = function() {
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
    //Returns a value to be used in Item generation to determine beginning Y position
    this.yLoc = function() {
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
    this.x = this.xLoc();
    this.y = this.yLoc();
}

//Renders items on screen
Item.prototype.render = function() {
    if (this.status == 1) {
        ctx.scale(.5, .5);
        ctx.translate(50, 100);
        ctx.drawImage(Resources.get(this.sprite), (this.x * 2), (this.y * 2));
        ctx.translate(-50, -100);
        ctx.scale(2, 2);
    }
};

item = new Item;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
