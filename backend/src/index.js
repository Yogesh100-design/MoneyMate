import dotenv from "dotenv";
import connectToMongodb from './config/db.js'
import app from './app.js'
dotenv.config();


connectToMongodb()
.then(()=>{
    const PORT = process.env.PORT || 8000
    app.listen(PORT,()=>{
        console.log(`Server running at http://localhost:${PORT}`);
    })
})


console.log(process.env.PORT); 
