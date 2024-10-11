import React , {useEffect, useState} from 'react'
import "./App.css"
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const App = () => {
  const [ipvalue, setipvalue] = useState('')
  const [lists, setlists] = useState([])
  const [editid, seteditid] = useState(null)

  const getdata = async()=>{
    const response = await fetch('http://localhost:5000')
      const result = await response.json()
      // console.log(result)
      if (result.status == 200){
      setlists(result.data)
      console.log(setlists);      
    }
  }

  const postdata = async()=>{
    if (ipvalue.trim() === '') {
      alert('Input felid is Required');
      return;
    }  
    
    const response = await fetch("http://localhost:5000",{
      method:'POST',
      headers:{
        "Content-type":"application/json",
      },
      
      body:JSON.stringify({
        ipvalue
      })
    })
    // console.log(response)
    if(response.ok) {
      setipvalue('')
      getdata()
    }
  }


  const putdata = async (editid) => {
    
    const response = await fetch(`http://localhost:5000?index=${editid}`,{
      method:'PUT',
      headers:{
        "Content-type":"application/json",
      },      
      body:JSON.stringify({ ipvalue })
    })
    console.log(response)
    if(response.status===200) {                  
      seteditid(null);
      setipvalue('');
      getdata();

    }
  }


  const deletedata = async (id) => {
    await fetch(`http://localhost:5000/${id}`,{
      method:'DELETE',      
    })
    getdata()
  }
  
  useEffect(()=>{
    getdata()
  },[])  

  return (
    <>
      <div className='container'>
          <h1 className='fs-3'>What is the Tasks Today</h1>
          <input value={ipvalue} onChange={(e)=>{setipvalue(e.target.value)}} type="text" required />
      
          {editid !== null ? (
            <button className='adup-btn bg-success' onClick={() => { putdata(editid) }}>Update</button>
          ) : (
            <button className='adup-btn bg-primary' onClick={postdata}>Add</button>)}
          {
            lists.map((item)=>{
              return (
                <div className='d-flex mt-4 todo-cont' key={item._id}>
                  <div>
                    <h5> {item.ipvalue} </h5>
                  </div>
                   
                   <div className='etdlbtns'>
                   <button className='etdl-btn fs-5 bg-warning ' onClick={()=>{seteditid(item._id); setipvalue(item.ipvalue)}}> <MdEdit /> </button>
                   <button className='etdl-btn fs-5 bg-danger' onClick={()=>{deletedata(item._id)}}> <MdDeleteForever /> </button>
                   </div>                   
                </div>                
              )
            })
          }
      </div>      
    </>
  )
}

export default App