import React from "react";
import Head from "next/head";

export default ({ children, title }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/*<link
      href="https://en.gravatar.com/avatar/938ae65b289d32d860f8c619b46a49e7.png?s=16"
      rel="shortcut icon"
      type="image/png"
      sizes="16x16"
    />
    <link
      href="https://en.gravatar.com/avatar/938ae65b289d32d860f8c619b46a49e7.png?s=32"
      rel="shortcut icon"
      type="image/png"
      sizes="32x32"
    />
    <link
      href="https://en.gravatar.com/avatar/938ae65b289d32d860f8c619b46a49e7.png?s=512"
      rel="shortcut icon"
      type="image/png"
      sizes="512x512"
    />*/}

    {/*<meta content="https://en.gravatar.com/avatar/938ae65b289d32d860f8c619b46a49e7.png?s=600" property="og:image" />*/}
    {/*<meta content="600" property="og:image:width" />
    <meta content="600" property="og:image:height" />*/}

    <title>{title ? title + " " : ""}TODO</title>
    <meta content="TODO" property="og:title" />

    <meta content="TODO" name="description" />
    <meta content="TODO" property="og:description" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@jonikorpi" />

    {children}
  </Head>
);
