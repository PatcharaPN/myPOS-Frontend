export const handleSingleCheck = (
  id: string,
  setSelectedItem: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
  setSelectedItem((prev) => {
    const newSet = new Set(prev);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    return newSet;
  });
};
