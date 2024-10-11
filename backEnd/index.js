import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL)

let todolists;

const main = async()=>{
    await client.connect()
    console.log('Successfully connected with database')
    todolists = client.db("tododatabase").collection("todolists")
}

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    const data = await todolists.find().toArray()
    res.send({
        status:200,
        data
    })
})

app.post("/",async (req,res)=>{
    // console.log("Post start")
    let ipvalue = req.body.ipvalue
    await todolists.insertOne({ipvalue})
    res.status(200).json({status:true})        
})

app.put('/', async (req,res)=>{{
    // console.log(req.body)
    const {ipvalue} = req.body
    const index = req.query.index
    console.log(req.query.index)
    await todolists.updateOne({_id:new ObjectId(index)},{$set:{ipvalue}})
    res.status(200).json({ status: true })
}})

app.delete('/:index',async (req,res)=>{
    const {index} = req.params
    await todolists.deleteOne({_id:new ObjectId(index)})
    res.status(200).json({ status: true })
})

// get post put delete

const startserver = async()=>{
    await main()
    app.listen(5000,()=>{
        console.log('server started on 5000')
    })
}
startserver()
