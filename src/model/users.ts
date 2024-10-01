import dbConnection from "../helper/db";

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS ublisusers (
      refStId UUID PRIMARY KEY NOT NULL,
      refStFName VARCHAR(255) NOT NULL,
      refStLName VARCHAR(255) NOT NULL,
      refStMName VARCHAR(255),
      refStDOB DATE NOT NULL,
      refStSex VARCHAR(10) NOT NULL,
      refStAge INTEGER NOT NULL,
      refUtId UUID NOT NULL,
      refsCustID VARCHAR(50),
      refsCreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      refsCreatedBy VARCHAR(255) NOT NULL,
      refsLastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      refsUpdatedBy VARCHAR(255) NOT NULL,
      refsUserStatus VARCHAR(50),
      refsIsActive BOOLEAN DEFAULT TRUE,
      refDummy1 VARCHAR(255),
      refDummy2 VARCHAR(255),
      refDummy3 VARCHAR(255),
      refDummy4 VARCHAR(255),
      refDummy5 VARCHAR(255),
      refQualification VARCHAR(255),
      refOccupation VARCHAR(255),
      refPhotoPath VARCHAR(255),
      refSessionType VARCHAR(50),
      refPreferTimeId UUID,
      refSignupDate TIMESTAMP,
      refRegisteredDate TIMESTAMP,
      refTrialCompletionDate TIMESTAMP,
      refBranch VARCHAR(255),
      refSessionTime TIME
    );
  `;

  try {
    const client = await dbConnection.connect();
    await client.query(query);
    console.log("Users table created successfully.");
    client.release();
  } catch (err) {
    console.error("Error creating Users table:", err);
  }
};

createUsersTable();
