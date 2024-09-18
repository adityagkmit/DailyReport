const arr = [
	{
		name: "Aditya",
		address: "jaipur",
		mobile: 9876543223
	},
	{
		name: "Aman",
		address: 'Udaipur',
		mobile: 9876543224
	},
	{
		name: "Ajay",
		address: "Ajmer",
		mobile: 9876543221
	}
]
// const newarr = arr.map((item)=>{
// 	return `${item.name} ${item.address}`
// });

// console.log(newarr);

// arr.forEach((item)=>(
// 	console.log(`${item.name} ${item.address}`)
// ));

arr.filter((arr)=> arr.mobile%2===0).forEach((item)=> (
	console.log(item.name)
));

// filarr.forEach((item)=> (
// 	console.log(item.name)
// ));

const firstevenmobile = arr.find((arr)=> arr.mobile%2===0);

console.log(firstevenmobile.name);