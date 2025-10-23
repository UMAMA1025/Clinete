<?php
class Person {
    public $name;
    public $email;

    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }

    // Normalize name for comparison
    public static function normalizeName($name) {
        return strtolower(iconv('UTF-8', 'ASCII//TRANSLIT', trim($name)));
    }
}
