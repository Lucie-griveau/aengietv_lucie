@extends('layout')

@section('content')

<div class="container" style="margin-top: 50px; mar">
    <div class="row">

        <!-- Browse menu -->
        <div class="col-lg-3 c1">
            <?= "BROWSE" ?>
            @include('/myAEngie/include/browseMenu')
        </div>

        <div class="col-lg-9">
            <div class="row">
                <!-- User info -->
                <div class="col-lg-8" style="margin-top: 25px; margin-bottom: 25px;">
                    @include('/myAEngie/include/userInfos')
                </div>

                @yield('mytv')

            </div>
        </div>
    </div>
</div>

<style>
.rowUserInfos {
    border-radius: 25px;
}
</style>
@endsection
