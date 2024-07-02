import React from 'react'
import EnDesarrollo from "../../img/en_desarrollo.svg";

export const Proximamente = () => {
    return (
        <div className=''>
            <div className='flex items-center justify-center flex-col'>
                <p className='mb-[40px] text-xl'>Proximamente !</p>
                <img src={EnDesarrollo} alt="" className='h-[70vh]' />
            </div>
        </div>
    )
}
