import React, { useContext, useState } from 'react'
import "./Main.css"
import KeepContext from '../KeepContext/KeepContext';
import Keepcard from './Keepcard';
import picker from "../../Assets/color-palette.png"
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Menu } from '@mui/material';
const Main = () => {
    const { list, setList, handlesave, colors, filterText, state, toggleDrawer } = useContext(KeepContext);
    console.log(list);
    console.log(colors)
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [color, setColor] = useState("");
    const [open, setOpen] = useState(false)
    const [colorBox, setcolorBox] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const handleColorCLick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleColorCLickCLose = () => {
        setAnchorEl(null);
    };
    const handleAdd = () => {
        if (title === "" || note === "" ) return;
        if(color==""){
            setColor("#fff")
        }
        console.log(title, note, color);
        let newItem = { title, note, color };
        handlesave(newItem);
        setTitle("");
        setNote("");
        setColor("")
        setOpen(!open)
    }
    const handleBlur = () => {
        setOpen(true);
    }
    const handlOpenColor = () => {
        setcolorBox(!colorBox)

    }
   
   
    const openColor = Boolean(anchorEl);
    console.log(list.reverse())
    const filterList = list.filter((val) =>
    ((val.title).includes(filterText)
        || (val.note).includes(filterText)))
    return (
        <div className='main-container'>
            <div className='main-left'>

                <div className='first-icon'><LightbulbIcon /><span>Notes</span></div>
                <div>< NotificationsActiveIcon /><span>Reminder</span></div>

                <div><HomeIcon /><span>Home</span></div>
                <div><EditIcon /><span>Edit labels</span></div>
                <div><ArchiveIcon /><span>Archive</span></div>
                <div><DeleteOutlineIcon /><span>Trash</span></div>
            </div>
            <div className='main-right'>
                <div className='input-box' style={{ background: color }}>
                    {open ? <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Title' /> : ""}
                    <textarea value={note} className='noteinput' rows="1" onChange={(e) => setNote(e.target.value)} placeholder='Take a note...' onClick={handleBlur} />
                    <div className='edit-box' style={{ display: open ? "" : "none" }}>
                        {/* <div className='color-picker-img'>
                            <img src={picker} width="20" onClick={c} />
                        </div> */}
                        {/* <ul style={{ display: colorBox ? "flex" : "none" }} className='colorpicker-list'>
                            {colors && colors?.map((val) => {
                                return <li key={val} className='coloritem' onClick={() => setColor(val)} style={{ background: val }}></li>
                            })}
                        </ul> */}
                         <Button
                                    id="basic-button"
                                    aria-controls={openColor ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openColor ? 'true' : undefined}
                                    onClick={handleColorCLick}
                                >
                                    <img src={picker} width={20} />
                                </Button>
                                <Menu
                                    id="basic-menu"

                                    anchorE1={anchorEl}
                                    open={openColor}
                                    onClose={handleColorCLickCLose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <div className='color-box'>
                                        {colors && colors?.map((val) => {
                                            return <div key={val} className='coloritem' onClick={() => setColor(val)} style={{ background: val }}></div>
                                        })}
                                    </div>
                                </Menu>
                        <button onClick={handleAdd}>Save</button>
                    </div>
                </div>

                <div className='keepList'>
                    {filterList && filterList?.map((val, i) => {
                        return (
                            <Keepcard key={i} title={val.title} note={val.note} color={val.color} index={i} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Main