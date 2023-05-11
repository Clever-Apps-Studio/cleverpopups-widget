function useTypeTransform(items, type) {
  if (Array.isArray(items)) {
    return items.map((item) => {
      return {
        ...item,
        type,
      };
    });
  }
  return {
    ...items,
    type,
  };
}

export default useTypeTransform;
