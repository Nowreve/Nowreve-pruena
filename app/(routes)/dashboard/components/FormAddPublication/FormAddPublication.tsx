"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, PenIcon, UsersIcon, DollarSignIcon, CheckCircleIcon } from "lucide-react"
import { formSchema } from "./FormAddPublicacion.form"
import { UploadButton } from "@/utils/uploadthing"
import { FormAddPublicationProps } from "./FormAddPublication.types"

import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function FormAddPublication(props: FormAddPublicationProps) {
  const {setOpenDialog} = props;
  const [step, setStep] = useState(1)
  const [photoUploaded, setPhotoUploaded] = useState(false)
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      maxCollaborators: 1,
      rewardAmount: 0,
      photo: "",
      isPublished: false,
    
    },
    mode: "onChange",
  })

  const onSubmit = async(values: z.infer<typeof formSchema>)  => {
    setOpenDialog(false);
    try {
      await  axios.post(`api/publication`, values)
      toast({
        title: "Publicación creada",
        variant: "default"
      });
      router.refresh();

    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive"
      })
      
    }
    console.log(values)
    // Aquí normalmente enviarías los datos al backend
    setStep(1)
  }

  const { isValid } = form.formState

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* Indicadores de paso */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold",
                step >= i ? "bg-primary" : "bg-gray-300"
              )}>
                {step > i ? <CheckCircleIcon className="w-6 h-6" /> : i}
              </div>
              <span className="text-sm mt-1">Paso {i}</span>
            </div>
          ))}
        </div>

        {/* Paso 1: Título y Descripción */}
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm font-medium">
                    <PenIcon className="w-4 h-4 mr-2 text-primary" />
                    Título
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Título de la publicación" {...field} className="text-base" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Escribe un título atractivo para tu publicación.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm font-medium">
                    <PenIcon className="w-4 h-4 mr-2 text-primary" />
                    Descripción
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe tu publicación" {...field} className="min-h-[120px] text-base" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Proporciona detalles sobre la publicación y lo que buscas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Paso 2: Colaboradores, Recompensa y Fecha Límite */}
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="maxCollaborators"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm font-medium">
                    <UsersIcon className="w-4 h-4 mr-2 text-primary" />
                    Máximo de Colaboradores
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value, 10))} 
                      className="text-base" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rewardAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm font-medium">
                    <DollarSignIcon className="w-4 h-4 mr-2 text-primary" />
                    Recompensa
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value))} 
                      className="text-base" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm font-medium">
                    <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                    Fecha Límite
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal text-base",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-xs">
                    Establece la fecha límite para la publicación.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Paso 3: URL de Medios */}
        {step === 3 && (
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center text-sm font-medium">
                  <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                  Archivo patrocinio
                </FormLabel>
                <FormControl>
                  {photoUploaded ? (
                    <p className="text-sm">¡Imagen subida!</p>
                  ) : (
                    <UploadButton
                      className="rounded-lg bg-slate-500 text-white outline-dotted outline-3"
                      endpoint="photo"
                      onClientUploadComplete={(res) => {
                        field.onChange(res?.[0].url);
                        setPhotoUploaded(true);
                      }}
                      onUploadError={(error: Error) => {
                        console.error("Error al subir la imagen:", error);
                      }}
                    /> 
                  )}
                </FormControl>
                <FormDescription className="text-xs">
                  Sube una imagen 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Anterior
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" className="ml-auto" onClick={nextStep}>
              Siguiente
            </Button>
          ) : (
            <Button type="submit" className="ml-auto" disabled={!isValid || !photoUploaded}>
              Crear Publicación
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}