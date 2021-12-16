const webSocket = new WebSocket("wss://aengietv.com:3000")

webSocket.onmessage = (event) => {
    handleSignallingData(JSON.parse(event.data))
}

function handleSignallingData(data) {
    switch (data.type) {
        case "offer":
            peerConn.setRemoteDescription(data.offer)
            createAndSendAnswer()
            break
        case "candidate":
            peerConn.addIceCandidate(data.candidate)
    }
}

function createAndSendAnswer () {
    peerConn.createAnswer((answer) => {
        peerConn.setLocalDescription(answer)
        sendData({
            type: "send_answer",
            answer: answer
        })
    }, error => {
        console.log(error)
    })
}

function sendData(data) {
    data.username = username
    webSocket.send(JSON.stringify(data))
}


let localStream
let peerConn
let username

function joinCall() {

    username = document.getElementById("username-input").value

    document.getElementById("video-call-div")
    .style.display = "inline"

    navigator.getUserMedia({
        video: {
            frameRate: 24,
            width: {
                min: 480, ideal: 720, max: 1280
            }/*,
            aspectRatio: 1.33333*/
        },
        audio: true
    }, (stream) => {
        localStream = stream
        document.getElementById("local-video").srcObject = localStream
        document.getElementById("action-div").style.visibility = "visible";

        let configuration = {
            iceServers: [
                {
                    "urls": ["stun:stun.l.google.com:19302", 
                    "stun:stun1.l.google.com:19302", 
                    "stun:stun2.l.google.com:19302"]
                }
            ]
        }

        peerConn = new RTCPeerConnection(configuration)
        peerConn.addStream(localStream)

        peerConn.onaddstream = (e) => {
            document.getElementById("remote-video").srcObject = e.stream
        }

        peerConn.onicecandidate = ((e) => {
            if (e.candidate == null)
                return
            
            sendData({
                type: "send_candidate",
                candidate: e.candidate
            })
        })

        sendData({
            type: "join_call"
        })

    }, (error) => {
        console.log(error)
    })
}

let isAudio = true
function muteAudio() {
    if (isAudio){
          document.getElementById("audio-mute").innerHTML = "<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\"><path d=\"M14,3.23 L14,5.29 C16.89,6.15 19,8.83 19,12 C19,15.17 16.89,17.84 14,18.7 L14,20.77 C18,19.86 21,16.28 21,12 C21,7.72 18,4.14 14,3.23 M16.5,12 C16.5,10.23 15.5,8.71 14,7.97 L14,16 C15.5,15.29 16.5,13.76 16.5,12 M3,9 L3,15 L7,15 L12,20 L12,4 L7,9 L3,9 Z\" id=\"Shape\" fill=\"#f29100\" fill-rule=\"nonzero\"></path></svg>";
    }else{
        document.getElementById("audio-mute").innerHTML = "<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\"> <path d=\"M3,9 L7,9 L12,4 L12,20 L7,15 L3,15 L3,9 M16.59,12 L14,9.41 L15.41,8 L18,10.59 L20.59,8 L22,9.41 L19.41,12 L22,14.59 L20.59,16 L18,13.41 L15.41,16 L14,14.59 L16.59,12 Z\" id=\"Shape2\" fill=\"#628890\" fill-rule=\"nonzero\"></path></svg>";
      
    }
    isAudio = !isAudio
    localStream.getAudioTracks()[0].enabled = isAudio
    
}

let isVideo = true
function muteVideo() {
    if (isVideo){
          document.getElementById("video-mute").innerHTML = "<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\"><path d=\"M15,8 L15,16 L5,16 L5,8 L15,8 M16,6 L4,6 C3.44771525,6 3,6.44771525 3,7 L3,17 C3,17.5522847 3.44771525,18 4,18 L16,18 C16.5522847,18 17,17.5522847 17,17 L17,13.5 L21,17.5 L21,6.5 L17,10.5 L17,7 C17,6.44771525 16.5522847,6 16,6 Z\" id=\"Shape\" fill=\"#f29100\" fill-rule=\"nonzero\"></path></svg>";
    }else{
        document.getElementById("video-mute").innerHTML = "<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\"><path d=\"M3.41,1.86 L2,3.27 L4.73,6 L4,6 C3.44771525,6 3,6.44771525 3,7 L3,17 C3,17.5522847 3.44771525,18 4,18 L16,18 C16.21,18 16.39,17.92 16.55,17.82 L19.73,21 L21.14,19.59 L12.28,10.73 L3.41,1.86 M5,16 L5,8 L6.73,8 L14.73,16 L5,16 M15,8 L15,10.61 L21,16.61 L21,6.5 L17,10.5 L17,7 C17,6.44771525 16.5522847,6 16,6 L10.39,6 L12.39,8 L15,8 Z\" id=\"Shape\" fill=\"#628890\" fill-rule=\"nonzero\"></path></svg>";
      
    }
    isVideo = !isVideo;
    localStream.getVideoTracks()[0].enabled = isVideo;
    
}