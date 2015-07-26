
function loadData() {
    $.getJSON( "http://127.0.0.1:5000/v1/last")
     .done(function(json) {
        var error = json.error;
        if( error === null ) {
            var data = json.data;
            processData(data);
        } else {
            processError(error);
        }
     })
     .fail(function() {
        processError();
     });
}

function processError(error) {
    console.log('error');
    console.log(error);
}

function processData(data) {
    var latest = getLatestEntry(data);    
    var entry = data[latest.year][latest.month][latest.day];
    
    var table = '';
    table += sprintf('%d-%d-%d', latest.year, latest.month, latest.day);
    table += '<table class="table">';
    table += '<tr>';
        table += '<th>Exchange</th>';
        table += '<th>Volume (BTC)</th>';
        table += '<th>Volume (USD)</th>';
    table += '</tr>';
    for( var idx in entry.exchanges ) {
        var exchange = entry.exchanges[idx];
        var stats = entry[exchange];
        console.log(stats);
     
        var row = '';
        row += '<tr>';
            row += '<td>' + exchange + '</td>';
            row += '<td>' + sprintf('%8.2f', stats.volume) + '</td>';
            row += '<td>' + sprintf('%10.2f', stats.volume_usd) + '</td>';
        row += '</tr>';
        table += row;
    }
    table += '</table>';
    
    $('#data').empty().append(table);
}

function getLatestEntry(data) {
    var y = 0,
        m = 0,
        d = 0;
    
    for(var year in data) {
        if(parseInt(year) > y) {
            y = parseInt(year);
            for(var month in data[year]) {
                if(parseInt(month) > m) {
                    m = parseInt(month);
                    for(var day in data[year][month]) {
                        if(parseInt(day) > d) {
                            d = parseInt(day);
                        }
                    }
                }
            }
        }
    }
    
    return {'year': y, 'month': m, 'day': d};
}

loadData();
