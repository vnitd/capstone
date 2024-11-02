import mongoose, { Schema } from "mongoose";

const { String } = Schema.Types;

const languageSchema = new Schema({
	code: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	direction: {
		type: String,
		required: true,
	},
});

export default mongoose.model("languages", languageSchema);
