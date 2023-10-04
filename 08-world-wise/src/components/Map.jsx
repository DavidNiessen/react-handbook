import styles from './Map.module.css';
import { useNavigate } from 'react-router-dom';
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../context/CitiesContext.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { Button } from './Button.jsx';
import { useURLPosition } from '../hooks/useURLPosition.js';

const ChangeMapCenter = ({ position }) => {
	const map = useMap();
	map.setView(position);

	return null;
};

const DetectMapClick = () => {
	const navigate = useNavigate();

	useMapEvents({
		click: event =>
			navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
	});
};

const Map = () => {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([0, 40]);
	const {
		isLoading: isLoadingPosition,
		position: geoLocationPosition,
		getPosition,
	} = useGeolocation();

	const [mapLat, mapLng] = useURLPosition();

	useEffect(() => {
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geoLocationPosition) setMapPosition(geoLocationPosition);
	}, [geoLocationPosition]);

	return (
		<div className={styles.mapContainer}>
			{!geoLocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? 'Loading' : 'Go to your position'}
				</Button>
			)}
			<MapContainer
				className={styles.map}
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{cities.map(city => (
					<Marker key={city.id} position={city.position}>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}

				<ChangeMapCenter position={mapPosition} />
				<DetectMapClick />
			</MapContainer>
		</div>
	);
};

export { Map };
