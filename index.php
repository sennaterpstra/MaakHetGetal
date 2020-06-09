<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="keywords" content="rekenen, Maak_het_getal, sommen, plus, basisschool, onderwijs, onderwijsspel">
        <meta name="description" content="Reken spel | Maak het getal! | Kies de juiste 2 getallen die samen het antwoord maken | Plus sommen |">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>RekenenMaakHetGetal</title>
        <!--Bootstrap-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <!--Overige-->
        <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/6.2.2/math.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet">
        <!--javascript/css files-->
        <link type="text/css" rel="stylesheet" href="css/stijl.css">
        <script type="text/javascript" src="js/score-5.js"></script>
        <script type="text/javascript" src="js/timer-5.js"></script>
        <script type="text/javascript" src="js/unStringify.js"></script>
        <script type="text/javascript" src="js/all.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        </script>
        <script type="text/javascript">
            $(document).ready(function()
            {
                // hier wordt de klasse aangeroepen die verantwoordelijk is voor de frontend
                var EX = new getExercise();
            });
        </script>
    </head>
    <body>
        <div class="navigation">
        </div>
        <div class="container containerCustom">
            <div class="row">
                <div id="exercise" class="maxEx col-xs-12 col-sm-12 col-md-12">
                    <div class="card border-primary mb-3" style="max-width: 156rem;">
                        <div class="card-header text-black bg-primary">
                            <div class="row">
                                <div id="start" class="col-md-3 text-left start" onclick="startGame()"></div>
                                <div id="timescore" class="col-md-6 text-center timescore"></div>
                                <div id="sum" class="col-md-3 text-right sum"></div>
                            </div>
                        </div>
                        <div id="container" class="card-body">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>