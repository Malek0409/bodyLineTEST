import React, { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import axios from "axios";

const NewProduct = () => {
  const [data, setData] = useState({
    title: "",
    price: "",
    currency: "",
    unitNumber: "",
    description: "",
    typeMachine: "",  
    nameMuscle: []
  });

  const [filePicture, setFilePicture] = useState(null);


//  const handleOnChange = (e) => {
//     const { name, value, checked } = e.target;

//     if (name === "nameMuscle") {
//       if (checked) {
//         setData(prev => ({
//           ...prev,
//           nameMuscle: [...prev.nameMuscle, value]
//         }));
//       } else {
//         setData(prev => ({
//           ...prev,
//           nameMuscle: prev.nameMuscle.filter(muscle => muscle !== value)
//         }));
//       }
//     } else {
//       setData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//  };
  const handleOnChange = (e) => {
  const { name, value, checked } = e.target;

  console.log("Event target details:", { name, value, checked }); // Afficher les détails de l'événement

  if (name === "nameMuscle") {
    if (checked) {
      setData(prev => {
        const newData = {
          ...prev,
          nameMuscle: [...prev.nameMuscle, value]
        };
        console.log("Updated data with checked:", newData); // Afficher les nouvelles données si checked est true
        return newData;
      });
    } else {
      setData(prev => {
        const newData = {
          ...prev,
          nameMuscle: prev.nameMuscle.filter(muscle => muscle !== value)
        };
        console.log("Updated data with unchecked:", newData); // Afficher les nouvelles données si checked est false
        return newData;
      });
    }
  } else {
    setData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      console.log("Updated data for other inputs:", newData); // Afficher les nouvelles données pour les autres inputs
      return newData;
    });
  }
};

  const handleFileChange = (e) => setFilePicture(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("currency", data.currency);
    formData.append("unitNumber", data.unitNumber);
    formData.append("description", data.description);
    formData.append("typeMachine", data.typeMachine);
    formData.append("productPicture", filePicture);
    formData.append("nameMuscle", JSON.stringify(data.nameMuscle)); 
    

 if (data.title && data.price && data.currency && data.unitNumber && data.description){
    
   try {
          const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}addProduct`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.status === "Success") {
            
            alert(res.data.status);
            
          } else {
            alert("Database error",res.data.error);

          }
        } catch (error) {
          alert("Error submitting form", error);
        } 
    } else {
      alert("All fields are required ");
    }
  }

  return (
    <div className='p-4 md:p-28'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='title'>title</label>
       
        <input type={'text'} name='title' className='bg-slate-200 p-1' onChange={handleOnChange} value={data.title} />
       
              <label htmlFor='typeMachine'>typeMachine</label>
        <select className='bg-slate-200 p-1 my-1' name="typeMachine" id="typeMachine" onChange={handleOnChange} value={data.typeMachine}>
            
          <option value={"option"}>Select Category</option>
          <option value={"machine"}>Machines</option>
          <option value={"alteres"}>Alteres</option>
          <option value={"barres"}>barres</option>
          <option value={"lastique"}>lastique</option>
          <option value={"equipement"}>equipement</option>

        </select>

        <label htmlFor='muscleName' className="block text-lg font-medium text-gray-700 mb-2">Muscle Name</label>
        <div className='bg-slate-200 p-4 rounded-lg shadow-md'>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input type="checkbox" id="Jambes" name="nameMuscle" value="Jambes" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Jambes" className="ml-2 block text-sm text-gray-900">Jambes</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Fesses" name="nameMuscle" value="Fesses" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Fesses" className="ml-2 block text-sm text-gray-900">Fesses</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Lombaire" name="nameMuscle" value="Lombaire" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Lombaire" className="ml-2 block text-sm text-gray-900">Lombaire</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Dorceaux" name="nameMuscle" value="Dorceaux" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Dorceaux" className="ml-2 block text-sm text-gray-900">Dorceaux</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Biceps" name="nameMuscle" value="Biceps" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Biceps" className="ml-2 block text-sm text-gray-900">Biceps</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Triceps" name="nameMuscle" value="Triceps" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Triceps" className="ml-2 block text-sm text-gray-900">Triceps</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Trapèzes" name="nameMuscle" value="Trapèzes" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Trapèzes" className="ml-2 block text-sm text-gray-900">Trapèzes</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Pecteraux" name="nameMuscle" value="Pecteraux" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Pecteraux" className="ml-2 block text-sm text-gray-900">Pecteraux</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="Epaules" name="nameMuscle" value="Epaules" onChange={handleOnChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="Epaules" className="ml-2 block text-sm text-gray-900">Epaules</label>
            </div>
          </div>
        </div>     

        <label htmlFor="productPicture">Image
          <div className='h-40 w-full bg-slate-300 rounded flex items-center justify-center cursor-pointer'>
            {filePicture ? (
            <img src={URL.createObjectURL(filePicture)} alt="Selected" className='h-full' />
            ) : (
            <span className='text-5xl'><BsCloudUpload /></span>
            )}
            <input type="file" accept="image/*" id="productPicture" onChange={handleFileChange} className='hidden' />
          </div>
        </label>

        
        

  
        <div className="flex flex-col sm:flex-row items-center bg-slate-200 p-4 rounded-lg shadow-md gap-4">
            
            
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
            
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-0 sm:mr-2">Price</label>
            <input type="text" className="bg-white p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="price" id="price" onChange={handleOnChange} value={data.price} />
            
          </div>
            
            
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
    
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-0 sm:mr-2">Currency</label>
            <input type="text" className="w-full bg-white p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="currency" id="currency" onChange={handleOnChange} value={data.currency} />
            
          </div>

          
        </div>


        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto bg-slate-200 p-4 rounded-lg shadow-md gap-4">
            
          <label htmlFor="unitNumber" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-0 sm:mr-2">unitNumber</label>
          <input type="text" className="bg-white p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="unitNumber" id="unitNumber" onChange={handleOnChange} value={data.unitNumber} />
            
        </div>

        <label htmlFor='description'>Description</label>
        <textarea rows={2} className='bg-slate-200 p-1 my-1 resize-none' id='description' name='description' onChange={handleOnChange} value={data.description}></textarea>

        <button className='bg-red-500 hover:bg-red-700 text-lg drop-shadow font-medium my-2 '>Save</button>
      </form>
    </div>
  )
  
}
export default NewProduct
