'use strict';
var inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

var employeeArray = new Array;

class Employee{
    constructor(name, id, email, role){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return this.role;
    }
}

class Manager extends Employee{
    constructor(officeNumber){
        this.officeNumber = officeNumber;
    }
    getRole(){
        return "Manager";
    }  
}

class Engineer extends Employee{
    constructor(github){
        this.github = github;
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }  
}

class Intern extends Employee{
    constructor(school){
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
    getRole(){
        return "Intern";
    }
}

//user questions
function promptUser() {
    return inquirer.prompt([
        {
        type: "checkbox",
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
        message: 'Please enter the employee name:',
        },
        {
        type: 'input',
        name: 'email',
        message: 'Please enter the employee email address:',
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
    var i;
    for(i = 0;i < employeeArray.length; i++){
        console.log(i);
        console.log(employeeArray);
        var card = `<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
        <h3 class="uk-card-title">${employeeArray[i].role}</h3>
        <p>Name: ${employeeArray[i].name}</p>
        <p>Email <a href="mailto:${employeeArray[i].email}">${employeeArray[i].email}</a></p></div>`
    }

    return `<!DOCTYPE html>
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
${card}
</main>
<!-- UIkit JS -->
<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit-icons.min.js"></script>
</body>
</html>`
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
        await writeFile("output/index.html", html);
        console.log("Success! Your team's index.html file has been created in the /output/ dir.");
        }
        else{
            console.log(employeeArray);
            init();
        }
    } catch (err){
        console.log(err);
    }
}

init();