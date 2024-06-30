import React from 'react';
import { Mapa } from '../../components/ui/Mapa';
import { TrashIcon, ContainerIcon, PlusIcon } from '@radix-ui/react-icons';
import IconButton from '../../components/ui/IconButton';

const Poligonos = () => {


    return (
        <div className='flex gap-2 items-center justify-center h-full '>
            {/*Contenedor del mapa*/}
            <div className='h-full w-[30%] overflow-auto'>
                {/*Boton Superior*/}
                <div>
                    <p>Boton para seleccionar todos</p>
                </div>
                {/*Menu de poligonos*/}
                <div className='bg-principal h-[200px] rounded-md border-border border'>
                    {/*superior*/}
                    <div className='h-[50px] border border-border w-full p-4 flex items-center justify-end rounded-tl-md rounded-tr-md'>
                        <div>
                            <IconButton>
                                <ContainerIcon className="w-[20px] h-[20px]" />
                                <PlusIcon className="ml-[10px] w-[20px] h-[20px]" />
                            </IconButton>
                        </div>
                    </div>
                    {/*Cuerpo*/}
                    <div>

                    </div>
                </div>
            </div>
            {/*Contenedor del mapa*/}
            <div className=' h-full w-[70%]'>
                <Mapa />
            </div>
        </div>
    );
};

export default Poligonos;
