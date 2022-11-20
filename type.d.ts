type CardItem = {
  objectID: number;
  title: string;
  slug: string;
  date: string;
  language: string[];
  location: string[];
  Image: string;
  description: string;
  category: string[];
};

type HomeProps = {
  configure: {
    hitsPerPage: string;
  };
  page: string;
  refinementList: {
    category: string;
    language: string;
  };
};
type SearchState = {
  searchState: HomeProps;
};
