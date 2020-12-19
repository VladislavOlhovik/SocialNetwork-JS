export const updateObjectInArray = (items, objPropName, itemsId, newObjProps ) => {
  return items.map((el) => {
    if (el[objPropName] === itemsId) {
      return { ...el, ...newObjProps };
    }
    return el;
  });
};
