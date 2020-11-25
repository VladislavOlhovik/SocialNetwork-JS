import React from 'react'
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
const FormsControls = (Element) => ({meta, input, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={hasError?style.error:''}>
            <div>
                <Element {...input} {...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Input = FormsControls('input')
export const Textarea = FormsControls('textarea')
