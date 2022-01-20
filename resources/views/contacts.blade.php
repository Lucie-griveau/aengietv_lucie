@extends('layout')

@section('content')

<!-- Modal LOGIN SESSION -->

<div class="modal-dialog modal-dialog-centered" style="max-width: 1366px;" role="document">
    <div class="modal-content" style="background-color: #00000099">
        <div class="container">
            <div class="row">
                <div class="zmovo-page-login mt-30"> <img src="/images/logoAengie.png">
                    <form id="comment_form" action="" method="post" >
                        <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response">
                        <input type="hidden" name="action" value="validate_captcha">
                        <div class="zmovo-login-input-top mt-30">
                            <label for="station"><?= "Subject" ?></label>
                            <div class="form-group">
                                <select class="form-control" name="subject" id="subject">
                                    <option value=""><?= "Select Subject" ?></option>
                                    @foreach($allCategories as $categorie)
                                    <option value=" {{ $categorie->category }}">{{ $categorie->category }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="message"><?= "Message" ?></label>
                                <textarea id="message"></textarea>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="zmovo-login-btns">
                                        <a id="sendBtn" href="#" onClick="" class="zmovo-login-btn"><?= "Send Support Request" ?></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal LOGIN-->

@endsection
