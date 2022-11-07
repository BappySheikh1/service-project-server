const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port =process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())



const uri = process.env.MONGODB_USER_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  const userCollection =client.db('assignmrntProject').collection('users')

  // get database services data 
app.get('/services',async (req,res)=>{
  const query={}
  const cursor = userCollection.find(query)
  const services=await cursor.toArray()
  res.send(services)
})



}
run().catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send('assignment project is running')
})

app.listen(port,()=>{
    console.log(`assignment project running port ${port}`);
})