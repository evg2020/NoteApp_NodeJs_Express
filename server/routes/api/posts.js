const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//get posts
router.get('/', async (req, res) => {
  // res.send([{'_id': '61e137a23486b6843f577303', 'text' :'post'}]);
  const posts = await loadCollections();
  res.send(await posts.find().toArray());
});

//get posts by id
 router.get('/:id', async (req, res)=>{
  const posts = await loadCollections();
  res.send(await posts.find({_id : new mongodb.ObjectID(req.params.id)}.toArray()));
 });

//add posts
router.post('/', async (req, res) => {
  const posts = await loadCollections();
  await posts.insertOne({    
    task:req.body.task,
    comment:req.body.comment,
    createdAt: new Date(),
  });
  res.status(201).send();
});

//delete posts
router.delete('/:id', async (req, res) => {
  const posts = await loadCollections();
  await posts.deleteOne({  _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
})


async function loadCollections() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://user:bashneft@cluster0.pjbir.mongodb.net/listPost/', {
    useNewUrlParser: true
  });
  return client.db('listPost').collection('ports');
}



module.exports = router;