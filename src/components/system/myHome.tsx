import React from "react";
import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../../css/app.css'
import EditSystem from "./EditSystem";
import { useNavigate } from 'react-router-dom';
import MenuAppBar from "../BarInMapPage";
import FormDialog from "./addSystem";
import System from "../../interfaces/System";
import { observer } from "mobx-react";
import systemStore from "../../data/system";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import locationStore from "../../data/location";

const MyHome = () => {
    const navigate = useNavigate();

    const [systems, setSystems] = useState<System[]>([]);

    const _auth= getAuth();
    const [user,loading,error]=useAuthState(_auth);
    
    useEffect(() => {
        //if manager/customer
        if(user?.uid){
        getSystem(user?.uid);}
        
    }, []);

    const getSystem=async(managerUid:string)=>{
        const data=await systemStore.getSystems(managerUid);
        console.log(data);
        if(data) setSystems(data);
    }
    
    const DeleteSystem= async (id:string) => {
        
         systemStore.DeleteSystemFromServer(id);
    }
    const getLoactionSystem= async (system:System) => {
        
        const data= await locationStore.getLocationsBySystemId(system._id);
        if(data) 
       await data.forEach((d)=>alert(`location's details:
                                    \n name: ${d.name},
                                    \n lat: ${d.location_geolocation.lat}
                                    \n len: ${d.location_geolocation.len}
                                    \n communication_details: ${d.communication_details.email}
                                     / ${d.communication_details.phone}
                                    \n See you! 😀 `));
    }


        return (<div>
            <MenuAppBar/>
            <FormDialog/>

            <div id="divAllCards"> {systems.map(system => {
                return (
                    <div id="card">
                        <Card sx={{ maxWidth: 340 }}>
                            <CardMedia component="img" height="150" image={system.urlImage} alt="green iguana" />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <div>{system.subject}</div>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                <div>
                                        <th>id: {system._id}</th>
                                        <tr>manager_id  :{system.manager_id}</tr>           
                                        <tr>subject  :{system.subject}</tr>
                                        <tr>description  :{system.description}</tr> 
                                        <br /> 
                                    </div>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=> navigate(`/EditSystem/${system.subject}/${system._id}`)}>Show details</Button>
                                <Button size="small" onClick={()=>getLoactionSystem(system)}>Show locations details</Button>

                                {/* { (this.state.isAdmin || this.state.ownerOf === system.systemId ) && (<Button ....> delete </Button>)} */}
                                {/* {(isOwner===system._id)&&} */}
                                <Button size="small" onClick={()=>DeleteSystem(system._id)}>Delete this system</Button>
                            </CardActions>
                        </Card>
                        <br/>
                    </div>
                );
            })
        }</div>
       
     </div>)
    
}
export default observer(MyHome) ;