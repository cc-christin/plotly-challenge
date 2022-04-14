// get plot
function getPlots(id) {
    // read data from samples.json
    d3.json("samples.json").then (sampledata => {
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        // * Use `sample_values` as the values for the bar chart.
        var sampleValues = sampledata.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues)
        // * Use `otu_labels` as the hovertext for the chart.
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
        // for labels, get (0,10), .reverse()
        var OTU_ten = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
        // otu_ids
        var OTU_id = OTU_ten.map(d => "OTU" + d);
        console.log(`OTU IDS: ${OTU_id}`)
        // labels
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
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
            var data = [trace];

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
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledate.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text: sampledata.samples[0].otu_labels
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

// change function
function optionChanged(id) {
    getPlots(id);
    getdemoInfo(id);
}

// initial function
function init() {
    // dropdown menu
    var dropdown = d3.select("#selDataset");

    // read data
    d3.json("samples.json").then((data) => {
        console.log(data)

        // get id data
        data.namesforEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // display data and plots
        getPlots(data.names[0]);
        getdemoInfo(data.names[0]);

    });
}

init();

