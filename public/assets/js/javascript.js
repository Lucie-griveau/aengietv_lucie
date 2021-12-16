var rootSito = "/v1.6";
var complexity = false;


const acceptedLanguage = new Set([
  "en",
  "fr",
  "it"
]);

var userLanguage = navigator.language.substr(0, 2);

var language = "en";

if (acceptedLanguage.has(userLanguage)) {
  language = userLanguage;
}


var arrayUser = getCookie('username').split("|");
var idUsr = arrayUser[0];
var diskQuota = parseInt(arrayUser[6]) * 1000000;
var lat, lon;
var alreadyDone = false;

function hideElement(element) {
  $('#' + element).hide();
}

function hideAds(element) {
  $('#' + element).hide();
  document.getElementById('interactionToolbox').style.top = "0px";
  document.getElementById('otherStreams').style.top = "0px";
}

function displayElement(element) {

  document.getElementById(element).style.display = 'block';
}

function getLocation(idUser, from) {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition(position, idUser, from);
    }, errorPosition, optionsPosition);
  } else {
    document.getElementById('messaggio').innerHTML = i18n[language].geolocationError;
  }
}

function setPosition(position, idUser, from) {
  document.getElementById('messaggio').innerHTML = "Lat: " + position.coords.latitude.toFixed(4)
    + "<br>Lon: " + position.coords.longitude.toFixed(4);
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  updatePosition(idUser, from);

}


function errorPosition(error) {
  document.getElementById('messaggio').innerHTML = error.message;
}

var optionsPosition = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function changePassword(id_user) {
  var pwd = document.getElementById('password').value;
  var pwd2 = document.getElementById('pass2word').value;
  if (complexity) {

    if (pwd != pwd2) {
      $('#genericAlert').modal('show');
      $("#genericAlertInside").html(i18n[language].passwordNotMatch);
      $("#btnCancel").hide();
      $("#btnText").html(i18n[language].OK);
      $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

    } else {
      //everythings it's allright
      var params = new FormData();
      params.append("password", pwd);
      params.append("id_user", id_user);


      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

          var msg = xmlhttp.responseText.split("|");
          if (msg[0] != "KO") {
            // alert(xmlhttp.responseText);
            $('#genericAlert').modal('show');
            $("#genericAlertInside").html(msg[1]);
            $("#btnCancel").hide();
            $("#btnText").html(i18n[language].OK);
            $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');document.location.href= rootSito;");


          } else {
            alert(msg[1]);
          }


        }
      }
      xmlhttp.open("POST", rootSito + "/ajax/updatePassword.php", true);
      xmlhttp.send(params);


    }

  } else {
    alert(i18n[language].passwordComplexityError);
  }


}

function checkRequired() {
  var req = true;
  var msg = i18n[language].requireFieldAlert + "<br>";
  var form = document.getElementById('form1');
  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
      msg += form.elements[i].name + "<br>"
      req = false;
    }
  }
  if (!req) {
    $('#genericAlert').modal('show');
    $("#genericAlertInside").html(msg);
    $("#btnCancel").hide();
    $("#btnText").html(i18n[language].OK);
    $("#btnText").attr("onclick", "$('#genericAlert').modal('hide')");
  }
  return req;
}

function controlAndSend(where) {
  if (where != 'r') {
    var checkComp = 'true';
    if (document.getElementById('checkComp').value !== null && document.getElementById('checkComp').value != "") {
      checkComp = document.getElementById('checkComp').value;
    }
  }
  var form = document.getElementById('form1');
  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
      alert(i18n[language].requireFieldAlert);
      return false;
    }
    if(form.elements[i].hasAttribute('requiredTrue')){
        if (form.elements[i].value != 1){
            alert(i18n[language].acceptTermsAndPrivacy);
            return false;
        }
    }
  }
  if (checkComp == 'true') {
    if (complexity) {
      form.submit();
    } else {
      alert(i18n[language].passwordError);
    }
  } else {
    form.submit();
  }
}


function checkComplexity() {
  if (document.getElementById('password').value != "") {
    document.getElementById('checkComp').value = 'true';
  } else {
    document.getElementById('checkComp').value = 'false';
  }
}


function checkBox(elemento) {
  var elem = document.getElementById(elemento);
  elem.value = 0
  if (elem.checked) {
    elem.value = 1;
  }
}


function controlComplexity(password) {

  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  var lowercase = "abcdefghijklmnopqrstuvwxyz";

  var digits = "0123456789";

  var splChars = "!@#$%&*();:?";

  var ucaseFlag = contains(password, uppercase);

  var lcaseFlag = contains(password, lowercase);

  var digitsFlag = contains(password, digits);

  var splCharsFlag = contains(password, splChars);

  if (password.length >= 8) {
    document.getElementById('length').style.color = "#71d02a";
  } else {
    document.getElementById('length').style.color = "#ff0062";
  }
  if (ucaseFlag) {
    document.getElementById('upper').style.color = "#71d02a";
  } else {
    document.getElementById('upper').style.color = "#ff0062";
  }
  if (lcaseFlag) {
    document.getElementById('lower').style.color = "#71d02a";
  } else {
    document.getElementById('lower').style.color = "#ff0062";
  }
  if (splCharsFlag) {
    document.getElementById('special').style.color = "#71d02a";
  } else {
    document.getElementById('special').style.color = "#ff0062";
  }
  if (digitsFlag) {
    document.getElementById('digit').style.color = "#71d02a";
  } else {
    document.getElementById('digit').style.color = "#ff0062";
  }
  if (digitsFlag && splCharsFlag && lcaseFlag && ucaseFlag && password.length >= 8) {
    complexity = true;
  }
}

function contains(password, allowedChars) {

  for (var i = 0; i < password.length; i++) {

    var char = password.charAt(i);

    if (allowedChars.indexOf(char) >= 0) {
      return true;
    }

  }

  return false;
}


function gotoStationContributions(idStation, idUsr) {

  location.href = rootSito + "/mytv/" + idUsr + "/dashboard/contributions/" + idStation;

}


function updateFieldValue(field, val) {
  document.getElementById(field).value = val;
}


function addArgument(argument) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      var variabili = xmlhttp.responseText.split("|")

      if (variabili[0] == "OK") {

        var option = document.createElement('option');
        option.value = variabili[1];
        option.innerHTML = argument;
        //str = str + "<option value=\""+ variabili[1] +"\" >" + argument + "</option>";
        document.getElementById("idArgument").append(option);
        $('#createArgumentPanel').modal('hide');
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/addArgument.php?argument=" + argument, true);
  xmlhttp.send();

}


function selectArgument(idArgument) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var variabili = xmlhttp.responseText.split("|")

      if (variabili[0] != "KO") {

        for (var i = 0; i < variabili.length - 1; i++) {
          var coppiaValori = variabili[i].split("§");
          var option = document.createElement('option');
          option.value = coppiaValori[0];
          option.innerHTML = coppiaValori[1];

          document.getElementById("idArgument").append(option);

          if (idArgument == coppiaValori[0]) {

            document.getElementById("idArgument").options[i + 1].selected = true;

          }

        }


      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/selectArgument.php", true);
  xmlhttp.send();

}


var fileobj;

function upload_file(e, elemento, idUser) {
  e.preventDefault();
  fileobj = e.dataTransfer.files[0];

  ajax_file_upload(fileobj, elemento, idUser);
}

function file_explorer(elemento, idUser, idItem) {
  //alert(idItem);
  document.getElementById('selectfile').click();
  document.getElementById('selectfile').onchange = function () {
    fileobj = document.getElementById('selectfile').files[0];
    switch (elemento) {
      case 'user-pic':
        ajax_file_upload(fileobj, elemento, idUser);
        break;
      case 'adv':
        ajax_file_upload(fileobj, elemento, idUser, idItem);
        break;
      case 'bgAdv':
        ajax_file_upload(fileobj, elemento, idUser);
        break;
      default:
        controlDiskSpace(fileobj.size, elemento, idUser);
        break;
    }


  };
}


function controlDiskSpace(fileSize, elemento, idUsr) {
  // alert( rootSito + "/ajax/controlDiskSpace.php?fileSize=" + fileSize + "&idUsr=" + idUsr + "&diskQuota=" + diskQuota);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      var msg = xmlhttp.responseText.split("|")
      if (msg[0] == "KO") {
        alert(i18n[language].fileSizeError);

        return false;
      } else {
        ajax_file_upload(fileobj, elemento, idUsr);
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/controlDiskSpace.php?fileSize=" + fileSize + "&idUsr=" + idUsr + "&diskQuota=" + diskQuota, true);
  xmlhttp.send();
}


function ajax_file_upload(file_obj, elemento, idUser, idItem) {
  //alert(elemento);

  if (elemento == 'video-user' || elemento == 'showreel-user') {
    $('#genericAlert').modal('show');
    $('#btnText').hide();
    $("#genericAlertInside").html(`<span id="percentTxt"></span><div id="percentage" style="width: 0%; height: 20px; border-radius: 10px;z-index: 20;position: relative; background-color: #f29100"></div><div>${i18n[language].uploadTime}</div>`);

  }


  if (file_obj != undefined) {
    var form_data = new FormData();
    form_data.append('file', file_obj);
    $.ajax({


      xhr: function () {
        var xhr = new window.XMLHttpRequest();

        // Upload progress
        xhr.upload.addEventListener("progress", function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            //Do something with upload progress
            if (elemento == "showreel" || elemento == "showreel-user" || elemento == 'video-user') {
              //$('#percentage').css("width", (percentComplete * 100) - percentComplete * 5 + "%");
              $('#percentage').css("width", (percentComplete * 100) + "%");
              var percComp = Math.round((percentComplete * 100)) + "%";
              $('#percentTxt').html(percComp);
              if (percComp == "100%") {
                $("#genericAlertInside").html("<div class=\"container\"><div class=\"zmovo-preloader-inner\"  style=\"min-height:1vh;width: unset<;position:unset;\"><element id=\"preloader\" class=\"container-preloader\"><element class=\"orange\"></element><element class=\"green\"></element><element class=\"bordeaux\"></element><element class=\"yellow\"></element></element></div></div><div>" + i18n[language].copying + "</div>");
                $("#btnsContainer").hide();
              }
            }
          }
        }, false);


        return xhr;
      },

      type: 'POST',
      url: rootSito + '/ajax/fileUp.php?elemento=' + elemento,
      contentType: false,
      processData: false,
      data: form_data,
      success: function (response) {


        if (response == "FFNA") {
          $('#genericAlert').modal('show');
          $("#genericAlertInside").html(i18n[language].fileFormatList);
          $("#btnCancel").hide();
          $("#btnText").html(i18n[language].OK);
          $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
        } else {
          switch (elemento) {
            case "poster":
              $('#selectfile').val('');
              $('#' + elemento).css({
                'background-image': 'url(/image/hero/' + response + ')'
              });
              break;
            case "bgAdv":
              $('#selectfile').val('');
              $('#placeholderAdv').attr('src', '/image/banners/' + response);
              $('#bgAdvImg').val(response);

              break;
            case "logo":
              $('#' + elemento).css({
                'background-image': 'url(/image/channelsLogo/' + response + ')'
              });

              break;
            case "adv":

              $('#placeholderAdv').attr('src', '/image/banners/' + response);
              $('#newAdvImg').val(response);

              break;
            case "showreel":
              $('#' + elemento).val(response);
              $('#percentage').css("display", "none");

              break;
            case "usr-pic":
              $('#pic').val(response);
              $('#' + elemento).attr("src", "/image/picsUsr/" + response);

              break;
            case "showreel-user":
              $('#' + elemento).val(response);

              $("#genericAlertInside").html(`<div class="container"><div class="zmovo-preloader"  style="min-height:1vh;width: unset;position:unset;"><element id="preloader" class="container-preloader"><element class="orange"></element><element class="green"></element><element class="bordeaux"></element><element class="yellow"></element></element></div></div><div>${i18n[language].videoUpload}</div>`);
              $("#btnsContainer").hide();


              createPoster(response, 20, 'showreel');


              break;
            case "video-user":
              $('#' + elemento).val(response);

              $("#genericAlertInside").html(`<div class="zmovo-preloader" style="min-height:1vh;width: unset;position:unset;"><element id="preloader" class="container-preloader"><element class="orange"></element><element class="green"></element><element class="bordeaux"></element><element class="yellow"></element></element></div><div>${i18n[language].videoUpload}</div>`);
              $("#btnsContainer").hide();


              createPoster(response, 20, 'library');


              break;

          }
        }
        if (elemento != "adv" || elemento != "bgAdv") {
          $('#' + elemento + 'Hdn').val(response);
        }
      }
    });
  }
}


function createPoster(video, sec, videoType) {
  var userId = document.getElementById('userId').value;

  var xmlhttp = new XMLHttpRequest();
  var idElement = 'mainVideo';
  /*if(videoType == 'library'){
      idElement = 'remote-video';
  }*/

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      var msg = xmlhttp.responseText.split("|");
      if (msg[0] != "KO") {

        var elementVideo = document.getElementById(idElement);
        elementVideo.setAttribute('poster', msg[1]);
        elementVideo.src = '/video/' + msg[3];
        if (videoType == 'library') {
          document.getElementById('idVideo').value = msg[2];
          $('#genericAlert').modal('hide');
        }

      } else {
        alert(i18n[language].videoSavingError1 + " " + msg[1] + " " + i18n[language].videoSavingError2 + " " + msg[2]);
      }


    }
  }
  xmlhttp.open("GET", rootSito + "/getImageFromVideo2.php?video=" + video + "&sec=" + sec + "&userId=" + userId + "&videoType=" + videoType, true);
  xmlhttp.send();


}


///////////// NEW UPLOAD ////////////

function beginUpload(type, idUser) {
  //show the alert window with the browse file button
  $("#btnText").hide();
  $("#btnCancel").removeClass('zmovo-login-btn');
  $("#btnCancel").addClass('uploadBtn');
  $("#btnCancel").html(i18n[language].close);
  $('#genericAlert').attr("data-keyboard", "false");
  $("#genericAlert").attr("data-backdrop", "static");
  $('#genericAlert').modal('show');
  if ($("#upcvr").length == 0) {
    $("#btnsContainer").append('<button type="button" id="upcvr" onclick="letsUpload(' + idUser + '); return false;" class="uploadBtn">' + i18n[language].startUpload + '</button>');
  }


  $("#genericAlertInside").html(`<input type="file" id="multiupload" name="uploadFiledd[]" multiple>
 <div id="uploadsts"></div>`);
  //$("#genericAlertInside").append('<div>Upload and send to station <input type="checkbox" id="uploadAndSendChk" onClick="addUploadAndSend()"></div>');
  $("#upcvr").show();

}

function addUploadAndSend() {

  $("#genericAlertInside").append('<div>here the select</div>')

}

function letsUpload(idUser) {
  //get the file list and begin to iterate between them
  $('#upcvr').prop("disabled", true);
  var fileList = $('#multiupload').prop("files");
  $('#uploadsts').html('');
  var i;
  for (i = 0; i < fileList.length; i++) {
    $('#uploadsts').append('<p class="upload-page">' + fileList[i].name + '<span class="loading-prep" id="prog' + i + '"></span></p>');
    if (i == fileList.length - 1) {
      //for all the files in the list, check if the user has enough space to upload if checkspace is ok begin the upload progress
      checkDiskSpace(fileList[i].size, idUser, fileList.length - 1, 0);
    }
  }

}

function checkDiskSpace(fileSize, idUser, ttl, cl) {
  //ttl = total files in the list
  //cl = number of current file

  // if checkspace is ok begin the upload process
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      var msg = xmlhttp.responseText.split("|")
      if (msg[0] == "KO") {
        alert(i18n[language].fileSizeError);

        return false;
      } else {
        uploadajax(ttl, cl, idUser);
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/controlDiskSpace.php?fileSize=" + fileSize + "&idUsr=" + idUser + "&diskQuota=" + diskQuota, true);
  xmlhttp.send();
}

function uploadajax(ttl, cl, idUser) {

  //ttl = total files in the list
  //cl = number of current file

  var fileList = $('#multiupload').prop("files");
  $('#prog' + cl).removeClass('loading-prep').addClass('upload-image');

  var form_data = "";

  form_data = new FormData();
  form_data.append("upload_image", fileList[cl]);
  form_data.append("idUser", idUser);

  var request = $.ajax({
    url: rootSito + "/ajax/upload.php",
    cache: false,
    contentType: false,
    processData: false,
    async: true,
    data: form_data,
    type: 'POST',
    xhr: function () {
      var xhr = $.ajaxSettings.xhr();
      if (xhr.upload) {
        xhr.upload.addEventListener('progress', function (event) {
          var percent = 0;
          if (event.lengthComputable) {
            percent = Math.ceil(event.loaded / event.total * 100);
          }
          $('#prog' + cl).text(' ' + percent + '%');
          ///if is the last file and has finished to upload I can display the OK message, before the success message 
          //because the file is transferring from the web server to the NFS
          if (cl == ttl && percent == 100) {
            $('#genericAlertInside').html('<div>' + i18n[language].endUploadMessage + '</div>');
            $("#upcvr").hide();
            $("#btnCancel").html("OK");
            $("#btnCancel").removeClass('uploadBtn');
            $("#btnCancel").addClass('zmovo-login-btn');
          }


        }, false);
      }
      return xhr;
    },
    success: function (res, status) {
      if (status == 'success') {
        percent = 0;
        $('#prog' + cl).text('');
        $('#prog' + cl).text('--Success: ');
        if (cl < ttl) {
          uploadajax(ttl, cl + 1, idUser);
        }
        /*else {
                 $('#genericAlertInside').html('<div>' + i18n[language].endUploadMessage + '</div>');
                 $("#upcvr").hide();
                 $("#btnCancel").html("OK");
                 $("#btnCancel").removeClass('uploadBtn');
                 $("#btnCancel").addClass('zmovo-login-btn');
                 //alert('Done');
               }*/
      }
    },
    fail: function (res) {
      $('#genericAlertInside').html('<div>' + i18n[language].uploadErrorMessage + '</div>');
      //alert(res);
    }
  })
}


/////////// END NEW UPLOAD ///////////


function alertSendToStation(idItem, idUser) {


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
      if (msg[0] == "OK") {


        var selectInner = "<select class=\"form-control\" name=\"stationSelection\" id=\"stationSelection\" onChange=\"sendVideo(this.value,'" + idUser + "', '" + idItem + "')\"><option>" + i18n[language].selectStation + "</option>";
        for (var i = 1; i < msg.length; i++) {
          var options = msg[i].split("§");

          selectInner = selectInner + "<option value=\"" + options[0] + "\">" + options[1] + "</option>";
        }
        selectInner = selectInner + "</select>";
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(i18n[language].uploadVideoInformation);
        $("#selectContainer").html(selectInner);


        $("#btnText").hide();
        //$("#btnText").attr("onclick", "sendVideo('" + idItem + "', '"+idUser+"')");
      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(i18n[language].notContributorError);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      }

    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/selectJoinedStations.php?idUser=" + idUser, true);
  xmlhttp.send();


}


function sendVideo(idStation, idUser, idVideo) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
      if (msg[0] == "OK") {

        $('#send_' + idVideo).hide();
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(i18n[language].videoSubmitted);
        $("#stationSelection").hide();
        $("#btnCancel").hide();
        $("#btnText").show();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      } else {
        $("#genericAlertInside").html(msg[1]);
        $("#stationSelection").hide();
        $("#btnCancel").hide();
        $("#btnText").show();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      }

    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/sendVideo.php?idUser=" + idUser + "&idStation=" + idStation + "&idVideo=" + idVideo, true);
  xmlhttp.send();


}


function alertDelete(idItem) {

  $('#genericAlert').modal('show');
  $("#btnsContainer").show();
  $("#genericAlertInside").html(i18n[language].deleteVideo);
  $("#btnText").html(i18n[language].delete);
  $("#btnText").attr("onclick", "deleteVideo('" + idItem + "')");


}


function deleteVideo(idVideo) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
      if (msg[0] != "KO") {
        //alert(xmlhttp.responseText);
        $("#genericAlertInside").html(msg[1]);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
        document.location.reload();
      } else {
        $("#genericAlertInside").html(msg[1]);
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
        $("#btnCancel").hide();
      }


    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/deleteVideo.php?idVideo=" + idVideo, true);
  xmlhttp.send();
}


function updateVideo() {
  var idVideo = document.getElementById('idVideo').value;
  var videoTitle = document.getElementById('videoTitle').value;
  var isShowreel = "0";
  if (document.getElementById('isShowreel').checked) {
    isShowreel = "1";
  }

  var isPublished = "0";
  if (document.getElementById('isPublished').checked) {
    isPublished = "1";
  }
  var description = document.getElementById('video_description').value
  var tags = document.getElementById('tagsHdn').value
  var params = new FormData();
  params.append("idVideo", idVideo);
  params.append("videoTitle", videoTitle);
  params.append("isShowreel", isShowreel);
  params.append("isPublished", isPublished);
  params.append("description", description);
  params.append("tags", tags);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
      if (msg[0] != "KO") {
        // alert(xmlhttp.responseText);
        $("#genericAlertInside").html(msg[1]);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
        document.location.reload();

      } else {
        alert(msg[1]);
      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/updateVideo.php", true);
  xmlhttp.send(params);


}


function selectVideoForApproval(idVideo, idStationVideo) {
  $('#editing').show();
  var params = new FormData();
  params.append("idVideo", idVideo);
  params.append("idStationVideo", idStationVideo);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
        //alert(msg[4]);
      if (msg[0] != "KO") {
        // 1:title 2:description 3: poster 4: url 5:published 6: showreel 7:status (of the  video table) 8: tags (separati da ,), 9 id status from the matching table (station_video)
        document.getElementById('idVideo').value = idVideo;
        document.getElementById('idStationVideo').value = idStationVideo;
        document.getElementById('videoTitle').value = msg[1];
        document.getElementById('video_description').value = msg[2];
        document.getElementById('mainVideo').setAttribute('poster', "/image/pics/" + msg[3]);
        
        var player = videojs(document.querySelector('.video-js'));
        player.src({
                src: '/video/' + msg[4],
                type: 'video/mp4'/*video type*/
            });

  player.play();  
 
       /* document.getElementById('videoSource').src = "/video/" + msg[4];
        document.getElementById('videoSource').type =  'video/mp4';*/
          //document.getElementById('mainVideo').load();
        //document.getElementById('doneBtn').setAttribute('onClick', "approveOrRejectVideo();return false");

        document.getElementById("status").value = msg[9];

        if (msg[5] == "1") {
          document.getElementById('published').checked = true;
        }

        var tags = msg[8].split(",");

        for (var i = 0; i < tags.length; i++) {

          $("#tags").tagit("createTag", tags[i]);

        }


      } else {

        alert(msg[1]);
      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/selectVideo.php", true);
  xmlhttp.send(params);


}


function approveOrRejectVideo() {
  var idStationVideo = document.getElementById('idStationVideo').value;
  var idVideo = document.getElementById('idVideo').value;
  var sel = document.getElementById('status');
  var status = sel.value;
  var statusText = sel.options[sel.selectedIndex].text
  var videoTitle = document.getElementById('videoTitle').value;
  var desc = document.getElementById('video_description').value;
  var published = 0;
  if (document.getElementById('published').checked) {
    published = 1;
  }
  var tags = document.getElementById('tagsHdn').value;
  var params = new FormData();
  params.append("idStationVideo", idStationVideo);
  params.append("idVideo", idVideo);
  params.append("status", status);
  params.append("statusText", statusText);
  params.append("videoTitle", videoTitle);
  params.append("isPublished", published);
  params.append("description", desc);
  params.append("tags", tags);


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      var msg = xmlhttp.responseText.split("|");
      if (msg[0] != "KO") {
        $("#btnCancel").hide();
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(msg[1]);
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "location.reload();");
      } else {
        alert(msg[1]);
      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/approveOrRejectVideo.php", true);
  xmlhttp.send(params);


}


function editVideo(idVideo) {

  location.href = "#stationsSettings";
  var params = new FormData();
  params.append("idVideo", idVideo);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      var msg = xmlhttp.responseText.split("|");
      if (msg[0] != "KO") {
        // 1:title 2:description 3: poster 4: url 5:published 6: showreel 7:status 8: tags (separati da ,)
        document.getElementById('idVideo').value = idVideo;
        document.getElementById('videoTitle').value = msg[1];
        document.getElementById('video_description').value = msg[2];
        document.getElementById('mainVideo').setAttribute('poster', "/image/pics/" + msg[3]);
        document.getElementById('mainVideo').src = "/video/" + msg[4];

        if (msg[5] == "1") {
          document.getElementById('isPublished').checked = true;
        } else {
          document.getElementById('isPublished').checked = false;
        }
        if (msg[6] == "1") {
          document.getElementById('isShowreel').checked = true;
        } else {
          document.getElementById('isShowreel').checked = false;
        }
        var tags = msg[8].split(",");
        //var tagsInnerHTML = '';
        for (var i = 0; i < tags.length; i++) {
          //tagsInnerHTML = tagsInnerHTML + "<li class=\"tagit-new\">"+tags[i]+"</li>";
          $("#tags").tagit("createTag", tags[i]);

        }
        //document.getElementById('tags').value = msg[8];

      } else {
        alert(msg[1]);
      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/selectVideo.php", true);
  xmlhttp.send(params);


}


function updateProfile(idUser) {
  var userProfile = document.getElementById('userProfile').value;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      if (xmlhttp.responseText == "OK") {

        $("#userProfile").css("background-color", "#282828");
        $("#userProfile").css("color", "white")

      } else {
        alert(i18n[language].updateProfileError + "\n" + xmlhttp.responseText);

      }


    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/updateProfile.php?userProfile=" + userProfile + "&idUser=" + idUser, true);
  xmlhttp.send();


}

function addStation(idUsr, last_lat, last_lon) {


  var stationName = document.getElementById('stationName').value;
  var idArgument = document.getElementById('idArgument').value;
  var accentColor = document.getElementById('accentColor').value;
  var poster = document.getElementById('posterHdn').value;
  var showreel = document.getElementById('showreelHdn').value;
  var communityManager = document.getElementById('communityManagerHdn').value;
  var streamMaster = document.getElementById('streamMasterHdn').value;
  var logo = document.getElementById('logoHdn').value;
  var idOwner = idUsr;
  var params = new FormData();
  params.append("stationName", stationName);
  params.append("idArgument", idArgument);
  params.append("accentColor", accentColor);
  params.append("poster", poster);
  params.append("showreel", showreel);
  params.append("communityManager", communityManager);
  params.append("streamMaster", streamMaster);
  params.append("logo", logo);
  params.append("idOwner", idOwner);
  params.append("last_lat", last_lat);
  params.append("last_lon", last_lon);


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


      var variabili = xmlhttp.responseText.split("|")
      if (variabili[0] == "OK") {

        location.href = rootSito + "/mytv/" + idUsr + "/dashboard/settings/station";

      } else {
        alert(i18n[language].addStationError + variabili[1])
      }
    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/addStation.php", true);
  xmlhttp.send(params);


}


function contributorsList(idStation, idUsr) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var str = "";
      var el = document.getElementById('stationsSettings');


      const variabili = JSON.parse(xmlhttp.responseText);


      if (variabili.result == "OK") {
        const arrUsers = variabili.users;
        const arrReceivers = variabili.receivers;
        if (arrUsers != null) {
          for (var i = 0; i < arrUsers.length; i++) {

            var checked = "";
            var checkedCelebrity = "";
            var checkedJournalist = "";
            var selectedReceiver = "";
            var askToJoin = "";
            var borderForSpecials = "";


            if (arrUsers[i]['isSM']) {
              borderForSpecials = " border: 1px solid #bb3e60;border-radius: 15px; ";
            }
            if (arrUsers[i]['isCM']) {
              borderForSpecials = " border: 1px solid #8EC535;border-radius: 15px; ";
            }
            if (arrUsers[i]['isSO']) {
              borderForSpecials = " border: 1px solid #F29100;border-radius: 15px; ";
            }

            if (arrUsers[i]['ask_to_join'] == 0) {
              askToJoin = "disabled";
            }
            if (arrUsers[i]['is_contributor'] == "1") checked = "checked";
            if (arrUsers[i]['is_celebrity'] == "1") checkedCelebrity = "checked";
            if (arrUsers[i]['is_journalist'] == "1") checkedJournalist = "checked";


            str = str + "<div class=\"row\" style=\"margin-bottom: 3px; " + borderForSpecials + "\" >";
            str = str + "<div class=\"col-4\">" + arrUsers[i]['username'] + "<br>(" + arrUsers[i]['email'] + ")</div>";

            str = str + "<div class=\"col-1\" style=\"text-align: right\">";
            str = str + `<div style="font-size: 11px;">${i18n[language].contributor}</div><label class="switch">`;
            str = str + "<input type=\"checkbox\" id=\"check_" + i + "\" onClick=\"setContributor(this.checked,'" + arrUsers[i]['id_user'] + "','" + idStation + "', '" + askToJoin + "', this.id)\" " + checked + ">";
            str = str + "<span class=\"slider round\"></span>";
            str = str + "</label>";
            str = str + "</div>";

            str = str + "<div class=\"col-1\" style=\"text-align: right\">";
            str = str + `<div style="font-size: 11px;">${i18n[language].celebrity}</div><label class="switch">`;
            str = str + "<input type=\"checkbox\" id=\"check_" + i + "\" onClick=\"setCelebrity(this.checked,'" + arrUsers[i]['id_user'] + "','" + idStation + "')\" " + checkedCelebrity + ">";
            str = str + "<span class=\"slider round\"></span>";
            str = str + "</label>";
            str = str + "</div>";

            str = str + "<div class=\"col-1\" style=\"text-align: right\">";
            str = str + `<div style="font-size: 11px;">${i18n[language].journalist}</div><label class="switch">`;
            str = str + "<input type=\"checkbox\" id=\"check_" + i + "\" onClick=\"setJournalist(this.checked,'" + arrUsers[i]['id_user'] + "','" + idStation + "')\" " + checkedJournalist + ">";
            str = str + "<span class=\"slider round\"></span>";
            str = str + "</label>";
            str = str + "</div>";


            str = str + "<div class=\"col-4\" style=\"text-align: right\">";
            str = str + `<div>${i18n[language].availableReceivers}</div>`;
            str = str + "<select style=\"min-height: 35px; max-width: 260px;position:relative; right: -20px;\" id=\"select_" + i + "\" onChange=\"setReceiver('" + arrUsers[i]['id_user'] + "','" + idStation + "', this.value, '" + arrUsers.length + "', this.id)\">";
            str = str + `<option value="">${i18n[language].selectReceiver}</option>`;
            for (var j = 0; j < arrReceivers.length; j++) {
              selectedReceiver = "";
              if (arrUsers[i]['id_receiver'] == arrReceivers[j]['id_receiver']) selectedReceiver = "selected";
              str = str + "<option value=\"" + arrReceivers[j]['id_receiver'] + "\"  " + selectedReceiver + " >" + arrReceivers[j]['receiver_name'] + "</option>";
            }
            str = str + "</select>";
            str = str + "</div>";


            str = str + "</div>";

            el.innerHTML = str;
            el.style.display = "block";

          }
        }
      } else {
        if (variabili.result != undefined) {
          alert(variabili.result);
        }
        el.style.display = "none";
      }


    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/contributorList.php?idStation=" + idStation, true);
  xmlhttp.send();

}

function setReceiver(idUser, idStation, idReceiver, usersLength, selectId) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var variabili = xmlhttp.responseText.split("|");

      if (variabili[0] == "OK") {
        for (var i = 1; i < usersLength; i++) {
          if (selectId != 'select_' + i) {
            if (document.getElementById('select_' + i).value == idReceiver) {
              document.getElementById('select_' + i).selectedIndex = "0";
            }
          }
        }
      } else {
        alert(i18n[language].receiverError + " " + xmlhttp.responseText);
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/setReceiver.php?idReceiver=" + idReceiver + "&idUser=" + idUser + "&idStation=" + idStation, true);
  xmlhttp.send();


}


function setContributor(status, idUsr, idStation, askToJoin, idCheckbox) {

  if (askToJoin == "") {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var variabili = xmlhttp.responseText.split("|");

        if (variabili[0] == "OK") {
          //alert(variabili[1]);
        } else {
          alert(i18n[language].contributorError + " " + xmlhttp.responseText);
        }
      }
    }
    xmlhttp.open("GET", rootSito + "/ajax/setContributor.php?status=" + status + "&idUser=" + idUsr + "&idStation=" + idStation, true);
    xmlhttp.send();
  } else {

    $("#genericAlertInside").html(i18n[language].cantSetContributor);
    $("#btnText").html(i18n[language].OK);
    $("#btnCancel").hide();
    $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
    $('#genericAlert').modal('show');
    $('#' + idCheckbox).prop("checked", false);

  }

}


function setCelebrity(status, idUsr, idStation) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var variabili = xmlhttp.responseText.split("|");

      if (variabili[0] == "OK") {
        alert(variabili[1]);
      } else {
        alert(i18n[language].celebrityError + " " + xmlhttp.responseText);
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/setCelebrity.php?status=" + status + "&idUser=" + idUsr + "&idStation=" + idStation, true);
  xmlhttp.send();


}

function setJournalist(status, idUser, idStation) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var variabili = xmlhttp.responseText.split("|");

      if (variabili[0] == "OK") {
        alert(variabili[1]);
      } else {
        alert(i18n[language].journalistError + " " + xmlhttp.responseText);
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/setJournalist.php?status=" + status + "&idUser=" + idUser + "&idStation=" + idStation, true);
  xmlhttp.send();


}


function editStation(idStation) {

var published = "0";
      if (document.getElementById('published').checked) {
        published = "1";
      }
  var stationName = document.getElementById('stationName').value;
  var stationDescription = document.getElementById('stationDescription').value;
  var idArgument = document.getElementById('idArgument').value;
  var accentColor = document.getElementById('accentColor').value;
  var poster = document.getElementById('posterHdn').value;
  var bgAdvId = document.getElementById('bgAdvIdHdn').value;
  var bgAdv = document.getElementById('bgAdvHdn').value;
  var bgAdvLinkHdn = document.getElementById('bgAdvLinkHdn').value;
  var bgAdvDateStartHdn = document.getElementById('bgAdvDateStartHdn').value;
  var bgAdvDateEndHdn = document.getElementById('bgAdvDateEndHdn').value;
  var showreel = document.getElementById('showreelHdn').value;
  var showreelAlwaysOn = "0";
      if (document.getElementById('showreel_always_on').checked) {
        showreelAlwaysOn = "1";
      }
   
  var eventLat = document.getElementById('eventLat').value;
  var eventLon = document.getElementById('eventLon').value;
  var eventDateHdn = document.getElementById('eventDateHdn').value;
  var communityManager = document.getElementById('communityManagerHdn').value;
  var streamMaster = document.getElementById('streamMasterHdn').value;
  var logo = document.getElementById('logoHdn').value;

  var numberOfVideoBanners = $('#videoBanners > span').length;
  var arrBanners = document.getElementById('videoBanners').getElementsByTagName('span');
  var banners = [];
  var bannersString = "";
  var getNum;
  var elementId;
  var bannerId;
  var imgBanner;
  var linkBanner;
  var dateStart;
  var dateEnd;
  var numberOfIterations = 12;
  if (numberOfVideoBanners < 12) {
    numberOfIterations = numberOfVideoBanners - 1;
  }


  for (var i = 0; i < numberOfIterations; i++) {

    elementId = arrBanners[i].id;
    getNum = elementId.split("_");
    bannerId = 0;
    if (document.getElementById("bannerId_" + getNum[1] + "Hdn") != null) {
      bannerId = document.getElementById("bannerId_" + getNum[1] + "Hdn").value;
    }
    imgBanner = document.getElementById("bannerImg_" + getNum[1] + "Hdn").value;
    linkBanner = document.getElementById("bannerLink_" + getNum[1] + "Hdn").value;
    dateStart = document.getElementById("bannerDateStart_" + getNum[1] + "Hdn").value;
    dateEnd = document.getElementById("bannerDateEnd_" + getNum[1] + "Hdn").value;
    banners.push([imgBanner, linkBanner, dateStart, dateEnd, getNum[1], bannerId]);

    bannersString += imgBanner + "|" + linkBanner + "|" + dateStart + "|" + dateEnd + "|" + getNum[1] + "|" + bannerId + "§";

  }


  var params = new FormData();
  params.append("published", published);
  params.append("stationName", stationName);
  params.append("stationDescription", stationDescription);
  params.append("idArgument", idArgument);
  params.append("accentColor", accentColor);
  params.append("poster", poster);
  params.append("bgAdvId", bgAdvId);
  params.append("bgAdvImg", bgAdv);
  params.append("bgAdvLink", bgAdvLinkHdn);
  params.append("bgAdvDateStart", bgAdvDateStartHdn);
  params.append("bgAdvDateEnd", bgAdvDateEndHdn);
  params.append("showreel", showreel);
  params.append("showreelAlwaysOn", showreelAlwaysOn);
  params.append("eventLat", eventLat);
  params.append("eventLon", eventLon);
  params.append("eventDate", eventDateHdn);
  params.append("communityManager", communityManager);
  params.append("streamMaster", streamMaster);
  params.append("logo", logo);
  params.append("idStation", idStation);
  params.append("banners", bannersString);


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      //alert(xmlhttp.responseText);
      var variabili = xmlhttp.responseText.split("|")
      if (variabili[0] == "OK") {
          
          if(published == "1" && idArgument == ""){
          $('#genericAlert').modal('show');
          $("#genericAlertInside").html(i18n[language].alertArgument);
          $("#btnCancel").hide();
          $("#btnText").html(i18n[language].OK);
          $("#btnText").attr("onclick", "location.reload();");

             
          }else{
             location.reload();  
          }
        

      } else {
        alert(i18n[language].stationError + " " + xmlhttp.responseText)
      }
    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/editStation.php", true);
  xmlhttp.send(params);


}


function deleteStation(idStation) {


  var stationName = document.getElementById('stationName').value;

  $("#genericAlertInside").html(i18n[language].deleteStationConfirmation1 + " " + stationName + "<br>" + i18n[language].deleteStationConfirmation1);
  $("#btnText").html(i18n[language].deleteStation);
  $("#btnText").attr("onclick", "goAheadWhithDelete('" + idStation + "')");
  $('#genericAlert').modal('show');


}

function goAheadWhithDelete(idStation) {


  var params = new FormData();
  params.append("idStation", idStation);


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


      var variabili = xmlhttp.responseText.split("|")
      if (variabili[0] == "OK") {

        location.reload();

      } else {
        alert(i18n[language].goAheadWhithDeleteError + " " + xmlhttp.responseText)
      }
    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/deleteStation.php", true);
  xmlhttp.send(params);


}


function stationSelection(idStation, idUser) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);

      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.result == "OK") {

        document.getElementById("previewStation").setAttribute("href", document.getElementById("previewStation").href + variabili.slug) ;  
        document.getElementById("stationName").value = variabili.station_name;
        document.getElementById("stationDescription").value = variabili.station_description;
        selectArgument(variabili.id_argument);
        document.getElementById("accentColor").value = variabili.accent_color;
        document.getElementById("poster").style.backgroundImage = "url(/image/hero/" + variabili.poster + ")";
        document.getElementById("posterHdn").value = variabili.poster;
        document.getElementById("logo").style.backgroundImage = "url(/image/channelsLogo/" + variabili.logo + ")";
        document.getElementById("logoHdn").value = variabili.logo;
        document.getElementById("selectedColor").style.backgroundColor = variabili.accent_color;
        document.getElementById("showreel").value = variabili.showreel;
        
        if(variabili.published){  
          document.getElementById("published").checked = "true";
        }  
        
        if(variabili.showreel_always_on){  
          document.getElementById("showreel_always_on").checked = "true";
        }
        document.getElementById("showreelHdn").value = variabili.showreel;
        getUser(variabili.id_community_manager, 'communityManager');
        getUser(variabili.id_stream_master, 'streamMaster');
        document.getElementById("communityManagerHdn").value = variabili.id_community_manager;
        document.getElementById("streamMasterHdn").value = variabili.id_stream_master;

        document.getElementById("eventLat").value = variabili.event_lat;
        document.getElementById("eventLon").value = variabili.event_lon;
        document.getElementById("eventDateHdn").value = variabili.event_date;


        document.getElementById("stationsSettings").style.display = "block";
        document.getElementById('deleteBtn').setAttribute('onclick', 'deleteStation(' + idStation + ');return false')
        document.getElementById('editBtn').setAttribute('onclick', 'editStation(' + idStation + ');return false')

        const arrAdv = variabili.adv;
        const arrBannerBg = variabili.banner_background;
        //Banner Background  
        if (arrBannerBg != null) {
          document.getElementById("bgAdvHdn").value = arrBannerBg['banner_image'];
          document.getElementById("bgAdvIdHdn").value = arrBannerBg['banner_id'];
          document.getElementById("bgAdvLinkHdn").value = arrBannerBg['banner_link'];
          document.getElementById("bgAdvDateStartHdn").value = arrBannerBg['banner_start_date'];
          document.getElementById("bgAdvDateEndHdn").value = arrBannerBg['banner_end_date'];
          document.getElementById("bgAdv").style.backgroundImage = "url(/image/banners/" + arrBannerBg['banner_image'] + ")";

        }
        document.getElementById("bgAdv").setAttribute('onclick', 'editBgAdv();return false');

        //Banner Video   
        var lastPositionValue = 0;
        if (arrAdv != null) {
          for (var i = 0; i < arrAdv.length; i++) {
            if (arrAdv[i]['banner_position'] > lastPositionValue) {
              lastPositionValue = arrAdv[i]['banner_position'];
            }
            var el = document.getElementById('videoBanners');


            el.innerHTML = '<span class="banner-img-settings " onClick="editAdv(' + arrAdv[i]['banner_position'] + ')" id="banner_' + arrAdv[i]['banner_position'] + '"><img id="imgbanner_' + arrAdv[i]['banner_position'] + '" src="/image/banners/' + arrAdv[i]['banner_image'] + '"><input type="hidden" id="bannerId_' + arrAdv[i]['banner_position'] + 'Hdn" value="' + arrAdv[i]['banner_id'] + '"><input type="hidden" id="bannerImg_' + arrAdv[i]['banner_position'] + 'Hdn" value="' + arrAdv[i]['banner_image'] + '"><input type="hidden" id="bannerLink_' + arrAdv[i]['banner_position'] + 'Hdn" value="' + arrAdv[i]['banner_link'] + '"><input type="hidden" id="bannerDateStart_' + arrAdv[i]['banner_position'] + 'Hdn" value="' + arrAdv[i]['banner_start_date'] + '"><input type="hidden" id="bannerDateEnd_' + arrAdv[i]['banner_position'] + 'Hdn" value="' + arrAdv[i]['banner_end_date'] + '"></span>' + el.innerHTML;


          }
        }
        if (lastPositionValue >= 11) {
          $('#addBannerBtn').hide();
        } else {
          document.getElementById('addBannerBtn').setAttribute('onclick', 'addAdv(' + lastPositionValue + ');return false');
        }

        openMap(variabili.event_lat, variabili.event_lon);
        setDate(variabili.event_date);


      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/stationSelection.php?idStation=" + idStation, true);
  xmlhttp.send();
}


function showLive4Station(idStation) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const variabili = JSON.parse(xmlhttp.responseText);
      //alert(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
        //alert(variabili.live_title);
        var liveArray = variabili.data;
        //alert('$("#broadcastSelection").removeAttr("style")');
        $("#broadcastSelection").removeAttr("style");
        $('#liveSelect').html('<option>' + i18n[language].selectBroadcast + '</option>');
        for (var i = 0; i < liveArray.length; i++) {


          $('#liveSelect').append('<option value="' + liveArray[i].id_station_live + '">' + liveArray[i].live_title + '</option>');

        }

      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/live4Station.php?idStation=" + idStation, true);
  xmlhttp.send();


}

function liveSelection(idStationLive) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(rootSito + "/ajax/liveSelection.php?idStationLive=" + idStationLive);
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.result == "OK") {
        //
        $("#stationsSettings").removeAttr("style");
        var idLive = variabili.id_live;

        document.getElementById("liveName").value = variabili.live_title;
        document.getElementById("liveUrl").innerHTML = variabili.live_url;
        document.getElementById("broadcastServer").innerHTML = variabili.broadcast_server;
        document.getElementById("broadcastUrl").innerHTML = variabili.broadcast_url;
        document.getElementById("liveDescription").value = variabili.live_description;
        selectArgument(variabili.live_category);
        document.getElementById("poster").style.backgroundImage = "url(/image/hero/" + variabili.poster_url + ")";
        document.getElementById("posterHdn").value = variabili.poster_url;

        document.getElementById("beginDateHdn").value = variabili.live_begin;
        document.getElementById("endDateHdn").value = variabili.live_end;

        document.getElementById("oldImportance").value = variabili.live_importance;
        setImportance(variabili.id_station, 'edit', variabili.live_importance);

        document.getElementById("stationsSettings").style.display = "block";
        document.getElementById('deleteBtn').setAttribute('onclick', 'deleteLive(' + idLive + ');return false')
        document.getElementById('editBtn').setAttribute('onclick', 'editLive(' + idLive + ', ' + variabili.id_station + ');return false')

        document.getElementById("idStationHdn").value = variabili.id_station;


        setDate(variabili.live_begin, 'beginDate');
        setDate(variabili.live_end, 'endDate');


      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/liveSelection.php?idStationLive=" + idStationLive, true);
  xmlhttp.send();
}


function addLive() {

  if (checkRequired()) {


    var live_title = document.getElementById('liveName').value;
    var live_description = document.getElementById('liveDescription').value;
    //   var live_url = document.getElementById('liveUrl').value;
    var idArgument = document.getElementById('idArgument').value;
    var poster = document.getElementById('posterHdn').value;
    var importance = document.getElementById('importance').value;
    var id_station = document.getElementById('idStation').value;
    var begin_date = document.getElementById('beginDateHdn').value;
    var end_date = document.getElementById('endDateHdn').value;

    var params = new FormData();
    params.append("live_title", live_title);
    params.append("live_description", live_description);
    //   params.append("live_url", live_url);
    params.append("poster", poster);
    params.append("idArgument", idArgument);
    params.append("importance", importance);
    params.append("id_station", id_station);
    params.append("begin_date", begin_date);
    params.append("end_date", end_date);


    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var variabili = xmlhttp.responseText.split("|")
        if (variabili[0] == "OK") {

          location.href = rootSito + "/mytv/" + idUsr + "/dashboard/settings/event";

        } else {


          if (variabili[0] != "KO") {
            $('#genericAlert').modal('show');
            $("#genericAlertInside").html(i18n[language].stationError + " " + xmlhttp.responseText);
            $("#btnCancel").hide();
            $("#btnText").html(i18n[language].OK);
            $("#btnText").attr("onclick", "$('#genericAlert').modal('hide')");
          } else {
            $('#genericAlert').modal('show');
            $("#genericAlertInside").html(i18n[language].stationError + " " + variabili[1]);
            $("#btnCancel").hide();
            $("#btnText").html(i18n[language].OK);
            $("#btnText").attr("onclick", "$('#genericAlert').modal('hide')");
          }


        }
      }
    }
    xmlhttp.open("POST", rootSito + "/ajax/addLive.php", true);
    xmlhttp.send(params);
  }

}


function deleteLive(idLive) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(rootSito + "/ajax/liveSelection.php?idStationLive=" + idStationLive);
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.result == "OK") {
        //

        location.href = rootSito + "/mytv/" + idUsr + "/dashboard/settings/event";

      } else {
        alert(i18n[language].addStationError + variabili[1])
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/deleteLive.php?idLive=" + idLive, true);
  xmlhttp.send();
}


function setImportance(idStation, operation, actualValue) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      const variabili = JSON.parse(xmlhttp.responseText);

      if (variabili.response.result == "OK") {
        //alert(variabili.live_title);
        switch (operation) {
          case "new":
            var newImportance = parseInt(variabili.response.max_importance) + 1;
            break;
          case "edit":
            var newImportance = parseInt(variabili.response.max_importance);
            break;
        }
        $('#importance').html('<option>' + i18n[language].selectBroadcast + '</option>');
        for (var i = 1; i <= newImportance; i++) {

          $('#importance').append('<option value="' + i + '">' + i + '</option>');

        }
        if (operation == "edit") {
          document.getElementById("importance").value = actualValue;
        }

      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/checkImportance.php?idStation=" + idStation, true);
  xmlhttp.send();
}


function editLive(idLive, idStation) {

  if (checkRequired()) {

    var liveTitle = document.getElementById('liveName').value;
    var liveDescription = document.getElementById('liveDescription').value;
    var idArgument = document.getElementById('idArgument').value;
    //   var liveURL = document.getElementById('liveUrl').value;
    var poster = document.getElementById('posterHdn').value;
    var beginDateHdn = document.getElementById('beginDateHdn').value;
    var endDateHdn = document.getElementById('endDateHdn').value;
    var importance = document.getElementById('importance').value;
    var oldImportance = document.getElementById('oldImportance').value;
    var idStation = document.getElementById('idStationHdn').value;


    var params = new FormData();
    params.append("idLive", idLive);
    params.append("liveTitle", liveTitle);
    params.append("liveDescription", liveDescription);
    params.append("idArgument", idArgument);
    //   params.append("liveURL", liveURL);
    params.append("poster", poster);
    params.append("beginDateHdn", beginDateHdn);
    params.append("endDateHdn", endDateHdn);
    params.append("importance", importance);
    params.append("oldImportance", oldImportance);
    params.append("idStation", idStation);


    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        //alert(xmlhttp.responseText);
        var variabili = xmlhttp.responseText.split("|")
        if (variabili[0] == "OK") {


          $('#genericAlert').modal('show');
          $("#genericAlertInside").html(variabili[1]);
          $("#btnCancel").hide();
          $("#btnText").html(i18n[language].OK);
          $("#btnText").attr("onclick", "location.reload();");

        } else {

          if (variabili[0] != "KO") {
            $('#genericAlert').modal('show');
            $("#genericAlertInside").html(i18n[language].stationError + " " + xmlhttp.responseText);
            $("#btnCancel").hide();
            $("#btnText").html(i18n[language].OK);
            $("#btnText").attr("onclick", "$('#genericAlert').modal('hide')");
          } else {
            $('#genericAlert').modal('show');
            $("#genericAlertInside").html(i18n[language].stationError + " " + variabili[1]);
            $("#btnCancel").hide();
            $("#btnText").html(i18n[language].OK);
            $("#btnText").attr("onclick", "$('#genericAlert').modal('hide')");
          }

        }
      }
    }
    xmlhttp.open("POST", rootSito + "/ajax/editLive.php", true);
    xmlhttp.send(params);

  }
}


function chooseLiveToDuplicate(idStation) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(rootSito + "/ajax/liveSelection.php?idStationLive=" + idStationLive);
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
        //
        var HTML = "";
        var liveArray = variabili.data;
        HTML += "<div class=\"contributions\">";
        for (var i = 0; i < liveArray.length; i++) {
          HTML += "<div class=\"contribution\" style=\"max-width: 300px; background-color: unset\">";
          HTML += "<div class=\"item\" style=\"width: 300px\">";
          HTML += "<div class=\"zmovo-video-item-box\">";
          HTML += "<div class=\"zmovo-video-box-inner-channel\">";
          HTML += "<div class=\"v-box-content-right-channel\"  style=\"color: white\">" + liveArray[i].live_title + "</div>";
          HTML += "<div class=\"zmovo-v-box-img-channel gradient\"> <img src=\"/image/pics/" + liveArray[i].poster_url + "\"  style=\"width: 100%\">";
          HTML += "<div class=\"ply-btns-channel\"> <a href=\"#\" onClick=\"duplicateLive('" + liveArray[i].id_station_live + "')\" class=\"ply-btn video-popup\"> ";
          HTML += "<img src=\"/image/duplicate-button.png\"> </a> </div>";
          HTML += "</div>";
          HTML += "<div class=\"zmovo-v-box-content-channel\">";
          HTML += " <div class=\"titoloThumb-channel\"> <a href=\"#\" alt=\" + variabili.live_title + \" title=\" + variabili.live_title + \">" + liveArray[i].live_title + "</a> </div>";
          HTML += "<div class=\"zmovo-v-tag-channel c2\"><" + liveArray[i].live_description + "</div>";
          HTML += "</div>";
          HTML += "</div>";
          HTML += "</div>";
          HTML += "</div>";
          HTML += "</div>";
          HTML += "</div>";
        }
        HTML += "</div>";
        $("#liveToDuplicate").html(HTML);
        var idLive = variabili.id_live;

      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/liveSelection4Duplicate.php?idStation=" + idStation, true);
  xmlhttp.send();


}

function duplicateLive(idStationlive) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(rootSito + "/ajax/liveSelection.php?idStationLive=" + idStationLive);
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.result == "OK") {

        chooseLiveToDuplicate(variabili.id_station);

      } else {

        alert(xmlhttp.responseText);

      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/duplicateLive.php?idStationLive=" + idStationlive, true);
  xmlhttp.send();


}


function editBgAdv() {

  var currentImage = "/image/1920xfree.jpg";
  if (document.getElementById('bgAdvHdn').value != "") {
    var currentImage = "/image/banners/" + document.getElementById('bgAdvHdn').value;
  }
  var bannerId = document.getElementById('bgAdvIdHdn').value;
  var bannerLink = document.getElementById('bgAdvLinkHdn').value;
  var bannerStartDate = document.getElementById('bgAdvDateStartHdn').value;
  var bannerEndDate = document.getElementById('bgAdvDateEndHdn').value;


  var inputHTML = '';
  inputHTML += '<div class="zmovo-login-input-top">';
  inputHTML += '<div class="form-group">';
  inputHTML += '<div class="row">';
  inputHTML += '<div class="col-6"> <img src="' + currentImage + '" id="placeholderAdv" onClick="file_explorer(\'bgAdv\',' + idUsr + ')"><input type="hidden" id="bgAdvImg"></div>';
  inputHTML += '<div class="col-6">';
  inputHTML += `<label for="">${i18n[language].startCampaign}</label><input type="datetime"  class="form-control" id="banner_dateStart" value="${bannerStartDate}"/>`;
  inputHTML += `<label for="">${i18n[language].endCampaign}</label><input type="datetime"  class="form-control" id="banner_dateEnd" value="${bannerEndDate}"/>`;
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '<div class="form-group">';
  inputHTML += '<div class="row">';
  inputHTML += '<div class="col-12">';
  inputHTML += `<label for="">${i18n[language].bannerLink}</label><input type="text"  class="form-control" id="banner_link"  value="${bannerLink}" />`;
  inputHTML += '<input type="hidden" id="bgAdvId"   value="' + bannerId + '"></div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += "<script>$('#banner_dateStart').datepicker({ dateFormat: 'yy-mm-dd' });$('#banner_dateEnd').datepicker({ dateFormat: 'yy-mm-dd' });</script>";

  $('#genericAlertInside').html(inputHTML);
  if (bannerId != "" && !alreadyDone) {
    var el = document.getElementById("btnsContainer");
    el.innerHTML = `<div class="zmovo-login-btns"> <a href="#" onClick="deleteBgAdv(${bannerId})" class="zmovo-login-btn" id="btnDeleteAdv">${i18n[language].deleteBanner}</a> </div>` + el.innerHTML;
    alreadyDone = true;
  }
  $('#btnText').html(i18n[language].OK);
  $('#btnText').attr('onclick', 'setBgAdv();return false');
  $('#genericAlert').modal('show');
}

function setBgAdv() {
  $('#genericAlert').modal('hide');

  document.getElementById('bgAdv').style.backgroundImage = "url(/image/banners/" + document.getElementById('bgAdvImg').value + ")";
  document.getElementById('bgAdvHdn').value = document.getElementById("bgAdvImg").value;
  document.getElementById('bgAdvIdHdn').value = document.getElementById("bgAdvId").value;

  document.getElementById('bgAdvLinkHdn').value = document.getElementById('banner_link').value;;
  document.getElementById('bgAdvDateStartHdn').value = document.getElementById('banner_dateStart').value;
  document.getElementById('bgAdvDateEndHdn').value = document.getElementById('banner_dateEnd').value;

}

function deleteBgAdv(position) {
  if (confirm(i18n[language].confirmDeleteBanner)) {
    document.getElementById("bgAdv").value = 0;
    document.getElementById('bgAdv').style.backgroundImage = "";
    $('#genericAlert').modal('hide');
  } else {
    return false;
  }
}


function addAdv(lastPosition) {
  var newPos = lastPosition + 1;
  var inputHTML = '';
  inputHTML += '<div class="zmovo-login-input-top">';
  inputHTML += '<div class="form-group">';
  inputHTML += '<div class="row">';
  inputHTML += '<div class="col-6"><label for="">' + i18n[language].addAdv1 + '</label><img src="/image/plus_100x100.jpg" id="placeholderAdv" onClick="file_explorer(\'adv\',' + idUsr + ', ' + newPos + ')"><input type="hidden" id="newAdvImg"></div>';
  inputHTML += '<div class="col-6">';
  inputHTML += '<label for="banner_dateStart">' + i18n[language].startCampaign + '</label><input type="datetime"  class="form-control" id="banner_dateStart"/>';
  inputHTML += '<label for="banner_dateEnd">' + i18n[language].endCampaign + '</label><input type="datetime"  class="form-control" id="banner_dateEnd"/>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '<div class="form-group">';
  inputHTML += '<div class="row">';
  inputHTML += '<div class="col-12">';
  inputHTML += '<label for="banner_link">' + i18n[language].bannerLink + '</label><input type="text"  class="form-control" id="banner_link" />';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += "<script>$('#banner_dateStart').datepicker({ dateFormat: 'yy-mm-dd' });$('#banner_dateEnd').datepicker({ dateFormat: 'yy-mm-dd' });</script>";

  $('#genericAlertInside').html(inputHTML);


  if (document.getElementById("btnDelContainer") != null) {
    document.getElementById("btnDelContainer").innerHTML = '<a href="#" onClick="deleteAdv(' + newPos + ')" class="zmovo-login-btn" id="btnDeleteAdv">' + i18n[language].deleteBanner + '</a>';
  }

  $('#btnText').html(i18n[language].OK);
  $('#btnText').attr('onclick', 'setAdv(' + newPos + ');return false');
  $('#genericAlert').modal('show');
  $('#addBannerBtn').attr('onclick', 'addAdv(' + newPos + ');return false');
}

function setAdv(position) {
  $('#genericAlert').modal('hide');
  var img = document.getElementById("newAdvImg").value
  var dateStart = document.getElementById('banner_dateStart').value;
  var dateEnd = document.getElementById('banner_dateEnd').value;
  var bannerLink = document.getElementById('banner_link').value;
  var el = document.getElementById('videoBanners');
  el.innerHTML = '<span class="banner-img-settings " onClick="editAdv(' + position + ')" id="banner_' + position + '"><img id="imgbanner_' + position + '" src="/image/banners/' + img + '"><input type="hidden" id="bannerImg_' + position + 'Hdn" value="' + img + '"><input type="hidden" id="bannerLink_' + position + 'Hdn" value="' + bannerLink + '"><input type="hidden" id="bannerDateStart_' + position + 'Hdn" value="' + dateStart + '"><input type="hidden" id="bannerDateEnd_' + position + 'Hdn" value="' + dateEnd + '"><input type="hidden" id="bannerId_' + position + 'Hdn" value="0"></span>' + el.innerHTML;

  if (position >= 11) {
    $('#addBannerBtn').hide();
  }

}

function editAdv(position) {
  var img = document.getElementById('imgbanner_' + position).src;
  var bannerId = document.getElementById('bannerId_' + position + 'Hdn').value;
  var bannerLink = document.getElementById('bannerLink_' + position + 'Hdn').value;
  var bannerStartDate = document.getElementById('bannerDateStart_' + position + 'Hdn').value;
  var bannerEndDate = document.getElementById('bannerDateEnd_' + position + 'Hdn').value;

  var inputHTML = '';
  inputHTML += '<div class="zmovo-login-input-top">';
  inputHTML += '<div class="form-group">';
  inputHTML += '<div class="row">';
  inputHTML += '<div class="col-6"><label for="placeHolderAdv">' + i18n[language].bannerImage + '</label> <img src="' + img + '" id="placeholderAdv" onClick="file_explorer(\'adv\',' + idUsr + ', ' + position + ')"><input type="hidden" id="newAdvImg" value="' + img + '"></div>';
  inputHTML += `<div class="col-6"><label for="banner_dateStart">${i18n[language].startCampaign}</label> `;
  inputHTML += '<input type="datetime"  class="form-control" id="banner_dateStart" value="' + bannerStartDate + '"/>';
  inputHTML += `<label for="banner_dateEnd">${i18n[language].endCampaign}</label> <input type="datetime"  class="form-control" id="banner_dateEnd" value="'${bannerEndDate}"/>`;
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '<div class="form-group">';
  inputHTML += '<div class="row">';
  inputHTML += `<div class="col-12"><label for="banner_link">${i18n[language].linkUrl}</label> `;
  inputHTML += '<input type="text"  class="form-control" id="banner_link" value="' + bannerLink + '" />';
  inputHTML += '<input type="hidden" id="editBanner_id" value="' + bannerId + '"></div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += '</div>';
  inputHTML += "<script>$('#banner_dateStart').datepicker({ dateFormat: 'yy-mm-dd' });$('#banner_dateEnd').datepicker({ dateFormat: 'yy-mm-dd' });</script>";


  $('#genericAlertInside').html(inputHTML);
  var el = document.getElementById("btnsContainer");
  if (document.getElementById("btnDelContainer") == null) {
    el.innerHTML = '<div class="zmovo-login-btns" id="btnDelContainer"> <a href="#" onClick="deleteAdv(' + position + ')" class="zmovo-login-btn" id="btnDeleteAdv">' + i18n[language].deleteBanner + '</a> </div>' + el.innerHTML;
  } else {
    document.getElementById("btnDelContainer").innerHTML = '<a href="#" onClick="deleteAdv(' + position + ')" class="zmovo-login-btn" id="btnDeleteAdv">' + i18n[language].deleteBanner + '</a>';
  }
  $('#btnText').html(i18n[language].OK);
  $('#btnText').attr('onclick', 'setEditedAdv(' + position + ');return false');
  $('#genericAlert').modal('show');

}

function deleteAdv(position) {
  if (confirm(i18n[language].confirmDeleteAdv)) {
    document.getElementById("bannerImg_" + position + "Hdn").value = 0;
    document.getElementById('banner_' + position).style.display = "none";
    $('#genericAlert').modal('hide');
  } else {
    return false;
  }
}

function setEditedAdv(position) {

  $('#genericAlert').modal('hide');
  var img = document.getElementById("newAdvImg").value
  var bannerId = document.getElementById("editBanner_id").value
  var dateStart = document.getElementById('banner_dateStart').value;
  var dateEnd = document.getElementById('banner_dateEnd').value;
  var bannerLink = document.getElementById('banner_link').value;
  var el = document.getElementById('banner_' + position);
  el.innerHTML = '<img id="imgbanner_' + position + '" src="/image/banners/' + img + '"><input type="hidden" id="bannerImg_' + position + 'Hdn" value="' + img + '"><input type="hidden" id="bannerLink_' + position + 'Hdn" value="' + bannerLink + '"><input type="hidden" id="bannerDateStart_' + position + 'Hdn" value="' + dateStart + '"><input type="hidden" id="bannerDateEnd_' + position + 'Hdn" value="' + dateEnd + '"><input type="hidden" id="bannerId_' + position + 'Hdn" value="' + bannerId + '">';


}

function editProvAdv(position) {
  //here we can edit the provisional banner (not yet inserted in database and without a definitive id)
  var numberOfVideoBanners = $('#videoBanners > span').length;
  var arrBanners = document.getElementById('videoBanners').getElementsByTagName('span');
  var banners = [];
  var getNum;
  var elementId;
  var imgBanner;
  var linkBanner;
  var dateStart;
  var dateEnd;
  var numberOfIterations = 9;
  if (numberOfVideoBanners < 9) {
    numberOfIterations = numberOfVideoBanners - 1;
  }


  for (var i = 0; i < numberOfIterations; i++) {

    elementId = arrBanners[i].id;
    alert(elementId);
    getNum = elementId.split("_");
    imgBanner = document.getElementById("bannerImg_" + getNum[1] + "Hdn").value;
    linkBanner = document.getElementById("bannerLink_" + getNum[1] + "Hdn").value;
    dateStart = document.getElementById("bannerDateStart_" + getNum[1] + "Hdn").value;
    dateEnd = document.getElementById("bannerDateEnd_" + getNum[1] + "Hdn").value;
    banners.push([imgBanner, linkBanner, dateStart, dateEnd]);
  }
  alert(banners);
}


function searchUser(string, elemento, idUsr) {

  var searchVal = document.getElementById(elemento + "Result");
  if (string.length >= 3) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);

        var variabili = xmlhttp.responseText.split("|")
        if (variabili[0] == "OK") {


          var str = "";
          for (var i = 1; i < variabili.length - 1; i++) {
            //alert(variabili[i]);
            var couple;
            couple = variabili[i].split("§");

            str = str + "<li><a href=\"#\" onClick=\"selectUser('" + couple[0] + "','" + couple[1] + "','" + elemento + "');return false\">" + couple[1] + " " + couple[2] + "</a></li>";


          }
          // if (searchVal.style.display == 'none') {
          searchVal.style.display = 'block';
          //} 

          searchVal.innerHTML = "<ul>" + str + "</ul>"


        }
      }
    }
    xmlhttp.open("GET", rootSito + "/ajax/searchUser.php?search=" + string + "&idUsr=" + idUsr, true);
    xmlhttp.send();
  }
}


function selectUser(id, username, elemento) {
  var campo = document.getElementById(elemento);
  var campoVal = document.getElementById(elemento + "Hdn");
  var searchVal = document.getElementById(elemento + "Result");

  campo.value = username;
  campoVal.value = id;
  searchVal.style.display = 'none';

}


var expires;

function ajaxLogin(email, password) {

  var pwd = CryptoJS.MD5(password).toString();
  var errore = '';
  //alert('email '+email+' password '+ pwd);


  if (password == '') {
    errore = i18n[language].passwordEmpty;
  }

  if (email == '') {
    errore = 'Email is a mandatory field';
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

    errore = i18n[language].wrongEmail;
  }

  if (errore == '') {


    //loading balls
    document.getElementById('logoContainer').innerHTML = "<div class=\"loading-preloader\"><element-login id=\"preloader\" class=\"container-preloader\"><element-login class=\"orange\"></element-login><element-login class=\"green\"></element-login><element-login class=\"bordeaux\"></element-login><element-login class=\"yellow\"></element-login></element-login></div>";


    var params = new FormData();
    params.append("pwd", pwd);
    params.append("email", email);
    params.append("lat", lat);
    params.append("lon", lon);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);

        var utenti = xmlhttp.responseText.split("|");
        if (utenti[0] == "OK") {

          if (!document.getElementById("remember").checked) {
            expires = 1;
          } else {
            expires = 30;
          }
          //
          //1:iduser, 2: email,  3: grade, 4: user name, 5: image,6:updated(true or false), 7: allow Position 8: diskspace 9: is_owner 10:is_CommMgr 11:is_streamMaster
          if (utenti[7] == "1") {

            getLocation(utenti[1], 'login');
            document.getElementById('myAengie').innerHTML = i18n[language].geolocation;

          } else {

            setCookie('username', utenti[1] + "|" + utenti[2] + "|" + utenti[3] + "|" + utenti[4] + "|" + utenti[5] + "|" + utenti[7] + "|" + utenti[8] + "|" + utenti[9] + "|" + utenti[10] + "|" + utenti[11], expires);


            $('#loginPanel').modal('hide');
            document.location.href = rootSito;
          }
        } else {
          //uncorrect credentials
          document.getElementById('messaggio').innerHTML = i18n[language].wrongUsernamePassword;

        }
      }
    }
    xmlhttp.open("POST", rootSito + "/ajax/login.php", true);
    xmlhttp.send(params);


  } else {

    document.getElementById('messaggio').innerHTML = errore;

  }

}

function showResetPassword() {

  $('#loginPanel').modal('hide');
  $('#forgot').modal('show');

}

function resetPassword() {

  var errore = '';
  var email = document.getElementById('emailForgot').value;
  if (email == "") {
    errore = i18n[language].insertEmail;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

    errore = i18n[language].insertValidEmail;
  }

  if (errore == '') {


    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);

        var msg = xmlhttp.responseText.split("|");
        if (msg[0] == "OK") {

          document.getElementById('messaggioForgot').innerHTML = msg[1];


        } else {
          document.getElementById('messaggioForgot').innerHTML = msg[1];
        }
      }
    }
    xmlhttp.open("GET", rootSito + "/ajax/resetPassword.php?email=" + email, true);
    xmlhttp.send();


  } else {

    document.getElementById('messaggio').innerHTML = errore;

  }


}


function updatePosition(idUser, from) {
  //alert("updatePosition.php?idUser=" + idUser + "&lat=" + lat + "&lon=" + lon);
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);

      var utenti = xmlhttp.responseText.split("|");
      if (utenti[0] == "OK") {
        //1:iduser, 2: email,  3: grade, 4: user name, 5: image,6:updated(true or false), 7: allow Position 8:disk space, 9 :isStationOwner, 10: is_community_manager, 11: is_streamManager, 12:last_lat, 13:last_lon 
        setCookie('username', utenti[1] + "|" + utenti[2] + "|" + utenti[3] + "|" + utenti[4] + "|" + utenti[5] + "|" + utenti[7] + "|" + utenti[8] + "|" + utenti[9] + "|" + utenti[10] + "|" + utenti[11] + "|" + utenti[12] + "|" + utenti[13], expires);

        switch (from) {
          case "login":
            $('#loginPanel').modal('hide');
            document.location.href = rootSito;
            break;
        }


      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/updatePosition.php?idUser=" + idUser + "&lat=" + lat + "&lon=" + lon, true);
  xmlhttp.send();

}

function loadStationUsers(idStation, idUser, idCommMan, idStreamMast) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);

      var variabili = xmlhttp.responseText.split("|")
      if (variabili[0] == "OK") {
        //I get the list of users, the array is composed by a couple id_users§username
        var selComm = document.getElementById("communityManager");
        var selStream = document.getElementById("streamMaster");
        var index = 1;

        for (var i = 1; i < variabili.length - 1; i++) {
          var couple;
          couple = variabili[i].split("§");
          var option = document.createElement("option");

          //0:id_user 1: user_name
          option.text = couple[1];
          option.value = couple[0];
          selComm.add(option);
          if (idCommMan == couple[0]) {

            selComm.options[index].selected = true;

          }

          var option2 = document.createElement("option");
          option2.text = couple[1];
          option2.value = couple[0];
          selStream.add(option2);
          if (idStreamMast == couple[0]) {

            selStream.options[index].selected = true;

          }
          index++;
        }


      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/loadStationUsers.php?idStation=" + idStation + "&idUser=" + idUser, true);
  xmlhttp.send();
}


function getUser(idUser, element) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


      if (xmlhttp.responseText != "KO") {
        document.getElementById(element).value = xmlhttp.responseText;


      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/selectUser.php?idUser=" + idUser, true);
  xmlhttp.send();


}


function updateRead(user) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);


      if (xmlhttp.responseText == "OK") {

        document.getElementById("num").innerHTML = "0";
      }
    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/updateRead.php?idUser=" + user, true);
  xmlhttp.send();
}


function login() {
  for (var i = 0; i < utenti.length; i++) {
    if (document.getElementById('email').value == utenti[i][1]) {
      if (document.getElementById('pwd').value == utenti[i][2]) {
        var expires;
        if (!document.getElementById("remember").checked) {

          expires = 1;

        } else {

          expires = 30;
        }
        setCookie('username', utenti[i][0] + "|" + document.getElementById('email').value + "|" + utenti[i][3] + "|" + utenti[i][4] + "|" + utenti[i][5], expires);
        document.getElementById('userIcon').setAttribute('src', '/image/icons/1x/Actions/account_logged.png');

        $('#loginPanel').modal('hide');
        location.reload();

      } else {
        document.getElementById("messaggio").innerHTML = i18n[language].wrongPassword;
      }
    } else {
      document.getElementById("messaggio").innerHTML = i18n[language].wrongUsername;
    }
  }
}


//gestisco il caricamento dei contenuti video    
function playVideo(video) {
  var player = videojs('mainVideo');
  player.src({
    type: 'video/mp4',
    src: '/video/' + video,
    fluid: true
  });
  player.ready(function () {
    player.play();
  });
}

function stopVideoFromContents() {
  $('#modalVideo').modal('toggle');
  var player = videojs('mainVideo');
  player.pause();
}

function playVideoFromContents(video) {
  //$('#modalVideo').show();
  var player = videojs('mainVideo');
  player.src({
    type: 'video/mp4',
    src: '/video/' + video,
    fluid: true
  });
  player.ready(function () {
    player.play();
  });
}

function playVideoLive(url) {
  var player = videojs('mainVideo');
  player.src({
    type: "application/x-mpegURL",
    src: url
  });
  player.play();
}


//gestione Like

function likeIt(elementId, idComment, like) {


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      //alert(xmlhttp.responseText);
      var variabili = xmlhttp.responseText.split("|");
      if (variabili[0] == "OK") {
        if (variabili[1] > 0) {
          var quanti = parseInt(document.getElementById(elementId).innerHTML);
          quanti++;
          document.getElementById(elementId).innerHTML = quanti;
        } else {
          alert(i18n[language].alreadyVoted);
        }

      }

    }

  }
  xmlhttp.open("GET", rootSito + "/ajax/like.php?like=" + like + "&idComment=" + idComment + '&idUser=' + idUsr, true);
  xmlhttp.send();


}


function likeItVideo(elementId, idVideo, like, accent) {

  var splittedId = elementId.split("_");
  var i = splittedId[1];


  if (idUsr != 0) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var variabili = xmlhttp.responseText.split("|");
        if (variabili[0] == "OK") {
          var quanti = parseInt(document.getElementById(elementId).innerHTML);

          if (like) {
            quanti++;
            document.getElementById("icon_" + i).style.color = accent;
            document.getElementById("reaction_" + i).setAttribute("onclick", "likeItVideo('" + elementId + "', '" + idVideo + "',0, '" + accent + "')");
            document.getElementById(elementId).innerHTML = quanti;
          } else {
            quanti--;
            document.getElementById("icon_" + i).style.color = "grey";
            document.getElementById("reaction_" + i).setAttribute("onclick", "likeItVideo('" + elementId + "', '" + idVideo + "',1, '" + accent + "')");
            document.getElementById(elementId).innerHTML = quanti;
          }

        }

      }

    }
    xmlhttp.open("GET", rootSito + "/ajax/likeVideo.php?like=" + like + "&idVideo=" + idVideo + '&idUser=' + idUsr, true);
    xmlhttp.send();

  } else {

    ////// unregistered user 
    $('#genericAlert').modal('show');
    $("#genericAlertInside").html(i18n[language].registrationNeedAlert);
    $("#btnText").html(i18n[language].OK);
    $("#btnCancel").hide();
    $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");


  }
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function followChannel(slug, utente, accent) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


      var variabili = xmlhttp.responseText.split("|")

      $('#genericAlert').modal('show');
      $("#genericAlertInside").html(variabili[1]);
      $("#btnText").html(i18n[language].OK);
      $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      if (variabili[0] == "OK") {

        // get the list of stations already joined and stored in the user's cookies
        var channelAlreadyFollowed = getCookie('channelFollowed');
        //add this station to the list
        setCookie('channelFollowed', channelAlreadyFollowed + "," + slug + "|" + utente, 3000);
        //location.reload();
        if (typeof accent != "undefined") {
          //we are in a station
          $('#linkFollow').attr("onclick", "unfollow('" + slug + "', '" + utente + "', '" + accent + "'); return false");
          $('#linkFollow').attr("style", "color:#808080");
          $('#strFollow').html(i18n[language].FOLLOWED);
          $('#pathFollow').attr("fill", "#808080");
        } else {
          //we are in the stations list
          $('#row_follow_' + slug).removeClass("rowInfoDown-orange");
          $('#row_join_' + slug).addClass("rowInfoDown-first");
          $('#row_follow_' + slug).html(`<img src="/image/icons/1x/Actions/followed.png">${i18n[language].followed}`);
          $('#row_follow_' + slug).attr("onclick", "unfollow('" + slug + "', '" + utente + "'); return false");
        }
      }

    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/followStation.php?slug=" + slug + "&idUser=" + utente, true);
  xmlhttp.send();
}


function joinChannel(slug, utente, accent) {

  //send message to channel manager  
  //setCookie('channelFollowed', channelAlreadyFollowed + "," + canale + "|" + utente, 3000);
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


      var already = false;
      var channelAlreadyJoined = getCookie('channelJoined');
      setCookie('channelJoined', channelAlreadyJoined + "," + slug + "|" + utente, 3000);


      var channelAlreadyFollowed = getCookie('channelFollowed');
      var arrChannelsFollowed = channelAlreadyFollowed.split(",");
      for (var i = 0; i < arrChannelsFollowed.length; i++) {
        var channels = arrChannelsFollowed[i].split("|");
        if (channels[0] == slug) {
          already = true;
        }
      }


      var variabili = xmlhttp.responseText.split("|")
      //alert(xmlhttp.responseText);
      $('#genericAlert').modal('show');
      $("#genericAlertInside").html(variabili[1]);
      $("#btnText").html(i18n[language].OK);
      $("#btnCancel").hide();
      $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      if (variabili[0] == "OK") {
        // get the list of stations already joined and stored in the user's cookies


        //we are in the stations list
        $('#row_follow_' + slug).removeClass("rowInfoDown-orange");
        $('#row_follow_' + slug).html("<img src=\"/image/icons/1x/Actions/followed.png\">followed");
        $('#row_watch_' + slug).addClass("rowInfoDown-first");
        $('#row_join_' + slug).removeClass("rowInfoDown-orange");
        $('#row_join_' + slug).html("<img src=\"/image/icons/1x/Actions/joined.png\">joined");
        $('#row_join_' + slug).attr("onclick", "return false");


        //add this station to the list
        if (!already) {
          setCookie('channelFollowed', channelAlreadyFollowed + "," + slug + "|" + utente, 3000);
        }

        //we are in a station
        if (typeof accent != "undefined") {
          $('#linkJoin').attr("onclick", "unjoin('" + slug + "', '" + utente + "', '" + accent + "'); return false");
          $('#linkJoin').attr("style", "color:#808080");
          $('#strJoin').html(i18n[language].JOINED);
          $('#pathJoin').attr("fill", "#808080");
        } else {
          //we are in the station list
          $('#row_join_' + slug).removeClass("rowInfoDown-orange");
          $('#row_watch_' + slug).addClass("rowInfoDown-first");
          $('#row_join_' + slug).html(`<img src=\"/image/icons/1x/Actions/joined.png\">${i18n[language].joined}`);
          $('#row_join_' + slug).attr("onclick", "unjoin('" + slug + "', '" + utente + "'); return false");
        }

      }

    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/joinStation.php?slug=" + slug + "&idUser=" + utente, true);
  xmlhttp.send();

  //location.reload();
}

function unjoin(slug, utente, accent) {

  //alert(rootSito + "/ajax/unjoinStation.php?slug=" + slug + "&idUser=" + utente);
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      //alert(xmlhttp.responseText);
      var variabili = xmlhttp.responseText.split("|")

      $('#genericAlert').modal('show');
      $("#genericAlertInside").html(variabili[1]);
      $("#btnText").html(i18n[language].OK);
      $("#btnCancel").hide();
      $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      if (variabili[0] == "OK") {
        // get the list of stations already joined and stored in the user's cookies
        var channelAlreadyJoined = getCookie('channelJoined').split(",");
        var newCookieValue = "";
        for (var i = 0; i < channelAlreadyJoined.length; i++) {
          var channels = channelAlreadyJoined[i].split("|");
          if (channels[0] != slug) {
            if (i == 0) {
              newCookieValue = channels[0] + "|" + channels[1];
            } else {
              newCookieValue = newCookieValue + "," + channels[0] + "|" + channels[1];
            }
          }
        }
        setCookie('channelJoined', newCookieValue, 3000);

        if (typeof accent != "undefined") {
          //we are in a station
          $('#linkJoin').attr("onclick", "joinChannel('" + slug + "', '" + utente + "', '" + accent + "'); return false");
          $('#linkJoin').attr("style", "color:" + accent + "");
          $('#strJoin').html(i18n[language].JOIN);
          $('#pathJoin').attr("fill", accent);
        } else {
          //we are in the station list
          $('#row_join_' + slug).addClass("rowInfoDown-orange");
          $('#row_watch_' + slug).removeClass("rowInfoDown-first");
          $('#row_join_' + slug).html(`<img src="/image/icons/1x/Actions/join.png">${i18n[language].join}`);
          $('#row_join_' + slug).attr("onclick", "joinChannel('" + slug + "', '" + utente + "'); return false");

        }
      }

    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/unjoinStation.php?slug=" + slug + "&idUser=" + utente, true);
  xmlhttp.send();
}


function unfollow(slug, utente, accent) {
  if (confirm(i18n[language].stationUnfollow)) {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {


        var variabili = xmlhttp.responseText.split("|")

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili[1]);
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
        if (variabili[0] == "OK") {
          // get the list of stations already joined and stored in the user's cookies
          var channelAlreadyFollowed = getCookie('channelFollowed').split(",");
          var newCookieValue = "";
          for (var i = 0; i < channelAlreadyFollowed.length; i++) {
            var channels = channelAlreadyFollowed[i].split("|");
            if (channels[0] != slug) {
              if (i == 0) {
                newCookieValue = channels[0] + "|" + channels[1];
              } else {
                newCookieValue = newCookieValue + "," + channels[0] + "|" + channels[1];
              }
            }
          }
          setCookie('channelFollowed', newCookieValue, 3000);
          //location.reload();
          if (typeof accent != "undefined") {
            //we are in a station
            $('#linkFollow').attr("onclick", "followChannel('" + slug + "', '" + utente + "', '" + accent + "'); return false");
            $('#linkFollow').attr("style", "color:" + accent + "");
            $('#strFollow').html(i18n[language].FOLLOW);
            $('#pathFollow').attr("fill", accent);
          } else {
            //we are in the stations list
            $('#row_follow_' + slug).addClass("rowInfoDown-orange");
            $('#row_join_' + slug).removeClass("rowInfoDown-first");
            $('#row_follow_' + slug).html(`<img src="/image/icons/1x/Actions/follow.png">${i18n[language].follow}`);
            $('#row_follow_' + slug).attr("onclick", "followChannel('" + slug + "', '" + utente + "'); return false");
          }
        }

      }
    }
    xmlhttp.open("GET", rootSito + "/ajax/unfollowStation.php?slug=" + slug + "&idUser=" + utente, true);
    xmlhttp.send();


  } else {
    return false;
  }


}


function logout() {
  setCookie('username', '', -1);
  document.getElementById('userIcon').setAttribute('src', '/image/icons/1x/Actions/account_unlogged.png');
  $('#loginPanel').modal('hide');
  location.href = rootSito;
}


var loggedUsername = getCookie("username");
//alert(window.location.href);
if (loggedUsername != '' && window.location.href != "https://www.aengietv.com/forgot" && window.location.href != "https://www.aengietv.com/register" && window.location.href != "https://www.aengietv.com/login" && window.location.href != "https://www.aengietv.com/confirm") {
  document.getElementById('userIcon').setAttribute('src', '/image/icons/1x/Actions/account_logged.png');
}


function alertDeleteMessage(idMessage, row, group, idUser) {
  $('#genericAlert').modal('show');
  $("#genericAlertInside").html(i18n[language].confirmDeleteMessage);
  $("#btnText").html(i18n[language].YES);
  if (group == '0') {
    $("#btnText").attr("onclick", "deleteMessage('" + idMessage + "', '" + row + "');");
  } else {
    $("#btnText").attr("onclick", "deleteGroupMessage('" + idMessage + "', '" + row + "', " + idUser + ");");
  }

}

function deleteMessage(idMessage, row) {
  $('#genericAlert').modal('hide');
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      //alert(xmlhttp.responseText);
      var variabili = xmlhttp.responseText.split("|")

      $("#btnCancel").hide();
      $('#genericAlert').modal('show');
      $("#genericAlertInside").html(variabili[1]);
      $("#btnText").html(i18n[language].OK);
      $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      if (variabili[0] == "OK") {


        location.reload();
        // $('#messaggio_' + row).hide();

      }

    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/deleteMessage.php?idMessage=" + idMessage, true);
  xmlhttp.send();
}


function deleteGroupMessage(idMessage, row, idUser) {
  $('#genericAlert').modal('hide');
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      //alert(xmlhttp.responseText);
      var variabili = xmlhttp.responseText.split("|")

      $("#btnCancel").hide();
      $('#genericAlert').modal('show');
      $("#genericAlertInside").html(variabili[1]);
      $("#btnText").html(i18n[language].OK);
      $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      if (variabili[0] == "OK") {


        location.reload();
        // $('#messaggio_' + row).hide();

      }

    }
  }
  xmlhttp.open("GET", rootSito + "/ajax/deleteGroupMessage.php?idMessage=" + idMessage + "&idUser=" + idUser, true);
  xmlhttp.send();
}


function newMessage(idUser) {

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      $("#btnCancel").hide();
      $("#btnText").hide();
      $('#genericAlert').modal('show');
      $("#genericAlertInside").html(xmlhttp.responseText);


    }

  }

  xmlhttp.open("GET", rootSito + "/ajax/messageForm.php?idUser=" + idUser, true);
  xmlhttp.send();

}


function sendMassMessage() {
  var idUser = document.getElementById('idUser').value;
  var idStation = document.getElementById('station').value;
  var subject = document.getElementById('messageSubject').value;
  var message = document.getElementById('message').value;

  var params = new FormData();
  params.append("idUser", idUser);
  params.append("idStation", idStation);
  params.append("subject", subject);
  params.append("message", message);


  var xmlhttp = new XMLHttpRequest();
  //alert("idStation: " + idStation + "\nSubject: " + subject + "\nMessage:\n" + message);

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");

      $("#btnCancel").hide();
      $("#btnText").html(i18n[language].OK);
      $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      $("#btnText").show();
      $("#genericAlertInside").html(msg[1]);
      $('#genericAlert').modal('show');

    }

  }

  xmlhttp.open("POST", rootSito + "/ajax/sendMassMessage.php", true);
  xmlhttp.send(params);


}


function espandi(id, idMsg, idUsr) {
  for (var i = 0; i < totaleMessaggi; i++) {
    document.getElementById("messaggio_" + i).style.height = "70px";
  }
  document.getElementById("messaggio_" + id).style.height = "unset";
  document.getElementById("titoloMsg_" + id).classList.remove("boldTitle");
  document.getElementById("msg_" + id).classList.remove("boldMsg");


  var unread = parseInt(document.getElementById("unreadNum").innerHTML);
  if (unread > 0) {
    document.getElementById("unreadNum").innerHTML = unread - 1;
    document.getElementById("num").innerHTML = unread - 1;


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);
        var msg = xmlhttp.responseText.split("|");

        /*$("#btnCancel").hide();
        $("#btnText").html("OK");
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(msg[1]);
*/

      }

    }

    xmlhttp.open("GET", rootSito + "/ajax/markAsReadMessage.php?idMsg=" + idMsg + "&idUser=" + idUsr, true);
    xmlhttp.send();


  }
}

function chooseCommunity(id) {
  location.href = rootSito + '/mytv/community/' + id;
}


function showInfo(about) {
  var msg
  switch (about) {

          
     case 'stationPublished':
      msg = i18n[language].stationPublished;
      break;      
    case 'event_location':
      msg = i18n[language].infoEventLocation;
      break;
    case 'poster':
      msg = i18n[language].infoPoster;
      break;
    case 'advback':
      msg = i18n[language].infoAdvBack1 + ` <a href="/downloads/banner_under.zip">${i18n[language].infoAdvBack2}</a>`;
      break;
    case 'adv':
      msg = i18n[language].infoAdv1 + ` <a href="/downloads/banner.zip">${i18n[language].infoAdv2}</a>` + i18n[language].infoAdv3;
      break;
     case 'showreel_always_on':
      msg = i18n[language].infoShowreelAlwaysOn;
      break;
  }

  $("#btnCancel").hide();
  $("#btnText").html(i18n[language].OK);
  $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
  $("#btnText").show();
  $("#genericAlertInside").html(msg);
  $('#genericAlert').modal('show');

}


//////// COMMENTS


function addComment(idUser, idStation, comment, e) {

  if (e.keyCode == 13) {

    var params = new FormData();
    params.append("idUser", idUser);
    params.append("idStation", idStation);
    params.append("comment", comment);

    //alert("coment: "+comment+"\n idUser: "+idUser);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);
        var msg = xmlhttp.responseText.split("|");
        if (msg[0] == "OK") {
          //1:username, 2:userimage,3: time
          var messaggio = '<div class="chat-item"> <img src="/image/picsUsr/' + msg[2] + '" /> <span class="chat-username">' + msg[1] + '</span> <span class="chat-time">' + msg[3] + '</span>';
          messaggio += '<div class="chat-comment">' + comment + '</div>';
          messaggio += '<div class="chat-footer">';
          messaggio += '<a href="#"  onclick="return false;" style="color: <?php echo $accent ?>"><i onClick="likeIt(\'like_last\')" class="far fa-thumbs-up margin-icon15"></i></a> <span  id="like_last"  class="c2">0</span>';
          messaggio += '<a href="#"  onclick="return false;" style="color: <?php echo $accent ?>"><i onClick="likeIt(\'unlike_last\')" class="far fa-thumbs-down margin-icon15"></i></a> <span  id="unlike_last" class="c2">0</span></div></div>';

          document.getElementById('contenitoreChat').innerHTML = messaggio + document.getElementById('contenitoreChat').innerHTML;

        }
        $('#comment').val("");

      }

    }

    xmlhttp.open("POST", rootSito + "/ajax/addComment.php", true);
    xmlhttp.send(params);


  }

}

function groupAction(action, idUsr) {

  //0 = delete; 1 = read
  switch (action) {
    case "0":
      var arrId = new Array();
      var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');
      for (var checkbox of markedCheckbox) {

        var idC = checkbox.id.toString();
        var idCheck = idC.replace("check_", "");
        arrId.push(idCheck);


      }
      var params = new FormData();
      params.append("idUser", idUsr);
      params.append("idMessages", arrId);

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          //alert(xmlhttp.responseText);
          var msg = xmlhttp.responseText.split("|");
          if (msg[0] == "OK") {

            $("#btnCancel").hide();
            $("#btnText").html(i18n[language].OK);
            $("#btnText").attr("onclick", "location.reload();");
            $('#genericAlert').modal('show');
            $("#genericAlertInside").html(msg[1]);


            /* $('#genericAlert').modal('hide');*/


          }


        }

      }

      xmlhttp.open("POST", rootSito + "/ajax/deleteMoreMessages.php", true);
      xmlhttp.send(params);


      break;

    case 1:
      /// must implement the read message function
      break;

  }
}

function sendSupportRequest(idUser) {

  subject = document.getElementById('subject').value;
  message = document.getElementById('message').value;
  var params = new FormData();
  params.append("idUser", idUser);
  params.append("subject", subject);
  params.append("message", message);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      var msg = xmlhttp.responseText.split("|");
      if (msg[0] == "OK") {

        $("#subject").val($("#subject option:first").val());
        $("#message").val("");
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide')");
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(msg[1]);

      }


    }

  }

  xmlhttp.open("POST", rootSito + "/ajax/sendSupportRequest.php", true);
  xmlhttp.send(params);

}

function getChannelChat(idStation, color,checkLives = false, checkUrl) {

  setInterval(function () {
    //alert(idStation + color);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //alert(xmlhttp.responseText);
        document.getElementById('chatContainer').innerHTML = xmlhttp.responseText;
          /*if(checkLives){
            check4Live(checkUrl);  
          }*/
          
          
      }


    }

    xmlhttp.open("GET", rootSito + "/ajax/getChannelChat.php?idStation=" + idStation + "&color=" + color, true);
    xmlhttp.send();


  }, 30000); //30 seconds
}


function check4Live(slug, isLive){
    
    
    
setInterval(function () {
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          if (isLive == "0") {
            if (xmlhttp.responseText == "true") {

              $("#btnCancel").hide();
              $("#btnText").html(i18n[language].OK);
              $("#btnText").attr("onclick", "location.reload();");
              $("#genericAlertInside").html(i18n[language].newLive);
              $('#genericAlert').modal('show');

            }
          }else{
              
              
          if (xmlhttp.responseText == "false") {

              $("#btnCancel").hide();
              $("#btnText").html(i18n[language].OK);
              $("#btnText").attr("onclick", "location.reload();");
              $("#genericAlertInside").html(i18n[language].endLive);
              $('#genericAlert').modal('show');

            }   
          }
          }
    }

    xmlhttp.open("GET", rootSito + "/ajax/check4Live.php?slug=" + slug, true);
    xmlhttp.send();
    
    
  }, 5000); //5 seconds
}



function showPass(element) {
  var x = document.getElementById(element);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  return false;
}

/***************************** PLAYLIST *********************************/




function selectStationPlaylist(idStation) {

document.getElementById("idStationPlaylistEdit").value = idStation;
  var params = new FormData();
  params.append("idStation", idStation);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
        var HTMLStr = "";
        var strStatus;
        for (var i = 0; i < variabili.data.length; i++) {


          switch (variabili.data[i].playlist_visibility) {
            case 0:
              strStatus = i18n[language].preparing;
              break;
            case 1:
              strStatus = i18n[language].public;
              break;
            case 2:
              strStatus = i18n[language].private;
              break;
            default:
              strStatus = i18n[language].preparing;
              break;
          }

          HTMLStr += '<div class="row playlistFilter" id="playlist_' + variabili.data[i].id_playlist + '">';
          HTMLStr += '<div class="col-1 centerText"><a href="#"><i class="fa fa-bars"></i></a></div>';
          HTMLStr += '<div class="col-2 centerText"><img id="img_' + variabili.data[i].id_playlist + '" src="' + variabili.data[i].playlist_thumb + '" style="width:160px; height:90px"></div>';
          HTMLStr += '<div class="col-2 centerText">' + variabili.data[i].playlist_name + '</div>';
          HTMLStr += '<div class="col-2 centerText">' + strStatus + '</div>';
          HTMLStr += '<div class="col-2 centerText">' + variabili.data[i].playlist_last_update + '</div>';
          HTMLStr += '<div class="col-1 centerText" id="counterVideo_' + variabili.data[i].id_playlist + '">' + variabili.data[i].playlist_video_number + '</div>';
          HTMLStr += '<div class="col-2 centerText" style="text-align: right">';
          HTMLStr += '<a href="#" onClick="previewPlaylist(\'' + variabili.data[i].id_playlist + '\')" style="margin-right: 20px;"><i class="fa fa-play"></i></a>';
          HTMLStr += '<a href="#" onClick="openEditPlaylistPanel(\'' + variabili.data[i].id_playlist + "','" + variabili.data[i].playlist_name + "','" + variabili.data[i].playlist_visibility + "','" + idStation + '\')" style="margin-right: 20px;"><i class="fa fa-edit"></i></a>';
          HTMLStr += '<a href="#" onClick="alertDeletePlaylist(\'' + variabili.data[i].id_playlist + "','" + variabili.data[i].playlist_name + '\')"><i class="fa fa-trash"  aria-hidden="true"></i></a>';
          HTMLStr += '</div>';
          HTMLStr += '</div>';

        }

        document.getElementById("playlistRows").innerHTML = HTMLStr;
        document.getElementById("addPlaylistBtn").style.display = "block";
        document.getElementById("playlistIdStation").value = idStation

      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili.description);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/selectStationPlaylist.php", true);
  xmlhttp.send(params);


}



function checkTitle(str, element) {

  if (document.getElementById("playlistIdStation" + element).value != "0" && str.length >= 3) {
    document.getElementById("createPlaylistBtn" + element).classList.remove("disabled");
  } else {
    document.getElementById("createPlaylistBtn" + element).classList.add("disabled");
  }

  if (str.length <= 100) {
    document.getElementById("counterTitleLenght" + element).innerHTML = str.length + "/100";
  } else {
    document.getElementById("playlistName" + element).value = str.substr(0, 100);
  }
}


function createPlaylist() {

  var playlistName, playlistVisibility, playlistIdStation;
  playlistName = document.getElementById("playlistName").value;
  playlistVisibility = document.getElementById("playlistVisibility").value;
  playlistIdStation = document.getElementById("playlistIdStation").value;


  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  var status = i18n[language].preparing;
  var HTML = "";
    
    
    
  var params = new FormData();
  params.append("playlistName", playlistName);
  params.append("playlistVisibility", playlistVisibility);
  params.append("playlistIdStation", playlistIdStation);
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
      if (msg[0] != "KO") {
          
          
         
          HTML = '<div class="row playlistFilter" id="playlist_'+msg[1]+'"><div class="col-1 centerText"><a href="#"><i class="fa fa-bars"></i></a></div><div class="col-2 centerText"><img id="img_'+msg[1]+'" src="/image/no-image.jpg" style="width:160px; height:90px"></div><div class="col-2 centerText">'+playlistName+'</div><div class="col-2 centerText">'+status+'</div><div class="col-2 centerText">'+dateTime+'</div><div class="col-1 centerText" id="counterVideo_'+msg[1]+'">0</div><div class="col-2 centerText" style="text-align: right"><a href="#" onclick="playPlaylist('+msg[1]+')" style="margin-right: 20px;"><i class="fa fa-play"></i></a><a href="#" onclick="openEditPlaylistPanel('+msg[1]+',\''+playlistName+'\',\''+status+'\',\''+playlistIdStation+'\')" style="margin-right: 20px;"><i class="fa fa-edit"></i></a><a href="#" onclick="alertDeletePlaylist('+msg[1]+',\''+playlistName+'\')"><i class="fa fa-trash" aria-hidden="true"></i></a></div></div>';
          $('#playlistRows').append(HTML);
          document.getElementById('playlistAdd').style.display = 'none';
          
        // alert(xmlhttp.responseText);
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(i18n[language].playlistCreated);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");


      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(msg[1]);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');location.reload();");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/addPlaylist.php", true);
  xmlhttp.send(params);


}




function previewPlaylist(idPlaylist){
     var params = new FormData();
  params.append("idPlaylist", idPlaylist);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
    
     $('#modalVideo').show();

       var player = videojs("mainVideo");
       var video_parent = document.getElementById("video_parent");
          
        player.dispose();
        var video = document.createElement('video');
	    video.id = "mainVideo";
          video.className="video-js vjs-default-skin vjs-16-9";
	video.preload="auto";
	video.controls="true";
	video.style.width="100%";
	video.style.height="100%";
	video.setAttribute("playsinline","true");
	// Append new video element to parent element
	video_parent.appendChild(video);
	// Initialize video.js and Nuevo plugin
	player = videojs("mainVideo");
	
          
	   player.nuevo({ // plugin options here 
	   playlistUI: true, // set to disable playlist UI completely
	   playlistShow: true, // set to hide playlist UI on start
	   playlistAutoHide: false, // Disable playlist UI autohide on video play event
	   playlistNavigation: false , // set to show playlist navigation arrows
	   playlistRepeat: false, // set to repeat playlist playback,
       contextMenu: false    
	});
          
         
          
     let videos4Playlist = [];
     for (var i = 0; i < variabili.data.length; i++) {

        let element = {
        "sources":[
        {
        "src":'/video/'+variabili.data[i].video_url,
        "type":'video/mp4'
        }],
        "title": variabili.data[i].video_title,
	    "thumb": variabili.data[i].video_poster,
        "duration": variabili.data[i].video_duration,
        }
       videos4Playlist.push(element);  
    }
        
  
         //alert(jsonArr);
          
	//player.src({ src:'/video/'+variabili.data[0].video_url, type:"video/mp4"});
    player.playlist(videos4Playlist);
           player.play();
          
     } else {

        //videos.push('<div class="row" style="padding:10px"><div class="col-12">' + i18n[language].playListError + '</div></div>')
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(i18n[language].playlistError);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/selectPlaylist.php", true);
  xmlhttp.send(params);

/*     $('#genericAlert').modal('show');
        $("#genericAlertInside").html(i18n[language].playlistCreated);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");*/
    
}



function alertDeletePlaylist(idPlaylist, playlistName) {
  $('#genericAlert').modal('show');
  $("#genericAlertInside").html(i18n[language].alertDeletePlaylist + playlistName + "?");
  $("#btnCancel").html(i18n[language].cancel);
  $("#btnText").html(i18n[language].delete);
  $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');deletePlaylist(" + idPlaylist + ")");

}


function deletePlaylist(idPlaylist) {


  var params = new FormData();
  params.append("idPlaylist", idPlaylist);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
      if (msg[0] == "OK") {
        // alert(xmlhttp.responseText);
        document.getElementById("playlist_" + idPlaylist).style.display = "none";


      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(msg[1]);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/deletePlaylist.php", true);
  xmlhttp.send(params);
}


function editPlaylist(idPlaylist) {

  var playlistName = document.getElementById("playlistNameEdit").value;
  var playlistStatus = document.getElementById("playlistVisibilityEdit").value;
  var numberOfVideos = document.getElementById("numberOfVideosEdit").innerHTML;
  var idStation = document.getElementById("playlistIdStationEdit").value;

  var strStatus;
  switch (playlistStatus) {
    case "0":
      strStatus = i18n[language].preparing;
      break;
    case "1":
      strStatus = i18n[language].public;
      break;
    case "2":
      strStatus = i18n[language].private;
      break;
    default:
      strStatus = i18n[language].preparing;
      break;

  }
  //alert(strStatus);
  var params = new FormData();
  params.append("idPlaylist", idPlaylist);
  params.append("playlistStatus", playlistStatus);
  params.append("playlistName", playlistName);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var msg = xmlhttp.responseText.split("|");
      if (msg[0] == "OK") {
        // alert(xmlhttp.responseText);
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(i18n[language].playlistEdited);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');document.getElementById('playlistEditor').style.display = 'none';");


        var html = '<div class="col-1 centerText"><a href="#"><i class="fa fa-bars"></i></a></div><div class="col-2 centerText"><img src="' + document.getElementById("img_" + idPlaylist).src + '" style="width:160px; height:90px"></div><div class="col-2 centerText">' + playlistName + '</div><div class="col-2 centerText">' + strStatus + '</div><div class="col-2 centerText">' + msg[1] + '</div><div class="col-1 centerText">' + numberOfVideos + '</div><div class="col-2 centerText" style="text-align: right"><a href="#" onClick="previewPlaylist(\'' + idPlaylist + '\')" style="margin-right: 20px;"><i class="fa fa-play"></i></a><a href="#" onclick="openEditPlaylistPanel(\'' + idPlaylist + '\',\'' + playlistName + '\',\'' + strStatus + '\',\'' + idStation + '\')" style="margin-right: 20px;"><i class="fa fa-edit"></i></a><a href="#" onclick="alertDeletePlaylist(\'' + idPlaylist + '\',\'' + playlistName + '\')"><i class="fa fa-trash" aria-hidden="true"></i></a></div>';

        document.getElementById("playlist_" + idPlaylist).innerHTML = html;


      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(msg[1]);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/editPlaylist.php", true);
  xmlhttp.send(params);
}


function openEditPlaylistPanel(idPlaylist, playlistName, playlistVisibility, idStation) {
///this is where the playlist is edited
  var params = new FormData();
  params.append("idPlaylist", idPlaylist);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
        //var videos = [];
        var HTMLStr = '';
        for (var i = 0; i < variabili.data.length; i++) {


          HTMLStr += '<div class="row playlistItem" id="playlistItem_'+variabili.data[i].id_playlist_video+'"><div class="col-3" style="padding-left:0;padding-right:0"><img src="' + variabili.data[i].video_poster + '"></div><div class="col-3">' + variabili.data[i].video_title.substring(0, 10) + '</div><div class="col-3">' + variabili.data[i].video_duration + '</div><div class="col-3 centerText  reorder" style="text-align: right"><a href="#" style="margin-right: 8px" onClick="removeVideo('+variabili.data[i].id_playlist_video+')"><i class="fa fa-trash"></i></a><a href="#"><i class="fa fa-bars"></i></a></div></div>'


        }
        document.getElementById("numberOfVideosEdit").innerHTML = variabili.data.length;
        document.getElementById("videoWrapper").innerHTML = HTMLStr;

      } else {

        videos.push('<div class="row" style="padding:10px"><div class="col-12">' + i18n[language].playListError + '</div></div>')

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/selectPlaylist.php", true);
  xmlhttp.send(params);


  document.getElementById("playlistNameEdit").value = playlistName;
  document.getElementById("counterTitleLenghtEdit").innerHTML = playlistName.length + "/100";

  var sel = document.getElementById("playlistVisibilityEdit");
    for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value == playlistVisibility) {
            sel.options[i].selected = true;
            //return;
        }
    }
  //sel.options[sel.selectedIndex].text = playlistVisibility;
  document.getElementById("playlistIdStationEdit").value = idStation;
  document.getElementById("idPlaylistEdit").value = idPlaylist;
  document.getElementById("createPlaylistBtnEdit").setAttribute("onclick", "editPlaylist('" + idPlaylist + "')");

  document.getElementById("playlistEditor").style.display = 'block';


}

function searchVideos(search, idStation, page = 1) {

  var params = new FormData();
  params.append("search", search);
  params.append("idStation", idStation);
  params.append("page", page);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
        var HTMLStr = "";
        for (var i = 0; i < variabili.data.length; i++) {


          HTMLStr += '<div class="contribution contributionSearchPlaylist">';
          HTMLStr += '<div class="contributionHeader searchHeader" style="background-color: #f90; max-height: 22px">' + variabili.data[i].video_title + '</div>';
          HTMLStr += '<div style="text-align: center"><img class="contributionImage ' + variabili.data[i].thumb_class + '" src="' + variabili.data[i].video_poster + '"></div>';
          HTMLStr += '<div class="contributionDescription contributionDescriptionSearch">' + variabili.data[i].video_description + '</div>';
          HTMLStr += '<div class="contributionFooter"><i class="fa fa-plus" onClick="addVideoToPlaylist(\'' + variabili.data[i].id_video + "','" + document.getElementById("idPlaylistEdit").value + '\')"></i></div>';
          HTMLStr += '</div>';


        }
        var totalPages = variabili.response.total_pages
        if (totalPages > page) {
          document.getElementById("more").setAttribute("onClick", "searchVideos('" + search + "','" + idStation + "', " + parseInt(page + 1) + ")");
          document.getElementById("outerMore").style.display = "block";

        } else {
          document.getElementById("more").setAttribute("onClick", "");
          document.getElementById("outerMore").style.display = "none";
        }
        document.getElementById("videoResults").insertAdjacentHTML('beforeend', HTMLStr);

      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili.description);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/searchVideos.php", true);
  xmlhttp.send(params);


}

function loadVideos(idStation, page = 1, lastId, accentColor, idUser) {

  document.getElementById("loading").style.display = "block";
  var params = new FormData();
  params.append("idStation", idStation);
  params.append("page", page);
  params.append("idUser", idUser);
  params.append("accent", accentColor);

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
        document.getElementById("loading").style.display = "none";
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
        var HTMLStr = "";
          
        for (var i = 0; i < variabili.data.length; i++) {

          
          HTMLStr += '<div class="contribution contributionSearchPlaylist">';
          HTMLStr += '<div class="contributionHeader searchHeader" style="background-color: '+accentColor+'; max-height: 22px">' + variabili.data[i].video_title + '</div>';
          HTMLStr += '<div style="text-align: center"><img class="contributionImage ' + variabili.data[i].thumb_class + '" src="' + variabili.data[i].video_poster + '"></div>';
          HTMLStr += '<div class="contributionDescription contributionDescriptionSearch">' + variabili.data[i].video_description + '</div>';
          HTMLStr += '<div class="contributionFooter"><a href="#"  id="icon_'+lastId+'" onclick="return false;" style="color: '+variabili.data[i].color_like+' ">';
          HTMLStr += '<i id="reaction_'+lastId+'" onClick="likeItVideo(\'likeVideo_'+lastId+'\',\''+variabili.data[i].id_video+'\', '+variabili.data[i].like_unlike+', \''+accentColor+'\')" class="fas fa-thumbs-up fa-2x"></i></a>';
          HTMLStr += '<span  id="likeVideo_'+lastId+'"  class="c2">'+variabili.data[i].how_many_like+'</span></div>';
          HTMLStr += '</div>';
          lastId++;

        }
        var totalPages = variabili.response.total_pages
        if (totalPages > page) {
          document.getElementById("more").setAttribute("onClick", "loadVideos('" + idStation + "', " + parseInt(page + 1) + ", "+ parseInt(lastId - 1) +", '"+accentColor+"', '"+ idUser +"' );return false;");
          document.getElementById("outerMore").style.display = "block";

        } else {
          document.getElementById("more").setAttribute("onClick", "");
          document.getElementById("outerMore").style.display = "none";
        }
        document.getElementById("contributionsResults").insertAdjacentHTML('beforeend', HTMLStr);

      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili.description);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/loadVideos.php", true);
  xmlhttp.send(params);


}


function addVideoToPlaylist(idVideo, idPlaylist) {

  var params = new FormData();
  params.append("idVideo", idVideo);
  params.append("idPlaylist", idPlaylist);


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
          
          
           var HTMLStr = '<div class="row playlistItem" id="playlistItem_'+variabili.data[0].id_playlist_video+'"><div class="col-3" style="padding-left:0;padding-right:0"><img src="' + variabili.data[0].video_poster + '"></div><div class="col-3">' + variabili.data[0].video_title.substring(0, 10) + '</div><div class="col-3">' + variabili.data[0].video_duration + '</div><div class="col-3 centerText  reorder" style="text-align: right"><a href="#" style="margin-right: 8px" onClick="removeVideo('+variabili.data[0].id_playlist_video+')"><i class="fa fa-trash"></i></a><a href="#"><i class="fa fa-bars"></i></a></div></div>';

          
        /*  

        var HTMLStr = '<div class="row playlistItem" id="playlistItem_'+variabili.data[0].id_playlist_video+'"><div class="col-4"><img src="' + variabili.data[0].video_poster + '"></div><div class="col-2">' + variabili.data[0].video_title.substring(0, 10) + '</div><div class="col-4">' + variabili.data[0].video_duration + '</div><div class="col-2 centerText  reorder" style="text-align: right"><a href="#" style="margin-right: 8px" onClick="removeVideo('+variabili.data[0].id_playlist_video+')"><i class="fa fa-trash"></i></a><a href="#"><i class="fa fa-bars"></i></a></div></div>'*/

        document.getElementById("videoWrapper").insertAdjacentHTML('beforeend', HTMLStr);
        document.getElementById("counterVideo_" + idPlaylist).innerHTML ++;  
          
        if(variabili.data[0].first_item){
            document.getElementById("img_" + idPlaylist).src = variabili.data[0].video_poster;
        }  

      } else {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili.response.description);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      }


    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/addVideoToPlaylist.php", true);
  xmlhttp.send(params);
}

function saveStationPlaylistOrder(oldIndex, newIndex, idStation){
   
    
    
  var params = new FormData();
  params.append("oldIndex", oldIndex);
  params.append("newIndex", newIndex);
  params.append("idStation", idStation);


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result != "OK") {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili.response.description);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      } /*else {
        document.getElementById("img_" + idPlaylist).src = variabili.response.thumb;
      }*/
    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/saveStationPlaylistOrder.php", true);
  xmlhttp.send(params);
    
    
}

function savePlaylistOrder(oldIndex, newIndex, idPlaylist) {

  var params = new FormData();
  params.append("oldIndex", oldIndex);
  params.append("newIndex", newIndex);
  params.append("idPlaylist", idPlaylist);


  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result != "OK") {

        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili.response.description);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");

      } else {
        document.getElementById("img_" + idPlaylist).src = variabili.response.thumb;
      }
    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/savePlaylistOrder.php", true);
  xmlhttp.send(params);

}


function removeVideo(idPlaylistVideo){
var params = new FormData();
  params.append("idPlaylistVideo", idPlaylistVideo);



  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //alert(xmlhttp.responseText);
      const variabili = JSON.parse(xmlhttp.responseText);
      if (variabili.response.result == "OK") {
          
              document.getElementById("img_" + variabili.response.id_playlist).src = variabili.response.thumb;
          
          document.getElementById("playlistItem_"+idPlaylistVideo).style.display = "none";
          document.getElementById("counterVideo_" + variabili.response.id_playlist).innerHTML --; 

      } else {
        $('#genericAlert').modal('show');
        $("#genericAlertInside").html(variabili.response.description);
        $("#btnCancel").hide();
        $("#btnText").html(i18n[language].OK);
        $("#btnText").attr("onclick", "$('#genericAlert').modal('hide');");
      }
    }
  }
  xmlhttp.open("POST", rootSito + "/ajax/removeVideoFromPlaylist.php", true);
  xmlhttp.send(params);

}
