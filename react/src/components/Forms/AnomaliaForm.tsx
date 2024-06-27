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
import Modal from "../ui/Modal.tsx";


const AnomaliaForm = () => {
    const { anomalia, setAnomalia, loadingTable, setLoadingTable, setAnomalias, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);


    const form = useForm<z.infer<typeof anomaliaSchema>>({
        resolver: zodResolver(anomaliaSchema),
        defaultValues: {
            id: anomalia.id,
            nombre: anomalia.nombre,
            descripcion: anomalia.descripcion,
            estado: anomalia.estado,
        },
    })



    function onSubmit(values: z.infer<typeof anomaliaSchema>) {
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/anomalias`, values)
                .then(() => {
                    setLoading(false);
                    setAbrirInput(false);
                    setAccion("crear");
                    setAnomalia({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                        estado: "activo"
                    });
                    getAnomalias();
                    console.log(values);
                    //setNotification("usuario creado");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }
        if (accion == "editar") {
            axiosClient.put(`/anomalias/${anomalia.id}`, values)
                .then(() => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getAnomalias();
                    //setNotification("usuario creado");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }
    }

    //con este metodo obtienes las anomalias de la bd
    const getAnomalias = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/anomalias");
            setLoadingTable(false);
            setAnomalias(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            console.error("Failed to fetch anomalias:", error);
        }
    };

    //elimianar anomalia
    const onDelete = async () => {
        try {
            await axiosClient.delete(`/anomalias/${anomalia.id}`, {
                data: { id: anomalia.id }
            });
            getAnomalias();
            setAccion("eliminar");
        } catch (error) {
            console.error("Failed to delete anomalia:", error);
        }
    };

    //este metodo es para cuando actualizar el formulario cuando limpias las variables de la anomalia
    useEffect(() => {
        if(accion == "eliminar"){
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: "activo"
            });
            setAbrirInput(false);
        }
        if (accion == "crear") {
            console.log("creando");
            setAbrirInput(true);
            setErrors({});
            form.reset({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: "activo"
            });
        } 
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            form.reset({
                id: anomalia.id,
                nombre: anomalia.nombre,
                descripcion: anomalia.descripcion,
                estado: anomalia.estado
            });
        } 
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        } 
    }, [accion, anomalia]);

    return (
        <div className="overflow-auto">

            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <Modal
                        method={onDelete}
                        button={
                            <IconButton>
                                <TrashIcon className="w-[20px] h-[20px]" />
                            </IconButton>}
                    />
                    <div onClick={() => setAccion("editar")}>
                        <IconButton>
                            <Pencil2Icon className="w-[20px] h-[20px]" />
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="py-[20px] px-[10px] ">
                <div className="mb-[10px]">
                    {accion == "crear" && <p className="text-muted-foreground text-[20px]">Creando Nueva Anomalia</p>}
                    {accion == "editar" && <p className="text-muted-foreground text-[20px]">Editar {anomalia.nombre}</p>}
                </div>
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
                                            currentValue={anomalia.estado} />
                                    </FormControl>
                                    <FormDescription>
                                        El estado de la anomalia
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {loading && <Loader />}
                        {abrirInput && <Button type="submit">Guardar</Button>}

                    </form>
                </Form>
            </div>

        </div>
    )
}

export default AnomaliaForm