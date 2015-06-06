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

        $('.buttonQuestion.action').on('click', function () {
            var respuesta = $(this).html();

            if (self._questions[self._currentQuestion].Correct === respuesta) {

            } else {
                
            }

            self._showPopup();
        });

        $('#jugar').on('click', function () {
            $('#juego').show();
            $('#inicio').hide();

            self.userInfo = {
                edad: parseInt($('#edad').val(), 10),
                nombre: $('#nombre').val(),
                preferencia: parseInt($('#gustos').val(), 10),
                sexo: parseInt($('#sexo').val(), 10)
            };1

            self.showQuestion();
        });

        $('#tips').on('click', function () {
            $('#tips').hide();
            self.next();
        });

        $('#juego').hide();
        $('#inicio').show();
    };

    m.prototype._showPopup = function () {
        var self = this;
        $('#tips').html(self._questions[self._currentQuestion].Tips);
        $('#tips').show();
    };

    m.prototype.next = function () {
        var self = this;

        self._currentQuestion++;

        if (this._currentQuestion < self._questions.length) {
            this.showQuestion();
        } else {
            this.endGame();
        }
    };

    m.prototype.endGame = function () {
        var self = this;

        $.ajax({
            url: '/home/setData',
            type: "POST",
            data: self.userInfo,
            async: true,
            success: function (result) {
                $('#juego').hide();
                $('#endWin').show();
            },
            error: function (err) {
                alert('Paso algo malo');
            }
        });
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