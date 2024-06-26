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
import { anomaliaSchema } from './validaciones.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextAnomalias.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";

const AnomaliaForm = () => {
    const { anomalia, setAnomalia } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);
    const [accion, setAccion] = useState("");

    const form = useForm<z.infer<typeof anomaliaSchema>>({
        resolver: zodResolver(anomaliaSchema),
        defaultValues: {
            nombre: anomalia.nombre,
            descripcion: anomalia.descripcion,
            estado: anomalia.estado,
        },
    })

    function onSubmit(values: z.infer<typeof anomaliaSchema>) {
        console.log(values);
        setLoading(true);
        if(accion == "crear"){
            axiosClient.post(`/anomalia`,values)
            .then(()=>{
              setLoading(false);
              alert("anomalia creada");
              setAbrirInput(false);
              setAccion("");
              //setNotification("usuario creado");
            })
            .catch((err)=>{
              const response = err.response;
              if(response && response.status === 422){
                setErrors(response.data.errors);
              }
              setLoading(false);
            })
        }
    }

    useEffect(() => {
        if (anomalia.nombre != "") {
            setAccion("");
            setAbrirInput(false);
        }
        form.reset({
            nombre: anomalia.nombre,
            descripcion: anomalia.descripcion,
            estado: anomalia.estado
        });
    }, [anomalia, form]);

    const ReiniciarAnomalia = () => {
        setAccion("crear");
        setAbrirInput(true);
        setAnomalia({
            id: "",
            nombre: "",
            descripcion: "",
            estado: "",
        });
        console.log(anomalia);
    }

    return (
        <div>
            <div className='flex  h-[20px] items-center  mb-[10px]'>
                <div onClick={ReiniciarAnomalia}>
                    <IconButton>
                        <div> <PlusCircledIcon /></div>
                    </IconButton>
                </div>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <IconButton>
                        <TrashIcon />
                    </IconButton>
                    <IconButton>
                        <Pencil2Icon />
                    </IconButton>
                </div>
            </div>
            <div>
                {accion == "crear" && <p className="text-primary">Creando Nueva Anomalia</p>}
            </div>
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
                        name="descripcion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea
                                        readOnly={!abrirInput}
                                        placeholder="Descripcion de la anomalia"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Agrega una pequeña descripción.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                        <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <ComboBoxActivoInactivo 
                                    readOnly={!abrirInput}
                                    placeholder={"Estado"}
                                    form={form} 
                                    name={"estado"} 
                                    currentValue={anomalia.estado}/>
                                </FormControl>
                                <FormDescription>
                                    El estado de la anomalia
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {abrirInput && <Button type="submit">Aceptar</Button>}
                </form>
            </Form>
        </div>
    )
}

export default AnomaliaForm