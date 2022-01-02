import express from "express";
import {Request, Response} from "express";
import { addUser, editUser } from "../DTO/users";
import controllerUser from '../controllers/users';
import db from '../config/ddbb';
import authtoken from '../config/authtoken';


const router = express.Router();

router.post("/login", (req: Request, res: Response)=>{

	controllerUser.login(req, res);

});


router.get("/info", [authtoken], (req: Request, res: Response)=>{

	controllerUser.info(req, res);

});


router.post("/add", (req: Request, res: Response)=>{

	controllerUser.add(req, res);

});


router.delete("/delete", [authtoken], (req: Request, res: Response)=>{

	controllerUser.del(req, res);

});

router.put("/edit", [authtoken], (req: Request, res: Response)=>{

	controllerUser.edit(req, res);

});

router.put("/change_password", [authtoken], (req: Request, res: Response)=>{

	controllerUser.change_password(req, res);

});

router.put("/recovery_password/:id", [authtoken], (req: Request, res: Response)=>{

	controllerUser.recovery_password(req, res);

});


router.get("/test", (req: Request, res: Response)=>{

	//controllerUser.test(req, res);
	res.json({
		status:true
	});

});

export default router;
