const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const auditController = require('../app/controllers/auditController');
const authenticateUser = require('../app/middlewares/authenticate');

router.post('/user', userController.createUser);
router.get('/user', authenticateUser, userController.getUser);
router.put('/user/:id', authenticateUser, userController.updateUser);
router.delete('/user/:id', authenticateUser, userController.deleteUser);
router.get('/users', authenticateUser, userController.getUsers);
router.post('/login', userController.login);

router.get('/audits', authenticateUser, auditController.getAudits);



module.exports = router;