import { NextFunction, Request, Response } from "express";
import { Language } from "models/language.model.js";
import { addLanguage, deleteLanguage, updateLanguage } from "services/languages.service.js";

async function add(req: Request, res: Response, next: NextFunction) {
	try {
		const body: Language = req.body?.data as Language;
		const message = await addLanguage(body);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

async function update(req: Request, res: Response, next: NextFunction) {
	try {
		const id: any = req.params?.id as string;
		const body: Language = req.body?.data as Language;
		body._id = id;
		const message = await updateLanguage(body);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteL(req: Request, res: Response, next: NextFunction) {
	try {
		const code: any = req.params?.code as string;
		const message = await deleteLanguage(code);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

export { add, update, deleteL };
