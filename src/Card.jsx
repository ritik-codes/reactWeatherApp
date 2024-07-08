import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CardBox(props) {

  function handleRemoveSpecs(index) {
    props.setList(props.list.filter((_ , i)=> i !== index));
  }

  return (
    <Card sx={{
      height: {
        xs:'200px',
        md:'300px',
        lg:'300px'
      },
      borderRadius: '10px',
      bgcolor: '#262927',
      color: 'white'
    }}>
    <CardContent>
      <Typography sx={{ fontSize: {
        xs: 15,
        md: 20,
        lg: 20
      } }} color="white" gutterBottom>
        Favourite cities (Max. 3)
      </Typography>
      <ul>
            {props.list.map((l, index)=><li key={index}>
            <button className='add' onClick={() => handleRemoveSpecs(index)}>-</button>&nbsp;{l}
            </li>
            )}
        </ul>
        <br />
    </CardContent>

  </Card>
  )
}

export default CardBox