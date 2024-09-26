"use clietn"
import { useAuth } from "@clerk/nextjs";
import { dataEmterpriseSidebar } from "./SidebarRoutes.data";
import React from "react";
import { SidebarItem } from "./SidebarItem";


export function SidebarRoutes() {
  const { userId } = useAuth();
  return (
    <div className="flex flex-col justify-center">
      <div>
        <div className="p-2 md:p-6 gap-px">
        {dataEmterpriseSidebar.map((item) =>(
          <SidebarItem key={item.label} item={item}/>
        ))}
        </div>
      </div>
    </div>
  );
}



/**
 *  className={`flex items-center my-2.5 space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${item.active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}
 */