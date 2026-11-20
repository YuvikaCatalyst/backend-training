//using new promise()

const task= new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve("Task completed")},1000);
})

task
.then((message)=>{
    console.log(message);
})
.then(()=>{
    console.log("Task completed successfully");
})
.catch((error)=>{
    console.log("Error:",error);
})   

//using async-await

async function performTask(){
    try{
        const message= await task;
        console.log(message);
        console.log("Task completed successfully");
    }catch(error){
        console.log("Error:",error);
    }
}
performTask();