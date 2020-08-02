'use strict';
var inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

var employeeArray = new Array;

//user questions
function promptUser() {
    return inquirer.prompt([
        {
        type: "list",
        message: "Please select a employee role:",
        choices: [
            "Manager",
            "Engineer",
            "Intern",
        ],
        name: "role"
        },
        {
        type: 'input',
        name: 'name',
        message: 'Please enter their name:',
        },
        {
        type: 'input',
        name: 'uid',
        message: 'Please enter their employee id number:',
        },
        {
        type: "input",
        name: "github",
        message: "Enter a GitHub URL for the engineer:",
        when: (response) => response.role === 'Engineer', 
        },
        {
        type: "input",
        name: "school",
        message: "Enter the school attended by the intern:",
        when: (response) => response.role === 'Intern', 
        },
        {
        type: "input",
        name: "phone",
        message: "Enter a office number for the manager:",
        when: (response) => response.role === 'Manager', 
        },
        {
        type: 'input',
        name: 'email',
        message: 'Enter their email address:',
        },
        {
        type: 'confirm',
        name: 'askAgain',
        message: 'Would you like to enter another employee? (just hit enter for YES)?',
        default: true,
        },
    ])
}

const generateHtml = (employeeArray) => {
    // let theName = new Employee(employeeArray.response.name);
    // let name = theName.name;

    //create a card for each employee
    var cardsArray = new Array;
    var i;
    for(i = 0;i < employeeArray.length; i++){
        var cards = `<div><div class="uk-card uk-card-default uk-card-body uk-card-hover">
        <h3 class="uk-card-title">${employeeArray[i].role}</h3>
        <p>Name: ${employeeArray[i].name}</p>
        <p>ID#: ${employeeArray[i].uid}</p>
        <p>Email: <a href="mailto:${employeeArray[i].email}">${employeeArray[i].email}</a></p>
        <p>${employeeArray[i].github ? "Github: " + employeeArray[i].github  : ""}
        ${employeeArray[i].school ? "School: " + employeeArray[i].school  : ""}
        ${employeeArray[i].phone ? "Office Phone: " + employeeArray[i].phone  : ""}
        </p>
        </div></div>`

        cardsArray.push(cards);
        console.log(cardsArray);
    }

    var begin = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teamkeeper</title>
    <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/css/uikit.min.css" />

</head>
<body>
<nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-center">
        <a href="#" class="uk-navbar-item uk-logo">TEAMKEEPER</a>
    </div>
</nav>
<main class="uk-container">
<br />
<div class="uk-child-width-1-2@s uk-grid-match" uk-grid id="cardContainer">`
 var end = `</div></main>
<!-- UIkit JS -->
<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit-icons.min.js"></script>
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script>
//lint the output html
$("#cardContainer").each(function(){
   $(this).html($(this).html().replace(/,/g , ''));
});
//color based on role
$("h3").filter(function() {
return $(this).text() === "Manager";
}).css("color", "red");
$("h3").filter(function() {
return $(this).text() === "Engineer";
}).css("color", "dodgerblue");
$("h3").filter(function() {
return $(this).text() === "Intern";
}).css("color", "green");
</script>
</body>
</html>`
return begin + cardsArray + end;
}

//create the html file after questions
const writeFile = util.promisify(fs.writeFile);

//wait for the answers, then create the html
async function init() {

    try {
        const response = await promptUser();

        //push answers to array
        employeeArray.push(response);

        //return to questions or finish
        if (response.askAgain === false){
        const html = generateHtml(employeeArray);
        await writeFile("dist/index.html", html);
        console.log("Success! Your team's index.html file has been created in the /dist/ dir.");
        }
        else{
            init();
        }
    } catch (err){
        console.log(err);
    }
}

init();