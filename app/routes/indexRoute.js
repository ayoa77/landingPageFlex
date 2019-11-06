// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const csrf = require('csurf');
// const csrfProtection = csrf({ cookie: true });
const express = require("express");

const router = express.Router();

// router.get("/:lang(en|zh)", csrfProtection, indexController.get_index);
exports.get_index = (req, res, next) => {

  res.render('index', {_layoutFile:'layout',sessionFlash: false,
    csrfToken: false});
};

// exports.get_index = (req, res, next) => {
//   // console.log(req.hostname, 'hostname');
//   // console.log(req.headers.host, 'headers.host');
//   // console.log(req.originalUrl, 'originalUrl');
//   // console.log(req.get('host'), "get(host)");
//   // console.log(req.ip, 'ip');
//   console.log(req.query, "query");
//   const page = req.params.page || req.query.page || 1;
//   const perPage = req.query.perPage || 12;
//   const sort = req.params.sortBy || req.query.sortBy || "newest";
//   req.body.sortValues = { text: lang["index_sort_by_" + sort], value: sort };
//   const options = {
//     page: page,
//     limit: perPage,
//     lean: false,
//     sort: { _id: -1 },
//     populate: "submittedByUser variants images"
//   };
//   const query = {
//     sellType: req.body.sellType || req.query.sellType || "dropShipping",
//     location: req.localeCookie.location,
//     status: "approved"
//   };
//   parentSchema
//     .paginate(query, options)
//     .then(result => {
//       indexLoader(req, res, next, result, query);
//     })
//     .catch(err => {
//       console.log(err);
//       //  req.session.sessionFlash = {type: 'error', text: err};s
//       res.status(400).json({ message: err });
//     });
// };
// var indexLoader = function(req, res, next, result, query) {
//   filterSchema
//     .find({
//       location: req.localeCookie.location,
//       filterType: "brandCollection",
//       sellType: query.sellType || "dropShipping"
//     })
//     .sort({ parent: 1 })
//     .then(brands => {
//       // for (var i =0;i<brands.length;i++){
//       //   brands[i].children = Object.keys(brands.childSet);
//       // }
//       // if(!result.template){
//       console.log(query, "searchQuery");
//       res.render("index", {
//         location: req.localeCookie.location,
//         locale: lang,
//         query: query,
//         sortValues: req.body.sortValues,
//         searchQuery: query,
//         user: req.session.user,
//         lang: req.localeCookie.lang,
//         userDoc: req.session.user,
//         sessionFlash: res.locals.sessionFlash,
//         orders: [],
//         itemDocs: result.docs,
//         pages: result.pages,
//         current: result.page,
//         csrfToken: req.csrfToken(),
//         brands: brands
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       //  req.session.sessionFlash = {type: 'error', text: err};
//       res.status(400).json({ message: err });
//     });
// };
