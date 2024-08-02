const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

const SECRET_KEY = '202110120036_ProyectoPWII';

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).send('El Token es necesario para esta operación');
        return;
    }
    const [type, token] = authHeader.split(' ');

    if(type !== 'Bearer'){
        res.status(401).send('Tipo de Autorización no válida');
        return;
    }

    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).send('Token Inválido');
        return;
    }
}

exports.signUp = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Email y Contraseña son campos obligatorios"});
        }

        const exisEmail = await User.findOne({ email });
        if(exisEmail){
            return res.status(400).json({message: "El Email ya se encuentra en uso"});
        }

        const user = new User({email, password});
        const savedUser = await user.save();

        const payload = {id: savedUser.id, email: savedUser.email};
        const token = jwt.sign(payload, SECRET_KEY);
        
        res.status(201).json({user: savedUser, token});
    }catch(err){
        console.log(err);
        res.status(500).send("signUp: Hubo un error: " + err);
    }
}

exports.login = async(req, res) =>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(401).send('Email o contraseña incorrecta');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            res.status(401).send('Email o contraseña incorrecta');
        }else{
            const payload = {id: user.id, email: user.email};
            const token = jwt.sign(payload, SECRET_KEY);
            res.json({user, token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send("login: Hubo un error: " + err);
    }
}