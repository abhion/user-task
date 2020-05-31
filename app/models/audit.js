const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditSchema = new Schema({
    action: {
        type: String,
        required: true,
        enum: ["LOGIN", "CREATE", "UPDATE", "DELETE"]
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now()
    }
});

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;