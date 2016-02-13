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

            $('button.delete').on('click', function() {

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
                        },
                        error: function () {
                            console.log("Eroor delete");
                        },
                        complete: function () {
                            console.log("Ukonczono ddelete");
                        }
                    });
                }
                else{
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

                    $.ajax({
                        url: './api/books.php?id=' + idtytulu,
                        type: 'GET',
                        dataType: 'json',
                        success: function (result) {
                            console.log(result);
                            var valueInfo = $("<h3>Autor: </h3>" + result.author + "<h3>Opis: </h3>" + result.description + "<br /> <button class='edit'>Edytuj</button>");
                            $(moreInfo).append(valueInfo);
                            $(moreInfo).addClass('moreInfo');
                            $(thisButton).html('Mniej');
                            $(thisButton).attr("disabled", false);  //uaktywnia ponownie przycisk


                            $('button.edit').on('click', function(){
                                $(this).attr('disabled', true);

                                if(!($(this).hasClass('cancel'))) {
                                    $(this).html('Anuluj');
                                    var editForm = $('<div class="edit"><form action="books.php" method="PUT"><p><label>Nowy tytuł: </label><input type="text" name="editTitle" value="'+result.title+'"></p> <p><label>Nowy autor:</label><input type="text" name="editAuthor" value="' +result.author+ '"></p> <p><label>Nowy opis: </label><textarea name="editDescription" cols="40" rows="5">'+result.description+'</textarea></p></form><button class="update">Zatwierdź</button></div>');
                                    $(this).before($(editForm));
                                    $(this).addClass('cancel');
                                    $(this).attr('disabled', false);

                                    $('button.update').on('click', function(e){

                                        var newTitle = $('input[name=editTitle]').val();
                                        var newAuthor = $('input[name=editAuthor]').val();
                                        var newDescription = $("textarea[name='editDescription']").val();

                                        console.log(newAuthor);
                                        console.log(newTitle);

                                        $.ajax({
                                            url: './api/books.php',
                                            type: 'PUT',
                                            //contentType: "text/plain; charset=UTF-8",
                                            data: 'id=' + idtytulu + '&title=' + newTitle + '&author=' + newAuthor + '&description=' + newDescription,
                                            success: function (result) {
                                                window.location.reload(true);
                                                //console.log("Put ukończone sukcesem");
                                                //console.log(result);
                                            },
                                            error: function (){
                                                console.log("Error w buttonie update");

                                            },
                                            complete: function (){
                                                console.log("Button update ukończony");

                                            }

                                        });
                                    });


                                }
                                else{
                                    $(this).html('Edytuj');
                                    $(this).prev().remove();
                                    $(this).removeClass('cancel');
                                    $(this).attr('disabled', false);
                                }

                            });


                        },
                        error: function () {
                            console.log("Error button.show");
                        },
                        complete: function () {
                            console.log("Button show ukończony");
                        }
                    });



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
        },
        complete: function () {
            console.log('zakończono request'); //to jest wykonywane zawsze
        }

    });


    $('.add').on('click', function(e) {

        $(this).attr('disabled', true);
        var bookTitle = $('input[name="title"]').val();
        //console.log($('input[name="title"]').html());
        var bookAuthor = $('input[name="author"]').val();
        var bookDescription = $('textarea[name="description"]').val();

        if(bookTitle == '' || bookAuthor == '' || bookDescription == '') {
            $(this).attr('disabled', false);
            alert("Proszę poprawnie wypełnić formularz!");
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
                    window.location.reload(true);  //odświeżenie strony
                },
                error: function () {
                    console.log("Błąd przy wysyłaniu formularza");

                },
                complete: function () {
                    console.log("Ukończono działania z formularzem");

                }

            });
        }

    });




});