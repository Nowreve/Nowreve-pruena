"use client"
import Link from "next/link";
import { SidebarItemProps } from "./SidebarItem.types";
import { Icon} from "lucide-react"
import { usePathname } from "next/navigation";

export function SidebarItem(props: SidebarItemProps){
    const { item } = props;
    const { href, icon: Icon, label}  = item;
    const pathname = usePathname();

    const activePath = pathname === href;

    return (
        <Link href={href}
        className={`flex items-center gap-3 my-2.5 space-x-3 px-4 py-3 rounded-lg transition-colors duration-200  ${activePath ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
            <Icon className="h-5 w-5 " strokeWidth={1}/>
        {label}
      </Link>
    )

}