import Image from "next/image";
import React from "react";
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Highlight,
  Pagination,
  InstantSearch,
  InstantSearchProps,
} from "react-instantsearch-dom";
const myLoader = ({ src }: any) => {
  return `${src}`;
};

type HitProps = {
  hit: CardItem;
};
const CardItem = ({ hit }: HitProps) => {
  return (
    <div className="hit">
      <div className="hit-picture">
        <Image
          alt="img"
          loader={myLoader}
          width={200}
          height={100}
          src={hit.Image}
        />
      </div>
      <div className="hit-content">
        <div className="hit-category">
          <Highlight attribute="category" hit={hit} />
        </div>
        <div>
          <Highlight attribute="name" hit={hit} />
          <span className="hit-title"> {hit.title}</span>
        </div>
        <div className="hit-type">
          <Highlight attribute="type" hit={hit} />
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={hit} />
        </div>
        <div>
          <span> {hit.date}</span>
          <span> {hit.location}</span>
        </div>
      </div>
    </div>
  );
};

export function Content(props: InstantSearchProps) {
  return (
    <InstantSearch {...props}>
      <Configure hitsPerPage={12} />
      <header>
        <SearchBox />
      </header>
      <main>
        <div className="menu">
          <h5>language</h5>
          <RefinementList attribute="language" />
          <h5>Category</h5>
          <RefinementList attribute="category" />
          <h5>Product Category</h5>
          <RefinementList attribute="productCategory" />
          <h5>Solution Category</h5>
          <RefinementList attribute="solutionCategory" />
        </div>
        <div className="results">
          <Hits hitComponent={CardItem} />
        </div>
      </main>
    </InstantSearch>
  );
}
