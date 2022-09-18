import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardContent } from '@mui/material';
import systemStore from '../../data/system';
import System from '../../interfaces/System';


export default function EditSystem() {

  const [systems, setSystems] = useState<System[]>([]);

  const getAllSystem = async () => {
    const data = await systemStore.getAllSystemFromServer();
    console.log(data);
    if (data) setSystems(data);
  }
  const [system, setSystem] = useState<System>({} as any);
  const { name } = useParams();

  useEffect(() => {
    getAllSystem();
    ShowDetails(name || '');
  }, []);

  const ShowDetails = async (name: string) => {

    const sysStore = await systemStore.getSystemsByUrlName(name);
    if (sysStore) {
      setSystem(sysStore[0]);
      console.log(sysStore);
    }
  }

  // if(system)
  return (
    <Card sx={{ maxWidth: 500 }} >
      {/* {systems.map((sys)=>{if(sys._id==system?._id) return(  */}
      <CardContent>
        {/* <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                    <img src="{`$system.urlImage`}" alt="" />
                   </AspectRatio> */}
        <img className='img'
          src={`${system.urlImage}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${system.urlImage}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

          loading="lazy" height="200" ></img>
        <form className='auth-inner'>
          <Typography >The system</Typography>
          <div className="mb-3">
            <Typography >topic:  {system.description}</Typography>
          </div>

          <div className="mb-3">
            <Typography >objectName:   {system.subject}</Typography>
          </div>
          <div className="mb-3">
            <Typography >managerUid :   {system.manager_id}</Typography>
          </div>
          <div className="mb-3">
            <Typography >description:   {system.description}</Typography>
          </div>

          <div className="d-grid">
          </div>
        </form>
      </CardContent>
      {/* )})} */}
    </Card>
  );
  return (
    <Card>

    </Card>
  )
}



