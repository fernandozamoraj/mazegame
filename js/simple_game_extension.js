        //TODO:  
        //      Provide men to rescue
        //      provie points
        ///     add level music
        //      add ship count on screen
        //      fix get ready screen and add count down
        /******************************************************************
         
         Extension for the Sprite class
         This class provides functionality that I need

         1. Improved RectangleCollision
         2. Provides writing text to a sprite

        ******************************************************************/
        function EnhancedSprite(scene, fileName, width, height){

            var enhancedSprite = new Sprite(scene, fileName, width, height);
            var paused = false;

            enhancedSprite.pause = function(){
                paused = true;
            };

            enhancedSprite.resume = function(){
                paused = false;
            };

            //override update
            enhancedSprite.realUpdate = enhancedSprite.update;

            enhancedSprite.update = function(){

                if(!paused){
                    this.realUpdate();
                }
            };


            //fontFamily: e.g. "Arial"
            //fontSize: in pixels e.g. 30
            //fontColor: hex value e.g. "#ff00dd"
            //textValue: "GAME OVER"
            //x and y positions
            enhancedSprite.writeText = function(fontFamily, fontSize, fontColor, textValue, x, y){
                //var c = document.getElementById("myCanvas");
                //var ctx = c.getContext("2d");
                this.context.font = fontSize.toString() + "px " + fontFamily; //"30px Arial";
                this.context.fillStyle = fontColor;
                this.context.fillText(textValue, x, y);
            };

            //override collidesWith
            //this collidesWith reduces the collision area in half
            //          --------------------
            //         |                    |
            //         |     ----------     |
            //         |     |         |    |
            //         |     |_________|    |
            //         |                    |
            //         _____________________   
            enhancedSprite.collidesWith = function(sprite){
                //check for collision with another sprite
                
                var divisor = 3;

                //collisions only activated when both sprites are visible
                var collision = false;
                if (this.visible){
                  
                    if (sprite.visible){
                            //define borders
                        myLeft = this.x - (this.width / divisor);
                        myRight = this.x + (this.width / divisor);
                        myTop = this.y - (this.height / divisor);
                        myBottom = this.y + (this.height / divisor);
                        otherLeft = sprite.x - (sprite.width / divisor);
                        otherRight = sprite.x + (sprite.width / divisor);
                        otherTop = sprite.y - (sprite.height / divisor);
                        otherBottom = sprite.y + (sprite.height / divisor);
                            
                        //assume collision
                        collision = true;
                        
                        //determine non-colliding states
                        if ((myBottom < otherTop) ||
                                (myTop > otherBottom) ||
                                (myRight < otherLeft) ||
                                (myLeft > otherRight)) {
                                  collision = false;
                        } // end if

                    } // end 'other visible' if
                } // end 'I'm visible' if

                return collision;
            }; 

            return enhancedSprite;
        }