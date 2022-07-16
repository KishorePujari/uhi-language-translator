const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

const port = process.env.PORT || 6000;

const {translate } = require('free-translate');

app.use(cors());

app.use(bodyParser.urlencoded({limit: '200mb',extended: true}));

app.use(bodyParser.json({limit: '200mb'}));

app.post("/", (req, resp) => {
    console.log('/POST');
    resp.status(200).send("HOME via POST");
});

app.get("/", (req, resp) => {
    console.log('/GET');
    resp.status(200).send("HOME");
});


app.post('/translate', async (req, resp) => {
    console.log("*******");
    if (req.body.text && req.body.text.length > 0) {
        if (!req.body.to) {
            req.body.to = "en";
        }
        if (req.body.to) {
            if (req.body.from) {

                (async () => {
                    const translatedText = await translate(req.body.text, {
                        from: req.body.from,
                        to: req.body.to
                    });
                    resp.status(200).send(translatedText);
                    console.log(translatedText); // こんにちは世界
                })();
            } else {

                (async () => {
                    const translatedText = await translate(req.body.text, {
                        to: req.body.to
                    });
                    console.log(translatedText); // これはカッコいい！
                    resp.status(200).send(translatedText);
                })();
            }
        } else {
            resp.status(404).send("Bad Request");
        }
    } else {
        resp.status(404).send("Bad Request");
    }
});
app.get("/translate",  (req, resp) => {
    console.log("*******");
    if (req.body.text && req.body.text.length > 0) {
        if (!req.body.to) {
            req.body.to = "en";
        }
        if (req.body.to) {
            if (req.body.from) {

                (async () => {
                    const translatedText = await translate(req.body.text, {
                        from: req.body.from,
                        to: req.body.to
                    });
                    resp.status(200).send(translatedText);
                    console.log(translatedText); // こんにちは世界
                })();
            } else {

                (async () => {
                    const translatedText = await translate(req.body.text, {
                        to: req.body.to
                    });
                    console.log(translatedText); // これはカッコいい！
                    resp.status(200).send(translatedText);
                })();
            }
        } else {
            resp.status(404).send("Bad Request");
        }
    } else {
        resp.status(404).send("Bad Request");
    }

});

app.use((req, res) => {
    res.status(404).send("Unknown request");
})
app.listen(port, () => {
    console.log(`On port ${port}`);
})