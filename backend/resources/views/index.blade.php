<!-- resources/views/index.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>laravelView側タイトル</title>
    @vite(['resources/css/app.css', 'resources/ts/index.tsx'])
</head>
<body>
    <!-- index.tsxの内容を追加する部分 -->
    <div id="app"></div>
</body>
</html>