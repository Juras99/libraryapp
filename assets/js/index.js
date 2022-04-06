$('#add_book').submit(function (event) {
  alert('Data inserted successfully!')
})

$('#update_book').submit(function (event) {
  event.preventDefault()

  var unindexed_array = $(this).serializeArray()
  var data = {}

  $.map(unindexed_array, function (n, i) {
    data[n['title']] = n['value']
  })

  console.log(data)

  var request = {
    url: 'http://localhost:8000/api/books/${data.id}',
    method: 'PUT',
    data: data,
  }

  $.ajax(request).done(function (response) {
    alert('Data updated successfully!')
  })
})
