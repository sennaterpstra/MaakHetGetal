/*  
    Dit is de klasse die zowel wordt gebruikt door de frontend als de backend/CMS
*/
class all
{
	constructor()
	{
        /*
            Deze variabele bevat een reguliere expressie. 
            Hiermee kun je testen of een een string een letter bevat. 
            Bijvoorbeeld:
            'ik heet jan' --> true
            ' - -$#@    - - __' --> false
            '' --> false
            Dit is handig als je een invulveld wil valideren 
        */
        this.SOME = new RegExp(/[A-Za-zÀ-ÿ]/g);
	}

	id(t)
    {
        /*
            Hier wordt een id uitgelezen, en teruggegeven als een integer
            bijvoorbeeld #btn_5 wordt dan 5.
            Ook is er de mogelijkheid om multylayered ids uit te lezen, en dan wordt er een array teruggegeven
            bijvoorbeeld #btn_2_5 wordt dan [2,5].
            Deze functie wordt door zowel de frontend als de backend (veel) gebruikt
        */

        var ar = ($(t).attr('id') !== undefined) ? $(t).attr('id').split('_') : t.split('_');
        var ar2 = [];
        for(let i = 1; i < ar.length; i++)
        {
            ar2.push(parseInt(ar[i]));
        }
        if(ar2.length < 2)
        {
            return ar2[0];
        }
        else
        {
            return ar2;
        }
    }

    getUrlParameter(sParam)
    {
        /*
            Hier worden url variabelen uitgelezen 
        */
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++)
        {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam)
            {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
}