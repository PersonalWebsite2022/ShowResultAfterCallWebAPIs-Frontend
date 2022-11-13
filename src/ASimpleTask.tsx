import { useState } from 'react'
import { Result } from './Result'

export const ASimpleTask = () => {

    const options = [
        {value: 'true', text: 'Success'},
        {value: 'false', text: 'Failure'}
    ];

    const [selected, setSelected] = useState(options[0].value);

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        const value = event.target.value;
        setSelected(value);
    }

    function handleSubmit(e:any){
        e.preventDefault();
        doASimpleTask(selected);
    }

    //Result from Web API
    const [resultFromWebAPI, setResultFromWebAPI] = useState('');
    const [success, setSuccess] = useState('');
    const [show, setShow] = useState('false');
    //Get value from Result Component
    const getShowFromResult = (value:any) => {
        setShow(value);
    }

    const doASimpleTask = async (selectedValue:string) => {
        //alert(selectedValue);
        await fetch(
            "https://localhost:40001/api/Result/ASimpleTask/" + selectedValue
        )
        .then((response) =>{
            //alert(response.status.toString()); //always 200 from Web API
            return response.json();
        })
        .then((data)=>{
            console.log(data);
            if(data === "The task has been done successfully.") {
                setSuccess('true');
            }
            else if(data === "An error occured. Try it later.") {
                setSuccess('false');
            }
            setResultFromWebAPI(data);
            setShow('true');
        })
        .catch((err) => {
            //alert(err.message); //500, for example Web API is not running
            setResultFromWebAPI(err.message);
            setSuccess('false');
            setShow('true');
            console.log(err.message);
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <Result getValue={getShowFromResult} showFromASimpleTask={show} resultFromResultWebAPI={resultFromWebAPI} successFromResult={success} />
            <div>
                <select onChange={handleChange}>
                    {
                        options.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))
                    }
                </select>
            </div>
            <button type="submit">Do A Simple Task</button>
        </form>
    )
}