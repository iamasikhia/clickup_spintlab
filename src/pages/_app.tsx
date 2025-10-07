import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type * as React from "react";

export default function App({
  Component,
  pageProps,
}: AppProps): React.JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
