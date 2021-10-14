import { client, WeatherApiClient } from "./WeatherApiClient";
import { sql } from "./database";
import { Data } from "./types";

const writeMeasurementPointsIntoDb = async (data: Data): Promise<void> => {
  const average = WeatherApiClient.countAverage(data.map((d) => d.value));
  await data.forEach(async (data) => {
    await sql.raw(
      `INSERT INTO Measurement
      (value, average, timestamp, measurement_point_id) 
      VALUES
      (${data.value}, ${average}, 
      "${data.timeStamp}", "${data.measurementPoint.name}");`
    );
  });
};

const start = () => {
  setInterval(async () => {
    client.startPolling();
    await writeMeasurementPointsIntoDb(client.latest);
  }, 5000);
};

start();
