export default function getIframeSrc(code) {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="" />
      <title>Welcome, code!</title>
    </head>
    <body>
      <script>
        try {
         eval(${JSON.stringify(code)})
        } catch (error) {
          document.getElementsByTagName('body')[0].innerText = error.toString();
        }
      </script>
    </body>
  </html>
  `;
}
