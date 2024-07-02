import { useState } from "react";
import logo from '../../img/logo.png';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../../components/ui/button.tsx';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form.tsx";
import { Input } from '../../components/ui/input.tsx';
import { crearusuarionuevoSchema } from './crearusuarioValidaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";


const CrearUsuarioForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);


    const form = useForm<z.infer<typeof crearusuarionuevoSchema>>({
        resolver: zodResolver(crearusuarionuevoSchema),
        defaultValues: {
            id: 0,
            nombre: "",
            curp: "",
            rfc: "",
            correo: "",
        },
    })



    function onSubmit(values: z.infer<typeof crearusuarionuevoSchema>) {
        setLoading(true);

    }



    return (
        <div className="overflow-auto">

            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">

                    </div>


                </div>
            </div>
            <div className="py-[20px] px-[10px] ">

                {errors && <Error errors={errors} />}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe el nombre de la anomalia" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre de la anomalia.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="curp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CURP</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe la curp" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre de la curp.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rfc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RFC</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe la rfc" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre de la rfc.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="correo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electronico</FormLabel>
                                    <FormControl>
                                        <Input readOnly={!abrirInput} placeholder="Escribe el correo electronico" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        El nombre del correo electronico.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading && <Loader />}
                        <Button type="submit">Guardar</Button>

                    </form>
                </Form>
            </div>

        </div>
    )
}

export default CrearUsuarioForm
