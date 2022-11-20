import NextHead from "next/head";
import React from "react";

export const Head = () => (
  <NextHead>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.0.0/themes/algolia-min.css"
    />
  </NextHead>
);
