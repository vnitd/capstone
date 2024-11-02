import { add, deleteL, update } from "controllers/languages.controller.js";
import {
	add as addTranslation,
	deleteT,
	getMany,
	getSpecific,
	update as updateTranslation,
} from "controllers/translations.controller.js";
import { Router } from "express";

const languageRoute: Router = Router();

languageRoute.post("/", add);
languageRoute.put("/:id", update);
languageRoute.delete("/:code", deleteL);

languageRoute.post("/:code/translations", addTranslation);
languageRoute.get("/:code/translations", getMany);
languageRoute.get("/:code/translations/:name", getSpecific);
languageRoute.put("/:code/translations", updateTranslation);
languageRoute.delete("/:code/translations/:name", deleteT);

export default languageRoute;
