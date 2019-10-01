/* Global variables and functions */



/* game object */
var starWars = {

    // Object Attributes --------------------------------------------
    
    // Character names
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
                CAP: 56
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
    enemiesLeft: 0,

    // Object Methods -----------------------------------------------
    
    /*
     * Funciton: To initialize variables and statuses
     * 
     */
    init: function() {

        var keys = Object.keys(this.characters);
        keys.forEach(function myFunc(item) {
          starWars.populateImg("#player", item);
        });

        enemiesLeft = 3;
    },

    /*
     * Function: Utility function. To compose the image containers with certain values and styles and put in certain section
     * Input param: element id/class, style string
     */
    populateImg: function(section, value, style) {
console.log("populate images " + section + "value " + value);

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
     * Function: Utility function. To show/hide certain HTML elements when a character wins or loses
     * Input param: boolean, whether player won 
     */
    fightEnd: function(won) {

        // Update html to display You Lost
        $("#win-lose").text(won? "You Won!" : "You Lost!")
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

                // Remove this character from Enemies section
                $('.img-container[value=' + characterValue + '-container]').empty();

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
console.log("attack" + " status: " + this.status + " player: " + this.currentPlayer + " defender: " + this.currentDefender);

        // If current player chosen and current Defender chosen
        if (this.status === 2) {
            
            // Reduce Defender HP by Player's AP and update html display
            this.currentDefenderHP -= this.currentPlayerAP;
            $("#"+this.currentDefender+"-hp").text(this.currentDefenderHP);

            // Reduce current Player HP by current Defender's CAP and update html display
            this.currentPlayerHP -= this.currentDefenderCAP;
            $("#"+this.currentPlayer+"-hp").text(this.currentPlayerHP);

            // Increase player AP 
            this.currentPlayerAP += this.characters[this.currentPlayer]["AP"]; 

            // If current player HP > 0 and Defender HP > 0 - still in play
            
            // If current play HP <= 0 and current defender HP > 0 - player loses
            if ((this.currentPlayerHP <= 0 && this.currentDefenderHP > 0) || 
                ((this.currentPlayerHP <= 0 && this.currentDefenderHP <=0) && this.currentPlayerHP < this.currentDefenderHP)) {
                
                // Player lost
                this.fightEnd(false);

            }
            // If current defender HP <= 0 and current player HP > 0 
            else if ((this.currentDefenderHP <= 0 && this.currentPlayerHP > 0) ||
                    ((this.currentPlayerHP <= 0 && this.currentDefenderHP <=0) && this.currentPlayerHP >= this.currentDefenderHP)) {

                enemiesLeft--;
                
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

        this.init();

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

    starWars.init();

    $("#player, #enemies").on("click", ".img-container .character", function() {

        var key = $(this).val();
        starWars.characterChosen(key);    
    });
    
    $("#attack").on("click", function() {
        starWars.attack();
    });

    $("#reset").on("click", function() {
        starWars.reset();
    });
})

