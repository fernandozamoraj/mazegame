        /******************************************************************
         
         GetReadySplash class
         Class for the splash screen

        ******************************************************************/
        function GetReadySplash(scene){

            var tempSplash = new Sprite(scene, "./img/getready.png", 800, 70);
            
            tempSplash.init = function(){
                this.setX(this.cWidth/2 );
                this.setY(this.cHeight/2);
                this.setSpeed(0);
                //this.setMoveAngle(180);
            };

            return tempSplash;        
        }

        /******************************************************************
         
         Background Class
         Class for the wall logic 

        ******************************************************************/
       function Background(scene){

            var sprite = new EnhancedSprite(scene, "./img/background_black.png", 800, 70);
            
            sprite.init = function(){
                this.setX(this.cWidth/2 );
                this.setY(this.cHeight/2);
                this.setSpeed(0);
                this.width = this.cWidth;
                this.height = this.cHeight;
                //this.setMoveAngle(180);
            };

            return sprite;        
        }        

        /******************************************************************
         
         Wall Class
         Class for the wall logic 

        ******************************************************************/
        function Wall(scene){

            var tempWall = new EnhancedSprite(scene, "./img/meteor.png", 170, WALL_HEIGHT);
            
            tempWall.getWallHeight = function(){
                return WALL_HEIGHT;
            }; 

            tempWall.init = function(){
                
                var MIN_WIDTH = this.cWidth/20;
                var MAX_WIDTH = this.cWidth/15;

                var width = Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH; 
                var xPosition = Math.random() * this.cWidth + width/2;

                //allows sprite to go off screen
                this.setBoundAction(CONTINUE);
                this.width = width;
                this.setX(xPosition);
                this.setSpeed(6);
                this.setMoveAngle(180);
            };

            tempWall.repositionOnBoundsCheck = function(){

                var MIN_WIDTH = this.cWidth/10;
                var MAX_WIDTH = this.cWidth/4;
                var width = Math.random() * (MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH; 
                var xPosition = Math.random() * this.cWidth + width/2;

                if(this.y > 600){

                    this.width = width;
                    this.setX( xPosition );
                    this.setY(-600);
                }
            };

            return tempWall;
        }

        /******************************************************************
         
         SpaceShip Class
         Class for the spaceship logic 

        ******************************************************************/
        function SpaceShip(scene){

            var tempSpaceShip = new EnhancedSprite(scene, "./img/ship.png", 70, 70);
            var START_Y_POSITON  = 500;
            var MIN_SPEED = 1;
            var previousKeyLeft = false;
            var previousKeyRight = false;

            tempSpaceShip.init = function(){

                tempSpaceShip.changeImgAngleBy(0);
                tempSpaceShip.setSpeed(MIN_SPEED);
                tempSpaceShip.setY(START_Y_POSITON);
            };

            tempSpaceShip.checkKeys = function(){

                if(keysDown[K_LEFT])
                {
                    //handle events here
                    //sprite1.changeImgAngleBy(-5);
                    this.setMoveAngle(270);
                    //this.setImgAngle(230);

                    //reset the speed whenever direction changed
                    if(previousKeyRight)
                        this.setSpeed(MIN_SPEED);

                    this.changeSpeedBy(1);

                    previousKeyLeft = true;
                    previousKeyRight = false;
                }

                if(keysDown[K_RIGHT]){
                    //handle events here
                    //sprite1.changeImgAngleBy(5);
                    this.setMoveAngle(90);
                    //this.setImgAngle(320);
                    
                    //reset the speed whenever the direction changes
                    if(previousKeyLeft)
                        this.setSpeed(MIN_SPEED);

                    this.changeSpeedBy(1);

                    previousKeyLeft = false;
                    previousKeyRight = true;

                }

                if(keysDown[K_UP]){
                    //handle events here
                    //sprite1.changeImgAngleBy(5);
                    this.setMoveAngle(0);
                    
                    this.setSpeed(MIN_SPEED*6);

                    previousKeyLeft = false;
                    previousKeyRight = false;

                }

                if(keysDown[K_DOWN]){
                    //handle events here
                    //sprite1.changeImgAngleBy(5);
                    this.setMoveAngle(180);
                    
                    this.setSpeed(MIN_SPEED*8);

                    previousKeyLeft = false;
                    previousKeyRight = false;

                }
            };

            return tempSpaceShip;
        }