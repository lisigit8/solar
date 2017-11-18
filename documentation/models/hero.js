const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaTypes = mongoose.Schema.Types;

const schema = mongoose.Schema({
    id:{
        type: schemaTypes.Number,
        required: true
    },
    name:{
        type: String,
        required: true
    }
});

const Hero = module.exports = mongoose.model('Hero', schema);