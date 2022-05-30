import '../styles/Select.css'

const Select = ({ callback}) => {
    
    return(
        <select className="sort" 
        onChange={callback}>
            <option value={'asc'}>New</option>
            <option value={"desc"}>Old</option>
        </select>
    )
}

export default Select;