import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';
import MenuSuperior from './MenuSuperior';

const DefaultLayout = () => {

  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="login" />
  }

  return (
    <>
      <section>
        {/*Menu Superior*/}
        <MenuSuperior/>
      </section>
      <main className= 'p-4 overflow-auto'>
          {/*Contenido principal*/}
          <Outlet />
      </main>
    </>
  )
}

export default DefaultLayout