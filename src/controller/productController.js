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

// Function to get product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Validate the product ID format
        // if (!mongoose.Types.ObjectId.isValid(productId)) {
        //     return res.status(400).send({ status: false, message: "Invalid product ID format" });
        // }

        // Find the product by ID
        const product = await productModel.findById(productId);

        // Check if the product exists or is deleted
        if (!product || product.isDeleted) {
            return res.status(404).send({ status: false, message: "Product not found" });
        }

        // Respond with the product data
        return res.status(200).send({ status: true, message: 'Product fetched successfully', data: product });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


module.exports = { createProduct , getProductById }