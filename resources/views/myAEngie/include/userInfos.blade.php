<div class="row rowGeneral rowUserInfos">
    <div class="col-2" style="">
        <img src="{{ $user->picture }}" style="border-radius: 50%; width=1024px; height=1024px">
    </div>
    <div class="col-3">
        <div>{{ $user->username }}</div>
    </div>
    <div class="col-7">
        <div class="row">
            <div class="col-6">
                <div class="c3 eleven"><?= "Registration Date" ?></div>
                <div>{{ $user->reg_date }}</div>
                <div class="mobHidd">
                    <div class="c3 eleven"><?= "Last Activity" ?></div>
                    <div>{{ $user->last_activity }}</div>
                </div>
            </div>
            <div class="col-6">
                <div class="c3 mobHidd"><?= "Local Time" ?></div>
                <div class="mobHidd">{{ $user->localTime }}</div>
                <div class="video-upper-stripe-scb c1 eleven"><?= "Last Position Sent:" ?></div>
            </div>
        </div>
    </div>
</div>
