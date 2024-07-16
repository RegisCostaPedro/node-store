'use strict'
const { default: mongoose } = require("mongoose");
const Custumer = mongoose.model('Custumer');
const bcrypt = require('bcrypt');
exports.get = async() => {
        const res = await Custumer.find({
        
    }, 'name email password');
    return res;

};

exports.create = async(data) => {
    var custumer = new Custumer(data);
    await custumer.save();
}


exports.authenticate = async (data) => {
    const custumer = await Custumer.findOne({ email: data.email });
    if (!custumer) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(data.password, custumer.password);
    if (!isPasswordValid) {
        return null;
    }

    return custumer;
};