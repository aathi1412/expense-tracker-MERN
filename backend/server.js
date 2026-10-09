require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

const allowedOrigins = [
    "https://trackmyexpensez.netlify.app"
];
app.use(
    cors({
        origin: function(origin, cb){
            if(!origin || allowedOrigins.includes(origin)){
                cb(null, true);
            }else cb(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["content-type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/income", require("./routes/IncomeRoutes"));
app.use("/api/v1/expense", require("./routes/ExpenseRoutes"));
app.use("/api/v1/dashboard", require("./routes/DashboardRoutes"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Started!`);
});