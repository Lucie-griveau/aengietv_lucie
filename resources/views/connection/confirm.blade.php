@extends('layout')

@section('content')

<!-- Modal LOGIN SESSION -->
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content" style="background-color: #00000099">
        <div class="zmovo-login-page">
            <div class="container">
                <div class="row">
                    <div class="zmovo-page-login mt-30">
                        <img src="/images/logoAengie.png">
                        <div class="myAengie">
                            <?= "Welcome to the greatest community in the world your registration process is now complete you can login" ?>
                            <a href="#" data-toggle="modal" data-target="#loginPanel">
                                <?= "clicking here" ?>
                            </a>
                            <?= "or from the user icon" ?>
                            <img style="height: 30px" src="/images/icons/1x/Actions/account_unlogged.png">
                            <?= "on the top right" ?>
                        </div>
                        <!--<div id="messaggio" class="c1"><?php "message" ?></div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal LOGIN-->

<script>
    function controlAndSend(){
        var form = document.getElementById('form1');
        for(var i=0; i < form.elements.length; i++){
          if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            alert('<?= "There are some required fields!" ?>');
            return false;
          }
        }
        form.submit();
    }
    </script>

@endsection
