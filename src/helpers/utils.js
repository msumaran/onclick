const serialize = (obj, prefix) => {
  var str = [],
    p

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p]

      str.push(
        v !== null && typeof v == 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      )
    }
  }

  return str.join('&')
}

const serializeArray = (form) => {
  // Setup our serialized data
  var serialized = []

  // Loop through each field in the form
  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i]

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (
      !field.name ||
      field.disabled ||
      field.type === 'file' ||
      field.type === 'reset' ||
      field.type === 'submit' ||
      field.type === 'button'
    )
      continue

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue
        serialized.push({
          name: field.name,
          value: field.options[n].value
        })
      }
    }
    // Convert field data to a query string
    else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push({
        name: field.name,
        value: field.value
      })
    }
  }

  return serialized
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const jsonToEqual = (arr1, arr2) => {
  if (JSON.stringify(arr1) === JSON.stringify(arr2)) return true

  return false
}

const downloadFileForce = (url, name) => {
  if (!window.ActiveXObject) {
    const link = document.createElement('a')

    link.href = url
    link.target = '_blank'

    const filename = url.substring(url.lastIndexOf('/') + 1)

    link.download = filename || name

    if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search('chrome') < 0) {
      document.location = link.href
    } else {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false
      })

      link
        .dispatchEvent(event)(window.URL || window.webkitURL)
        .revokeObjectURL(link.href)
    }
  } else if (!!window.ActiveXObject && document.execCommand) {
    const _window = window.open(url, '_blank')

    _window.document.close()
    _window.document.execCommand('SaveAs', true, name || url)
    _window.close()
  }
}

export { serialize, serializeArray, capitalize, jsonToEqual, downloadFileForce }
