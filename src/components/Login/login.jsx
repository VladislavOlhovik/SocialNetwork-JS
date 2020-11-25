import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import {loginUser} from '../../Redux/auth-reducer'
import { required } from '../../utils/validator'
import { Input } from '../common/FormsControls/FormsControls'

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} validate={[required]} name={'login'} component={Input} />
            </div>
            <div>
                <Field placeholder={'Password'} validate={[required]} name={'password'} component={Input}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>remember me
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
        props.loginUser(formData)
    }
    if(props.isAuth) return <Redirect to={'/profile'}/>
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