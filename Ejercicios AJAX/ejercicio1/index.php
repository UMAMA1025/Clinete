<?php

$fichero = 'peliculas.xml';

if (file_exists($fichero)) {
	$output = file_get_contents($fichero);
	header('Content-Type: application/xml');
	print ($output);
}
else {
	print("No existe el fichero");
}
?>

