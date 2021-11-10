const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
  domain: "db.fauna.com",
  scheme: "https",
});

module.exports = async (req, res) => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_dates") // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    );
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};
