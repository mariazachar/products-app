const express = require('express');
const router = express.Router(); // θα φερεις ολες τις ιδιοότητες της express που αφορουν το router

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);
router.get('/:username', userController.findOne);
router.post('/', userController.create);
router.patch('/:username', userController.update);
router.delete('/:username', userController.delete);


module.exports = router;
// για να διαβαστουνε οι κλήσεις απο αλλες σελιδες (index) θα πρεπει να τις κανω και ευτες export
// για αυτο λέω module.export ολες τις διαδικασίες που υπάρχουν στη σελιδα router