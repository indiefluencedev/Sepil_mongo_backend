const userModel = require("../models/userModel");
const {
    isValid,
    isValidbody,
    nameRegex,
    emailRegex,
    isValidPassword,
    phoneRegex,
    isValidPincode
} = require("../validator/validator");

const registeruser = async function (req, res) {
    try {
        let data = req.body;
        console.log(req.body);

        if (!isValidbody(data)) {
            return res.status(400).send({ status: false, message: "Please enter valid data in the body" });
        }

        const { fname, lname, email, phone, password, address } = data;

        //****************************************************NAME VALIDATION*******************************************************/

        if (!isValid(fname) || !nameRegex.test(fname)) {
            return res.status(400).send({ status: false, message: "First name is required and should contain only alphabets" });
        }

        if (!isValid(lname) || !nameRegex.test(lname)) {
            return res.status(400).send({ status: false, message: "Last name is required and should contain only alphabets" });
        }

        //************************************************EMAIL VALIDATION*******************************************************/

        if (!isValid(email) || !emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid email" });
        }

        const emailCheck = await userModel.findOne({ email });
        if (emailCheck) {
            return res.status(400).send({ status: false, message: "Email is already in use" });
        }

        //***********************************************PHONE VALIDATION***************************************************** */

        if (!isValid(phone) || !phoneRegex.test(phone)) {
            return res.status(400).send({ status: false, message: "Please enter a valid phone number" });
        }

        const phoneCheck = await userModel.findOne({ phone });
        if (phoneCheck) {
            return res.status(400).send({ status: false, message: "Phone number is already in use" });
        }

        //************************************************PASSWORD VALIDATION************************************************** */

        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Password should be between 8 and 15 characters" });
        }

        //*************************************************ADDRESS VALIDATION************************************************** */

        if (!address || typeof address !== "object") {
            return res.status(400).send({ status: false, message: "Address must be provided and be a valid object" });
        }

        // Helper function for checking address structure
        const validateAddressField = (field, fieldName) => {
            if (!field) return `${fieldName} is required`;
            if (!isValid(field)) return `${fieldName} is invalid`;
            return null;
        };

        // Validate shipping address
        let shippingErrors = [
            validateAddressField(address.shipping?.street, "Shipping street"),
            validateAddressField(address.shipping?.city, "Shipping city"),
            validateAddressField(address.shipping?.pincode, "Shipping pincode")
        ].filter((error) => error);

        if (shippingErrors.length) {
            return res.status(400).send({ status: false, message: shippingErrors.join(", ") });
        }

        if (!isValidPincode(address.shipping.pincode)) {
            return res.status(400).send({ status: false, message: "Shipping pincode must be a 6-digit number" });
        }

        // Validate billing address
        let billingErrors = [
            validateAddressField(address.billing?.street, "Billing street"),
            validateAddressField(address.billing?.city, "Billing city"),
            validateAddressField(address.billing?.pincode, "Billing pincode")
        ].filter((error) => error);

        if (billingErrors.length) {
            return res.status(400).send({ status: false, message: billingErrors.join(", ") });
        }

        if (!isValidPincode(address.billing.pincode)) {
            return res.status(400).send({ status: false, message: "Billing pincode must be a 6-digit number" });
        }

        //*************************************************USER CREATION************************************************** */

        const createdUser = await userModel.create(data);

        return res.status(201).send({ status: true, message: "User created successfully", data: createdUser });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = { registeruser };
