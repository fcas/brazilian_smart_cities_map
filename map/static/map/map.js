TwitterUsernames =
{
    Curitiba_PMC: 0
};

function callEndpoint(endpointName)
{
    for (var username in TwitterUsernames)
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
        xmlHttp.open("POST", "http://localhost:9090/smartcity/" + endpointName + "/" + username, true);
        xmlHttp.send(null);
    }
}

function setLayer(map)
{
    var layer = new google.maps.FusionTablesLayer({
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
                where: '\'_tweetCreatedAt_mean\' > 4',
                polygonOptions:
                {
                    fillColor: '#0000FF',
                    fillOpacity: 0.3
                }
            }
        ]
    });

    layer.setMap(map);
}

function initAutocomplete()
{
    callEndpoint("tweets");

    var map = new google.maps.Map(document.getElementById('map'),
    {
        center:
        {
            lat: -13.5413498,
            lng: -71.5506764
        },
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    setLayer(map);

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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