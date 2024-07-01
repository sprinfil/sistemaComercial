import React, { useEffect } from 'react'
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
import { ContextProvider, useStateContext } from '../../contexts/ContextProvider';
import logo from "../../img/logo.png";


const MenuSuperior = () => {

    const { setToken, setUser, user } = useStateContext();

    const opciones = [
        {
            titulo: "Usuarios",
            opciones: [
                {
                    titulo: "Consulta",
                    descripcion: "Mira los detalles de los usuarios, consulta por numero de toma o nombre de usuario",
                    route: ""
                },
                {
                    titulo: "Contratos",
                    descripcion: "Genera un nuevo contrato",
                    route: ""
                }
            ]
        },
        {
            titulo: "Poligonos Geograficos",
            opciones: [
                {
                    titulo: "Ver poligonos",
                    descripcion: "Administra las posiciones geograficas de las rutas y libros.",
                    route: "/poligonos"
                },
            ]
        },
        {
            titulo: "Ordenes de Trabajo",
            opciones: [
                {
                    titulo: "Generar Ordenes de Trabajo",
                    descripcion: "Genera ordenes para operadores de campo",
                    route: ""
                },
                {
                    titulo: "Asignar Ordenes de Trabajo",
                    descripcion: "Asigna Ordenes de trabajo para operadores de campo",
                    route: ""
                },
            ]
        },
        {
            titulo: "Monitores",
            opciones: [
                {
                    titulo: "Monitores",
                    descripcion: "Haz consultas de cualquier entidad que necesites.",
                    route: ""
                },
            ]
        },
        {
            titulo: "Configuraciones",
            opciones: [
                {
                    titulo: "Catálogos",
                    descripcion: "Gestiona los catálogos del sistema.",
                    route: "/catalogos"
                },
                {
                    titulo: "Operadores del Sistema",
                    descripcion: "Gestiona Operadores de sistema, También sus roles y permisos.",
                    route: ""
                },
                {
                    titulo: "Roles",
                    descripcion: "Gestiona los roles del sistema.",
                    route: ""
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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get(`/users/${localStorage.getItem("user_id")}`);
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);


    return (
        <div className='bg-background h-[10vh] border border-border shadow-sm relative flex items-center select-none'>
            {/*logo*/}
            <div className='h-full min-w-[65px] max-w-[65px] min-h-[65px] max-h-[65px] p-[10px]'>
                <img src={Logo} alt="" className='w-full h-full' />
            </div >
            {/*menu de opciones*/}
            <div className='h-full p-[10px] left-[100px] flex items-center '>
                <NavigationMenu>
                    <NavigationMenuList >
                        {opciones.map((opcion, key) => (
                            <NavigationMenuItem key={key}>
                                <NavigationMenuTrigger key={key}>{opcion.titulo}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className='flex'>
                                        <div className=' flex items-center justify-center w-[300px]'>
                                            <div className='w-full h-[20vh] flex items-center justify-center '>
                                                <img src={logo} alt="" className='w-[150px] h-[150px]' />
                                            </div>
                                        </div>
                                        <ul className='px-[10px] py-[10px] w-[1000px]' key={key}>
                                            {opcion.opciones.map((opcion, index) => (
                                                <Link to={opcion.route} key={index}>
                                                    <li key={key} className='hover:hover:bg-accent p-3 rounded-md hover:cursor-pointer ease-in duration-100'>
                                                        <div key={key} className="mb-1 text-md font-medium">
                                                            {opcion.titulo}
                                                        </div>
                                                        <p key={key} className="text-sm leading-tight text-muted-foreground">
                                                            {opcion.descripcion}
                                                        </p>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
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