import { EventEmitter } from "events";

class EventBus extends EventEmitter {}

const bus = new EventBus();

function logUser(user) {
  console.log("User created:", user);
}

function sendWelcomeEmail(user) {
  console.log(`welcome email sent to ${user.name}`);
}

bus.on("userCreated", logUser);
bus.on("userCreated", sendWelcomeEmail);

console.log("First emit:");
bus.emit("userCreated", { id: 1, name: "Alice" });

bus.off("userCreated", sendWelcomeEmail);

console.log("Second emit:");
bus.emit("userCreated", { id: 2, name: "Bob" });
