curl -v localhost:8080 -d '{
	"id":"1",
	"name":"Co-primes",
	"constraints": `Two numbers are called co-primes or relatively primes if gcd of those two numbers is 1.
	i.e a,b are coprimes if gcd(a,b)=1.
	You are given with a prime number n, you task is to find out how many numbers in the range
	[1,n-1] are relatively prime with n.`,
	`First line of the input is an integer (1≤t≤100) is the number of test cases.
	First line of each test case consists of a prime number n (1≤n≤1000).
	Output how many relative primes are there in range [1,n-1] to number n.`,
	"input":`3
	 5 7 11`,
	"output":"4 6 10",
}'
