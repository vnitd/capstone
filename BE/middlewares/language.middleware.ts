import { Response, Request, NextFunction } from "express";
import { getTranslations } from "services/languages.service";

const languageMiddleware = (pattern?: string) => async (req: Request, res: Response, next: NextFunction) => {
	const language = req.headers["content-language"] as string;
	const result = await getTranslations(language, pattern ?? "*");
	(req as any).langPack = result.result;
	next();
};

export default languageMiddleware;
