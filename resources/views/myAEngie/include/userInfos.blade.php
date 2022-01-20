<div class="row rowGeneral rowUserInfos">
    <div class="col-2" style="">
        <img src="{{ $user->picture }}" style="border-radius: 50%; width=1024px; height=1024px">
    </div>
    <div class="col-2 ">
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
                <div class="c3 eleven"><?= "Local Time" ?></div>
                <div><?= date("Y-m-d H:i:s") ?></div>
                <div class="mobHidd">
                    <div class="c3 eleven"><?= "Last Position Sent:" ?></div>
                    <div><?= "Grenoble" ?></div>
                </div>
            </div>
        </div>
    </div>
</div>
