@extends('layout')

@section('css-optionnal')
<link href="{{ asset('/styles/homepage.css') }}" rel="stylesheet" type="text/css" />
@endsection

<?php

// Main video of the HomePage
$mainVideo = "/videos/url/Ut4M2021_LeChallenge160.mp4";

// Tutorial Video for the Contributor
$tutorialContributor = "/videos/url/MAE.mp4";

//  Tutorial Video for the Station Owner
$tutorialSO = "/videos/url/aengietvTeaser3.mp4";

?>

@section('content')

<video class="mainVideo" width="100%" height="auto" controls alt="">
    <?php echo '<source src= "'.$mainVideo.'">' ?>
</video>

    <b class="title center c1">
        <?= "\"With AEngie TV, the audience contributes to the success of the media coverage and therefore to the success of the event\"" ?>
        <i>- Ottavio Carparelli, CEO </i></br><br/>
    </b>


    <div class="actuality center">

        <b class="title"><?= "Actuality" ?></b>

        <div class="actualitySubTitle">
            <!-- ACTUALITY PICTURE -->
            <img class="actualityPicture" src="/image/logoAengie.png" alt="" />
            <li><?= "Mustang AEngie was invited to the French Outdoor Awards" ?> </li>
        </div>
        <div class="actualityDescription zmovo-blog-dec-contents">
            <?= "Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Deserunt aut ipsum vitae aliquid repellat praesentium veritatis pariatur harum odio excepturi!
            Repudiandae adipisci fugit aut vero,
            consectetur tempore nesciunt dignissimos exercitationem." ?>

                <div class="zmovo-create-btns">
                    <a href="#" onClick="controlAndSend('r');" class="zmovo-send-btn"><?= "Read More" ?></a>
                </div>
        </div>
    </div>



    <div class="becomeContributor">
        <div class="contributorDescription center">
            <h5 class="title center">
                <?= "Become more than a spectator"?>
            </h5>
            <div class=".zmovo-v-list-content">
                <li><b><?= "Contribute to an event with your own video" ?></b> </li>
                <li><b><?= "Access to a  large choice of channel" ?></b> </li>
                <li><b><?= "Save your own video in your Library" ?></b> </li>
                <div class="zmovo-create-btns">
                    <a href="register.php" onClick="controlAndSend('r');" class="zmovo-send-btn"><?= "Create An Account" ?></a>
                </div>
            </div>
        </div>
        <!-- CONTRIBUTOR TUTORIAL VIDEO -->
        <video class="tutorial"  controls style="max-width:100%;height: 240px;">
            <?php echo '<source src= "'.$tutorialContributor.'">' ?>
        </video>
    </div>




    <div class="becomeSO">

            <div class="sODescription center">
                <h5 class="title center">
                    <?= "You want to Broadcast your event ?"?>
                </h5>
                <div class=".zmovo-v-list-content">
                    <li><b><?= "Control you own channel with our team supervision" ?></b></li>
                    <li><b><?= "Imply your community in your event" ?></b> </li>
                    <li><b><?= "Promote your activity with Social TV 3rd generation" ?></b></li>
                    <div class="zmovo-contact-btns">
                        <a href="#" onClick="showForm();" class="zmovo-send-btn"><?= "Contact us !" ?></a>
                    </div>
                </div>
            </div>

                <!-- CONTACT FORMULAR -->
                <form id="formElement" style="display: none;">
                    <div class="form-group">
                        <input class="form-control" name="Subject" required type="text" placeholder="<?= "what is the subject ?" ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                    </div>
                    <div class="form-group">
                        <input class="form-control" name="email" required type="text" placeholder="<?= "A valid email " ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                    </div>
                    <div class="form-group">
                        <input class="form-control" name="question" required type ="text" placeholder="<?= "type your text please" ?>" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');">
                    </div>
                    <div class="zmovo-send-btns">
                        <a href="#" onClick="controlAndSend('r');" class="zmovo-send-btn"><?= "Send" ?></a>
                    </div>
                    <button type="button" class="zmovo-cancel-btns" onclick="closeForm()"><?= "Close" ?></button>
                </form>

            <!-- STATION OWNER TUTORIAL VIDEO -->
            <video class="tutorial" controls style="max-width:100%;height:240px;">
                <?php echo '<source src= "'.$tutorialSO.'">' ?>
            </video>
    </div>

    <script type="text/javascript">
        function showForm() {
            document.getElementById("formElement").style.display = "block";
        }
        function closeForm() {
        document.getElementById("formElement").style.display = "none";
        }
    </script>

@endsection
