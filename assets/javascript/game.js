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
                CAP: 12
            },
            "bbb": {
                HP: 180,
                AP: 12,
                CAP: 18
            },
            "ccc": {
                HP: 110,
                AP: 18,
                CAP: 6
            },
            "ddd": {
                HP: 130,
                AP: 12,
                CAP: 18
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

                // Move characters to their places
                var keys = Object.keys(this.characters);
                keys.forEach(function myFunc(item) {

                    // Remove all characters from current place
                    $('.img-container[value=' + item + '-container]').remove();

                    // Put player in Your Character section
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
               
                // Assign this character current Defender
                this.currentDefender = characterValue;

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

        }


        // Else if player was chosen and Defender was not chosen
        // assign this character to current Defender. Move this character
        // to the Defender section. Mark the status Ready to Attack


        // Else, do nothing
        

    },

    
    /*
     * Function: To execute when the Attack button is clicked
     */
    attack: function() {

        // If current player chosen and current Defender chosen

            // Reduce Defender HP by AP and update html display

            // Reduce player HP by CAP and update html display

            // Increase player AP 

        
            // If current player HP > 0 and Defender HP > 0 - still in play
            
            // Else if current play HP <= 0 - player loses
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

    $("#player, #enemies").on("click", ".img-container .character", function() {

        var key = $(this).val();
        starWars.characterChosen(key);    
    });
    
})

