const encoder = new TextEncoder();

class JWT {
  constructor(private secret: string) {}

  async sign(payload: object, expiresIn: number): Promise<string> {
    const header = { alg: "HS256", typ: "JWT" };
    const now = Date.now();
    const finalPayload = { ...payload, exp: now + expiresIn, iat: now };

    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(finalPayload));
    const data = `${base64Header}.${base64Payload}`;
    const signature = await this.createSignature(data);

    return `${data}.${signature}`;
  }

  async verify(token: string): Promise<object | null> {
    try {
      const [header, payload, signature] = token.split(".");
      const data = `${header}.${payload}`;
      const validSignature = await this.createSignature(data);

      if (signature !== validSignature) return null;

      const decodedPayload = JSON.parse(atob(payload));
      if (decodedPayload.exp < Date.now()) return null;

      return decodedPayload;
    } catch {
      return null;
    }
  }

  private async createSignature(data: string): Promise<string> {
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(this.secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(data)
    );

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }
}

export const accessTokenJWT = new JWT("your-access-token-secret");
export const refreshTokenJWT = new JWT("your-refresh-token-secret");
