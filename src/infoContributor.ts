export class InfoContributor {
  constructor(public readonly url: string) {}

  public call(): Promise<object> {
    return fetch(this.url).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((body) => {
          return {
            error: `Error calling ${this.url}`,
            statusText: response.statusText,
            body,
          };
        });
      }
    });
  }
}
