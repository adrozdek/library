<?php

require_once("../src/connections.php");


if($_SERVER['REQUEST_METHOD'] == 'GET' && !(isset($_GET['id']))) {
    $allBooks = Book::LoadFromDB();
//var_dump($allBooks);
    echo json_encode($allBooks);
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])) {
    $oneBook = Book::LoadFromDB($_GET['id']);

    echo json_encode($oneBook);
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $book = Book::CreateBook(($_POST['title']), ($_POST['author']), ($_POST['description']));

    echo json_encode($book);
}

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    parse_str(file_get_contents("php://input"),$put_vars);

    //echo($put_vars['id']);
    $update = Book::UpdateBook($put_vars['id'], $put_vars['title'], $put_vars['author'], $put_vars['description']);

    //echo json_encode($book);
    //nie działa update. 500 internal server error:
    //$book->update($title, $author, $description);


}

if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    echo("DELETE");
    parse_str(file_get_contents("php://input"),$del_vars);

    Book::DeleteFromDB($del_vars['id']);

}





/*
$json = json_encode(utf8_encode( $allBooks ));

echo $json;

var_dump($json);

var_dump(json_encode(utf8_encode( $allBooks )));

var_dump(json_encode( htmlspecialchars( utf8_encode( $allBooks ) ) ));

var_dump(json_last_error());

var_dump(json_last_error_msg());

*/



?>