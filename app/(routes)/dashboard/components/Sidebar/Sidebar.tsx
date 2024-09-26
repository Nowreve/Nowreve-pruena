"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
     <div className="h-screen flex items-center jusitify-center" >
        <div className="flex flex-col  items-center h-full">
            <h1 className="flex  items-center text-2xl font-bold text-primary text-white  p-2">Nowreve</h1>
            <SidebarRoutes/>
        </div>
     </div>
  );
}
