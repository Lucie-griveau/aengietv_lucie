@extends('/myAEngie/dashboard')

@section('dashboard')

<div class="container">

    <!-- Search bars -->
    <div class="search">
        <div class="row">
            <div class="col-lg-12">
                <span style="float: right">
                    <input type="text" id="search-query" placeholder="Search...">
                </span>
            </div>
            <!--<div class="col-lg-6">
                <span style="float: right">
                    <select class="searchStatus" id="statusSearch">
                        <option><?= "Search for status" ?></option>
                        @foreach ($statusList as $status)
                            <option value="{{ $status->status }}">{{ $status->status }}</option>
                        @endforeach
                        <option value=""><?= "All" ?></option>
                    </select>
                </span>
            </div>-->
        </div>
    </div>

    <!-- Contributions-->
    <div id="contributionsResults" class="contributions">

        @foreach ($contributions as $contribution)

            <!-- Contributions in review -->
            @if($contribution->status_id == 2)
                <div class="inreview">
                    <div class="zmovo-hadidng pt-30">
                        <h2><span><?= "In review" ?></span></h2>
                    </div>
            @endif
            <!-- Contributions approved -->
            @if ($contribution->status_id == 3)
                <div class="approved">
                    <div class="zmovo-hadidng pt-30">
                        <h2><span><?= "Approved" ?></span></h2>
                    </div>
            @endif
            <!-- Contributions private -->
            @if ($contribution->status_id == 4)
                <div class="private">
                    <div class="zmovo-hadidng pt-30">
                        <h2><span><?= "Private" ?></span></h2>
                    </div>
            @endif
                    <div class="contributionMgmt">
                        <!-- access background-color from statuses table -->
                        <div class="contributionHeader" style="background-color: @if($contribution->status_id == 2) #E4164E @elseif($contribution->status_id == 3) #8EC535 @else #F29100 @endif">{{ $contribution->title }}</div>
                        <div class="postedBy" style="background-color: @if($contribution->status_id == 2) #E4164E @elseif($contribution->status_id == 3) #8EC535 @else #F29100 @endif">
                            <!-- Link contribution->user_id to user->username -->
                            <div>
                                @foreach ($allUsers as $contributor)
                                    @if ($contribution->user_id == $contributor->id)
                                        <?= "Posted By: " ?>{{ $contributor->username }}
                                    @endif
                                @endforeach
                            </div>
                            <div>
                                <?= "On: " ?>{{ $contribution->upload_date }}
                            </div>
                        </div>

                        @foreach ($statusList as $status)

                            @if($status->id == $contribution->status_id)
                                <div class="contributionStatus">{{ $contribution->status }}</div>
                            @endif

                        @endforeach

                        <!--<div class="contributionStatus">{{ $contribution->status_id }}</div>-->
                        <!--<div class="contributionTags" style="display: none">{{ $contribution->tag_id }}</div>-->
                        <div class="contributionImg" style="text-align: center">
                            <a href="#" onClick="selectVideoForApproval('{{ $contribution->poster }}', '{{ $contribution->is_published }}'); return false;">
                                <img class="contributionImage" src="{{ $contribution->poster }}" alt="{{ $contribution->title }}">
                            </a>
                        </div>
                        <!--<div>
                            <div class="contributionTitleMgmt">{{ $contribution->title }}</div>
                            <div class="contributionDescriptionMgmt">{{ $contribution->description }}</div>
                        </div>-->
                        <div class="contributionMgmtFooter">
                            <!-- if(SO or SM) -->
                            <a href="{{ $contribution->url }}" download>
                                <div class="contributionMgmtFooterBtns">Download</div>
                            </a>
                            <!-- endif -->
                            <!-- if(SO or CM) -->
                            <a href="#" onClick="selectVideoForApproval('{{ $contribution->poster }}', '{{ $contribution->is_published }}'); return false;">
                                <div class="contributionMgmtFooterBtnsRight">Manage</div>
                            </a>
                            <!-- endif -->
                        </div>
                    </div>
                    <div class="zmovo-login-btns">
                        <span style="float: right">
                            <a href="#" onClick="javascript:document.getElementById('form1').submit();" class="zmovo-login-btn"><?= "More..." ?></a>
                        </span>
                    </div>
                </div>

        @endforeach

    </div>
</div>

<style>
    .contributionHeader .postedBy {

    }
</style>
@endsection
