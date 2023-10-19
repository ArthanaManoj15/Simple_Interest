import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

import './App.css';
import { useState } from 'react';

function App() {
  const [interest, setInterest] = useState(0)
  const [principle, setPrinciple] = useState(0)
  const [rate, setRate] = useState(0)
  const [year, setYear] = useState(0)
  const [IsPrinciple, setIsPrinciple] = useState(true)
  const [IsRate, setIsRate] = useState(true)
  const [IsYear, setIsYear] = useState(true)

  const getvalidate = (e) => {
    const { name, value } = e.target
    // console.log(name,value);
    // console.log(value.match(/^[0-9]+$/)); match-return array,else null
    if (!!value.match(/^[0-9]*.?[0-9]+$/)) {   //!! - to convert to boolean
      if (name === 'principle') {
        setPrinciple(value)
        setIsPrinciple(true)
      }
      else if (name === 'rate') {
        setRate(value)
        setIsRate(true)
      }
      else {
        setYear(value)
        setIsYear(true)
      }
    }
    else {
      if (name === 'principle') {
        setPrinciple(value)
        setIsPrinciple(false)
      }
      else if (name === 'rate') {
        setRate(value)
        setIsRate(false)
      }
      else {
        setYear(value)
        setIsYear(false)
      }
    }

  }

  // submit button
  const handleCalculate = (e)=> {
    e.preventDefault()  //prevent refresh
    if (!principle || !rate || !year) {
      alert('Please fill the form')
    }
    else {
      setInterest(principle*rate*year/100)
    }
  }

  // reset button
  const handleReset = (e)=> {
    setInterest(0)
    setPrinciple(0)
    setRate(0)
    setYear(0)
    setIsPrinciple(true)
    setIsRate(true)
    setIsYear(true)
  }

  return (
    <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center w-100 bg-dark ">
      <div className='bg-light p-5 rounded' style={{ width: '500px' }}>
        <h1>Simple Interest App</h1>
        <p>Calculate Simple Interest Easily</p>
        <div className='bg-info d-flex justify-content-center align-items-center w-100 p-3 flex-column'>
          <h1>₹ {''} {interest}</h1>
          <p>Total Simple Interest</p>
        </div>
        <form className='mt-5' onSubmit={handleCalculate}>
          <div className='mb-3'>
            <TextField name='principle' value={principle || ""} onChange={(e) => getvalidate(e)} className='w-100' id="outlined-basic" label="₹ Principle Amount" variant="outlined" />
          </div>
          {!IsPrinciple &&
            <div>
              <p className='text-danger fw-bolder'>Invalid Input</p>
            </div>
          }

          <div className='mb-3'>
            <TextField name='rate' value={rate || ""} className='w-100' id="outlined-basic" label="Rate of Interest (p.a)%" variant="outlined" onChange={(e) => getvalidate(e)} />
          </div>
          {!IsRate &&
            <div>
              <p className='text-danger fw-bolder'>Invalid Input</p>
            </div>
          }
          <div className='mb-3'>
            <TextField value={year || ""} className='w-100' id="outlined-basic" label="Year (Yr)" variant="outlined" onChange={(e) => getvalidate(e)} />
          </div>
          {!IsYear &&
            <div>
              <p className='text-danger fw-bolder'>Invalid Input</p>
            </div>
          }
          <Stack className='mt-4' direction="row" spacing={2}>
            <Button type='submit' disabled={IsPrinciple && IsRate && IsYear ? false : true} className='bg-success' style={{ width: '200px', height: '50px' }} variant="contained">Calculate</Button>
            <Button onClick={handleReset} variant="outlined" style={{ width: '200px', height: '50px' }}>Reset</Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
