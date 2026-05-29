import type { ClaimSummary } from "@/lib/types";
import { getRegisteredDetail } from "@/lib/mock-data";
import { VehicleBanner } from "../VehicleBanner";
import { Timeline } from "../Timeline";
import { OpenTasksList } from "../OpenTasksList";
import { TaskStatusList } from "../TaskStatusList";
import { DocsAndPhotos } from "../DocsAndPhotos";
import { ClaimFooter } from "../ChatButton";

interface Props {
  claim: ClaimSummary;
}

export function RegisteredDetail({ claim }: Props) {
  const D = getRegisteredDetail(claim);
  return (
    <>
      <VehicleBanner claim={claim} />
      <div className="px-5 py-5 space-y-5">
        <OpenTasksList tasks={D.openTasks} />
        <TaskStatusList items={D.taskStatusItems} />
        <Timeline steps={D.timeline} />
        <DocsAndPhotos />
        <ClaimFooter />
      </div>
    </>
  );
}
