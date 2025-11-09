// src/scripts/hash-password.js
import bcrypt from "bcryptjs";

// Replace this with the password you want to hash
const plainPassword = "admin1234";

const hashPassword = async() => {
    try {
        const salt = await bcrypt.genSalt(8);
        const hashed = await bcrypt.hash(plainPassword, salt);
        console.log("✅ Plain password:", plainPassword);
        console.log("🔒 Hashed password:", hashed);
    } catch (err) {
        console.error("❌ Error hashing password:", err.message);
    }
};

hashPassword();