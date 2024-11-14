chrome.runtime.onMessage.addListener(function (message, _, _) {
  if (message.command == "copy") {
    const title = document.getElementsByClassName("ocr-faq-item__header--title")[0]?.getElementsByClassName("lead")[0]?.innerText || message.url;
    const body = `<html><body><!--StartFragment--><a href="${message.url}">${title}</a><!--EndFragment--></body></html>`;
    const plain = `${title} ${message.url}`;

    const blob = new Blob([body], { type: "text/html" });
    const blobPlain = new Blob([plain], { type: "text/plain" });
    const item = [new window.ClipboardItem({ "text/html": blob, "text/plain": blobPlain })];

    navigator.clipboard.write(item).then(
      function () {},
      function () {}
    );
  }
});
