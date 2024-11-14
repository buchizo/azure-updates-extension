chrome.commands.onCommand.addListener(function (_) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    let rtnPromise = chrome.tabs.sendMessage(activeTab.id, { command: "copy", url: activeTab.url });
    rtnPromise.then((_) => {
    }).catch((error) => {
        console.warn(error)
    });
  });
});
