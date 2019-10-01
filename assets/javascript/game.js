/* Global variables and functions */
var playerWon = false;

function getRandomNum (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* game object */
var starWars = {

    // Object Attributes --------------------------------------------

    // Characters
    numberOfCharacters: 4,
    names: ["aaa", "bbb", "ccc", "ddd"],

    // Object to hold characters and their initial HP, AP, CAP
    characters: 
        {
            "aaa": {
                HP: 150,
                AP: 18,
                CAP: 12
            },
            "bbb": {
                HP: 180,
                AP: 12,
                CAP: 26
            },
            "ccc": {
                HP: 110,
                AP: 18,
                CAP: 20
            },
            "ddd": {
                HP: 130,
                AP: 12,
                CAP: 36
            },
        }, 

    // A status code that keeps track of the status of the game
    // 0 - game not started, player not chosen
    // 1 - player chosen, Defender not chosen
    // 2 - both player and Defender chosen
    // 3 - game over
    status: 0,

    // Current player and Defender
    currentPlayer: "",
    currentDefender: "",

    // Current player and Defender HP
    currentPlayerHP: 0,
    currentDefenderHP: 0,

    // Current player and Defender AP
    currentPlayerAP: 0,
    currentDefenderAP: 0,

    // Current player and Defender CAP
    currentPlayerCAP: 0,
    currentDefenderCAP: 0,

    // Number of enemies left
    enemiesLeft: 3,

    // Object Methods -----------------------------------------------
    
    /*
     * Funciton: To initialize variables and statuses
     * Input param: boolean. If player won, regenerate characters HP, AP, CAP
     */
    init: function(won) {

        var keys = Object.keys(this.characters);
        keys.forEach(function myFunc(item) {
          starWars.populateImg("#player", item);
        });

        if (won) {
            playerWon = false;

            for (var i=0; i<this.numberOfCharacters; i++) {
                this.characters[this.names[i]]["HP"] = getRandomNum(100, 200);
                this.characters[this.names[i]]["AP"] = getRandomNum(5, 25);
                this.characters[this.names[i]]["CAP"] = getRandomNum(5, 25);
            }
        }
    },

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
     * Function: To show/hide certain HTML elements when a character wins or loses
     * Input param: boolean, whether player won 
     */
    fightEnd: function(won) {
console.log("Player won: " + won);

        // Record playerWon status
        playerWon = won? true : false;

        // Update html to display You Lost
        $("#win-lose").text(won? "You Won! GAME OVER!" : "You Were Defeated! GAME OVER!");

        // Show Reset button
        $("#reset").attr("style", "display:block");

        // Hide Attack button
        $("#attack").attr("style", "display:none");
    },

    /*
     * Function: To execute when a character is chosen
     */
    characterChosen: function(characterValue) {
console.log(characterValue + " " + this.status);

        switch (this.status) {

            case 0: // player not chosed

                // Change game status
                this.status = 1;

                // Assign this character current player
                this.currentPlayer = characterValue;
                this.currentPlayerHP = this.characters[characterValue]["HP"];
                this.currentPlayerAP = this.characters[characterValue]["AP"];
                this.currentPlayerCAP = this.characters[characterValue]["CAP"];

                // Remove characters section
                $("#player").empty();

                // Move characters to their places
                var keys = Object.keys(this.characters);
                keys.forEach(function myFunc(item) {

                    // Put player in Me section
                    if (item === characterValue) {
                        starWars.populateImg("#me", item);
                    }
                    // Put the other characters to the Enemy section and change the div background to red
                    else {
                        starWars.populateImg("#enemies", item, "background-color:red");
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

                // Remove this character from Enemies section. Empty information section
                $('.img-container[value=' + characterValue + '-container]').empty();
                $("#win-lose").empty()

                // Put in the Defender section and change the div background to red
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
console.log("attack: player HP: " + this.currentPlayerHP + " defender HP: " + this.currentDefenderHP);

        // If current player chosen and current Defender chosen
        if (this.status === 2) {
            
            // Reduce Defender HP by Player's AP and update html display
            this.currentDefenderHP -= this.currentPlayerAP;
            $("#"+this.currentDefender+"-hp").text(this.currentDefenderHP);

            // Reduce current Player HP by current Defender's CAP and update html display
            this.currentPlayerHP -= this.currentDefenderCAP;
            $("#"+this.currentPlayer+"-hp").text(this.currentPlayerHP);

            // Log the attack
            $("#win-lose").text("You attacked " + this.currentDefender + " for " + this.currentPlayerAP + " damages. " + 
            this.currentDefender + " attacked you back for " + this.currentDefenderCAP + " damages.");
 
            // Increase player AP 
            this.currentPlayerAP += this.characters[this.currentPlayer]["AP"]; 

            // Player loses if player's HP is negative and defender's HP is positive.
            if (this.currentPlayerHP <= 0 && this.currentDefenderHP > 0) {
                
                // Player lost
                this.fightEnd(false);

            }
            // If defender's HP is negative and player's HP is positive
            else if (this.currentDefenderHP <= 0 && this.currentPlayerHP > 0) {

                this.enemiesLeft--;
                
                // If no Defender left - player wins
                if (this.enemiesLeft === 0) {
                    
                    // Player won
                    this.fightEnd(true);
                }
                // If there is still defender left
                else {
                    // Player needs to select another defender
                    this.status = 1;

                    // Remove this Defender from the Defender section
                    $('.img-container[value=' + this.currentDefender + '-container]').empty();    

                    // Remove information content
                    $("#win-lose").text("You have defeated " + this.currentDefender + ". Please choose another enemy.");
                    
                }
            }
            // In the case both player's and defender's HPs fall negative at the same time, 
            // the character with greater negative number wins. With both HPs negative, game is over regardless
            else if (this.currentDefenderHP <= 0 && this.currentPlayerHP <= 0) {

                // Player wins
                if (this.currentPlayerHP >= this.currentDefenderHP) {
                    this.fightEnd(true);
                }
                // Player loses
                else {
                    this.fightEnd(false);
                }
            }
            // Else (both player and defender HP are positive numbers), do nothing
            
        }
        // Else (status not 2, either player or defender not chosed yet), do nothing

    },

    /*
     * Function: To execute when the Reset button is clicked
     */
    reset: function() {

        this.init(playerWon);

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
        this.enemiesLeft = 3;
    }

}

// Button listeners
$(document).ready(function() {

    starWars.init(playerWon);

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

