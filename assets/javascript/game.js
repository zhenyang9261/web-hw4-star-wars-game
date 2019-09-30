/* Global variables and functions */



/* game object */
var starWars = {

    // Object Attributes --------------------------------------------
    
    // Character names
    characters: 
        {
            "aaa": {
                HP: 150,
                AP: 6,
                CAP: 24
            },
            "bbb": {
                HP: 180,
                AP: 12,
                CAP: 78
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

    // Object Methods -----------------------------------------------
    
    /*
     * Funciton: To initialize variables and statuses
     * 
     */
    init: function() {

        // Display character's HP
        var keys = Object.keys(this.characters);
        keys.forEach(function myFunc(item) {
            $("#"+item+"-hp").text(starWars.characters[item]["HP"]);
        });
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
                $("#player").remove();

                // Move characters to their places
                var keys = Object.keys(this.characters);
                keys.forEach(function myFunc(item) {

                    // Put player in Me section
                    if (item === characterValue) {
                        $("#me").html(
                            '<div class="img-container" value="' + item + '-container"> \
                             <span>' + item + '</span> \
                             <br> \
                             <button class="character" value=' + item + '><img src="assets/images/' + item + '.jpg" class="img-fluid"></button> \
                             <br> \
                             <span id="' + item + '-hp">' + starWars.characters[item]["HP"] + '</span> \
                             </div>'
                        );
                    }
                    // Put the other characters to the Enemy section and change the div background to red
                    else {
                        $("#enemies").append(
                            '<div class="img-container" value="' + item + '-container" style="background-color:red"> \
                             <span>' + item + '</span> \
                             <br> \
                             <button class="character" value=' + item + '><img src="assets/images/' + item + '.jpg" class="img-fluid"></button> \
                             <br> \
                             <span id="' + item + '-hp">' + starWars.characters[item]["HP"] + '</span> \
                             </div>'
                        ).bind('click', this.characterChosen);
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
                $('.img-container[value=' + characterValue + '-container]').remove();

                // Put in the Defender section and change the div background to red
                $("#defender").append(
                    '<div class="img-container" value="' + characterValue + '-container" style="background-color:black; color: white"> \
                     <span>' + characterValue + '</span> \
                     <br> \
                     <button class="character" value=' + characterValue + '><img src="assets/images/' + characterValue + '.jpg" class="img-fluid"></button> \
                     <br> \
                     <span id="' + characterValue + '-hp">' + starWars.characters[characterValue]["HP"] + '</span> \
                     </div>'
                );
                                   
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
            if (this.currentPlayerHP <= 0 && this.currentDefenderHP > 0) {
                
                // Update html to display You Lost
                $("#win-lose").text("You Lost!")

                // Show Reset button
                $("#reset").attr("style", "display:block");

            }
                // Update html to display You Lost

                // Reset variables 

            // Else if current Defender HP <= 0

                // If no Defender left - player wins
                    // Update html to display You Won!

                    // Reset variables
                
                // Else
                    // Remove this Defender from the Defender section

                    // Reset current Defender related variables
            // Else 
                // Chracter with greater negative number wins
        }
        // Else, do nothing

    },

    /*
     * Function: To execute when the Reset button is clicked
     */
    reset: function() {

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
})

