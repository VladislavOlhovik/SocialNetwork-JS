import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { loginUser } from '../../Redux/auth-reducer'
import { required } from '../../utils/validator'
import { createField, Input } from '../common/FormsControls/FormsControls'
import style from '../common/FormsControls/FormsControls.module.css'
import s from './login.module.css'

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Login', [required], 'email', Input)}
            {createField('Password', [required], 'password', Input, { type: 'password' })}
            <div className={error ? style.formError : ''}>
                {error}
            </div>
            {createField(null, [], 'rememberMe', Input, { type: 'checkbox' }, 'remember me')}
            {captchaUrl && <img src={captchaUrl} alt={'captcha'} />}
            {captchaUrl && createField('captcha', [required], 'captcha', Input)}
            <div>
                <button className={s.btn}>Login</button>
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
    return <div className={s.wrapper}>
        <div>
            To log in get registered
            <a href={"https://social-network.samuraijs.com/"}
                target={"blank"}>
                -here-
            </a>
            or use common test account credentials:
            <div>
                <b>Email: </b> free@samuraijs.com
            </div>
            <div>
                <b>Password: </b>free
            </div>
        </div>
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