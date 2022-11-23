import * as React from "react";
import { ResponsiveBar, BarCommonProps } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

import "./app.css";

export default function App() {
  return (
    <>
      <h2>Nivo Charts</h2>
      <Bar />
      <Line />
      <Pie />
    </>
  );
}

function Bar() {
  const [data, setData] = React.useState([]);
  const [barGroupMode, setBarGroupMode] =
    React.useState<BarCommonProps<typeof data>["groupMode"]>("stacked");

  React.useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("http://localhost:3131/bar");
      setData(await response.json());
    }
  }, []);

  return (
    <>
      <div>
        <input
          type="radio"
          name="chart"
          id="stacked-bar"
          checked={barGroupMode === "stacked"}
          onChange={() => setBarGroupMode("stacked")}
        />
        <label htmlFor="stacked-bar">Stacked Bar</label>

        <input
          type="radio"
          name="chart"
          id="grouped-bar"
          checked={barGroupMode === "grouped"}
          onChange={() => setBarGroupMode("grouped")}
        />
        <label htmlFor="grouped-bar">Grouped Bar</label>
      </div>
      <div style={{ width: 1000, height: 900, marginBottom: 30 }}>
        <ResponsiveBar
          data={data}
          groupMode={barGroupMode}
          keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            );
          }}
        />
      </div>
    </>
  );
}

function Line() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("http://localhost:3131/line");
      setData(await response.json());
    }
  }, []);

  return (
    <div style={{ width: 1000, height: 900, marginBottom: 50 }}>
      <label>Line Chart</label>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

function Pie() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("http://localhost:3131/pie");
      setData(await response.json());
    }
  }, []);

  return (
    <div style={{ width: 1000, height: 900, marginBottom: 50 }}>
      <label>Pie Chart</label>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Java",
            },
            id: "dots",
          },
          {
            match: {
              id: "Go",
            },
            id: "lines",
          },
          {
            match: {
              id: "JavaScript",
            },
            id: "dots",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
