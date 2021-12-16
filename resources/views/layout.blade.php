<!DOCTYPE html>
<html lang="en">
<head>

    @include('/include/head')
    @yield('css-optionnal')

</head>
<body>

    @include('/include/header')

    <div class="zmovo-main dark-bg">



        @yield('content')

    </div>

    @include('/include/footer')
    @include('/include/footerScripts')

</body>
</html>
