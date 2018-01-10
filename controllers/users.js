const User = require('../models/schemas/user')
const Item = require('../models/schemas/item')

/*
* Helper Controllers
*/

/*
items: [{
        itemId: { type: Schema.ObjectId, ref: 'Item'},
        quantity: Number,
        price: Number
      }]
*/

exports.checkout = (req, res, next) => {
  // one atomic step
  var order = (req.body.items).slice()
  console.log(order)
  var callbacks = 0
  // GIANT for loop; moves on to next for loop after callbacks = order.length
  for (thing in order) {
    // make sure that you have these items and quantity in stock; if not, cancel whole order
    const id = order[thing].itemId
    console.log("id: " + id)
    Item.findById(id, (err, item) => {
      if (err) return next(err) // res.sendStatus(500)
      if (!item) return res.status(404).send('No item found')
      if (item.quantity < order[thing].quantity) return res.status(404).send('Not enough ' + req.body.items[thing].name + ' in stock')
      callbacks++
      if (callbacks == order.length) {
        // once all of the callbacks are done, move on to decrementing
        var callbacks2 = 0
        for (thing in order) {
          // decrement quantity of item in stock
          const id = order[thing].itemId
          Item.findOneAndUpdate({ _id: id }, {$inc: {quantity: -1 * order[thing].quantity}}, (err, item) => {
            if (err) return next(err)
            if (!item) return res.status(404).send('Couldn\'t find item')
            console.log('decreased quantity for ' + order[thing].itemId)
            order[thing].price = item.price

            callbacks2++
            if (callbacks2 == order.length) {
              // add items array to this userId's orders array
              User.findOneAndUpdate({ _id: req.params.userId }, {$push: {"orders": {items: order, purchasedDate: new Date(), isPaid: false, deliveredDate: null}}}, (err, item) => {
                if (err) return next(err)
                if (!item) return res.status(404).send('Couldn\'t find item')
                console.log('added to user array')
              })
              
              return res.status(200).send("Done")
            }
          })
          console.log("updated!")
        }
      }

    })
  }
  // end atomic step
}


/*
* C.R.U.D. Controllers
*/
exports.createUser = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send('Must provide email')
  }
  if (!req.body.password) {
    return res.status(400).send('Must provide valid password')
  }
  if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
<<<<<<< HEAD
  if (!req.body.address) {
    return res.status(400).send('Must provide address')
  }
  if (!req.body.classYear) {
    res.status(400).send('Must provide class year')
=======
  if (!req.body.phoneProvider) {
   return res.status(400).send('Must provide phone provider') 
  }
  if (!req.body.phoneNumber) {
   return res.status(400).send('Must provide phone number') 
  }
  if (!req.body.classYear) {
   return res.status(400).send('Must provide class year') 
>>>>>>> 7df4e59f4aa2e75fa8e73a1223169ed91f35e9c9
  }
  const userData = {
    email: req.body.email,
    hash: req.body.password,
    name: req.body.name,
<<<<<<< HEAD
    isAdmin: req.body.isAdmin,
    address: req.body.address,
    classYear: req.body.classYear,
    orders: [],

  }
  const newUser = new User(userData)
  newUser.save((err) => {
    if (err) return next(err) // res.status(500).send('Could not create')
=======
    phoneProvider: req.body.phoneProvider,
    phoneNumber: req.body.phoneNumber,
    classYear: req.body.classYear,
  }
  const newUser = new User(userData)
  newUser.save((err) => {
    if (err) return next(err)
>>>>>>> 7df4e59f4aa2e75fa8e73a1223169ed91f35e9c9
    return res.json(newUser)
  })
}

exports.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
<<<<<<< HEAD
    if (err) return next(err) // res.status(500).send('Error: ' + err)
=======
    if (err) return next(err)
>>>>>>> 7df4e59f4aa2e75fa8e73a1223169ed91f35e9c9
    return res.json(users)
  })
}

exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
<<<<<<< HEAD
    if (err) return next(err) // res.sendStatus(500)
=======
    if (err) return next(err)
>>>>>>> 7df4e59f4aa2e75fa8e73a1223169ed91f35e9c9
    if (!user) return res.status(404).send('No user with id: ' + req.params.userId)
    return res.json(user)    
  })
}

exports.getUserByEmail = (req, res, next) => {
  User.findOne({ email: req.params.email }, (err, user) => {
<<<<<<< HEAD
    if (err) return next(err) // res.sendStatus(500)
=======
    if (err) return next(err)
>>>>>>> 7df4e59f4aa2e75fa8e73a1223169ed91f35e9c9
    if (!user) return res.status(404).send('No user with email: ' + req.params.email)
    return res.json(user)    
  })
}

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.userId }, req.body, {}, (err, user) => {
<<<<<<< HEAD
    if (err) return next(err) // res.sendStatus(500)
=======
    if (err) return next(err)
>>>>>>> 7df4e59f4aa2e75fa8e73a1223169ed91f35e9c9
    if (!user) return res.status(404).send('Could not find user: ' + req.params.userId)
    return res.send('Updated user!')
  })
}
exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err, user) => {
    if (err) return next(err) // res.sendStatus(500)
    if (!user) return res.status(404).send('Could not find user ' + req.params.userId)
    return res.json(user)
  })
}
