<div class="" hidden>
    @if($user->role_id == 3)
        <div class="legenda bordeaux"></div>Stream Master
    @elseif($user->role_id == 2)
        <div class="legenda green"></div>Community Manager
    @elseif($user->role_id == 1)
        <div class="legenda orange"></div>Station Owner
    @endif
</div>
