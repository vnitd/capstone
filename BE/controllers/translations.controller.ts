import { NextFunction, Request, Response } from "express";
import { Language, Translation } from "models/language.model.js";
import { Types } from "mongoose";
const { ObjectId } = Types;
import {
	addTranslation,
	deleteTranslation,
	getTranslation,
	getTranslations,
	updateLanguage,
	updateTranslation,
} from "services/languages.service.js";

async function add(req: Request, res: Response, next: NextFunction) {
	try {
		const code: string = req.params?.code as string;
		const body: Translation = req.body?.data as Translation;
		const message = await addTranslation(code, body);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

async function getMany(req: Request, res: Response, next: NextFunction) {
	try {
		const code = req.params?.code as string;
		const pattern = req.query?.pattern as string;
		const message = await getTranslations(code, pattern);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

async function getSpecific(req: Request, res: Response, next: NextFunction) {
	try {
		const code = req.params?.code as string;
		const name = req.params?.name as string;
		const message = await getTranslation(code, name);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

async function update(req: Request, res: Response, next: NextFunction) {
	try {
		const code = req.params?.code as string;
		const trans = req.body?.data as Translation;
		const message = await updateTranslation(code, trans);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteT(req: Request, res: Response, next: NextFunction) {
	try {
		const code = req.params?.code as string;
		const name = req.params?.name as string;
		const message = await deleteTranslation(code, name);
		res.status((message?.status as number) || 200).json({
			...message,
		});
	} catch (err) {
		next(err);
	}
}

export { add, getMany, getSpecific, update, deleteT };
