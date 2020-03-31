import React from "react";
import { Icon } from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const greenIcon = new Icon({
	iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const redIcon = new Icon({
	iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const greyIcon = new Icon({
	iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

function setIcon(data, center, position) {
	let totalMask = data.mask.adult + data.mask.child;
	let isCenter = center[0] === position[0] && center[1] === position[1];
	return  isCenter ? redIcon : totalMask > 0 ? greenIcon : greyIcon;
}

const MaskMap = ({center, zoom, list, style}) => (
  <Map center={center} zoom={zoom} style={style}>
    <TileLayer url={OSMUrl} />
      {list && list.map((data) => (
        <Marker key={data.id} position={[data.coordinates.latitude, data.coordinates.longitude]} icon={setIcon(data, center, [data.coordinates.latitude, data.coordinates.longitude])}>
          <Popup>
						<div style={{padding: '0px 10px',width: '300px'}}>
							<h3 style={{fontSize:'18px',margin:'10px 0'}}>{data.name}</h3>
							<p style={{fontSize:'14px',color:'#666666',margin:'5px 0'}}>地址 : {data.address}</p>
							<p style={{fontSize:'14px',color:'#666666',margin:'5px 0'}}>電話 : {data.phone}</p>
							<p style={{fontSize:'14px',color:'#666666',margin:'5px 0'}}>更新時間 : {data.updated}</p>
							<div style={{background:'#fff',width:'100%',height:'30px',margin:'10px 0 '}}>
								<div style={{width:'50%',float:'left'}}>
									<div style={{background:'#73C0D8',width:'90%',height:'30px',lineHeight:'30px',borderRadius:'8px', textAlign:'center',fontSize:'14px'}}>
										<div style={{color:'#fff',float:'left',margin:'0 15px'}}>成人</div>
										<div style={{color:'#fff',float:'right',margin:'0 15px'}}>{data.mask.adult}</div>
									</div>
								</div>
								<div style={{width:'50%',float:'right'}}>
									<div style={{background:'#FFA573',width:'90%',height:'30px',lineHeight:'30px',borderRadius:'8px', textAlign:'center',fontSize:'14px'}}>
										<div style={{color:'#fff',float:'left',margin:'0 15px'}}>兒童</div>
										<div style={{color:'#fff',float:'right',margin:'0 15px'}}>{data.mask.child}</div>
									</div>
								</div>
							</div>
						</div>
          </Popup>
        </Marker>
      ))}
  </Map>
);

export default MaskMap;