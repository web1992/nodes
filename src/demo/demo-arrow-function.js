function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(null, arguments), ms);

    // let args = arguments;
    // setTimeout(function() {
    //   return f.apply(null, args);
    // }, 2000);
  };
}

// function defer(f, ms) {
//   return function(...args) {
//     let ctx = this;
//     setTimeout(function() {
//       return f.apply(ctx, args);
//     }, ms);
//   };
// }

function sayHi(who) {
  alert("Hello, " + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds
