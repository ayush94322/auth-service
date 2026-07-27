import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
    constructor(message = "Not Authorized") {
        super(403, message);
    }
}