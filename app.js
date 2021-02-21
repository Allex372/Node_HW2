const express = require('express');
const expressHbs = require('express-handlebars');
const app = express();
const fs = require('fs');
const path = require('path');
const userPath = path.join(__dirname, 'userMass', 'users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'views'));

app.listen(5000, () => {
    console.log('Server 5000 turbo is working======================================================================================================');
});

app.get('/errorLogination', (req, res) => {
    res.render('errorLogination');
});

app.get('/errorRegistration', (req, res) => {
    res.render('errorRegistration');
});
app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', (req, res) => {
    fs.readFile(userPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(data);
        const parseData = JSON.parse(data.toString());
        let asame = parseData.find(value => value.login === req.body.login);
        // parseData.forEach(value => {
        //     console.log(value)
        // });
        if (asame) {
            res.redirect('/errorRegistration');
        } else {
            parseData.push(req.body);
            fs.writeFile(userPath, JSON.stringify(parseData), err1 => {
                if (err1) {
                    console.log(err1);
                    return;
                }

            })
            // res.json('Hello REG .hbs');
            res.redirect('/users');
        }
    })
});

app.get('/users', (req, res) => {
    fs.readFile(userPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let dataParse = JSON.parse(data.toString());
        res.render('users', {dataParse});
    })
})

app.get('/logination', (req, res) => {
    res.render('logination');
});

app.get('/users/:userId', (req, res) => {
    fs.readFile(userPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        let dataParse = JSON.parse(data.toString());
        const {userId} = req.params;
        console.log(req.params)
        res.render('user', {user: dataParse[userId]})
    })
})

app.post('/logination', (req, res) => {
    fs.readFile(userPath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const parseDataLogin = JSON.parse(data.toString());
        let index = parseDataLogin.findIndex(value => value.login === req.body.login && value.password === req.body.password)
        if (index !== -1) {
            res.redirect(`/users/${index}`);
            return;
        }
        res.redirect('/errorLogination');
    })
})





