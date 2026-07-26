import {env} from "./config/env.js";
import app from "./app.js";
import {prisma} from "./lib/prisma.js";

async function start() {
    try {
        await prisma.$connect();
        console.log("Database Connected");
        app.listen(env.PORT, ()=>{
            console.log(`Server running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to Database");
        process.exit(1);
    }
}

start();