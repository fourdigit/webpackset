import globule from 'globule';


export interface EntriesList {
  [targetName: string]: string;
}

/**
 * src下層のファイルの targetName: targetPathを取得する
 * @param srcType
 * @param targetType
 */
export const getEntriesList = (srcType: string = 'ejs', targetType: string = 'html'): EntriesList => {
  const entriesList = {};
  const filesMatched = globule.find([`**/*.${srcType}`, `!**/_*.${srcType}`], { cwd : `${process.cwd()}/src` });

  for(const srcName of filesMatched) {
    const targetName = srcName.replace(new RegExp(`.${srcType}$`, 'i'), `.${targetType}`);
    entriesList[targetName] = `${process.cwd()}/src/${srcName}`;
  }

  console.info(`${srcType} compile targets`, entriesList);
  return entriesList;
}
