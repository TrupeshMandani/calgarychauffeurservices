import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add the Square Web Payments SDK script */}
        <script
          type="text/javascript"
          src="https://web.squarecdn.com/v1/square.js"
          async
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
