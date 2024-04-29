"use strict";

const express = require("express");

const app = express();

app.use("/", (_req, res) => {
  res.send("server running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
