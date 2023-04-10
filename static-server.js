import express from "express";
import path from "path";
const port = process.argv[2] || 12000;

const app = express();

app.use(express.static("dist"));

app.listen(port, () => console.log(`Server running on port ${port}`));