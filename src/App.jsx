import { useState,useEffect } from 'react'
import './App.css'
import axios from "axios";
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Box, Paper} from '@mui/material'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AirIcon from '@mui/icons-material/Air';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import CardBox from './Card';


function App() {

  const key = import.meta.env.VITE_API_Key;

  const [value, setValue] = useState("");
  const [temp, settemp] = useState("");
  const [typecity, settypecity] = useState("");
  const [city, setcity] = useState("Delhi");
  const [img, setimg] = useState("");
  const [disc, setdisc] = useState("");
  const [wind, setWind] = useState("");
  const [addcity, setAddcity] = useState([])

    function handleAddCity() {
        const newcity = city;
        if(addcity.length<3 ){
          setAddcity(s => [...s, newcity]);          
        }else{
          alert('You can add just 3 cities');
        }

    }

  const citySelect = (e) => {
    e.preventDefault();
    setcity(typecity);
  };
  useEffect(() => {

    axios(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`+key
    ).then((res) => {
      setValue(res.data);
      setWind(res.data.wind);
      settemp(res.data.main);
      setimg(
        `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
      );
      setdisc(res.data.weather[0].description);
    });

  }, [city]);



  return (
    <Container sx= {{
      bgcolor: "grey",
      minHeight: '100%',
      maxWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      p: 5,
    }}>
        <Typography variant="h5" fontWeight={600} sx={{textAlign: 'center'}}>WEATHER APPLICATION</Typography>
        <Container sx={{
          display: 'flex',
          flexDirection:{
            xs: 'column',   //0- above
            md: 'row',   //900-above
            lg: 'row',   //1200-above
          },
          justifyContent: 'center',
          
        }}>
        <Paper elevation={3} sx={{
          minWidth: '50%',
          maxHeight: {
            xs: 300,
            md: 500,
            lg: 500,
          },
          borderRadius: '10px',
          m: {
            xs: 0,
            md: 1,
            lg: 1
          },
          bgcolor: '#262927',
          textAlign: 'center',
          paddingTop: 2,
          color: 'white'
        }}>
        <form onSubmit={citySelect} className='form'>
          <input type="text" value = {typecity} onChange={(e) => settypecity(e.target.value)} required/>
          <button type='submit'><LocationSearchingIcon sx={{marginTop: '10px'}}/></button>
        </form>

        <h6 className="fontcss">{value.name}
        <button className= 'add' onClick={handleAddCity}>
          +
        </button>
        </h6>
        <img src={img} alt="weather icon" className="imgcss" />
        <h6 className="fontcss">{disc}</h6>
        <div className="elementcenter">
          <h3>
            Min  <DeviceThermostatIcon/><br />
            {`${Math.floor(temp.temp_min - 273.15)}° C`}
          </h3>
          <h6 style= {{color: '#262927'}}className="temp">{`${Math.floor(temp.temp - 273.15)}° C`} </h6>
          <h3>
            Max <DeviceThermostatIcon/><br />
            {`${Math.floor(temp.temp_max - 273.15)}° C`}
          </h3>
          </div>
        </Paper>

        <Box>

          <Paper elevation={3} sx={{
            minWidth: '50%',
            height: {
              lg: '200px' 
            },
            borderRadius: '10px',
            marginBottom: 1,
            marginTop: 1,
            paddingTop: '1px',
            paddingBottom:{
              xs: '2px',
              md: '2px'
            }
          }}>
            <Box sx={{
                display: {
                  xs: 'block',
                  md: 'flex',
                  lg: 'flex'
                },
                justifyContent: 'space-around',
                marginTop: 1,
                textAlign: 'center',
            }}>
              <Box sx={{
                textAlign: 'center',
                backgroundColor: '#5d635f',
                m: 1,
                width: {
                  lg: '32%'
                },
                p: 1,
                borderRadius: '10px',
                color: 'whitesmoke'
              }}>
                <h4>Pressure</h4> <CompareArrowsIcon/><br/>
                <h2>
                  {`${temp.pressure}hPa`}                
                </h2>

              </Box>

              <Box sx={{
                textAlign: 'center',
                backgroundColor: '#5d635f',
                m: 1,
                width: {
                  lg: '32%'
                },
                p: 1,
                borderRadius: '10px',
                color: 'whitesmoke'
              }}>
                <h4>Humidity</h4><WaterDropIcon/> <br/>
                <h2> 
                  {`${temp.humidity}%`} 
                </h2>              
              </Box>

              <Box sx={{
                textAlign: 'center',
                backgroundColor: '#5d635f',
                m: 1,
                width: {
                  lg: '32%'
                },
                p: 1,
                borderRadius: '10px',
                color: 'whitesmoke'
              }}>
                <h4>Wind Speed </h4><AirIcon/><br/>
                <h2>
                  {`${wind.speed}m/s`} 
                </h2>              
              </Box>

            </Box>
          </Paper>

          <Paper sx={{
              maxWidth: '100%',
              height: 200,
              borderRadius: '10px',
              marginTop: 2,
          }}>
            <CardBox list={addcity} setList={setAddcity}/>
          </Paper>

        </Box>
      </Container>
      <Typography variant="h7" fontWeight={600} sx={{textAlign: 'center'}}>Made by Ritik Suryavanshi</Typography>
    </Container>
  )
}

export default App
