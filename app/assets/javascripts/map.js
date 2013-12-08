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
    $('#update_filters_button').on('click', function(e){
        e.preventDefault();
        console.log('update filters');
    });

    $('#send_text').on('click', function(e){
        e.preventDefault();
        var phone_number = $('#phone_number').val();
        var authenticity_token = $('#authenticity_token').val();
        var address_to_send =  $('.spot_name').text() + ': '+ $('.spot_address').text();

        var url = '/send_text';
        $.post(url, {number_to_send_to : phone_number, authenticity_token: authenticity_token, message: address_to_send}, function(){
            console.log('post request sent');
        })
        console.log('send text to '+ phone_number);
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

