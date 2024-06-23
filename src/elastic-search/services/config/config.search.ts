export class ConfigSearch {
  public static searchConfig(url: string): any {
    return {
      node: url,
      maxRetries: 5,
      requestTimeout: 60000,
      sniffOnStart: true,
      auth: {
        username: process.env.ELASTIC_SEARCH_USERNAME,
        password: process.env.ELASTIC_SEARCH_PASSWORD,
      },
    };
  }
}
