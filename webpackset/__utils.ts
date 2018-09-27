import globule from 'globule';


interface EntriesList {
  [targetName: string]: string;
}

/**
 * src下層のファイルの targetName: targetPathを取得する
 * @param srcType
 * @param targetType
 */
export const getEntriesList = (srcType: string = 'js', targetType: string = 'js'): EntriesList => {
  const entriesList = {};
  const filesMatched = globule.find([`**/*.${srcType}`, `!**/_*.${srcType}`], { cwd : `${__dirname}/src` });

  for(const srcName of filesMatched) {
    const targetName = srcName.replace(new RegExp(`.${srcType}$`, 'i'), `.${targetType}`);
    entriesList[targetName] = `${__dirname}/src/${srcName}`;
  }

  console.log(entriesList);
  return entriesList;
}
