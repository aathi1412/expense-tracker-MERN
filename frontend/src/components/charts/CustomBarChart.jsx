import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Rectangle,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import CustomTooltipBar from "./CustomTooltipBar"

function CustomBarChart({ data }) {
    const getBarColors = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <BarChart data={data}>
                <CartesianGrid stroke='none'/>

                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555"}} stroke='none'/>
                <YAxis tick={{ fontSize: 12, fill: "#555"}} stroke='none'/>

                <Tooltip content={<CustomTooltipBar/>}/>

                <Bar
                    data="amount"
                    fill="#FF8042"
                    radius={[10, 10, 0, 0]}
                    activeDot={{ r:8, fill:"yellow"}}
                    activeStyle={{fill: "green"}}
                    shape={(props) => (<Rectangle {...props} fill={colors[props.index % colors.length]}/>)}
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart