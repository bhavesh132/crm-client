import { Label, Pie, Cell, PieChart } from "recharts"
import NoDue from "./NoDue";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { render } from "react-dom";

const chartConfig = {
    open: {
        label: "Open",
        color: "hsl(var(--chart-1))",
    },
    critical: {
        label: "Critical",
        color: "hsl(var(--chart-2))",
    },
    due: {
        label: "Due",
        color: "hsl(var(--chart-3))",
    },
    assigned: {
        label: "Assigned",
        color: "hsl(var(--chart-4))",
    },
    nonCritical: {
        label: "Non-critical",
        color: "hsl(var(--chart-5))",
    },
    new: {
        label: "New",
        color: "hsl(var(--chart-6))",
    },
    total: {
        label: "Total",
        color: "hsl(var(--chart-7))",
    },
    upcoming: {
        label: "Upcoming",
        color: "hsl(var(--chart-8))",
    },
}
export function DonutChart({ data, totalData, title }) {
    if (!Array.isArray(data)) {
        console.error('Expected data to be an array but received:', data);
        return null;
    }
    const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    let renderer
    for (const i in data) {
        if (data[i].value === 0) {
            renderer = false
        } else {
            renderer = true
            break;
        }
    }

    if (renderer) {
        return (
            <ChartContainer
                config={chartConfig}
                className="mx-auto -my-12 aspect-square max-h-[170px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        strokeWidth={5}
                        paddingAngle={5}
                    >
                        {
                            data.map((value, index) => {
                                return (<Cell key={`cell-${index}`
                                } fill={COLORS[index % COLORS.length]} />)
                            })
                        }
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-2xl font-bold"
                                            >
                                                {totalData[title.toLowerCase()]}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                {title}
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
        );
    } else {
        return (<NoDue />)

    }

}

export default DonutChart