require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URL
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("jobbox");
    const userCollection = db.collection("user");
    const jobCollection = db.collection("job");
    const messagesCollection = db.collection("messages");

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const user = req.body;

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;

      const result = await userCollection.findOne({ email });

      if (result?.email) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.patch("/apply", async (req, res) => {
      const userId = req.body.userId;
      const jobId = req.body.jobId;
      const email = req.body.email;

      const filter = { _id: ObjectId(jobId) };
      const updateDoc = {
        $push: { applicants: { id: ObjectId(userId), email, appliedAt: new Date(), status: "pending" } },
      };

      const result = await jobCollection.updateOne(filter, updateDoc);

      if (result.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.patch("/query", async (req, res) => {
      const userId = req.body.userId;
      const jobId = req.body.jobId;
      const email = req.body.email;
      const question = req.body.question;

      const filter = { _id: ObjectId(jobId) };
      const updateDoc = {
        $push: {
          queries: {
            id: ObjectId(userId),
            email,
            question: question,
            reply: [],
          },
        },
      };

      const result = await jobCollection.updateOne(filter, updateDoc);

      if (result?.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.patch("/reply", async (req, res) => {
      const userId = req.body.userId;
      const reply = req.body.reply;
      console.log(reply);
      console.log(userId);

      const filter = { "queries.id": ObjectId(userId) };

      const updateDoc = {
        $push: {
          "queries.$[user].reply": reply,
        },
      };
      const arrayFilter = {
        arrayFilters: [{ "user.id": ObjectId(userId) }],
      };

      const result = await jobCollection.updateOne(
        filter,
        updateDoc,
        arrayFilter
      );
      if (result.acknowledged) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });

    app.get("/applied-jobs/:email", async (req, res) => {
      const email = req.params.email;
      const query = { applicants: { $elemMatch: { email: email } } };
      const cursor = jobCollection.find(query);
      const result = await cursor.toArray();

      res.send({ status: true, data: result });
    });

    app.get("/posted-jobs/:email", async (req, res) => {
      const email = req.params.email;
      const query = { owner: email };
      const result = await jobCollection.find(query).toArray();

      res.send({ status: true, data: result });
    });

    app.get("/jobs", async (req, res) => {
      const cursor = jobCollection.find({});
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;

      const result = await jobCollection.findOne({ _id: ObjectId(id) });
      res.send({ status: true, data: result });
    });

    app.post("/job", async (req, res) => {
      const job = req.body;

      const result = await jobCollection.insertOne(job);

      res.send({ status: true, data: result });
    });

    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;

      const result = await jobCollection.deleteOne({ _id: ObjectId(id) });
      res.send({ status: true, data: result });
    });

    // /getApplicantsDetails/:jobId
    app.post("/getApplicantsDetails", async (req, res) => {
      const applicants = req.body.applicants || [];

      const cursor = userCollection.find(
        { email: { $in: applicants }, role: "candidate" },
      );
      const result = await cursor.toArray();
      res.send({ status: true, data: result });
    });

    app.patch("/modifyApplicantStatus/:jobId/:applicant/", async (req, res) => {
      const jobId = req.params.jobId;
      const applicant = req.params.applicant;
      const status = req.body.status;

      const filter = { _id: ObjectId(jobId), "applicants.email": applicant };
      const updateDoc = { $set: { "applicants.$.status": status } }

      const result = await jobCollection.updateOne(filter, updateDoc);

      res.send({ status: true, data: result });
    });

    // messages
    app.get("/messages/:email", async (req, res) => {
      const email = req.params.email;
      const query = {
        participants: { $in: [email] }
      };

      const result = await messagesCollection.find(query).toArray();
      res.send({ status: true, data: result });
    });

    app.get("/message/:person/:email", async (req, res) => {
      const person = req.params.person;
      const email = req.params.email;

      const filter = {
        participants: { $all: [email, person] }
      };

      const result = await messagesCollection.findOne(filter);
      res.send({ status: true, data: result });
    });

    app.post("/messages", async (req, res) => {
      const from = req.body.from;
      const to = req.body.to;
      const text = req.body.text;

      const participants = [from, to];

      const filter = {
        participants: { $all: participants }
      };

      const isExist = await messagesCollection.findOne(filter);


      if (isExist) {
        const updateDoc = {
          $push: {
            messages: {
              from,
              to,
              text,
              read: false
            },
          },
        };


        const result = await messagesCollection.updateOne(filter, updateDoc);

        if (result?.acknowledged) {
          return res.send({ status: true, data: result });
        }



      } else {
        const insertDoc = {
          participants,
          messages: [{
            from,
            to,
            text,
            read: false
          }],
        };

        const result = await messagesCollection.insertOne(insertDoc);

        if (result?.acknowledged) {
          return res.send({ status: true, data: result });
        }

      }


      res.send({ status: false });
    });

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
