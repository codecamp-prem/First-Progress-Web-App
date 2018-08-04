<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sky-High Airport Arrivals</title>
    <link rel="manifest" href="./manifest.json">
    <link async rel="stylesheet" href="./css/style.css">
    <link href="//fonts.googleapis.com/css?family=Roboto:300,600,300italic,600italic" rel="stylesheet" type="text/css">
</head>

<body>
    <header>
        <div class="content">
            <h3>Arrivals</h3>
        </div>
    </header>
    <div class="container">
        <div id="main" class="content">
            <ul class="arrivals-list" data-bind="foreach: arrivals">
                <li class="item">
                    <span class="title" data-bind="html: title"></span>
                    <span class="status" data-bind="html: status"></span>
                    <span class="time" data-bind="html: time"></span>
                </li>
            </ul>
        </div>
    </div>
    <script src="js/jquery.min.js"></script>
    <script src="js/knockout-3.4.2.js"></script>
    <script src="js/index.js"></script>
    <!-- <script src="js/page.js"></script>
    <script src="js/main.js"></script>
    <script src="js/sw.js"></script> -->
</body>
</html>
