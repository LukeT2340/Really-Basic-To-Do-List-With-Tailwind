const router = require('express').Router()
const ListItem = require('../models/listItem.model')

// Fetch all to-do list items
router.get("/fetchItems", async (req, res) => {
    try {
        const listItems = await ListItem.find({})
        return res.status(200).json(listItems)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occured on the server" })
    }
})

// Create new to-do item
router.post("/createItem", async (req, res) => {
    const { text } = req.body
    try {
        if (!text) {
            return res.status(400).json({ message: "Text field is required" });
        }

        const newItem = new ListItem({
            content: text
        })
        await newItem.save()
        return res.status(200).json(newItem)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occured on the server" })
    }
})

// Deletes to-do item
router.delete("/deleteItem/:itemId", async (req, res) => {
    const itemId = req.params.itemId
    try {
        const listItem = await ListItem.findById(itemId)
        if (!listItem) {
            return res.status(400).json({ message: "List item not found" })
        }
        await listItem.deleteOne()
        return res.status(200).json({ message: "Item deleted" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occured on the server" })
    }
})

// Updates to-do item
router.put("/updateItem", async (req, res) => {
    const { itemId, newText } = req.body
    try {
        const listItem = await ListItem.findById(itemId)
        if (!listItem) {
            return res.status(400).json({ message: "List item not found" })
        }
        listItem.content = newText
        await listItem.save()
        return res.status(200).json({ message: "List item updated" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "An error occured on the server" })
    }
})
module.exports = router