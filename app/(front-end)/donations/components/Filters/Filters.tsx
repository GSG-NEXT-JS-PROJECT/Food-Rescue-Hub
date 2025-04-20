"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Select, Separator } from "@radix-ui/react-select"
import { Badge, Filter, List, MapIcon, Search } from "lucide-react"
import type { Dispatch, FC, SetStateAction } from "react"
import { useFilters } from "./hooks/useFilters"
import type { DonationsReturnType } from "../Donations/typeDonation"
import { foodTypeOptions, sortOptions, statusOptions } from "./constant"

interface FiltersProps {
  setViewMode: Dispatch<SetStateAction<"map" | "grid">>
  viewMode: "map" | "grid"
  donationFilter: DonationsReturnType
}

const Filters: FC<FiltersProps> = ({ setViewMode, donationFilter, viewMode }) => {
  const { tempFilters, activeFiltersCount, resetFilters, handleTempFilterChange } = useFilters(donationFilter)
  return (
    <section className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          {/* Top row with search and view toggles */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search donations ..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={donationFilter.search}
                onChange={(e) => donationFilter.setSearch(e.target.value)}
              />

              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              {donationFilter.search && (
                <div className="absolute right-3 top-2.5 text-emerald-500 text-xs font-medium">Filtering...</div>
              )}
            </div>

            {/* Sort controls */}
            <div className="flex gap-2">
              <Select
                value={donationFilter.sortBy as string}
                onValueChange={(value) => donationFilter.updateSort(value, donationFilter.sortOrder as string)}
                disabled={donationFilter.isLoading}
              >
                <SelectTrigger className="w-[140px] bg-gray-50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={donationFilter.sortOrder as string}
                onValueChange={(value) => donationFilter.updateSort(donationFilter.sortBy as string, value)}
              >
                <SelectTrigger className="w-[140px] bg-gray-50">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View mode toggle - Fixed for mobile */}
            <div className="flex bg-gray-100 rounded-lg overflow-hidden self-start">
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "ghost"}
                className={`flex items-center px-3 py-2 ${
                  viewMode === "grid" ? "bg-emerald-600 text-white" : "hover:bg-gray-200"
                }`}
              >
                <List size={18} className="mr-1" />
                Grid
              </Button>
              <Button
                onClick={() => setViewMode("map")}
                variant={viewMode === "map" ? "default" : "ghost"}
                className={`flex items-center px-3 py-2 ${
                  viewMode === "map" ? "bg-emerald-600 text-white" : "hover:bg-gray-200"
                }`}
              >
                <MapIcon size={18} className="mr-1" />
                Map
              </Button>
            </div>
          </div>

          {/* Second row with filter controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center">
              <Filter size={16} className="mr-1 text-gray-500" />
              <span className="text-sm font-medium text-gray-500 mr-2">Filters:</span>
            </div>

            {/* Filter popover - Fixed positioning for mobile */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-dashed">
                  <Filter size={14} className="mr-1" />
                  Add Filter
                  {activeFiltersCount > 0 && <Badge className="ml-2 bg-emerald-500">{activeFiltersCount}</Badge>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[340px] p-4" align="start" side="bottom" sideOffset={5} alignOffset={0}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filter Options</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="h-8 text-gray-500 hover:text-gray-700"
                    >
                      Reset All
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Food Type</label>

                      <Select
                        value={tempFilters.foodType as string}
                        onValueChange={(value) => handleTempFilterChange("foodType", value)}
                        disabled={donationFilter.isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select food type" />
                        </SelectTrigger>
                        <SelectContent>
                          {foodTypeOptions.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Status</label>
                      <Select
                        value={tempFilters.status as string}
                        onValueChange={(value) => handleTempFilterChange("status", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Date Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Input
                            type="date"
                            className="w-full"
                            value={tempFilters.startDate}
                            onChange={(e) => handleTempFilterChange("startDate", e.target.value)}
                          />
                        </div>
                        <div>
                          <Input
                            type="date"
                            className="w-full"
                            value={tempFilters.endDate}
                            onChange={(e) => handleTempFilterChange("endDate", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Quantity Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          className="w-full"
                          value={tempFilters.minAmount}
                          onChange={(e) => handleTempFilterChange("minAmount", e.target.value)}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          className="w-full"
                          value={tempFilters.maxAmount}
                          onChange={(e) => handleTempFilterChange("maxAmount", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      onClick={donationFilter.applyFilters}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Apply Filters
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 italic pt-1">
                    Note: Filters will only be applied when you click &quot;Apply Filters&quot;
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filters
