import React, { useState } from 'react'
import {
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    Avatar
} from '@mui/material'
import { bgGradiant } from '../../constants/color'
import { useInputValidation } from '6pp'
import { Navigate } from 'react-router-dom';

const isAdmin = true;

function AdminLogin() {

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submit");
    }

    if(isAdmin) return <Navigate to={"/hidden/admin/dashbord"}/>

    const secretKey = useInputValidation("")


    return (
        <div
            style={{
                backgroundImage: bgGradiant,
            }}
        >
            <Container
                component={"main"}
                maxWidth="xs"
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <Paper elevation={3} sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>


                    <Typography variant='h5'>Admin Login</Typography>

                    <form
                        style={{
                            width: "100%",
                            marginTop: "1rem"
                        }}
                        onSubmit={submitHandler}
                    >

                        <TextField
                            required
                            fullWidth
                            label="Secret Key"
                            type='password'
                            margin='normal'
                            variant='outlined'
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                        />

                        <Button

                            sx={{
                                color: "white",
                                marginTop: "1rem"
                            }}
                            variant='contained'
                            type='submit'
                            fullWidth

                        >
                            Login
                        </Button>

                    </form>



                </Paper>
            </Container>
        </div>
    )
}

export default AdminLogin