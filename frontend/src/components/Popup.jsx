import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import UpdatePlaylist from './../components/updateplaylist'; // Import the CreatePlaylist component
import './createplaylist.css'; // Import CSS file for styling

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
}));

export default function Popup(props) {
    const { title, openPopup, setOpenPopup } = props;

    const handleClose = () => {
        setOpenPopup(false);
    };

    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <UpdatePlaylist /> {/* Render the CreatePlaylist component */}
            </DialogContent>
        </Dialog>
    );
}
