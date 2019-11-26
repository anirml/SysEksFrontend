import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  const url = 'http://localhost:8080/jjugroup/api/flight/all'

  // const loadFlights = () => {
  //   return fetch(url)
  //     .then(res => { return res.json() })
  // }

  const GetAllFlight = () => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      setFlights(data)
      setTable(mapper(data))
    })
  }

  useEffect(() => {
    GetAllFlight()
  }, []);


  const [flights, setFlights] = useState('Loading')

  const flights2 = [{ id: 1, date: 'Dec 1, 2019 8:50:00 PM', duration: 60000, price: 72.0, origin: 'CPH', destination: 'LHR', link: 'http://corndog.io/' },
  { id: 2, date: 'Dec 1, 2019 6:50:00 PM', duration: 70000, price: 122.0, origin: 'CPH', destination: 'LHR', link: 'http://beesbeesbees.com/' },
  { id: 3, date: 'Dec 1, 2019 7:20:00 PM', duration: 45000, price: 95.0, origin: 'CPH', destination: 'LHR', link: 'https://thatsthefinger.com/' }]

  // const getFlights = () =>{
  //   fetch('http://localhost:8080/jjugroup/api/flight/all')
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(function(data) {
  //       console.log(data);
  //     })
  //     .then((data) =>{setFlights(data)});
  // }

  function sorter(sortBy) {
    var key = sortBy;
    function compare(a, b) {
      const comA = a[key];
      const comB = b[key];
      let comparison = 0;
      if (comA > comB) {
        comparison = 1;
      } else if (comA < comB) {
        comparison = -1;
      }
      return comparison;
    }
    return compare;
  }

  // const flightKeys = Object.keys(flights[1]);

  const milliToHourMin = (milliseconds) => {
    let sec = milliseconds/1000
    let remainiongSec = sec % 60
    let min = (sec - remainiongSec) /60
    let remainingMin = min % 60
    let hour = (min - remainingMin) / 60
    return(
        hour + "t. " + remainingMin + "min."
    )
  }

  const mapper = (array) => {
    return array.map((f) => {
      return <tr key={f.id}><th scope="row">{f.id}</th>
        <td>{f.depatureTime}</td>
        <td>{milliToHourMin(f.flightDuration)}</td>
        <td>{f.departureAirportCode} - {f.departureAirportName}</td>
        <td>{f.arrivalAirportCode} - {f.arrivalAirportName}</td>
        <td>${f.price}</td>
        <td><a className="btn btn-success" href={f.link}>Se tilbud</a></td>
      </tr>
    })
  }

  const [table, setTable] = useState(flights)

  // return (
  //   <div className="App">
  //     <h1>Memeondo</h1>
  //     <br />
  //     <h5>Sort by:</h5>
  //     <div className="btn-group" role="group" aria-label="Basic example">
  //     {flightKeys.slice(0,flightKeys.length-1).map((fk)=>{return <button key={fk} type="button" className="btn btn-outline-secondary btn-lg" onClick={() => setTable(mapper(flights.sort(sorter(fk))))}>{fk.charAt(0).toUpperCase() + fk.slice(1)}</button> })}
  //     </div>
  //     <br/>
  //     <loadFlights/>
  //     <br/>
  //  <table className="table table-striped">
  //   <thead>
  //     <tr>
  //       <th scope="col">ID</th>
  //       <th scope="col">Date</th>
  //       <th scope="col">Duration</th>
  //       <th scope="col">Price</th>
  //       <th scope="col">Origin</th>
  //       <th scope="col">Destination</th>
  //       <th scope="col">Link</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //      {table}
  //   </tbody>
  // </table>
  //     {/* <button onClick={() => setTable(mapper(flights.sort(sorter('price'))))}>pris</button>
  //     <button onClick={() => setTable(mapper(flights.sort(sorter('duration'))))}>duration</button>
  //     <button onClick={() => setTable(mapper(flights.sort(sorter('id'))))}>id</button>
  //     <button onClick={() => setTable(mapper(flights.sort(sorter('date'))))}>date</button>
  //     <button onClick={() => console.log(flightKeys.map((fk)=>{return <p>{fk + 1}</p> }))}>lalala</button> */}

  //   </div>
  // );

  const SearchFlights = (urlend) =>{
    fetch('http://localhost:8080/jjugroup/api/flight/' + urlend)
    .then(res => res.json())
    .then((data) => {
      setFlights(data)
      setTable(mapper(data)
      )
    })

  }

  const FromToSearchForm = () => {
    const [origin,setOrigin] = useState("");
    const [destination,setDestination] = useState("");
  
    return(
      <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="">Find rejse fra </span>
      </div>
      <input type="text" className="form-control" placeholder="Afrejsedestination" id="input1" onChange={(event)=>setOrigin(event.target.value)} value={origin} />
      <div className="input-group-prepend">
        <span className="input-group-text" id="">til</span>
      </div>
      <input type="text" className="form-control" placeholder="Ankomstdestination" id="input2" onChange={(event)=>setDestination(event.target.value)} value={destination} />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" id="btn1" onClick={() => SearchFlights('fromto/' + origin + '-' + destination)} >Søg</button>
      </div>
    </div>
    );
  }

  const DateSearchForm = () => {
    const [date,setDate] = useState("");
  
    return(
      <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="">Find rejse dato </span>
      </div>
      <input type="date" className="form-control" placeholder="Ankomstdestination" id="input3" onChange={(event)=>setDate(event.target.value)} value={date} />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" id="btn1" onClick={() => SearchFlights('date/' + date)} >Søg</button>
      </div>
    </div>
    );
  }



  return (
    <div className="App">
      <h1>AviNation</h1>

      <FromToSearchForm/>
      <DateSearchForm/>
      <button type="button" className="btn btn-outline-danger" onClick={() => GetAllFlight()}>Reset</button>

      <h5>Sort by:</h5>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => setTable(mapper(flights.sort(sorter('id'))))}>ID</button>
        <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => setTable(mapper(flights.sort(sorter('price'))))}>Price</button>
        <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => setTable(mapper(flights.sort(sorter('flightDuration'))))}>Duration</button>
        <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => setTable(mapper(flights.sort(sorter('depatureTime'))))}>Dep</button>
      </div>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">Duration</th>
            <th scope="col">Origin</th>
            <th scope="col">Destination</th>
            <th scope="col">Price</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
      </div>)
  }
  
export default App;