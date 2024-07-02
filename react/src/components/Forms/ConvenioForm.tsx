import { useState } from "react";
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
import { conveniosSchema } from './validaciones.ts';
import axiosClient from '../../axios-client.ts';
import Loader from "../../components/ui/Loader.tsx";
import Error from "../../components/ui/Error.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { useStateContext } from "../../contexts/ContextConvenio.tsx";
import { useEffect } from "react";
import { TrashIcon, Pencil2Icon} from '@radix-ui/react-icons';
import IconButton from "../ui/IconButton.tsx";
import { ComboBoxActivoInactivo } from "../ui/ComboBox.tsx";
import Modal from "../ui/Modal.tsx";
import { useToast } from "@/components/ui/use-toast"; //IMPORTACIONES TOAST
import { ToastAction } from "@/components/ui/toast"; //IMPORTACIONES TOAST





const ConceptoForm = () => {
    const { toast } = useToast()
    const { convenio, setConvenio, loadingTable, setLoadingTable, setConvenios, setAccion, accion } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [abrirInput, setAbrirInput] = useState(false);



    const form = useForm<z.infer<typeof conveniosSchema>>({
        resolver: zodResolver(conveniosSchema),
        defaultValues: {
            id: convenio.id,
            nombre: convenio.nombre,
            descripcion: convenio.descripcion,
        },
    })

    //#region SUCCESSTOAST
    function successToastCreado() {
        toast({
            title: "¡Éxito!",
            description: "El convenio se ha creado correctamente",
            variant: "success",

        })
    }
    function successToastEditado() {
        toast({
            title: "¡Éxito!",
            description: "El convenio se ha editado correctamente",
            variant: "success",

        })
    }
    function successToastEliminado() {
        toast({
            title: "¡Éxito!",
            description: "El convenio se ha eliminado correctamente",
            variant: "success",

        })
    }
    //#endregion


    //Funcion de errores para el Toast
    function errorToast() {

        toast({
            variant: "destructive",
            title: "Oh, no. Error",
            description: "Algo salió mal.",
            action: <ToastAction altText="Try again">Intentar de nuevo</ToastAction>,
        })


    }

    function onSubmit(values: z.infer<typeof conveniosSchema>) {
        setLoading(true);
        if (accion == "crear") {
            axiosClient.post(`/Convenio/create`, values)
                .then(() => {
                    setLoading(false);
                    setAbrirInput(false);
                    setAccion("crear");
                    setConvenio({
                        id: 0,
                        nombre: "",
                        descripcion: "ninguna",
                        estado: "activo"
                    });
                    getConvenio();
                    console.log(values);
                    successToastCreado(); //AQUI ESTA EL TOAST DE EXITO
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast(); //AQUI ESTA EL TOAST DE ERROR
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }
        if (accion == "editar") {
            axiosClient.put(`/Convenio/update/${convenio.id}`, values)
                .then(() => {
                    setLoading(false);
                    //alert("anomalia creada");
                    setAbrirInput(false);
                    setAccion("");
                    getConvenio();
                    successToastEditado();
                })
                .catch((err) => {
                    const response = err.response;
                    errorToast(); //AQUI ESTA EL TOAST DE ERROR
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                    setLoading(false);
                })
        }
    }

    //obtener convenio
    const getConvenio = async () => {
        setLoadingTable(true);
        try {
            const response = await axiosClient.get("/Convenio");
            setLoadingTable(false);
            setConvenios(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setLoadingTable(false);
            errorToast(); //AQUI ESTA EL TOAST DE ERROR
            console.error("Fallo la consulta del concepto:", error);
        }
    };

    //elimianar convenios
    const onDelete = async () => {
        try {
            await axiosClient.put(`/Convenio/log_delete/${convenio.id}`, {
                data: { id: convenio.id }
            });
            getConvenio();
            setAccion("eliminar");
            successToastEliminado();
        } catch (error) {
            errorToast(); //AQUI ESTA EL TOAST DE ERROR
            console.error("Fallo la eliminación:", error);
        }
    };

    //Actualizar el formulario
    useEffect(() => {
        if (accion == "eliminar") {
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
            setConvenio({
                id: 0,
                nombre: "",
                descripcion: "ninguna",
                estado: "activo"
            })
        }
        if (accion == "ver") {
            setAbrirInput(false);
            setErrors({});
            form.reset({
                id: convenio.id,
                nombre: convenio.nombre,
                descripcion: convenio.descripcion,
                estado: convenio.estado
            });
        }
        if (accion == "editar") {
            setAbrirInput(true);
            setErrors({});
        }
    }, [accion]);

    return (

        <div className="overflow-auto">

            <div className='flex h-[40px] items-center mb-[10px] bg-card rounded-sm'>
                <div className='h-[20px] w-full flex items-center justify-end'>
                    <div className="mb-[10px] h-full w-full mx-4">
                        {accion == "crear" && <p className="text-muted-foreground text-[20px]">Crear nuevo convenio</p>}
                        {accion == "editar" && <p className="text-muted-foreground text-[20px]">Editar {convenio.nombre}</p>}
                        {accion == "ver" && <p className="text-muted-foreground text-[20px]">{convenio.nombre}</p>}
                    </div>
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
                                        <Input className = "w-[35vh] h-[5vh]" readOnly={!abrirInput} placeholder="Escribe el nombre del convenio" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    Nombre del convenio.
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
                                            placeholder="Descripcion del nuevo convenio"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Agrega una breve descripción.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {loading && <Loader />}

                        {abrirInput &&
                        <Button type="submit">
                        Guardar
                        </Button>
                        }

                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ConceptoForm
