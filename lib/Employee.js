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

module.exports = Employee

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

module.exports = Intern

