// scripts/generate-jwt-secret.js
import crypto from "crypto";

const secret = crypto.randomBytes(64).toString("hex");

console.log("✅ Your new JWT secret key:\n");
console.log(secret);
console.log("\n💡 Copy this key and paste it into your .env file as:");
console.log("JWT_SECRET=" + secret);