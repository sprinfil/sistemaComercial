import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';

const DefaultLayout = () => {

  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <>
      <section>
        {/*Menu Superior*/}
      </section>
      <main>
          {/*Contenido principal*/}
          <Outlet />
      </main>
    </>
  )
}

export default DefaultLayout