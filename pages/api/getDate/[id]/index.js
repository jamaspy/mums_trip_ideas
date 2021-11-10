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
  console.log(id);
  try {
    const dbs = await client.query(
      q.Get(q.Ref(q.Collection("dates"), "314833769929376322"))
    );
    res.status(200).json(dbs.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
