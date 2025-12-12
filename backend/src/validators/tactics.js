import Joi from "joi";

const tacticSchema = Joi.object({
  user: Joi.string().required(),
  map: Joi.string().valid("Dust2", "Mirage", "Inferno", "Nuke", "Train", "Overpass", "Ancient").required(),
  side: Joi.string().valid("CT", "T").required(),
  zone: Joi.string().valid("Bombsite A", "Bombsite B", "Other").required(),
  description: Joi.string().min(1).max(200).required().trim(),
  effectiveness: Joi.string().valid("Low", "Mid", "High").required(),
});

export const validateTactic = (data) => tacticSchema.validate(data);
