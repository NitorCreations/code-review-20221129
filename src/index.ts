import { client, ApiClient } from "./ApiClient";
import { sql } from "./database";
import { Data } from "./types";

const writeMeasurementPointsIntoDb = (data: Data) => {
  const average = ApiClient.countAverage(data.map((d) => d.value));
  data.forEach(async (pieceOfData) => {
    await sql.raw(
      `INSERT INTO Measurement (value, average, timestamp, measurement_point_id) VALUES (${pieceOfData.value}, ${average}, "${pieceOfData.timeStamp}", "${pieceOfData.measurementPoint.name}");`
    );
  });
};

const start = () => {
  setInterval(async () => {
    client.startPolling();
    await writeMeasurementPointsIntoDb(client.latest);
  }, 10000);
};

start();
