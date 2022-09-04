var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
var auth = require("../middleware/auth")();
router.get("/mypost",auth.authenticate(), (req,res)=>{
    res.json({message:'secret post'})
});

router.get('/success', auth.authenticate(), userController.getUser)
router.route('/todos')
    .get(auth.authenticate(),userController.getTodos)
    .post(auth.authenticate(),userController.postTodos)
    .delete(auth.authenticate(),userController.deleteTodos)

// router.route('/todos/complete')
    .put(auth.authenticate(),userController.CompleteTask);

router.route('/pomodo')
    .get(auth.authenticate(),userController.getPomodo)
    .post(auth.authenticate(),userController.postPomodo);


router.route('/pomodo/increament')
    .get(auth.authenticate(),userController.increamentPomodo);
    
router.get('/logout', userController.logout)

module.exports = router;
