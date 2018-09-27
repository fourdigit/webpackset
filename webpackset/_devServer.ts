import { Configuration } from 'webpack-dev-server';
const path = require('path');


export const devServer = (conf: {
  host: Configuration['host'],
  port: Configuration['port']
}) => {
  console.log(path.join(process.cwd(), 'src'));
  const opts: Configuration = {
    stats: "errors-only",
    host: conf.host, // Defaults to `localhost`
    port: conf.port, // Defaults to 8080
    open: true,
    overlay: true,
    contentBase: path.join(process.cwd(), 'src'),
  };
  return {
    devServer: opts
  };
};
