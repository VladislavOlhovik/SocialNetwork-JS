import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


// export const WithAuthRedirect = (Component) => {
    
//     const RedirectComponent = (props) => {
//         let isAuth = useSelector(state=>state.auth.isAuth)
//         if (!isAuth) return <Redirect to={'/login'} />
//         return <Component {...props} />
//     }
//     return RedirectComponent
// }

const mapStateToProps = (state) => {
    return {
        isAuth:state.auth.isAuth,
    }
}
const mapDispatchToProps = () => {
    
}
export const WithAuthRedirect = (Component) => {
    
    class RedirectComponent extends React.Component {
        render(){
        if (!this.props.isAuth) return <Redirect to={'/login'} />
        return <Component {...this.props} />
        }
    }

    return connect(mapStateToProps,mapDispatchToProps)(RedirectComponent)
}

