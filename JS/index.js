console.log("hello")

console.error("This is an error")

console.warn("Warning!!!")



let age = 14;

if (age === 14) {
  console.log("age is 14");
} else {
  console.log("age is not 14");
}



let day = 1;

switch (day) {
  case 1:
    console.log("Monday");
    break;

  case 2:
    console.log("Tuesday");
    break;

  case 3:
    console.log("Wednesday");
    break;    
  
  default:
    console.log("Invalid day");
}




let sum = 0;

for (let i = 1; i <= 5; i++) {
  sum = sum + i;
}

console.log(sum);





let n1 = 5;
let fact = 1;

for (let i = 1; i <= n1; i++) {
  fact = fact * i;
}

console.log(fact);



let n = 7;
let isPrime = true;


if (n <= 1) {
  isPrime = false;
} else {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      isPrime = false;
      break;
    }
  }
}

if (isPrime) {
  console.log("Prime number");
} else {
  console.log("Not a prime number");
}

const student = {
    firstname: "ABC",
    lastname: "PQR",
    age: "23"
};

console.log(student.age);
console.log(student["firstname"]);

