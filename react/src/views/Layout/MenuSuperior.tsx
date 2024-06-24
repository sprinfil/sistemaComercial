import React from 'react'
import { MouseEvent } from 'react';
import Logo from '../../img/logo.png'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from '../../components/ui/mode-toggle'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axiosClient from '../../axios-client'
import { useStateContext } from '../../contexts/ContextProvider'


const MenuSuperior = () => {

    const { setToken, setUser, user } = useStateContext();

    const opciones = [
        {
            titulo: "Usuarios",
            opciones: [
                {
                    titulo: "Consulta",
                    descripcion: "A un usuario o toma"
                },
                {
                    titulo: "Contratos",
                    descripcion: "Genera un nuevo contrato"
                }
            ]
        },
        {
            titulo: "Poligonos Geograficos",
            opciones: [
                {
                    titulo: "Ver poligonos",
                    descripcion: "Administra las posiciones geograficas de las rutas y libros."
                },
            ]
        },
        {
            titulo: "Ordenes de Trabajo",
            opciones: [
                {
                    titulo: "Generar Ordenes de Trabajo",
                    descripcion: "Genera ordenes para operadores de campo"
                },
                {
                    titulo: "Asignar Ordenes de Trabajo",
                    descripcion: "Asigna Ordenes de trabajo para operadores de campo"
                },
            ]
        },
        {
            titulo: "Monitores",
            opciones: [
                {
                    titulo: "Monitores",
                    descripcion: "Haz consultas de cualquier entidad que necesites."
                },
            ]
        }
    ]

    const logout = (e: MouseEvent<SVGSVGElement>): void => {
        e.preventDefault();
        axiosClient.post("/logout")
            .then(({ data }) => {
                setToken(null);
                setUser({});
            })
            .catch((error: any) => {
                console.error('Error during logout:', error);
            })
    }

    return (
        <div className='bg-background w-full h-[80px] border border-border shadow-sm relative flex items-center select-none'>
            {/*logo*/}
            <div className='h-full w-[75px] p-[10px]'>
                <img src={Logo} alt="" className='w-full h-full' />
            </div >
            {/*menu de opciones*/}
            <div className='h-full p-[10px] left-[100px] absolute flex items-center'>
                <NavigationMenu>
                    <NavigationMenuList>
                        {opciones.map((opcion, key) => (
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>{opcion.titulo}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className='px-[10px] py-[10px] w-[600px]'>
                                        {opcion.opciones.map((opcion, index) => (
                                            <li className='hover:hover:bg-accent p-3 rounded-md hover:cursor-pointer ease-in duration-100'>
                                                <div className="mb-1 text-md font-medium">
                                                    {opcion.titulo}
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    {opcion.descripcion}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className=' h-full w-[200px] absolute right-5 flex items-center  justify-center gap-3'>
                <div className=' px-2 py-1 rounded-md hover:bg-accent cursor-pointer ease-in duration-100' onClick={logout} >
                    <FontAwesomeIcon icon={faRightFromBracket} className='rotate-180' />
                </div>
                <p>{user.name}</p>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <ModeToggle />
            </div>
        </div>
    )

}

export default MenuSuperior