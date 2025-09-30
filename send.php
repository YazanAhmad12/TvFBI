<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // استقبل البيانات الأساسية المشتركة
    $name  = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';

    // حدد نوع الخدمة أو الطالب بناءً على الفورم
    if (isset($_POST['subject'])) {
        $subject_field = $_POST['subject'];
    } elseif (isset($_POST['student_type'])) {
        $subject_field = $_POST['student_type'];
    } else {
        $subject_field = "No subject selected";
    }

    // نص الرسالة، إذا موجود
    $message_text = isset($_POST['message']) ? $_POST['message'] : "No message provided";

    // البريد المستلم
    $to = "MayaTrainingAcademy@gmail.com";

    // عنوان البريد
    $subject_mail = "New Message from Website: $subject_field";

    // نص البريد
    $message_body = "Full Name: $name\n";
    $message_body .= "Email: $email\n";
    $message_body .= "Phone: $phone\n";
    $message_body .= "Service/Type: $subject_field\n";
    $message_body .= "Message:\n$message_text\n";

    // الهيدر: بريد من نفس الدومين + Reply-To للبريد الذي أدخله المستخدم
    $headers = "From: noreply@mayatrainingacademy.online\r\n";
    $headers .= "Reply-To: $email\r\n";

    // إرسال البريد
    if (mail($to, $subject_mail, $message_body, $headers)) {
        echo "✅ تم إرسال البيانات بنجاح!";
    } else {
        echo "❌ فشل الإرسال. جرب لاحقاً أو افحص إعدادات الاستضافة.";
    }

} else {
    echo "❌ طلب غير صالح.";
}
?>