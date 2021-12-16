@extends('layout')

@section('content')

<!-- Modal LOGIN SESSION -->
<div style="max-width: 800px; margin-left: auto; margin-right:auto" role="document">
    <div class="modal-content" style="background-color: #00000099">
        <div class="zmovo-login-page">
            <div class="container">
                <div class="row">
                    <div class="zmovo-page-login mt-30">

                        <!-- Logo -->
                        <img src="/images/logoAengie.png">

                        <!-- Message -->
                        <div class="myAengie"><?= "Register to join the community" ?></div>
                        <div id="messaggio" class="c1"><?php "message" ?></div>

                        <form action="register" id="form1" autocomplete="off" method="post">
                            <div class="zmovo-login-input-top mt-30">

                                <!-- Username -->
                                <div class="form-group">
                                    <input class="form-control" name="username" required type="text" placeholder="<?= "Choose a Username" ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                                </div>

                                <!-- Email -->
                                <div class="form-group">
                                    <input class="form-control" name="email" required type="text" placeholder="<?= "A valid email where you will receive the auth code" ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                                </div>

                                <!-- Password 1 -->
                                <div class="form-group">
                                    <a href="#" onClick="showPass('password');return fale;">
                                        <i class="fas fa-eye showPass"></i>
                                    </a>
                                    <input class="form-control" id="password" name="password" required type="password" placeholder="<?= "Choose a Password" ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" onKeyUp="controlComplexity(this.value)">
                                    <div class="hint rosso">
                                        <ul>
                                            <li id="upper"><?= "At least one character have to be uppercase" ?></li>
                                            <li id="lower"><?= "At least one character have to be lowercase" ?></li>
                                            <li id="special"><?= "At least one special character" ?></li>
                                            <li id="digit"><?= "At least one digit" ?></li>
                                            <li id="length"><?= "Password lenght at least 8 chars" ?></li>
                                        </ul>
                                    </div>
                                </div>

                                <!-- Password 2 -->
                                <div class="form-group">
                                    <a href="#" onClick="showPass('pass2word');return fale;">
                                        <i class="fas fa-eye showPass"></i>
                                    </a>
                                    <input class="form-control" id="pass2word" name="pass2word" required type="password" placeholder="<?= "Retype the Password you choose" ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                                </div>

                                <!-- Geolocation -->
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-7 arancio" style="text-align: right; padding-top: 10px;">
                                            <label for="geolocation"><?= "Allow Geolocation?" ?></label>
                                        </div>
                                        <div class="col-5" style="text-align: left;">
                                            <label class="switch">
                                                <input type="checkbox" id="geolocation" name="geolocation" onClick="getLocation();checkBox(this.id)"><!-- Message = Lat/Lon -->
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="hint bianco"><?= "We use your geolocation to let you became a contributor, if you don't need it you can leave this checkbox unchecked, but if you want to be an Angie TV contributor is highly recomended to check this box; only in this way our community managers can see were you are and let you stream from your device! You can change this value in any moment from your settings area" ?></div>
                                </div>

                                <!-- Newsletters -->
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-7 arancio" style="text-align: right; padding-top: 10px;">
                                            <label for="no"><?= "Allow Newsletters?" ?></label>
                                        </div>
                                        <div class="col-5" style="text-align: left;">
                                            <label class="switch">
                                                <input type="checkbox" id="newsletter" name="newsletter" onClick="checkBox(this.id)">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="hint bianco"><?= "We could send you from times to times news about the creations of stations, or the contents of your favourite tv stations" ?></div>
                                </div>

                                <!-- Terms & Conditions -->
                                <!-- v1.6 -->
                                <!--<div class="form-group">
                                    <div class="row">
                                        <div class="col-7 arancio" style="text-align: right; padding-top: 10px;">
                                            <label for="terms"><?= "You're agree with our Terms And Conditions?" ?></label>
                                        </div>
                                        <div class="col-5" style="text-align: left;">
                                            <label class="switch">
                                                <input type="checkbox" id="terms" name="terms" requiredTrue onClick="checkBox(this.id)">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="hint bianco"><?= "If you need more details of our Terms and Conditions you can read this document:" ?>
                                        <a href="/termsandconditions" target="_blank"><?= "Terms and Conditions" ?></a>
                                    </div>
                                </div>-->

                                <!-- Privacy Policy -->
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-7 arancio" style="text-align: right; padding-top: 10px;">
                                            <label for="privacy"><?= "You're agree with our privacy policy?" ?></label>
                                        </div>
                                        <div class="col-5" style="text-align: left;">
                                            <label class="switch">
                                                <input type="checkbox" id="privacy" name="privacy" requiredTrue onClick="checkBox(this.id)">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="hint bianco"><?= "If you need more details of our privacy policy you can read this document:" ?>
                                        <a href="/privacy" target="_blank"><?= "Privacy Policy" ?></a>
                                    </div>
                                </div>

                                <!-- Invitation code -->
                                <div class="form-group">
                                    <input class="form-control" name="invitationCode"  type="hidden" placeholder="<?= "If you have one type here the invitation code" ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                                    <div class="zmovo-login-btns">
                                        <a href="#" onClick="controlAndSend('r');" class="zmovo-login-btn"><?= "Register" ?></a>
                                    </div>
                                </div>
                          </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal LOGIN -->

<style>
    .hint{
        font-size:10px;
        color:#9C1416;
    }
    .rosso{
        color: var(--red);
    }
    .arancio{
        color: var(--orange);
    }
    .bianco{
        color: var(--white);
    }
</style>

@endsection
