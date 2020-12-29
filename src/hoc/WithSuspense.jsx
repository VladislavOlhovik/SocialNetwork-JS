import React, { Suspense } from 'react'

const WithSuspense = (Component) => {
    return (props) => (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props} />
        </Suspense>
    )
}

export default WithSuspense