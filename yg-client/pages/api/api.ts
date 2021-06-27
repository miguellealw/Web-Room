import axios, { AxiosInstance } from "axios";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";

export class Api {
  axios: AxiosInstance;
  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  setup() {
    this.axios = axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }
}
