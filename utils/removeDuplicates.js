const removeDuplicates = data => Array.from(new Set(data.map(e => e.title)))
  .map(title => {
    return data.find(e => e.title === title)
  })