const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use("/api/routes", placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    // if the response is sent successfully
    return next(error); // go to next middleware and give chance to user to handle error
  }
  res.status(error.code || 500); // setting the status code on the response and I want to give chance to developer a chance of setting that code on the error object. If a error code is undefined then set status to 500.
  res.json({ message: error.message || "An unknown error occured!" }); // add object which has message property. Every error I've sent back from myApI should have a message property which the attached client can then use to show an error message.
});

app.listen(3000);
