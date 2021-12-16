@extends('/myAEngie/mytv')

@section('mytv')

<!-- Select station -->
<div class="col-lg-4">
    <div class="container">
        <form action="" id="form1" autocomplete="off" method="post">
            <div class="zmovo-login-input-top mt-30">
                <label for="station"><?= "Select Station" ?>

                    @include('/myAEngie/include/selectStation')

                    @include('/myAEngie/include/userRole')

                </label>
            </div>
        </form>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-lg-6">

        </div>
        <div class="col-lg-6">

        </div>
    </div>
</div>


@endsection
