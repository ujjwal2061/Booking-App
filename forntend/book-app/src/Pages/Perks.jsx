import { FaWifi ,FaCarAlt ,
    FaTv ,FaCloudUploadAlt
} from "react-icons/fa";
import { LiaDogSolid } from "react-icons/lia";
import { FaRadio } from "react-icons/fa6"

export default function Preks({selected,onChanage}){

    //adding the Preks and Filter of the Preks
    function handlecheck(ev){
        const {checked,name}=ev.target
     if(checked){
    onChanage([...selected,name])
    }else{
        onChanage([...selected.filter((selectedname)=>selectedname !==name)])
    }
    }
    return (
        <>
        <label className=" cursor-pointer border p-4  flex rounded-2xl gap-2 items-center">
                <input type="checkbox"  name={"wifi"} onChange={handlecheck}/>
                <span className="flex items-center gap-1"><FaWifi />Wifi</span>
            </label>
            <label className=" cursor-pointer border p-4  flex  rounded-2xl gap-2 items-center">
                <input type="checkbox" name={"Parking"} onChange={handlecheck} />
                <span className="flex items-center gap-1"><FaCarAlt />Free Parking</span>
            </label>
            <label className=" cursor-pointer border p-4  flex rounded-2xl gap-2 items-center">
                <input type="checkbox"   name={"TV"} onChange={handlecheck}/>
                <span className="flex items-center gap-1"><FaTv />TV</span>
            </label>
            <label className=" cursor-pointer border p-4  flex rounded-2xl gap-2 items-center">
                <input type="checkbox"  name={"Pets"} onChange={handlecheck} />
                <span className="flex items-center gap-1"><LiaDogSolid />Pets</span>
            </label>
            <label className=" cursor-pointer border p-4  flex rounded-md gap-2 items-center">
                <input type="checkbox"  name={"Radio"} onChange={handlecheck}/>
                <span className="flex items-center gap-1"><FaRadio />Radio</span>
            </label>
        </>
    )
}