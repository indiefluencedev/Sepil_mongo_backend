const productModel = require("../models/productModel");
const {isValid} = require("../validator/validator");

const createProduct = async function (req, res) {
    try {
        const data = req.body;
        console.log(data);
        let { name, description, price } = data;
        if (name) {
            if (!isValid(name)) return res.status(400).send({ status: false, message: "Name is in incorrect format" })
            let isUniqueName = await productModel.findOne({ name: name });
            if (isUniqueName) {
                return res.status(400).send({ status: false, message: "This Name is being used already" })
            }
        } else return res.status(400).send({ status: false, message: "Name must be present" })

        if (description) {
            if (!isValid(description)) return res.status(400).send({ status: false, message: "description is in incorrect format" })
        } else return res.status(400).send({ status: false, message: "description must be present" })

        //price validation
        if (!price || price == 0) return res.status(400).send({ status: false, message: "price cannot be empty" })
        if (!Number(price)) return res.status(400).send({ status: false, message: "price should be in valid number/decimal format" })
        data.price = Number(price).toFixed(2)

        const createdProduct = await productModel.create(data)

        return res.status(201).send({ status: true, message: 'Success', data: createdProduct })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getProductById = async function(req, res) {
    try {
        let productId = req.params.productId
        if(!productId)  return res.status(400).send({ status: false, message: "ProductId is required" })
        if (!isValid(productId)) return res.status(400).send({ status: false, message: "Incorrect productId" })
        if (!productId.match(objectid)) return res.status(400).send({ status: false, message: "Incorrect productId" })

        let product = await productModel.findById(productId)
        if(!product || product.isDeleted == true)    return res.status(404).send({ status: false, message: "Product not found" })

        return res.status(200).send({ status: true,message: 'Success', data: product })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createProduct , getProductById }