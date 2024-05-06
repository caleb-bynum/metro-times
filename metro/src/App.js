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
        Metro data
      </h1>
      <pre className="metro-data">
      {JSON.stringify(metroData, null, 2)}
      </pre>
    </div>
  )
}

export default App;
