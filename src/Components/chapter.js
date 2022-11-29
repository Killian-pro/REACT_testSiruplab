import React from "react";

function romanize(num) { if (isNaN(num)) return NaN; var digits = String(+num).split(""), key = ["", "c", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], roman = "", i = 3; while (i--) roman = (key[+digits.pop() + (i * 10)] || "") + roman; return Array(+digits.join("") + 1).join("M") + roman; }

function Chapter({ oneChapter, index }) {
    return (
        <div className={oneChapter?.valid ? 'flex w-full items-center p-4 ' : 'flex w-full items-center p-4  bg-gray-500 opacity-70'}>
            <img class='w-20 h-16 mr-2' src={oneChapter?.url} />
            <div class=' w-auto min-w-max  font-bold'>{index == 0 ? '' : romanize(index) + '-'} </div>
            <div>{oneChapter?.title}</div>
        </div>
    );
}

export default Chapter;
