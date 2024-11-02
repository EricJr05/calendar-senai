<?php
$hostname = "localhost"; 
$db = "calendario";
$user = "root"; 
$password = "";

$mysql = new mysqli($hostname, $user, $password, $db);

if ($mysql->connect_errno) {
    echo "Falha: " . $mysql->connect_error;
    exit; 
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $evento = $_POST['nomeEvento'];
    $data = $_POST['dataEvento'];

    $stmt = $mysql->prepare("INSERT INTO dias (evento, data) VALUES (?, ?)");
    $stmt->bind_param("ss", $evento, $data);

    if (!$stmt->execute()) {
        echo '<p style="color: red;">Erro ao adicionar evento: ' . htmlspecialchars($stmt->error) . '</p>';
    } else {
        echo '<p style="color: green;">Evento adicionado com sucesso!</p>';
    }

    $stmt->close();
}
?>
