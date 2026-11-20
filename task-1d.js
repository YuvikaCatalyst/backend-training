const promise1 = Promise.resolve("Task 1 completed");

const promise2 = Promise.reject("Task 2 failed");

const promise3 = Promise.resolve("Task 3 completed");

const promise4 = Promise.reject("Task 4 failed");

Promise.allSettled([promise1, promise2, promise3, promise4]).then((results) => {
  results.forEach((result, index) => {
    console.log(`Promise ${index + 1}:`);
    console.log("Status:", result.status);

    if (result.status === "fulfilled") {
      console.log("Value:", result.value);
    } else {
      console.log("Reason:", result.reason);
    }
  });
});
