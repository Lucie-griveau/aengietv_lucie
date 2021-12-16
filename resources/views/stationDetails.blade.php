@extends('layout')

@section('content')

<a href="">
    <span class="ads-background" style="background: url(backgroundBanner)">
        @include('/stations/mainVideo')
        @include('/stations/interactionToolbox')
        <div class="container" id="otherStreams" style="background: #1d1d1d; position: relative;">
            <div class="row">
                <div class="col-lg-8">
                    @include('/stations/channelLiveStreams')
                    @include('/stations/channelPlaylist')
                    @include('/stations/channelLibrary')
                </div>
                <div class="col-lg-4" id="chatContainer">
                    @include('stations/channelChat')
                </div>
            </div>
        </div>
    </span>
</a>

<style>
    .ads-background {
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 0;
      background-size:auto;
    }
</style>

@endsection
