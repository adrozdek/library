$(document).ready(function() {

    $.ajax({
        url: './api/books.php',
        type: 'GET', //pobierz metodą get
        dataType: 'json',
        success: function (result) {
            console.log(result);
            $('#bookList').html('');
            for( var i =0; i < result.length; i++) {
                var newBook = $("<div class='title' id="+result[i].id+"><h2>" + result[i].title + " <button class='delete'>Usuń</button></h2></div> <div></div> </div><button class='show'>Pokaż szczegóły</button><hr />");
                $('#booksList').prepend(newBook);
            }

            $getClickS.text(++clickCountGetS);
            localStorage.setItem('clickCountGetS', clickCountGetS);

            $('button.delete').on('click', function() {

                $deleteClick.text(++clickCountDelete);
                localStorage.setItem('clickCountDelete', clickCountDelete);

                if(confirm("Jesteś pewny, że chcesz usunąć?")) {
                    var titleId = $(this).parent().parent().attr('id');
                    //samo confirm("Czy na pewno chcesz usunąć?") i tak wykona. trzeba dodać if

                    $.ajax({
                        url: './api/books.php',
                        type: 'DELETE',
                        data: 'id=' + titleId,

                        success: function () {
                            console.log("Sukcecs");
                            window.location.reload(true);

                            $deleteClickS.text(++clickCountDeleteS);
                            localStorage.setItem('clickCountDeleteS', clickCountDeleteS);
                        },
                        error: function () {
                            console.log("Eroor delete");

                            $deleteClickE.text(++clickCountDeleteE);
                            localStorage.setItem('clickCountDeleteE', clickCountDeleteE);
                        },
                        complete: function () {
                            console.log("Ukonczono ddelete");

                        }
                    });
                }
                else{
                    $deleteClickE.text(++clickCountDeleteE);
                    localStorage.setItem('clickCountDeleteE', clickCountDeleteE);

                    return false;
                }
            });


            $('button.show').on('click', function(){
                var idtytulu = $(this).prev().prev().attr('id');
                console.log(idtytulu);
                var moreInfo = $(this).prev();
                var thisButton = $(this);
                $(this).attr("disabled", true);   //nie będzie można kliknąć podczas ładowania

                if(!($(moreInfo).hasClass('moreInfo'))) {

                    $getClick.text(++clickCountGet);
                    localStorage.setItem('clickCountGet', clickCountGet);

                    if(idtytulu == 666){
                        alert("Książka zakazana. Nie można wyświetlić informacji!");
                        $(this).attr("disabled", false);

                        $getClickE.text(++clickCountGetE);
                        localStorage.setItem('clickCountGetE', clickCountGetE);
                    }
                    else {
                        $.ajax({
                            url: './api/books.php?id=' + idtytulu,
                            type: 'GET',
                            dataType: 'json',
                            success: function (result) {
                                console.log(result);

                                $getClickS.text(++clickCountGetS);
                                localStorage.setItem('clickCountGetS', clickCountGetS);

                                var valueInfo = $("<h3>Autor: </h3>" + result.author + "<h3>Opis: </h3>" + result.description + "<br /> <button class='edit'>Edytuj</button>");
                                $(moreInfo).append(valueInfo);
                                $(moreInfo).addClass('moreInfo');
                                $(thisButton).html('Mniej');
                                $(thisButton).attr("disabled", false);  //uaktywnia ponownie przycisk


                                $('button.edit').on('click', function (e) {
                                    $(this).attr('disabled', true);

                                    if (!($(this).hasClass('cancel'))) {
                                        $(this).html('Anuluj');
                                        var editForm = $('<div class="edit"><form action="books.php" method="PUT"><p><label>Nowy tytuł: </label><input type="text" name="editTitle" value="' + result.title + '"></p> <p><label>Nowy autor:</label><input type="text" name="editAuthor" value="' + result.author + '"></p> <p><label>Nowy opis: </label><textarea name="editDescription" cols="40" rows="5">' + result.description + '</textarea></p></form><button class="update">Zatwierdź</button></div>');
                                        $(this).before($(editForm));
                                        $(this).addClass('cancel');
                                        $(this).attr('disabled', false);

                                        $('button.update').on('click', function (e) {
                                            e.preventDefault();

                                            var newTitle = $('input[name=editTitle]').val();
                                            var newAuthor = $('input[name=editAuthor]').val();
                                            var newDescription = $("textarea[name='editDescription']").val();

                                            console.log(newAuthor);
                                            console.log(newTitle);

                                            $putClick.text(++clickCountPut);
                                            localStorage.setItem('clickCountPut', clickCountPut);

                                            if(newTitle.length > 1) {

                                                $.ajax({
                                                    url: './api/books.php',
                                                    type: 'PUT',
                                                    //contentType: "text/plain; charset=UTF-8",
                                                    data: 'id=' + idtytulu + '&title=' + newTitle + '&author=' + newAuthor + '&description=' + newDescription,
                                                    success: function (result) {
                                                        window.location.reload(true);

                                                        //zliczanie sukcesowych kliknięć:
                                                        $putClickS.text(++clickCountPutS);
                                                        localStorage.setItem('clickCountPutS', clickCountPutS);
                                                    },
                                                    error: function () {
                                                        console.log("Error w buttonie update");

                                                        $putClickE.text(++clickCountPutE);
                                                        localStorage.setItem('clickCountPutE', clickCountPutE);
                                                    },
                                                    complete: function () {
                                                        console.log("Button update ukończony");
                                                    }
                                                });
                                            }
                                            else{
                                                alert("Wypełnij poprawnie formularz edycji!");

                                                $putClickE.text(++clickCountPutE);
                                                localStorage.setItem('clickCountPutE', clickCountPutE);
                                            }
                                        });


                                    }
                                    else {
                                        $(this).html('Edytuj');
                                        $(this).prev().remove();
                                        $(this).removeClass('cancel');
                                        $(this).attr('disabled', false);
                                    }

                                });


                            },
                            error: function () {

                                $getClickE.text(++clickCountGetE);
                                localStorage.setItem('clickCountGetE', clickCountGetE);

                                console.log("Error button.show");
                            },
                            complete: function () {
                                console.log("Button show ukończony");



                            }
                        });
                    }



                }
                else{
                    $(this).prev().empty();
                    $(this).html('Pokaż szczegóły');
                    $(moreInfo).removeClass('moreInfo');
                    $(this).attr("disabled", false);    //uaktywnia przycisk
                }
            });
        },
        error: function (xhr) {
            alert(JSON.parse(xhr.responseText).Message);

            $getClickE.text(++clickCountGetE);
            localStorage.setItem('clickCountGetE', clickCountGetE);
        },
        complete: function () {
            console.log('zakończono request'); //to jest wykonywane zawsze

        }

    });


    $('.add').on('click', function(e) {
        e.preventDefault(); //zapobiega przejściu na books.php not found

        $postClick.text(++clickCountPost);
        localStorage.setItem('clickCountPost', clickCountPost);

        $(this).attr('disabled', true);
        var bookTitle = $('input[name="title"]').val();
        //console.log($('input[name="title"]').html());
        var bookAuthor = $('input[name="author"]').val();
        var bookDescription = $('textarea[name="description"]').val();

        if(bookTitle == '' || bookAuthor == '' || bookDescription == '') {
            $(this).attr('disabled', false);
            alert("Proszę poprawnie wypełnić formularz!");

            $postClickE.text(++clickCountPostE);
            localStorage.setItem('clickCountPostE', clickCountPostE);
        }
        else {
            var dataToSend = {};
            dataToSend.title = bookTitle;
            dataToSend.author = bookAuthor;
            dataToSend.description = bookDescription;


            $.ajax({
                url: 'api/books.php',
                type: 'POST',
                data: dataToSend,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    $(this).attr('disabled', false);

                    $postClickS.text(++clickCountPostS);
                    localStorage.setItem('clickCountPostS', clickCountPostS);

                    window.location.reload(true);  //odświeżenie strony
                },
                error: function () {
                    console.log("Błąd przy wysyłaniu formularza");

                    $postClickE.text(++clickCountPostE);
                    localStorage.setItem('clickCountPostE', clickCountPostE);

                },
                complete: function () {
                    console.log("Ukończono działania z formularzem");

                }

            });
        }

    });

    $('#booksList').after("<div class='put'>Liczba zapytań PUT: <span class='putClick'>0</span></div>");
    var clickCountPut = localStorage.getItem('clickCountPut');
    var $putClick = $('.putClick');
    $putClick.text(clickCountPut);

    $('div.put').after("<div class='putS'>Liczba zapytań PUT success: <span class='putClickS'>0</span> <br /> Liczba zapytań PUT error: <span class='putClickE'>0</span></div>");
    var clickCountPutS = localStorage.getItem('clickCountPutS');
    var $putClickS = $('.putClickS');
    $putClickS.text(clickCountPutS);

    var clickCountPutE = localStorage.getItem('clickCountPutE');
    var $putClickE = $('.putClickE');
    $putClickE.text(clickCountPutE);


    $('div.putS').after("<div class='delete'>Liczba zapytań DELETE: <span class='deleteClick'>0</span><br /> Liczba zapytań DELETE success: <span class='deleteClickS'>0</span> <br /> Liczba zapytań DELETE error: <span class='deleteClickE'>0</span></div>");
    var clickCountDelete = localStorage.getItem('clickCountDelete');
    var $deleteClick = $('.deleteClick');
    $deleteClick.text(clickCountDelete);

    var clickCountDeleteS = localStorage.getItem('clickCountDeleteS');
    var $deleteClickS = $('.deleteClickS');
    $deleteClickS.text(clickCountDeleteS);

    var clickCountDeleteE = localStorage.getItem('clickCountDeleteE');
    var $deleteClickE = $('.deleteClickE');
    $deleteClickE.text(clickCountDeleteE);


    $('div.delete').after("<div class='post'> Liczba zapytań POST: <span class='postClick'>0</span> <br /> Liczba zapytań POST success: <span class='postClickS'> 0 </span> <br /> Liczba zapytań POST error: <span class='postClickE'>0</span></div>");
    var clickCountPost = localStorage.getItem('clickCountPost');
    var $postClick = $('.postClick');
    $postClick.text(clickCountPost);

    var clickCountPostS = localStorage.getItem('clickCountPostS');
    var $postClickS = $('.postClickS');
    $postClickS.text(clickCountPostS);

    var clickCountPostE = localStorage.getItem('clickCountPostE');
    var $postClickE = $('.postClickE');
    $postClickE.text(clickCountPostE);


    $('div.post').after("<div class='get'> Liczba zapytań GET: <span class='getClick'>0</span> <br /> Liczba zapytań GET success: <span class='getClickS'> 0 </span> <br /> Liczba zapytań GET error: <span class='getClickE'>0</span></div>");
    var clickCountGet = localStorage.getItem('clickCountGet');
    var $getClick = $('.getClick');
    $getClick.text(clickCountGet);

    var clickCountGetS = localStorage.getItem('clickCountGetS');
    var $getClickS = $('.getClickS');
    $getClickS.text(clickCountGetS);

    var clickCountGetE = localStorage.getItem('clickCountGetE');
    var $getClickE = $('.getClickE');
    $getClickE.text(clickCountGetE);
    
});