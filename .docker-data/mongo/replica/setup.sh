#!/bin/bash

rs1="${RS_1_HOST:-rs1}"
rs2="${RS_2_HOST:-rs2}"
rs3="${RS_3_HOST:-rs3}"

rsp1=${RS_1_PORT:-27017}
rsp2=${RS_2_PORT:-27017}
rsp3=${RS_3_PORT:-27017}

rs_name="${RS_NAME:-rs0}"

MONGO1IP=$(getent hosts rs1 | awk '{ print $1 }')
MONGO2IP=$(getent hosts rs2 | awk '{ print $1 }')
MONGO3IP=$(getent hosts rs3 | awk '{ print $1 }')

echo "$rs1"
echo "$rs2"
echo "$rs3"
echo "$rsp1"
echo "$rsp2"
echo "$rsp3"
echo "$rs_name"

echo "###### Waiting for ${rs1} instance startup.."
until mongosh --host ${rs1}:${rsp1} --eval 'quit(db.runCommand({ ping: 1 }).ok ? 0 : 2)' &>/dev/null; do
  printf '.'
  sleep 1
done
echo "###### Working ${rs1} instance found, initiating user setup & initializing rs setup.."

mongosh --host ${rs1}:${rsp1} <<EOF
var config = {
    "_id": "${rs_name}",
    "members": [
        {
            "_id": 0,
            "host": "${rs1}:${rsp1}",
            "priority": 2
        },
        {
            "_id": 1,
            "host": "${rs2}:${rsp2}",
            "priority": 1
        },
        {
            "_id": 2,
            "host": "${rs3}:${rsp3}",
            "priority": 1,
            "arbiterOnly": true
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();

sleep(15000)

var dbName = '${MONGO_INITDB_DATABASE_SUB}';
var user = '${MONGO_INITDB_USERNAME}';
var pwd = '${MONGO_INITDB_PASSWORD}';

db = db.getSiblingDB('admin')

db.createUser(
  {
    user,
    pwd,
    roles: [
      { role: "dbOwner", db: dbName },
    ]
  }
)

miniDB = db.getSiblingDB(dbName);
miniDB.createCollection("logs");

miniDB.logs.insertOne({
  created: new Date(),
  action: 'container_init'
})
EOF
