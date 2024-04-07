import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const Link: string = process.env.DATABASE ||'mongodb://localhost:27017/Contact';

mongoose.connect(Link)
    .then(() => {
        console.log(chalk.bgGreen('DB connected Done'));
    })
    .catch((error: Error) => {
        console.log(chalk.red(error.message));
    });
