@extends('layout')

@section('content')

@include('include.submenu')

<div id="contributionsResults" class="contributions">

    @foreach ($videos as $video)

    <div class="contribution">
        <!-- data-backdrop="static"-->
        <a href="#" title="{{ $video->title }}" data-toggle="modal" data-target="#modalVideo" onClick="playVideoFromContents('{{ $video->url }}')" style="color: white">
            <div class="contributionHeader" style="background-color: #f90"></div>
            <div class="contributionLogo">
                @foreach ($stations as $station)
                    @if($station->id == $video->station_id)
                        <img style="width: 50px;" src="{{ $station->logo }}">
                    @endif
                @endforeach
            </div>

            <div style="display: none">{{ $video->tag_id}}
            </div>
            <div style="text-align: center">
                <img class="contributionImage" src="{{ $video->poster }}" alt="" >
            </div>
            <div>
                <div class="contributionFooter">
                    <a href="#" id="" onclick="return false;" style="color: grey">
                        <i id="reaction" onClick="likeItVideo" class="fas fa-thumbs-up fa-2x"></i>
                    </a>
                    <span id="likeVideo" class="c2"></span>
            </div>
                <div class="contributionDescription">{{ $video->description }}</div>
            </div>
        </a>
    </div>

    @endforeach

</div>

@endsection
