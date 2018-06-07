const isValueBroken = (value, list) => {
    const valueKeysCount = Object.keys(value).length;
    const listIsNotEmpty = list.length > 0;

    if (valueKeysCount > 0 && listIsNotEmpty) {
        const simpleKeysCount = Object.keys(list[0]).length;
        const valueIsBroken = listIsNotEmpty && simpleKeysCount > valueKeysCount;

        return valueIsBroken;
    }
    return false;
};
const getMatchListByBrokenValue = (value, list) => {
    const matchList = list.filter(item => {
        const keysInSelected = Object.keys(value);
        const totallyMatched = keysInSelected.every(i => {
            //            list中如果存在一项，针对value中的每一个key，要么list中没有该key, 要么值和list中完全相等，那么这一项就是匹配的项                
            const notExistInList = typeof item[i] === 'undefined';
            const equalToList = value[i] === item[i];

            return notExistInList || equalToList;
        });

        return totallyMatched;
    });

    return matchList;
};
const matchAtLeastOneKey = (objToMatch, val, keys, caseSensitive) => {
    return keys.some(key => {
        if (!caseSensitive) {
            const itemKeyLowerCased = (objToMatch[key] + '').toLowerCase();
            const inputLowerCased = val.toLowerCase();

            return itemKeyLowerCased.indexOf(inputLowerCased) > -1;
        }
        return (objToMatch[key] + '').indexOf(val) > -1;
    });
};

export {isValueBroken, getMatchListByBrokenValue, matchAtLeastOneKey};
