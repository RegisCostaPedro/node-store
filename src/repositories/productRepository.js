'use strict'
const { default: mongoose } = require("mongoose");
const Product = mongoose.model('Product');

exports.get = async() => {
        const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;

};

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
    return res;

};

exports.getById = async(id) => {
     const res = await Product.findById(id);
     return res;
}

// listar produtos pela tag
exports.getByTag = async(tags) => {
    const res = await Product
        .find({
            tags: tags,
            active: true
        }, 'title description price slug tags');
        return res;

}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}
exports.update = async(id, body) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: body.title,
            description: body.description,
            price: body.price,
            slug: body.slug,
        }
    });
}

exports.delete = async (id) => {
    
    await Product.findOneAndDelete(id);
}