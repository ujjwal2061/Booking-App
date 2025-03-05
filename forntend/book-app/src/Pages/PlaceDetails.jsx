import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
export default function PlaceDetails(){
    const {id}=useParams()
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(!id){
           return
        }else{
           axios.get("/places/"+id).then(response=>{
            setData(response.data)
           setLoading(false)
           })
        }
           },[id])
           if(loading){
            return <p>Loading...</p>
           }
    return (
        <div>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
    </div>
    )
}