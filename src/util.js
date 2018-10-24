import glob from 'glob';

export const fillTwoChars = num => (num > 9 ? `${num}` : `0${num}`);

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
