<!DOCTYPE html>
<html class="dark">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/styles.css">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap">
        <link href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdn.datatables.net/2.3.1/css/dataTables.dataTables.css" />
    </head>
    <body>
        <?php
            if (isset($_GET["line"]) && $_GET["line"] != "") $selected_line = $_GET["line"];
            else $selected_line = null;
        ?>
        <div id="main-div">
            
            <div class="menu">
                <div class="header">
                    <span class="text xlarge bold special no-select">FindMyBus</span>
                </div>

                <div id="line-select" class="no-select"></div>
                
            </div>
            <div id="map"></div>

            <div class="menu">
                <div class="header">
                    <span class="text small no-select">Line</span>
                    <span class="text xlarge bold special no-select"><?php echo $selected_line?></span>
                </div>
                
                <div id="stats">
                    <div class="header sub">
                        <span class="text large bold no-select">General Info</span>
                    </div>
                    <div class="stats-container">
                        <ul>
                            <li><div class="space-between">
                                <span class="text">Type: </span><span id="line-type-display" class="text bold upper"></span>
                            </div><hr></li>

                            <li><div class="space-between">
                                <span class="text">Subtype: </span><span id="line-subtype-display"class="text bold upper"></span>
                            </div><hr></li>

                            <li><div class="space-between">
                                <span class="text">Vehicles type: </span><span id="line-veh-type-display" class="text bold upper"></span>
                            </div></li>
                        </ul>
                    </div>
                    
                    <div class="header sub" style="margin-top: 30px">
                        <span class="text large bold no-select">Active Vehicles</span>
                    </div>

                    <div class="stats-container">
                        <div style="color: white">
                            <table id="vehicle-table" class="stripe">
                                <thead class="text small special">
                                <tr>
                                    <th>ID</th>
                                    <th>MODEL</th>
                                    <th>NEXT STOP</th>
                                    <th>PUNCTUALITY</th>
                                </tr>
                                </thead>
                                <tbody id="vehicle-table-body">
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="stats-container">
                    </div>
                </div>
            </div>
        </div>


        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>

        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
        <script src="https://cdn.datatables.net/2.3.1/js/dataTables.js"></script>
        <script src="https://cdn.datatables.net/plug-ins/2.3.1/features/scrollResize/dataTables.scrollResize.min.js"></script>

        <script src="assets/scripts.js"></script>
    </body>
</html>