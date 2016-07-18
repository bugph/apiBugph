var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

var bugs = [];

app.get('/api/bugs', function (req, res) {
  res.jsonp(bugs.filter(function(bug) {
  	return bug.data >= moment().add(-1, 'hours').format("YYYYMMDDHHmmss");
  }));

});
app.get('/api/novos', function (req, res) {
  var data = req.query.ultimo;
  var novosBugs = bugs.filter(function(bug) {
  	return bug.data > data;
  })
  res.jsonp(novosBugs.length);
});
app.post('/api/bug', function (req, res){
	req.body.data = moment().format("YYYYMMDDHHmmss");
	bugs.unshift(req.body);
	res.send();
});

app.get('/api/interacoes', function (req, res){
  var interacoes = [];
  for(i in bugs){
    interacoes.push({
      data: bugs[i].data,
      kkk: bugs[i].kkk,
      putz: bugs[i].putz,
      comentarios: bugs[i].comentarios,
    })
  }
  res.jsonp(interacoes);
});
app.post('/api/kkk', function (req, res){
  for(i in bugs){
    if(bugs[i].data == req.body.data){
      bugs[i].kkk++;
    }
  }
  res.send();
});
app.post('/api/putz', function (req, res){
  for(i in bugs){
    if(bugs[i].data == req.body.data){
      bugs[i].putz++;
    }
  }
  res.send();
});

app.post('/api/comentario', function (req, res){
  for(i in bugs){
    if(bugs[i].data == req.body.data){
      bugs[i].comentarios.push(req.body.comentario);
    }
  }
  res.send();
});

app.listen(8090, function () {
  console.log('WEB API SERVER rodando na porta!');
});
