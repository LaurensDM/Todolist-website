import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import { black, purple } from "tailwindcss/colors";

export default function Dropdown({ list }) {
    const [open, setOpen] = useState(false);

    const openStyle= {
        backgroundColor: black,
        borderRadius: "0.375rem",
        width: "60%",
        margin: "0 auto",
        marginBottom: "0.5rem",
    }
    const closeStyle= {
        backgroundColor: purple[800],
        borderRadius: "0.375rem",
        width: "60%",
        margin: "0 auto",
        marginBottom: "0.5rem",
    }
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className="flex flex-col ">
            <ListItemButton onClick={handleClick} sx={open?openStyle:closeStyle}>
                <ListItemIcon>
                    <InfoIcon sx={{color: "white"}}/>
                </ListItemIcon>
                <ListItemText primary={list.name}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className="bg-purple-300 text-black rounded mx-auto w-3/6 mb-1">
                <List component="div" disablePadding>
                    {list.Items.map((item) => (

                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={item.description} />
                    </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </div>
    );
}