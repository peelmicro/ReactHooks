import React, {useState, useEffect} from 'react';

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
}

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null});
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState);
  let geolocationMounted = true;

  useEffect(() => {
    document.title = `You have click ${count} times`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const geolocationWatchId = navigator.geolocation.watchPosition(handleGeolocation)

    // Here we tell the useEffect what we want to do when the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
      geolocationMounted = false;
      navigator.geolocation.clearWatch(geolocationWatchId);
    }
  }, [count]) // Every time count changes it is executed.

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  }  

  const toggleLight = () => {
    setIsOn(previousIsOn => !previousIsOn);
  }

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    });
  }

  const handleOnlineStatus = () => {
    setOnlineStatus(true);
  }

  const handleOfflineStatus = () => {
    setOnlineStatus(false);
  }
  
  const handleGeolocation = event => {
    if (geolocationMounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      })
    }
  }

  return (
    <>
    <h2>Counter</h2>
    <button onClick={incrementCount}>I was clicked {count} times</button>

    <h2>Toggle Light</h2>
    <img 
      src={
        isOn 
          ? 'https://icon.now.sh/highlight/fd0'
          : 'https://icon.now.sh/highlight/aaa'
      }
      style={{
        height: '50px',
        width: '50px'
      }}
      alt="Flashlight"
      onClick={toggleLight}
      >
    </img>

    <h2>Mouse Position</h2>
    {JSON.stringify(mousePosition, null, 2 )}
    <br />   

    <h2>Network Status</h2>
    <p>You are <strong>{onlineStatus ? 'online': 'offline'}</strong></p>

    <h2>Geolocation</h2>
    <p>Latitude is: {latitude}</p>
    <p>Longitude is: {longitude}</p>
    <p>Your speed is: {speed ? speed: '0'}</p>
    </>
  ) 
}

export default App;