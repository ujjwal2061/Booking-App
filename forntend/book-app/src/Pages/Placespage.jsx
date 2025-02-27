import { Link, useParams } from "react-router";
import { FaPlus } from "react-icons/fa";
import { FaWifi ,FaCarAlt ,
    FaTv ,FaCloudUploadAlt
} from "react-icons/fa";
import { LiaDogSolid } from "react-icons/lia";
import { FaRadio } from "react-icons/fa6";
;
export default function PlacesPage(){
    const {action}=useParams()

 return(
<div>
    {action !=='new'&&(
       <div className="text-center">
       <Link className="inline-flex items-center gap-2  bg-primary text-white py-2 px-4 rounded-full " to={'/account/places/new'} >
       <FaPlus /> Add new</Link>
          </div>
    ) }
   {action === 'new' && (
  <div>
     <form>
      <h2 className="text-2xl  font-serif">Title</h2>
      <p className="text-gray-500 text-sm">Title for Your Place,should</p>
      <input type="text"  placeholder="Title ,for example My lovely apt" />
      <h2 className="text-xl  font-serif mt-2">Address</h2>
      <p className="text-gray-500 text-sm">Address to this Place</p>
      <input type="text" placeholder="Address" />
      <h2 className="text-xl mt-2  font-serif">Photo</h2>
      <p className="text-gray-500 text-sm ">Photo of this Place </p>
      <div className="flex gap-2 items-center ">
        <input type="text" placeholder={"Add using link...... jpg"} />
        <button className="bg-gray-300 h-12 w-auto  px-6  rounded-2xl ">Add&nbsp;Photo</button>
      </div>
      <div className="mt-2 grid  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <button className="border flex justify-center items-center  gap-2 bg-transparent rounded-2xl px-2 py-4 shadow-md text-slate-950 "> <FaCloudUploadAlt /> Upload Photo</button>
      </div>
      <h2 className="text-xl  font-serif">Description</h2>
      <p className="text-gray-500 text-sm ">Description of the Place</p>
      <textarea rows={3}  placeholder="Descripton about the place"/>
      <h2 className="text-xl  font-serif">Perkes</h2>
      <p className="text-gray-500 text-sm ">Slecte all  of the Pekers of Your Place</p>
        <div className="grid gap-2  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <label className=" cursor-pointer border p-4  flex rounded-2xl gap-2 items-center">
                <input type="checkbox" />
                <span className="flex items-center gap-1"><FaWifi />Wifi</span>
            </label>
            <label className=" cursor-pointer border p-4  flex  rounded-2xl gap-2 items-center">
                <input type="checkbox" />
                <span className="flex items-center gap-1"><FaCarAlt />Free Parking</span>
            </label>
            <label className=" cursor-pointer border p-4  flex rounded-2xl gap-2 items-center">
                <input type="checkbox" />
                <span className="flex items-center gap-1"><FaTv />TV</span>
            </label>
            <label className=" cursor-pointer border p-4  flex rounded-2xl gap-2 items-center">
                <input type="checkbox" />
                <span className="flex items-center gap-1"><LiaDogSolid />Pets</span>
            </label>
            <label className=" cursor-pointer border p-4  flex rounded-md gap-2 items-center">
                <input type="checkbox" />
                <span className="flex items-center gap-1"><FaRadio />Radio</span>
            </label>
        </div>
    </form>
</div>
 )}
    </div>
 )
}