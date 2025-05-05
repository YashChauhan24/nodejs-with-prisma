import { Request, Response } from 'express';

const sendResponse = (req: Request, res: Response, statusCode: Number, message?: string, data?: Object | null) => {
  res.status(Number(statusCode)).json({ message, data });
};

export default sendResponse;
