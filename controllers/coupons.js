const Coupon = require('../models/schemas/coupon')

/*
name: String,
    description: String,
    isApproved: Boolean,
    url: String,
    startDate: Date,
    endDate: Date,
    tags: [String],
    views: Number,
    businessId: { type: Schema.ObjectId, ref: 'User' }
*/

exports.createCoupon = (req, res, next) => {
  const props = ['name', 'description', 'url', 'startDate', 'endDate', 'businessId']
  props.forEach((prop) => {
    if (!req.body[prop]) return res.status()
  })
  const couponData = {
    name: req.body.name,
    description: req.body.description,
    isApproved: false,
    url: req.body.url,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    businessId: req.body.businessId  
  }
  const newCoupon = new Coupon(couponData)
  newCoupon.save((err) => {
    if (err) return next(err)
    return res.json(newCoupon)
  })
}

// Gets all coupons from db where startDate < now, endDate > now
exports.getActiveCoupons = (req, res, next) => {
  const now = new Date()
  Coupon.find({
    $and: [
      { startDate: {$exists: true } }
      { startDate: { $lt: now } },
      { endDate: { $gt: now } }
    ]
  })  
}