var spots2 = [
    {
        "id": "5064180c830238fd7713e9f4",
        "name": "Starbucks",
        "contact": {
            "phone": "+33143450456",
            "formattedPhone": "+33 1 43 45 04 56",
            "twitter": "starbucksfrance"
        },
        "location": {
            "address": "Gare de Paris-Lyon",
            "crossStreet": "Hall 3",
            "lat": 48.858,
            "lng": 2.4258,
            "distance": 4051,
            "postalCode": "75012",
            "cc": "FR",
            "city": "Paris",
            "state": "Île-de-France",
            "country": "France"
        },
        "categories": [
            {
                "id": "4bf58dd8d48988d1e0931735",
                "name": "Coffee Shop",
                "pluralName": "Coffee Shops",
                "shortName": "Coffee Shop",
                "icon": "https://ss1.4sqi.net/img/categories/food/coffeeshop.png",
                "parents": [
                    "Food"
                ],
                "primary": true
            }
        ],
        "verified": true,
        "restricted": true,
        "stats": {
            "checkinsCount": 604,
            "usersCount": 378,
            "tipCount": 6
        },
        "url": "http://www.starbucks.fr",
        "likes": {
            "count": 0,
            "groups": []
        }
    },
    
    {
        "id": "5064180c830238fd7713e9f",
        "name": "Cafe Charlot",
        "contact": {
            "phone": "+33143450456",
            "formattedPhone": "+33 1 43 45 04 56",
            "twitter": "starbucksfrance"
        },
        "location": {
            "address": "Place de la Republique",
            "crossStreet": "Hall 3",
            "lat": 48.8588,
            "lng": 2.4259,
            "distance": 4051,
            "postalCode": "75010",
            "cc": "FR",
            "city": "Paris",
            "state": "Île-de-France",
            "country": "France"
        },
        "categories": [
            {
                "id": "4bf58dd8d48988d1e0931735",
                "name": "Bar",
                "pluralName": "Coffee Shops",
                "shortName": "Coffee Shop",
                "icon": "https://ss1.4sqi.net/img/categories/food/coffeeshop.png",
                "parents": [
                    "Food"
                ],
                "primary": true
            }
        ],
        "verified": true,
        "restricted": true,
        "stats": {
            "checkinsCount": 604,
            "usersCount": 378,
            "tipCount": 6
        },
        "url": "http://www.starbucks.fr",
        "likes": {
            "count": 0,
            "groups": []
        }
    }
];
var markers;

$(document).ready(function () {
    var map = init_map();     
    console.log(spots);   
    place_markers(spots, map);

    $('body').on('submit', 'form#rate_a_place', function(e){
        e.preventDefault();
        var data = {
            spot_id: $('.spot_id').attr('data-id'),
            wifi_rating: $('#rate_wifi').val(),
            quietness_rating: $('#rate_quietness').val()
        }
        console.log('submit');
        console.log(data);
        $('#rate_form').html('<b>Thanks for your contribution!</b>');
    });
    
});

function init_map(){
    console.log('init map');
    var map;
    markers = [];
    var current_pos = new google.maps.LatLng(48.872548,2.344505);
    var centerPosition = current_pos;

    var options = {
        zoom: 14,
        center: centerPosition,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($('#themap')[0], options);

    
     // map.addListener('center_changed', function() {
     //    window.to = window.setTimeout(function() {
     //        var new_center = map.getCenter();
     //        console.log(new_center);
     //    }, 3000);
     // });

    return map;
}

function place_markers(spots, map){
    spots.forEach(function(spot){
        addMarker(spot, map);
    });
}

function addMarker (data, map){
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.lng),
        map: map,
        name: data.name,
        data: data
    });

    marker.addListener('click', function(e){
        $('.infobox_placeholder').hide();
        $('.infobox').show();
        selectMarker(this);
        updateInfobox(this);
    });
    markers.push(marker);
};

function updateInfobox(marker){
    $('.spot_name').html(marker.data.name);
    var location = marker.data.location;
    // var full_adress = [location.address, location.postalCode, location.city].join(' '); 
    $('.spot_address').html(marker.data.address);
    $('.spot_id').attr('data-id', marker.data.id);
    $('.spot_cat').html(marker.data.category);
}

function selectMarker (marker) {
    markers.forEach(function(a_marker){
        a_marker.setAnimation(null);
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
        marker.setAnimation(null);
    }, 1420);
}

