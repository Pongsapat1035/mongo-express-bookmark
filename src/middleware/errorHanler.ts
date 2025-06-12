import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    if (!err.isOperational) {
        console.error('Unexpected Error:', err);
    }

    res.status(statusCode).json({
        success: false,
        message: err.isOperational ? err.message : 'Something went wrong',
    });
};
