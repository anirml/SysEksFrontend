import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
const flights = [{id: 1, date: 'Dec 1, 2019 8:50:00 PM', duration: 60000, price: 72.0, origin: 'CPH', destination: 'LHR', link: 'http://corndog.io/'},
{id: 2, date: 'Dec 1, 2019 6:50:00 PM', duration: 70000, price: 122.0, origin: 'CPH', destination: 'LHR', link: 'http://beesbeesbees.com/' },
{id: 3, date: 'Dec 1, 2019 7:20:00 PM', duration: 45000, price: 95.0, origin: 'CPH', destination: 'LHR', link: 'https://thatsthefinger.com/'}]


function sorter(sortBy){
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

function priceflight(array) {return flights.sort(sorter("price"))}

  return (
    <div className="App">
      <h1>Memeondo</h1>
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Date</th>
          <th scope="col">Duration</th>
          <th scope="col">Price</th>
          <th scope="col">Origin</th>
          <th scope="col">Destination</th>
          <th scope="col">Link</th>
        </tr>
        </thead>
        <tbody>
        {flights.map((f)=>{
          return <tr><th scope="row">{f.id}</th>
          <td>{f.date}</td>
          <td>{f.duration}</td>
          <td>${f.price}</td>
          <td>{f.origin}</td>
          <td>{f.destination}</td>
          <td><a className="btn btn-success" href={f.link}>Se tilbud</a></td>
          </tr>
        })}
        </tbody>
      </table>
      <p>{console.log(flights.sort(sorter('duration')))}</p>
      
    </div>
  );
}

export default App;