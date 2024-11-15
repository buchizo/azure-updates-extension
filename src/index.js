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


console.log("[AzureUpdatesLinkCopyExtension] start extension...");
const body_observer = new MutationObserver(function (mutations) {
  for (const mutation of mutations) {
    if (mutation.type !== "childList") continue;
    if (mutation?.target?.id !== "accordion-container") continue;
    mutation.addedNodes.forEach(n => {
      if(!n.classList?.contains("ocr-faq-item")) return;
      // add button
      const shares = n.querySelectorAll(".share_btns")[0];
      const title = n.querySelectorAll(".ocr-faq-item__header--title")[0]?.querySelectorAll(".lead")[0]?.innerText || "Azure Updates";
      const id = n.querySelectorAll(".copyLinkText")[0]?.id;
      const url = `https://azure.microsoft.com/en-us/updates?id=${id}`;
      const b1 = document.createElement("a");
      b1.href = url;
      b1.target = "_blank";
      b1.innerText = "open in new tab";

      const b2 = document.createElement("a");
      b2.innerText = "copy link";
      b2.id = `copybtn-${id}`;
      b2.href = `#${b2.id}`;

      shares.appendChild(b1);
      shares.appendChild(b2);

      const tb2 = document.getElementById(b2.id);
      tb2.onclick = function() {
        const body = `<html><body><!--StartFragment--><a href="${url}">${title}</a><!--EndFragment--></body></html>`;
        const plain = `${title} ${url}`;
    
        const blob = new Blob([body], { type: "text/html" });
        const blobPlain = new Blob([plain], { type: "text/plain" });
        const item = [new window.ClipboardItem({ "text/html": blob, "text/plain": blobPlain })];
    
        navigator.clipboard.write(item).then(
          function () {},
          function () {}
        );
      }
    });
  }
});

body_observer.observe(document.body, {
  attributes: true,
  attributeOldValue: true,
  characterData: false,
  characterDataOldValue: false,
  childList: true,
  subtree: true,
  attributeFilter: []
});

function openLink(url) {
  alert(url);
}