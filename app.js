const express = require("express");
const bp = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bp.urlencoded({ extended: true }));

app.listen(process.env.PORT || port, () => {
  console.log(`server running on port: ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/singup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const list_id = "c3ed2d2904";
  const apiKey = "757540ee1ac29fff11bf780b2b251e05-us21";
  const option = {
    method: "POST",
    auth: `DenisB:${apiKey}`,
  };
  const url = `https://us21.api.mailchimp.com/3.0/lists/${list_id}`;
  const request = https.request(url, option, (response) => {
    if (response.statusCode === 200){
        res.sendFile(__dirname + '/success.html')
    } else{
        res.sendFile(__dirname + '/failure.html')
    }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  console.log(firstName, lastName, email)
});


app.post('/failure', (req,res) =>{
    res.redirect('/')
})

//api Key
//757540ee1ac29fff11bf780b2b251e05-us21

// audience ID
//c3ed2d2904
