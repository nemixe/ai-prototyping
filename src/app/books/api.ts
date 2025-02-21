import { TBookResponse } from "./type";

// Dummy data
const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    year: 1925,
    publish_date: "1925-04-10",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    year: 1960,
    publish_date: "1960-07-11",
  },
  {
    id: "3",
    title: "1984",
    year: 1949,
    publish_date: "1949-06-08",
  },
];

export const getBooks = async (params: {
  page?: number;
  limit?: number;
}): Promise<TBookResponse> => {
  const { page = 1, limit = 10 } = params;

  const total_page = Math.ceil(books.length / limit);

  return {
    status_code: 200,
    data: {
      items: books,
      meta: {
        page,
        per_page: limit,
        total: books.length,
        total_page,
      },
    },
    version: "1",
  };
};
