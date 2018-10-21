// Create the state that will contain the whole game
var mainState = {  
    preload: function() {  
        // Here we preload the assets
        
        game.load.image('player', 'assets/player.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('wall2', 'assets/wall2.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');

    },

    create: function() {  
        // Here we create the game\
        // Set the background color to blue
        game.stage.backgroundColor = '#3598db';
        
        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Add the physics engine to all game objects
        game.world.enableBody = true;
        
        // Variable to store the arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();
                
        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.wall2s = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        
        // Design the level. x = wall, o = coin, ! = lava, y = falling wall.
        var level = [
            'o                                                      o',
            ' xxxxxxxyyyyyyyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    x',
            ' !         !                               x       o  x',
            ' !  p              o              o        x     xxx  x',
            ' !         o                               x     x    x',
            ' !                                         x    yx    x',
            ' !     o   !    x     x      y        yx   x     x    x',
            ' xxxxxxxxxxxxxxxx!!!!!x                x   xy    x    x',
            ' xo             x!!!!!x                x   x     x  ! x',
            ' x              x!!!!!x!!!!!!!!!!!!!!!!x   x    yx    x',
            ' x    y                                    x     x    x',
            ' x      y                                  xy    x    x',
            ' x          y                o             x!    x    x',
            ' x                        !        !       x    xx!  !x',
            ' x              x!!!!!xxxxxxxyyyyyxxxxxx!!!x     x    x',
            ' xx                                        xx    x    x',
            ' x       x                !   o            x     x o  x',
            ' x       x                !                x   x x    x',
            ' x       x                  !!!!!!         x     x    x',
            ' x o     x          o         o!o          xx    x  !!x',
            ' x                    x        !           x     x    x',
            ' x   x                xx              !    x    xx  o x',
            ' x       yyyyyyyy     xxx             !     y    x    x',
            ' x!!!!!!!!!!!!!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',

        ];
        
        
        var startingPoint = 30;
        var spriteSize = 20;
        
        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {
                
                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(startingPoint+spriteSize*j, startingPoint+spriteSize*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'y') {
                    var wall2 = game.add.sprite(startingPoint+spriteSize*j, startingPoint+spriteSize*i, 'wall2');
                    this.walls.add(wall2);
                    wall2.body.immovable = false; 
                }

        
                // Create a coin and add it to the 'coins' group
                if (level[i][j] == 'o') {
                    var coin = game.add.sprite(startingPoint+spriteSize*j, startingPoint+spriteSize*i, 'coin');
                    this.coins.add(coin);
                }
        
                // Create a enemy and add it to the 'enemies' group
                if (level[i][j] == '!') {
                    var enemy = game.add.sprite(startingPoint+spriteSize*j, startingPoint+spriteSize*i, 'enemy');
                    this.enemies.add(enemy);
                }

                // Create a enemy and add it to the 'enemies' group
                if (level[i][j] == 'p') {
                    // Create the player in the middle of the game
                    this.player = game.add.sprite(startingPoint+spriteSize*j, startingPoint+spriteSize*i,'player');
                    // Add gravity to make it fall
                    this.player.body.gravity.y = 600;
                }                
            }
        }

    },

    update: function() {  
    
        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.walls);

        // Make the player and the walls collide
        game.physics.arcade.collide(this.player, this.wall2s);
        
        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        
        // Call the 'restart' function when the player touches the enemy
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

                // Here we update the game 60 times per second
        // Move the player when an arrow key is pressed
        if (this.cursor.left.isDown) 
            this.player.body.velocity.x = -200;
        else if (this.cursor.right.isDown) 
            this.player.body.velocity.x = 200;
        else 
            this.player.body.velocity.x = 0;
        
        // Make the player jump if he is touching the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -250;
        }
    
    
    },
        
    // Function to kill a coin
    takeCoin: function(player, coin) {
        coin.kill();
    },
    
    // Function to restart the game
    restart: function() {
        game.state.start('main');
    }

};

// Initialize the game and start our state
var game = new Phaser.Game(1170, 540);  
game.state.add('main', mainState);  
game.state.start('main');
    
