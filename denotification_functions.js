function denotify_linkedin() {
  // Notifications are added after a page reload, so the strategy here is to
  // use `MutationObserver`s to detect and prevent their appearance.
  // Create two different observers for efficiency:
  //   * First observer to watch the whole document for the appearance of the
  //   "menu": `ul.nav-main`;
  //   * Disconnect the first observer once the "menu" has appeared;
  //   * Second observer to watch the "menu" for the appearance of
  //   notifications: `.nav-item__badge`.

  var observer_for_notifications = new MutationObserver(mutation_records => {
    let nodes_to_remove = Array
      .from(
        mutation_records.flatMap(mutation => Array.from(mutation.addedNodes))
      )
      .filter(node =>
        node.className == 'nav-item__badge'
      )

    nodes_to_remove.forEach(node => {
      node.remove()
    })
  })

  let observer_for_menu = new MutationObserver((mutation_records, observer) => {
    let menu = Array
      .from(
        mutation_records.flatMap(mutation => Array.from(mutation.addedNodes))
      )
      .filter(node =>
        node.tagName == 'UL' && node.className.includes('nav-main')
      )
      [0]

    if (menu.length != 0) {
      observer.disconnect()
      observer_for_notifications.observe(menu, {subtree: true, childList: true})
    }
  });

  observer_for_menu.observe(document, {subtree: true, childList: true})
}
