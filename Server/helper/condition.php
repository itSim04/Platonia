<?php
class condition {
    public $term = "";
    public $injectable = true;
    public $equal = true;

    function __construct(string $term, bool $injectable = true, bool $equal = true) {

        $this->term = $term;
        $this->injectable = $injectable;
        $this->equal = $equal;

    }

    function extract(): string {

        if ($this->injectable) {

            return $this->term . ($this->equal ? " = " : " != ") . ":" . $this->term;

        } else {

            return $this->term;

        }

    }

}