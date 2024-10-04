import dbConnection from "../helper/db";

const createUserType = async () => {
  const query = `
        CREATE TABLE IF NOT EXISTS "UBLIS".refUserType(
            "refUtId" text NOT NULL,
            "refUtText" text NOT NULL        
        )
    `;
  let client;
  try {
    client = await dbConnection.connect();
    await client.query(query);
    console.log("Users Type Created Successfully...");
  } catch (err) {
    console.log("Error while creating user table", err);
  }
};
