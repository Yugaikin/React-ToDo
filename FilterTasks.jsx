import "../styles/FilterTasks.css";
import Button from "./Button";
import Select from "./Select";
const FilterTasks = ({ filter, setFilter, setSort}) => {

  const DONE ="done"
  const UNDONE ="undone"

  return (
    <div className="filter__tasks">
      <Button
        body={"All"}
        locked={filter === "all"}
        callback={() => {
          setFilter("");
        }}
      />
      <Button
        body={DONE}
        locked={filter === DONE}
        callback={() => {
          setFilter(DONE);        
        }}
      />
      <Button
        body={UNDONE}
        locked={filter === UNDONE}
        callback={() => {
          setFilter(UNDONE);
        }}
      />
      <Select
        callback={(e) => setSort(e.target.value)}
      />
    </div>
  );
};

export default FilterTasks;