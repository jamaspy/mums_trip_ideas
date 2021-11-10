const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
  domain: "db.fauna.com",
  scheme: "https",
});

module.exports = async (req, res) => {
  const {
    query: { id },
  } = req;

  const payload = { id: req.body.id, name: req.body.name };

  try {
    const dbs = await client.query(
      q.Let(
        {
          ref: q.Ref(q.Collection("dates"), id),
          doc: q.Get(q.Var("ref")),
          array: q.Select(["data", "activities"], q.Var("doc")),
        },
        q.Update(q.Var("ref"), {
          data: { activities: q.Append(payload, q.Var("array")) },
        })
      )
    );
    res.status(200).json(dbs.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
