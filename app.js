import express, { request, response } from "express";
const app = express();
export default app;

import employeeRoutes from "./routes/employeeRoutes.js";

function logger(request, response, next) {
  console.log(`${request.method}: ${request.url}`);
  next();
}

app.use(express.json());
app.use(logger);

app.use("/", employeeRoutes);

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use((error, request, response, next) => {
  console.error("Error caused by middleware---:", error.message);
  response.status(error.status || 500).json({
    error: error.message || "Internal Server Error!!",
  });
});
