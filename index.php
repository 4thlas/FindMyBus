<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/styles.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap">
        <link href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" rel="stylesheet"/>
    </head>
    <body>
        <div id="main-div">
            <div id="map">

            </div>

            <div id="line-select-box" class="gradient-border">
                <span class="text">Select your line:</span>
                <form method="GET" action="index.php">
                    <select name="line-select" id="line-select" class="text large bold special">
                        <option value="volvo">11</option>
                        <option value="saab">86</option>
                        <option value="mercedes">12</option>
                        <option value="audi">542</option>
                    </select>
                </form>
            </div>

            <div id="stats">
                <div id="stats-table">

                </div>
                
                <div id="stats-chart">

                </div>
            </div>
        </div>


        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>

        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>

        <script src="assets/scripts.js"></script>
    </body>
</html>