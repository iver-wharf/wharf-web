import fetch from 'node-fetch';

export interface CachedResponse {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  text: string;
}

export class CachedFetch {
  private cache = new Map<string, Promise<CachedResponse>>();

  async fetch(url: string): Promise<CachedResponse> {
    if (this.cache.has(url)) {
      return await this.cache.get(url);
    }

    // Cannot simply return the `fetch(url)` promise as `res.text()` may only be called once.
    const promise = (async (): Promise<CachedResponse> => {
      const res = await fetch(url);
      return {
        ok: res.ok,
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        text: await res.text(),
      };
    })();

    this.cache.set(url, promise);
    return promise;
  }

  async fetchFirstFiltered(urls: string[], filter: (res: CachedResponse) => boolean): Promise<CachedResponse | null> {
    for (const url of urls) {
      const res = await this.fetch(url);
      if (filter(res)) {
        return res;
      }
    }
    return null;
  }
}
