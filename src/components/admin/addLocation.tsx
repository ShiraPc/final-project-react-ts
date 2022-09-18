import React, { useRef } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import locationStore from "../../data/location";
import { observer } from "mobx-react-lite";
import UserStore from "../../data/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import axios from "axios";

export function FormDialogLocation() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const _auth = getAuth();
    const [user, loading, error] = useAuthState(_auth);
    const isManager = async () => {
        if (user?.uid) {
            const userCome = UserStore.getById(user?.uid);
            const _id = (await userCome)._id;
            if (_id) return _id;
        }
    }

    // const manager_id = isManager();
    const system_id = useRef<HTMLInputElement>();
    const inputLat = useRef<HTMLInputElement>();
    const inputLen = useRef<HTMLInputElement>();
    const inputDescription = useRef<HTMLInputElement>();
    const inputName = useRef<HTMLInputElement>();
    const inputNotes = useRef<HTMLInputElement>();
    const inputEmail = useRef<HTMLInputElement>();
    const inputFhone = useRef<HTMLInputElement>();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const addLocation = async () => {

        const dataLocation ={
            manager_id: await isManager(),
            system_id: system_id.current?.value,
            location_geolocation:
            {
                lat: inputLat.current?.value,
                len: inputLen.current?.value
            },
            description: inputDescription.current?.value,
            name: inputName.current?.value,
            notes: inputNotes.current?.value,
            communication_details: {
                email: inputEmail.current?.value,
                phone: inputFhone.current?.value
            },
        }
        console.log(dataLocation)
        try {     
            const res = await axios.post(`https://final-waze-project.uc.r.appspot.com/location/`,dataLocation);
            let tempList = await res.data;
            console.log(res)
            alert(`add ${dataLocation.name} successfully`);
        } catch (error) { console.log(error); }
        finally{setOpen(false);}
        
        // try {
        //   const res=  await locationStore.createLocationsBySystemId(dataLocation) ;
        //     let tempList = await res.data;
        //     console.log(res);
        //     alert(`add ${dataLocation.name} successfully`);
        // } catch (error) { console.log(error); }
        // finally { setOpen(false); }
    }

    return (
        <div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => { handleClickOpen() }}>Click to Add Location </Button>
            </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new location</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        please enter your location details here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off">

                        <div>
                            {/* <TextField    label="{manager_id  }" placeholder="Manager" variant="standard"/>  */}
                            <TextField inputRef={ system_id}         label="enter system_id" placeholder="system_id" variant="standard"/> 
                            <TextField inputRef={ inputLat}          label="enter Lat" placeholder="Lat" variant="standard"/> 
                            <TextField inputRef={ inputLen}         label="enter Len" placeholder="Len" variant="standard"/> 
                            <TextField inputRef={ inputDescription} label="enter Description" placeholder="Description" variant="standard"/> 
                            <TextField inputRef={ inputName}        label="enter Name" placeholder="Name" variant="standard"/> 
                            <TextField inputRef={ inputNotes}       label="enter Notes" placeholder="Notes" variant="standard"/> 
                            <TextField inputRef={ inputEmail}       label="enter Email" placeholder="Email" variant="standard"/> 
                            <TextField inputRef={ inputFhone  }      label="enter Fhone" placeholder="Fhone" variant="standard"/> 
                            
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addLocation}>enter to add location</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


// export default observer(FormDialogLocation);