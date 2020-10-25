import React, { Fragment, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function PhoneInputCustom (props) {
    const [state, setState] = useState({
        hasValue: null,
        isValid: null
    })
    
    function handleChange(value, country, e, formattedValue){
        props.onChange(value, country,formattedValue)
        if(!state.hasValue){
            setState(state => ({...state, hasValue: true}))
        }
    }

    function handleBlur(){
        const value = props.value
        if(value.formattedValue.substring(1,) === value.value){
            setState(state => ({...state, hasValue: false}))
        }else{
            props.isValid()
        }
    }

    return (
        <Fragment>
            <PhoneInput
                enableSearch
                placeholder="+225 000 000 00"
                country={'ci'}
                inputStyle={{width: "100%", paddingLeft: 50}}
                dropdownStyle={{
                    display: "flex", 
                    flexDirection: "column",
                    alignItems: "flex-start"
                }}
                
                value={props.value.value}
                onChange={handleChange}
                onBlur={handleBlur}
                // {...props}
            />
            
            <div style={{color: 'red', fontSize: 12}}>
                {props.required && state.hasValue === false ? props.requiredText : ""}
            </div>
        </Fragment>
    )
}
