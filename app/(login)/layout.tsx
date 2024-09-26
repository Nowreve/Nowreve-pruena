import React from  "react"

export default function  AuthLayout(
    {children

    } : {
        children: React.ReactNode
    }){
    return (
        <div className="flex bg-white  h-full  w-full items-center justify-center">
            
            <div >
            {children}
            </div>
         
            </div>
    )
}