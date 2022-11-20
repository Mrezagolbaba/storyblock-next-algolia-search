// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import algoliasearch from "algoliasearch";

// initializing the Algolia client with the secret keys

const axiosInstance = () => {
  return axios.create({
    baseURL: "https://api.storyblok.com/v2/cdn/stories/",
    params: {
      token: process.env.STORYBLOCK_API_KEY,
      version: "draft",
    },
    timeout: 5000,
  });
};

const fetchAllEvents = async (per_page = 10, page = 1) => {
  try {
    const response = await axiosInstance().get("", {
      params: {
        page,
        per_page,
      },
    });
    return response;
  } catch (error) {
    console.log("The error is : " + error);
  }
};

export const Indexer = async () => {
  const algoliaClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
    process.env.ALGOLIA_ADMIN_KEY!
  );
  // retrieving all events from the headless CMS
  const response = await fetchAllEvents();
  // setting the Algolia index related to your blog
  const index = algoliaClient.initIndex("events");

  // into the desired Algolia format
  const algoliaEvents = response?.data?.stories.map((event: any) => {
    return {
      objectID: event.id,
      title: event.content.title,
      slug: event.slug,
      date: event.content.date,
      language: event.content.languages,
      location: event.content.location,
      Image: event.content.visual?.url,
      description: event.content.copy,
      category: event.content.category,
      productCategory: event.content.ProductCategories,
      solutionCategory: event.content.SolutionCategories,
    };
  });
  // saving the event info to Algolia
  await index.saveObjects(algoliaEvents);
  // add attributes For Faceting Filter
  await index.setSettings({
    attributesForFaceting: [
      "category",
      "location",
      "language",
      "productCategory",
      "solutionCategory",
    ],
  });
};
