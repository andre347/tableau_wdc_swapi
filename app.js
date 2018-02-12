(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "gender",
            alias: "gender",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "height",
            alias: "height",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: 'StarWarsAPI',
            alias: 'Get some Star Wars data',
            columns: cols
        };
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://swapi.co/api/people/?format=json", function(resp){
            var feat = resp.results;
            var tableData = [];

            //forEach example
            feat.forEach(function(val){
                tableData.push({
                    "name": val.name,
                    "gender": val.gender,
                    "height": val.height
                });                
            });

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#clickButton").click(function () {
        tableau.connectionName = "Star Wars Data";
        tableau.submit();
        tableau.log('This button is working');
    });
});