const DropDown = ({ item, items, handleItemChange }) => {
  return (
    <select value={item} onChange={handleItemChange}>
      <option value=""> -- Select one -- </option>
      {items.map((x) => (
        <option key={x.id} value={x.id}>
          {x.name}
        </option>
      ))}
    </select>
  );
};

export { DropDown };
