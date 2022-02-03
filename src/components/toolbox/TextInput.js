import React from "react";

const TextInput = ({name, lable, onChange,placeHolder, value, error})=> {
    let wrapperClass ="from-group";
    if(error && error.length > 0) {//eğer error varsa 
        wrapperClass += "has-error";
    }
    return(
        <div className="wrapperClass">
            <label htmlFor={name} />
            <div className="field">
                <input className="form-control"
                 type="text"
                  name={name} 
                  value={value} 
                  placeholder={placeHolder} 
                  onChange={onChange} />

                  {error && <div className="alert alert-danger">
                      {error}
                  </div>}

            </div>
            
        
        </div>
    )

}
export default TextInput