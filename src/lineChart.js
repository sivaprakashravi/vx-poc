import React, { useMemo } from "react";
import { Group } from "@vx/group";
import { scaleLinear, scaleBand } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { Bar } from "@vx/shape";
import useResizeObserver from "use-resize-observer";


const LineChart = ({ data = [] }) => {
    const { ref, width = 1, height = 1 } = useResizeObserver();

    // bounds
    const xMax = width - 120;
    const yMax = height - 80;
    const getLetter = (d) => d.letter;
    const getLetterFrequency = (d) => Number(d.frequency) * 100;
    const xScale = useMemo(
        () =>
            scaleBand({
                range: [0, xMax],
                round: true,
                domain: data.map(getLetter),
                padding: 0.4,
            }),
        [xMax],
    );
    const yScale = useMemo(
        () =>
            scaleLinear({
                range: [yMax, 0],
                round: true,
                domain: [0, Math.max(...data.map(getLetterFrequency))],
            }),
        [yMax],
    );


    return (
        <div style={{ width: "100%", height: "100%" }} ref={ref}>
            <svg width={width} height={height}>
                <Group top={25} left={65}>
                    <AxisLeft scale={yScale} numTicks={4} label="Miles" />
                    <AxisBottom
                        scale={xScale}
                        label="Day"
                        labelOffset={15}
                        numTicks={5}
                        top={yMax}
                    />
                    {data.map(d => {
                        const letter = getLetter(d);
                        const barWidth = xScale.bandwidth();
                        const barHeight = yMax - yScale(getLetterFrequency(d));
                        const barX = xScale(letter);
                        const barY = yMax - barHeight;
                        return (
                            <Bar
                                key={`bar-${letter}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill="red"
                            />
                        );
                    })}
                </Group>
            </svg>
        </div>
    );
};

export default LineChart;
