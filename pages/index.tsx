import React, { useRef } from "react";
import { useRouter } from "next/router";
import qs from "qs";
import algoliasearch from "algoliasearch/lite";
import { findResultsState } from "react-instantsearch-dom/server";
import { Head, Content } from "../components";
import { Indexer } from "./api";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
);

const createURL = (state: string) => `?${qs.stringify(state)}`;

const pathToSearchState = (path: string) =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

const DEFAULT_PROPS = {
  searchClient,
  indexName: "events",
};

export default function Page(props: any) {
  const [searchState, setSearchState] = React.useState(props.searchState);
  const router = useRouter();
  const debouncedSetState = useRef();

  React.useEffect(() => {
    if (router) {
      router.beforePopState(({ url }) => {
        setSearchState(pathToSearchState(url));
      });
    }
  }, [router]);

  return (
    <div>
      <Head />
      <Content
        {...DEFAULT_PROPS}
        searchState={searchState}
        resultsState={props.resultsState}
        onSearchStateChange={(nextSearchState: string) => {
          setSearchState(nextSearchState);
        }}
        createURL={createURL}
      />
    </div>
  );
}

export async function getServerSideProps({ resolvedUrl }: any) {
  console.log(resolvedUrl);
  const searchState = pathToSearchState(resolvedUrl);
  await Indexer();
  const resultsState = await findResultsState(Content, {
    ...DEFAULT_PROPS,
    searchState,
  });

  return {
    props: {
      resultsState: JSON.parse(JSON.stringify(resultsState)),
      searchState,
    },
  };
}
