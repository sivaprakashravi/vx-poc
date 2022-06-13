import React, { useMemo } from "react";
import { Group } from "@vx/group";
import { scaleLinear, scaleBand, scaleTime } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { AreaClosed, Line } from "@vx/shape";
import useResizeObserver from "use-resize-observer";
import { curveMonotoneX, curveLinear } from '@vx/curve';
import { max, extent } from 'd3-array';
import { LinearGradient } from '@vx/gradient';


const Area = ({ data = [], xLabel = null, yLabel = null, threshold = [], radial = null, color = [] }) => {
    const { ref, width = 1, height = 1 } = useResizeObserver();

    // bounds
    const xMax = width;
    const yMax = height - 80;
    const getLabel = (d) => d.d;
    const getDate = (d) => new Date(d.d);
    const getStockValue = (d) => d.v;
    const maxVal = max(data.flat(1), getStockValue) || 0;
    const xScale = useMemo(
        () =>
            scaleBand({
                range: [0, xMax],
                domain: data.flat(1).map(getLabel),
                padding: 0.4,
            }),
        [xMax],
    );
    const yScale = useMemo(
        () =>
            scaleLinear({
                range: [yMax, 0],
                domain: [0, maxVal],
            }),
        [yMax],
    );

    const dateScale = useMemo(
        () =>
            scaleTime({
                range: [0, xMax],
                domain: extent(data.flat(1), getDate),
            }),
        [xMax],
    );
    const stockValueScale = useMemo(
        () =>
            scaleLinear({
                range: [yMax, 0],
                domain: [0, (max(data.flat(1), getStockValue) || 0)],
                nice: true,
            }),
        [yMax],
    );

    const background = '#3b6978';
    const background2 = '#204051';
    const accentColor = '#edffea';
    const accentColorDark = '#75daad';

    return (
        <div style={{ width: "100%", height: "100%" }} ref={ref}>
            <svg width={width} height="500">
                <Group top={25} left={65}>
                    {data.map((pData, h) => {
                        return (
                            <Group>
                                <LinearGradient id={`area-gradient${h}`} from={color[h].from} to={color[h].to} toOpacity={0.05} />
                                <AreaClosed
                                    data={pData}
                                    x={d => dateScale(getDate(d))}
                                    y={d => stockValueScale(getStockValue(d))}
                                    yScale={stockValueScale}
                                    strokeWidth={1}
                                    stroke="#348ceb"
                                    fill={`url(#area-gradient${h})`}
                                    curve={radial ? curveMonotoneX : curveLinear}
                                />
                            </Group>
                        )
                    })}
                    <Group>
                        {
                            threshold && threshold.length ? (
                                threshold.map((t, i) => {
                                    return (
                                        <Line
                                            key={i}
                                            from={{ x: xMax, y: yScale(t) }}
                                            to={{ x: 0, y: yScale(t) }}
                                            stroke={!i ? "#4a4a4a" : "#4a4a4a"}
                                            strokeWidth={1}
                                            pointerEvents="none"
                                            strokeDasharray="5,2"
                                        />
                                    )
                                })
                            ) : null
                        }
                        <AxisLeft scale={yScale} label={yLabel} />
                        <AxisBottom
                            scale={xScale}
                            label={xLabel}
                            labelOffset={15}
                            top={yMax}
                        />
                    </Group>
                </Group>
            </svg>
        </div>
    );
};

export default Area;
