import { Request, Response } from 'express';
import chalk from 'chalk';

export function addTwoNumbers(req: Request, res: Response) {
    try {
        const { num1, num2 } = req.validBody;

        validateInputs(num1, num2);

        const result = addNumbers(num1, num2);

        return res.status(200).json({ result });
    } catch (error) {
        console.error(chalk.red('Error:', (error as Error).message)); 
        return res.status(400).json({ error: (error as Error).message });
    }
}

export function addNumbers(num1: any, num2: any) {
    return num1 + num2;
}

function validateInputs(num1: any, num2: any) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number' || isNaN(num1) || isNaN(num2)) {
        throw new Error('Both inputs must be numbers.');
    }
}
