TEST_ENV=prod npx wdio run wdio.conf.js
TEST_ENV=test npx wdio run wdio.conf.js
npm run deploy
./deploy-reports.sh


npm run deploy-reports
