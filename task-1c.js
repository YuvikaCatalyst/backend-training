//using promise

function sum(numbers) {
  return new Promise((resolve, reject) => {
    numbers.some((num) => num < 0)
      ? reject("Negative numbers are not allowed")
      : resolve(numbers.reduce((acc, num) => acc + num, 0));
  });
}
sum([1, 2, 3, 4, 5]).then((result) => {
  console.log("Sum:", result);
}).catch((error) => {
  console.log("Error:", error);
});

//using async-await

async function performSum() {
    try {
        const result = await sum([1, 2, 3, 4, 5]);
        console.log("Sum:", result);
    }   catch (error) {
        console.log("Error:", error);
    }                   
}
performSum();