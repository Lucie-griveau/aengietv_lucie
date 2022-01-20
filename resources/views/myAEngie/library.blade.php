@extends('/myAEngie/mytv')

@section('mytv')

<div class="container">

    <div class="row" style="margin-top: 60px;">
        <div class="col-sm-2">
            <div class="itemWidget" ><?= "STORAGE" ?>
                <span class="c2"><?= "100 %" ?></span><?= "USED" ?>
            </div>
            <div class="itemWidget"><?= "USED SPACE" ?>
                <span class="c1"><?= "diskUsed" ?></span> OF
                <span class="c2"><?= "diskQuota" ?></span> MB
            </div>

            <!-- mytvLibraryBtnUpload -->
            <div class="underWidget">
                <input type="hidden" style="" name="userId" id="userId" value="<?= "user_id" ?>">
                <input type="hidden" style="" name="video-user" id="video-user">
                <input type="hidden" name="video-userHdn" id="video-userHdn">

                <a href="#" onclick="beginUpload('video-user', 'user_id'); return false">
                    <div class="itemWidget" style="border: 1px solid #f29100">
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                            <path d="M22,4 L22,13.81 C21.12,13.3 20.1,13 19,13 C15.69,13 13,15.69 13,19 C13,19.34 13.04,19.67 13.09,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 L5,4 L7,8 L10,8 L8,4 L10,4 L12,8 L15,8 L13,4 L15,4 L17,8 L20,8 L18,4 L22,4 M22.5,21.5 L19.5,16.5 L16.5,21.5 L22.5,21.5 Z" id="Shape" fill="#628890" fill-rule="nonzero"></path>
                        </svg>
                        <?= "UPLOAD FOOTAGE" ?>
                    </div>
                </a>
            </div>

            <div class="underWidget">
                <div class="itemWidget">
                    <?= "Total footages" ?>:
                    <span class="c1"><?= "number of videos" ?></span>
                </div>
                <div class="itemWidget">
                    <?= "In Review" ?>:
                    <span class="c1"><?= "number of videos in review" ?></span>
                </div>
                <div class="itemWidget">
                    <?= "Public" ?>:
                    <span class="c1"><?= "number of approved videos" ?></span>
                </div>
                <div class="itemWidget">
                    <?= "Private" ?>:
                    <span class="c1"><?= "number of private videos" ?></span>
                </div>
                <div class="c3">
                    <?= "Last Showreel Update" ?>:</div>
                <div><?= "date" ?></div>
            </div>
        </div>

        <div class="col-sm-10">
            <!-- mytvEditFootage -->
            <div class="row">
                <span class="uploadButton">
                    <i class="fas fa-sort-amount-up-alt c1"></i>&nbsp;
                    <span id="editorButton"><?= "Open Editor" ?></span>
                </span>
            </div>
            <nav class="navbar navbar-expand-lg navbar-light" style="margin-top: 0px;">
                <div style=" background-color: #303030; width: 100%">
                    <div id="slidelayer">
                        <!-- videoSender -->
                    </div>
                </div>
            </nav>

            @foreach ($allVideos as $video)

            <!-- mytvLibraryItems -->
            <div id="contributionsResults" class="contributions">
                <div class="contribution">
                    <a href="#" >
                        <div class="contributionHeader">{{ $video->title }}</div>
                        <div class="itemCategory">
                            <img src="{{ $video->tag_id }}">
                        </div>
                        <div class="itemPoster">
                            <img onClick="editVideo('{{ $video->id }}')" class="contributionImage uploadButton" src="{{ $video->poster }}" alt="{{ $video->title }}">
                        </div>
                        <div>
                            <div class="contributionDescription">{{ $video->description }}</div>
                        </div>
                        <div class="lower">
                            <div class="duration">Duration {{ $video->duration }} seconds</div>
                            <div class="floating-menu-buttons">
                                <a href="#" onClick="submenu('floating_{{ $video->id }}'] ?>'); return false;">
                                    <img src="/images/icons/1x/Actions/submenu.png" id="menuBtn_{{ $video->id }}">
                                </a>
                            </div>
                        </div>
                        <div class="floatingMenu" id="floating_{{ $video->id }}">
                            <!-- if $user->role_id <= 3 -->
                            <div class="c3 plr-5 mb-10">
                                <a href="#" onClick="copyPath('{{ $video->id }}'); submenu('floating_{{ $video->id }}');">
                                    <img src="/images/icons/1x/Actions/publish.png"/><?= "Copy Path" ?>
                                </a>
                            </div>
                            <input type="hidden" id="videoPath_{{ $video->id }}" value="{{ $video->url }}">

                            <!-- if $video->status_id != 3 -->
                            <div class="c3 plr-5 mb-10">
                                <a href="#" class="uploadButton" onClick="editVideo('{{ $video->id }}'); submenu('floating_{{ $video->id }}');">
                                    <img src="/images/icons/1x/Actions/edit.png"/><?= "Edit" ?>
                                </a>
                            </div>

                                <!-- if $video->status_id == 0 -->
                                <div class="c3 plr-5 mb-10" id="send_{{ $video->id }}">
                                    <a href="#" onClick="alertSendToStation('{{ $video->id }}','$user->id'); submenu('floating_{{ $video->id }}');">
                                        <img src="/images/icons/1x/Actions/sendshowreel.png"/><?= "Send to Stations" ?>
                                    </a>
                                </div>
                                <!-- endif -->

                            <div class="c3 plr-5 mb-10">
                                <a href="#" onClick="alertDelete('{{ $video->id }}'); submenu('floating_{{ $video->id }}');">
                                    <img src="/images/icons/1x/Actions/remove.png"/><?= "Remove from Library" ?>
                                </a>
                            </div>
                        <!-- endif -->
                        </div>
                    </a>
                </div>
            </div>

            @endforeach

        </div>
    </div>
</div>

@endsection
