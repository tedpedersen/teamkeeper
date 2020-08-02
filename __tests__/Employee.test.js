const Employee = require("../lib/Employee");

test('creates a employee object', () => {
    const someNew = new Employee("TheName", 200, "email@email.com", "Intern", "UC Davi")
  
    // create a test that checks if the name is a string
    expect(someNew.name).toEqual(expect.any(String))
  
    // create a test that checks if id is number
    expect(someNew.id).toEqual(expect.any(Number));

    // create a test that checks if the email is a string
    expect(someNew.email).toEqual(expect.any(String))

    // create a test that checks if the role is a string
    expect(someNew.email).toEqual(expect.any(String))
    
  });

