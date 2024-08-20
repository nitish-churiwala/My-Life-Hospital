<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $street = $_POST['Street'];
    $city = $_POST['City'];
    $state = $_POST['State'];
    $pin = $_POST['Pin'];
    $doctor = $_POST['doctor'];
    $date = $_POST['date'];
    $message = $_POST['message'];

    $xml = new DOMDocument();
    $xml->load('appointments.xml');

    $newAppointment = $xml->createElement("appointment");

    $newAppointment->appendChild($xml->createElement("name", $name));
    $newAppointment->appendChild($xml->createElement("email", $email));
    $newAppointment->appendChild($xml->createElement("phone", $phone));
    
    $address = $xml->createElement("address");
    $address->appendChild($xml->createElement("street", $street));
    $address->appendChild($xml->createElement("city", $city));
    $address->appendChild($xml->createElement("state", $state));
    $address->appendChild($xml->createElement("pin", $pin));
    $newAppointment->appendChild($address);

    $newAppointment->appendChild($xml->createElement("doctor", $doctor));
    $newAppointment->appendChild($xml->createElement("date", $date));
    $newAppointment->appendChild($xml->createElement("message", $message));

    $xml->documentElement->appendChild($newAppointment);
    $xml->save('appointments.xml');

    header("Location: viewAppointments.html");
    exit;
}
?>
