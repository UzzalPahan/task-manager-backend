const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://uzzalpahan1:V4HHU1mIc6KrBftu@cluster0.uq2jpxr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    //database
    const userCollection = client.db("taskManager").collection("user");
    const taskCollection = client.db("taskManager").collection("task");

    //add user start
    app.post("/users", async (req, res) => {
      const regUser = req.body;
      console.log(regUser);
      const result = await userCollection.insertOne(regUser);
      res.send(result);
    });
    //add user end

    //add task start code
    app.post("/task", async (req, res) => {
      const alltask = req.body;
      const result = await taskCollection.insertOne(alltask);
      res.send(result);
    });
    //add task end code

    //read task code start
    app.get("/task", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });
    //read task code end

    //Delete task code start
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });
    //Delete task code end

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task manager Running");
});

app.listen(port, () => {
  console.log(`Task Manager running on ${port}`);
});
