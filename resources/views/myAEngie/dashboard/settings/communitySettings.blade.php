@extends('/myAEngie/dashboard')

@section('dashboard')

<div class="container">
    <div class="row">

        <div class="col-lg-8">
            <div class="zmovo-login-input-top mt-30">
                <div class="form-group">
                    <select class="form-control" name="station" id="station" onChange="contributorsList(this.value,'1')">
                        <option><?= "Select..." ?></option>
                        <option value=""><?= "User to be approved as contributor" ?></option>
                        <option value=""><?= "List of contributors" ?></option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-lg-8">

            @foreach ($contributors as $contributor)

                <!-- if not contributor yet -->
                @if ($contributor->role_id == 7)

                    <div id="stationsSettings" class="bgSelectCMSettings" style="display: block;">
                        <div class="row" style="margin-bottom: 3px;  border: 1px solid; border-radius: 15px; ">
                            <div class="align-self: center"></div>
                            <div class="col-6" style="align-self: center">{{ $contributor->username }}<br>({{ $contributor->email }})</div>
                            <div class="col-2" style="align-self: center; text-align: right">
                                <div><?= "Follower" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setFollower(this.checked,'{{ $contributor->id }}','21')">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="col-2" style="align-self: center; text-align: right">
                                <div><?= "Contributor" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setContributor(this.checked,'{{ $contributor->id }}','21', 'disabled', this.id)">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="col-2" style="align-self: center; text-align: right">
                                <div><?= "Journalist" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setJournalist(this.checked,'{{ $contributor->id }}','21')">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <!--<div class="col-1" style="text-align: right">
                                <div style="font-size: 11px;"><?= "Pro" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setCelebrity(this.checked,'{{ $contributor->id }}','21')">
                                    <span class="slider round"></span>
                                </label>
                            </div>-->
                            <!--<div class="col-4" style="align-self: center; text-align: center">
                                <div class="zmovo-login-input-top">
                                    <div><?= "Available Receivers" ?></div>
                                    <select class="form-control" style="margin-bottom: 10px; margin-right: 10px; margin-left: 10px; min-height: 35px; position:relative;" id="select_0" onchange="setReceiver('{{ $contributor->id }}','21', this.value, '109', this.id)">
                                        <option value=""><?= "Select receiver" ?></option>
                                        <option value="5">AengieTV_R5</option>
                                        <option value="6">AengieTV_R6</option>
                                    </select>
                                </div>
                            </div>-->
                        </div>
                    </div>

                @endif

                <!-- if contributors (includes SO, CM, SM, celebrity & pro) -->
                @if ($contributor->role_id < 7)

                    <div id="stationsSettings" class="bgSelectCMSettings" style="display: block;">
                        <div class="row" style="margin-bottom: 3px;  border: 1px solid @if($contributor->role_id == 1) #F29100 @elseif($contributor->role_id == 2) #8EC535 @elseif($contributor->role_id == 3) #BB3E60 @else #282828 @endif; border-radius: 15px; ">
                            <div class="align-self: center"></div>
                            <div class="col-6" style="align-self: center">{{ $contributor->username }}<br>({{ $contributor->email }})</div>
                            <div class="col-2" style="align-self: center; text-align: right">
                                <div><?= "Follower" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setFollower(this.checked,'{{ $contributor->id }}','21')">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="col-2" style="align-self: center; text-align: right">
                                <div><?= "Contributor" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setContributor(this.checked,'{{ $contributor->id }}','21', 'disabled', this.id)" checked="">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="col-2" style="align-self: center; text-align: right">
                                <div><?= "Journalist" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setJournalist(this.checked,'{{ $contributor->id }}','21')">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <!--div class="col-1" style="text-align: right">
                                <div style="font-size: 11px;"><?= "Pro" ?></div>
                                <label class="switch">
                                    <input type="checkbox" id="check_0" onclick="setCelebrity(this.checked,'{{ $contributor->id }}','21')">
                                    <span class="slider round"></span>
                                </label>
                            </div>-->
                            <!--<div class="col-4" style="align-self: center; text-align: center">
                                <div class="zmovo-login-input-top">
                                    <div><?= "Available Receivers" ?></div>
                                    <select class="form-control" style="margin-bottom: 10px; margin-right: 10px; margin-left: 10px; min-height: 35px; position:relative;" id="select_0" onchange="setReceiver('{{ $contributor->id }}','21', this.value, '109', this.id)">
                                        <option value=""><?= "Select receiver" ?></option>
                                        <option value="5">AengieTV_R5</option>
                                        <option value="6">AengieTV_R6</option>
                                    </select>
                                </div>
                            </div>-->
                        </div>
                    </div>

                @endif

            @endforeach

        </div>
    </div>
</div>

@endsection
