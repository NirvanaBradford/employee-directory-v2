import express from "express";
const router = express.Router();

import employees, { addEmployee } from "#db/employees";

router.get("/", (req, res) => {
  res.send("Hello employees!");
});

router.get("/employees", (req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/employees/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

router.post("/employees", (request, response) => {
  const employee = request.body;
  if (!employee || !employee.name) {
    return response.status(400).json({ error: "Employee name is required!!" });
  }

  const newEmployee = addEmployee(employee.name);
  response.status(201).json(newEmployee);
});

export default router;
