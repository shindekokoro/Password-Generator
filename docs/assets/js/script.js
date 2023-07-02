// Declare Variables
var passwordLength = 0;
var passwordTypes = {
  "lowercase": { "enabled": false,
                 "set": [ "a", "b", "c", "d", "e",
                          "f", "g", "h", "i", "j",
                          "k", "l", "m", "n", "o",
                          "p", "q", "r", "s", "t",
                          "u", "v", "w", "x", "y", "z" ] },
  "uppercase": { "enabled": false,
                 "set": [ "A", "B", "C", "D", "E",
                          "F", "G", "H", "I", "J",
                          "K", "L", "M", "N", "O",
                          "P", "Q", "R", "S", "T",
                          "U", "V", "W", "X", "Y", "Z" ] },
  "numeric": { "enabled": false,
               "set": [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ] },
  "special": { "enabled": false,
               "set": [ " ", "!", "\"", "#", "$",
                        "%", "&", "'", "(", ")",
                        "*", "+", ",", "-", ".",
                        "/", ":", ";", "<", "=",
                        ">", "?", "@", "[", "\\",
                        "]", "^", "_", "`", "{",
                        "|", "}", "~" ] } };
var characterSet = [ ];
var generatedPassword = "";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // Prompt user for necessary information to generate the password.
  promptUser();
  
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function promptUser(){
  // Keep asking user if password length does not match requirements.
  while ( passwordLength < 8 || passwordLength > 128 ){
    passwordLength = prompt("How long does the password need to be?", "Between 8 characters and no more than 128 characters.");
    // Cancel Password Generation if user presses cancel.
    if (typeof passwordLength === "object"){
      return "Password generation canceled";
    }

    // ParseInt of input to verify data, reset to 0 if NaN.
    passwordLength = parseInt(passwordLength);
    if (isNaN(passwordLength)){
      passwordLength = 0;
    }
  }

  alert("For the next section:\n" +
          "At least one character type needs to be selected.\n" +
          "Select \'Ok\' for \'Yes\', \'Cancel\' for \'No\'");

  // Ask user for character type input
  // Attempt twice if at least one of the conditions isn't true.
  for (var attempts = 1; attempts < 3; attempts++) {
    passwordTypes["lowercase"].enabled = confirm("Should your password include lowercase characters?");
    passwordTypes["uppercase"].enabled = confirm("Should your password include uppercase characters?");
    passwordTypes["numeric"].enabled = confirm("Should your password include numeric characters?");
    passwordTypes["special"].enabled = confirm("Should your password include special characters?");
    
    Object.keys(passwordTypes).forEach( (type, index) => {
      // If true, set attempt counter higher than needed to ensure exit from for loop
      if ( passwordTypes[type].enabled == true ) {
        characterSet = characterSet.concat(passwordTypes[type].set);
        attempts = 99;
      }
      // Check enabled condition of passwordTypes
      if (index == Object.keys(passwordTypes).length-1 && attempts == 2){
        alert("Max attempts tried, resetting prompts.");
        passwordLength = 0;
      }
      else if (index == Object.keys(passwordTypes).length-1 && attempts < 3){
        alert("At least one character type should be selected, please try again.");
      }
    });
  }
}

function generatePassword(){
  
  let characterSetLength = characterSet.length;
  for (var i = 0; i < passwordLength; ++i) {
    let randomIndex = Math.floor(Math.random() * characterSetLength);
    generatedPassword += characterSet[randomIndex];
  }

  return generatedPassword;
  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
