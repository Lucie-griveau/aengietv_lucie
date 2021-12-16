<nav class="navbar navbar-expand-lg navbar-light c2-bg" style="margin-top: 45px;">
    <div class="container">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="<?= "Toggle navigation" ?>">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item">
                    <a class="nav-link" href="#" onClick="filter('<?= strtolower("SPORT") ?>'); return false"><?= "SPORT" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter('<?= strtolower("NEWS") ?>'); return false"><?= "NEWS" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter('<?= strtolower("MUSIC") ?>'); return false"><?= "MUSIC" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter('<?= strtolower("INDUSTRY") ?>'); return false"><?= "INDUSTRY" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter('<?= strtolower("RELIGION") ?>'); return false"><?= "RELIGION" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter('<?= strtolower("POLITICS") ?>'); return false"><?= "POLITICS" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter('<?= strtolower("FASHION") ?>'); return false"><?= "FASHION" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter('<?= strtolower("CITIZENSHIP") ?>'); return false"><?= "CITIZENSHIP" ?></a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#"  onClick="filter(''); return false"><?= "ALL" ?> <span class="sr-only">(<?= "current" ?>)</span></a>
                </li>
            </ul>
        </div>
    </div>
</nav>
