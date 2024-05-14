import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import marker from './vector.svg';
import { Icon } from 'leaflet';

import 'leaflet/dist/leaflet.css';
const myIcon = new Icon({
 iconUrl: marker,
 iconSize: [32,32]
})

const Login = () => {
  const [mapPoints, setMapPoints] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      // Parse data
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Update state
      const points = data.slice(1).map((row) => ({
        lat: row[3],
        lng: row[4]
      }));
      setMapPoints(points);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '1200px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        {mapPoints.map((point, idx) => (
          <Marker key={idx} position={[point.lat, point.lng]} icon={myIcon}>
            <Popup>
              Latitude: {point.lat} <br /> Longitude: {point.lng}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Login;
