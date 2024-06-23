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

    const {setToken, setUser, user} = useStateContext();

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

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Usuarios</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className='px-[10px] py-[10px] w-[400px]'>
                                    <li className='hover:hover:bg-accent p-3 rounded-md hover:cursor-pointer ease-in duration-100'>
                                        <div className="mb-1 text-md font-medium">
                                            Consulta
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Usuario o Toma.
                                        </p>
                                    </li>
                                    <li className='hover:hover:bg-accent p-3 rounded-md hover:cursor-pointer ease-in duration-100'>
                                        <div className="mb-1 text-md font-medium">
                                            Contratos
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Genera un nuevo contrato.
                                        </p>
                                    </li>

                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>



                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className=' h-full w-[200px] absolute right-5 flex items-center  justify-center gap-3'>
                <FontAwesomeIcon icon={faRightFromBracket} className='rotate-180 cursor-pointer' onClick={logout}/>
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