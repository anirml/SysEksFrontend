import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
const flights = [{id: 1, date: 'Dec 1, 2019 8:50:00 PM', duration: 60000, price: 72.0, origin: 'CPH', destination: 'LHR', link: 'http://corndog.io/'},
{id: 2, date: 'Dec 1, 2019 6:50:00 PM', duration: 70000, price: 122.0, origin: 'CPH', destination: 'LHR', link: 'http://beesbeesbees.com/' },
{id: 3, date: 'Dec 1, 2019 7:20:00 PM', duration: 45000, price: 95.0, origin: 'CPH', destination: 'LHR', link: 'https://thatsthefinger.com/'}]

  return (
    <div className="App">
      <h1>JJUGroup</h1>
      <table border="1">
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Duration</th>
          <th>Price</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Link</th>
        </tr>
        {flights.map((f)=>{
          return <tr><td>{f.id}</td>
          <td>{f.date}</td>
          <td>{f.duration}</td>
          <td>${f.price}</td>
          <td>{f.origin}</td>
          <td>{f.destination}</td>
          <td><a href={f.link}>Link</a></td>
          
          </tr>
        })}

      </table>
    </div>
  );
}

export default App;