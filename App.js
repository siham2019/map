import './App.css';
import { useEffect,useRef,useState } from "react";
import mapboxgl from 'mapbox-gl';
import axios from 'axios'
function App() {
const [adress, setadress] = useState("")
const [id, setid] = useState(0)

  const mapContainerRef = useRef(null);
  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [28.000027,2.999983],
      zoom:3
      });
    
       axios.get("http://localhost:8000/").then((res)=>{
         res.data.map((e)=>{
            return new mapboxgl.Marker()
            .setLngLat([e.latitude, e.longitude])
            .addTo(map);
         })
        }
      ).catch(err=>console.log(err)) 

     /*  new mapboxgl.Marker()
      .setLngLat([28.000027,2.999983])
      .addTo(map); */
  
        var nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-left');

  }, [])
  const submit=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8000/",{id:id,adress:adress}).catch(err=>console.log(err)) 
  }
  return (
    <div  >
          <div>
          <form onSubmit={submit}>
                <label >id</label>
                 <input type="text" name="id" value={id} onChange={(e)=>setid(e.target.value)}/>
                  <br/>
                 <label >adress</label>
                 <input type="text" name="adress" value={adress} onChange={(e)=>setadress(e.target.value)}/>
             <button type="submit">submit</button>
        </form>
          </div>
      
        <div id="map" className="map-container" ref={mapContainerRef}></div>
       
        
        
    

    </div>
  );
}

export default App;
