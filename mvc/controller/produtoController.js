const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const produtoModel = require("../model/produto");
module.exports = {
 index: async function(req, res) {
 let dados = await produtoModel.findAll();
 res.render('produto/mostraProduto', {dadosProduto: dados});
 },

 create: function(req, res) {
 res.render('produto/adicionaProduto');
 },

 store: async function(req, res) {
 var formidable = require('formidable');
 var form = new formidable.IncomingForm();
 form.parse(req, (err, fields, files) => {
 var oldpath = files.imagem[0].filepath;
 var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
 var ext = path.extname(files.imagem[0].originalFilename)
 var nomeimg = hash + ext
 var newpath = path.join(__dirname, '../public/imagens/', nomeimg);
 fs.rename(oldpath, newpath, function (err) {
 if (err) throw err;
 });
 const resultadoCadastro = produtoModel.create({
 nome: fields['nome'][0], descricao: fields['descricao'][0], imagem: nomeimg
 })
 res.redirect('/')
 })
 },

 edit: async function(req, res) {
 var id= req.params.id;
 let dados = await produtoModel.findAll({
 where: {
 id: id
 }
 })
 res.render('produto/editaProduto', {dadosProduto: dados});
 },

 update: function (req, res) {
 var id = req.params.id;
 var nome = req.body['nome'];
 var descricao = req.body['descricao'];
 produtoModel.update(
 { nome: nome, descricao: descricao },
 {
 where: { id: id }
 }
 );
 res.redirect('/');
 },
destroy: async function(req, res) {
 var id = req.params.id;
 produtoModel.findAll({
 where: { id: id }
 }).then(result=>{
 var img = path.join(__dirname, '../public/imagens/', result[0]['imagem']);
 fs.unlink(img, (err) => {});
 })
 .catch(err=>
 console.error(err)
 );
 produtoModel.destroy({
 where: { id: id }
 });
 res.redirect('/');
 }
 }
