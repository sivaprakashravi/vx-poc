import React, { useMemo } from "react";
import { Group } from "@vx/group";
import { scaleLinear, scaleBand } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { Bar } from "@vx/shape";
import useResizeObserver from "use-resize-observer";


const WaterFall = ({ data = [], xLabel = null, yLabel = null }) => {
    const { ref, width = 1, height = 1 } = useResizeObserver();

    // bounds
    const xMax = width;
    const yMax = height - 80;
    const getLabel = (d) => d.d;
    const getLabelFrequency = (d) => Number(d.v);
    const maxVal = data.map(d => d.v).reduce((a, b) => a + b);
    const xScale = useMemo(
        () =>
            scaleBand({
                range: [0, xMax],
                domain: data.map(getLabel),
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


    return (
        <div style={{ width: "100%", height: "100%" }} ref={ref}>
            <svg width={width} height="500">
                <Group top={25} left={65}>
                    <AxisLeft scale={yScale} numTicks={4} label={yLabel} />
                    <AxisBottom
                        scale={xScale}
                        label={xLabel}
                        labelOffset={15}
                        numTicks={5}
                        top={yMax}
                    />
                    {data.map((d, i) => {
                        const letter = getLabel(d);
                        const barWidth = xScale.bandwidth();
                        const barHeight = yMax - yScale(getLabelFrequency(d));
                        d.x = xScale(letter);
                        d.isPositive = barHeight > -1 ? true : false;
                        d.barHeight = barHeight;
                        d.y = !i ? yMax - barHeight : data[i-1].y - (barHeight > -1 ? barHeight : 0);
                        if(i && !data[i-1].isPositive) {
                            d.y = d.y - data[i-1].barHeight;
                        }
                        return (
                            <Bar
                                key={`bar-${letter}`}
                                x={d.x}
                                y={d.y}
                                width={barWidth}
                                height={Math.abs(barHeight)}
                                fill={barHeight > 0 ? 'green' : 'red'}
                            />
                        );
                    })}
                </Group>
            </svg>
        </div>
    );
};

export default WaterFall;
