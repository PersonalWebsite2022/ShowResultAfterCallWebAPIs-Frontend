import { useState } from 'react';

export const Result = (props:any) => {
    const [value, setValue] = useState('');
    const setValueToFalse = () => {
        setValue('false');
        props.getValue('false');
    };
    //alert(props.showFromResult.toString());
    if(props.showFromASimpleTask.toString()==="false") {
        return <div></div>
    }
    else{
        //alert(props.successFromResult.toString());
        if(props.successFromResult.toString()==="true") {
            if(props.showFromASimpleTask.toString()==="true") {
                setTimeout(() => { setValueToFalse(); }, 3000);
            }
            return (
                <div style={{backgroundColor:"green"}}>
                    {props.resultFromResultWebAPI}
                </div>
            )    
        }
        else {
            if(props.showFromASimpleTask.toString()==="true") {
                setTimeout(() => { setValueToFalse(); }, 3000);
            }
            return (
                <div style={{backgroundColor:"red"}}>
                    {props.resultFromResultWebAPI}
                </div>
            )
        }
    }
}