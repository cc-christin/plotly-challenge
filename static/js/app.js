// get url
var json_url = window.location.href + "../../samples.json";

function getPlots(id) {
    // read data from samples.json
    d3.json("samples.json").then (data => {
        console.log(data)
        let samples = data.samples
        let mySamples = samples.filter(sample=> sample.id == id)
        console.log(mySamples)
        let ids = mySamples[0].otu_ids;
        console.log(ids)
        // * Use `sample_values` as the values for the bar chart.
        let sampleValues = mySamples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues)
        // * Use `otu_labels` as the hovertext for the chart.
        let belly_labels = mySamples[0].otu_labels;
        let labels = mySamples[0].otu_labels.slice(0,10);
        console.log (labels)
        // for labels, get (0,10), .reverse()
        let OTU_ten = (mySamples[0].otu_ids.slice(0,10)).reverse();
        // otu_ids
        let OTU_id = OTU_ten.map(d => "OTU" + d);
        console.log(`OTU IDS: ${OTU_id}`)
        console.log(`OTU labels: ${labels}`)
        // trace
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'orange'},
                type: "bar", 
                orientation: "h",
            };

            // create the variable for data
            let dataPlot = [trace];

            // create layout
            var layout = {
                title: "OTUs",
                yaxis:{
                    tickmode: "linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };

            // bar plot
        Plotly.newPlot("bar", data, layout);

            // bubble chart
            var trace1 = {
                x: mySamples[0].otu_ids,
                y: mySamples[0].sample_values,
                mode: "markers",
                marker: {
                    size: mySamples[0].sample_values,
                    color: mySamples[0].otu_ids
                },
                text: mySamples[0].otu_labels
            };

            // bubble plot layout
            var layout2 = {
                xaxis: {title: "OTU ID"},
                height: 650,
                width: 1100
            };

            // new data variable
            var data1 = [trace1];

            // bubble plot 
        Plotly.newPlot("bubble", data1, layout2);


    });
}

// function to get info
function getInfo(id) {
    // read json data
    d3.json("samples.json").then((data)=> {
        // metadata
        var metadata = data.metadata;
        console.log(metadata)

        // filter info via id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // demographic data
        var demoInfo = d3.select("#sample-metadata");

        // empty data info panel
        demoInfo.html("");

        // demo data for info panel
        Object.entries(result).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });


    });
} 

/*
// change function
function optionChanged(id) {
    getPlots(id);
    getdemoInfo(id);
}
*/ 

// initial function
function init() {
    // dropdown menu
    var dropdown = d3.select("#selDataset");

    // read data
    d3.json("static/samples.json").then(data => {
        console.log(data)
        for (let i = 0; i < data["names"].length; i++) {
            let select_id = data["names"][i];
            dropdown
                .append("option")
                .text(select_id)
                .attr("value", select_id);
            }
                // get id data
                data.names.forEach(function(name) {
                    dropdown.append("option").text(name).property("value");
                });
        
                // display data and plots
                getPlots(data.names[0]);
                getdemoInfo(data.names[0]);
        });




    }





init();

// let dropdown menu
let dropdown = d3.select('#selDataset');
// dropdown event listener
dropdown.on('click', ()=>{
    let id = dropdown.property('value')
    // console log
    console.log(id)
    getPlots(id);
    getdemoInfo(id);
})
