import { useEffect, useState } from "react"
import Button from "../../components/Button"
import FileUploader from "../../components/FileUploader"
import InputField from "../../components/Input"
import { getProperties } from "../../services/property.services";

export default function CreateRoom() {
  const [propertiesList, setPropertiesList] = useState([]);

  const getPropertiesByAPI = async() => {
    try {
        let response = await getProperties();
        console.log(response.data.data);
    }
    catch(err) {

    }
    finally {
        
    }
  }

  useEffect(function() {
    getPropertiesByAPI();
  }, [])


  return (
    <div className="w-full p-4">
      
    </div>
  )
}
