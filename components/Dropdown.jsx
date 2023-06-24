"use client";

import { Button, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";
import { black, purple } from "tailwindcss/colors";
import { useRouter } from "next/router";

export default function Dropdown({ list }) {

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const openStyle = {
        backgroundColor: black,
        borderRadius: "0.375rem",
        width: "100%",
        margin: "0 auto",
        marginBottom: "0.5rem",
    }
    const closeStyle = {
        backgroundColor: purple[800],
        borderRadius: "0.375rem",
        width: "100%",
        margin: "0 auto",
        marginBottom: "0.5rem",
    }
    const handleClick = () => {
        setOpen(!open);
    };

    const handleRoute = () => {
        console.log("clicked");
        router.push(`/view/${list.id}`);
    };

    return (
        <div className="flex flex-row justify-center w-full" key={list.id}>
            <div className="flex flex-col w-3/5">
                <ListItemButton onClick={handleClick} sx={open ? openStyle : closeStyle} className="my-auto">
                    {/* <ListItemIcon>
                    <InfoIcon sx={{color: "white"}}/>
                </ListItemIcon> */}
                    <ListItemText primary={list.name} disableTypography className=" font-bold" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit className="bg-purple-300 text-black rounded mx-auto w-full mb-3">
                    <List component="div">
                        {list.Items.map((item, index) => (
                            <div  className="flex sm:flex-row flex-col" key={item.id}>
                                <ListItemText primary={`${index + 1}.`} className="p-2" />
                                <ListItemText primary={item.description} className="sm:p-2" />
                            </div>

                        ))}
                    </List>
                </Collapse>
            </div>
            <Button className="w-12 h-12" onClick={handleRoute}>
                <InfoIcon className="text-white ms-2  my-auto" />
            </Button>

        </div>
    );
}