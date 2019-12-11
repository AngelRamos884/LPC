const app = require('express');
const api = app.Router();

const pulseCtrl = require('../controllers/pulseCtrl');

api.get('/getPulse', pulseCtrl.getPulse);
api.post('/getByRoomByUser', pulseCtrl.getByRoomByUser);
api.get('/getParams', pulseCtrl.getParams);

module.exports = api;