const arr = Array.from({ length: 10000 }, (_, i) => Math.floor(Math.random() * 100));

let arrSort = [...arr];

console.time('bublesort');

let count = 0;
for (let i = 0; i < arr.length; i++) {
    for (let x = 0; x < arr.length - 1; x++) {
        count++;
        if (arrSort[x] > arrSort[x + 1]) {
            [arrSort[x], arrSort[x + 1]] = [arrSort[x + 1], arrSort[x]];
        }
    }
}
console.log('bublesort', count);

console.timeEnd('bublesort');

arrSort = [...arr];

console.time('selectionsort');

count = 0;
for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let x = i + 1; x < arr.length - 1; x++) {
        count++;
        if (arrSort[x] < arrSort[minIndex]) {
            minIndex = x;
        }
    }
    [arrSort[i], arrSort[minIndex]] = [arrSort[minIndex], arrSort[i]];
}
console.log('selectionsort', count);

console.timeEnd('selectionsort');