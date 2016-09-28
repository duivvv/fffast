import fs from 'fs';

export default file => {

  return new Promise(resolve => {
    fs.stat(`./src/${file}`, (err, stat) => {
      if(err) return resolve({file, found: false});
      else {
        const found = stat !== undefined;
        return resolve({file, found});
      }
    });
  });

};
