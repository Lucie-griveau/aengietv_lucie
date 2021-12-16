
    @if($contribution->status_id == $status->id)
        <div class="contributionStatus">{{ $contribution->status }}</div>
    @endif
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
