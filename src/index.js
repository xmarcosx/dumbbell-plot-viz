const dscc = require('@google/dscc');
const local = require('./localMessage.js');

import embed from 'vega-embed';

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = true;

const drawViz = (message) => {

    const margin = { left: 20, right: 20, top: 20, bottom: 20 };
    const height = dscc.getHeight() - 10;
    const width = dscc.getWidth();
    const chartHeight = height - margin.top - margin.bottom;
    const chartWidth = width - margin.left - margin.right;

    var yourVlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "autosize": "fit",
        "description": "A ranged dot plot that uses 'layer' to convey changing life expectancy for the five most populous countries (between 1955 and 2000).",
        "data": { "values": [
            { "student": "Mariana", "rit_score": 200, "term": "Fall" }, { "student": "Mariana", "rit_score": 214, "term": "Spring" },
            { "student": "Arelys", "rit_score": 175, "term": "Fall" }, { "student": "Arelys", "rit_score": 190, "term": "Spring" }
        ] },
        "transform": [],
        "encoding": {
            "x": {
                "field": "rit_score",
                "type": "quantitative",
                "title": "RIT Score",
                "scale": { "domain": [150, 250] }
            },
            "y": {
                "field": "student",
                "type": "nominal",
                "title": "Student Name"
            }
        },
        "layer": [
            {
                "mark": "line",
                "encoding": {
                    "detail": {
                        "field": "student",
                        "type": "nominal"
                    },
                    "color": { "value": "#db646f" }
                }
            },
            {
                "mark": {
                    "type": "point",
                    "filled": true
                },
                "encoding": {
                    "color": {
                        "field": "term",
                        "type": "ordinal",
                        "scale": {
                            "domain": ["Fall", "Spring"],
                            "range": ["#e6959c", "#911a24"]
                        },
                        "title": "RIT Score"
                    },
                    "size": { "value": 100 },
                    "opacity": { "value": 1 }
                }
            }
        ]
    };

    var opts = {
        theme: 'googlecharts',
        renderer: 'canvas',
        width: chartWidth,
        height: chartHeight,
        actions: false
    };

    embed('body', yourVlSpec, opts);

    // const bars = chartSvg
    //   .append("g")
    //   .attr("class", "bars")
    //   .selectAll("rect.bars")
    //   .data(message.tables.DEFAULT)
    //   .enter()
    //   .append("rect")
    //   .attr("x", d => xScale(d.dimension[0]))
    //   .attr("y", d => chartHeight - yScale(d.metric[0]))
    //   .attr("width", xScale.bandwidth())
    //   .attr("height", d => yScale(d.metric[0]));

    // add text
    // const text = svg
    //   .append("g")
    //   .selectAll("text")
    //   .data(message.tables.DEFAULT)
    //   .enter()
    //   .append("text")
    //   .attr(
    //     "x",
    //     d => xScale(d.dimension[0]) + xScale.bandwidth() / 2 + margin.left
    //   )
    //   .attr("y", height - margin.bottom / 4)
    //   .attr("text-anchor", "middle")
    //   .text(d => d.dimension[0]);
};

// renders locally
if (LOCAL) {
    drawViz(local.message);
} else {
    dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
}
