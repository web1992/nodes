console.log("Hello world!");

// construct function
function Car(name) {
  // use new ,this is Car
  // not use new ,this is window
  console.log("this", this);
  this.name = name;
  this.run = function() {
    console.log("run");
  };
  // return this;
}

// use new key word
let carBmw = new Car("BMW");
carBmw.run();

// not use new

let carBen = Car("Ben");
// carBen.run(); // will get error

// factory function
function person(name) {
  return {
    name: name,
    say: function() {
      console.log("Hello I am ", name);
    }
  };
}

let lucy = person("Lucy");

lucy.say();
