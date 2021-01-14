import React from 'react'
import { Field } from 'redux-form'
import style from './FormsControls.module.css'

// export const Textarea = ({meta, input, ...props}) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={hasError?style.error:''}>
//             <div>
//                 <textarea {...input} {...props} />
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }
// export const Input = ({meta, input, ...props}) => {
//     const hasError = meta.touched && meta.error
//     return (
//         <div className={hasError?style.error:''}>
//             <div>
//                 <input {...input} {...props} />
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }
const FormsControls = (Element) => ({meta:{touched, error}, input, ...props}) => {
    const hasError = touched && error
    return (
        <div className={hasError?style.error:''}>
            <div>
                <Element {...input} {...props} />
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
export const Input = FormsControls('input')
export const Textarea = FormsControls('textarea')

 export const createField = ( placeholder, validate, name, component, props={}, text='' ) => (
    <div style={{display:'flex',padding:'5px 0'}}>
         <Field placeholder={placeholder} validate={validate} name={name} component={component} {...props} />
         <span>{text}</span>
    </div>
)
