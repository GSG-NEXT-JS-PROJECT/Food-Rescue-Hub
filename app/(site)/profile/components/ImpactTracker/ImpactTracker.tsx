import {
  Award,
  Package2,
  User as UserIcon,
  HelpCircle,
  Leaf,
  Droplets,
} from "lucide-react";
import { DonationStatus, UserProfile } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImpactTracker } from "./hooks/useImpactTracker";

interface ImpactTrackerProps {
  userData: UserProfile | undefined;
}

export default function ImpactTracker({ userData }: ImpactTrackerProps) {
  const donations = userData?.donations || [];
  const {
    getDonationsCount,
    getFoodSaved,
    getPeopleHelped,
    calculateCO2Saved,
    calculateWaterSaved,
  } = useImpactTracker();
  const foodSaved = getFoodSaved(donations, DonationStatus.Completed);
  const donationsCount = getDonationsCount(donations, DonationStatus.Completed);
  const peopleHelped = getPeopleHelped(donations, DonationStatus.Completed);
  const { co2Saved } = calculateCO2Saved(foodSaved);
  const { waterSavedGallons } =
    calculateWaterSaved(foodSaved);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            Your Impact
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <HelpCircle size={14} className="text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Track your contribution to reducing food waste and
                    supporting your community
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Making a difference, one donation at a time
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-emerald-50 rounded-lg p-5 text-center transition-all hover:shadow-md group">
            <div className="bg-emerald-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-200 transition-colors">
              <Award className="h-7 w-7 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-emerald-700">
              {donationsCount}
            </div>
            <div className="mt-1 text-sm text-emerald-800 font-medium">
              Donations Made
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-5 text-center transition-all hover:shadow-md group">
            <div className="bg-blue-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
              <Package2 className="h-7 w-7 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-700">{foodSaved}</div>
            <div className="mt-1 text-sm text-blue-800 font-medium">
              Food Saved
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-5 text-center transition-all hover:shadow-md group">
            <div className="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
              <UserIcon className="h-7 w-7 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-700">
              {peopleHelped}
            </div>
            <div className="mt-1 text-sm text-purple-800 font-medium">
              People Helped
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Environmental Impact
          </h4>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <dt className="flex items-center text-sm text-gray-500 mb-3">
                  <Leaf className="h-5 w-5 mr-2 text-emerald-500" />
                  CO₂ Emissions Saved
                </dt>
                <dd className="text-3xl font-bold text-gray-900 flex items-baseline">
                  {co2Saved}
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    carbon dioxide
                  </span>
                </dd>
                <p className="mt-2 text-xs text-gray-500">
                  Equivalent to planting 2 trees
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <dt className="flex items-center text-sm text-gray-500 mb-3">
                  <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                  Water Saved
                </dt>
                <dd className="text-3xl font-bold text-gray-900 flex items-baseline">
                  {waterSavedGallons}
                  <span className="ml-2 text-sm text-gray-500 font-normal">
                    of water
                  </span>
                </dd>
                <p className="mt-2 text-xs text-gray-500">
                  Enough for 62 average showers
                </p>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
