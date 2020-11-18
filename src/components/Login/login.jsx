import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import {loginUser} from '../../Redux/auth-reducer'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={'input'} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={'input'}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={'input'}/>remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LogiReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        debugger
        props.loginUser(formData)
        console.log(formData)
    }
    if(props.isAuth) return <Redirect to={'/profile/12338'}/>
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