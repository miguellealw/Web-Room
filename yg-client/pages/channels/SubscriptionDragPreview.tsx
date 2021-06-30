import { DuplicateIcon } from "@heroicons/react/outline";

const SubscriptionDragPreview = ({ name }: { name: string }) => (
  <div className="bg-white px-3 py-2 w-max rounded-md text-sm font-bold flex items-center justify-center">
    <DuplicateIcon className="w-5 h-5 mr-3" />
    <span>{name}</span>
  </div>
);

export default SubscriptionDragPreview;
