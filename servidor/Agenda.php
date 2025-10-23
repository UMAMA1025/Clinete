<?php
require_once 'Person.php';

class Agenda {
    private $entries = [];

    public function __construct() {
        // Load agenda from session if exists
        if (isset($_SESSION['agenda'])) {
            $this->entries = $_SESSION['agenda'];
        }
    }

    // Save current agenda to session
    private function save() {
        $_SESSION['agenda'] = $this->entries;
    }

    // Find entry by name (normalized)
    private function findIndexByName($name) {
        $normalized = Person::normalizeName($name);
        foreach ($this->entries as $index => $person) {
            if (Person::normalizeName($person->name) === $normalized) {
                return $index;
            }
        }
        return false;
    }

    // Add or update a person
    public function addOrUpdate($name, $email) {
        if ($name === '') {
            return "⚠️ Name cannot be empty!";
        }

        $index = $this->findIndexByName($name);

        if ($index === false) {
            // Add new entry
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->entries[] = new Person($name, $email);
                $this->save();
                return "✅ Added new entry: $name";
            } else {
                return "⚠️ Invalid email!";
            }
        } else {
            // Update existing entry
            if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->entries[$index]->email = $email;
                $this->save();
                return "✅ Updated email for $name";
            } elseif ($email === '') {
                // Delete entry if email is empty
                $deletedName = $this->entries[$index]->name;
                array_splice($this->entries, $index, 1);
                $this->save();
                return "🗑️ Deleted entry: $deletedName";
            }
        }
    }

    // Get all entries
    public function getAll() {
        return $this->entries;
    }
}
