const express = require('express');
const uuid = require('uuid');
const members = require('../the-mmm');
const route = express.Router();


//my endpoints will go here

// fetch all members
route.get('/all-users', (req, res) => {
    
    let msg = 'Success';
    let count = members.length;
    if (count === 0)
        msg = 'There are no members';
    return res.status(200).send({msg, count, members});
});


//sign up
route.post('/Sign_up', (req, res) => {
    //object destructuring

    const {name, email, dob, gender, telephone, password} = req.body;
 
    if(!name || !email|| !gender || !dob || !telephone || !password)
        return res.status(400).send({'status': 'error', 'msg': 'All field must be entered'});


        //check  the email validation 
    const valid = /@gmail.com/.test(email)
    if (!valid) 
        return res.status(400).send({status: 'error', msg: 'Enter the right email'});

    
    //check paswword length
    if (password.length < 7)
        return res.status(400).send({status: 'error', msg: 'The length of the password is too short'})
    
    const count = members.push({
        id: uuid.v1(),
        name,
        email,
        dob,
        gender,
        telephone,
        password,
        is_online: false
    });

    return res.status(200).send({status: 'ok', msg: 'Success', count, members });

});

// //edit profile

route.put('/edit',(req, res) => {
    const {name, email, dob, telephone, id, is_online} = req.body;

    //check if there was any id sent by the client
    if(!id)
        return res.status(400).send({status: 'error', msg: 'Please enter id'});

    //check if user exist
    let index = -1;
    const found = members.some((memeeber) => {
        index++;
        return memeeber.id === id;

    });

    //check if the user with that id exists
    if(!found)
        return res.status(404).send({'status': 'error', 'msg': `No user with id ${id} exists`});

    const [memeeber] = members.filter((memeeber) => {
        return memeeber.id === id;
    });

    memeeber.name = name ? name: memeeber.name;
    memeeber.email = email ? email: memeeber.email;
    memeeber.dob = dob ? dob: memeeber.dob;
    memeeber.dob = telephone ? telephone: memeeber.telephone;
    //memeeber.dob = password ? password: memeeber.password;
    memeeber.dob = dob ? dob: memeeber.do;
    memeeber.is_online = is_online ? is_online: memeeber.is_online;

    members[index] = memeeber;

    return res.status(200).send({'status': 'ok', msg: 'Successful updates', members});
});


//view a single member by id

route.post('/single_member', (req,res) => {
    const {id} = req.body;

    //check if there was any id sent by the client
    if(!id)
        return res.status(400).send({'status': 'error', 'msg': 'Please enter id'});

    const nMembers = members.filter((memberrr) => memberrr.id === id);
    if(nMembers.length === 0)
        return res.status(404).send({status: 'error', msg: `No user with id ${id}`});

    return res.status(200).send({status: 'ok', msg: 'Success', memberrr: nMembers[0]});
})

// //login 
route.post('/login', (req,res) => {
    // try {
    //     const salt = await bcrypt.genSalt()
    //     const hashedPassword = await bcrypt.hash(req.body.create_password, salt)
    //     const user = {password:hashedPassword}
    //     console.log(hashedPassword);
    //     const { password} = req.body;
    // } catch {
    //     res.status(500).send()
    // }
    const {email, password} = req.body;
    if(!email || !password)
        return res.status(400).send({status: 'error', msg: 'Please enter the right information'});

        const count = members.push({
            email,
            password
        });

        return res.status(200).send({'status': 'ok', 'msg': 'Success', count, members });
})
    
     

module.exports = route;