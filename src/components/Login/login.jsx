import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { loginUser } from '../../Redux/auth-reducer'
import { required } from '../../utils/validator'
import { createField, Input } from '../common/FormsControls/FormsControls'
import style from '../common/FormsControls/FormsControls.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Login', [required], 'login', Input)}
            {createField('Password', [required], 'password', Input, { type: 'password' })}
            <div className={error ? style.formError : ''}>
                {error}
            </div>
            {createField(null, [], 'rememberMe', Input, { type: 'checkbox' }, 'remember me')}
            {captchaUrl && <img src={captchaUrl} alt={'captcha'} />}
            {captchaUrl && createField('captcha', [required], 'captcha', Input)}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LogiReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = ({ loginUser, isAuth, captchaUrl }) => {
    const onSubmit = (formData) => {
        loginUser(formData)
    }
    if (isAuth) return <Redirect to={'/profile'} />
    return <div>
        <span>
            To log in get registeredhere
            or use common test account credentials:
            Email: free@samuraijs.com
            Password: free
        </span>
        <h1>Login</h1>
        <LogiReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit} />
    </div>
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
}
export default connect(mapStateToProps, { loginUser })(Login)