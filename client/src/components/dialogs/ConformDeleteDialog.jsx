import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function ConformDeleteDialog({ open, handleClose, deleteHandler }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Conform Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure to delete this group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}> NO</Button>
                <Button color='error' onClick={deleteHandler}>YES</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConformDeleteDialog