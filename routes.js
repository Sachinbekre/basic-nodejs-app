const fs = require('fs');

const routes = (req, res) => {
    console.log("server hitting");
  if (req.url === "/") {
    return setHomePage(req, res);
  }
  if (req.url === "/username" && req.method.toLowerCase() == "post") {
    return submitUsername(req, res);
  }
};

function setHomePage(req,res) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
    <html>
    <head><title>welcome nodejs learner</title></head>
    <body>
    <form action='/username' method='post'>
    <div>
    <label>User Name : </label>
    <input type='text' name='username'/>
    </div>
    <div>
    <input type='submit' value='send'/>
    </div>
    </form>
    </body>
    </html>
    `);
}

function submitUsername(req,res) {
    res.setHeader('Content-Type', 'text/html');
    // return res.end(`<div>Welcome to home page</div>`);
    // res.statusCode = 302;
    // res.setHeader('Location','/');
    const body = [];
    req.on('data', (data) =>{
        body.push(data);
    });
    req.on('end', () =>{
       const requestBody = Buffer.concat(body).toString();
       const userName = requestBody.split('=')[1];
       fs.writeFileSync('username.txt',userName,() =>{
        return res.end();
       });

    })
   
}

module.exports = { routes, Text:'hello'};