import crypto from 'crypto'

export function generatePassword(length) {
    const chars = "abcdefghGHIJKLMNOijstuvwxyz-+=<>?{}klmnopqr[]|~ABCDE345FPQRSTUVWXYZ0126789!@#$%^&*()_";
    const bytes = crypto.randomBytes(length);
    let password = '';
    for (let i = 0; i < length; i++) {
        const index = bytes[i] % chars.length; // Ensure the index is within the range of the character pool
        password += chars.charAt(index);
    }
    return password;
}






// export async function generatePassword(length) {
//     const char = "abcdefghijklmnopqrstuvwxyz-+=<>?{}[]|~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_";
//     try {
//         const bytes = await crypto.randomBytes(length*2).toString("base64");

//         // let password = "";
//         // for (let i = 0; i < length; i++) {
//         //     const index = bytes[i] % char.length;
//         //     password += char.charAt(index);
//         // }
//         // return password;
//         return bytes.slice(0,length);

//     } catch (error) {
//         throw new Error("Error generating password",error.message);
//     }

// }















// const crypto = require('crypto');

// export function generatePassword(length) {
//     // Define the character pool, including special characters
//     const bytes = crypto.randomBytes(length); // Generate random bytes
//     let password = '';
//     for (let i = 0; i < length; i++) {
//         const index = bytes[i] % chars.length; // Ensure the index is within the range of the character pool
//         password += chars.charAt(index);
//     }
//     return password;
// }

// Example usage:
// console.log(generatePassword(10)); // Random password of length 10
// console.log(generatePassword(12)); // Random password of length 12
