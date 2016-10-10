# modcam-connector

## Deploy

Deploy and create a new instance of Watson IoT Platform:
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://new-console.ng.bluemix.net/devops/setup/deploy/?repository=https://github.com/modcamab/modcam-connector&branch=deploy-existing-iotp)

Deploy and bind to existing instance of Watson IoT Platform:
[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://new-console.ng.bluemix.net/devops/setup/deploy/?repository=https://github.com/modcamab/modcam-connector&branch=deploy-new-iotp)
```
cf login -a <REGION_URL> ## follow prompts
cf set-env <APP_NAME> IOTP_NAME <SERVICE_NAME>
cf bind-service <APP_NAME> <SERVICE_NAME>
cf start <APP_NAME>
```
