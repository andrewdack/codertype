"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
    CartesianGrid,
    ComposedChart,
    Scatter,
} from "recharts";
import { WPMpoint } from "@/hooks/useEngine";

function convertMsToSecString() {}
export default function StatChart({
    statHistory,
}: {
    statHistory: WPMpoint[];
}) {
    function getHighestWpmType(): "adjWpm" | "rawWpm" | "burstWpm" {
        let highestType: "adjWpm" | "rawWpm" | "burstWpm" = "burstWpm";
        let wpmMax = statHistory[0].burstWpm;

        statHistory.forEach((point) => {
            let burstWpm = point.burstWpm;
            let rawWpm = point.rawWpm;
            let adjWpm = point.adjWpm;

            if (burstWpm >= wpmMax) {
                highestType = "burstWpm";
                wpmMax = burstWpm;
            } else if (rawWpm >= wpmMax) {
                highestType = "rawWpm";
                wpmMax = rawWpm;
            } else if (adjWpm >= wpmMax) {
                highestType = "adjWpm";
                wpmMax = adjWpm;
            }
        });
        return highestType;
    }

    const highestWpmType = getHighestWpmType();
    return (
        <ResponsiveContainer width="100%" height="100%" className="pl-4 pt-5">
            <ComposedChart
                data={statHistory}
                margin={{
                    top: 20,
                    right: 10,
                    bottom: 5,
                    left: 0,
                }}
                // style={{paddingTop: 20}}
            >
                <CartesianGrid opacity={0.2} stroke="var(--muted-foreground)" />
                <XAxis dataKey="timeSec" label={{ value: "seconds", dy: 20 }} />
                <YAxis
                    yAxisId="left"
                    dataKey={highestWpmType}
                    width={60}
                    label={{
                        value: "words per minute",
                        angle: -90,
                        dx: -20,
                        position: "center",
                    }}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    dataKey="errors"
                    label={{
                        value: "errors",
                        angle: 90,
                        dx: 20,
                        position: "center",
                    }}
                />
                <Tooltip
                    cursor={{ stroke: "var(--muted-foreground)" }}
                    contentStyle={{
                        background: "var(--card)",
                        borderColor: "var(--background)",
                        borderRadius: "8px",
                    }}
                    labelFormatter={() => ""}
                    formatter={(value) =>
                        typeof value === "number" ? value.toFixed(0) : value
                    }
                />

                <Line
                    type="monotone"
                    dataKey="rawWpm"
                    dot={false}
                    strokeWidth={2}
                    stroke="var(--muted-foreground)"
                    strokeDasharray="4 2"
                    name="raw"
                />
                <Line
                    type="monotone"
                    dataKey="burstWpm"
                    dot={false}
                    strokeWidth={2}
                    stroke="#93c5fd"
                    name="burst"
                />
                <Line
                    type="monotone"
                    dataKey="errors"
                    stroke="#fca5a5"
                    name="errors"
                    dot={false}
                    strokeWidth={1}
                    strokeDasharray="4 2"
                    yAxisId='right'
                />
                <Line
                    type="monotone"
                    dataKey="adjWpm"
                    dot={false}
                    strokeWidth={4}
                    stroke="var(--vscode-blue)"
                    name="wpm"
                />
                {/* <Scatter name="errors" dataKey="errors" fill="red"/> */}
                <Legend align="right"></Legend>
            </ComposedChart>
        </ResponsiveContainer>
    );
}
