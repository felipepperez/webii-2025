let arr = [10, 50, 25, 0, 2, 7, 100];

for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arr.length - 1; x++) {
        console.log(i, x, arr[x], arr[x + 1]);
        if (arr[x] > arr[x + 1]) {
            let temp = arr[x];
            arr[x] = arr[x + 1];
            arr[x + 1] = temp;
        }
    }
}

console.log(arr);