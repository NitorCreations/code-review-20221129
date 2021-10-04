import axios from "axios";
import { Data } from "./types";

class ApiClient {
  private data: Data = [];

  private API_TOKEN = "nLkMl7&BjO8V38XZ";
  private SERVICE_ID = "tango-india-kilo";

  // Updates the data once
  public updateOnce = () => {
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

  public startPolling = () => {
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

  public get latest() {
    if (this.data) {
      return this.data;
    } else {
      return [];
    }
  }
}

export const client = new ApiClient();
