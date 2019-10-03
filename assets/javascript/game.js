/* Global variables and functions */
// Whether we need a hard reset that resets all characters HP, AP and CAP besides other variable reset
var hardReset = true;

/*
 * Function: To generate a random integer between min and max
 */
function getRandomNum (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* game object */
var starWars = {

    // Object Attributes --------------------------------------------

    // Object to hold characters and their HP, AP, CAP
    characters: 
        {
            "Stormtrooper": {
                HP: 0,
                AP: 0,
                CAP: 0
            },
            "Darth_Vader": {
                HP: 0,
                AP: 0,
                CAP: 0
            },
            "Yoda": {
                HP: 0,
                AP: 0,
                CAP: 0
            },
            "BB-8": {
                HP: 0,
                AP: 0,
                CAP: 0
            }
        }, 

    // A status code that keeps track of the status of the game
    // 0 - game not started, player not chosen
    // 1 - player chosen, defender not chosen
    // 2 - both player and Defender chosen
    status: 0,

    // Current player and defender
    currentPlayer: "",
    currentDefender: "",

    // Current player and defender HP
    currentPlayerHP: 0,
    currentDefenderHP: 0,

    // Current player and defender AP
    currentPlayerAP: 0,
    currentDefenderAP: 0,

    // Current player and defender CAP
    currentPlayerCAP: 0,
    currentDefenderCAP: 0,

    // Number of enemies left
    enemiesLeft: 0,

    // Object Methods -----------------------------------------------
    
    /*
     * Function: To compose the image containers with certain values and styles and place it in certain section
     * Input param: element id/class to place the image, value of the image, style string
     */
    populateImg: function(section, value, style) {

        $(section).append(
            '<div class="img-container" value="' + value + '-container" style="' + style + ';"> \
             <span>' + value + '</span> \
             <br> \
             <button class="character" value=' + value + '><img src="assets/images/' + value + '.jpg" class="img-fluid"></button> \
             <br> \
             <span id="' + value + '-hp">' + starWars.characters[value]["HP"] + '</span> \
             </div>'
        );
    },

    /*
     * Function: To show/hide certain HTML elements when a character wins or loses or tie
     * Input param: game result: 0 - player won | 1 - player lost | 2 - tie 
     */
    fightEnd: function(result) {

        switch (result) {
            case 0:  // player won
                hardReset = true;
                $("#win-lose").text("You Won! GAME OVER!");
                break;
            case 1:  // player lost
                hardReset = false;
                $("#win-lose").text("You Were Defeated! GAME OVER!");
                break;
            case 2:  // tie
                hardReset = false;
                $("#win-lose").text("Both You and the Defender Do Not Have Health Point To Continue. Please Reset.");
                break;
            default:  // shouldn't happen
                break;
        } 

        // Show Reset button
        $("#reset").attr("style", "display:block");

        // Hide Attack button
        $("#attack").attr("style", "display:none");
    },

    /*
     * Function: To execute when a character is chosen
     * Input param: the value of the character user clicked to chooose
     */
    characterChosen: function(characterValue) {

        switch (this.status) {

            case 0: // player not chosen

                // Change game status
                this.status = 1;

                // Assign this character as current player
                this.currentPlayer = characterValue;
                this.currentPlayerHP = this.characters[characterValue]["HP"];
                this.currentPlayerAP = this.characters[characterValue]["AP"];
                this.currentPlayerCAP = this.characters[characterValue]["CAP"];

                // Remove characters section
                $("#player").empty();

                // Move characters to their places
                var keys = Object.keys(this.characters);
                keys.forEach(function myFunc(item) {

                    // Put player in player section
                    if (item === characterValue) {
                        starWars.populateImg("#me", item);
                    }
                    // Put the other characters to the enemy section and change the div background and font color
                    else {
                        starWars.populateImg("#enemies", item, "background-color:red; color:white");
                    }
                });
                                    
                break;
            
            case 1: // Player chosen, Defender not chosen
             
                // If current player button is clicked, do nothing
                if (characterValue === this.currentPlayer)
                    return;

                this.status = 2;
               
                // Show Attack button
                $("#attack").attr("style", "display:block");

                // Assign this character current Defender
                this.currentDefender = characterValue;
                this.currentDefenderHP = this.characters[characterValue]["HP"];
                this.currentDefenderAP = this.characters[characterValue]["AP"];
                this.currentDefenderCAP = this.characters[characterValue]["CAP"];

                // Remove this character from enemies section. Empty information section
                $('.img-container[value=' + characterValue + '-container]').empty();
                $("#win-lose").empty()

                // Put in the defender section and change the div background and font color
                starWars.populateImg("#defender", characterValue, "background-color:black; color: white");                   
                
                break;

            default: // Ignore the click for all other statuses
                break;
        }
    },
  
    /*
     * Function: To execute when the Attack button is clicked
     */
    attack: function() {

        // If current player chosen and current defender chosen
        if (this.status === 2) {
            
            // Reduce Defender HP by Player's AP and update html display
            this.currentDefenderHP -= this.currentPlayerAP;
            $("#"+this.currentDefender+"-hp").text(this.currentDefenderHP);

            // Reduce current Player HP by current Defender's CAP and update html display
            this.currentPlayerHP -= this.currentDefenderCAP;
            $("#"+this.currentPlayer+"-hp").text(this.currentPlayerHP);

            // Log the attack in the information section
            $("#win-lose").text("You attacked " + this.currentDefender + " for " + this.currentPlayerAP + " damages. " + 
            this.currentDefender + " attacked you back for " + this.currentDefenderCAP + " damages.");
 
            // Increase player AP 
            this.currentPlayerAP += this.characters[this.currentPlayer]["AP"]; 

            // Player loses if player's HP is negative and defender's HP is positive.
            if (this.currentPlayerHP <= 0 && this.currentDefenderHP > 0) {
                
                // Player lost
                this.fightEnd(1);

            }
            // If defender's HP is negative and player's HP is positive
            else if (this.currentDefenderHP <= 0 && this.currentPlayerHP > 0) {

                this.enemiesLeft--;
                
                // If no Defender left - player wins
                if (this.enemiesLeft === 0) {
                    
                    // Player won
                    this.fightEnd(0);
                }
                // If there is still defender left
                else {
                    // Player needs to select another defender
                    this.status = 1;

                    // Remove this Defender from the defender section
                    $('.img-container[value=' + this.currentDefender + '-container]').empty();    

                    // Update information content
                    $("#win-lose").text("You have defeated " + this.currentDefender + ". Please choose another enemy.");
                    
                }
            }
            // In the case both player's and defender's HPs fall negative at the same time, 
            // they tie
            else if (this.currentDefenderHP <= 0 && this.currentPlayerHP <= 0) {

                // Tie, end the game
                this.fightEnd(2);
            }
            // Else (both player and defender HP are positive numbers), do nothing
            else 
                return;
        }
        // Else (status not 2, either player or defender not chosed yet), do nothing
        else
            return;
    },

    /*
     * Function: To execute when the Reset button is clicked
     */
    reset: function() {

        var keys = Object.keys(this.characters);
        keys.forEach(function myFunc(item) {
          
            // Reset characters' HP, AP, CAP is hardreset is true
            if (hardReset) {

                starWars.characters[item]["HP"] = getRandomNum(150, 250);
                starWars.characters[item]["AP"] = getRandomNum(10, 20);
                starWars.characters[item]["CAP"] = getRandomNum(15, 25);
            }

            // Place character images
            starWars.populateImg("#player", item);
        });

        // Remove content in me, enemies, defender, win-lose section
        $("#me, #enemies, #defender, #win-lose").empty();

        // Hide buttons
        $("#attack, #reset").attr("style", "display: none");

        // Reset all object attributes to initial values
        this.currentPlayer = "";
        this.currentDefender = "";
        this.currentPlayerHP = 0;
        this.currentPlayerAP = 0;
        this.currentPlayerCAP = 0;
        this.currentDefenderHP = 0;
        this.currentDefenderAP = 0;
        this.currentDefenderCAP = 0;
        this.status = 0;
        this.enemiesLeft = keys.length - 1;
    }
}

$(document).ready(function() {

    // Initialize object variables
    starWars.reset();

    // Button listeners
    $("#player, #enemies").on("click", ".img-container .character", function() {
        starWars.characterChosen($(this).val());    
    });
    
    $("#attack").on("click", function() {
        starWars.attack();
    });

    $("#reset").on("click", function() {
        starWars.reset();
    });
})

