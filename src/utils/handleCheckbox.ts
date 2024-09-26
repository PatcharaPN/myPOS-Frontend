// checkAllUtils.ts
export const handleCheckAll = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentProducts: Array<{ _id: string }>,
  setSelectedItem: React.Dispatch<React.SetStateAction<Set<string>>>
) => {
  const checked = e.target.checked;
  const newSelectedItems = new Set<string>();

  if (checked) {
    currentProducts.forEach((product) => newSelectedItems.add(product._id));
  }
  setSelectedItem(newSelectedItems);
};
