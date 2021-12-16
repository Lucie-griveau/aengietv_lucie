@extends('layout')

@section('content')

<!-- Modal LOGIN SESSION -->
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content" style="background-color: #00000099">
        <div class="zmovo-login-page">
            <div class="container">
                <div class="row">
                    <div class="zmovo-page-login mt-30">

                        <!-- Logo -->
                        <img src="/images/logoAengie.png">

                        <!--<div class="myAengie"><?= "Login to access the demo" ?></div>
                        <div id="messaggio" class="c1"><?php echo "SESSION['logged_in']" ?></div>-->

                        <form action="login" id="form1"  method="post">
                            <div class="zmovo-login-input-top mt-30">

                                <!-- Username -->
                                <div class="form-group">
                                    <input class="form-control" name="usrSession" required="" type="text" placeholder="<?= "Enter provided Username" ?>">
                                </div>

                                <!-- Password -->
                                <div class="form-group">
                                    <input class="form-control" name="pwdSession" required="" type="password" placeholder="<?= "Enter provided Password" ?>">
                                </div>

                            </div>
                            <div class="zmovo-login-btns">
                                <a href="#" onClick="javascript:document.getElementById('form1').submit();" class="zmovo-login-btn"><?= "Login" ?></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal LOGIN -->

@endsection
