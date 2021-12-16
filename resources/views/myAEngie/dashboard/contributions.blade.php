@extends('/myAEngie/mytv')

@section('mytv')

<div class="container">

    <!-- Search bars -->
    <div class="search">
        <div class="row">
            <div class="col-lg-6">
                <input type="text" id="search-query" placeholder="Search...">
            </div>
            <div class="col-lg-6">
                <span style="float: right">
                    <select class="searchStatus" id="statusSearch">
                        <option><?= "Search for status" ?></option>
                        @foreach ($statusList as $status)
                            <option value="{{ $status->status }}">{{ $status->status }}</option>
                        @endforeach
                        <option value=""><?= "All" ?></option>
                    </select>
                </span>
            </div>
        </div>
    </div>

    <!-- Contributions-->
    <div id="contributionsResults" class="contributions">

        @foreach ($contributions as $contribution)

            <!-- Contributions in review -->
            @if($contribution->status_id == 2)
                <div class="inreview"><?= "In review" ?>
            @endif
            <!-- Contributions approved -->
            @if ($contribution->status_id == 3)
                <div class="approved"><?= "Approved" ?>
            @endif
            <!-- Contributions private -->
            @if ($contribution->status_id == 1)
                <div class="private"><?= "Private" ?>
            @endif
                    <div class="contributionMgmt">
                        <!-- access background-color from statuses table -->
                        <div class="contributionHeader" style="background-color: @if($contribution->status_id == 2) #E4164E @elseif($contribution->status_id == 3) #8EC535 @else #F29100 @endif">{{ $contribution->title }}</div>
                        <div class="postedBy" style="background-color: @if($contribution->status_id == 2) #E4164E @elseif($contribution->status_id == 3) #8EC535 @else #F29100 @endif">
                            <?= "Posted By:" ?>{{ $contribution->user_id }}
                            <?= "On" ?>{{ $contribution->upload_date }}
                        </div>

                        @foreach ($statusList as $status)

                            @if($status->id == $contribution->status_id)
                                <div class="contributionStatus">{{ $contribution->status }}</div>
                            @endif

                        @endforeach

                        <div class="contributionStatus">{{ $contribution->status_id }}</div>
                        <!--<div class="contributionTags" style="display: none">{{ $contribution->tag_id }}</div>-->
                        <div class="contributionImg" style="text-align: center">
                            <a href="#" onClick="selectVideoForApproval('{{ $contribution->poster }}', '{{ $contribution->is_published }}'); return false;">
                                <img class="contributionImage" src="{{ $contribution->poster }}" alt="{{ $contribution->title }}">
                            </a>
                        </div>
                        <div>
                            <div class="contributionTitleMgmt">{{ $contribution->title }}</div>
                            <div class="contributionDescriptionMgmt">{{ $contribution->description }}</div>
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
