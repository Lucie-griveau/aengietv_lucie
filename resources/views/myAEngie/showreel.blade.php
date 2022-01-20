@extends('/myAEngie/mytv')

@section('mytv')

<!-- Video Showreel -->
<div class="container" style="margin-top: 50px">
    <div class="zmovo-hadidng pt-30">
        <h2><span><?= "My showreel" ?></span></h2>
    </div>

    @foreach ($userVideos as $video)

        @if ($video->user_id == $user->id)

            @if($video->is_showreel == 1)

                <div class="zmovo-slider-area">
                    <video id="mainVideo" class="video-js vjs-default-skin" controls preload="auto" autoplay vjs-fluid  poster="/image/pics/urlPoster" data-setup="{}">
                        <source src="/video/url" type="video/mp4"/>
                        <p class="vjs-no-js"><?= "To view this video please enable JavaScript, and consider upgrading to a web browser that" ?>
                            <a href="https://videojs.com/html5-video-support/" target="_blank"><?= "supports HTML5 video" ?></a>
                        </p>
                    </video>
                </div>

            @endif

            <!-- if($video->is_showreel == null) -->

                <!-- <div class="zmovo-slider-area">
                    <div class="row">
                        <div class="col-12" style="font-size: 20px; text-align: center; margin-top: 20px"><?= "No Showreel selected, please select one in your" ?>
                            <a href="/mytv/{user_id}/library"><?= "library" ?></a>
                        </div>
                    </div>
                </div>-->

            <!-- endif -->

        @endif

    @endforeach

</div>

<div class="container">
    <div class="row">

        <!-- Profile -->
        <div class="col-lg-8">
            <div class="zmovo-Popular-item arow-icon">
                <div class="container">
                    <div class="zmovo-Popular-items">
                        <div class="zmovo-hadidng pt-30">
                            <h2><span><?= "My profile" ?></span></h2>
                            <textarea id="userProfile" name="userProfile"><?= "userDescription" ?></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contributions -->
        <div class="col-lg-4">
            <div class="zmovo-Popular-item arow-icon">
                <div class="container">
                    <div class="zmovo-Popular-items">
                        <div class="zmovo-hadidng pt-30">
                            <h2><span><?= "My contributions" ?></span></h2>
                        </div>


                        @foreach ($userVideos as $video)

                            @if ($video->user_id == $user->id)
                                <!--Items-->
                                <div class="items" id="mytvContributions">
                                    <div class="item">
                                        <div class="zmovo-video-item-box">
                                            <div class="zmovo-video-box-inner-channel">
                                                <div class="v-box-content-right-channel" style="background-color: #FF9900">{{ $video->title }}</div>
                                                <div class="zmovo-v-box-img-channel gradient">
                                                    <img src="{{ $video->poster }}" alt="">
                                                    <div class="ply-btns-mytv">
                                                        <a href="#" onClick="playVideo('{{ $video->url }}')" class="ply-btn video-popup">
                                                            <img src="/images/play-button.png" alt="">
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="zmovo-v-box-content-channel">
                                                    <div class="titoloThumb-channel">
                                                        <a href="#">{{ $video->title }}</a>
                                                    </div>
                                                    <div class="zmovo-v-tag-channel c2">{{ $video->description }} </div>
                                                    <div class="social-interactions-thumb-channel" style="color: #FF9900"></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            @endif

                        @endforeach

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<style>
    textarea {
        background-color: #282828; /* This ruins default border */
        border:none;
        width: 100%;
        height: 310px;
        color:white;
    }
</style>

@endsection
