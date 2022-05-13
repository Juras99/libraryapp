// $('#add_book').submit(function (event) {
//   alert('Data inserted successfully!')
// })

$('#update_book').submit(function (event) {
  event.preventDefault()

  var unindexed_array = $(this).serializeArray()
  var data = { id: null, title: null, author: null }

  data.id = unindexed_array[0].value
  data.title = unindexed_array[1].value
  data.author = unindexed_array[2].value

  console.log(data)

  var request = {
    url: 'http://localhost:8000/api/books/' + data.id,
    method: 'PUT',
    data: data,
  }

  $.ajax(request).done(function (response) {
    alert('Pomyślnie zaktualizowano ksiażkę')
    window.location.href = '/'
  })
})

$('#update_author').submit(function (event) {
  event.preventDefault()

  var unindexed_array = $(this).serializeArray()
  var data = { id: null, title: null, author: null }

  data.id = unindexed_array[0].value
  data.name = unindexed_array[1].value
  data.surname = unindexed_array[2].value

  console.log(data)

  var request = {
    url: 'http://localhost:8000/api/authors/' + data.id,
    method: 'PUT',
    data: data,
  }

  $.ajax(request).done(function (response) {
    alert('Pomyślnie zaktualizowano autora')
    window.location.href = '/'
  })
})

if (window.location.pathname == '/') {
  $ondelete = $('.table tbody td a.delete')
  $ondelete.click(function () {
    var id = $(this).attr('data-id')

    console.log(id)

    var request = {
      url: 'http://localhost:8000/api/books/' + id,
      method: 'DELETE',
    }

    if (confirm('Czy na pewno chcesz usunać te książkę?')) {
      $.ajax(request).done(function (response) {
        location.reload()
        alert('Pomyślnie usunięto ksiażkę')
      })
    }
  })
}

if (window.location.pathname == '/authors') {
  $ondelete = $('.table tbody td a.delete')
  $ondelete.click(function () {
    var id = $(this).attr('data-id')

    console.log(id)

    var request = {
      url: 'http://localhost:8000/api/authors/' + id,
      method: 'DELETE',
    }

    if (confirm('Czy na pewno chcesz usunać tego autora? (UWAGA: Wraz z autorem usunięte zostaną wszystkie jego książki!)')) {
      $.ajax(request).done(function (response) {
        location.reload()
        alert('Pomyślnie usunięto autora')
      })
    }
  })
}
