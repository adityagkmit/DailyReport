const arr = [23, 12, 22, 45, 65, 34];

const arrsum = arr.reduce((acc, num) => acc+=num);

console.log(arrsum);


const items = [
    { name: 'Apple', category: 'Fruit' },
    { name: 'Onion', category: 'Vegetable' },
    { name: 'Orange', category: 'Fruit' },
    { name: 'Lettuce', category: 'Vegetable' },
  ];
  
  const groupedItems = items.reduce((accumulator, item) => {
    const category = item.category;
    if (!accumulator[category]) {
      accumulator[category] = []
    }
    accumulator[category].push(item.name);
    return accumulator
  }, {})
  
  console.log(groupedItems);