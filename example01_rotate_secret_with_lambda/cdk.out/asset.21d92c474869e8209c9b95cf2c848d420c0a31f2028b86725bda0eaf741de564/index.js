"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const crypto_1 = require("crypto");
const secretName = process.env.SECRET_NAME || "";
const keyInSecret = process.env.KEY_IN_SECRET_NAME || "";
const secretManager = new aws_sdk_1.SecretsManager({
    region: process.env.REGION || "us-east-2"
});
exports.handler = async (event) => {
    if (event.Step === 'createSecret') {
        await secretManager.putSecretValue({
            SecretId: secretName,
            SecretString: JSON.stringify({
                [keyInSecret]: crypto_1.randomBytes(32).toString('hex')
            }),
            VersionStages: ['AWSCURRENT']
        }).promise();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUF5QztBQUN6QyxtQ0FBcUM7QUFHckMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO0FBQ2pELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDO0FBQ3pELE1BQU0sYUFBYSxHQUFHLElBQUksd0JBQWMsQ0FBQztJQUNyQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksV0FBVztDQUM1QyxDQUFDLENBQUE7QUFRRixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFZLEVBQUUsRUFBRTtJQUNyQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO1FBQy9CLE1BQU0sYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUMvQixRQUFRLEVBQUUsVUFBVTtZQUNwQixZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDekIsQ0FBQyxXQUFXLENBQUMsRUFBRSxvQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDakQsQ0FBQztZQUNGLGFBQWEsRUFBRSxDQUFDLFlBQVksQ0FBQztTQUNoQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDZjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlY3JldHNNYW5hZ2VyIH0gZnJvbSBcImF3cy1zZGtcIjtcbmltcG9ydCB7IHJhbmRvbUJ5dGVzIH0gZnJvbSBcImNyeXB0b1wiO1xuXG5cbmNvbnN0IHNlY3JldE5hbWUgPSBwcm9jZXNzLmVudi5TRUNSRVRfTkFNRSB8fCBcIlwiO1xuY29uc3Qga2V5SW5TZWNyZXQgPSBwcm9jZXNzLmVudi5LRVlfSU5fU0VDUkVUX05BTUUgfHwgXCJcIjtcbmNvbnN0IHNlY3JldE1hbmFnZXIgPSBuZXcgU2VjcmV0c01hbmFnZXIoe1xuICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuUkVHSU9OIHx8IFwidXMtZWFzdC0yXCJcbn0pXG5cbmludGVyZmFjZSBFdmVudCB7XG4gICAgU2VjcmV0SWQ6IHN0cmluZ1xuICAgIENsaWVudFJlcXVlc3RUb2tlbjogc3RyaW5nXG4gICAgU3RlcDogJ2NyZWF0ZVNlY3JldCcgfCAnc2V0U2VjcmV0JyB8ICd0ZXN0U2VjcmV0JyB8ICdmaW5pc2hTZWNyZXQnXG59XG5cbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogRXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQuU3RlcCA9PT0gJ2NyZWF0ZVNlY3JldCcpIHtcbiAgICAgICAgYXdhaXQgc2VjcmV0TWFuYWdlci5wdXRTZWNyZXRWYWx1ZSh7XG4gICAgICAgICAgICBTZWNyZXRJZDogc2VjcmV0TmFtZSxcbiAgICAgICAgICAgIFNlY3JldFN0cmluZzogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIFtrZXlJblNlY3JldF06IHJhbmRvbUJ5dGVzKDMyKS50b1N0cmluZygnaGV4JylcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgVmVyc2lvblN0YWdlczogWydBV1NDVVJSRU5UJ11cbiAgICAgICAgfSkucHJvbWlzZSgpXG4gICAgfVxufSJdfQ==