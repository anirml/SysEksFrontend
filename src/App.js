import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import logo from './AVINATION_3-01.svg';

function App() {

  const url = 'https://jjugroup.ga/SysEksBackend/api/flight/combined'

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

  const errorCheck = (prop) => {
    if (prop['code'] != null){
    alert( prop['message'])
  } else {
    return setTable(mapper(prop))
  }
}

  const mapper = (array) => {
    return array.map((f) => {
      return <tr key={f.id}><th scope="row" id="table_content">{f.id}</th>
        <td className="table_content_class">{f.departureTime}</td>
        <td className="table_content_class">{milliToHourMin(f.flightDuration)}</td>
        <td className="table_content_class">{f.departureAirportCode} - {f.departureAirportName}</td>
        <td className="table_content_class">{f.arrivalAirportCode} - {f.arrivalAirportName}</td>
        <td className="table_content_class">${f.price}</td>
        <td className="table_content_class"><a className="btn btn-success" href={f.link}>Se tilbud</a></td>
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
    fetch('https://jjugroup.ga/SysEksBackend/api/flight/' + urlend)
    .then(res => res.json())
    .then((data) => {
      setFlights(data)
      errorCheck(data)
    })

  }

  const FromToSearchForm = () => {
    const [origin,setOrigin] = useState("");
    const [destination,setDestination] = useState("");
  
    return(
    <div id="destination_form">
      <div id="destination_form_text1">
        <span>Find rejse ud fra destination</span>
      </div>
      <input className="form-control" placeholder="Afrejsedestination" id="arrival_input1" onChange={(event)=>setOrigin(event.target.value)} value={origin} />
      <input className="form-control" placeholder="Ankomstdestination" id="arrival_input2" onChange={(event)=>setDestination(event.target.value)} value={destination} />
      <div id="destination_button">
        <button className="search_button" onClick={() => SearchFlights('fromto/' + origin + '-' + destination)} >Søg</button>
      </div>
    </div>
    );
  }

  const DateSearchForm = () => {
    const [date,setDate] = useState("");
  
    return(
    <div id="date_form">
      <div id="date_form_text">
        <span>Find rejse ud fra dato </span>
      </div>
      <input type="date" className="form-control" id="date_input" placeholder="Ankomstdestination" onChange={(event)=>setDate(event.target.value)} value={date} />
      <div id="date_button">
        <button className="search_button" type="button" id="btn1" onClick={() => SearchFlights('date/' + date)} >Søg</button>
      </div>
    </div>
    );
  }



  return (
    <div className="App">
      
      <div id="header">
        <img src={logo} alt="AviNation Logo" id="logo"/>
      </div>

      <FromToSearchForm/>
      <DateSearchForm/>
      
      
      
      <span id="sort_by_text">Sort by:</span>
      
      <div role="group" id="table" aria-label="Basic example">
        <button className="sort_buttons" onClick={() => setTable(mapper(flights.sort(sorter('id'))))}>ID</button>
        <button className="sort_buttons" onClick={() => setTable(mapper(flights.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime))))}>Date</button>
        <button className="sort_buttons" onClick={() => setTable(mapper(flights.sort(sorter('flightDuration'))))}>Duration</button>
        <button className="sort_buttons" onClick={() => setTable(mapper(flights.sort(sorter('price'))))}>Price</button>
        <button type="button" id="reset_button" onClick={() => GetAllFlight()}>Reset</button>
        
      </div>
      <table id="category_table">
        <thead>
          <tr >
            <th scope="col" id="ID_table_head" className="category_table_head">ID</th>
            <th scope="col" className="category_table_head">Date</th>
            <th scope="col" className="category_table_head">Duration</th>
            <th scope="col" className="category_table_head">Origin</th>
            <th scope="col" className="category_table_head">Destination</th>
            <th scope="col" className="category_table_head">Price</th>
            <th scope="col" className="category_table_head">Link</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
      </div>)
  }
  
export default App;