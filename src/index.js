const dscc = require('@google/dscc');
const local = require('./localMessage.js');

import embed from 'vega-embed';

// change this to 'true' for local development
// change this to 'false' before deploying
export const LOCAL = false;

const drawViz = (message) => {

    const margin = { left: 20, right: 20, top: 20, bottom: 20 };
    const height = dscc.getHeight() - 10;
    const width = dscc.getWidth();
    const chartHeight = height - margin.top - margin.bottom;
    const chartWidth = width - margin.left - margin.right;

    var messageData = message.tables.DEFAULT;
    var data = new Array();
    var minimum = 10000;
    var maxiumum = 0;

    for (let i = 0; i < messageData.length; i++) {
        var ritScore = messageData[i]['metric'][0];
        if (ritScore < minimum) { minimum = ritScore; }
        if (ritScore > maxiumum) { maxiumum = ritScore; }

        data.push({ "student": messageData[i]['dimension'][0], "rit_score": ritScore, "term": messageData[i]['dimension'][1] });
    }

    var yourVlSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "autosize": "fit",
        "description": "",
        "data": { "values": data },
        "transform": [],
        "encoding": {
            "x": {
                "field": "rit_score",
                "type": "quantitative",
                "title": "RIT Score",
                "scale": { "domain": [minimum, maxiumum] }
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
                    "filled": true,
                    "tooltip": true, //{"content": "data"}
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
                    "size": { "value": 500 },
                    "opacity": { "value": 1 },
                }
            },
            {
                "mark": {
                    "type": "text",
                    // "fontWeight": "bold",
                    "fontSize": 11
                },
                "encoding": {
                    "text": { "field": "rit_score" },
                    "color": {
                        "value": "white"
                    }
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
};

// renders locally
if (LOCAL) {
    drawViz(local.message);
} else {
    dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
}
