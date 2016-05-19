var map
var tweetsMean
var responseTimeMean
var favoritesMean
var repliesMean
var retweetsMean
var mentionMean
var layer

function initApplication()
{
    //callEndpoint("tweets")
    //callEndpoint("metrics");
    getTweetMean();
    getResponseTimeMean();
    getFavoritesMean();
    getRepliesMean();
    getRetweetsMean();
    getMentionsMean();
    initMap();
    setLayersComboBox();
}

function initMap()
{
    map = new google.maps.Map(document.getElementById('map'),
        {
            center:
            {
                lat: -13.5413498,
                lng: -71.5506764
            },
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    setSearchBox();
    setLegend();
}

function setLegend()
{
    // Create the legend and display on the map
    var legend = document.createElement('div');
    legend.id = 'legend';
    var content = [];
    content.push('<h3>Média</h3>');
    content.push('<p><div class="color red"></div>Abaixo da média nacional</p>');
    content.push('<p><div class="color blue"></div>Acima da média nacional</p>');
    legend.innerHTML = content.join('');
    legend.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}

function setSearchBox()
{
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(layersComboBox);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function()
    {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function()
    {
        var places = searchBox.getPlaces();

        if (places.length == 0)
        {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker)
        {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place)
        {
            var icon =
            {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker
            ({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport)
            {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            }
            else
            {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

function callEndpoint(endpointName)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // true for asynchronous
    xmlHttp.open("POST", "http://localhost:9090/smartcity/" + endpointName, true);
    xmlHttp.send(null);
}

function getTweetMean()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            processAverageCallback(xmlHttp.responseText);
        }
    }

    // true for asynchronous
    xmlHttp.open("GET", "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20'_tweetCreatedAt_mean'%20FROM%20" + properties.tableId + "&key=" + properties.token, true);
    xmlHttp.send(null)
}

function getResponseTimeMean()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            processAverageCallback(xmlHttp.responseText);
        }
    }

    // true for asynchronous
    xmlHttp.open("GET", "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20'_responseTime_mean'%20FROM%20" + properties.tableId + "&key=" + properties.token, true);
    xmlHttp.send(null)
}

function getFavoritesMean()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            processAverageCallback(xmlHttp.responseText);
        }
    }

    // true for asynchronous
    xmlHttp.open("GET", "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20'_favorites_mean'%20FROM%20" + properties.tableId + "&key=" + properties.token, true);
    xmlHttp.send(null)
}

function getRepliesMean()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            processAverageCallback(xmlHttp.responseText);
        }
    }

    // true for asynchronous
    xmlHttp.open("GET", "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20'_inReplyToStatusId_mean'%20FROM%20" + properties.tableId + "&key=" + properties.token, true);
    xmlHttp.send(null)
}

function getRetweetsMean()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            processAverageCallback(xmlHttp.responseText);
        }
    }

    // true for asynchronous
    xmlHttp.open("GET", "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20'_retweets_mean'%20FROM%20" + properties.tableId + "&key=" + properties.token, true);
    xmlHttp.send(null)
}

function getMentionsMean()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            processAverageCallback(xmlHttp.responseText);
        }
    }

    // true for asynchronous
    xmlHttp.open("GET", "https://www.googleapis.com/fusiontables/v2/query?sql=SELECT%20'_tweetCreatedAt_mention_mean'%20FROM%20" + properties.tableId + "&key=" + properties.token, true);
    xmlHttp.send(null)
}

function processAverageCallback(jsonResponse)
{
    var column = JSON.parse(jsonResponse)
    var columnName = column.columns[0]
    var columRows = column.rows
    var sum = 0

    if (columRows.length > 0)
    {
        for (var i = 0; i < columRows.length; i ++)
        {
            var value = (columRows[i])[0]
            if (!isNaN(value))
            {
                sum += Math.round(value)
            }
        }
    }

    var average = sum / columRows.length

    if (columnName == '_tweetCreatedAt_mean')
    {
        tweetsMean = average
        setLayer('avg_tweets')
    }
    else if (columnName == '_responseTime_mean')
    {
        responseTimeMean = average
    }
    else if (columnName == '_favorites_mean')
    {
        favoritesMean = average
    }
    else if (columnName == '_inReplyToStatusId_mean')
    {
        repliesMean = average
    }
    else if (columnName == '_retweets_mean')
    {
        retweetsMean = average
    }
    else if (columnName == '_tweetCreatedAt_mention_mean')
    {
        mentionMean = average
    }
}

function setLayer(option)
{
    if(layer != null)
    {
        layer.setMap(null);
    }

    if (option == 'avg_tweets')
    {
        layer = new google.maps.FusionTablesLayer({
            query:
            {
                select: "geometry",
                from: properties.tableId,
            },
            options:
            {
                styleId: 2,
                templateId: 2
            },
            styles:
                [
                    {
                        polygonOptions:
                        {
                            fillColor: '#38761d',
                        }
                    },
                    {
                        where: '\'_tweetCreatedAt_mean\'' + '>' + tweetsMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#0000FF',
                            fillOpacity: 0.3
                        }
                    },
                    {
                        where: '\'_tweetCreatedAt_mean\'' + '<' + tweetsMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#FF0000',
                            fillOpacity: 0.3
                        }
                    }
                ]
        });
        layer.setMap(map);
    }

    if (option == 'avg_response_time')
    {
        layer = new google.maps.FusionTablesLayer({
            query:
            {
                select: "geometry",
                from: properties.tableId,
            },
            options:
            {
                styleId: 2,
                templateId: 2
            },
            styles:
                [
                    {
                        polygonOptions:
                        {
                            fillColor: '#38761d',
                        }
                    },
                    {
                        where: '\'_responseTime_mean\'' + '>' + responseTimeMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#0000FF',
                            fillOpacity: 0.3
                        }
                    },
                    {
                        where: '\'_responseTime_mean\'' + '<' + responseTimeMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#FF0000',
                            fillOpacity: 0.3
                        }
                    }
                ]
        });
        layer.setMap(map);
    }

    if (option == 'avg_favorites')
    {
        layer = new google.maps.FusionTablesLayer({
            query:
            {
                select: "geometry",
                from: properties.tableId,
            },
            options:
            {
                styleId: 2,
                templateId: 2
            },
            styles:
                [
                    {
                        polygonOptions:
                        {
                            fillColor: '#38761d',
                        }
                    },
                    {
                        where: '\'_favorites_mean\'' + '>' + favoritesMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#0000FF',
                            fillOpacity: 0.3
                        }
                    },
                    {
                        where: '\'_favorites_mean\'' + '<' + favoritesMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#FF0000',
                            fillOpacity: 0.3
                        }
                    }
                ]
        });
        layer.setMap(map);
    }

    if (option == 'avg_replies')
    {
        layer = new google.maps.FusionTablesLayer({
            query:
            {
                select: "geometry",
                from: properties.tableId,
            },
            options:
            {
                styleId: 2,
                templateId: 2
            },
            styles:
                [
                    {
                        polygonOptions:
                        {
                            fillColor: '#38761d',
                        }
                    },
                    {
                        where: '\'_inReplyToStatusId_mean\'' + '>' + repliesMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#0000FF',
                            fillOpacity: 0.3
                        }
                    },
                    {
                        where: '\'_inReplyToStatusId_mean\'' + '<' + repliesMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#FF0000',
                            fillOpacity: 0.3
                        }
                    }
                ]
        });
        layer.setMap(map);
    }

    if (option == 'avg_retweets')
    {
        layer = new google.maps.FusionTablesLayer({
            query:
            {
                select: "geometry",
                from: properties.tableId,
            },
            options:
            {
                styleId: 2,
                templateId: 2
            },
            styles:
                [
                    {
                        polygonOptions:
                        {
                            fillColor: '#38761d',
                        }
                    },
                    {
                        where: '\'_retweets_mean\'' + '>' + retweetsMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#0000FF',
                            fillOpacity: 0.3
                        }
                    },
                    {
                        where: '\'_retweets_mean\'' + '<' + retweetsMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#FF0000',
                            fillOpacity: 0.3
                        }
                    }
                ]
        });
        layer.setMap(map);
    }

    if (option == 'avg_mentions')
    {
        layer = new google.maps.FusionTablesLayer({
            query:
            {
                select: "geometry",
                from: properties.tableId,
            },
            options:
            {
                styleId: 2,
                templateId: 2
            },
            styles:
                [
                    {
                        polygonOptions:
                        {
                            fillColor: '#38761d',
                        }
                    },
                    {
                        where: '\'_tweetCreatedAt_mention_mean\'' + '>' + mentionMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#0000FF',
                            fillOpacity: 0.3
                        }
                    },
                    {
                        where: '\'_tweetCreatedAt_mention_mean\'' + '<' + mentionMean.toString(),
                        polygonOptions:
                        {
                            fillColor: '#FF0000',
                            fillOpacity: 0.3
                        }
                    }
                ]
        });
        layer.setMap(map);
    }
}

function setLayersComboBox()
{
    var layersComboBox = document.getElementById('layers')

    layersComboBox.onchange = function(){ setLayer(this.value)}

    var option0 = document.createElement('option')
    option0.value = "avg_tweets";
    option0.text  = "Média de tweets por dia";
    layersComboBox.add(option0, layersComboBox.options[0]);

    var layersComboBox = document.getElementById('layers')
    var option1 = document.createElement('option')
    option1.value = "avg_mentions";
    option1.text  = "Média de menções por dia";
    layersComboBox.add(option1, layersComboBox.options[1]);

    var layersComboBox = document.getElementById('layers')
    var option2 = document.createElement('option')
    option2.value = "avg_retweets";
    option2.text  = "Média de retweets";
    layersComboBox.add(option2, layersComboBox.options[2]);

    var layersComboBox = document.getElementById('layers')
    var option3 = document.createElement('option')
    option3.value = "avg_replies";
    option3.text  = "Média de réplicas por dia";
    layersComboBox.add(option3, layersComboBox.options[3]);

    var layersComboBox = document.getElementById('layers')
    var option4 = document.createElement('option')
    option4.value = "avg_favorites";
    option4.text  = "Média de favoritos por dia";
    layersComboBox.add(option4, layersComboBox.options[4]);

    var layersComboBox = document.getElementById('layers')
    var option5 = document.createElement('option')
    option5.value = "avg_response_time";
    option5.text  = "Média de tempo de resposta";
    layersComboBox.add(option5, layersComboBox.options[5]);
}