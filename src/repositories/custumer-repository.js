'use strict'
const { default: mongoose } = require("mongoose");
const Custumer = mongoose.model('Custumer');

exports.get = async() => {
        const res = await Custumer.find({
        
    }, 'name email password');
    return res;

};

exports.create = async(data) => {
    var custumer = new Custumer(data);
    await custumer.save();
}