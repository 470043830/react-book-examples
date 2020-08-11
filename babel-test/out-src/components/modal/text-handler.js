function getTextListByHighWord(content, highWord, highStyle) {
  let textList = [];
  let key = 0;

  if (content) {
    const split_str = '' + highWord;
    const splits = content.split(split_str);

    for (let index = 0; index < splits.length; index++) {
      textList.push({
        key: 'id_' + key++,
        text: splits[index],
        style: ''
      });

      if (index < splits.length - 1) {
        textList.push({
          key: 'id_' + key++,
          text: split_str,
          style: highStyle ? highStyle : 'color:#49C167;'
        });
      }
    }
  }

  return textList;
}

function covertTextArray(textArray, word) {
  let newArray = []; // console.log('covertTextArray: ', textArray, word);

  for (let i = 0; i < textArray.length; i++) {
    const splits = textArray[i].split(word);
    const temps = [];

    for (let j = 0; j < splits.length; j++) {
      // temps.push({ text: splits[j], style: '' });
      temps.push(splits[j]);

      if (j < splits.length - 1) {
        // temps.push({ text: word, style: 'color:red;' });
        temps.push(word);
      }
    }

    newArray = newArray.concat(temps);
  }

  return newArray;
}

function handleText(content = `111aaa222bbb333cccdffsdfdsfds`, highWords = ['aaa', 'bbb', 'ccc']) {
  let testArray = [content];

  for (let index = 0; index < highWords.length; index++) {
    testArray = covertTextArray(testArray, highWords[index]);
  } // console.log('...testArray...: ', testArray);


  return testArray;
}

export { getTextListByHighWord, handleText };