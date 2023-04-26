import { useFormik } from "formik";

const validate = values => {
    const errors = {};
    if (!/^[A-Za-z\s]*$/.test(values.firstName)) {
        errors.firstName = 'Only alphabetic characters!';
    } else if (!/^[A-Za-z\s]*$/.test(values.lastName)) {
        errors.lastName = 'Only alphabetic characters!';
    }

    if (!/^[0-9]*$/.test(values.age)) {
        errors.age = 'Only numbers!';
    }

    if (values.notes.length > 100) {
      errors.notes = 'Must be 100 characters or less';
    }
  
    return errors;
  };

function Form() {
    
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            age: "",
            employeed: false,
            favoriteColor: "",
            sauces: {},
            stooge: "Larry",
            notes: ""
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        }
    });

    const handleReset = (e) => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const radioTypes = document.querySelectorAll('input[type="radio"]');
        console.log(e);
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        radioTypes.forEach((radio) => {
            radioTypes[0].checked = true;
        });

        formik.handleReset();
    }

    const replacer = (key, value) => {
        if (value === "" || (typeof value === "object" && Object.keys(value).length === 0) ) {
          return undefined;
        }
        return value;
    }

    return (
        <form action="#" className="form" onSubmit={formik.handleSubmit}>
            <div className="form-item">
                <label htmlFor="firstName">First Name</label>
                <input 
                id="firstName" 
                type="text" 
                placeholder="First Name" 
                name="firstName" 
                value={formik.values.firstName} 
                onChange={formik.handleChange}
                className={formik.errors.firstName ? "input-error" : ""}/>
                {formik.errors.firstName ? <p className="error-message">{formik.errors.firstName}</p> : null}
            </div>
            <div className="form-item">
                <label htmlFor="lastName">Last Name</label>
                <input 
                id="lastName" 
                type="text" 
                placeholder="Last Name" 
                name="lastName" 
                value={formik.values.lastName} 
                onChange={formik.handleChange}
                className={formik.errors.lastName ? "input-error" : ""}/>
                {formik.errors.lastName ? <p className="error-message">{formik.errors.lastName}</p> : null}
            </div>
            <div className="form-item">
                <label htmlFor="age">Age</label>
                <input id="age"
                 type="text" 
                 placeholder="Age" 
                 name="age" 
                 value={formik.values.age} 
                 onChange={formik.handleChange}
                 className={formik.errors.age ? "input-error" : ""}/>
                 {formik.errors.age ? <p className="error-message">{formik.errors.age}</p> : null}
            </div>
             <div className="form-item">
                <label htmlFor="employeed">Employeed</label>
                <input id="employeed" type="checkbox" name="employeed" value={formik.values.employeed} onChange={formik.handleChange}/>
            </div>
            
            <div className="form-item">
                <label htmlFor="color">Favorite color</label>
                <select name="favoriteColor" id="color" value={formik.values.favoriteColor} onChange={formik.handleChange}>
                    <option value=""></option>
                    <option value="#FF0000">Red</option>
                    <option value="#00FF00">Green</option>
                    <option value="#0000FF">Blue</option>
                </select>
            </div>
            <div className="form-item">
                <label>Sauces</label>
                <div>
                    <div>
                        <input 
                        id="ketchup" 
                        type="checkbox" 
                        name="sauces" 
                        value="ketchup" 
                        checked={formik.values.sauces.ketchup} 
                        onChange={formik.handleChange}/>
                        <label htmlFor="ketchup">Ketchup</label>
                    </div>
                    <div>
                        <input 
                        id="mustard" 
                        type="checkbox" 
                        name="sauces" 
                        value="mustard"
                        checked={formik.values.sauces.mustard} 
                        onChange={formik.handleChange}/>
                        <label htmlFor="mustard">Mustard</label>
                    </div>
                    <div>
                        <input 
                        id="mayonnaise" 
                        type="checkbox" 
                        name="sauces" 
                        value="mayonnaise"
                        checked={formik.values.sauces.mayonnaise} 
                        onChange={formik.handleChange}/>
                        <label htmlFor="mayonnaise">Mayonnaise</label>
                    </div>
                    <div>
                        <input 
                        id="guacamole" 
                        type="checkbox" 
                        name="sauces" 
                        value="guacamole"
                        checked={formik.values.sauces.guacamole}  
                        onChange={formik.handleChange}/>
                        <label htmlFor="guacamole">Guacamole</label>
                    </div>
                </div>
            </div>
            <div className="form-item">
            <label>Best Stooge</label>
            <div>
                <div>
                <input id="larry" type="radio" value="Larry" name="stooge" onChange={formik.handleChange} defaultChecked />
                <label htmlFor="larry">Larry</label>
                </div>
                <div>
                <input id="Moe" type="radio" value="Moe" name="stooge" onChange={formik.handleChange} />
                <label htmlFor="Moe">Moe</label>
                </div>
                <div>
                <input id="Curly" type="radio" value="Curly" name="stooge" onChange={formik.handleChange} />
                <label htmlFor="Curly">Curly</label>
                </div>  
            </div>      
            </div>
            <div className="form-item">
                <label htmlFor="notes">Notes</label>
                <textarea name="notes" id="notes" cols="20" rows="2" maxLength="101" placeholder="Notes" value={formik.values.notes} onChange={formik.handleChange}></textarea>
                {formik.errors.notes ? <p className="error-message">{formik.errors.notes}</p> : null}
            </div>
            <div className="form-btns">
                <button type="submit" disabled={!formik.dirty || !formik.isValid}>Submit</button>
                <button type="reset" onClick={handleReset} disabled={!formik.dirty}>Reset</button>
            </div>

            <pre className="form-results">
                <code>{JSON.stringify(formik.values, replacer, 2)}</code>
            </pre>
        </form>
    );
}

export default Form;