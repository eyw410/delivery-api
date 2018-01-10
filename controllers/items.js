const Item = require('../models/schemas/item')

/*
* C.R.U.D. Controllers
*/
exports.createItem = (req, res) => {
	if (!req.body.name) {
    return res.status(400).send('Must provide name')
  }
  if (!req.body.price) {
    return res.status(400).send('Must provide valid price')
  }
  if (!req.body.description) {
    return res.status(400).send('Must provide description')
  }
  if (!req.body.quantity) {
    return res.status(400).send('Must provide quantity')
  }
  const itemData = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    pic: req.body.pic,
    quantity: req.body.quantity
  }
  const newItem = new Item(itemData)
  newItem.save((err) => {
    if (err) return res.status(500).send('Could not create')
    return res.json(newItem)
  })
}

exports.getAllItems = (req, res) => {
  Item.find({}, (err, items) => {
    if (err) return res.status(500).send('Error: ' + err)
    return res.json(items)
  })
}

exports.getItemById = (req, res) => {
  Item.findById(req.params.itemId, (err, item) => {
    if (err) return res.sendStatus(500)
    if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
    return res.json(item)    
  })
}

exports.updateItem = (req, res) => {
  Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, {}, (err, item) => {
    if (err) return res.sendStatus(500)
    if (!item) return res.status(404).send('Could not find item: ' + req.params.itemId)
    return res.json(item)
  })
}
exports.deleteItem = (req, res) => {
  Item.findByIdAndRemove(req.params.itemId, (err, item) => {
    if (err) return res.sendStatus(500)
    if (!item) return res.status(404).send('Could not find item ' + req.params.itemId)
    return res.json(item)
  })
}