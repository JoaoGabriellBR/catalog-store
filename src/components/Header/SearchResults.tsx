"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import React from "react";

interface SearchResultsProps {
  results: Product[];
  handleClearSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  handleClearSearch,
}) => {
  if (results.length === 0) return null;

  return (
    <ul className="absolute left-0 right-0 top-full mt-1 max-h-80 overflow-y-auto rounded-md border border-gray-3 bg-white shadow">
      {results.map((item) => (
        <li
          key={item.id}
          className="p-2 hover:bg-gray-1"
          onClick={handleClearSearch}
        >
            <Link
              href={`/product/${item.id}`}
              className="flex items-center gap-3"
            >
              <Image
                src={item.image_url}
                alt={item.name}
                width={40}
                height={40}
                className="rounded"
              />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-dark">{item.name}</span>
              <span className="text-xs text-gray-6">{item.category}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
