'use strict';

var _ = require('lodash');
var Partnership = require('./partnership.model');

// Get list of partnerships
exports.index = function(req, res) {
  Partnership.find(function (err, partnerships) {
    if(err) { return handleError(res, err); }
    return res.json(200, partnerships);
  });
};

// Get a single partnership
exports.show = function(req, res) {
  Partnership.findById(req.params.id, function (err, partnership) {
    if(err) { return handleError(res, err); }
    if(!partnership) { return res.send(404); }
    return res.json(partnership);
  });
};

// Creates a new partnership in the DB.
exports.create = function(req, res) {
  Partnership.create(req.body, function(err, partnership) {
    if(err) { return handleError(res, err); }
    return res.json(201, partnership);
  });
};

// Updates an existing partnership in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Partnership.findById(req.params.id, function (err, partnership) {
    if (err) { return handleError(res, err); }
    if(!partnership) { return res.send(404); }
    var updated = _.merge(partnership, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, partnership);
    });
  });
};

// Deletes a partnership from the DB.
exports.destroy = function(req, res) {
  Partnership.findById(req.params.id, function (err, partnership) {
    if(err) { return handleError(res, err); }
    if(!partnership) { return res.send(404); }
    partnership.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}