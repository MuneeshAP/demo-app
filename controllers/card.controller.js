const { Card, User } = require('../models');
const CONFIG = require('../config/config');
const { to, ReE, ReS, isValid, isNull, isEmpty } = require('../services/util.service');
const ObjectId = require('mongoose').Types.ObjectId;
const validator = require('validator')


const create = async function (req, res) {
    const reqCard = req.body;

    let err, card, cardNumbercheck;

    if (!ObjectId.isValid(req.user._id)) {
        return ReE(res, { message: "user id is wrong" ,status:400});
    }

    if (isNull(reqCard.bankName)) {
        return ReE(res, { message: 'Please provide Bank name',status:400 })
    }

    if (isNull(reqCard.cardNumber) || !validator.isLength(reqCard.cardNumber, 16, 16)) {
        return ReE(res, { message: 'Please provide valid 16 Digit Card number', status:400 })
    } else if (!isNull(reqCard.cardNumber) && validator.isLength(reqCard.cardNumber, 12, 12)) {
        [err, cardNumbercheck] = await to(Card.find({ 'cardNumber': reqCard.cardNumber }));
        if (err) return ReE(res, err, 500);
        else if (cardNumbercheck && !isEmpty(cardNumbercheck)) {
            return ReE(res, { message: 'This Card number already in use.so please provide vaild Id',status:400 })
        } else {
            reqCard.cardNumber = reqCard.cardNumber;
        }

    }

    if (isNull(reqCard.cvv) || !validator.isLength(reqCard.cvv, 3, 3)) {
        return ReE(res, { message: 'Please provide Valid 3 digit CVV number',status:400 })
    }

    if (isNull(reqCard.expMonth) || !validator.isLength(reqCard.expMonth, 2, 2)) {
        return ReE(res, { message: 'Please provide valid card expire Month' ,status:400})
    }

    if (isNull(reqCard.expYear)) {
        return ReE(res, { message: 'Please provide valid card expire year' ,status:400})
    }

    reqCard.CardHolder = req.user._id;

    [err, card] = await to(Card.create(reqCard));

    if (err) {
        return ReE(res, err, 500);
    } else {
        if (card) {
            return ReS(res, { message: 'Card details created.', card: card ,status:201 });
        } else {
            return ReE(res, { message: 'Something went wrong',status:400 })
        }

    }
}
module.exports.create = create;

const get = async function (req, res) {

    let err, data;

    if (!ObjectId.isValid(req.user._id)) {
        return ReE(res, { message: "user id is wrong" });
    }

    [err, data] = await to(Card.find({ 'CardHolder': req.user._id })
        .populate({ path: 'CardHolder', select: 'name email _id' }));

    if (err) {
        return ReE(res, err, 400);
    } else {
        if (data.length>=1) {
            return ReS(res, { cards : data ,username:req.user.username,email:req.user.email,status:201});
        } else if(data.length<1){
            return ReE(res, { message: "Card details are empty" ,status:400});
        } else {
            return ReE(res, { message: "card is not found", status:400 });
        }
    }
}
module.exports.get = get;