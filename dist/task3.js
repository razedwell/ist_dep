import express from "express";
import dotenv from "dotenv";
dotenv.config();
// const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Replace this with your email, transformed
const endpoint = "/" + (process.env.MY_EMAIL || "user@example.com");
// helper gcd
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
// helper lcm
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
//@ts-ignore
app.get(endpoint, (req, res) => {
    const x = Number(req.query.x);
    const y = Number(req.query.y);
    // Check for natural numbers
    if (!Number.isInteger(x) || !Number.isInteger(y) || x <= 0 || y <= 0) {
        res.send("NaN");
        return;
    }
    res.send(lcm(x, y).toString());
});
//@ts-ignore
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${endpoint}?x=3&y=4`);
});
//# sourceMappingURL=task3.js.map