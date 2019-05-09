var YoutubeMp3Downloader = require("./index");

var Downloader = function() {

    var self = this;

    //Configure YoutubeMp3Downloader with your settings 
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": "mpeg/bin/ffmpeg",  // Where is the FFmpeg binary located? TODO: Set correct path before testing!
        "outputPath": "audio/user_upload",    // Where should the downloaded and encoded files be stored? TODO: Set correct path before testing!
        "youtubeVideoQuality": "highest",       // What video quality should be used? 
        "queueParallelism": 2,                  // How many parallel downloads/encodes should be started? 
        "progressTimeout": 2000                 // How long should be the interval of the progress reports 
    });

    self.callbacks = {};

    self.YD.on("finished", function(error, data) {

        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }

    });

    self.YD.on("error", function(error, data) {

        console.error(error + " on videoId " + data.videoId);

        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId](error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }

    });

};

Downloader.prototype.getMP3 = function(track, callback){

    var self = this;

    // Register callback 
    self.callbacks[track.videoId] = callback;
    // Trigger download 
    self.YD.download(track.videoId, track.name);

};

module.exports = Downloader;