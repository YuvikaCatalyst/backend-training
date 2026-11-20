const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/posts/5",
];

// Using for...of
async function fetchData() {
  console.log("\nFetching data using for...of loop");

  const start = Date.now();
  console.log("Start Time:", new Date(start).toLocaleTimeString());

  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
  }

  const end = Date.now();
  console.log("Stop Time:", new Date(end).toLocaleTimeString());
  console.log("Time taken:", end - start, "ms");
}

// Using Promise.all
async function fetchDataWithPromiseAll() {
  console.log("\nFetching data using Promise.all");

  const start = Date.now();
  console.log("Start Time:", new Date(start).toLocaleTimeString());

  const promises = urls.map((url) =>
    fetch(url).then((response) => response.json()),
  );

  const results = await Promise.all(promises);

  console.log("Results:", results);

  const end = Date.now();
  console.log("Stop Time:", new Date(end).toLocaleTimeString());
  console.log("Time taken:", end - start, "ms");
}

// Run for...of first, then Promise.all
fetchData().then(fetchDataWithPromiseAll);

// Promise.all() is faster because all independent requests are started
// concurrently instead of waiting for each request to finish one by one.
// Sequential execution is useful when each operation depends on the
// previous one or when requests need to be processed in a specific order.
