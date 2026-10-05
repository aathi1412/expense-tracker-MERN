import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Rectangle,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import CustomTooltipBar from "./CustomTooltipBar";

function CustomBarChart({ data, dataKey }) {

    const getBarColors = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#4907ff";
    };

    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />

                    <XAxis
                        dataKey={dataKey}
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />

                    <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                    />

                    <Tooltip content={<CustomTooltipBar />} />

                    <Bar
                        dataKey="amount"
                        radius={[10, 10, 0, 0]}
                        shape={(props) => (
                            <Rectangle
                                {...props}
                                fill={getBarColors(props.index)}
                            />
                        )}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default CustomBarChart;