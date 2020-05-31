
const Audit = require('../models/audit');

module.exports = {
    createAudit:  ({action, actionBy}) => {
        const audit = new Audit({action, userId: actionBy});
        audit.save()
        .catch(err => console.log(err));
    },
    
     getAudits: (req, res) => {
        Audit.find()
            .then(audits => res.json(audits))
            .catch(err => console.log(err))
    }
};