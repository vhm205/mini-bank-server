const dbName = process.env.MONGO_INITDB_DATABASE_SUB;
const user = process.env.MONGO_INITDB_USERNAME;
const pwd = process.env.MONGO_INITDB_PASSWORD;

db = db.getSiblingDB('admin');

db.createUser({
  user,
  pwd,
  roles: [{ role: "dbOwner", db: dbName }]
});

miniDB = db.getSiblingDB(dbName);
miniDB.createCollection("logs");

miniDB.logs.insertOne({
  created: new Date(),
  action: 'container_init'
})
