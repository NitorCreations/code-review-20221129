import axios from "axios";
import { Data } from "./types";

export class ApiClient {
  private data: Data = [];

  private API_TOKEN = "nLkMl7&BjO8V38XZ";
  private SERVICE_ID = "tango-india-kilo";

  // Updates the data once
  public updateOnce = (): void => {
    axios
      .get<Data>("www.service.com/weather/api/data", {
        method: "GET",
        headers: {
          "x-api-token": this.API_TOKEN,
          "x-service-id": this.SERVICE_ID,
          accept: "application/json",
        },
      })
      .then((result) => {
        this.data = this.formatData(result.data);
      });
  };

  private formatData = (data: Data): Data => {
    return data.filter((d) => d.isNotValidData === false);
  };

  public startPolling = (): void => {
    // Polls the API every five seconds and updates the data
    setInterval(() => {
      axios
        .get<Data>("www.service.com/weather/api/data", {
          method: "GET",
          headers: {
            "x-api-token": this.API_TOKEN,
            "x-service-id": this.SERVICE_ID,
            accept: "application/json",
          },
        })
        .then((result) => {
          this.data = result.data.reduce((acc, curr): Data => {
            if (curr.isNotValidData === false) {
              return [...acc, curr];
            } else {
              return acc;
            }
          }, [] as Data);
        });
    }, 1000);
  };

  public get latest(): Data {
    if (this.data) {
      return this.data;
    } else {
      return [];
    }
  }

  public static countAverage = (values: Array<number>): number => {
    return (
      values.sort((a, b) => a - b).reduce((acc, curr) => acc + curr, 0) /
      (values.length - 1)
    );
  };
}

export const client = new ApiClient();
