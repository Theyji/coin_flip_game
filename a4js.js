/**
 * JavaScript file for Coin Flip web app game (Assignment a4)
 * Created by Ayodeji Eniabire, Student ID; 000878946
 * on July 4th 2022
 */

window.addEventListener("load", function() {
    
    document.forms.username.addEventListener("submit", function(event) {
        event.preventDefault(); //prevent default submit on username input field 

        let inputspace = document.forms.username.userid; // create variable for input space and input value 
        let userid = document.forms.username.userid.value;
       
    // create boolean variable for username alphabetical oder check
       var notOdered;
        for (var i = 0; i < userid.length; i++){
            if (userid.charCodeAt(i) >  userid.charCodeAt(i+1)){
                notOdered = true;
            }
            else {
                notOdered = false;   
            }  
        }

    // username input check 
        let usererror = document.getElementById("username-error"); // variable for error message for wrong username input

        if ( (userid === "") || (!/^[a-zA-Z]+$/.test(userid)) || (userid.length <4) || (userid.length >8) ||(notOdered) || (userid[0]!== userid[0].toUpperCase()) ){
            console.log("Invalid Username format, click help button for valid format");

            usererror.style.display = "block"; // wrong username input error message
        }
        
        else {  // events to happen if userinput passes requirement check 
            inputspace.disabled = true;
            console.log("welcome " + userid);
            dollarPick.disabled = false;
            nairaPick.disabled = false;
            usererror.style.display = "none";
        } 
   
    }); // username code ends here 

// user prefrence selection code starts here 

    // coin choice and display code starts here (User Prefrence 1)

        let head = document.getElementById("head");
        let tail = document.getElementById("tail");
        let coin = document.getElementById("coin");
    
        let nairaPick = document.getElementById("n-coin"); // naira coin pick

        nairaPick.addEventListener("click", nairaselect); // naira coin selection event

        /**
         * changes coin image to naira coin 
         * disable number of flip rounds input field space
         */
        function nairaselect (){
            head.src = "images/one-naira-head.jpg";
            tail.src = "images/one-naira-tail.jpg";
            flipspace.disabled = false
        }
    
        let dollarPick = document.getElementById("d-coin"); // dollar coin pick

        dollarPick.addEventListener("click", dollarselect); // dollar coin selection event
    
        /**
         * changes coin image to dollar coin 
         * disable number of flip rounds input field space
         */
        function dollarselect (){
            head.src = "images/dollar-haead.jpg";
            tail.src = "images/dollar-tail.jpg"; 
            flipspace.disabled = false  
        } 
    // coin choice and display code ends here

 // number of coinflip rounds input (User's Prefrence 2) 

    let flipspace = document.forms.flipcount.flipc // variable for coinflip rounds input field

    let prefrence2Error = document.getElementById("fliptimes-error"); 

    let welcomeMessege = document.getElementById("welcome-mesg");

    document.forms.flipcount.addEventListener("submit", function(event) { // prevent default submit of coinflip input field
        event.preventDefault();  

        if (flipspace.value <= 0){ // user input verification for number of coinflip input 

            console.log("Invalid input format, check help function for valid format") // event to happen if verification failed 

            prefrence2Error.style.display = "block"; // error message display 
        }
        else {
            startbutton.disabled = false // event to happen if verified 

            prefrence2Error.style.display = "none"; // removes error message after input validation 

            welcomeMessege.style.display = "block"; // welcome message display after prefrence validation 

            setTimeout(() => {   // removes welcome message after set timmer 
               welcomeMessege.style.display = "none" 
            }, 2000);
        }
  
    }); 
 // user prefrence code ends here 
        
   
// start button activation and events

    let startbutton = document.getElementById("startbutton"); // variable for start button 

    startbutton.addEventListener("click", function(){  // start button click event
        flipspace.disabled = true;
        flipcoin.disabled = false;
        dollarPick.disabled = true;
        nairaPick.disabled = true;
    })

// coin flip and score display code starts here 

    let flipcoin = document.getElementById("flip"); // flip button variable 
    let headscore = document.getElementById("head-score"); // variable for score display when flip result is head
    let tailscore = document.getElementById("tail-score"); // variable for score display when flip result is tail
    let fdecide = document.getElementById("final-decission"); // variable for final decision display after user's verified number of flip
    let headcount = 0; // counter when flip result is head
    let tailcount = 0; // counter when flip result is tail
    let totalscore = 0; // total number of flip counter
    let win = "You Won"; // text display for win final decission
    let loss = "You Lost"; // text display for lost final decision 


    flipcoin.addEventListener("click", coinflip); // coin flip event

    /**
     * performs functions linked to coin flip event
     * disables coin selection, start flip buttons
     * initiates and reset animation that flips coin
     * updates counters, scores and result display variables
     */
    function coinflip (){ 
 
        nairaPick.disabled = true; 
        dollarPick.disabled = true;

        let random = Math.floor(Math.random() * 10); // random number that determines coin side display after flip
        coin.style.animation = "none"; // resets animation
        startbutton.disabled = true;
      
        if(random <= 5){   // condition to get head display after flip
            setTimeout(function(){
                coin.style.animation = "head-flip 1s forwards"; // coin animation that displays head after flip
            });
            headcount++;
            setTimeout(function() {headscore.innerText = `Head: ${headcount}`}, 1500 ); // head count display 
            
        }
        
        else{    // condition for tail display 
            setTimeout(function(){
                coin.style.animation = "tail-flip 1s forwards"; // tailcoin display animation 
            });
            tailcount++;
            setTimeout( function() {tailscore.innerText = `Tail: ${tailcount}`}, 1500 ); // tail score display 
             
        } 

        totalscore = (headcount + tailcount); // total score to determine win or loss condition 

        if ((totalscore)  == (flipspace.value) && (headcount >= tailcount)) {  // condition for win 
            setTimeout( function() {fdecide.innerText = `Final Decission: ${win}`}, 2500 ); // display for win 
            startbutton.disabled = true;
            flipcoin.disabled = true;
        }
        else if ((totalscore)  == (flipspace.value) && (headcount < tailcount)) {  // condition for loss
            setTimeout( function() {fdecide.innerText = `Final Decission: ${loss}`}, 2500 ); // loss display 
            startbutton.disabled = true
            flipcoin.disabled = true;
        } 

    } 
// coin flip and display code ends here 
   

// game reset 
    let gamereset = document.getElementById("reset"); // reset button variable
    gamereset.addEventListener("click", resetgame); // reset event

    /**
     * performs functions linked to game reset event
     * reloads the window
     */
    function resetgame () {
        window.location.reload();
    }

// help info request and display 
    let gamehelp = document.getElementById("help"); // help button variable
    let helpdoc = document.getElementById("helpinfo"); // help information 

    gamehelp.addEventListener("click",helpinfo); // help information request event 

    /**
     * performs function linked to help information request event 
     * changes helpdoc display style "block" (makes it display on screen)
     */
    function helpinfo (){
        helpdoc.style.display = "block";
    }
    
    let infoclose = document.getElementById("closehelp"); // close help information 

    infoclose.addEventListener("click", playinfo) // help information closeure event

    /**
     * changes helpdoc display style to none (makes it go off the screen)
     */
    function playinfo (){
        helpdoc.style.display = "none";
    }

});