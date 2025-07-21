import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title
      ? `${title} | Premier Real Estate`
      : "Premier Real Estate - Your Dream Home Awaits";

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

// Helper function to set title
export const setPageTitle = (title) => {
  document.title = title
    ? `${title} | Premier Real Estate`
    : "Premier Real Estate - Your Dream Home Awaits";
};
