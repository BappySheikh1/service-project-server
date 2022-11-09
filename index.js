const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const app = express();
const port =process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())

// Jwt token

const uri = process.env.MONGODB_USER_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  const pictureCollection =client.db('assignmentProject').collection('pictures')

  const userCollection =client.db('assignmrntProject').collection('Services')

 

  const userPostCollection =client.db('assignmrntProject').collection('usersPost')

  // jwt token


  // get pictureCollection data
  app.get('/pictures',async(req,res)=>{
    const query={}
    const cursor = pictureCollection.find(query)
    const pictures=await cursor.toArray()
    res.send(pictures)
  })

  // get database services data limit 
app.get('/services/limit',async (req,res)=>{
  const query={}
  const cursor = userCollection.find(query)
  const services=await cursor.limit(3).toArray()
  res.send(services)
})

// get full data from database
app.get('/services',async (req,res)=>{
  const query={}
  const cursor = userCollection.find(query)
  const services=await cursor.toArray()
  res.send(services)
})

// post servicePost data
app.post('/servicePost',async (req,res)=>{
  const user =req.body
  const AddServices=await userCollection.insertOne(user)
  res.send(AddServices)
})

// get single data
app.get('/services/:id',async(req,res)=>{
  const id =req.params.id;
  const query={_id: ObjectId(id)}
  const result = await userCollection.findOne(query)
  res.send(result)
})

// Post method Review start
 app.get('/review',async(req,res)=>{
 let query={}
 if(req.query.email){
  query={
    email : req.query.email
  }
 }
  const cursor= userPostCollection.find(query)
  const reviewer=await cursor.toArray()
  res.send(reviewer)
 })

 app.post('/review',async(req,res)=>{
  const user =req.body
  const reviewPost= await userPostCollection.insertOne(user)
  res.send(reviewPost)
 })

 app.get('/review/:id',async(req,res)=>{
  const id =req.params.id
  const query={_id: ObjectId(id)}
  const reviewId=await userPostCollection.findOne(query)
  res.send(reviewId)
 })
 app.delete('/review/:id',async(req,res)=>{
  const id =req.params.id
  const query={_id: ObjectId(id)}
  const reviewId=await userPostCollection.deleteOne(query)
  res.send(reviewId)
 })

 //updateta
 app.put('/review/:id',async (req,res)=>{
  const id=req.params.id
  const filter={_id: ObjectId(id)}
  const user=req.body
  const updateUser = {
    $set: {
      user_name: user.name,
      description :user.message
    },
  };
  const result=await userPostCollection.updateMany(filter,updateUser)
  res.send(result)
 }) 
//  Post method review end

}
run().catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send('assignment project is running')
})

app.listen(port,()=>{
    console.log(`assignment project running port ${port}`);
})