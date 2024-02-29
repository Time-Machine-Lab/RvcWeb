<!--
 * @Author: Dhx
 * @Date: 2024-02-27 13:50:40
 * @Description: 
 * @FilePath: \RvcWeb\src\view\chatRoom\pages\roomView.vue
-->
<script setup lang="ts">
import { ref } from 'vue';

var myoffer = ref('')
var myanswer = ref('')
var otheranswer = ref('')
var otheroffer = ref('')
var yourConn:any;
var stream:any;
// var RTCSessionDescription:any;
var PeerConnection:any;
// var isVideo = false;
// var isCaller = false;
// var currentUserInfo = {};
// var isPC = true;
// var preHeadPath = "file/head/";
// var preUploadPath = "/file/upload/";
// var pictureCache = new Map();
var localVideo = ref<any>(null);
var remoteVideo = ref<any>(null);
// var minflag = 0;
// var audioVideoDevices;
function initWebRTC() {
    // @ts-expect-error
    PeerConnection = (window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.RTCPeerConnection || undefined);
    // RTCSessionDescription = (window.webkitRTCSessionDescription || window.mozRTCSessionDescription || window.RTCSessionDescription || undefined);

    if (navigator.mediaDevices === undefined) {
        // @ts-expect-error
        navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            // @ts-expect-error
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    var mediaOpts = {
        // audio: audioVideoDevices.audioinput || audioVideoDevices.audiooutput,
        audio: true,
        // video: audioVideoDevices?.video ? { facingMode: "user" } : true
    }
    // @ts-expect-error
    navigator.getUserMedia(mediaOpts, successFunc, errorFunc);


    function successFunc(myStream:any) {
        stream = myStream;
        //displaying local video stream on the page
        localVideo.value.srcObject = stream;
        console.log(stream)
        //using Google public stun server,turn中继服务器需要自己搭建，可参考网上coturn搭建教程
        var configuration = {
            "iceServers": [
                {
                    'urls': 'stun:stun.l.google.com:19302'
                },
                { "urls": "stun:124.71.107.76:3478" }
            ]
        };

        yourConn = new PeerConnection(configuration);

        // setup stream listening
        yourConn.addStream(stream);
        yourConn.createOffer(function (offer:any) {

            yourConn.setLocalDescription(offer);
            setTimeout(() => {
                myoffer.value = yourConn.localDescription

            }, 4000)
        }, function (error:any) {
            console.log(error)
            alert("Error when creating an offer");
        });
        //when a remote user adds stream to the peer connection, we display it
        yourConn.onaddstream = function (e:any) {
            remoteVideo.value.srcObject = e.stream;

        };
        // stream.getTracks().forEach(track => {
        //     yourConn.addTrack(track, stream);
        // });
        // Setup ice handling
        yourConn.onicecandidate = function (event:any) {
            if (event.candidate) {
                // websocket.send(JSON.stringify({
                //     from: currentUserInfo.userName,
                //     to: isCaller ? currentUserInfo.to : videodata.caller,
                //     contentType: "candidate",
                //     content: event.candidate
                // }));
            }
        };
        yourConn.ontrack = function (evt:any) {
            console.log(evt);
            remoteVideo.value!.srcObject = evt.streams[0];
            remoteVideo.value.muted = true
        }

    }
    function errorFunc(err:any) {
        if ("NotFoundError" == err.name) {
            console.log("设备不具备视频、音频条件或没有音视频权限");
        } else {
            console.log(err.name);
        }
        // isVideo = false;
        // isCaller = false;
    }


}
initWebRTC()
setTimeout(() => {

}, 4000);

const link = function () {
    yourConn.setRemoteDescription(JSON.parse(otheroffer.value));
    //create an answer to an offer
    yourConn.createAnswer(function (answer:any) {
        yourConn.setLocalDescription(answer);
        console.log(answer)
        myanswer.value = answer
    }, function (error:any) {
        console.log(error)
        alert("Error when creating an answer");
    });
}
const answeroffer = function () {
    yourConn.setRemoteDescription(JSON.parse(otheranswer.value));
}
</script>
<template>
    <div class="roomView">
        <div>local</div>
        <audio ref="localVideo" controls style="height: 100px;"></audio>
        <div>remote</div>
        <input style="border: black 1px solid;" v-model="otheroffer" placeholder="offer"><button
            @click="link()">offer</button>
        <input style="border: black 1px solid;" v-model="otheranswer" placeholder="answer"><button
            @click="answeroffer()">answer</button>
        <audio ref="remoteVideo" controls style="height: 100px;"></audio>
        <div style="display: flex;">
            <div style="width: 50%;">
            <textarea v-text="JSON.stringify(myoffer)" style="height: 200px;width:100%;border:black 1px solid;"></textarea>
        </div>
        <div style="width: 50%;">
            <textarea v-text="JSON.stringify(myanswer)" style="height: 200px;width:100%;border:black 1px solid;"></textarea>
        </div>
        </div>
    </div>
</template>
<style scoped>
@import "@/view/chatRoom/style/room.css";
</style>