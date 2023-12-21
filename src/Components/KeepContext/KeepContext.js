import { createContext, useState } from "react";

const KeepContext = createContext();

export const ContextProvider = ({ children }) => {
    const item = JSON.parse(localStorage.getItem("list")) || [];
    const [list, setList] = useState(item);


    const [filterText, setFilterText] = useState("");
    const colors = ["#FAAFA8", "#F39F76", "#FFF8B8", "#E2F6D3", "#B4DDD3", "#D4E4ED", "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"]



    // Function to add a new item in the list.
    const handlesave = (keep) => {
        const temp = [...list]
        temp.unshift(keep)
        setList(temp);
        localStorage.setItem("list", JSON.stringify(temp))
    }
    const handleColor = (color, index) => {
        let temp = [...list];
        temp[index].color = color;
        // console.log(temp)
        setList(temp);
        localStorage.setItem("list", JSON.stringify(temp))
    }

    const handleDelete = (index) => {
        let temp = list.filter((_, i) => index !== i);
        setList(temp);
        localStorage.setItem("list", JSON.stringify(temp))
    }

    const handleEdit = (val, index) => {
        let temp = [...list]
        temp[index] = val;
        setList(temp)
        localStorage.setItem("list", JSON.stringify(temp))
    }
    return (
        <KeepContext.Provider value={{ list, setList, handlesave, colors, handleColor, handleDelete, handleEdit, filterText, setFilterText }}>
            {children}
        </KeepContext.Provider>
    )
}
export default KeepContext;