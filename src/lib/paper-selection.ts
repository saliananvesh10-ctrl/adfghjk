export function validPaperSelection(rows:{marks:number;choice:number}[]){
 return rows.filter(q=>q.marks===2).length===6 && rows.filter(q=>q.marks===8).length===2 && rows.filter(q=>q.marks===14).length===3 && [1,2,3].every(pair=>rows.filter(q=>q.choice===pair).length===1);
}
