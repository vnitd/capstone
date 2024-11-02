import mongoose, { Schema } from "mongoose";

const { ObjectId, String } = Schema.Types;

const translationSchema = new Schema({
	language: {
		type: ObjectId,
		required: true,
		ref: "languages",
	},
	name: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

export default mongoose.model("translations", translationSchema);
