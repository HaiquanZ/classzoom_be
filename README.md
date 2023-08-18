# classzoom_be
## 1. Prepare
Mở XAMPP, start Apache và MySql
## 2. Install dependencies
```bash
cd classzoom_be
```
```
npm install
```
## 3. Create database, table and sample
```bash
cd classzoom_be/src/api
```
```
npx sequelize-cli db:create
```
```
npx sequelize-cli db:migrate
```
```
npx sequelize-cli db:seed:all
```
## 4. Run
```bash
cd classzoom_be
```
```
npm run dev
```
