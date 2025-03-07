import { createContext, PropsWithChildren, useContext, useState } from "react";

const Context = createContext<{
  accessToken?: string;
  setAccessToken: (token: string | undefined) => void;
} | null>(null);

/*
  Context object needs to stay private and its items/data must be exposed carefully.
  Because we want to be purposeful in what we do and discourage wrong/unintended usage.

  Created separate hooks for context items for maintainability and visibility.
  If components or hooks need access token only, no need to provide token setter.
  It makes it easier to identify:
    1. where access token is consumed
    2. where access token is set
*/
export function useAccessToken() {
  const context = useContext(Context);

  if (!context) throw new Error("useAccessToken is used outside AuthContext");

  return context.accessToken;
}

export function useSetAccessToken() {
  const context = useContext(Context);

  if (!context)
    throw new Error("useSetAccessToken is used outside AuthContext");

  return context.setAccessToken;
}

export function AuthContext({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string>();
  return <Context value={{ accessToken, setAccessToken }}>{children}</Context>;
}
