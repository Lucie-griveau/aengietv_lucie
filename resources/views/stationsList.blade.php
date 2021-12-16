@extends('layout')

@section('content')

<div class="zmoto-inner-page">
    <div class="container" style="min-height: 630px;">

        @foreach ($allStations as $stations)
        <div class="row rowGeneral">

            <div class="col-2 stationsCol1" style="text-align: center">
                <a href="/channel/{{ $stations->id }}">
                    <img class="logoStations" src="{{ $stations->logo }}">
                </a>
            </div>
            <div class="col-6 stationsCol2">
                <div class="upperChannelRow">
                    <a href="/channel/{{ $stations->id }}">{{ $stations->name }}</a>
                </div>
                <div class="bottomChannelRow">{{ $stations->description }}</div>
            </div>
            <div class="col-4 stationsCol3">
                <div class="upperRightChannelRow">
                    <div class="rowInfoUp">
                        <div><?= "THEME" ?></div>

                            <!-- Use of the relationship between stations & arguments -->
                            @foreach($allArguments as $arguments)
                                @if($arguments->id == $stations->argument_id)
                                    <div class="argument">{{ $arguments->argument }}</div>
                                @endif
                            @endforeach
                    </div>
                    <div class="rowInfoUp">
                        <div><?= "STREAMS" ?></div>

                        <!-- Use of the relationship between stations & videos -->
                        <div class="argument">1</div>

                    </div>
                    <div class="rowInfoUp">
                        <div><?= "MEMBERS" ?></div>

                        <!-- Use of the relationship between stations & users -->
                        <div class="argument">1</div>

                    </div>
                </div>
            <div class="bottomRightChannelRow">
                <div id="row_follow_" class="rowInfoDown  rowInfoDown-first rowInfoDown-orange">
                    <img src="/images/icons/1x/Actions/follow.png" />
                    <?= "follow" ?>
                </div>
                <div id="row_join_" class="rowInfoDown rowInfoDown-orange">
                    <img src="/images/icons/1x/Actions/join.png" />
                    <?= "join" ?>
                </div>
                <a href="/channel/{{ $stations->id }}">
                    <div id="row_watch_" class="rowInfoDown rowInfoDown-last rowInfoDown-orange">
                        <img src="/images/icons/1x/Actions/watch.png" />
                        <?= "watch" ?>
                    </div>
                </a>
            </div>
            </div>
        </div>
        @endforeach
    </div>
</div>

@endsection
