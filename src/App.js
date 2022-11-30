import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [backendBilleder, setBackendBilleder] = useState([{}]);

  useEffect(() => {
    fetch("/billeder")
      .then((response) => response.json())
      .then((billeder) => {
        setBackendBilleder(billeder);
      });
  }, []);

  const handlepost = () => {
    const dict = {
      nima: "EH",
      kasper: "TOP G CHAD",
      mathias: 109
    }
    axios.post("http://localhost:5000/unlink", dict)
    }
  return (
    <div>
      <div>
        <button onClick={handlepost}>Hej</button>
      </div>
      {typeof backendBilleder.billeder === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendBilleder.billeder.map((billede, i) => <p key={i}>{billede}</p>)
      )}
    </div>
  );
}

export default App;
