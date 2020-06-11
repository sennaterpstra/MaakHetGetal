/*  
    Hier wordt de klasse gedefinieerd die verantwoordelijk is voor de frontend, 
    deze klasse neemt properties en methods over van de klasse all, zowel de frontend als de beackend/CMS maken gebruik van deze klasse
*/
class getExercise extends all
{
    constructor()
	{
		/*
            Hier wordt de constructor function uitgevoerd dit wordt altijd gedaan als de klasse word aangeroepen,
            vanuit hieruit worden de andere functies uitgevoerd. In de constructor worden ook alle variabelen 
            aangemaakt die gelden binnen de gehele klasse. Deze variabelen worden gedefinieerd met this. aan het begin en geen var 
            Hetzelfde geldt voor functies die vanuit de constructor worden aangeroepen
        */
        super(); // Deze functie is nodig als je dingen wilt over erven van een andere klasse
        this.answer = 25;
        this.exerciseIndex = 0;
        this.clickCount = 0;
        this.exercises;
        this.totalNumbers = [];
    	this.LANGUAGE;
        this.sumString = '';
        this.SOMETHING = 'aap';
        this.total = 36;
        this.number1;
        this.answer = parseInt(this.getUrlParameter('start'));
        this.start = (this.getUrlParameter('start') !== undefined) ? parseInt(this.getUrlParameter('start')) : 1;
        this.arithmetic = (this.getUrlParameter('option') === 'm' || this.getUrlParameter('option') === 'M') ? '-' : '+';
        this.answers = (this.getUrlParameter('answers') === 'p' || this.getUrlParameter('answers') === 'P') ? 'positive' : 'negative';
        this.ready();
	}

    ready()
    {
        var s = this; 
        s.eventFunctions();
        s.createGrid();
        s.setHeader();
    }

    setHeader()
    {
        var s = this;

        s.answer = s.generateAnswer();

        //Start button
        var start = $('<a/>',{
            class: 'btn btn-light btn-block centered',
            style: "cursor: pointer"
        });

       //Timer en score
        var timescore = $('<a/>',{
            'class': 'btn btn-light btn-block centered no-click'
        });

        var row = $('<div>',{
            'class': 'row'
        }).appendTo(timescore);

        var div = $('<div>',{
            'class': 'col-md-12'
        }).appendTo(row);

        //Som
        var sumPlace = $('<a/>',{
            'class': 'btn btn-light btn-block centered no-click'
        });

        var row = $('<div>',{
            'class': 'row'
        }).appendTo(sumPlace);

        var getal1 = $('<div>',{
            'class': 'getal1'
        }).appendTo(row);

        var arithmetic = $('<div>',{
            'class': 'arithmetic',
            'value': '+'
        }).appendTo(row);

        var getal2 = $('<div>',{
            'class': 'getal2'
        }).appendTo(row);

        var equalsign = $('<div>',{
            'class': 'equalsign',
            'value': '='
        }).appendTo(row);

        var answer = $('<div>',{
            'class': 'answer'
        }).appendTo(row);


        $(div).append("<div class='timer'></div>");
        $(div).append("<div class='score' class='text-center'></div>");
        $(start).append("<i class='fas fa-play fa-3x'></i>");

        $('#sum').append(sumPlace);
        $('#start').append(start);
        $('#timescore').append(timescore);

        s.score = new SCORE('.score');
        s.timer = new TIMER('.timer'); 
    }

    createGrid()
    {
        var s = this;

        var table = $('<table/>',{
            class : 'mx-auto',
            id: 'table'
        });

        var count = s.start - 1;
        var maxX = Math.ceil(Math.sqrt(s.total));
        var maxY = Math.ceil(Math.sqrt(s.total));
        var c = 0;
        var toBeShuffled = [];
        for(let y = 0; y < maxX; y++)
        {
            for(let x = 0; x < maxY; x++)
            {
                count++;
                c++;
                if(c <= s.total)
                {
                    toBeShuffled.push(count);
                    s.totalNumbers.push(count);
                }
            }
        }
        toBeShuffled = s.shuffleArray(toBeShuffled);
        c = -1;
        if(screen.width < 500)
        {
            var maxY = Math.floor(screen.width / 70) - 1;
            var maxX = 36 / maxY;
        }
        for(let y = 0; y < maxX; y++)
        {
            var tr = $('<tr/>').appendTo(table);
            for(let x = 0; x < maxY; x++)
            {
                c++;
                if(c <= s.total)
                {
                    var td = $('<td/>').appendTo(tr);
                    var button = $('<button/>',{
                        'class': 'btn btn-light numbtn no-click col',
                        'id': 'numbtn_' + toBeShuffled[c]
                    }).append(toBeShuffled[c]).appendTo(td);
                }
            }
        }
        $('#container').append(table);

        var cardwidth = $('#container').width();
    }

    startGame()
    {
        var s = this;
        $('.numbtn').removeClass('no-click');
        $('.answer').html(s.answer);
        s.setSumEmpty();
        s.timer.start();
    }

    generateAnswer()
    {
        var s = this;
        var newArray = s.shuffleArray(s.totalNumbers);
        if(s.arithmetic === '+')
        {
            var newSom = newArray[0] + newArray[1];
        }
        else if(s.arithmetic === '-')
        {
            var newSom = newArray[0] - newArray[1];
            //Alleen positieve antwoorden
            if(s.answers === 'positive')
            {
                if(newArray[0] < newArray[1])
                {
                    var newSom = newArray[1] - newArray[0];
                }
            }
        }
        return newSom;
    }

    checkAnswer()
    {
        var s = this;
        var answer = s.answer;
        if(answer === math.evaluate(s.sumString))
        {
            s.rightAnswer();
        }
        else if(answer != math.evaluate(s.sumString))
        {
            s.wrongAnswer();
        }    
    }

    wrongAnswer()
    {
        var s = this;
        var sumArray = s.makeSumArray(s.sumString);
        for(let i = 0; i < sumArray.length; i += 2)
        {
            $('#numbtn_' + sumArray[i]).removeClass('btn-light').addClass('btn-danger').addClass('shadow-none');
            setTimeout(function(){
            $('#numbtn_' + sumArray[i]).removeClass('btn-danger').addClass('btn-light');
          }, 500);  
        }
        s.clickCount = 0;
        s.sumString = '';
        s.score.addWrong();
        setTimeout(function(){
        s.setSumEmpty();
        }, 500)
    }

    rightAnswer()
    {
        var s = this;
        var sumArray = s.makeSumArray(s.sumString);
        for(let i = 0; i < sumArray.length; i += 2)
        {
            $('#numbtn_' + sumArray[i]).removeClass('btn-light').addClass('btn-primary').addClass('no-click').addClass('shadow-none');
            var goodIndex = s.totalNumbers.indexOf(parseInt(sumArray[i]));
            s.totalNumbers.splice(goodIndex,1);
        }
        s.clickCount = 0;
        s.sumString = '';
        s.score.addRight();
        if(s.totalNumbers.length === 0)
        {
            s.endGame();
        }
        else
        {
            setTimeout(function(){
            s.setSumEmpty();
            s.answer = s.generateAnswer();
            $('.answer').html(s.answer);
            }, 500)
        }
    }

    setSumEmpty()
    {
        var s = this;
        $('.getal1').html('&nbsp; ? &nbsp;');
        $('.arithmetic').html(s.arithmetic);
        $('.getal2').html('&nbsp; ? &nbsp;');
        $('.equalsign').html('= &nbsp;');
    }

    endGame()
    {
        var s = this;
        
        s.timer.stop(); 
        $('.getal1').html('');
        $('.arithmetic').html('');
        $('.getal2').html('');
        $('.equalsign').html('');
        $('.answer').html('EINDE!');
    }

	eventFunctions()
	{
		/*
            Hier wordt een functie aangeroepen waaruit alle functies die vanuit events(mouseevents inputinevents) 
            worden aangeroepen gedefieerd.
        */
        var s = this;
        
        //start en restart
        $(document).on('click','.start a',function()
        {
            if($(this).find('.fa-play').hasClass('fa-play'))
            {
                $(this).html('<i class="fas fa-redo fa-4x"></i>');
                s.startGame();
            }
            else if($(this).find('.fa-redo').hasClass('fa-redo'))
            {
                $(this).html('<i class="fas fa-play fa-3x"></i>');
                window.location.reload();
            }
        });
        //numbtn
        $(document).on('click', '.numbtn',function()
        {
            var number = parseInt($(this).html());
            s.clickCount++;
            //1e blokje aanklikt.
            if(s.clickCount === 1)
            {
                s.number1 = parseInt($(this).html());
                s.sumString += number + s.arithmetic;
                $('.getal1').html('&nbsp;' + number + '&nbsp;');
                $('#numbtn_' + number).removeClass('shadow-none');
            }
            //2e blokje aanklikt.
            else if(s.clickCount === 2)
            {
                if(s.number1 === number)
                {
                    var sumArray = s.makeSumArray(s.sumString);
                    for(let i = 0; i < sumArray.length; i += 2)
                    {
                        $('#numbtn_' + sumArray[i]).addClass('shadow-none');
                    }
                    s.sumString += number;
                    $('.getal2').html('&nbsp;' + number + '&nbsp;');
                    s.setSumEmpty();
                    s.sumString = '';
                    s.clickCount = 0;
                }
                else
                {
                    s.sumString += number;
                    $('.getal2').html('&nbsp;' + number + '&nbsp;');
                    s.checkAnswer();
                }
            }
        });
        $(document).on('click','#button',function(e)
        {
            console.log(s.SOMETHING);
        });

        var width = $(window).width();
        $(window).on('resize', function() {
          if ($(this).width() != width) {
            width = $(this).width();
            $('#table').remove();
            s.createGrid();
          }
        });
	}

    shuffleArray(a)
    {
        for (let i = a.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    makeSumArray(str)
    {
        var ar = str.match(/([-]?[0-9]*[\.]?[0-9]+)|([\-\(\)\^\*\+\/\×x\÷\:\=])/g);
        var arra = [];
        for(let i = 0; i < ar.length; i++)
        {
            if(/[-][0-9]*[\.]?[0-9]+/g.test(ar[i]))
            {
                if(ar[i - 1] !== undefined)
                {
                    var l = ar[i - 1][ar[i - 1].length -1];
                    if(/\)|x|[0-9]/g.test(l))
                    {
                        var real = ar[i].match(/\-|[0-9]*[\.]?[0-9]+/g);
                        for(let j = 0; j < real.length; j++)
                        {
                            arra.push(real[j]);
                        }
                    }
                    else
                    {
                        arra.push(ar[i]);
                    }
                }
                else
                {
                    arra.push(ar[i]);
                }
            }
            else
            {
                arra.push(ar[i]);
            }
        }
 
        return arra;
    }
}