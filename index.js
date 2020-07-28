'use strict';
var inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { restoreDefaultPrompts } = require('inquirer');

//create the html file after questions
const writeFile = util.promisify(fs.writeFile);

class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
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
        return "Employee";
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