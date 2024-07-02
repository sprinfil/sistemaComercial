import React from 'react'
import MenuLateral from '../../../components/ui/MenuLateral'
import InformacionFiscal from './VistasDetalleUsuario/InformacionFiscal'

const DetalleUsuario = () => {

  const options = [
    {
      nombre : "Informacion Fiscal",
      componente: <InformacionFiscal/>
    }
  ]

  return (
    <>
      <div>
        <div>
          <div>
            <MenuLateral options={options}/>
          </div>
          <div>

          </div>
        </div>
      </div>
    </>

  )
}

export default DetalleUsuario
