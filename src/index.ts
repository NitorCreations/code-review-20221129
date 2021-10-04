import { client } from "./ApiClient";
import { sql } from "./database";
import { Data } from "./types";

const writeMeasurementPointsIntoDb = (data: Data) => {
  data.map(async (d) => {
    await sql.raw(
      `INSERT INTO Measurement (value, timestamp, measurement_point_name) VALUES (${d.value}, ${d.timeStamp}, ${d.measurementPoint.name});`
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
