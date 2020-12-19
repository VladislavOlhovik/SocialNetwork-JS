import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import {loginUser} from '../../Redux/auth-reducer'
import { required } from '../../utils/validator'
import { createField, Input } from '../common/FormsControls/FormsControls'
import style from '../common/FormsControls/FormsControls.module.css'

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Login', [required], 'login', Input)}
            {createField('Password', [required], 'password', Input, {type:'password'})}
            <div className={error?style.formError:''}>
                {error}
            </div>
            {createField(null, [], 'rememberMe', Input, {type:'checkbox'}, 'remember me')}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LogiReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = ({ loginUser, isAuth }) => {
    const onSubmit = (formData) => {
        loginUser(formData)
    }
    if(isAuth) return <Redirect to={'/profile'}/>
    return <div>
        <h1>Login</h1>
        <LogiReduxForm onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuth,
    }
  }
export default connect(mapStateToProps,{loginUser})(Login)