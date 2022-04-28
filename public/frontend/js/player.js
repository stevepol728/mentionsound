"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function removePlayingClass() {
    var removeSel = document.querySelector(".playing");
    if (removeSel !== null) {
        removeSel.classList.remove("playing");
        removeSel.getElementsByTagName('wave')[0].getElementsByTagName('wave')[0].style.width = 0 + '%';
    }
}

$(document).ready(function () {
    initSoundTrack();
    var jPlayerContainer = $("#jquery_jplayer_1");

    // On jPlayer TimeUpdate
    jPlayerContainer.bind($.jPlayer.event.timeupdate, function (obj) {
        var status = obj.jPlayer.status;
        var remaining = status.currentPercentAbsolute / 100;
        if (_typeof(status.media.waveObj) === 'object') {
            // status.media.waveObj.seekTo(remaining);
            document.getElementById(status.media.container).getElementsByTagName('wave')[0].getElementsByTagName('wave')[0].style.width = status.currentPercentAbsolute + '%';
            // status.media.waveObj.barWidth = status.currentPercentAbsolute;
        }
    });

    // On jPlayer End Current track
    jPlayerContainer.bind($.jPlayer.event.ended, function (obj) {
        var status = obj.jPlayer.status;
        jPlayerContainer.jPlayer("pause");
        if (_typeof(status.media.waveObj) === 'object') {
            document.getElementById(status.media.container).getElementsByTagName('wave')[0].getElementsByTagName('wave')[0].style.width = 0 + '%';
            document.getElementById(status.media.container).parentElement.classList.remove('playing');
            // removePlayingClass();
        }
    });

    // When jPlayer play a track
    jPlayerContainer.bind($.jPlayer.event.play, function (obj) {
        removePlayingClass();
        var status = obj.jPlayer.status;
        if (_typeof(status.media.waveObj) === 'object') {
            document.getElementById(status.media.container).parentElement.classList.add('playing');
        }
    });

    // When jPlayer pause a track
    jPlayerContainer.bind($.jPlayer.event.pause, function (obj) {
        var status = obj.jPlayer.status;
        if (_typeof(status.media.waveObj) === 'object') {
            document.getElementById(status.media.container).parentElement.classList.remove('playing');
            document.getElementById(status.media.container).getElementsByTagName('wave')[0].getElementsByTagName('wave')[0].style.width = 0 + '%';
        }
    });
});

function initSoundTrack() {
    var jPlaylist = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    }, [], {
        swfPath: "/frontend/jplayer",
        supplied: "mp3,wav",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true
    });
    var soundtrack = Array.from(document.querySelectorAll('.soundtrack'));
    soundtrack.forEach(function (singleValue, index) {
        var fContainer = 'soundtrack' + (index + 1);
        var params = {
            container: '#soundtrack' + (index + 1),
            waveColor: '#d7d7d7',
            progressColor: '#52d9a0',
            barWidth: 2,
            height: 44,
            cursorColor: '#d5d5d5',
            responsive: true
        };

        var playlists = WaveSurfer.create(params);
        //playlists.load("http://puresounds.net/assets/media/sounds/"+singleValue.getAttribute('data-url'));
        //var x = location.hostname;
        //var y = location.protocol;
        var url = "/assets/media/sounds/" + singleValue.getAttribute('data-url');
        var mp3 = singleValue.getAttribute('data-mp');
        var peaks = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];

        var listObj = {
            title: singleValue.getAttribute('data-title'),
            wav: url,
            container: fContainer,
            waveObj: playlists
        };
        if (mp3.length > 3) {
            url = "/assets/media/sounds_mp3/" + mp3;
            listObj.mp3 = url;
        }

        // play with jPlayer
        jPlaylist.add(listObj);

        playlists.load(url, peaks);

        var play = Array.from(document.querySelectorAll('.pause'));
        var pause = Array.from(document.querySelectorAll('.play'));

        var singlePlay = play[index];
        var singlePause = pause[index];

        singlePlay.addEventListener('click', function (e) {
            document.getElementById('jp_container_1').classList.add('show');
            jPlaylist.play(index);
        });

        singlePause.addEventListener('click', function (e) {
            jPlaylist.pause();
        });

        playlists.on('seek', function (position) {
            $("#jquery_jplayer_1").jPlayer("playHead", position * 100);
        });
    });

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
}

window.addEventListener("livewire:load", function () {
    Livewire.hook('message.processed', function (message, component) {
        $("#jquery_jplayer_1").jPlayer("destroy");
        initSoundTrack();
    });
});
