import React, { useContext, useState } from 'react'
import "./Main"
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import KeepContext from '../KeepContext/KeepContext';
import picker from "../../Assets/color-palette.png"
import { Box, Button, Menu, MenuItem, Modal } from '@mui/material';


const Keepcard = ({ title, note, color, index }) => {
    const style = {
        position: 'absolute',
        display: "flex",
        justifyContent: "center",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: color,
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    const { colors, handleColor, handleEdit, handleDelete } = useContext(KeepContext);
    const [newTitle, setNewTitle] = useState(title);
    const [newNote, setNewNote] = useState(note);

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const openColor = Boolean(anchorE2);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const verticalopen = Boolean(anchorEl);
    const handleClicked = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosed = () => {
        setAnchorEl(null);
    };
    const handleColorCLick = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleColorCLickCLose = () => {
        setAnchorE2(null);
    };
    const handleOpen = (() => {
        handleClosed();
        setOpen(true)
    })
    const handleClose = () => setOpen(false);
    const handleDeleted = () => {
        handleDelete(index);
        handleClosed();
        setOpenDelete(false);
    }


    const handleUpdate = () => {
        const temp = {
            title: newTitle,
            note: newNote,
            color: color,
        }
        handleEdit(temp, index);
        setOpen(false)
    }

    return (
        <div style={{ backgroundColor: color }} className='keepcard' >
            <div><h4 onClick={() => setOpen(!open)}>{title}</h4>
            </div>
            <div className='note-text'><span onClick={() => setOpen(!open)}>{note}</span></div>
            <div className='edit-card'>
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

                    anchorE1={anchorE2}
                    open={openColor}
                    onClose={handleColorCLickCLose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <div className='color-box'>
                        {colors && colors?.map((val) => {
                            return <div key={val} className='coloritem' onClick={() => handleColor(val, index)} style={{ background: val }}></div>
                        })}
                    </div>
                </Menu>
                <Button
                    id="basic-button"
                    aria-controls={verticalopen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={verticalopen ? 'true' : undefined}
                    onClick={handleClicked}
                >
                    <FeatherIcon icon="more-vertical" />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={verticalopen}
                    onClose={handleClosed}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleOpen}>Edit</MenuItem>
                    <MenuItem onClick={() => setOpenDelete(!openDelete)}>Delete</MenuItem>

                </Menu>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='input-box modal-box' style={{ background: color }}>
                            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Title' />
                            <textarea value={newNote} className='noteinput' rows="1" onChange={(e) => setNewNote(e.target.value)} placeholder='Take a note...' />
                            <div className='edit-box' style={{ display: open ? "" : "none" }}>
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

                                    anchorE1={anchorE2}
                                    open={openColor}
                                    onClose={handleColorCLickCLose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <div className='color-box'>
                                        {colors && colors?.map((val) => {
                                            return <div key={val} className='coloritem' onClick={() => handleColor(val, index)} style={{ background: val }}></div>
                                        })}
                                    </div>
                                </Menu>
                                {/* <div className='color-picker-img'>
                                    <img src={picker} onClick={handlOpenColorModal} />
                                </div>
                                <ul style={{ display: colorModal ? "flex" : "none" }} className='colorpicker-list'>
                                    {colors && colors?.map((val, i) => {
                                        return <li key={i} className='coloritem' onClick={() => handleColor(val, index)} style={{ background: val }}></li>
                                    })}
                                </ul> */}
                                <button onClick={handleUpdate}>Save</button>
                            </div>
                        </div>
                    </Box>
                </Modal>
                <Modal
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div>
                            <h1>Are you sure want to delete ?</h1>
                            <div>
                                <Button onClick={handleDeleted} variant="outlined" color="error">Confirm</Button>
                                <Button variant="contained" color="success" onClick={() => setOpenDelete(false)}>No</Button>
                            </div>
                        </div>
                    </Box>
                </Modal>

            </div>
        </div>
    )
}

export default Keepcard