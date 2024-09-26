import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Users } from "lucide-react";

export default function LayoutDashboard() {
  return (
   <div>
  
      <Card className="border-none">
      {/* <CardHeader>
      <CardTitle className="text-white">Resumen de Publicaciones Activas</CardTitle>
    </CardHeader> */}
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-primary/10 rounded-lg">
            <FileText className="h-8 w-8 text-primary mb-2" />
            <span className="text-2xl font-bold text-white">24</span>
            <span className="text-sm text-muted-foreground">
              Publicaciones Activas
            </span>
          </div>
          <div className="flex flex-col items-center p-4 bg-yellow-500/10 rounded-lg">
            <Clock className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="text-2xl font-bold text-white">Búsqueda</span>
            <span className="text-sm text-muted-foreground">Estado Actual</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-green-500/10 rounded-lg">
            <Users className="h-8 w-8 text-green-500 mb-2" />
            <span className="text-2xl font-bold text-white">68</span>
            <span className="text-sm text-muted-foreground">
              Colaboradores Asignados
            </span>
          </div>
        </div>
      </CardContent>
    </Card>

   </div>
    
  
  );
}
