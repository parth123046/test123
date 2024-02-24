<?php
// Check if file was uploaded without errors
if ($_FILES['media']['error'] === UPLOAD_ERR_OK) {
    $filename = $_GET['filename'];
    $uploadPath = 'uploads/' . $filename;
    move_uploaded_file($_FILES['media']['tmp_name'], $uploadPath);
}
?>
