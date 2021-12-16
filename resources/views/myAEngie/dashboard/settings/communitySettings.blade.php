@extends('/myAEngie/mytv')

@section('mytv')

<div class="container">
    <div class="row">
        <div class="col-lg-8">

            @foreach ($contributors as $contributor)

                <!-- if contributors (includes SO, CM, SM, celebrity & pro) -->
                @if ($contributor->role_id < 7)

                    <div id="stationsSettings" class="bgSelectCMSettings" style="display: block;">
                        <div class="row" style="margin-bottom: 3px;  border: 1px solid #282828; border-radius: 15px; ">
                            <!-- border-color: if SO #F29100 && if CM #8EC535 && if SM #BB3E60 -->
                            <div class="align-self: center"></div>
                            <div class="col-4" style="align-self: center">{{ $contributor->username }}<br>({{ $contributor->email }})</div>
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
                            <div class="col-4" style="align-self: center; text-align: center">
                                <div class="zmovo-login-input-top">
                                    <div><?= "Available Receivers" ?></div>
                                    <select class="form-control" style="margin-bottom: 10px; margin-right: 10px; margin-left: 10px; min-height: 35px; position:relative;" id="select_0" onchange="setReceiver('{{ $contributor->id }}','21', this.value, '109', this.id)">
                                        <option value=""><?= "Select receiver" ?></option>
                                        <option value="5">AengieTV_R5</option>
                                        <option value="6">AengieTV_R6</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                @endif

            @endforeach

            <div>
                <button type="button">Next</button>
            </div>

        </div>
    </div>
</div>

@endsection
