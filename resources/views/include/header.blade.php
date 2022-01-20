<header class="zmovo-header">
    <div class="container">
        <div class="row align-items-center">

            <!-- Logo -->
            <div class="col-lg-2 zmovo-logos">
                <div class="zmovo-logo">
                    <a href="/">
                        <img src="/images/logoAengieHeader.png" alt="">
                    </a>
                </div>
            </div>

            <!-- Menu -->
            <div class="col-lg-7 zmovo-menus">
                <div class="main-menu">
                    <div class="navigation">
                        <div class="menu-container">
                            <div id="navigation">
                                <ul>

                                    <!-- if unregistered user -->
                                    <!--if($user->id == 0)
                                        <li class="">
                                            <a href="/"><?= "home" ?></a>
                                        </li>
                                        <li class="">
                                            <a href="/channels"><?= "stations" ?></a>
                                        </li>
                                        <li class="">
                                            <a href="/contents"><?= "contents" ?></a>
                                        </li>
                                    endif -->

                                    <!-- if registered user -->
                                    @if ($user->id != 0)
                                        <li class="">
                                            <a href="/{{ $user->id }}"><?= "home" ?></a>
                                        </li>
                                        <li class="">
                                            <a href="/channels/{{ $user->id }}"><?= "stations" ?></a>
                                        </li>
                                        <li class="">
                                            <a href="/contents/{{ $user->id }}"><?= "contents" ?></a>
                                        </li>

                                        <!-- Dropdown menu -->
                                        <li class="has-sub">
                                            <span class="submenu-button"></span>
                                            <a href="/mytv/{{ $user->id }}">myAEngie<sup class="c1" style="font-size: 10px; top:-1.5em">tv</sup></a>

                                            <!-- First level -->
                                            <ul>
                                                <li>
                                                    <a href="/mytv/{{ $user->id }}/library"><?= "library" ?></a>
                                                </li>
                                                <li>
                                                    <a href="/mytv/{{ $user->id }}/notifications"><?= "notifications" ?></a>
                                                </li>
                                                <li>
                                                    <a href="/mytv/{{ $user->id }}/user-settings"><?= "user settings" ?></a>
                                                </li>

                                                <!-- if($isStationOwner || $isCommunityManager || $isStreamMaster) -->
                                                @if($user->role_id <= 3)

                                                    <li class="has-sub">
                                                        <span class="submenu-button"></span>
                                                        <a href="/mytv/{{ $user->id }}/dashboard"><?= "dashboard" ?></a>
                                                        <!-- after selection of station href="/mytv/{$user->id}/dashboard/{$station->id}" -->

                                                        <!-- Second level -->
                                                        <ul>
                                                            <li>
                                                                <a href="/mytv/{{ $user->id }}/dashboard/community"><?= "community" ?></a>
                                                            </li>
                                                            <li>
                                                                <a href="/mytv/{{ $user->id }}/dashboard/contributions"><?= "contributions" ?></a>
                                                            </li>
                                                            <li>
                                                                <a href="/mytv/{{ $user->id }}/dashboard/playlist"><?= "playlist" ?></a>
                                                            </li>

                                                            <li class="has-sub">
                                                                <span class="submenu-button"></span>
                                                                <a href="/mytv/{{ $user->id }}/dashboard/settings"><?= "settings" ?></a>

                                                                <!-- Third level -->
                                                                <ul>
                                                                    <li>
                                                                        <a href="/mytv/{{ $user->id }}/dashboard/settings/event"><?= "broadcast settings" ?></a>
                                                                    </li>

                                                                    <!-- if Community Manager or Station Owner -->
                                                                    @if($user->role_id <= 2)
                                                                        <li>
                                                                            <a href="/mytv/{{ $user->id }}/dashboard/settings/community"><?= "community settings" ?></a>
                                                                        </li>
                                                                    @endif

                                                                    <!-- if Station Owner -->
                                                                    @if($user->role_id == 1)
                                                                        <li>
                                                                            <a href="/mytv/{{ $user->id }}/dashboard/settings/station"><?= "station settings" ?></a>
                                                                        </li>
                                                                    @endif

                                                                </ul>
                                                                <!-- End third level -->
                                                            </li>
                                                        </ul>
                                                        <!-- End second level -->
                                                    </li>
                                                @endif
                                            </ul>
                                            <!-- End first level -->
                                        </li>
                                        <!-- End dropdown menu -->

                                        <li>
                                            <a href="/support/{{ $user->id }}"><?= "contacts" ?></a>
                                        </li>
                                    @endif
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 zmovo-t-right">
                <div class="zmovo-header-right"></div>

                    <!-- Notification(s) -->
                    <div class="zmovo-top-search">
                        <li role="presentation" class="dropdown" style="list-style: none;">
                            <a href="#" onClick="" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                                <img src="/images/icons/1x/Actions/notification-white.png">
                                <span id="num" class="num"><?= "1" ?></span>
                            </a>
                            <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                                <li>
                                    <a href="/mytv/{user_id}/notifications" style="padding: 0; color: white">
                                        <div class="row">
                                            <!-- if notifications -->
                                            <div class="col-3 image">
                                                <img src="/images/users" alt="<?= "Profile Image" ?>" style="width: 40px" />
                                            </div>
                                            <div class="col-9">
                                                <div class="c1"></div>
                                                <div class="time c3">time ago</div>
                                            </div>
                                        </div>
                                        <div class="message"></div>
                                    </a>
                                </li>
                                <li>
                                    <div class="text-center">
                                        <a href="/mytv/{user_id}/notifications">
                                            <strong><?= "See All Notifications" ?></strong>
                                            <i class="fa fa-angle-right"></i>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </div>

                    <!-- Login -->
                    <div class="zmovo-login">
                        <a href="/login" data-toggle="modal" data-target="#loginPanel">
                            <img href="/login" id="logginIcon" style="height: 30px" src="/images/icons/1x/Actions/account_unlogged.png"/>
                        </a>
                    </div>

                    <!-- Top search bar -->
                    <div class="zmovo-top-search" id="topSearch" style="display:none">
                        <div class="zmovo-ser-icon" id="clickserch">
                            <span class="fa fa-search">
                            </span>
                        </div>
                        <div class="zmovo-hidden-search" id="opensearch">
                            <input type="search" id="searchUp"  placeholder="<?= "Please tell me what should I search for" ?>">
                            <div id="searchresults" class="searchresult">

                            </div>
                            <style>
                                .searchresult{
                                    position: absolute;
                                    right: 0;
                                    margin-top: 6px;
                                }
                            </style>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
