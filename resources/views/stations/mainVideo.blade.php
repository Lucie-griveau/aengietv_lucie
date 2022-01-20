<div class="container video-area" style="position:relative; top:40px;margin-bottom: 40px; background: black; padding: 0">
    <video id="mainVideo" class="video-js vjs-default-skin vjs-16-9 vjs-fluid" controls preload="auto" playsinline autoplay vjs-fluid poster="<?php echo $poster ?>" data-setup='{}'>


         <?php //&& !isset( $_GET[ 'p' ])
       if ( ($playlist_num_row == 0 || empty( $playlists) || $totalLive > 0 || $showreelAlwaysOn) ) {
 ?>

       <source src="<?php echo $showreel ?>" type="<?php echo $videoType ?>" />

     <?php } ?>
       <p class="vjs-no-js">
           <?= _("To view this video please enable JavaScript, and consider upgrading to a web browser that") ?>
           <a href="https://videojs.com/html5-video-support/" target="_blank"><?= _("supports HTML5 video") ?></a>
       </p>
     </video>


      <div class="video-upper-logo"> <img src="/image/channelsLogo/<?php echo $logoChannel ?>"> </div>
     <?php  if ( count($arrVideoBanner) > 0 ) { ?>
     <div class="video-upper-stripe-logo" id="bannerStripe">

         <?php for($i =0; $i< count($arrVideoBanner); $i++){ ?>
     <a href ="<?= $arrVideoBanner[$i][1]?>" target="_blank"><span class="banner-img"><img src="/image/banners/<?= $arrVideoBanner[$i][0]?>"></span></a>
         <?php }?>
         <i class="far fa-times-circle ics" style="float: right; margin-right: 8px; cursor: pointer" onClick="hideAds('bannerStripe')"></i>
      </div>
      <?php }?>
   </div>
