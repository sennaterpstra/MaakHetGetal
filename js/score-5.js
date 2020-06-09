/*
 * FC-Sprint2 project => score.js
 *
 * The project "diglin.eu" is property of FC-Sprint2
 *
 * Created at:
 * 30-nov-2016 @ 9:49:36
 *
 * Created by:
 * Andries van Weeren
 * a.weeren@fcroc.nl
 */


/**
 *  var s = new SCORE([ID]/[CLASS]);
 *  (object) target is the element on which the score will be displayed
 */
function SCORE(target) {
    var self = this;
    self.right = 0;
    self.wrong = 0;
    

    /**
     *	If tagert is set initiate SCORE on target-element(s)
     */
    self.init = function (right, wrong) {
        self.right = right || 0;
        self.wrong = wrong || 0;

        target = target || null;
        if (target !== null) {
            var style = $('<style/>').attr('type', 'text/css').html(target + ' .inline{display: inline-block;}' + target + ' .symbol{margin: 0px 10px;}');
            $('head').append(style);

            $(target).html('');
            var rightInner = $('<div/>').addClass('rightInner inline').html(self.right);
            var iCheck = $('<i/>').addClass('fas fa-check');
            var rightOuter = $('<div/>').addClass('symbol inline').append(iCheck);

            var wrongInner = $('<div/>').addClass('wrongInner inline').css('margin-left', '10px').html(self.wrong);
            var wrontOuter = $('<div/>').addClass('symbol inline').append($('<i/>').addClass('fas fa-times'));

            var right = $('<div/>').attr('id', 'right').addClass('inline text-success').append(rightInner, rightOuter);
            var wrong = $('<div/>').attr('id', 'wrong').addClass('inline text-danger').append(wrongInner, wrontOuter);
            $(target).append(right, ' | ', wrong).css('font-size', '2.0em');
        }

    };

    /**
     *	Adds 1 to self.right
     */
    self.addRight = function () {
        self.right++;
        $('.rightInner').html(self.right);
    };

    /**
     *	Adds 1 to self.wrong
     */
    self.addWrong = function () {
        self.wrong++;
        $('.wrongInner').html(self.wrong);
    };

    /**
     *	Resets SCORE
     */
    self.reset = function (right, wrong) {
        right = right || 0;
        wrong = wrong || 0;
        self.init(right, wrong);
    };

    self.init();
}
