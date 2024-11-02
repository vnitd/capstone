import { Language, Translation } from "models/language.model.js";
import { ObjectId, PipelineStage } from "mongoose";
import languagesSchema from "schemas/languages.schema.js";
import translationsSchema from "schemas/translations.schema.js";

function createPatern(pattern: string) {
	let escapedPattern = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
	let regexPattern = escapedPattern.replace(/\*/g, ".*");
	return new RegExp(`^${regexPattern}`);
}

async function addLanguage(lang: Language) {
	try {
		const res = await languagesSchema.create<Language>(lang);
		return {
			status: 200,
			result: res,
		};
	} catch (err) {
		throw err;
	}
}

async function updateLanguage(lang: Language) {
	try {
		const res = await languagesSchema.findByIdAndUpdate(lang._id, { ...lang, _id: undefined });
		return {
			status: 200,
			result: res,
		};
	} catch (err) {
		throw err;
	}
}

async function deleteLanguage(code: string) {
	try {
		const res = await languagesSchema.deleteOne({ code });
		return {
			status: 200,
			result: res,
		};
	} catch (err) {
		throw err;
	}
}

async function addTranslation(code: string, trans: Translation) {
	try {
		if ((await getTranslation(code, trans.name)).result != trans.name)
			return {
				status: 400,
				result: "Language already exist!",
			};
		const lang = await languagesSchema.findOne<Language>({ code });
		if (lang?._id) {
			trans.language = lang?._id;

			const res = await translationsSchema.create<Translation>(trans);
			return {
				status: 200,
				result: res,
			};
		}
		return {
			status: 400,
			result: [],
		};
	} catch (err) {
		throw err;
	}
}

async function getTranslations(code: string, pattern: string | undefined = undefined) {
	try {
		const lang = await languagesSchema.findOne<Language>({ code });
		if (lang?._id) {
			const pipelines: PipelineStage[] = [
				{
					$match: {
						language: lang?._id as ObjectId,
					},
				},
			];
			if (pattern) pipelines.push({ $match: { name: { $regex: createPatern(pattern) } } });
			const res = await translationsSchema.aggregate<Translation>(pipelines);
			const result: any = {};
			for (const val of res) {
				result[val.name] = val.content;
			}
			return {
				status: 200,
				result,
			};
		}
		return {
			status: 400,
			result: [],
		};
	} catch (err) {
		throw err;
	}
}

async function getTranslation(code: string, name: string) {
	try {
		const lang = await languagesSchema.findOne<Language>({ code });
		if (lang?._id) {
			const res = await translationsSchema.findOne({ language: lang._id, name });
			if (!res)
				return {
					status: 200,
					result: name,
				};
			return {
				status: 200,
				result: res.content,
			};
		}
		return {
			status: 400,
			result: name,
		};
	} catch (err) {
		throw err;
	}
}

async function updateTranslation(code: string, trans: Translation) {
	try {
		const lang = await languagesSchema.findOne<Language>({ code });
		if (lang?._id) {
			const res = await translationsSchema.updateOne(
				{ language: lang._id as ObjectId, name: trans.name },
				{ ...trans, name: undefined }
			);
			return {
				status: 200,
				result: res,
			};
		}
		return {
			status: 400,
			result: [],
		};
	} catch (err) {
		throw err;
	}
}

async function deleteTranslation(code: string, name: string) {
	try {
		const lang = await languagesSchema.findOne<Language>({ code });
		if (lang?._id) {
			const res = await translationsSchema.deleteOne({ language: lang._id as ObjectId, name });
			return {
				status: 200,
				result: res,
			};
		}
		return {
			status: 400,
			result: [],
		};
	} catch (err) {
		throw err;
	}
}

export {
	addLanguage,
	updateLanguage,
	deleteLanguage,
	addTranslation,
	getTranslations,
	getTranslation,
	updateTranslation,
	deleteTranslation,
};
