const express = require("express");
const app = express();
const cors = require("cors")
const searchRouter = require("./routes/search")
const PORT = 8010;

app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    allowedHeaders: ["Content-Type"]
}))



app.use("/api",searchRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
