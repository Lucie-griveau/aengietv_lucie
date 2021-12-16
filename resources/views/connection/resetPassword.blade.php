@extends('layout')

@section('content')

<!-- Modal LOGIN SESSION -->
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content" style="background-color: #00000099">
        <div class="zmovo-login-page">
            <form action="" id="form1" autocomplete="off" method="post">
                <div class="container">
                    <div class="row">
                        <div class="zmovo-page-login mt-30">
                            <img src="/images/logoAengie.png">
                            <div id="messaggio" class="c1"><?php "message" ?></div>
                            <div class="form-group">
                                <label>Change password</label>
                                <input class="form-control" name="password" id="password" type="password" placeholder="Choose a Password" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');displayElement('hints');" onKeyUp="controlComplexity(this.value)">
                                <div id="hints" class="hint rosso" style="display: none">
                                    <ul>
                                        <li id="upper">At least one character have to be uppercase</li>
                                        <li id="lower">At least one character have to be lowercase</li>
                                        <li id="special">At least one special character</li>
                                        <li id="digit">At least one digit</li>
                                        <li id="length">Password lenght at least 8 chars</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group">
                                <input class="form-control" name="pass2word" id="pass2word" type="password" placeholder="Retype the Password you choose" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                            </div>
                            <div class="form-group">
                                <div class="zmovo-login-btns">
                                    <a href="#" onClick="changePassword('user');" class="zmovo-login-btn">Change Password</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Modal LOGIN -->

<style>
    .hint{
        font-size:10px;
        color:#9C1416;
    }
</style>

<script>
    function controlAndSend(){
        var form = document.getElementById('form1');
        for(var i=0; i < form.elements.length; i++){
          if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
            alert('There are some required fields!');
            return false;
          }
        }
        form.submit();
    }
</script>

@endsection
