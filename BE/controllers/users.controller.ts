import { NextFunction, Request, Response } from "express";
import { addAccount, compareAccount } from "../services/accounts.service.js";
import { Account } from "../models/account.model.js";

async function register(req: Request, res: Response, next: NextFunction) {
	try {
		const lang = (req as any).langPack;
		const message = await addAccount(req.body?.data as Account, lang);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		const lang = (req as any).langPack;
		const message = await compareAccount(req.query, lang);
		res.status((message?.status as number) || 200).json(message);
	} catch (err) {
		next(err);
	}
}

export { register, login };
