import fs from 'fs';
import glob from 'glob';

const { readFileSync } = fs;

const fillTwoChars = num => (num > 9 ? `${num}` : `0${num}`);

const correctSlash = str => str.replace(/(\\\\|\\)/g, '/');

const getFileName = file => {
  const correctFile = correctSlash(file);
  const lastIndex = correctFile.lastIndexOf('/');
  return lastIndex === -1 ? correctFile : correctFile.slice(lastIndex + 1);
};

export const getArchiveName = dir => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  return `${dir}-${year}-${fillTwoChars(month)}-${fillTwoChars(
    day
  )}-${fillTwoChars(hour)}-${fillTwoChars(minute)}-${fillTwoChars(second)}.zip`;
};

export const getZipFile = (dir, index = 1) => {
  const files = glob.sync(`${dir}-*.zip`);

  if (!files || !files.length) return null;

  return files[files.length - index];
};

const makeRegExp = hash =>
  new RegExp(`[^0-9a-f]([0-9a-f]{${hash}})[^0-9a-f]`, 'g');

export const hashCodes = ({ files, ext, hash }) => {
  const htmlCodes = [];
  const jsCodes = [];

  let htmlCount = 0;

  // hash codes in html content
  files.forEach(file => {
    if (file.slice(0 - ext.length) !== ext) return;

    const content = readFileSync(file);
    const regExp = makeRegExp(hash);

    let result = regExp.exec(content);
    while (result) {
      htmlCodes.push(result[1]);
      result = regExp.exec(content);
    }

    htmlCount += 1;
  });

  if (!htmlCount)
    return {
      error: !0,
      message: `no ${ext} files found`,
    };

  // hash codes in js content
  files.forEach(file => {
    if (file.slice(-3) !== '.js') return;

    const fileRegExp = makeRegExp(hash);
    const fileResult = fileRegExp.exec(`/${getFileName(file)}`);

    if (!fileResult) return;

    const fileHashCode = fileResult[1]; // eslint-disable-line prefer-destructuring

    if (htmlCodes.indexOf(fileHashCode) < 0) return;

    const content = readFileSync(file);
    const regExp = makeRegExp(hash);

    let result = regExp.exec(content);
    while (result) {
      jsCodes.push(result[1]);
      result = regExp.exec(content);
    }
  });

  return {
    error: !1,
    codes: [...htmlCodes, ...jsCodes],
  };
};

export const filesToDelete = ({ files, hash, codes }) => {
  const res = [];

  files.forEach(file => {
    // only clean js + css files
    if (file.slice(-3) !== '.js' && file.slice(-4) !== '.css') return;

    const fileRegExp = makeRegExp(hash);
    const fileResult = fileRegExp.exec(`/${getFileName(file)}`);

    if (!fileResult) return;

    const fileHashCode = fileResult[1]; // eslint-disable-line prefer-destructuring

    if (codes.indexOf(fileHashCode) < 0) res.push(file);
  });

  return res;
};
