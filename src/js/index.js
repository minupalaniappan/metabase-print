import '../css/style.css'
import formatter from 'sql-formatter'
import hotkeys from 'hotkeys-js'

const { format } = formatter

const isEmpty = () =>
  document
    .getElementsByClassName('ace_layer ace_text-layer')[0]
    .querySelector('span') === null

const fetchValue = () => {
  const query = document
    .getElementsByClassName('ace_layer ace_text-layer')[0]
    .textContent.trim()

  return query
}

const processQuery = () => {
  if (isEmpty()) {
    return
  }

  const formattedQuery = format(fetchValue())

  window.ace.edit('id_sql').setValue(formattedQuery)
  window.ace.edit('id_sql').clearSelection()
}

const enable = () => {
  hotkeys.filter = (event) => {
    var tagName = (event.target || event.srcElement).tagName
    hotkeys.setScope(
      /^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other'
    )
    return true
  }

  hotkeys('shift+command+f', () => {
    event.preventDefault()

    processQuery()

    return false
  })
}

enable()
