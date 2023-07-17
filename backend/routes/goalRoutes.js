const express = require('express');
const router = express.Router();
const { getGoals,setGoals,updateGoals,deleteGoals } = require('../controllers/goalsController');
const {protect} = require('../middleware/authMiddleware')

//Better way

router.route("/").get(protect,getGoals).post(protect,setGoals);
router.route("/:id").put(protect,updateGoals).delete(protect,deleteGoals);


/* One-way
router.get('/',getGoals)

router.post('/',setGoals)

router.put('/:id',updateGoals)

router.delete('/:id',deleteGoals)*/

module.exports = router