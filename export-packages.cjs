const fs = require('fs');
const path = require('path');

// Đọc package.json
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Gộp dependencies và devDependencies
const dependencies = {
  ...packageData.dependencies,
  ...packageData.devDependencies
};

// Tạo nội dung dạng dòng text
const lines = Object.entries(dependencies).map(
  ([pkg, version]) => `${pkg}@${version}`
);

const output = lines.join('\n');

// Ghi ra file libraries.txt
fs.writeFileSync('libraries.txt', output, 'utf-8');

console.log('✅ Thư viện đã được ghi vào libraries.txt');
