(function() {
  let domains =
    [ 'linkedin'
    ]

  let domains_regexp = new RegExp(domains.join('|'))
  let current_domain = domains_regexp.exec(document.domain)[0]

  if (current_domain === undefined) {
    return
  }

  let function_name = 'denotify_' + current_domain
  let denotify_function = this[function_name]

  denotify_function()
} ())
