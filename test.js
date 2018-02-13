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
            alias: 'Star Wars Characters',
            columns: cols
        };
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        function loopPages(url, callback) {
            $.getJSON(url, function (data) {
                var i;
                var output = [];
                for (i = 1; i < 10; i++) {
                    $.getJSON("https://swapi.co/api/people/?format=json&page=" + i, function (data) {
                        obj = data.results;
                        callback();
                    });
                }

            });
        }

        loopPages('https://swapi.co/api/people/?format=json&page=', function (myList) {
            var newOutput = []
            obj.forEach(function (val) {
                newOutput.push({
                    "name": val.name,
                    "gender": val.gender,
                    "height": val.height
                });

            });
            console.log(newOutput);
            table.appendRows(newOutput);
            doneCallback();
        });

    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#clickButton").click(function () {
        tableau.connectionName = "Star Wars Data2";
        tableau.submit();
        tableau.log('This button is working!!');
    });
});