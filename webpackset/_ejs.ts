import { getEntriesList } from "./__utils";
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const ejs = () => {
  const htmlSettings = [];
  const entryList = getEntriesList('ejs', 'html');
  Object.keys(entryList).forEach(targetName => {
    const _targetNameWithoutPages = targetName.replace('pages/', '');
    console.log(_targetNameWithoutPages);
    const plugin = new HtmlWebpackPlugin({
      filename : _targetNameWithoutPages,
      template : entryList[targetName]
    })
    htmlSettings.push(plugin);
  });
  return htmlSettings;
};
