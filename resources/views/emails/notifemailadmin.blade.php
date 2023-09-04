<!doctype html>
<html>

<head>
    <title>FR Projects</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

        :root {
            font-family: Poppins, Inter, system-ui, Avenir, Helvetica, Arial,
                sans-serif;
            line-height: 1.5;
            font-weight: 400;
            font-synthesis: none;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            -webkit-text-size-adjust: 100%;
        }

        * {
            box-sizing: border-box;
        }

        body {
            background-color: #e8f6ef;
        }
    </style>
</head>

<body>
    <div style="background-color: #e8f6ef">
        <div style="width: 100%; margin: 0 auto">
            <div style="padding: 32px; background-color: #e8f6ef">
                <a href="{{ config('app.url', 'https://fathurmdr.github.io/My-Portfolio') }}" target="_blank" rel="noopener noreferrer" style="
              text-decoration-line: none;
              display: block;
              text-align: center;
              margin: 0 auto;
            ">
                    <img src="{{ $message->embed($pathToImage) }}" alt="FR Projects" style="width: 48px" />
                </a>
            </div>
            <section style="
            padding: 32px;
            background-color: #ffffff;
            color: #718096;
            border-radius: 4px;
            overflow: hidden;
          ">
                <div>
                    <h1 style="
                color: #3d4852;
                font-weight: bold;
                font-size: 18px;
                margin: 0;
              ">
                        Message From:
                    </h1>
                    <h2 style="font-weight: normal; font-size: 16px; margin: 0">
                        {{ $data['name'] }}
                    </h2>
                    <a href="mailto:{{ $data['email'] }}" style="
                color: #2fc0a6;
                text-decoration: underline;
                font-size: 14px;
                margin: 0;
              ">{{ $data['email'] }}</a>
                </div>
                <p style="
              min-height: 320px;
              margin-top: 4px;
              margin-bottom: 16px;
              white-space: pre-line;
              text-align: justify;
              font-size: 16px;
            ">
                    {{ $data['message'] }}
                </p>
                <span style="
              display: block;
              width: 100%;
              height: 1px;
              background: #c3ccd8;
            "></span>
            </section>
            <footer style="
            padding: 20px;
            text-align: center;
            background-color: #e8f6ef;
            color: #3d4852;
            font-size: 14px;
          ">
                © {{ date('Y') }} FR Projects. All rights reserved.
            </footer>
        </div>
    </div>
</body>

</html>