const express = require('express');
const expressHbs = require('express-handlebars');
const app = express();
const fs = require('fs');
const path = require('path');
const userPath = path.join(__dirname + '/userMass/users.json');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', '.hbs')
app.engine('.hbs', expressHbs({
    defaultLayout: false
}))
app.set('views', path.join(__dirname, 'views'))

app.listen(5000, () => {
    console.log('Server 5000 turbo is working')
});

app.get('/registration', (req, res) => {
    res.render('registration')
});

app.post('/registration', (req, res) => {
    console.log('****************************************************')
    console.log(req.body)
    console.log('****************************************************')
    res.json('Hello REG .hbs')
    fs.readFile(userPath, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log('_________________________________________')
        console.log(data)
        console.log('_________________________________________')

        let dataJson = JSON.parse(data.toString());

        console.log(dataJson)

        // let audit = dataJson.forEach()
        // fs.writeFile(userPath, JSON.stringify(dataJson), err => {
        //     if (err) {
        //         console.log(err);
        //     }
        // })
        // res.redirect('/users');
    })
});

// app.get('/users', (req, res) => {
//     res.render('users', {mass})
// })

//function read...
// function readUserMass(userPath){
//     fs.readdir(userPath,(err, files) => {
//         for (const file of files) {
//             fs.readFile(file, (err1, data) => {
//                 if (err1){
//                     console.log(err1)
//                 }
//             })
//         }
//
//     })
// }
// readUserMass(userPath)

// app.get('/hello', (req, res) => {
//     res.send('HELLO WORLD')
// });
//
// app.get('/users', (req, res) => {
//     res.json([
//         {name: "Oleg", gender: "male", age: 17},
//         {name: "Petro", gender: "male", age: 18},
//         {name: "Andriy", gender: "male", age: 19},
//         {name: "Ostap", gender: "male", age: 21},
//         {name: "Egor", gender: "male", age: 22},
//         {name: "Alina", gender: "female", age: 18},
//         {name: "Marina", gender: "female", age: 18},
//         {name: "Anastasia", gender: "female", age: 23},
//         {name: "Milena", gender: "female", age: 24},
//         {name: "Princes", gender: "female", age: 25}
//     ])
// })
