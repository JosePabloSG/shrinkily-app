import { useState } from "react";

/**
 * Custom hook for managing tag selection state and operations
 * @returns Object containing tag selection state and handlers
 */
export const useTagSelection = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((tag) => tag !== tagId)
        : [...prev, tagId]
    );
  };

  const removeTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagId));
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  return {
    selectedTags,
    toggleTag,
    removeTag,
    clearTags,
  };
};
