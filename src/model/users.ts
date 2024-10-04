import dbConnection from "../helper/db";

const createUsersTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS "UBLIS".ublisUsers (
    "refStId" character varying(255) NULL,
    "refStEmail" character varying(40) NULL,
    "refStPassword" character varying(255) NULL,
    "refStHashedPassword" character varying(255) NULL,
    "refStFName" character varying(255) NULL,
    "refStLName" character varying(255) NULL,
    "refStMName" character varying(255) NULL,
    "refStDOB" date NULL,
    "refStAge" integer NULL,
    "refStSex" character varying(2) NULL,
    "refUtId" integer NULL,
    "refStCustId" character varying(255) NULL,
    "refStCreatedAt" date NULL,
    "refStCreatedBy" character varying(255) NULL,
    "refStUpdatedAt" date NULL,
    "refStUpdatedBy" character varying(255) NULL,
    "refStDeletedAt" date NULL,
    "refStDeletedBy" character varying(255) NULL,
    "refStUserStatus" character varying(10) NULL,
    "refStIsActive" character varying(10) NULL,
    "refUtHistory" jsonb NULL,
    "refQualification" character varying(255) NULL,
    "refOccupation" character varying(255) NULL,
    "refProfilePic" text NULL,
    "refSessionType" character varying(255) NULL,
    "refPreferredTimeId" integer NULL,
    "refSignUpDate" date NULL,
    "refRegisteredDate" date NULL,
    "refTrialCompDate" date NULL,
    "refBranch" character varying(255) NULL,
    "refSessionTime" date NULL
  );
  `;

  let client;
  try {
    client = await dbConnection.connect();
    await client.query(query);
    console.log("Users table created successfully.");
  } catch (err) {
    console.error("Error creating Users table:", err);
  } finally {
    if (client) {
      client.release();
    }
  }
};

createUsersTable();
