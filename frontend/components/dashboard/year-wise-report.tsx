"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"

// Sample data for year-wise interactions
const yearWiseData = [
  { year: "2020-21", interactions: 156 },
  { year: "2021-22", interactions: 234 },
  { year: "2022-23", interactions: 312 },
  { year: "2023-24", interactions: 428 },
  { year: "2024-25", interactions: 189 },
]

const chartConfig = {
  interactions: {
    label: "Interactions",
    color: "var(--primary)",
  },
}

export function YearWiseReport() {
  const totalInteractions = yearWiseData.reduce((sum, item) => sum + item.interactions, 0)
  const avgInteractions = Math.round(totalInteractions / yearWiseData.length)
  const maxYear = yearWiseData.reduce((max, item) => item.interactions > max.interactions ? item : max)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Interactions</CardDescription>
            <CardTitle className="text-3xl font-bold text-primary">{totalInteractions.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Across all academic years</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average per Year</CardDescription>
            <CardTitle className="text-3xl font-bold text-primary">{avgInteractions}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Interactions per academic year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Peak Year</CardDescription>
            <CardTitle className="text-3xl font-bold text-primary">{maxYear.year}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{maxYear.interactions} interactions recorded</p>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Interactions by Academic Year</CardTitle>
          <CardDescription>
            Number of mentor-mentee interactions recorded each academic year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={yearWiseData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="year" 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: "var(--secondary)", opacity: 0.5 }}
              />
              <Bar 
                dataKey="interactions" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]}
                maxBarSize={80}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Year-wise Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Academic Year</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Interactions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">% of Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Growth</th>
                </tr>
              </thead>
              <tbody>
                {yearWiseData.map((item, index) => {
                  const prevYear = index > 0 ? yearWiseData[index - 1].interactions : null
                  const growth = prevYear ? ((item.interactions - prevYear) / prevYear * 100).toFixed(1) : null
                  const percentage = ((item.interactions / totalInteractions) * 100).toFixed(1)
                  
                  return (
                    <tr key={item.year} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{item.year}</td>
                      <td className="py-3 px-4 text-sm text-foreground">{item.interactions}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{percentage}%</td>
                      <td className="py-3 px-4 text-sm">
                        {growth !== null ? (
                          <span className={Number(growth) >= 0 ? "text-green-600" : "text-red-600"}>
                            {Number(growth) >= 0 ? "+" : ""}{growth}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
