<?php

class Book {
    static private $connection = null;

    static public function SetConnection(mysqli $newConnection) {
        Book::$connection = $newConnection;
    }

    static public function CreateBook($title, $author, $description){
        $sql = "INSERT INTO Books(title, author, description) VALUES('$title','$author', '$description')";
        $result = self::$connection->query($sql);

        if($result == TRUE){
            $newBook = new Book(self::$connection->insert_id, $title, $author, $description);
            return $newBook;
        }
        else{
            return false;
        }

    }

    static public function LoadFromDB($id = null) {
        if (is_null($id)) {
            //pobieram all
            $sql = "SELECT * FROM Books";
            $result = self::$connection->query($sql);

            if ($result == true) {
                if ($result->num_rows > 0) {
                    $ret = [];
                    while ($row = $result->fetch_assoc()) {
                        //$newBook = new Book($row['id'], $row['title'], $row['author'], $row['description']);
                        $ret[] = $row;
                        //var_dump($row);
                    }
                }
                return $ret;
            }
        } else {
            $sql = "SELECT * FROM Books WHERE id = $id";
            $result = self::$connection->query($sql);

            if ($result == true) {
                if ($result->num_rows == 1) {
                    $ret = $result->fetch_assoc();
                    return $ret;
                }
            } else {
                return false;
            }
        }
    }

    private $id;
    private $title;
    private $author;
    private $description;

    public function __construct($id, $title, $author, $description)
    {
        $this->id = intval($id);
        $this->setTitle($title);
        $this->setAuthor($author);
        $this->setDescription($description);
    }

    public function setAuthor($author)
    {
        $this->author = $author;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getAuthor()
    {
        return $this->author;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    static public function UpdateBook($id, $title, $author, $description) {

        $sql = "UPDATE Books SET title='$title', author='$author', description='$description' WHERE id = $id";
        $result = self::$connection->query($sql);

        if($result == true){
            return true;
        }
        else{
            return false;
        }

    }

    static public function DeleteFromDB($id) {
        $sql = "DELETE FROM Books WHERE id = $id";
        $result = self::$connection->query($sql);

        if($result == true){
            return true;
        }
        else{
            return false;
        }
    }




}




?>