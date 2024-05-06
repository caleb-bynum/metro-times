import React, { useState, useEffect } from 'react'

function App() {
  const [metroData, setMetroData] = useState(null)
  
  useEffect(() => {
    const fetchMetroData = () => {
      fetch('https://api.wmata.com/StationPrediction.svc/json/GetPrediction/K01', {
        headers: {
          'api_key' : 'e13626d03d8e4c03ac07f95541b3091b'
        }
      })
        .then( response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Network response was not ok.');
        })
        .then( data => {
          setMetroData(data)
        })
        .catch( error => {
          console.error('There has been a problem with your fetch operation:', error)
        });
    };

    fetchMetroData();

    const intervalId = setInterval(fetchMetroData, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>
        Court House
      </h1>
      <h2>
        Next Trains
      </h2>
      <table className='metro-data'>
        <thead>
          <tr>
            <th>Line</th>
            <th>Car</th>
            <th>Dest</th>
            <th>Min</th>
          </tr>
        </thead>
        <tbody>
          {metroData && metroData.Trains.map((train, index) => (
            <tr key={index}>
              <td>{train.Line}</td>
              <td> {train.Car}</td>
              <td>{train.DestinationName}</td>
              <td>{train.Min}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App;
