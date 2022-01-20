@extends('/myAEngie/mytv')

@section('mytv')

<!-- Select station -->
<div class="col-lg-4">
    <div class="container">
        <form action="" id="form1" autocomplete="off" method="post">
            <div class="zmovo-login-input-top mt-30">
                <label for="station"><?= "Station:" ?>

                    @include('myAEngie/include/selectStation')

                    @include('myAEngie/include/userRole')

                </label>
            </div>
        </form>
    </div>
</div>

@yield('dashboard')

@endsection
