import axios from "axios";
import { CatFact, Data } from "./types";
import { logger } from "./logger";

export class WeatherApiClient {
  private data: Data = [];

  private API_TOKEN = "nLkMl7&BjO8V38XZ";
  private SERVICE_ID = "tango-india-kilo";

  public fetchCatFacts = async (): Promise<CatFact[]> => {
    const result = await axios.get<CatFact[]>("www.cats.com/api/cats", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    return result.data;
  };

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
        .then(({ data }) => {
          const formatted = data.filter((d) => d.isNotValidData !== false);
          logger.log(formatted);

          this.data = data;
        });
    }, 5000);
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

export const client = new WeatherApiClient();
