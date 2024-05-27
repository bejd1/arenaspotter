import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IoInformationCircleOutline } from "react-icons/io5";

export function MyArenaListHover() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="m-0 p-0">
          <IoInformationCircleOutline className="text-lg" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Rejected</h4>
            <p className="text-sm">Fake information</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
