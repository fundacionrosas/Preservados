var main = (function () {

    var m = function () {
        this._currentQuestion = 0;
        this._init();
    };

    m.prototype._init = function () {
        var self = this;

        $.ajax({
            url: '/home/getquestions',
            type: "GET",
            async: false,
            success: function (result) {
                self._questions = result;
            },
            error: function (err) {
                alert('Paso algo malo');
            }
        });

        $('.buttonQuestion').on('click', function () {
            var respuesta = $(this).html();

            if (self._questions[self._currentQuestion].Correct === respuesta) {
                alert('Le pegaste');
                self.next();
            } else {
                alert('Nada vieja!');
            }
        });

        self.showQuestion();
    };

    m.prototype.next = function () {
        this._currentQuestion++;
        this.showQuestion();
    };

    m.prototype._sendAnswer = function () {

    };

    m.prototype.showQuestion = function () {
        var self = this;

        $('#title').html(self._questions[self._currentQuestion].Title);

        for (var i = 0; i < self._questions[self._currentQuestion].Questions.length; i++) {
            var q = self._questions[self._currentQuestion].Questions[i];
            var html = $('#q' + i);
            
            if (q !== null) {    
                html.show();
                html.html(q);
            } else {
                html.hide();
            }

        }

    };

    return m;
}());