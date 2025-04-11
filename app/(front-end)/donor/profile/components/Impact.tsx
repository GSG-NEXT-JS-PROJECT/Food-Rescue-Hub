
import {
    Award,
    Package2,
    User as UserIcon,
    ChevronDown,
    CalendarDays,
    HelpCircle,
    Leaf,
    Droplets,
  } from "lucide-react";
  import { environmentalImpact } from "../constant";
  import { Role } from "@/@types";
  import { Button } from "@/components/ui/button";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
  
  interface ImpactTrackerProps {
    userRole: Role;
    donationsCount: number;
    foodSaved: string;
  }
  
  export default function ImpactTracker({ 
    userRole, 
    donationsCount, 
    foodSaved 
  }: ImpactTrackerProps) {
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
                    <p className="max-w-xs">Track your contribution to reducing food waste and supporting your community</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Making a difference, one donation at a time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-gray-400" />
            <Select defaultValue="all-time">
              <SelectTrigger className="w-32 h-8 text-xs border-gray-200">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
  
        <div className="border-t border-gray-100 px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-emerald-50 rounded-lg p-5 text-center transition-all hover:shadow-md group">
              <div className="bg-emerald-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-200 transition-colors">
                <Award className="h-7 w-7 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-700">
                {userRole === Role.Donor
                  ? donationsCount
                  : "12"}
              </div>
              <div className="mt-1 text-sm text-emerald-800 font-medium">
                {userRole === Role.Donor
                  ? "Donations Made"
                  : "Items Claimed"}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-5 text-center transition-all hover:shadow-md group">
              <div className="bg-blue-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                <Package2 className="h-7 w-7 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-700">
                {foodSaved}
              </div>
              <div className="mt-1 text-sm text-blue-800 font-medium">
                {userRole === Role.Donor ? "Food Saved" : "Food Rescued"}
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-5 text-center transition-all hover:shadow-md group">
              <div className="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                <UserIcon className="h-7 w-7 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-700">
                {environmentalImpact.peopleHelped}
              </div>
              <div className="mt-1 text-sm text-purple-800 font-medium">
                People Helped
              </div>
            </div>
          </div>
  
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Monthly Activity
              </h4>
              <Button variant="outline" size="sm" className="text-xs h-8 rounded-full border-gray-200">
                <ChevronDown className="h-4 w-4 mr-1" />
                Export Data
              </Button>
            </div>
            
            <div className="h-64 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center p-4">
              <div className="w-full">
                <div className="w-full h-48 bg-gradient-to-t from-emerald-50 to-transparent relative rounded-md overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-emerald-100 rounded-sm"></div>
                  <div className="absolute bottom-0 left-1/4 w-1/6 h-1/2 bg-emerald-200 rounded-sm"></div>
                  <div className="absolute bottom-0 left-1/2 w-1/6 h-3/4 bg-emerald-300 rounded-sm"></div>
                  <div className="absolute bottom-0 left-3/4 w-1/6 h-1/4 bg-emerald-200 rounded-sm"></div>
                  
                  {/* X and Y axis labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between px-4 pt-1 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Jan</span>
                    <span className="text-xs text-gray-500">Apr</span>
                    <span className="text-xs text-gray-500">Jul</span>
                    <span className="text-xs text-gray-500">Oct</span>
                  </div>
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 pr-1">
                    <span className="text-xs text-gray-500">300 lbs</span>
                    <span className="text-xs text-gray-500">0 lbs</span>
                  </div>
                </div>
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
                    {environmentalImpact.co2Saved}
                    <span className="ml-2 text-sm text-gray-500 font-normal">carbon dioxide</span>
                  </dd>
                  <p className="mt-2 text-xs text-gray-500">Equivalent to planting 2 trees</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <dt className="flex items-center text-sm text-gray-500 mb-3">
                    <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                    Water Saved
                  </dt>
                  <dd className="text-3xl font-bold text-gray-900 flex items-baseline">
                    {environmentalImpact.waterSaved}
                    <span className="ml-2 text-sm text-gray-500 font-normal">of water</span>
                  </dd>
                  <p className="mt-2 text-xs text-gray-500">Enough for 62 average showers</p>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }