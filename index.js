'use strict';
var inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// class Employee{
//     constructor(name, id, email){
//         this.name = name;
//         this.id = id;
//         this.email = email;
//     }

//     getName(){
//         return this.name;
//     }

//     getId(){
//         return this.id;
//     }

//     getEmail(){
//         return this.email;
//     }

//     getRole(){
//         return "Employee";
//     }
// }

// class Manager extends Employee{
//     constructor(officeNumber){
//         this.officeNumber = officeNumber;
//     }
//     getRole(){
//         return "Manager";
//     }  
// }

// class Engineer extends Employee{
//     constructor(github){
//         this.github = github;
//     }
//     getGithub(){
//         return this.github;
//     }
//     getRole(){
//         return "Engineer";
//     }  
// }

// class Intern extends Employee{
//     constructor(school){
//         this.school = school;
//     }
//     getSchool(){
//         return this.school;
//     }
//     getRole(){
//         return "Intern";
//     }
// }

// inquirer
//   .prompt({
//     type: 'text',
//     name: 'name',
//     message: 'What is your name?'
//   })
//   // destructure name from the prompt object
//   .then(({ name }) => {
//     this.player = new Player(name);

//     // test the object creation
//     console.log(this.currentEnemy, this.player);
//   });

//user questions
function promptUser() {
    return inquirer.prompt([
        {
        type: "checkbox",
        message: "Please select a employee role:",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ],
        name: "role"
        },
        {
        type: 'input',
        name: 'name',
        message: 'Please enter the their name:',
        },
        {
        type: 'input',
        name: 'email',
        message: 'Please enter their email address:',
        },
    ]);
} 

const generateHtml = (response) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teamkeeper</title>
    ${response.name}
    ${response.role}
    ${response.email}
</head>
<body>

</body>
</html>`
}

//create the html file after questions
const writeFile = util.promisify(fs.writeFile);

//wait for the answers, then create the markdown
async function init() {
    try {
        const response = await promptUser();

        const html = generateHtml(response);

        await writeFile("output/index.html", html);
        console.log("Success! Your team's html file has been created in the output dir.");
    } catch (err){
        console.log(err);
    }
}

init();