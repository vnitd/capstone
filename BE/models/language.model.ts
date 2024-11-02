import { ObjectId } from "mongoose";

export interface Translation {
	_id?: ObjectId;
	language?: ObjectId;
	name: string;
	content: string;
}

export interface Language {
	_id?: ObjectId;
	code: string;
	name: string;
	direction: string;
	contents?: Translation[];
}
