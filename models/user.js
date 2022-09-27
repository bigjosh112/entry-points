const mongoose = require('mongoose');
const CompletedSchema = new mongoose.Schema(
{
gender: { type: String, enum: ['male', 'female']},
is_online: { type: Boolean},
siblings: [String],
name: { type: String, required: true },
age: {type: Number},
occupation: {type: String},
dob: {type: Number}
},
{ collection: 'completed' }
)

const model = mongoose.model('Completed', CompletedSchema);
module.exports = model;