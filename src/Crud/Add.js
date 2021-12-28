import React,{useState} from 'react'

const Add = () => {
    const [inputChange, setInputChange]= useState({id:null, name:"" });
    const [emailChange, setEmailChange]= useState({id:null, email:""})
    const [numberChange, setNumberChange]= useState({id:null, number:""})
    const [addValue, setAddValue] = useState([]);
    const [boolValue, setBoolValue]= useState(false)

    const handelChange =(e)=>{
        setInputChange({...inputChange,name:e.target.value});
    }
    const handelEmail =(e)=>{
        setEmailChange({...emailChange, email:e.target.value})

    }
    const handelNumber=(e)=>{
        setNumberChange({...numberChange, number: e.target.value})
    }

    const handelAdd =()=>{
        setAddValue([...addValue,inputChange, emailChange, numberChange])
        setInputChange({id:null, name:""})
        setEmailChange({id:null, email:""})
        setNumberChange({id:null, number:""})
    }
    const handelEdit =(item)=>{
        setBoolValue(true);
        setInputChange(item)
    }
    const handelUpdate=()=>{
        let index = addValue.findIndex((item)=> item.id===inputChange.id)
        let index1 =  addValue.findIndex((item)=> item.id===emailChange.id)
        let index2 = addValue.findIndex((item)=> item.id===numberChange.id)
        addValue[index].name= inputChange.name;
        addValue[index1].email= inputChange.email;
        addValue[index2].number= inputChange.number;
        setAddValue([...addValue])
        setBoolValue(false)

    }
    return (
        <>
            <div>
                {boolValue ?
                <>
                 <input type="text" onChange={(e)=>handelChange(e)}  value={inputChange.name} ></input>
                <input type="email" onChange={(e)=>handelEmail(e)}  value={inputChange.email} ></input>
                <input type="number" onChange={(e)=>handelNumber(e)}  value={inputChange.number} ></input>

                <button onClick={handelUpdate} >update</button>
                </>:
                <>
                
                <input type="text" onChange={(e)=>handelChange(e)}  value={inputChange.name} onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      console.log(event);
                      handelAdd();
                    }
                  }}></input>
                <input type="email" onChange={(e)=>handelEmail(e)}  value={inputChange.email} onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      console.log(event);
                      handelAdd();
                    }
                  }}></input>
                <input type="number" onChange={(e)=>handelNumber(e)}  value={inputChange.number} onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      console.log(event);
                      handelAdd();
                    }
                  }}></input>

                <button onClick={handelAdd} onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      console.log(event);
                      handelAdd();
                    }
                  }}>Add</button>
                </>}
            </div>
            <div>
                {addValue.map((curElem, index)=>{
                   return( <div key={index}>
                    <div>{curElem.name}</div>
                    <div>{curElem.email}</div>
                    <div>{curElem.number}</div>
                    <button onClick={()=>handelEdit(curElem)}>edit</button>
                    <button>delete</button>
                    </div>
                    )
                })}
            </div>
        </>
    )
}

export default Add
