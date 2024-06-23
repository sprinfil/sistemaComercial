"use client";
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
import { loginSchema } from '../../schema/index.ts';
import { ModeToggle } from '../../components/ui/mode-toggle.tsx';

const Login = () => {


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }


  return (
    <div className='h-[100vh] w-[100%] flex justify-center items-center'>
      <div className=' w-[400px] bg-background rounded-xl shadow-lg px-[30px] py-[20px] border border-border'>
        <div className='w-full h-[40%] flex items-center justify-center '>
          <img src={logo} alt="" className='w-[200px] h-[200px]' />
        </div>
        <div className=' h-[60%] py-[40px]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Escribe tu usuario" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Escribe tu contraseña" {...field} type='password'/>
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Iniciar Sesion</Button>
            </form>
          </Form>
        </div>
        <ModeToggle/>
      </div>
    </div>
  )


}


export default Login