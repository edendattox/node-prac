/**
 *  ID : 61403f2ccaa45f8203f5698d
 */

/**
 *  12 bytes:
 *
 *  first 4 bytes: timestamp
 *  next 3 bytes: machine identifier
 *  next 2 bytes: process identifier
 *  last 3 bytes: counter
 *
 *  1 byte = 8 bits
 *
 *  2 ^ 8 = 256
 *  2 ^ 24 = 16M
 *
 *  Driver -> MongoDB
 *
 */

const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid("1234");
console.log(isValid);
