import { CommandDialog, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command"
import { Command } from "lucide-react";
import { Dispatch, SetStateAction ,useState} from "react";
interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashBoardCommand=({ open, setOpen }: Props)=>{
     const [search, setSearch] = useState("");
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>

            <CommandInput placeholder="Find a meeting or agent..."
                value={search}
                onValueChange={(value) => setSearch(value)}/>
<CommandList>
    <CommandItem >
        Test
    </CommandItem>
</CommandList>
        </CommandResponsiveDialog>
    )
}