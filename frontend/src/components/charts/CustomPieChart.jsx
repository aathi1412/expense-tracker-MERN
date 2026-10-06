import {
    PieChart,
    Pie,
    Sector,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import CustomTooltipPie from "./CustomTooltipPie";
import CustomLegend from "./CustomLegend";

function CustomPieChart({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor
}) {
  return (
    <ResponsiveContainer
        width="100%"
        height={380}
    >
        <PieChart>
            <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
                shape={(props) => (<Sector {...props} fill={colors[props.index % colors.length]}/>)}
            />
            <Tooltip content={<CustomTooltipPie/>}/>
            <Legend content={<CustomLegend  colors={colors}/>}/>

            {showTextAnchor && (
                <>
                    <text
                        x="50%"
                        y="50%"
                        dy={-25}
                        textAnchor="middle"
                        fill="#666"
                        fontSize="14px"
                    >
                        {label}
                    </text>
                    <text
                        x="50%"
                        y="50%"
                        dy={3}
                        textAnchor="middle"
                        fill="#333"
                        fontSize="24px"
                        fontWeight={600}
                    >
                        {totalAmount}
                    </text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart