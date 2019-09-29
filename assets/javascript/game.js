/* Global variables and functions */



/* game object */
var starWars = {

    // Object Attributes --------------------------------------------
    
    // Character names


    // Character Health Point (HP)


    // Character Attack Power (AP)


    // Character Counter Attack Power (CAP)


    // A status code that keeps track of the status of the game


    // Current player and opponent


    // Current player and opponent HP


    // Current player and opponent AP


    // Current player and opponent CAP


    // Object Methods -----------------------------------------------
    
    /*
     * Funciton: To initialize variables and statuses
     * 
     */
    init: function() {

    }

    /*
     * Function: To execute when a character is chosen
     */
    characterChosen: function() {

        // If no player was chosen, assign this character current player
        // Move the other characters to the Enemy section and change the 
        // div background to red


        // Else if player was chosen and opponent was not chosen
        // assign this character to current opponent. Move this character
        // to the Opponent section. Mark the status Ready to Attack


        // Else, do nothing
        

    }

    
    /*
     * Function: To execute when the Attack button is clicked
     */
    attack: function() {

        // If current player chosen and current opponent chosen

            // Reduce opponent HP by AP and update html display

            // Reduce player HP by CAP and update html display

            // Increase player AP 

        
            // If current player HP > 0 and opponent HP > 0 - still in play
            
            // Else if current play HP <= 0 - player loses
                // Update html to display You Lost

                // Reset variables 

            // Else if current opponent HP <= 0

                // If no opponent left - player wins
                    // Update html to display You Won!

                    // Reset variables
                
                // Else
                    // Remove this opponent from the opponent section

                    // Reset current opponent related variables
            // Else 
                // Chracter with greater negative number wins

        // Else, do nothing


    }

    /*
     * Function: To execute when the Reset button is clicked
     */
    reset: function() {

    }


}

// Button listeners

