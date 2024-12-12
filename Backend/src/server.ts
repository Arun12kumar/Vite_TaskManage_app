
import app from "./app"
import env from "./util/valuationEnv"
import mongoose from "mongoose";



const PORT = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
    console.log("Mongoose Connected");
    app.listen(PORT);
})
.catch(console.error)
